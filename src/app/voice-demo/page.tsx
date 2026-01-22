'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import {
  Check,
  Mic,
  Loader2,
  Settings,
  AlertTriangle,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Volume2,
} from 'lucide-react';
import Link from 'next/link';
import { sampleSurvey } from '../surveydata';
import type {
  VoiceCustomData,
  VoiceValidationRequest,
  VoiceValidationResponse,
  VoiceSessionInitRequest,
  VoiceSessionInitResponse,
  VoiceSessionEndRequest,
  TTSRequest,
  TTSResponse,
} from '@/packages/survey-form-package/src/renderer/layouts/VoiceLayout';
import type {
  AIHandlerContext,
  AIHandlerResponse,
} from '@/packages/survey-form-package/src/renderer/layouts/ChatLayout/types';
import { createAWSTranscribeSessionFactory } from '@/lib/aws-transcribe-client';
import { createMediaCaptureFactory } from '@/lib/media-capture-factory';

// Dynamic import of SurveyForm to avoid SSR issues with audio APIs
const SurveyForm = dynamic(
  () =>
    import('@/packages/survey-form-package/src/renderer/SurveyForm').then(
      (mod) => mod.SurveyForm,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    ),
  },
);

// Voice survey configuration
const voiceSurvey = sampleSurvey;

/**
 * Helper to extract options from block for AI handler
 */
function getBlockOptions(block: any): Array<{ label: string; value: any }> {
  if (block.options && Array.isArray(block.options)) {
    return block.options.map((opt: any) => ({
      label: opt.label || String(opt.value || opt),
      value: opt.value ?? opt,
    }));
  }
  if (block.items && Array.isArray(block.items)) {
    return (block.items as any[]).map((item) => ({
      label: item.label || String(item.value || item),
      value: item.value ?? item,
    }));
  }
  return [];
}

/**
 * Factory function for AI Handler - creates handler with specified voice
 * This allows the voice to be changed dynamically.
 */
const createAiHandler = (voice: string) => async (
  context: AIHandlerContext,
): Promise<AIHandlerResponse> => {
  try {
    const response = await fetch('/api/chat-survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalQuestion: context.block.label || context.block.name,
        blockType: context.block.type,
        options: getBlockOptions(context.block),
        questionNumber: context.currentQuestionIndex + 1,
        totalQuestions: context.totalQuestions,
        previousResponses: context.previousResponses,
        conversationHistory: context.conversationHistory
          .filter((m) => !m.isLoading)
          .map((m) => ({ role: m.role, content: m.content })),
        // Include TTS options - audio will be generated alongside the question
        includeTTS: false,
        ttsVoice: voice, // AWS Polly neural voice
      }),
    });

    const data = await response.json();
    return {
      conversationalQuestion:
        data.question || context.block.label || 'Please answer this question',
      // Include audio from the combined response if available
      audio: data.audio,
      audioFormat: data.audioFormat,
      audioSampleRate: data.audioSampleRate,
    };
  } catch (error) {
    console.error('AI handler error:', error);
    return {
      conversationalQuestion:
        context.block.label ||
        context.block.name ||
        'Please answer this question',
    };
  }
};

/**
 * Validation Handler - calls the voice-survey/validate API for AI-powered answer matching
 */
const validationHandler = async (
  request: VoiceValidationRequest,
): Promise<VoiceValidationResponse> => {
  try {
    const response = await fetch('/api/voice-survey/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Validation request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Validation error:', error);
    // Return a reask response on error
    return {
      success: false,
      isValid: false,
      matchedOptions: [],
      matchedValues: [],
      confidence: 'low',
      needsConfirmation: false,
      invalidReason: 'Failed to validate your answer. Please try again.',
      suggestedAction: 'reask',
    };
  }
};

/**
 * Session Init Handler - calls the voice-survey API for session initialization
 */
