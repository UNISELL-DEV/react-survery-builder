import { NextRequest, NextResponse } from 'next/server';
import {
  PollyClient,
  SynthesizeSpeechCommand,
  Engine,
  OutputFormat,
  VoiceId,
} from '@aws-sdk/client-polly';

// Create Polly client for TTS
const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_LOCAL_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_LOCAL_SECRET_ACCESS_KEY || '',
  },
});

/**
 * Generate TTS audio using AWS Polly
 */
async function generateTTSAudio(
  text: string,
  voice: VoiceId = 'Joanna',
): Promise<{ audio: string; format: string; sampleRate: number } | null> {
  try {
    // Check for AWS credentials
    if (
      !process.env.AWS_LOCAL_ACCESS_KEY_ID ||
      !process.env.AWS_LOCAL_SECRET_ACCESS_KEY
    ) {
      return null;
    }

    const command = new SynthesizeSpeechCommand({
      Text: text,
      TextType: 'text',
      OutputFormat: OutputFormat.MP3,
      VoiceId: voice,
      Engine: Engine.NEURAL,
      SampleRate: '24000',
    });

    const response = await pollyClient.send(command);

    if (!response.AudioStream) {
      return null;
    }

    // Convert stream to base64
    const audioBuffer = await streamToBuffer(response.AudioStream);
    const audioBase64 = audioBuffer.toString('base64');

    return {
      audio: audioBase64,
      format: 'mp3',
      sampleRate: 24000,
    };
  } catch (error) {
    console.error('TTS generation error:', error);
    return null;
  }
}

/**
 * Convert a readable stream to a Buffer
 */
