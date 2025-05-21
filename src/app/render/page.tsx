'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SurveyForm } from '@/packages/survey-form-renderer/src/components/SurveyForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { themes } from '@/packages/survey-form-renderer/src/themes';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

// Example survey data from the builder
const sampleSurvey = {
  rootNode: {
    type: "section",
    name: "Basic Survey",
    uuid: "04674687-786f-4269-8ee4-b0e7c5233555",
    items: [
      {
        type: "set",
        name: "Introduction Page",
        uuid: "955a9a53-242b-4b30-b8b9-7f4c71c36f1a",
        items: [
          {
            type: "markdown",
            uuid: "d15ce1d7-d27a-47ad-a6a4-bd297312e728",
            text: "# Welcome to the Survey\nThis is a basic survey example showcasing the core features."
          }
        ]
      },
      {
        type: "set",
        name: "Introduction Page",
        uuid: "955a9a53-242b-4b30-b8b9-7f4c71c36f1b",
        items: [
          {
            type: "textfield",
            uuid: "8d862f0a-de44-47b2-9928-65558cb869ba",
            fieldName: "name",
            label: "What is your name?",
            placeholder: "Type your name here",
            description: "Please enter your full name"
          },
        ]
      },
      {
        type: "set",
        name: "Introduction Page",
        uuid: "955a9a53-242b-4b30-b8b9-7f4c71c36f1c",
        items: [
          {
            type: "radio",
            uuid: "1c62c527-2b3d-42d6-96fa-1ecc2621bb69",
            fieldName: "experience",
            label: "How experienced are you with surveys?",
            description: "Select one option",
            labels: [
              "Beginner",
              "Intermediate",
              "Advanced",
              "Expert"
            ],
            values: [
              "beginner",
              "intermediate",
              "advanced",
              "expert"
            ]
          },
        ]
      },
      {
        type: "set",
        name: "Introduction Page",
        uuid: "955a9a53-242b-4b30-b8b9-7f4c71c36f1d",
        items: [
          {
            type: "checkbox",
            uuid: "ac7c23dd-9655-4e30-9c0e-2bc108e41173",
            fieldName: "interests",
            label: "What topics are you interested in?",
            description: "Select all that apply",
            labels: [
              "Technology",
              "Science",
              "Arts",
              "Sports",
              "Health"
            ],
            values: [
              "tech",
              "science",
              "arts",
              "sports",
              "health"
            ]
          }
        ]
      }
    ],
    navigationLogic: "return 0;",
    entryLogic: "",
    exitLogic: "",
    backLogic: ""
  },
  localizations: {
    en: {}
  }
};

export default function FormRendererExample() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Survey Form Renderer</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Survey Preview</CardTitle>
              <CardDescription>This is how your survey will appear to respondents</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTheme} onValueChange={setActiveTheme}>
                <TabsList className="mb-4">
                  {Object.keys(themes).map((themeName) => (
                    <TabsTrigger key={themeName} value={themeName}>
                      {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeTheme}>
                  <div className={`p-4 rounded-lg ${activeTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <SurveyForm
                      survey={sampleSurvey}
                      onSubmit={handleSubmit}
                      layout='page-by-page'
                      theme={activeTheme as any}
                      progressBar={{
                        type: 'bar',
                        showPercentage: true,
                        showStepInfo: true,
                        position: 'top',
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Survey Results</CardTitle>
              <CardDescription>Submitted data will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {showAlert && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <Check className="h-5 w-5" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Survey submitted successfully.
                  </AlertDescription>
                </Alert>
              )}

              {submittedData ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Submitted Data:</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-sm">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No data submitted yet. Fill out and submit the survey to see results.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
              <CardDescription>Customizable options for the renderer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p><strong>Theme:</strong> {activeTheme}</p>
                <p><strong>Layout:</strong> Page by page</p>
                <p><strong>Progress Bar:</strong> Enabled</p>
                <p><strong>Auto Animation:</strong> Enabled</p>
                <p><strong>Validation:</strong> Client-side</p>
                <p className="text-sm text-gray-500 mt-6">
                  More configuration options can be passed to the SurveyForm component as props.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}