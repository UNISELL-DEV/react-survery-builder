import { NextRequest, NextResponse } from 'next/server';
import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
  AudioStream,
  LanguageCode,
  MediaEncoding,
} from '@aws-sdk/client-transcribe-streaming';

/**
 * AWS Transcribe STT API Route
 *
 * This route handles speech-to-text using AWS Transcribe.
 * For real-time streaming, use the WebSocket endpoint or client-side streaming.
 *
 * Environment variables required:
 * - AWS_REGION (default: us-east-1)
 * - AWS_LOCAL_ACCESS_KEY_ID
 * - AWS_LOCAL_SECRET_ACCESS_KEY
 */

// Lazy-initialized Transcribe client (created on first request)
// This ensures environment variables are available on serverless platforms
let transcribeClient: TranscribeStreamingClient | null = null;

function getTranscribeClient(): TranscribeStreamingClient {
  if (!transcribeClient) {
    transcribeClient = new TranscribeStreamingClient({
      region: process.env.AWS_LOCAL_DEFAULT_REGION || process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_LOCAL_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_LOCAL_SECRET_ACCESS_KEY || '',
      },
    });
  }
  return transcribeClient;
}

// Language code mapping
const LANGUAGE_MAP: Record<string, LanguageCode> = {
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'en-AU': 'en-AU',
  'es-ES': 'es-ES',
  'es-US': 'es-US',
  'fr-FR': 'fr-FR',
  'fr-CA': 'fr-CA',
  'de-DE': 'de-DE',
  'it-IT': 'it-IT',
  'pt-BR': 'pt-BR',
  'ja-JP': 'ja-JP',
  'ko-KR': 'ko-KR',
  'zh-CN': 'zh-CN',
};

interface STTRequestBody {
  audio: string; // base64 encoded audio
  format: 'pcm' | 'wav' | 'mp3' | 'ogg' | 'webm';
  sampleRate: number;
  language?: string;
  sessionId?: string;
}

/**
 * POST /api/voice-survey/stt
 * Transcribe audio using AWS Transcribe Streaming
 */
export async function POST(request: NextRequest) {
  try {
    // Check for AWS credentials
    if (!process.env.AWS_LOCAL_ACCESS_KEY_ID || !process.env.AWS_LOCAL_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'AWS credentials not configured',
          useBrowserSTT: true,
        },
        { status: 503 }
      );
    }

    const body: STTRequestBody = await request.json();
    const { audio, format, sampleRate, language = 'en-US', sessionId } = body;

    if (!audio) {
      return NextResponse.json(
        { success: false, error: 'Audio data is required' },
        { status: 400 }
      );
    }

    // Decode base64 audio
    const audioBuffer = Buffer.from(audio, 'base64');

    // Determine media encoding
    let mediaEncoding: MediaEncoding;
    switch (format) {
      case 'pcm':
        mediaEncoding = 'pcm';
        break;
      case 'ogg':
        mediaEncoding = 'ogg-opus';
        break;
      default:
        // For other formats, we need to convert or use a different approach
        // AWS Transcribe Streaming supports: pcm, ogg-opus, flac
        return NextResponse.json(
          {
            success: false,
            error: `Unsupported format: ${format}. Supported formats: pcm, ogg`,
            useBrowserSTT: true,
          },
          { status: 400 }
        );
    }

    const languageCode = LANGUAGE_MAP[language] || 'en-US';

    // Create audio stream generator
    async function* audioStreamGenerator(): AsyncGenerator<AudioStream> {
      // Send audio in chunks
      const chunkSize = 4096;
      for (let i = 0; i < audioBuffer.length; i += chunkSize) {
        const chunk = audioBuffer.subarray(i, Math.min(i + chunkSize, audioBuffer.length));
        yield { AudioEvent: { AudioChunk: chunk } };
      }
    }

    // Start transcription
    const command = new StartStreamTranscriptionCommand({
      LanguageCode: languageCode,
      MediaEncoding: mediaEncoding,
      MediaSampleRateHertz: sampleRate,
      AudioStream: audioStreamGenerator(),
      EnablePartialResultsStabilization: true,
      PartialResultsStability: 'high',
    });

    const response = await getTranscribeClient().send(command);

    // Collect transcripts
    let finalTranscript = '';
    let confidence = 0;
    let resultCount = 0;

    if (response.TranscriptResultStream) {
      for await (const event of response.TranscriptResultStream) {
        if (event.TranscriptEvent?.Transcript?.Results) {
          for (const result of event.TranscriptEvent.Transcript.Results) {
            if (!result.IsPartial && result.Alternatives && result.Alternatives.length > 0) {
              const alternative = result.Alternatives[0];
              finalTranscript += (alternative.Transcript || '') + ' ';
              if (alternative.Items && alternative.Items.length > 0) {
                // Average confidence from items
                const itemConfidences = alternative.Items
                  .filter(item => item.Confidence !== undefined)
                  .map(item => item.Confidence!);
                if (itemConfidences.length > 0) {
                  confidence += itemConfidences.reduce((a, b) => a + b, 0) / itemConfidences.length;
                  resultCount++;
                }
              }
            }
          }
        }
      }
    }

    finalTranscript = finalTranscript.trim();
    const avgConfidence = resultCount > 0 ? confidence / resultCount : 0.8;

    return NextResponse.json({
      success: true,
      transcript: finalTranscript,
      isFinal: true,
      confidence: avgConfidence,
      sessionId,
    });
  } catch (error) {
    console.error('STT API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isCredentialsError = errorMessage.includes('credentials') || errorMessage.includes('Credential');

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        useBrowserSTT: true,
        isCredentialsError,
      },
      { status: isCredentialsError ? 503 : 500 }
    );
  }
}

/**
 * GET /api/voice-survey/stt
 * Health check and configuration
 */
export async function GET() {
  const hasCredentials = !!(process.env.AWS_LOCAL_ACCESS_KEY_ID && process.env.AWS_LOCAL_SECRET_ACCESS_KEY);

  return NextResponse.json({
    success: true,
    status: hasCredentials ? 'available' : 'no_credentials',
    supportedLanguages: Object.keys(LANGUAGE_MAP),
    supportedFormats: ['pcm', 'ogg'],
    supportedSampleRates: [8000, 16000, 44100, 48000],
    features: {
      streaming: false, // HTTP route doesn't support streaming
      batch: true,
    },
    note: 'For real-time streaming STT, use WebSocket connection or client-side streaming',
  });
}