async function streamToBuffer(stream: any): Promise<Buffer> {
  if (stream.transformToByteArray) {
    const bytes = await stream.transformToByteArray();
    return Buffer.from(bytes);
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

interface OptionItem {
  label?: string;
  value?: string;
}

interface ConversationMessage {
  role: 'assistant' | 'user';
  content: string;
}

interface OutputSchema {
  type: string;
  properties?: Record<
    string,
    { type: string; optional?: boolean; description?: string }
  >;
  items?: { type: string };
}

interface SchemaProperty {
  type: string;
  optional?: boolean;
  description?: string;
}

interface InputSchema {
  type: string;
  properties?: Record<string, SchemaProperty>;
}

interface RequestBody {
  originalQuestion: string;
  blockType: string;
  options?: OptionItem[];
  outputSchema?: OutputSchema;
  questionNumber: number;
  totalQuestions: number;
  previousResponses?: Record<string, unknown>;
  conversationHistory?: ConversationMessage[];
  // Multi-field support
  inputSchema?: InputSchema;
  currentField?: string;
  collectedFields?: Record<string, unknown>;
  remainingFields?: string[];
  // TTS options
  includeTTS?: boolean;
  ttsVoice?: string;
  language?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const {
      originalQuestion,
      blockType,
      options,
      outputSchema,
      questionNumber,
      totalQuestions,
      previousResponses,
      conversationHistory,
      // Multi-field support
      inputSchema,
      currentField,
      collectedFields,
      remainingFields,
      // TTS options - disabled, using separate streaming TTS for better perceived performance
      includeTTS = false,
      ttsVoice = 'Joanna',
      language,
    } = body;

    // const includeTTS = false;

    // Check if ANTHROPIC_API_KEY is set
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Return original question if no API key
      // Still try to generate TTS audio if requested
      let ttsData = null;
      if (includeTTS) {
        ttsData = await generateTTSAudio(originalQuestion, ttsVoice as VoiceId);
      }

      return NextResponse.json({
        question: originalQuestion,
        success: true,
        fallback: true,
        ...(ttsData && {
          audio: ttsData.audio,
          audioFormat: ttsData.format,
          audioSampleRate: ttsData.sampleRate,
        }),
      });
    }

    // Build context about the question
    let optionsContext = '';
    if (options && options.length > 0) {
      optionsContext = `\nAvailable options for this question: ${options.map((o) => o.label || String(o)).join(', ')}`;
    }

    // Build output schema context for complex blocks
    let schemaContext = '';
    if (outputSchema) {
      if (outputSchema.type === 'object' && outputSchema.properties) {
        const fields = Object.entries(outputSchema.properties)
          .map(
            ([key, val]) =>
              `${key} (${val.type}${val.optional ? ', optional' : ''})`,
          )
          .join(', ');
        schemaContext = `\nThis question collects: ${fields}`;
      } else if (outputSchema.type === 'array') {
        schemaContext = `\nThis question allows multiple selections`;
      }
    }

    // Build multi-field context
    let multiFieldContext = '';
    if (currentField && inputSchema?.properties) {
      const fieldSchema = inputSchema.properties[currentField];
      const fieldDescription = fieldSchema?.description || currentField;

      // Show what we've collected so far
      let collectedContext = '';
      if (collectedFields && Object.keys(collectedFields).length > 0) {
        const collected = Object.entries(collectedFields)
          .map(([key, val]) => `${key}: ${val}`)
          .join(', ');
        collectedContext = `\nAlready collected: ${collected}`;
      }

      // Show what fields remain
      let remainingContext = '';
      if (remainingFields && remainingFields.length > 0) {
        remainingContext = `\nStill need to ask: ${remainingFields.join(', ')}`;
      }

      multiFieldContext = `\nAsking for field: ${currentField} (${fieldSchema?.type || 'string'}) - ${fieldDescription}${collectedContext}${remainingContext}`;
    }

    // Build conversation summary for context
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      const recentMessages = conversationHistory.slice(-6); // Last 6 messages (3 Q&A pairs)
      conversationContext =
        '\n\nRecent conversation:\n' +
        recentMessages
          .map(
            (msg) =>
              `${msg.role === 'assistant' ? 'You' : 'User'}: ${msg.content}`,
          )
          .join('\n');
    }

    // Determine if this is a multi-field question
    const isMultiField = !!currentField;

    const systemPrompt = isMultiField
      ? `You are a friendly, conversational survey assistant helping a user complete a health and wellness survey. You are currently collecting multiple pieces of information for a single question (like height and weight for BMI calculation). Ask for each piece of information naturally.

Rules:
- Keep it brief (1 sentence)
- Be conversational and warm
- Reference what they've already told you when appropriate
- Make it feel like a natural conversation, not a form
- If this is the first field, briefly explain what you're collecting
- For subsequent fields, acknowledge what they said and smoothly ask for the next piece of info`
      : `You are a friendly, conversational survey assistant helping a user complete a health and wellness survey. Your job is to ask the next survey question in a warm, natural, and engaging tone that flows naturally from the conversation.

Rules:
- Keep it brief (1-2 sentences max)
- Be conversational and warm - reference previous answers when relevant
- Don't repeat the same phrases or greetings you've used before
- Don't list the options in your response - just ask the question naturally
- Make the conversation feel like a natural dialogue, not a formal survey
- If the user just answered a question, you can briefly acknowledge their response before asking the next question
- Match the tone to the topic (health questions should be caring and supportive)`;

    const userPrompt = isMultiField
      ? `Here is the conversation so far:${conversationContext}

You are collecting information for: "${originalQuestion}"
${multiFieldContext}

Ask for the ${currentField} in a conversational way. Keep it brief and natural.

Respond with just the question, nothing else.`
      : `Here is the conversation so far:${conversationContext}

Now rephrase this next survey question in a conversational way that flows naturally from the conversation:

Original question: "${originalQuestion}"
Question type: ${blockType}${optionsContext}${schemaContext}
This is question ${questionNumber} of ${totalQuestions}.

Respond with just the conversational question (and optionally a brief acknowledgment of their last answer if appropriate). Nothing else.`;

    // Call Claude API directly using fetch
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Extract the text content
    const textContent = data.content?.find(
      (c: { type: string }) => c.type === 'text',
    );
    const conversationalQuestion = textContent?.text || originalQuestion;

    // Generate TTS audio if requested (in parallel would be ideal but sequential is simpler)
    let ttsData = null;
    if (includeTTS) {
      ttsData = await generateTTSAudio(
        conversationalQuestion,
        ttsVoice as VoiceId,
      );
    }

    return NextResponse.json({
      question: conversationalQuestion,
      success: true,
      ...(ttsData && {
        audio: ttsData.audio,
        audioFormat: ttsData.format,
        audioSampleRate: ttsData.sampleRate,
      }),
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);

    // Return the original question as fallback
    const body = await request
      .clone()
      .json()
      .catch(() => ({
        originalQuestion: 'Please answer this question:',
        includeTTS: true,
        ttsVoice: 'Joanna',
      }));
    const fallbackQuestion =
      body.originalQuestion || 'Please answer this question:';

    // Still try to generate TTS for the fallback
    let ttsData = null;
    if (body.includeTTS !== false) {
      ttsData = await generateTTSAudio(
        fallbackQuestion,
        (body.ttsVoice || 'Joanna') as VoiceId,
      );
    }

    return NextResponse.json({
      question: fallbackQuestion,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      ...(ttsData && {
        audio: ttsData.audio,
        audioFormat: ttsData.format,
        audioSampleRate: ttsData.sampleRate,
      }),
    });
  }
}
