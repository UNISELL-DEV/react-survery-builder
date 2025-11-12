'use client';

import React, { useState } from 'react';
import { SurveyForm } from "@/packages/survey-form-package/src";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Upload, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { sampleSurvey } from '../surveydata';

export default function FormRendererExample() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Survey submitted successfully.');
  const [activeTheme, setActiveTheme] = useState('modern');
  const [currentSurvey, setCurrentSurvey] = useState(sampleSurvey);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSubmit = (data: Record<string, any>) => {
      setSubmittedData(data);
      setAlertMessage('Survey submitted successfully.');
      setShowAlert(true);
      setTimeout(() => {
          setShowAlert(false);
      }, 5000);
  };

  const handleChange = (data: Record<string, any>) => {
      console.log(data);
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

  return (
      <div className="container-fluid mx-auto min-h-screen">
          <div className="flex items-center justify-between">              
              <div className="flex items-center gap-2">
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                      <SheetTrigger asChild>
                          <Button 
                              className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
                              size="icon"
                          >
                              <Upload className="h-5 w-5 text-white" />
                          </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto px-4">
                          <SheetHeader>
                              <SheetTitle>Load Survey Configuration</SheetTitle>
                              <SheetDescription>
                                  Paste your survey JSON configuration below to dynamically load a different survey.
                              </SheetDescription>
                          </SheetHeader>
                          
                          <div className="space-y-4 mt-6">
                              <div className="space-y-2">
                                  <Label htmlFor="json-input">Survey JSON Configuration</Label>
                                  <Textarea
                                      id="json-input"
                                      placeholder="Paste your survey JSON here..."
                                      value={jsonInput}
                                      onChange={(e) => setJsonInput(e.target.value)}
                                      className="min-h-[400px] font-mono text-sm"
                                  />
                              </div>
                              
                              {jsonError && (
                                  <Alert className="bg-red-50 text-red-800 border-red-200">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertTitle>Error</AlertTitle>
                                      <AlertDescription>{jsonError}</AlertDescription>
                                  </Alert>
                              )}
                              
                              <div className="flex flex-wrap gap-2">
                                  <Button 
                                      onClick={validateAndLoadJson}
                                      disabled={!jsonInput.trim()}
                                      className="flex items-center gap-2"
                                  >
                                      <Check className="h-4 w-4" />
                                      Load Survey
                                  </Button>
                                  <Button 
                                      variant="outline" 
                                      onClick={loadSampleJson}
                                  >
                                      Load Current JSON
                                  </Button>
                                  <Button 
                                      variant="secondary" 
                                      onClick={clearJson}
                                  >
                                      Clear
                                  </Button>
                              </div>
                              
                              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                  <h4 className="font-medium mb-2">Expected JSON Format:</h4>
                                  <pre className="text-xs overflow-x-auto">
{`{
"rootNode": {
  "type": "section",
  "name": "Survey Name",
  "uuid": "unique-id",
  "items": [
    {
      "type": "set",
      "name": "Page Name",
      "uuid": "page-uuid",
      "items": [...]
    }
  ]
},
"localizations": {
  "en": {}
}
}`}
                                  </pre>
                              </div>
                          </div>
                      </SheetContent>
                  </Sheet>
              </div>
          </div>
          
          {showAlert && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <Check className="h-5 w-5" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                      {alertMessage}
                  </AlertDescription>
              </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-12">
                  <SurveyForm
                      logo={<Logo className="h-5 sm:h-6 w-auto text-primary mx-auto" />}
                      survey={currentSurvey as any}
                      onSubmit={handleSubmit}
                      onChange={handleChange}
                      theme={activeTheme as any}
                      enableDebug={false}
                      progressBar={{
                          type: 'percentage',
                          showPercentage: true,
                          showStepInfo: true,
                          position: 'top',
                      }}
        analytics={{
          enabled: true,
          sessionId: "unique-session-123",  // Unique identifier for this session
          userId: "user-456",               // Optional user ID
          surveyId: "survey-abc",          // Survey identifier
          googleAnalytics: {
            measurementId: "G-NYWEMJ2852",
            debug: true
          },
          googleTagManager: {
            containerId: "GTM-K82WBC5D"
          },
          trackFieldInteractions: true,
          trackValidationErrors: true,
          trackTimings: true
        }}
/>
              </div>
          </div>
      </div>
  );
}