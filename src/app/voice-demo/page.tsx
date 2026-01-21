'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Check,
  Mic,
  Loader2,
  Settings,
  AlertTriangle,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { sampleSurvey } from '../surveydata';

// Dynamic import of SurveyForm to avoid SSR issues with audio APIs
const SurveyForm = dynamic(
  () =>
    import('@/packages/survey-form-package/src/renderer/SurveyForm').then(
      (mod) => mod.SurveyForm
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    ),
  }
);

// Voice survey configuration
const voiceSurvey = sampleSurvey;

export default function VoiceDemoPage() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [browserSupported, setBrowserSupported] = useState(true);

  // Voice settings
  const [autoListen, setAutoListen] = useState(true);
  const [orbStyle, setOrbStyle] = useState<'pulse' | 'wave' | 'glow' | 'breathe'>('breathe');

  // Check browser support and permissions on mount
  useEffect(() => {
    // Check for SpeechRecognition support
    const hasSpeechRecognition =
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

    const hasSpeechSynthesis =
      typeof window !== 'undefined' && 'speechSynthesis' in window;

    setBrowserSupported(hasSpeechRecognition && hasSpeechSynthesis);

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

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission('granted');
    } catch {
      setMicPermission('denied');
    }
  };

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
            Voice survey requires Speech Recognition and Speech Synthesis APIs.
            Please use Chrome, Edge, or Safari for the best experience.
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

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <Link href="/chat-demo">
                <Button variant="outline" size="sm" className="w-full bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50">
                  Switch to Chat Demo
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="sm" className="w-full bg-transparent border-gray-200 text-gray-600 hover:bg-gray-50">
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
            <Button size="sm" variant="secondary" onClick={requestMicPermission} className="bg-white text-blue-600 hover:bg-gray-50">
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

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2">
          <Alert className="bg-green-50 border-green-200 shadow-lg">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Survey submitted successfully.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Voice Survey - Full Screen */}
      <SurveyForm
        survey={voiceSurvey as any}
        layout="voice"
        onSubmit={handleSubmit}
        onChange={(data) => console.log('Survey data:', data)}
        customData={{
          welcomeMessage:
            "Hi! I'm here to help you complete this survey. You can speak your answers or type them. Ready to begin?",
          completionMessage:
            "Thank you for completing the survey! Your responses have been recorded.",
          autoListen,
          silenceTimeout: 2500,
          maxListenTime: 20000,
          orbStyle,
          sessionConfig: {
            surveyId: 'voice-demo-survey',
            useBrowserTTS: true,
            useBrowserSTT: true,
          },
        }}
        mode="pageless"
      />

      {/* Submitted Data Preview */}
      {submittedData && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 z-40">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">
              Submitted Data:
            </h3>
            <button
              onClick={() => setSubmittedData(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <pre className="text-xs bg-gray-50 text-gray-700 p-3 rounded-lg overflow-auto max-h-40 border border-gray-100">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
