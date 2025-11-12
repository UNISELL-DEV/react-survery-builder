'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { SurveyForm } from "@/packages/survey-form-package/src";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Upload, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { useTheme } from 'next-themes';
import { sampleSurvey } from './surveydata'

export default function FormRendererExample() {
  const { theme, setTheme } = useTheme();
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Survey submitted successfully.');
  const [activeTheme, setActiveTheme] = useState('modern');
  const [currentSurvey, setCurrentSurvey] = useState(sampleSurvey);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [resumeState, setResumeState] = useState({
    savedData: null,
    savedPage: 0,
    savedHistory: null as any,
    isResuming: false,
    canShow: false
  });

  // Load saved progress
  const loadProgress = () => {
    const answers = localStorage.getItem('surveyAnswers');
    const page = localStorage.getItem('surveyPage');
    const history = localStorage.getItem('surveyNavigationHistory');

    console.log('[FormRendererExample] Loading progress from localStorage:', {
      answers,
      page,
      history,
      parsedAnswers: answers ? JSON.parse(answers) : null,
      parsedPage: page ? parseInt(page, 10) : 0,
      parsedHistory: history ? JSON.parse(history) : null
    });

    if (answers) {
      const parsedAnswers = JSON.parse(answers);
      const parsedPage = page ? parseInt(page, 10) : 0;
      const parsedHistory = history ? JSON.parse(history) : null;

      // Batch state updates into a single setState call
      setResumeState({
        savedData: parsedAnswers,
        savedPage: parsedPage,
        savedHistory: parsedHistory,
        isResuming: true,
        canShow: true
      });

      console.log('[FormRendererExample] Set resume state:', {
        savedData: parsedAnswers,
        savedPage: parsedPage,
        savedHistory: parsedHistory,
        isResuming: true
      });
      console.log('[FormRendererExample] Rendering SurveyForm with props:', {
        initialValues: parsedAnswers,
        startPage: parsedPage,
        initialNavigationHistory: parsedHistory,
        hasSavedData: !!parsedAnswers && Object.keys(parsedAnswers || {}).length > 0,
        isResuming: true
      });
    } else {
      setResumeState(prev => ({
        ...prev,
        canShow: true
      }));
    }
  };

  // Clear saved data
  const clearSavedData = () => {
    localStorage.removeItem('surveyAnswers');
    localStorage.removeItem('surveyPage');
    localStorage.removeItem('surveyNavigationHistory');
    setResumeState({
      savedData: null,
      savedPage: 0,
      savedHistory: null,
      isResuming: false,
      canShow: false
    });
    window.location.reload(); // Reload to reset the form
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
    setAlertMessage('Survey submitted successfully.');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleChange = (data: Record<string, any>) => {
    localStorage.setItem('surveyAnswers', JSON.stringify(data));
    console.log(data);
  };

  const handlePageChange = (pageIndex: number, totalPages: number) => {
    localStorage.setItem('surveyPage', pageIndex.toString());
    setResumeState(prev => ({
      ...prev,
      savedPage: pageIndex
    }));
  };

  const handleNavigationHistoryChange = (history: any[]) => {
    localStorage.setItem('surveyNavigationHistory', JSON.stringify(history));
    console.log('[FormRendererExample] Navigation history saved:', history);
  };

  const validateAndLoadJson = () => {
    try {
      setJsonError('');
      const parsedJson = JSON.parse(jsonInput);

      // Basic validation to ensure it's a survey object
      if (!parsedJson.rootNode || !parsedJson.rootNode.type || !parsedJson.rootNode.items) {
        setJsonError('Invalid survey format. Must contain rootNode with type and items properties.');
        return;
      }

      setCurrentSurvey(parsedJson);
      setJsonInput('');
      setIsSheetOpen(false);

      // Show success message
      setAlertMessage('Survey loaded successfully.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

    } catch (error) {
      setJsonError('Invalid JSON format. Please check your syntax.');
    }
  };

  const loadSampleJson = () => {
    setJsonInput(JSON.stringify(currentSurvey, null, 2));
    setJsonError('');
  };

  const clearJson = () => {
    setJsonInput('');
    setJsonError('');
  };

  // Memoize static props to prevent re-renders
  const logoElement = useMemo(() => <Logo className="h-5 sm:h-6 w-auto text-primary mx-auto" />, []);

  const progressBarConfig = useMemo(() => ({
    type: 'percentage' as const,
    showPercentage: true,
    showStepInfo: true,
    position: 'top' as const,
  }), []);

  const analyticsConfig = useMemo(() => ({
    enabled: true,
    sessionId: "unique-session-123",
    userId: "user-456",
    surveyId: "survey-abc",
    googleAnalytics: {
      measurementId: "G-NYWEMJ2852"
    },
    googleTagManager: {
      containerId: "GTM-K82WBC5D"
    },
    trackFieldInteractions: true,
    trackValidationErrors: true,
    trackTimings: true
  }), []);

  return (
    <div className="container-fluid mx-auto min-h-screen">
      {/* Debug info and controls */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 dark:bg-gray-900/90 p-2 rounded-lg shadow-lg">
        <div className="text-xs space-y-1">
          <div>Saved: {resumeState.savedData ? Object.keys(resumeState.savedData).length : 0} fields</div>
          <div>Page: {resumeState.savedPage + 1}</div>
          <div>History: {resumeState.savedHistory ? resumeState.savedHistory.length : 0} entries</div>
          <div>Resuming: {resumeState.isResuming ? 'Yes' : 'No'}</div>
          <button
            onClick={clearSavedData}
            className="mt-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            Clear Saved Data
          </button>
        </div>
      </div>

      {resumeState.canShow && <SurveyForm
        logo={logoElement}
        survey={currentSurvey as any}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onPageChange={handlePageChange}
        onNavigationHistoryChange={handleNavigationHistoryChange}
        initialValues={resumeState.isResuming ? resumeState.savedData : undefined}
        startPage={resumeState.isResuming ? resumeState.savedPage : 0}
        initialNavigationHistory={resumeState.isResuming ? resumeState.savedHistory : undefined}
        theme={activeTheme as any}
        enableDebug={true}
        progressBar={progressBarConfig}
        analytics={analyticsConfig}
      /> }
      <div className="fixed bottom-4 right-4">
        <Button
          type="button"
          aria-label="Toggle dark/light mode"
          className="text-xl shadow-none border-0 p-2 rounded-full bg-white/60 dark:bg-[#181d23]/60 ring-1 ring-inset ring-blue-100 dark:ring-teal-700 hover:bg-slate-100 dark:hover:bg-[#202730] transition-transform scale-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-teal-400 flex items-center justify-center"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span className="inline-flex items-center h-6 w-6">
            {theme !== 'dark'
              ? (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-700"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M4.464 4.464L3.05 3.05m16.95 1.414l-1.414 1.414M4.464 19.536l-1.414 1.414" /></svg>
              ) : (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-teal-400"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 1 0 21 12.79Z" /></svg>
              )}
          </span>
        </Button>
      </div>
    </div>
  );
}