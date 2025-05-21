"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyBuilder } from "@/components/survey/SurveyBuilder";
import { StandardBlocks } from "@/lib/survey/blocks";
import { StandardNodes } from "@/lib/survey/nodes";
import { DemoSurveys } from "@/lib/demo/surveys";
import { GraphDemo } from "@/lib/demo/components/GraphDemo";
import { BranchingLogicDemo } from "@/lib/demo/components/BranchingLogicDemo";

// Demo tabs for different survey examples
const DemoPage = () => {
  const [activeDemo, setActiveDemo] = useState<string>("basic");
  const [surveyData, setSurveyData] = useState<any>(null);

  // Get initial data for the selected demo
  const getInitialData = () => {
    return DemoSurveys[activeDemo] || null;
  };

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">React Survey Builder Demo</h1>
        <p className="text-muted-foreground mb-6">
          Interactive demo showcasing the features and capabilities of the Survey Builder
        </p>

        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Survey</TabsTrigger>
            <TabsTrigger value="complex">Complex Form</TabsTrigger>
            <TabsTrigger value="branching">Branching Logic</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Basic Survey Example</CardTitle>
                <CardDescription>
                  A simple survey demonstrating the basic blocks and structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This example shows a basic survey with standard blocks like text input, radio buttons, and checkboxes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complex">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Complex Form Example</CardTitle>
                <CardDescription>
                  A complex form showcasing all available block types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This example demonstrates all available block types including advanced inputs like date pickers, file uploads, range sliders, and matrix questions.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branching">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Branching Logic Example</CardTitle>
                <CardDescription>
                  A survey with conditional logic and branching paths
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This example shows how to use navigation logic to create conditional branching based on user responses.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Key features demonstrated:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside mb-4">
                  <li>Conditional page navigation</li>
                  <li>Skip logic based on responses</li>
                  <li>Custom navigation scripts</li>
                  <li>Nested section structures</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="localization">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Localization Example</CardTitle>
                <CardDescription>
                  A survey demonstrating multilingual support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This example shows how to set up a survey with multiple language translations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-12 space-y-6">
            {activeDemo === "branching" && (
              <BranchingLogicDemo />
            )}
          </div>

          <div className="lg:col-span-12">
            <div className="border rounded-lg shadow-sm h-[600px] overflow-hidden">
              <SurveyBuilder
                blockDefinitions={StandardBlocks}
                nodeDefinitions={StandardNodes}
                initialData={getInitialData()}
                onDataChange={setSurveyData}
              />
            </div>
          </div>
        </div>

        {/* Flow visualization for the active survey */}
        {surveyData?.rootNode && (
          <div className="mb-8">
            <GraphDemo rootNode={surveyData.rootNode} />
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Generated Survey Data</h2>
          <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
            {surveyData ? JSON.stringify(surveyData, null, 2) : "No survey data yet"}
          </pre>
        </div>
      </div>
    </main>
  );
}

export default DemoPage;
