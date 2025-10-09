'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  UnifiedAnalyticsProvider, 
  useUnifiedAnalytics
} from '@/packages/survey-form-package/src/analytics';

interface DebugStatus {
  scriptsLoaded: boolean;
  gtagExists: boolean;
  dataLayerExists: boolean;
  gaScriptInDom: boolean;
  gtmScriptInDom: boolean;
  dataLayerEvents: any[];
  networkLogs: string[];
  reactGA4Loaded: boolean;
  reactGTMLoaded: boolean;
}

function AnalyticsDebugContent() {
  const analytics = useUnifiedAnalytics({
    gtmEnabled: true,
    ga4Enabled: true,
    debug: true
  });

  const [status, setStatus] = useState<DebugStatus>({
    scriptsLoaded: false,
    gtagExists: false,
    dataLayerExists: false,
    gaScriptInDom: false,
    gtmScriptInDom: false,
    dataLayerEvents: [],
    networkLogs: [],
    reactGA4Loaded: false,
    reactGTMLoaded: false
  });

  const [realTimeEvents, setRealTimeEvents] = useState<string[]>([]);
  const [eventCounter, setEventCounter] = useState(0);
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null);

  // Your IDs
  const GA_ID = 'G-NYWEMJ2852';
  const GTM_ID = 'GTM-K82WBC5D';

  const addRealTimeEvent = useCallback((event: string) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    setRealTimeEvents(prev => [`[${timestamp}] ${event}`, ...prev.slice(0, 29)]);
    setEventCounter(prev => prev + 1);
  }, []);

  const updateStatus = useCallback(() => {
    const gaScript = document.querySelector('script[src*="gtag/js"]');
    const gtmScript = document.querySelector('script[src*="gtm.js"]');
    
    setStatus({
      scriptsLoaded: !!(gaScript || gtmScript),
      gtagExists: typeof window.gtag === 'function',
      dataLayerExists: Array.isArray(window.dataLayer),
      gaScriptInDom: !!gaScript,
      gtmScriptInDom: !!gtmScript,
      dataLayerEvents: window.dataLayer?.slice(-20) || [],
      networkLogs: [],
      reactGA4Loaded: typeof window.gtag === 'function',
      reactGTMLoaded: Array.isArray(window.dataLayer) && window.dataLayer.length > 0
    });
  }, []);

  // Separate useEffect for initialization only
  useEffect(() => {
    console.log('=== New Analytics Debug Started ===');
    
    // Initial page view
    analytics.trackPageView('/analytics-debug', 'Analytics Debug Page');
    addRealTimeEvent('Page view tracked');

    // Set debug user
    analytics.setUserId('debug-user-' + Date.now());
    analytics.setUserProperties({
      debug_mode: true,
      test_environment: 'development',
      browser: navigator.userAgent.split(' ').pop()
    });
    addRealTimeEvent('Debug user configured');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Separate useEffect for status updates
  useEffect(() => {
    // Update status periodically
    const interval = setInterval(() => {
      updateStatus();
    }, 2000);

    // Initial update
    setTimeout(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [updateStatus]);

  // Test functions
  const sendBasicEvent = () => {
    analytics.trackEvent('debug_test_event', {
      category: 'debug',
      action: 'button_click',
      label: 'basic_test',
      value: eventCounter
    });
    addRealTimeEvent(`Basic event sent (#${eventCounter})`);
  };

  const sendSurveyEvents = () => {
    // Start survey
    const surveyId = `debug-survey-${Date.now()}`;
    analytics.startSurvey(surveyId, 'Debug Test Survey', 3);
    setActiveSurvey(surveyId);
    addRealTimeEvent('Survey started');

    // Simulate progress - with proper delays to ensure survey is initialized
    setTimeout(() => {
      analytics.updateProgress(1, 3);
      addRealTimeEvent('Progress: Page 1/3');
      
      // Track answer after progress update
      setTimeout(() => {
        analytics.trackAnswer('q1', 'Test Question 1', 'Test Answer 1', 'text');
        addRealTimeEvent('Question 1 answered');
      }, 100);
    }, 500);

    setTimeout(() => {
      analytics.updateProgress(2, 3);
      addRealTimeEvent('Progress: Page 2/3');
      
      // Track answer after progress update
      setTimeout(() => {
        analytics.trackAnswer('q2', 'Test Question 2', ['Option A', 'Option B'], 'checkbox');
        addRealTimeEvent('Question 2 answered');
      }, 100);
    }, 1500);

    setTimeout(() => {
      analytics.updateProgress(3, 3);
      addRealTimeEvent('Progress: Page 3/3');
      
      // Complete survey after final progress update
      setTimeout(() => {
        analytics.completeSurvey();
        setActiveSurvey(null);
        addRealTimeEvent('Survey completed');
      }, 100);
    }, 2500);
  };

  const testFormInteractions = () => {
    const interactions = [
      { action: 'field_focus', label: 'email_field' },
      { action: 'field_change', label: 'password_field' },
      { action: 'dropdown_open', label: 'country_select' },
      { action: 'checkbox_toggle', label: 'terms_checkbox' },
      { action: 'submit_attempt', label: 'form_submit' }
    ];

    interactions.forEach((interaction, index) => {
      setTimeout(() => {
        analytics.trackFormInteraction(interaction.action, interaction.label);
        addRealTimeEvent(`Form: ${interaction.action} on ${interaction.label}`);
      }, index * 300);
    });
  };

  const testErrorTracking = () => {
    // Non-fatal error
    analytics.trackError('Debug non-fatal error test', false);
    addRealTimeEvent('Non-fatal error tracked');

    // Fatal error
    setTimeout(() => {
      analytics.trackError('Debug fatal error test', true);
      addRealTimeEvent('Fatal error tracked');
    }, 500);

    // Exception tracking
    try {
      throw new Error('Test exception for debugging');
    } catch (e) {
      analytics.trackError((e as Error).message, false);
      addRealTimeEvent('Exception caught and tracked');
    }
  };

  const testDirectProviderAccess = () => {
    // Direct GTM access
    analytics.GTMEvent.custom('debug_direct_gtm', {
      timestamp: Date.now(),
      debug: true
    });
    addRealTimeEvent('Direct GTM event sent');

    // Direct GA4 access
    analytics.GA4Event.custom('debug_direct_ga4', {
      timestamp: Date.now(),
      debug: true
    });
    addRealTimeEvent('Direct GA4 event sent');

    // Direct dataLayer push
    analytics.pushToGTMDataLayer({
      event: 'debug_dataLayer_push',
      custom_field: 'test_value',
      timestamp: Date.now()
    });
    addRealTimeEvent('Direct dataLayer push');
  };

  const testTimingEvents = () => {
    const loadTime = Math.random() * 5000;
    analytics.GA4Event.timing('Debug', 'page_load', loadTime, 'debug_page');
    addRealTimeEvent(`Timing event: ${loadTime.toFixed(0)}ms`);

    // Track session time
    analytics.trackSessionTime();
    addRealTimeEvent('Session time tracked');
  };

  const clearEvents = () => {
    setRealTimeEvents([]);
    setEventCounter(0);
    addRealTimeEvent('Event log cleared');
  };

  const exportDataLayer = () => {
    const data = JSON.stringify(window.dataLayer, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dataLayer-${Date.now()}.json`;
    a.click();
    addRealTimeEvent('DataLayer exported');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Analytics System Debug</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Panel */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2 text-sm">
            <StatusItem label="Scripts Loaded" value={status.scriptsLoaded} />
            <StatusItem label="window.gtag" value={status.gtagExists} />
            <StatusItem label="dataLayer" value={status.dataLayerExists} />
            <StatusItem label="GA4 Script" value={status.gaScriptInDom} />
            <StatusItem label="GTM Script" value={status.gtmScriptInDom} />
            <StatusItem label="React GA4" value={status.reactGA4Loaded} />
            <StatusItem label="React GTM" value={status.reactGTMLoaded} />
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span>DataLayer Events:</span>
                <span className="font-mono">{status.dataLayerEvents.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Events Sent:</span>
                <span className="font-mono">{eventCounter}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Survey:</span>
                <span className={`text-xs ${activeSurvey ? 'text-green-600' : 'text-gray-400'}`}>
                  {activeSurvey ? activeSurvey.substring(0, 20) + '...' : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-2">
            <button
              onClick={sendBasicEvent}
              className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Send Basic Event
            </button>
            <button
              onClick={sendSurveyEvents}
              disabled={!!activeSurvey}
              className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 text-sm"
            >
              {activeSurvey ? 'Survey in Progress...' : 'Simulate Survey Flow'}
            </button>
            <button
              onClick={testFormInteractions}
              className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
            >
              Test Form Interactions
            </button>
            <button
              onClick={testErrorTracking}
              className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Test Error Tracking
            </button>
            <button
              onClick={testDirectProviderAccess}
              className="w-full px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
            >
              Direct Provider Access
            </button>
            <button
              onClick={testTimingEvents}
              className="w-full px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
            >
              Test Timing Events
            </button>
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Utilities</h2>
          <div className="space-y-2">
            <button
              onClick={updateStatus}
              className="w-full px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            >
              Refresh Status
            </button>
            <button
              onClick={clearEvents}
              className="w-full px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              Clear Event Log
            </button>
            <button
              onClick={exportDataLayer}
              className="w-full px-3 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm"
            >
              Export DataLayer
            </button>
            <button
              onClick={() => {
                console.log('=== Analytics Debug Info ===');
                console.log('window.gtag:', window.gtag);
                console.log('window.dataLayer:', window.dataLayer);
                console.log('Analytics object:', analytics);
                addRealTimeEvent('Debug info logged to console');
              }}
              className="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            >
              Log to Console
            </button>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
            <div>GTM: {GTM_ID}</div>
            <div>GA4: {GA_ID}</div>
          </div>
        </div>

        {/* Real-time Event Log */}
        <div className="bg-gray-900 p-6 rounded-lg shadow col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Real-time Events</h2>
          <div className="h-80 overflow-y-auto font-mono text-xs space-y-1">
            {realTimeEvents.length === 0 ? (
              <p className="text-gray-500">Waiting for events...</p>
            ) : (
              realTimeEvents.map((event, index) => (
                <div key={index} className="text-green-400">
                  {event}
                </div>
              ))
            )}
          </div>
        </div>

        {/* DataLayer Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">DataLayer (Last 5)</h2>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-80">
            {JSON.stringify(status.dataLayerEvents.slice(-5), null, 2)}
          </pre>
        </div>

        {/* Debug Console */}
        <div className="bg-gray-50 p-6 rounded-lg shadow col-span-1 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Debug Console Commands</h2>
          <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`// Check if new analytics system is loaded
window.gtag // Should be a function
window.dataLayer // Should be an array

// View all dataLayer events
console.table(window.dataLayer)

// Send custom event using new system
window.gtag('event', 'custom_debug', { value: 123 })

// Push to dataLayer directly
window.dataLayer.push({ event: 'direct_push', data: 'test' })

// Check specific provider status
window.ReactGA4 // react-ga4 library
window.TagManager // react-gtm-module library

// Filter dataLayer by event type
window.dataLayer.filter(e => e.event === 'survey_start')

// Get analytics configuration
localStorage.getItem('analytics_debug')

// Monitor real-time events
window.dataLayer.forEach(e => console.log(e.event, e))`}
          </pre>
        </div>

        {/* Validation Guide */}
        <div className="bg-blue-50 p-6 rounded-lg shadow col-span-1 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Validation Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Browser DevTools</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Open Network tab → Filter: "collect" or "gtm"</li>
                <li>Click test buttons → Watch for requests</li>
                <li>Check Console for [UnifiedAnalytics] logs</li>
                <li>Verify no CORS or CSP errors</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Google Analytics 4</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Go to Reports → Realtime</li>
                <li>Events should appear within 1-2 minutes</li>
                <li>Check DebugView for detailed event data</li>
                <li>Verify user properties are set</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Google Tag Manager</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Enable Preview mode in GTM</li>
                <li>Connect to this page</li>
                <li>Verify container loads</li>
                <li>Check dataLayer events in preview</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Common Issues</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>🚫 Ad blockers (disable all extensions)</li>
                <li>🚫 Invalid IDs (check GTM/GA4 IDs)</li>
                <li>🚫 Not published (publish GTM container)</li>
                <li>🚫 Network issues (check firewall/proxy)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}:</span>
      <span className={value ? 'text-green-600' : 'text-red-600'}>
        {value ? '✅ Active' : '❌ Inactive'}
      </span>
    </div>
  );
}

export default function AnalyticsDebugPage() {
  return (
    <UnifiedAnalyticsProvider
      gtmContainerId="GTM-K82WBC5D"
      ga4MeasurementId="G-NYWEMJ2852"
      debug={true}
      initialDataLayer={{
        page_type: 'debug',
        environment: 'development',
        debug_mode: true
      }}
    >
      <AnalyticsDebugContent />
    </UnifiedAnalyticsProvider>
  );
}