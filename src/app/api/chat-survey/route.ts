import { NextRequest, NextResponse } from 'next/server';

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
  properties?: Record<string, { type: string; optional?: boolean; description?: string }>;
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
    } = body;

    // Check if ANTHROPIC_API_KEY is set
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Return original question if no API key
      return NextResponse.json({
        question: originalQuestion,
        success: true,
        fallback: true,
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
          .map(([key, val]) => `${key} (${val.type}${val.optional ? ', optional' : ''})`)
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
      conversationContext = '\n\nRecent conversation:\n' + recentMessages
        .map(msg => `${msg.role === 'assistant' ? 'You' : 'User'}: ${msg.content}`)
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
        model: 'claude-sonnet-4-20250514',
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
    const textContent = data.content?.find((c: { type: string }) => c.type === 'text');
    const conversationalQuestion = textContent?.text || originalQuestion;

    return NextResponse.json({
      question: conversationalQuestion,
      success: true,
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);

    // Return the original question as fallback
    const body = await request.clone().json().catch(() => ({ originalQuestion: 'Please answer this question:' }));
    return NextResponse.json({
      question: body.originalQuestion || 'Please answer this question:',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
