'use client';

import React, { useState } from 'react';
import { SurveyForm } from 'survey-form-package/src';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Upload, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';

// Example survey data from the builder
const sampleSurvey = {
  "rootNode": {
    "type": "section",
    "name": "TRT Initial Intake Form",
    "uuid": "5de71609-0e0e-4c8f-a79a-aa563ad91716",
    "items": [
      {
        "type": "selectablebox",
        "fieldName": "allergyHistory",
        "label": "Have you ever had an adverse or allergic reaction to testosterone or testosterone replacement support medications?",
        "description": "e.g., testosterone injectable, topical (androgel, testim, bioidentical), clomiphene (clomid), enclomiphene, hcg (human chorionic gonadotropin), gonadorelin, anastrazole (arimadex), or to any of its ingredients?",
        "boxSpacing": "4",
        "defaultValue": "",
        "showSelectionIndicator": false,
        "autoContinueOnSelect": true,
        "showContinueButton": false,
        "options": [
          {
            "id": "allergy-yes",
            "label": "Yes",
            "value": "yes"
          },
          {
            "id": "allergy-no",
            "label": "No",
            "value": "no"
          }
        ],
        "uuid": "dd060ccd-cab8-49a5-a007-5f5b638c5901",
        "navigationRules": []
      }
    ],
    "navigationLogic": "return 0;",
    "entryLogic": "",
    "exitLogic": "",
    "backLogic": ""
  },
  "localizations": {
    "en": {}
  },
  "theme": {
    "name": "colorful",
    "containerLayout": "max-w-full mx-auto py-6 px-4 sm:px-6",
    "header": "mb-10",
    "title": "text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 text-center",
    "description": "text-lg text-gray-700 mb-8 text-center",
    "background": "bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50",
    "card": "bg-white shadow-lg rounded-2xl p-8 mb-8 border border-purple-100",
    "container": {
      "card": "bg-white border border-purple-200 rounded-2xl shadow-sm",
      "border": "border-purple-200",
      "activeBorder": "border-purple-500",
      "activeBg": "bg-purple-50",
      "header": "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    "field": {
      "label": "block text-base font-semibold text-gray-800 mb-3",
      "input": "w-full rounded-xl border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-3 px-4",
      "description": "mt-2 text-sm text-gray-600",
      "error": "mt-2 text-sm text-red-600 font-medium",
      "radio": "focus:ring-purple-500 h-5 w-5 text-purple-600 border-purple-300",
      "checkbox": "focus:ring-purple-500 h-5 w-5 text-purple-600 border-purple-300 rounded-md",
      "select": "w-full rounded-xl border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-3 px-4",
      "textarea": "w-full rounded-xl border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-3 px-4",
      "file": "w-full text-base text-gray-900 border border-purple-200 rounded-xl cursor-pointer bg-purple-50 py-3 px-4",
      "matrix": "border-collapse w-full text-base rounded-xl overflow-hidden",
      "range": "accent-purple-600",
      "text": "text-gray-800",
      "activeText": "text-purple-600",
      "placeholder": "text-gray-400",
      "boxBorder": "border-purple-300",
      "selectableBox": "p-6 transition-all duration-300 cursor-pointer rounded-2xl transform hover:scale-105",
      "selectableBoxDefault": "border-2 border-purple-200 bg-white shadow-sm",
      "selectableBoxSelected": "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg ring-2 ring-purple-200",
      "selectableBoxHover": "hover:border-purple-400 hover:shadow-md",
      "selectableBoxFocus": "focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2",
      "selectableBoxDisabled": "opacity-50 cursor-not-allowed transform-none",
      "selectableBoxContainer": "",
      "selectableBoxText": "text-gray-800 text-base font-semibold",
      "selectableBoxTextSelected": "text-purple-700 font-bold",
      "selectableBoxIndicator": "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg",
      "selectableBoxIndicatorIcon": "text-white"
    },
    "progress": {
      "bar": "h-3 bg-[#3B82F6] rounded-full overflow-hidden",
      "dots": "flex space-x-2 justify-center",
      "numbers": "flex space-x-2 justify-center",
      "percentage": "text-right text-base text-purple-600 font-semibold mb-2",
      "label": "text-base text-gray-700 mb-2 font-medium"
    },
    "button": {
      "primary": "inline-flex justify-center py-3 px-8 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-200",
      "secondary": "inline-flex justify-center py-3 px-8 border-2 border-purple-200 text-base font-semibold rounded-xl text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
      "text": "text-base font-semibold text-purple-600 hover:text-purple-700",
      "navigation": "inline-flex items-center px-8 py-3 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-200"
    },
    "colors": {
      "primary": "#9333EA",
      "secondary": "#6B7280",
      "accent": "#EC4899",
      "background": "#FFFFFF",
      "text": "#1F2937",
      "border": "#D1D5DB",
      "error": "#EF4444",
      "success": "#10B981"
    }
  }
};



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
                      layout='fullpage'
                      theme={activeTheme as any}
                      enableDebug={false}
                      progressBar={{
                          type: 'percentage',
                          showPercentage: true,
                          showStepInfo: true,
                          position: 'top',
                      }}
                  />
              </div>
          </div>
      </div>
  );
}