const sessionInitHandler = async (
  request: VoiceSessionInitRequest,
): Promise<VoiceSessionInitResponse> => {
  try {
    const response = await fetch('/api/voice-survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'init',
        ...request,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Session init error:', error);
    return { success: false, error: 'Failed to initialize session' };
  }
};

/**
 * Session End Handler - calls the voice-survey API for session cleanup
 */
const sessionEndHandler = async (
  request: VoiceSessionEndRequest,
): Promise<void> => {
  try {
    await fetch('/api/voice-survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'end',
        sessionId: request.sessionId,
      }),
    });
  } catch (error) {
    console.error('Session end error:', error);
  }
};

/**
 * AWS Polly TTS Handler - Streaming version
 * Returns a streaming URL that allows audio to start playing before fully downloaded.
 * This provides much better perceived performance than waiting for the full audio.
 */
const ttsHandler = async (request: TTSRequest): Promise<TTSResponse> => {
  // Build streaming URL with query parameters
  // Include timestamp to bust CDN cache (prevents stale audio on production)
  const params = new URLSearchParams({
    text: request.text,
    voice: request.voice || 'Joanna',
    language: request.language || 'en-US',
    engine: 'neural',
    _t: Date.now().toString(), // Cache buster
  });

  // Return streaming URL - audio will start playing as soon as data arrives
  return {
    streamUrl: `/api/voice-survey/tts?${params.toString()}`,
  };
};

// Available AWS Polly neural voices
const AVAILABLE_VOICES = [
  { id: 'Joanna', name: 'Joanna', gender: 'Female', accent: 'US English' },
  { id: 'Matthew', name: 'Matthew', gender: 'Male', accent: 'US English' },
  { id: 'Ivy', name: 'Ivy', gender: 'Female (Child)', accent: 'US English' },
  { id: 'Kendra', name: 'Kendra', gender: 'Female', accent: 'US English' },
  { id: 'Kimberly', name: 'Kimberly', gender: 'Female', accent: 'US English' },
  { id: 'Salli', name: 'Salli', gender: 'Female', accent: 'US English' },
  { id: 'Joey', name: 'Joey', gender: 'Male', accent: 'US English' },
  { id: 'Justin', name: 'Justin', gender: 'Male (Child)', accent: 'US English' },
  { id: 'Kevin', name: 'Kevin', gender: 'Male (Child)', accent: 'US English' },
  { id: 'Ruth', name: 'Ruth', gender: 'Female', accent: 'US English' },
  { id: 'Stephen', name: 'Stephen', gender: 'Male', accent: 'US English' },
  { id: 'Amy', name: 'Amy', gender: 'Female', accent: 'British English' },
  { id: 'Emma', name: 'Emma', gender: 'Female', accent: 'British English' },
  { id: 'Brian', name: 'Brian', gender: 'Male', accent: 'British English' },
  { id: 'Arthur', name: 'Arthur', gender: 'Male', accent: 'British English' },
  { id: 'Olivia', name: 'Olivia', gender: 'Female', accent: 'Australian English' },
] as const;

