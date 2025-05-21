"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BranchingLogicDemo: React.FC = () => {
  let dummyEntryLogic = `(formData, pageData, renderer, navigation) => { /* Init code */ }`
  let dummyExitLogic = `(formData, pageData, renderer, navigation) => { /* Cleanup code */ }`
  let dummyBackLogic =   `(formData, pageData, renderer, stack) => { /* Back navigation code */ }`
  let dummyNavigationLogic = `(formData, pageData, renderer) => { return pageIndex; }`
  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Branching Logic</CardTitle>
        <CardDescription>
          Learn how to create conditional paths in your surveys
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="intro">
          <TabsList className="mb-4">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="navigation">Navigation Logic</TabsTrigger>
            <TabsTrigger value="scripts">Script Handlers</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="intro" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">What is Branching Logic?</h3>
              <p className="text-gray-700">
                Branching logic allows you to create dynamic surveys that adapt based on respondent answers.
                This enables a more personalized survey experience where respondents only see questions relevant to them.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Create personalized survey paths based on previous answers</li>
                <li>Skip irrelevant questions to reduce survey fatigue</li>
                <li>Collect more detailed information for specific response patterns</li>
                <li>Create complex decision trees with multiple branches</li>
                <li>Implement sophisticated validation and navigation rules</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">How It Works</h3>
              <p className="text-gray-700">
                The Survey Builder uses JavaScript functions to control navigation between sections and pages.
                These functions evaluate respondent data and determine which question should be shown next.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Navigation Logic Functions</h3>
              <p className="text-gray-700 mb-2">
                The <code className="bg-gray-100 px-1 rounded">navigationLogic</code> property defines which page or section to display next:
              </p>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto">
                <pre className="text-sm font-mono">
{`// Example navigation logic function
// Return the index of the next page to display (0-based)
(formData, pageData, renderer) => {
  // Access respondent's answer from formData
  const userType = formData.userType;

  // Conditional navigation based on response
  if (userType === 'business') {
    return 1; // Go to business section (index 1)
  } else if (userType === 'personal') {
    return 2; // Go to personal section (index 2)
  } else {
    return 0; // Stay on current page if no selection made
  }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Navigation Parameters</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">formData</span>: Contains all the survey responses collected so far
                </li>
                <li>
                  <span className="font-medium">pageData</span>: Contains metadata about the current page
                </li>
                <li>
                  <span className="font-medium">renderer</span>: Utility object with helper functions
                </li>
              </ul>

              <p className="mt-3 text-gray-700">
                The function should return a number (index) indicating which page to navigate to next.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="scripts" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Script Event Handlers</h3>
              <p className="text-gray-700">
                The Survey Builder offers several script handlers to control the survey flow at different points:
              </p>

              <div className="mt-4 space-y-3">
                <div className="bg-white border rounded-md p-3">
                  <h4 className="font-medium mb-1">Entry Logic</h4>
                  <p className="text-sm text-gray-600">
                    Runs when a section is entered. Use for initialization, state setup, or analytics tracking.
                  </p>
                  <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono">
                    {dummyEntryLogic}
                  </div>
                </div>

                <div className="bg-white border rounded-md p-3">
                  <h4 className="font-medium mb-1">Exit Logic</h4>
                  <p className="text-sm text-gray-600">
                    Runs when leaving a section. Use for validation, data processing, or cleanup operations.
                  </p>
                  <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono">
                    {dummyExitLogic}
                  </div>
                </div>

                <div className="bg-white border rounded-md p-3">
                  <h4 className="font-medium mb-1">Back Logic</h4>
                  <p className="text-sm text-gray-600">
                    Runs when navigating backwards. Use to handle special back navigation behavior.
                  </p>
                  <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono">
                    {dummyBackLogic}
                  </div>
                </div>

                <div className="bg-white border rounded-md p-3">
                  <h4 className="font-medium mb-1">Navigation Logic</h4>
                  <p className="text-sm text-gray-600">
                    Runs to determine the next page. The most common script for branching logic.
                  </p>
                  <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono">
                    {dummyNavigationLogic}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Common Branching Patterns</h3>

              <Tabs defaultValue="skip">
                <TabsList className="mb-3">
                  <TabsTrigger value="skip">Skip Logic</TabsTrigger>
                  <TabsTrigger value="branch">Multiple Branches</TabsTrigger>
                  <TabsTrigger value="redirect">Redirect Logic</TabsTrigger>
                </TabsList>

                <TabsContent value="skip" className="space-y-3">
                  <p className="text-gray-700">
                    Skip logic allows you to skip irrelevant questions based on previous answers:
                  </p>
                  <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto">
                    <pre className="text-sm font-mono">
{`// Skip logic example
(formData, pageData) => {
  // Check if user has children
  if (formData.hasChildren === 'no') {
    return 3; // Skip to page 3 (after child-related questions)
  } else {
    return 1; // Show next page with child-related questions
  }
}`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="branch" className="space-y-3">
                  <p className="text-gray-700">
                    Multiple branch logic creates different paths based on categorical responses:
                  </p>
                  <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto">
                    <pre className="text-sm font-mono">
{`// Multiple branch example
(formData, pageData) => {
  // Branch based on user type
  switch (formData.userCategory) {
    case 'student':
      return 1; // Go to student questions
    case 'professional':
      return 2; // Go to professional questions
    case 'retired':
      return 3; // Go to retiree questions
    default:
      return 0; // Stay on current page
  }
}`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="redirect" className="space-y-3">
                  <p className="text-gray-700">
                    Redirect logic allows for dynamic navigation based on multiple conditions:
                  </p>
                  <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto">
                    <pre className="text-sm font-mono">
{`// Redirect logic example
(formData, pageData) => {
  // Combine multiple conditions
  const isQualified = formData.age >= 18 && formData.hasConsented === 'yes';
  const isSpecialGroup = formData.location === 'international' && formData.language !== 'english';

  if (!isQualified) {
    return 10; // Redirect to disqualification page
  } else if (isSpecialGroup) {
    return 2; // Redirect to special instructions page
  } else {
    return 1; // Standard next page
  }
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
              <h3 className="text-amber-800 font-medium mb-1">Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>Always provide fallback navigation for unexpected data</li>
                <li>Test your branching logic thoroughly with different input combinations</li>
                <li>Use comments to explain complex navigation conditions</li>
                <li>Avoid deeply nested conditional statements when possible</li>
                <li>Consider using helper functions for complex logic that gets reused</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
