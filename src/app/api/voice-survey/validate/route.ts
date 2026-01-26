import { NextRequest, NextResponse } from 'next/server';

/**
 * Voice Answer Validation API
 *
 * Uses AI to validate and match voice transcripts to available options.
 * This handles cases where speech recognition may not capture exact words.
 */

interface Option {
  id?: string;
  label: string;
  value: string;
}

interface SchemaProperty {
  type: string;
  description?: string;
  optional?: boolean;
}

interface OutputSchema {
  type: string;
  properties?: Record<string, SchemaProperty>;
}

interface ValidationRequest {
  transcript: string;
  options: Option[];
  multiSelect: boolean;
  questionLabel?: string;
  blockType?: string;
  previousSelections?: string[]; // For multi-select, track what's already selected
  isConfirmation?: boolean; // Whether this is a confirmation of selections
  // Schema-based validation
  outputSchema?: OutputSchema;
  inputSchema?: OutputSchema;
  // Conversation history for the current question (for context in multi-turn interactions)
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

interface ValidationResponse {
  success: boolean;
  isValid: boolean;
  matchedOptions: Option[];
  matchedValues: string[];
  confidence: 'high' | 'medium' | 'low';
  needsConfirmation: boolean;
  confirmationMessage?: string;
  invalidReason?: string;
  suggestedAction?:
    | 'confirm'
    | 'reask'
    | 'add_more'
    | 'submit'
    | 'finish_multiselect'
    | 'navigate_back';
  // For multi-select: whether the matched options should be added or removed
  action?: 'add' | 'remove';
}

// Patterns for "none of the above" type options that don't need confirmation
const EXCLUSIVE_OPTION_PATTERNS = [
  /^none\s*(of\s*(the\s*)?(above|these|them))?$/i,
  /^neither$/i,
  /^not\s*(any|applicable)$/i,
  /^n\/?a$/i,
  /^prefer\s*not\s*to\s*(say|answer)$/i,
  /^skip$/i,
  /^no\s*(preference|opinion)$/i,
  /^don'?t\s*know$/i,
  /^unsure$/i,
  /^other$/i,
];

// Check if an option is an "exclusive" type that shouldn't need confirmation
function isExclusiveOption(label: string): boolean {
  const normalizedLabel = label.toLowerCase().trim();
  return EXCLUSIVE_OPTION_PATTERNS.some((pattern) =>
    pattern.test(normalizedLabel),
  );
}

// Patterns for "done" / "finished" responses
const DONE_PATTERNS = [
  /^(that'?s?\s*)?(all|it|everything|done|enough)$/i,
  /^(i'?m\s*)?(done|finished|good)$/i,
  /^no\s*(more|thanks)$/i,
  /^continue$/i,
  /^next(\s*question)?$/i,
  /^move\s*on$/i,
  /^let'?s?\s*(continue|move\s*on|go)$/i,
];

// Check if the response means "I'm done selecting"
function isDoneResponse(transcript: string): boolean {
  const normalized = transcript.toLowerCase().trim();
  return DONE_PATTERNS.some((pattern) => pattern.test(normalized));
}

// Patterns for "go back" / "previous question" navigation commands
// These are simple patterns - more complex natural language is handled by AI
const BACK_NAVIGATION_PATTERNS = [
  /^(go\s+)?back$/i,
  /^previous(\s*(question|one))?$/i,
  /^before$/i,
  /^go\s+to\s+(the\s+)?(previous|last)(\s*(question|one))?$/i,
  /^(i\s+)?(want|need)\s+to\s+go\s+back$/i,
  /^take\s+me\s+back$/i,
  /^return(\s+to\s+(the\s+)?(previous|last)(\s*(question|one))?)?$/i,
  /^(can\s+)?(i\s+)?(go|change|edit|modify)\s+(the\s+)?(previous|last)(\s*(question|one|answer))?$/i,
  /^(let\s+me\s+)?(change|edit|modify|redo)\s+(my\s+)?(previous|last)(\s*(answer|response))?$/i,
  /^(i\s+)?(made\s+a\s+)?mistake/i,
  /^wait/i,
  /^(oops|whoops)/i,
];

// Check if the response is a back navigation command
function isBackNavigationResponse(transcript: string): boolean {
  const normalized = transcript.toLowerCase().trim();
  return BACK_NAVIGATION_PATTERNS.some((pattern) => pattern.test(normalized));
}

/**
 * Handle schema-based validation for blocks with outputSchema/inputSchema
 * Extracts structured data from the transcript according to the schema
 * Works with ANY schema type - string, number, boolean, array, object
 */
async function handleSchemaValidation(
  transcript: string,
  schema: OutputSchema,
  questionLabel: string | undefined,
  apiKey: string,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
): Promise<NextResponse> {
  // Check for back navigation command first
  if (isBackNavigationResponse(transcript)) {
    return NextResponse.json({
      success: true,
      isValid: true,
      matchedOptions: [],
      matchedValues: [],
      confidence: 'high',
      needsConfirmation: false,
      suggestedAction: 'navigate_back',
    } as ValidationResponse);
  }
  // Build schema description based on schema type
  let schemaDescription: string;
  let expectedFormat: string;

  if (schema.type === 'object' && schema.properties) {
    // Object schema with properties
    const schemaFields = Object.entries(schema.properties)
      .map(([key, prop]) => {
        const required = prop.optional ? '(optional)' : '(required)';
        return `- ${key}: ${prop.type} ${required}${prop.description ? ` - ${prop.description}` : ''}`;
      })
      .join('\n');

    const schemaExample: Record<string, string> = {};
    for (const [key, prop] of Object.entries(schema.properties)) {
      if (prop.type === 'number') {
        schemaExample[key] = '<number>';
      } else if (prop.type === 'boolean') {
        schemaExample[key] = '<true or false>';
      } else if (prop.type === 'array') {
        schemaExample[key] = '<array>';
      } else {
        schemaExample[key] = '<string>';
      }
    }

    schemaDescription = `Expected output schema (object with fields):\n${schemaFields}`;
    expectedFormat = `{
  ${Object.entries(schemaExample)
    .map(([k, v]) => `"${k}": ${v}`)
    .join(',\n  ')},
  "isValid": true
}`;
  } else if (schema.type === 'string') {
    schemaDescription =
      "Expected output: a string value extracted from the user's speech";
    expectedFormat = `{
  "value": "<extracted string>",
  "isValid": true
}`;
  } else if (schema.type === 'number') {
    schemaDescription =
      'Expected output: a number value extracted from the user\'s speech (convert spoken numbers like "twenty five" to 25)';
    expectedFormat = `{
  "value": <number>,
  "isValid": true
}`;
  } else if (schema.type === 'boolean') {
    schemaDescription =
      "Expected output: a boolean value (true/false) based on the user's response (yes/no, true/false, etc.)";
    expectedFormat = `{
  "value": <true or false>,
  "isValid": true
}`;
  } else if (schema.type === 'date') {
    schemaDescription =
      "Expected output: a date string in ISO format (YYYY-MM-DD) extracted from the user's speech";
    expectedFormat = `{
  "value": "<YYYY-MM-DD>",
  "isValid": true
}`;
  } else if (schema.type === 'array') {
    schemaDescription =
      "Expected output: an array of values extracted from the user's speech";
    expectedFormat = `{
  "value": [<array of values>],
  "isValid": true
}`;
  } else {
    // Fallback for unknown types
    schemaDescription = `Expected output type: ${schema.type}`;
    expectedFormat = `{
  "value": <extracted value>,
  "isValid": true
}`;
  }

  const systemPrompt = `You are extracting structured data from a user's voice response for a survey.
Your job is to extract the relevant value(s) from the user's speech and return them in a specific JSON format.

CRITICAL RULES:
1. Extract the meaningful content from natural speech, ignoring filler words and conversational phrasing
2. Convert spoken numbers to their numeric representation (words to digits)
3. Handle variations in how people express information naturally
4. For string values, extract the core answer without introductory phrases
5. Automatically convert values to required formats when possible
6. If you cannot extract ALL required values, mark isValid as false BUT still return whatever partial data you extracted
7. Return ONLY valid JSON - no explanations, no markdown, just the JSON object
8. IMPORTANT: If there is conversation history, consider ALL previous user responses when extracting data. Combine information from multiple turns to form a complete response.
9. PARTIAL DATA: When some fields are missing, set them to null but still include all fields from the schema - populate successfully extracted values and use null for missing ones. Always include "missingFields" array listing the field names that couldn't be extracted.`;

  // Build messages array with conversation history for context
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  // Add conversation history if available (this provides context from previous turns)
  if (conversationHistory && conversationHistory.length > 0) {
    // Add the initial question context
    messages.push({
      role: 'user',
      content: `Question being answered: "${questionLabel || 'Please provide your answer'}"

${schemaDescription}

Please extract data from the user's responses in this conversation. Return JSON in this format:
${expectedFormat}

If you cannot extract ALL required information, return partial data with null for missing fields:
{
  ... (extracted fields with values, missing fields set to null),
  "isValid": false,
  "missingFields": ["list", "of", "missing", "field", "names"],
  "clarificationNeeded": "Please provide [what's missing]"
}`,
    });

    // Add previous conversation turns
    for (const turn of conversationHistory) {
      if (turn.role === 'user') {
        messages.push({
          role: 'user',
          content: `User said: "${turn.content}"`,
        });
      } else {
        messages.push({ role: 'assistant', content: turn.content });
      }
    }

    // Add current transcript as the latest user input
    messages.push({
      role: 'user',
      content: `User's latest response: "${transcript}"

Now extract ALL the data from the complete conversation above and return ONLY the JSON object:`,
    });
  } else {
    // No conversation history - use simple single-turn prompt
    const userPrompt = `Question being answered: "${questionLabel || 'Please provide your answer'}"

${schemaDescription}

User's spoken response: "${transcript}"

Extract the data and return JSON in this format:
${expectedFormat}

If you cannot extract ALL required information, return partial data with null for missing fields:
{
  ... (extracted fields with values, missing fields set to null),
  "isValid": false,
  "missingFields": ["list", "of", "missing", "field", "names"],
  "clarificationNeeded": "Please provide [what's missing]"
}

Return ONLY the JSON object:`;

    messages.push({ role: 'user', content: userPrompt });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.content?.find(
      (c: { type: string }) => c.type === 'text',
    );
    const responseText = textContent?.text || '';

    // Parse the JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        success: false,
        isValid: false,
        extractedData: null,
        confidence: 'low',
        needsConfirmation: true,
        confirmationMessage:
          "I couldn't understand your response. Could you please try again?",
        suggestedAction: 'reask',
      });
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    if (parsedResponse.isValid === false) {
      // Extract partial data even when validation fails
      // This allows UI to update with whatever was captured
      let partialData: unknown = null;
      if (schema.type === 'object' && schema.properties) {
        // For object schemas, extract any fields that were captured (non-null values)
        const { isValid, missingFields, clarificationNeeded, ...objectData } = parsedResponse;
        // Only include partialData if there's at least one non-null field
        const hasPartialData = Object.values(objectData).some(v => v !== null && v !== undefined);
        if (hasPartialData) {
          partialData = objectData;
        }
      } else if (parsedResponse.value !== null && parsedResponse.value !== undefined) {
        // For scalar types, use the value if present
        partialData = parsedResponse.value;
      }

      return NextResponse.json({
        success: true,
        isValid: false,
        extractedData: null,
        partialData, // Include partial data for UI updates
        confidence: 'low',
        needsConfirmation: true,
        confirmationMessage:
          parsedResponse.clarificationNeeded ||
          "I couldn't understand your response. Could you please try again?",
        suggestedAction: 'reask',
        missingFields: parsedResponse.missingFields,
      });
    }

    // For non-object schemas, the extracted data is in the "value" field
    // For object schemas, the extracted data is the object itself (minus validation flags)
    let extractedData: unknown;
    if (schema.type === 'object' && schema.properties) {
      // Remove internal validation flags from the output
      const { isValid, missingFields, clarificationNeeded, ...objectData } =
        parsedResponse;
      extractedData = objectData;
    } else {
      // For scalar/array types, use the "value" field
      extractedData = parsedResponse.value;
    }

    return NextResponse.json({
      success: true,
      isValid: true,
      extractedData,
      confidence: 'high',
      needsConfirmation: false,
      suggestedAction: 'submit',
    });
  } catch (error) {
    console.error('Schema validation error:', error);
    return NextResponse.json({
      success: false,
      isValid: false,
      extractedData: null,
      confidence: 'low',
      needsConfirmation: true,
      confirmationMessage:
        'I had trouble understanding. Could you please repeat that?',
      suggestedAction: 'reask',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ValidationRequest = await request.json();
    const {
      transcript,
      options,
      multiSelect,
      questionLabel,
      blockType,
      previousSelections = [],
      isConfirmation = false,
      outputSchema,
      inputSchema,
      conversationHistory,
    } = body;

    // Check for back navigation command first (before any other validation)
    // This allows users to say "go back" or similar phrases at any point
    if (isBackNavigationResponse(transcript)) {
      return NextResponse.json({
        success: true,
        isValid: true,
        matchedOptions: [],
        matchedValues: [],
        confidence: 'high',
        needsConfirmation: false,
        suggestedAction: 'navigate_back',
      } as ValidationResponse);
    }

    // Check if ANTHROPIC_API_KEY is set
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Fallback to basic matching without AI
      return NextResponse.json(
        fallbackValidation(
          transcript,
          options,
          multiSelect,
          previousSelections,
        ),
      );
    }

    // Handle schema-based validation for ALL blocks with a schema
    // This handles string, number, boolean, date, array, and object types
    const schema = outputSchema || inputSchema;
    if (schema && schema.type) {
      // Only skip schema validation if there are options (option-based blocks use different logic)
      // But if the block has options AND a schema, options take precedence
      if (options.length === 0) {
        return handleSchemaValidation(
          transcript,
          schema,
          questionLabel,
          apiKey,
          conversationHistory,
        );
      }
    }

    // Check for "done" response when user has previous selections (multi-select)
    if (previousSelections.length > 0 && isDoneResponse(transcript)) {
      const selectedOptions = options.filter((opt) =>
        previousSelections.includes(opt.value),
      );
      return NextResponse.json({
        success: true,
        isValid: true,
        matchedOptions: selectedOptions,
        matchedValues: previousSelections,
        confidence: 'high',
        needsConfirmation: false,
        suggestedAction: 'finish_multiselect',
      } as ValidationResponse);
    }

    // Build options context for the AI
    const optionsText = options
      .map(
        (opt, i) => `${i + 1}. Label: "${opt.label}" → Value: "${opt.value}"`,
      )
      .join('\n');

    // Handle confirmation flow
    if (isConfirmation) {
      return handleConfirmation(
        transcript,
        previousSelections,
        options,
        apiKey,
      );
    }

    const systemPrompt = `You are a voice survey answer validator. Your job is to analyze a user's spoken response and determine which option(s) they selected from a list of available options.

IMPORTANT RULES:
1. Match by semantic meaning, not just exact words. E.g., "I want to lose weight" matches "Specific weight loss target"
2. Handle speech recognition errors. E.g., "health improvement" should match "Overall health improvement"
3. Numbers can be spoken as words. E.g., "option one", "first", "1" all mean option 1
4. For multiSelect: user might say multiple options, add to previous selections, or REMOVE previously selected options
5. Common affirmative words like "yes", "yeah", "sure" mean confirmation
6. Common negative words like "no", "nope", "not that one" mean rejection
7. You should automatically convert values to required formats if you, if you cannot ask the user to provide data in correct format.
8. REMOVAL DETECTION: If the user wants to REMOVE/UNSELECT an option, set action to "remove". Examples:
   - "remove pizza" / "delete pizza" / "unselect pizza" → action: "remove"
   - "I don't want pizza anymore" / "not pizza" / "actually not that one" → action: "remove"
   - "take away pizza" / "get rid of pizza" / "cancel pizza" → action: "remove"
   - "changed my mind about pizza" → action: "remove"
   By default, action should be "add" when user is selecting/adding options.
9. NAVIGATION DETECTION: If the user wants to go BACK to the previous question, set isNavigateBack to true. Examples:
   - "go back" / "previous question" / "take me back" → isNavigateBack: true
   - "I'd like to reconsider my last answer" / "can we go back?" → isNavigateBack: true
   - "wait, I made a mistake on the last one" / "let me change my previous answer" → isNavigateBack: true
   - "actually, can I redo the previous question?" / "hmm, go back please" → isNavigateBack: true
   - "oops" / "whoops" / "hold on" (when clearly wanting to go back) → isNavigateBack: true

Return a JSON object with these exact fields:
{
  "isValid": boolean,
  "matchedOptionIndices": number[], // 0-based indices of matched options
  "confidence": "high" | "medium" | "low",
  "needsConfirmation": boolean,
  "action": "add" | "remove", // whether user wants to add or remove these options
  "isNavigateBack": boolean, // true if user wants to go back to previous question
  "reason": string // If isValid is false, provide a SHORT user-friendly message asking them to reconfirm (similar to : "I didn't catch that. Could you please repeat your answer?"). Do NOT explain why it failed or list the available options. Use different wordings every time.
}`;

    const userPrompt = `Question: "${questionLabel || 'Please select an option'}"
Block type: ${blockType || 'select'}
Multi-select: ${multiSelect}
${previousSelections.length > 0 ? `Previously selected: ${previousSelections.join(', ')}` : ''}

Available options:
${optionsText}

User's spoken response: "${transcript}"

Analyze this response and determine which option(s) the user is selecting. Consider partial matches, paraphrases, and common speech patterns.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
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
      console.error('API request failed:', response.status);
      return NextResponse.json(
        fallbackValidation(transcript, options, multiSelect),
      );
    }

    const data = await response.json();
    const textContent = data.content?.find(
      (c: { type: string }) => c.type === 'text',
    );
    const responseText = textContent?.text || '';

    // Parse the JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        fallbackValidation(transcript, options, multiSelect),
      );
    }

    const aiResult = JSON.parse(jsonMatch[0]);

    // Check if AI detected back navigation intent
    if (aiResult.isNavigateBack === true) {
      return NextResponse.json({
        success: true,
        isValid: true,
        matchedOptions: [],
        matchedValues: [],
        confidence: 'high',
        needsConfirmation: false,
        suggestedAction: 'navigate_back',
      } as ValidationResponse);
    }

    // Build the response
    const matchedOptions = (aiResult.matchedOptionIndices || [])
      .filter((i: number) => i >= 0 && i < options.length)
      .map((i: number) => options[i]);

    const matchedValues = matchedOptions.map((opt: Option) => opt.value);

    // Determine if we need confirmation
    let needsConfirmation = aiResult.needsConfirmation;
    let confirmationMessage = '';
    let suggestedAction:
      | 'confirm'
      | 'reask'
      | 'add_more'
      | 'submit'
      | 'finish_multiselect' = 'submit';

    // Check if any matched option is an exclusive option (like "none of the above")
    const hasExclusiveOption = matchedOptions.some((opt: Option) =>
      isExclusiveOption(opt.label),
    );

    // Get the action (add or remove) from AI - default to 'add'
    const action: 'add' | 'remove' =
      aiResult.action === 'remove' ? 'remove' : 'add';

    if (aiResult.isValid && matchedOptions.length > 0 && hasExclusiveOption) {
      // Exclusive options like "none of the above" don't need confirmation
      needsConfirmation = false;
      suggestedAction = 'submit';
    } else if (aiResult.isValid && multiSelect && matchedOptions.length > 0) {
      // For multi-select, confirm what was selected or removed
      needsConfirmation = true;
      const selectedLabels = matchedOptions
        .map((opt: Option) => opt.label)
        .join(', ');
      if (action === 'remove') {
        confirmationMessage = `Removed ${selectedLabels}. Would you like to make more changes, or say "done" to continue?`;
      } else {
        confirmationMessage = `I heard you say ${selectedLabels}. Would you like to add more options, or say "done" to continue?`;
      }
      suggestedAction = 'confirm';
    } else if (
      aiResult.isValid &&
      matchedOptions.length > 0 &&
      aiResult.confidence === 'medium'
    ) {
      // For single select with medium confidence, ask for confirmation
      needsConfirmation = true;
      confirmationMessage = `Just to confirm, you selected "${matchedOptions[0].label}". Is that correct?`;
      suggestedAction = 'confirm';
    } else if (!aiResult.isValid) {
      suggestedAction = 'reask';
    }

    const result: ValidationResponse = {
      success: true,
      isValid: aiResult.isValid,
      matchedOptions,
      matchedValues,
      confidence: aiResult.confidence || 'medium',
      needsConfirmation,
      confirmationMessage,
      invalidReason: !aiResult.isValid ? aiResult.reason : undefined,
      suggestedAction,
      action: multiSelect ? action : undefined,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Voice validation API error:', error);
    return NextResponse.json({
      success: false,
      isValid: false,
      matchedOptions: [],
      matchedValues: [],
      confidence: 'low',
      needsConfirmation: false,
      invalidReason: 'Failed to validate answer',
      suggestedAction: 'reask',
    } as ValidationResponse);
  }
}

/**
 * Handle confirmation responses (yes/no/add more/done)
 */
async function handleConfirmation(
  transcript: string,
  previousSelections: string[],
  options: Option[],
  apiKey: string,
): Promise<NextResponse> {
  // First check for "done" pattern locally (faster than AI call)
  if (isDoneResponse(transcript)) {
    const selectedOptions = options.filter((opt) =>
      previousSelections.includes(opt.value),
    );
    return NextResponse.json({
      success: true,
      isValid: true,
      matchedOptions: selectedOptions,
      matchedValues: previousSelections,
      confidence: 'high',
      needsConfirmation: false,
      suggestedAction: 'finish_multiselect',
    } as ValidationResponse);
  }

  // Check for simple "yes" / affirmative responses - in multi-select context, this means add more
  const simpleYesPattern = /^(yes|yeah|yep|sure|yup|ok|okay|uh-huh)\.?$/i;
  if (simpleYesPattern.test(transcript.trim())) {
    const selectedOptions = options.filter((opt) =>
      previousSelections.includes(opt.value),
    );
    return NextResponse.json({
      success: true,
      isValid: true,
      matchedOptions: selectedOptions,
      matchedValues: previousSelections,
      confidence: 'high',
      needsConfirmation: true,
      confirmationMessage: 'Which additional option would you like to add?',
      suggestedAction: 'add_more',
    } as ValidationResponse);
  }

  const systemPrompt = `You are analyzing a user's response in a voice survey.
The user was asked: "Would you like to add more options, or say 'done' to continue?"

IMPORTANT CONTEXT: The user has already made selection(s). They are being asked if they want to ADD MORE options or make changes.
- If they say "yes", "sure", "I'd like to add more" = they want to ADD MORE (not confirm)
- If they say "no", "no more", "done", "that's all", "continue" = they are DONE and want to submit
- If they say an option name or description = they are selecting that option to ADD
- If they say "remove X", "delete X", "unselect X", "I don't want X anymore", "not X", "take away X" = they want to REMOVE that option
- If they say "no, that's wrong" or "not that one" (without specifying which option) = they want to REJECT and start over

Analyze their response and return a JSON object:
{
  "intent": "add_more" | "done" | "reject" | "select_option" | "remove_option" | "unclear",
  "matchedOptionIndex": number | null,
  "reason": string
}

- "add_more" = they want to add more options (said yes, sure, etc.)
- "done" = they don't want more, ready to submit (said no, done, continue, that's all)
- "reject" = they want to reject ALL selections and start over
- "select_option" = they named or described a specific option to ADD
- "remove_option" = they want to REMOVE a specific option from their selections
- "unclear" = can't determine their intent`;

  const optionsText = options
    .map((opt, i) => `${i}. "${opt.label}"`)
    .join('\n');

  const userPrompt = `Previously selected: ${previousSelections.join(', ')}
Available options:
${optionsText}

User's response: "${transcript}"

What is the user's intent?`;

  try {
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
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      throw new Error('API failed');
    }

    const data = await response.json();
    const textContent = data.content?.find(
      (c: { type: string }) => c.type === 'text',
    );
    const responseText = textContent?.text || '';

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON in response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Map previousSelections values back to options
    const selectedOptions = options.filter((opt) =>
      previousSelections.includes(opt.value),
    );

    switch (result.intent) {
      case 'done':
        // User is done selecting, submit the current selections
        return NextResponse.json({
          success: true,
          isValid: true,
          matchedOptions: selectedOptions,
          matchedValues: previousSelections,
          confidence: 'high',
          needsConfirmation: false,
          suggestedAction: 'finish_multiselect',
        } as ValidationResponse);

      case 'reject':
        return NextResponse.json({
          success: true,
          isValid: false,
          matchedOptions: [],
          matchedValues: [],
          confidence: 'high',
          needsConfirmation: false,
          invalidReason: 'User rejected the selection. Please select again.',
          suggestedAction: 'reask',
        } as ValidationResponse);

      case 'add_more':
        return NextResponse.json({
          success: true,
          isValid: true,
          matchedOptions: selectedOptions,
          matchedValues: previousSelections,
          confidence: 'high',
          needsConfirmation: true,
          confirmationMessage: 'Which additional option would you like to add?',
          suggestedAction: 'add_more',
        } as ValidationResponse);

      case 'select_option':
        // User named a specific option - add it to the selection
        if (
          result.matchedOptionIndex !== null &&
          result.matchedOptionIndex >= 0 &&
          result.matchedOptionIndex < options.length
        ) {
          const newOption = options[result.matchedOptionIndex];
          const newValues = [
            ...new Set([...previousSelections, newOption.value]),
          ];
          const newOptions = options.filter((opt) =>
            newValues.includes(opt.value),
          );

          return NextResponse.json({
            success: true,
            isValid: true,
            matchedOptions: newOptions,
            matchedValues: newValues,
            confidence: 'high',
            needsConfirmation: true,
            confirmationMessage: `Added "${newOption.label}". Would you like to add more, or say "done" to continue?`,
            suggestedAction: 'confirm',
            action: 'add',
          } as ValidationResponse);
        }
        // Couldn't match the option, ask again
        return NextResponse.json({
          success: true,
          isValid: false,
          matchedOptions: selectedOptions,
          matchedValues: previousSelections,
          confidence: 'low',
          needsConfirmation: true,
          confirmationMessage:
            "I couldn't find that option. Which option would you like to add?",
          suggestedAction: 'add_more',
        } as ValidationResponse);

      case 'remove_option':
        // User wants to remove a specific option from their selections
        if (
          result.matchedOptionIndex !== null &&
          result.matchedOptionIndex >= 0 &&
          result.matchedOptionIndex < options.length
        ) {
          const optionToRemove = options[result.matchedOptionIndex];
          // Check if this option is actually in the current selections
          if (previousSelections.includes(optionToRemove.value)) {
            const remainingValues = previousSelections.filter(
              (v) => v !== optionToRemove.value,
            );
            const remainingOptions = options.filter((opt) =>
              remainingValues.includes(opt.value),
            );

            // If all options were removed, ask them to select again
            if (remainingValues.length === 0) {
              return NextResponse.json({
                success: true,
                isValid: true,
                // Return what's being removed (for consistency with frontend expectations)
                matchedOptions: [optionToRemove],
                matchedValues: [optionToRemove.value],
                confidence: 'high',
                needsConfirmation: true,
                confirmationMessage: `Removed "${optionToRemove.label}". You have no options selected. Which option would you like to choose?`,
                suggestedAction: 'add_more',
                action: 'remove',
              } as ValidationResponse);
            }

            return NextResponse.json({
              success: true,
              isValid: true,
              // Return what's being removed (for consistency with frontend expectations)
              // The frontend will filter these out from the current selections
              matchedOptions: [optionToRemove],
              matchedValues: [optionToRemove.value],
              confidence: 'high',
              needsConfirmation: true,
              confirmationMessage: `Removed "${optionToRemove.label}". You now have ${remainingOptions.map((o) => o.label).join(', ')} selected. Would you like to make more changes, or say "done" to continue?`,
              suggestedAction: 'confirm',
              action: 'remove',
            } as ValidationResponse);
          }
          // Option wasn't in selections
          return NextResponse.json({
            success: true,
            isValid: false,
            matchedOptions: selectedOptions,
            matchedValues: previousSelections,
            confidence: 'medium',
            needsConfirmation: true,
            confirmationMessage: `"${optionToRemove.label}" wasn't selected. Your current selections are: ${selectedOptions.map((o) => o.label).join(', ')}. Would you like to make changes, or say "done" to continue?`,
            suggestedAction: 'add_more',
          } as ValidationResponse);
        }
        // Couldn't match the option to remove
        return NextResponse.json({
          success: true,
          isValid: false,
          matchedOptions: selectedOptions,
          matchedValues: previousSelections,
          confidence: 'low',
          needsConfirmation: true,
          confirmationMessage:
            "I couldn't find that option. Which option would you like to remove?",
          suggestedAction: 'add_more',
        } as ValidationResponse);

      default:
        return NextResponse.json({
          success: true,
          isValid: true,
          matchedOptions: selectedOptions,
          matchedValues: previousSelections,
          confidence: 'low',
          needsConfirmation: true,
          confirmationMessage:
            'I didn\'t quite catch that. You can add or remove options, or say "done" to continue.',
          suggestedAction: 'add_more',
        } as ValidationResponse);
    }
  } catch {
    return NextResponse.json({
      success: false,
      isValid: false,
      matchedOptions: [],
      matchedValues: [],
      confidence: 'low',
      needsConfirmation: true,
      suggestedAction: 'reask',
    } as ValidationResponse);
  }
}

/**
 * Fallback validation when AI is not available
 */
function fallbackValidation(
  transcript: string,
  options: Option[],
  multiSelect: boolean,
  previousSelections: string[] = [],
): ValidationResponse {
  const normalized = transcript.toLowerCase().trim();

  // Check for "done" response first
  if (previousSelections.length > 0 && isDoneResponse(transcript)) {
    const selectedOptions = options.filter((opt) =>
      previousSelections.includes(opt.value),
    );
    return {
      success: true,
      isValid: true,
      matchedOptions: selectedOptions,
      matchedValues: previousSelections,
      confidence: 'high',
      needsConfirmation: false,
      suggestedAction: 'finish_multiselect',
    };
  }

  const matchedOptions: Option[] = [];

  // Try direct label matching
  for (const opt of options) {
    const labelLower = opt.label.toLowerCase();
    if (normalized.includes(labelLower) || labelLower.includes(normalized)) {
      matchedOptions.push(opt);
      if (!multiSelect) break;
    }
  }

  // Try number-based matching
  if (matchedOptions.length === 0) {
    const numberWords: Record<string, number> = {
      one: 1,
      first: 1,
      two: 2,
      second: 2,
      three: 3,
      third: 3,
      four: 4,
      fourth: 4,
      five: 5,
      fifth: 5,
    };

    for (const [word, num] of Object.entries(numberWords)) {
      if (normalized.includes(word) && num <= options.length) {
        matchedOptions.push(options[num - 1]);
        if (!multiSelect) break;
      }
    }

    // Check for digit numbers
    const digitMatch = normalized.match(/\b(\d+)\b/g);
    if (digitMatch && matchedOptions.length === 0) {
      for (const digit of digitMatch) {
        const num = parseInt(digit, 10);
        if (num >= 1 && num <= options.length) {
          matchedOptions.push(options[num - 1]);
          if (!multiSelect) break;
        }
      }
    }
  }

  const isValid = matchedOptions.length > 0;
  const matchedValues = matchedOptions.map((opt) => opt.value);

  // Check if any matched option is exclusive (no confirmation needed)
  const hasExclusiveOption = matchedOptions.some((opt) =>
    isExclusiveOption(opt.label),
  );

  return {
    success: true,
    isValid,
    matchedOptions,
    matchedValues,
    confidence: isValid ? 'medium' : 'low',
    needsConfirmation: multiSelect && isValid && !hasExclusiveOption,
    confirmationMessage:
      multiSelect && isValid && !hasExclusiveOption
        ? `You selected ${matchedOptions.map((o) => o.label).join(', ')}. Would you like to add more, or say "done" to continue?`
        : undefined,
    invalidReason: !isValid
      ? "I couldn't match your answer to any option. Please try again."
      : undefined,
    suggestedAction: isValid
      ? multiSelect && !hasExclusiveOption
        ? 'confirm'
        : 'submit'
      : 'reask',
    // Fallback always assumes 'add' since we can't detect removal intent without AI
    action: multiSelect && isValid ? 'add' : undefined,
  };
}