export default function VoiceDemoPage() {
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [micPermission, setMicPermission] = useState<
    'granted' | 'denied' | 'prompt'
  >('prompt');
  const [browserSupported, setBrowserSupported] = useState(true);
  const [surveyKey, setSurveyKey] = useState(0);
  const [showDataDetails, setShowDataDetails] = useState(false);

  // Voice settings
  const [autoListen, setAutoListen] = useState(true);
  const [orbStyle, setOrbStyle] = useState<
    'pulse' | 'wave' | 'glow' | 'breathe'
  >('breathe');
  const [selectedVoice, setSelectedVoice] = useState('Joanna');
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);

  // Create STT session factory (using AWS Transcribe for cross-browser support)
  const sttSessionFactory = useMemo(
    () =>
      createAWSTranscribeSessionFactory({
        websocketUrlEndpoint: '/api/voice-survey/stt/websocket',
        language: 'en-US',
        sampleRate: 16000,
        // Retry up to 3 times on connection failure
        maxRetries: 3,
        // Short timeout for first attempt - fail fast to trigger retry quickly
        initialTimeout: 5000,
        // Longer timeout for retry attempts
        retryTimeout: 10000,
        // Wait 1.5s after user stops speaking before submitting
        // This allows for natural pauses without cutting off speech
        finalTranscriptDelay: 1500,
        // Enable debug logging in development
        debug: process.env.NODE_ENV === 'development',
      }),
    []
  );

  // Create media capture factory for cross-platform audio recording
  // This handles iOS-specific quirks like AudioContext suspension
  const mediaCaptureFactory = useMemo(
    () =>
      createMediaCaptureFactory({
        sampleRate: 16000,
        debug: process.env.NODE_ENV === 'development',
      }),
    []
  );

  // Check browser support and permissions on mount
  useEffect(() => {
    // With custom STT (AWS Transcribe) and custom TTS (AWS Polly),
    // we only need Web Audio API support (for audio playback and capture)
    // We no longer depend on browser SpeechRecognition or SpeechSynthesis
    const hasWebAudio =
      typeof window !== 'undefined' &&
      (typeof AudioContext !== 'undefined' ||
        typeof (window as any).webkitAudioContext !== 'undefined');

    setBrowserSupported(hasWebAudio);

    // Check microphone permission
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'microphone' as PermissionName })
        .then((result) => {
          setMicPermission(result.state as 'granted' | 'denied' | 'prompt');
          result.onchange = () => {
            setMicPermission(result.state as 'granted' | 'denied' | 'prompt');
          };
        })
        .catch(() => {
          // Permissions API not fully supported
        });
    }
  }, []);

  const handleSubmit = useCallback((data: Record<string, any>) => {
    setSubmittedData(data);
  }, []);

  const handleRestart = useCallback(() => {
    setSubmittedData(null);
    setShowDataDetails(false);
    // Increment key to force re-mount the SurveyForm component
    setSurveyKey((prev) => prev + 1);
  }, []);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission('granted');
    } catch {
      setMicPermission('denied');
    }
  };

  // Preview a voice before selecting
  const previewVoice = useCallback(async (voiceId: string) => {
    // Stop any currently playing preview
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.src = '';
      setPreviewAudio(null);
    }

    setPreviewingVoice(voiceId);

    try {
      const params = new URLSearchParams({
        text: 'Hello! This is how I sound. I can help guide you through surveys with a natural, conversational tone.',
        voice: voiceId,
        language: 'en-US',
        engine: 'neural',
        _t: Date.now().toString(),
      });

      const audio = new Audio(`/api/voice-survey/tts?${params.toString()}`);
      setPreviewAudio(audio);

      audio.onended = () => {
        setPreviewingVoice(null);
        setPreviewAudio(null);
      };

      audio.onerror = () => {
        setPreviewingVoice(null);
        setPreviewAudio(null);
      };

      await audio.play();
    } catch (error) {
      console.error('Voice preview error:', error);
      setPreviewingVoice(null);
      setPreviewAudio(null);
    }
  }, [previewAudio]);

  // Stop preview when unmounting or when settings close
  useEffect(() => {
    return () => {
      if (previewAudio) {
        previewAudio.pause();
        previewAudio.src = '';
      }
    };
  }, [previewAudio]);

  // Browser not supported warning
  if (!browserSupported) {
    return (
      <div className="h-svh bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Browser Not Supported
          </h1>
          <p className="text-gray-600 mb-6">
            Voice survey requires Web Audio API support. Please use a modern
            browser like Chrome, Firefox, Edge, Safari, or Opera.
          </p>
          <Link href="/chat-demo">
            <Button className="bg-blue-500 hover:bg-blue-600">
              Try Chat Demo Instead
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-svh overflow-hidden">
      {/* Floating settings button */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
          className="bg-white/80 border-gray-200 text-gray-600 hover:bg-gray-100 backdrop-blur-sm shadow-sm"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-50 w-80 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-800">
              Voice Settings
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoListen}
                onChange={(e) => setAutoListen(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Auto-listen after speaking
              </span>
            </label>

            <div className="space-y-2">
              <span className="text-sm text-gray-700">
                Orb animation style:
              </span>
              <select
                value={orbStyle}
                onChange={(e) => setOrbStyle(e.target.value as any)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="breathe">Breathe (Recommended)</option>
                <option value="pulse">Pulse</option>
                <option value="wave">Wave</option>
                <option value="glow">Glow</option>
              </select>
            </div>

            <div className="space-y-2">
              <span className="text-sm text-gray-700">Voice:</span>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {AVAILABLE_VOICES.map((voice) => (
                  <div
                    key={voice.id}
                    className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      selectedVoice === voice.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="voice"
                        checked={selectedVoice === voice.id}
                        onChange={() => setSelectedVoice(voice.id)}
                        className="w-3 h-3 text-blue-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {voice.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {voice.gender} · {voice.accent}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        previewVoice(voice.id);
                      }}
                      disabled={previewingVoice !== null}
                      className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={`Preview ${voice.name}`}
                    >
                      {previewingVoice === voice.id ? (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <Link href="/chat-demo">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Switch to Chat Demo
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Switch to Standard Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Microphone Permission Prompt - overlay style */}
      {micPermission === 'prompt' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-blue-500 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            <Mic className="w-4 h-4 text-white" />
            <span className="text-sm text-white">
              Microphone access required
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={requestMicPermission}
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Enable
            </Button>
          </div>
        </div>
      )}

      {/* Microphone Denied Warning */}
      {micPermission === 'denied' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-amber-500 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            <AlertTriangle className="w-4 h-4 text-white" />
            <span className="text-sm text-white">
              Mic denied - text input only
            </span>
          </div>
        </div>
      )}

      {/* Show completion screen OR the survey */}
      {submittedData ? (
        /* Completion Screen */
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6">
          {/* Success Icon */}
          <div className="w-20 h-20 mb-6 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in duration-300">
            <Check className="w-10 h-10 text-green-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-light text-gray-800 mb-3 text-center">
            Survey Complete!
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-center max-w-md mb-8">
            Thank you for completing the survey. Your responses have been
            recorded successfully.
          </p>

          {/* Data Summary Card */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
            <button
              onClick={() => setShowDataDetails(!showDataDetails)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-700">
                View Submitted Data
              </span>
              {showDataDetails ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {showDataDetails && (
              <div className="border-t border-gray-100">
                <pre className="text-xs bg-gray-50 text-gray-700 p-4 overflow-auto max-h-60">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Button
              onClick={handleRestart}
              className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start New Survey
            </Button>
            <Link href="/demo" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
              >
                Try Standard Demo
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Voice Survey - Full Screen */
        <SurveyForm
          key={surveyKey}
          survey={voiceSurvey as any}
          layout="voice"
          onSubmit={handleSubmit}
          onChange={(data) => console.log('Survey data:', data)}
          customData={
            {
              // Messages
              welcomeMessage: 'Hey there, welcome to our survey!',
              completionMessage:
                'Thank you for completing the survey! Your responses have been recorded.',

              // Behavior options
              autoListen,
              silenceTimeout: 2500,
              maxListenTime: 20000,
              orbStyle,

              // Session configuration
              sessionConfig: {
                surveyId: 'voice-demo-survey',
                useBrowserTTS: true,
                useBrowserSTT: true,
              },

              // Injectable handlers - these replace the hardcoded API calls
              // Remove these to use the default local-only behavior (no AI)
              aiHandler: createAiHandler(selectedVoice), // AI handler now includes TTS audio in response (no separate TTS call)
              validationHandler,
              sessionInitHandler,
              sessionEndHandler,

              // TTS is now included in the aiHandler response from chat-survey API
              // The ttsHandler below is only used as fallback for non-AI speech (e.g., error messages)
              ttsHandler,
              ttsVoice: selectedVoice,
              language: 'en-US',

              // Custom STT using AWS Transcribe Streaming for cross-browser support
              // This replaces browser's SpeechRecognition which doesn't work on Firefox, Opera, etc.
              sttSessionFactory,

              // Custom media capture factory for cross-platform audio recording
              // This handles iOS-specific quirks like AudioContext suspension and getUserMedia issues
              mediaCaptureFactory,
            } satisfies VoiceCustomData
          }
          mode="pageless"
        />
      )}
    </div>
  );
}
