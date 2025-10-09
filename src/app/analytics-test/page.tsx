'use client';

import React, { useState, useEffect } from 'react';
import { 
  UnifiedAnalyticsProvider, 
  useUnifiedAnalytics,
  GTMEvent,
  GA4Event,
  pushToGTMDataLayer
} from '@/packages/survey-form-package/src/analytics';

function AnalyticsTestContent() {
  const analytics = useUnifiedAnalytics({
    gtmEnabled: true,
    ga4Enabled: true,
    debug: true
  });

  const [eventLog, setEventLog] = useState<string[]>([]);
  const [surveyStarted, setSurveyStarted] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    setEventLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]);
  };

  useEffect(() => {
    // Track initial page view
    analytics.trackPageView('/analytics-test', 'Analytics Test Page');
    addLog('Page view tracked');

    // Set user properties for testing
    analytics.setUserId('test-user-123');
    analytics.setUserProperties({
      test_mode: true,
      environment: 'development',
      user_type: 'tester'
    });
    addLog('User properties set');
  }, []);

  // Test Event Handlers
  const handlePageView = () => {
    analytics.trackPageView('/test-page', 'Test Page View');
    addLog('Page view event sent');
  };

  const handleCustomEvent = () => {
    analytics.trackEvent('test_custom_event', {
      category: 'testing',
      action: 'button_click',
      label: 'test_button',
      value: Math.floor(Math.random() * 100)
    });
    addLog('Custom event sent');
  };

  const handleStartSurvey = () => {
    analytics.startSurvey('test-survey-001', 'Test Survey', 5);
    setSurveyStarted(true);
    addLog('Survey started');
  };

  const handleSurveyProgress = () => {
    const currentPage = Math.floor(Math.random() * 5) + 1;
    analytics.updateProgress(currentPage, 5);
    addLog(`Survey progress updated: Page ${currentPage}/5`);
  };

  const handleQuestionAnswer = () => {
    const questionId = `q${Math.floor(Math.random() * 10) + 1}`;
    analytics.trackAnswer(
      questionId,
      'Sample Question Text',
      'Sample Answer',
      'text'
    );
    addLog(`Question ${questionId} answered`);
  };

  const handleCompleteSurvey = () => {
    analytics.completeSurvey();
    setSurveyStarted(false);
    addLog('Survey completed');
  };

  const handleAbandonSurvey = () => {
    analytics.abandonSurvey();
    setSurveyStarted(false);
    addLog('Survey abandoned');
  };

  const handleFormInteraction = () => {
    const actions = ['field_focus', 'field_blur', 'dropdown_open', 'checkbox_toggle'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    analytics.trackFormInteraction(action, 'test_field', Math.random() * 100);
    addLog(`Form interaction: ${action}`);
  };

  const handleError = () => {
    analytics.trackError('Test error message - this is not a real error', false);
    addLog('Error tracked (non-fatal)');
  };

  const handleDirectGTM = () => {
    GTMEvent.custom('direct_gtm_test', {
      test_id: Date.now(),
      test_value: 'Direct GTM Event'
    });
    pushToGTMDataLayer({
      event: 'dataLayer_push_test',
      custom_data: 'Test data layer push'
    });
    addLog('Direct GTM events sent');
  };

  const handleDirectGA4 = () => {
    GA4Event.custom('direct_ga4_test', {
      test_id: Date.now(),
      test_value: 'Direct GA4 Event'
    });
    GA4Event.timing('Test', 'load_time', Math.random() * 5000);
    addLog('Direct GA4 events sent');
  };

  const checkAnalyticsStatus = () => {
    const status = {
      gtag: typeof window.gtag !== 'undefined',
      dataLayer: Array.isArray(window.dataLayer),
      dataLayerLength: window.dataLayer?.length || 0
    };
    console.log('Analytics Status:', status);
    console.log('DataLayer Contents:', window.dataLayer);
    addLog(`Analytics Status - gtag: ${status.gtag}, dataLayer: ${status.dataLayer} (${status.dataLayerLength} events)`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Analytics System Test</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Info */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Configuration</h2>
            <div className="space-y-1 text-sm">
              <p><strong>GTM ID:</strong> GTM-K82WBC5D</p>
              <p><strong>GA4 ID:</strong> G-NYWEMJ2852</p>
              <p><strong>Debug Mode:</strong> Enabled</p>
              <p><strong>User ID:</strong> test-user-123</p>
            </div>
          </div>

          {/* Basic Events */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Basic Events</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePageView}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Page View
              </button>
              <button
                onClick={handleCustomEvent}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Custom Event
              </button>
              <button
                onClick={handleFormInteraction}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
              >
                Form Interaction
              </button>
              <button
                onClick={handleError}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Track Error
              </button>
            </div>
          </div>

          {/* Survey Events */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Survey Events</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleStartSurvey}
                disabled={surveyStarted}
                className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300 text-sm"
              >
                Start Survey
              </button>
              <button
                onClick={handleSurveyProgress}
                disabled={!surveyStarted}
                className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 text-sm"
              >
                Update Progress
              </button>
              <button
                onClick={handleQuestionAnswer}
                disabled={!surveyStarted}
                className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-300 text-sm"
              >
                Answer Question
              </button>
              <button
                onClick={handleCompleteSurvey}
                disabled={!surveyStarted}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 text-sm"
              >
                Complete Survey
              </button>
              <button
                onClick={handleAbandonSurvey}
                disabled={!surveyStarted}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-300 text-sm col-span-2"
              >
                Abandon Survey
              </button>
            </div>
          </div>

          {/* Direct Provider Access */}
          <div className="p-4 bg-pink-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Direct Provider Access</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDirectGTM}
                className="px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
              >
                Direct GTM
              </button>
              <button
                onClick={handleDirectGA4}
                className="px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm"
              >
                Direct GA4
              </button>
              <button
                onClick={checkAnalyticsStatus}
                className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm col-span-2"
              >
                Check Status
              </button>
            </div>
          </div>
        </div>

        {/* Event Log and Debug Info */}
        <div className="space-y-4">
          {/* Event Log */}
          <div className="p-4 bg-gray-900 text-green-400 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-white">Event Log</h2>
            <div className="h-64 overflow-y-auto font-mono text-xs space-y-1">
              {eventLog.length === 0 ? (
                <p className="text-gray-500">No events logged yet...</p>
              ) : (
                eventLog.map((log, index) => (
                  <div key={index} className="text-green-400">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Debug Commands */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Debug Commands</h2>
            <pre className="text-xs bg-gray-800 text-white p-3 rounded overflow-x-auto">
{`// Check if analytics loaded
window.gtag
window.dataLayer

// View dataLayer contents
console.table(window.dataLayer)

// Send test event manually
window.gtag('event', 'manual_test', {
  value: 123
})

// Push to dataLayer
window.dataLayer.push({
  event: 'manual_push',
  custom_data: 'test'
})

// Check React GA4
window.ReactGA4`}
            </pre>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Testing Instructions</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Open Browser DevTools (F12)</li>
              <li>Go to Network tab, filter by "collect" or "gtm"</li>
              <li>Click test buttons and watch for network requests</li>
              <li>Check Console for debug logs (prefixed with [UnifiedAnalytics])</li>
              <li>Use debug commands in Console to verify setup</li>
              <li>Check Real-Time reports in GA4 dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsTestPage() {
  return (
    <UnifiedAnalyticsProvider
      gtmContainerId="GTM-K82WBC5D"
      ga4MeasurementId="G-NYWEMJ2852"
      debug={true}
      initialDataLayer={{
        page_type: 'test',
        environment: 'development'
      }}
    >
      <AnalyticsTestContent />
    </UnifiedAnalyticsProvider>
  );
}