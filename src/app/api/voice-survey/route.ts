import { NextRequest, NextResponse } from 'next/server';

/**
 * Voice Survey API Route
 *
 * This route handles the HTTP fallback for voice survey operations.
 * For real-time WebSocket streaming to AWS Bedrock Nova 2 Sonic,
 * use the custom server implementation in /server/voice-websocket.ts
 *
 * Environment variables required:
 * - AWS_REGION (default: us-east-1)
 * - AWS_ACCESS_KEY_ID
 * - AWS_SECRET_ACCESS_KEY
 */

// Types for voice survey messages
export interface VoiceSessionConfig {
  sessionId: string;
  surveyId: string;
  userId?: string;
  language?: string;
}

export interface VoiceCommand {
  type: 'start' | 'stop' | 'navigate' | 'repeat' | 'skip';
  payload?: Record<string, unknown>;
}

export interface VoiceMessage {
  type: 'question' | 'response' | 'error' | 'command' | 'transcript';
  sessionId: string;
  content: string;
  blockId?: string;
  confidence?: number;
  isFinal?: boolean;
  timestamp: number;
}

// Session state management
interface SessionState {
  sessionId: string;
  currentBlockId?: string;
  lastQuestion?: string;
  conversationHistory: Array<{ role: 'assistant' | 'user'; content: string }>;
  createdAt: number;
  lastActivity: number;
}

// In-memory session store (use Redis in production)
const sessions = new Map<string, SessionState>();

// Cleanup old sessions (15 minute timeout)
const SESSION_TIMEOUT = 15 * 60 * 1000;

function cleanupSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      sessions.delete(sessionId);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupSessions, 5 * 60 * 1000);
}

/**
 * POST /api/voice-survey
 * Initialize a new voice session or send a message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sessionId, ...data } = body;

    switch (action) {
      case 'init': {
        // Initialize a new voice session
        const newSessionId = sessionId || `voice-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
        const session: SessionState = {
          sessionId: newSessionId,
          conversationHistory: [],
          createdAt: Date.now(),
          lastActivity: Date.now(),
        };
        sessions.set(newSessionId, session);

        return NextResponse.json({
          success: true,
          sessionId: newSessionId,
          message: 'Voice session initialized',
        });
      }

      case 'speak': {
        // Generate TTS audio for a question (fallback when WebSocket not available)
        const session = sessions.get(sessionId);
        if (!session) {
          return NextResponse.json(
            { success: false, error: 'Session not found' },
            { status: 404 }
          );
        }

        const { text, blockId } = data;
        session.lastQuestion = text;
        session.currentBlockId = blockId;
        session.lastActivity = Date.now();

        // Store in conversation history
        session.conversationHistory.push({
          role: 'assistant',
          content: text,
        });

        // In production, this would call AWS Polly or Bedrock for TTS
        // For now, return success and let client use Web Speech API
        return NextResponse.json({
          success: true,
          sessionId,
          text,
          useBrowserTTS: true, // Signal client to use browser TTS
        });
      }

      case 'transcript': {
        // Process a speech transcript
        const session = sessions.get(sessionId);
        if (!session) {
          return NextResponse.json(
            { success: false, error: 'Session not found' },
            { status: 404 }
          );
        }

        const { transcript, blockId, blockType } = data;
        session.lastActivity = Date.now();

        // Store in conversation history
        session.conversationHistory.push({
          role: 'user',
          content: transcript,
        });

        // Parse voice commands
        const command = parseVoiceCommand(transcript);
        if (command) {
          return NextResponse.json({
            success: true,
            sessionId,
            type: 'command',
            command,
          });
        }

        // Process the transcript as an answer
        const processedValue = processTranscript(transcript, blockType);

        return NextResponse.json({
          success: true,
          sessionId,
          type: 'answer',
          transcript,
          processedValue,
          blockId,
        });
      }

      case 'end': {
        // End the voice session
        sessions.delete(sessionId);
        return NextResponse.json({
          success: true,
          message: 'Voice session ended',
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Voice survey API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/voice-survey
 * Health check and session status
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (sessionId) {
    const session = sessions.get(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      currentBlockId: session.currentBlockId,
      historyLength: session.conversationHistory.length,
      lastActivity: session.lastActivity,
    });
  }

  // Health check
  return NextResponse.json({
    success: true,
    status: 'healthy',
    activeSessions: sessions.size,
    features: {
      webSocket: false, // WebSocket requires custom server
      browserTTS: true,
      browserSTT: true,
      awsBedrock: !!process.env.AWS_ACCESS_KEY_ID,
    },
  });
}

/**
 * Parse voice commands from transcript
 */
function parseVoiceCommand(transcript: string): VoiceCommand | null {
  const normalized = transcript.toLowerCase().trim();

  // Navigation commands
  if (/^(go\s+)?back|previous|before/.test(normalized)) {
    return { type: 'navigate', payload: { direction: 'back' } };
  }

  if (/^repeat|say\s+(that\s+)?again|what(\s+was\s+that)?/.test(normalized)) {
    return { type: 'repeat' };
  }

  if (/^skip|next|pass/.test(normalized)) {
    return { type: 'skip' };
  }

  if (/^stop|cancel|quit|exit/.test(normalized)) {
    return { type: 'stop' };
  }

  return null;
}

/**
 * Process transcript based on block type
 */
function processTranscript(
  transcript: string,
  blockType?: string
): string | number | boolean | string[] {
  const normalized = transcript.toLowerCase().trim();

  switch (blockType) {
    case 'radio':
    case 'select':
      // Return the raw transcript for option matching in the client
      return transcript.trim();

    case 'checkbox':
      // Split by common separators for multiple selections
      return transcript
        .split(/,|and|\band\b/)
        .map((s) => s.trim())
        .filter(Boolean);

    case 'range':
    case 'slider':
      // Extract number from transcript
      const numberMatch = transcript.match(/\d+(\.\d+)?/);
      if (numberMatch) {
        return parseFloat(numberMatch[0]);
      }
      return transcript;

    case 'radio': // Yes/No questions
      if (/^(yes|yeah|yep|sure|correct|right|affirmative)/.test(normalized)) {
        return 'yes';
      }
      if (/^(no|nope|nah|negative|wrong)/.test(normalized)) {
        return 'no';
      }
      return transcript;

    default:
      return transcript.trim();
  }
}
