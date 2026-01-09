'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { AIHandlerContext, AIHandlerResponse } from "@/packages/survey-form-package/src/renderer/layouts/ChatLayout";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { sampleSurvey } from '../surveydata';


// Dynamic import directly from SurveyForm file to avoid dagre dependency chain
const SurveyForm = dynamic(
  () => import("@/packages/survey-form-package/src/renderer/SurveyForm").then(mod => mod.SurveyForm),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }
);

// Sample survey for chat demo
// const chatSurvey = {
//   rootNode: {
//     type: 'root',
//     uuid: 'root-1',
//     items: [
//       {
//         type: 'textfield',
//         uuid: 'name-1',
//         fieldName: 'fullName',
//         label: "What is your name?",
//         placeholder: 'Enter your full name',
//       },
//       {
//         type: 'radio',
//         uuid: 'age-1',
//         fieldName: 'ageRange',
//         label: "What is your age range?",
//         labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
//         values: ['18-24', '25-34', '35-44', '45-54', '55+'],
//       },
//       {
//         type: 'radio',
//         uuid: 'exercise-1',
//         fieldName: 'exerciseFrequency',
//         label: "How often do you exercise?",
//         labels: ['Daily', 'A few times a week', 'Once a week', 'Rarely', 'Never'],
//         values: ['daily', 'few-times-week', 'once-week', 'rarely', 'never'],
//       },
//       {
//         type: 'checkbox',
//         uuid: 'goals-1',
//         fieldName: 'healthGoals',
//         label: "What are your health goals? Select all that apply.",
//         labels: ['Lose weight', 'Build muscle', 'Improve flexibility', 'Reduce stress', 'Better sleep'],
//         values: ['lose-weight', 'build-muscle', 'flexibility', 'reduce-stress', 'better-sleep'],
//       },
//       {
//         type: 'textarea',
//         uuid: 'additional-1',
//         fieldName: 'additionalInfo',
//         label: "Is there anything else you'd like to share about your health journey?",
//         placeholder: 'Tell us more...',
//       },
//     ],
//   },
// };

const chatSurvey = sampleSurvey;

// Helper to extract options from block (handles multiple formats)
function getBlockOptions(block: any): Array<{ label: string; value: any }> {
  // Handle options array (preferred format)
  if (block.options && Array.isArray(block.options)) {
    return block.options.map((opt: any) => ({
      label: opt.label || String(opt.value),
      value: opt.value,
    }));
  }
  // Handle items array
  if (block.items && Array.isArray(block.items)) {
    return block.items.map((item: any) => ({
      label: item.label || String(item.value),
      value: item.value,
    }));
  }
  // Handle labels/values arrays (legacy format)
  if (block.labels && Array.isArray(block.labels)) {
    const values = block.values || block.labels;
    return block.labels.map((label: string, i: number) => ({
      label,
      value: values[i],
    }));
  }
  return [];
}

// AI Handler that calls our API route
const aiHandler = async (context: AIHandlerContext): Promise<AIHandlerResponse> => {
  try {
    // Build conversation history for AI context
    const conversationHistory = context.conversationHistory
      .filter(msg => !msg.isLoading)
      .map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

    // Extract options from block
    const options = getBlockOptions(context.block);

    // Build request body
    const requestBody: Record<string, any> = {
      originalQuestion: context.block.label,
      blockType: context.block.type,
      options: options.length > 0 ? options : undefined,
      outputSchema: (context.block as any).outputSchema,
      questionNumber: context.currentQuestionIndex + 1,
      totalQuestions: context.totalQuestions,
      previousResponses: context.previousResponses,
      conversationHistory,
    };

    // Add multi-field context if available
    if (context.currentField) {
      requestBody.inputSchema = context.inputSchema;
      requestBody.currentField = context.currentField;
      requestBody.collectedFields = context.collectedFields;
      requestBody.remainingFields = context.remainingFields;
    }

    const response = await fetch('/api/chat-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    return {
      conversationalQuestion: data.question,
    };
  } catch (error) {
    console.error('Error calling AI handler:', error);
    // Fallback to original question or field name
    const fallback = context.currentField
      ? `What is your ${context.currentField}?`
      : (context.block.label || 'Please answer this question:');
    return {
      conversationalQuestion: fallback,
    };
  }
};

export default function ChatDemoPage() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chat Survey Demo
            </h1>
          </div>
          <div className="flex gap-2">
            <Link href="/demo">
              <Button variant="outline" size="sm">
                Standard Demo
              </Button>
            </Link>
            <Link href="/builder">
              <Button variant="outline" size="sm">
                Builder
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Survey submitted successfully.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Chat Survey */}
      <div className="h-[calc(100vh-60px)]">
        <SurveyForm
          survey={chatSurvey as any}
          layout="chat"
          onSubmit={handleSubmit}
          onChange={(data) => console.log('Survey data:', data)}
          customData={{
            aiHandler,
            welcomeMessage: "Hey there! I'm going to ask you a few questions about your health and fitness goals. Ready to get started?",
            typingDelay: 800,
          }}
          progressBar={{
            type: 'bar',
            position: 'top',
            showPercentage: true,
          }}
          mode="pageless"
        />
      </div>

      {/* Submitted Data Preview */}
      {submittedData && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-40">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Submitted Data:
          </h3>
          <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto max-h-40">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
