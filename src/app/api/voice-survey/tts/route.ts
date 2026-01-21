import { NextRequest, NextResponse } from 'next/server';
import { PollyClient, SynthesizeSpeechCommand, Engine, OutputFormat, VoiceId, LanguageCode } from '@aws-sdk/client-polly';

/**
 * AWS Polly TTS API Route
 *
 * This route converts text to speech using AWS Polly.
 * Returns audio data as base64 encoded MP3.
 *
 * Environment variables required:
 * - AWS_REGION (default: us-east-1)
 * - AWS_LOCAL_ACCESS_KEY_ID
 * - AWS_LOCAL_SECRET_ACCESS_KEY
 */

// Create Polly client
const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_LOCAL_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_LOCAL_SECRET_ACCESS_KEY || '',
  },
});

// Voice mapping for different languages
const VOICE_MAP: Record<string, VoiceId> = {
  'en-US': 'Joanna',
  'en-GB': 'Amy',
  'es-ES': 'Lucia',
  'es-US': 'Lupe',
  'fr-FR': 'Lea',
  'de-DE': 'Vicki',
  'it-IT': 'Bianca',
  'pt-BR': 'Camila',
  'ja-JP': 'Mizuki',
  'ko-KR': 'Seoyeon',
  'zh-CN': 'Zhiyu',
};

// Language code mapping
const LANGUAGE_MAP: Record<string, LanguageCode> = {
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'es-ES': 'es-ES',
  'es-US': 'es-US',
  'fr-FR': 'fr-FR',
  'de-DE': 'de-DE',
  'it-IT': 'it-IT',
  'pt-BR': 'pt-BR',
  'ja-JP': 'ja-JP',
  'ko-KR': 'ko-KR',
  'zh-CN': 'cmn-CN',
};

interface TTSRequestBody {
  text: string;
  language?: string;
  voice?: string;
  rate?: number;
  engine?: 'neural' | 'standard';
}

/**
 * POST /api/voice-survey/tts
 * Convert text to speech using AWS Polly
 * Returns JSON with base64 audio (for backwards compatibility)
 */
export async function POST(request: NextRequest) {
  try {
    // Check for AWS credentials
    if (!process.env.AWS_LOCAL_ACCESS_KEY_ID || !process.env.AWS_LOCAL_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'AWS credentials not configured',
          useBrowserTTS: true,
        },
        { status: 503 }
      );
    }

    const body: TTSRequestBody = await request.json();
    const { text, language = 'en-US', voice, rate = 1.0, engine = 'neural' } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    // Determine voice to use
    const voiceId = (voice as VoiceId) || VOICE_MAP[language] || 'Joanna';
    const languageCode = LANGUAGE_MAP[language] || 'en-US';

    // Create SSML for rate control if needed
    let inputText = text;
    let textType: 'text' | 'ssml' = 'text';

    if (rate !== 1.0) {
      // Use SSML for rate control
      const ratePercent = Math.round(rate * 100);
      inputText = `<speak><prosody rate="${ratePercent}%">${escapeXml(text)}</prosody></speak>`;
      textType = 'ssml';
    }

    // Synthesize speech
    const command = new SynthesizeSpeechCommand({
      Text: inputText,
      TextType: textType,
      OutputFormat: OutputFormat.MP3,
      VoiceId: voiceId,
      LanguageCode: languageCode,
      Engine: engine === 'neural' ? Engine.NEURAL : Engine.STANDARD,
      SampleRate: '24000',
    });

    const response = await pollyClient.send(command);

    if (!response.AudioStream) {
      throw new Error('No audio stream received from Polly');
    }

    // Convert stream to base64
    const audioBuffer = await streamToBuffer(response.AudioStream);
    const audioBase64 = audioBuffer.toString('base64');

    return NextResponse.json({
      success: true,
      audio: audioBase64,
      format: 'mp3',
      sampleRate: 24000,
      contentType: response.ContentType,
    });
  } catch (error) {
    console.error('TTS API error:', error);

    // Check if it's an AWS credentials error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isCredentialsError = errorMessage.includes('credentials') || errorMessage.includes('Credential');

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        useBrowserTTS: true, // Signal client to fall back to browser TTS
        isCredentialsError,
      },
      { status: isCredentialsError ? 503 : 500 }
    );
  }
}

/**
 * Streaming TTS endpoint - returns audio stream directly
 * Use with: new Audio('/api/voice-survey/tts/stream?text=...')
 * This allows the browser to start playing audio before the full file is downloaded
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const voice = searchParams.get('voice') || 'Joanna';
  const language = searchParams.get('language') || 'en-US';
  const engine = searchParams.get('engine') || 'neural';

  // If no text, return health check
  if (!text) {
    const hasCredentials = !!(process.env.AWS_LOCAL_ACCESS_KEY_ID && process.env.AWS_LOCAL_SECRET_ACCESS_KEY);
    return NextResponse.json({
      success: true,
      status: hasCredentials ? 'available' : 'no_credentials',
      availableVoices: Object.entries(VOICE_MAP).map(([lang, v]) => ({
        language: lang,
        voiceId: v,
      })),
      supportedFormats: ['mp3'],
      engines: ['neural', 'standard'],
      streamingEndpoint: '/api/voice-survey/tts/stream',
    });
  }

  // Check for AWS credentials
  if (!process.env.AWS_LOCAL_ACCESS_KEY_ID || !process.env.AWS_LOCAL_SECRET_ACCESS_KEY) {
    return new NextResponse('AWS credentials not configured', { status: 503 });
  }

  try {
    const voiceId = (voice as VoiceId) || VOICE_MAP[language] || 'Joanna';
    const languageCode = LANGUAGE_MAP[language] || 'en-US';

    const command = new SynthesizeSpeechCommand({
      Text: text,
      TextType: 'text',
      OutputFormat: OutputFormat.MP3,
      VoiceId: voiceId,
      LanguageCode: languageCode,
      Engine: engine === 'neural' ? Engine.NEURAL : Engine.STANDARD,
      SampleRate: '24000',
    });

    const response = await pollyClient.send(command);

    if (!response.AudioStream) {
      return new NextResponse('No audio stream', { status: 500 });
    }

    // Stream the audio directly to the client
    const audioBuffer = await streamToBuffer(response.AudioStream);

    // Convert Buffer to Uint8Array for NextResponse compatibility
    return new NextResponse(new Uint8Array(audioBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Streaming TTS error:', error);
    return new NextResponse('TTS generation failed', { status: 500 });
  }
}

/**
 * Convert a readable stream to a Buffer
 */
async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: Uint8Array[] = [];

  if (stream[Symbol.asyncIterator]) {
    // Node.js readable stream
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
  } else if (stream.transformToByteArray) {
    // AWS SDK v3 SdkStreamMixin
    const bytes = await stream.transformToByteArray();
    return Buffer.from(bytes);
  } else {
    throw new Error('Unsupported stream type');
  }

  return Buffer.concat(chunks);
}

/**
 * Escape XML special characters for SSML
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

