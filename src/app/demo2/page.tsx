"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StandardBlocks } from "@/lib/survey/blocks";
import { StandardNodes } from "@/lib/survey/nodes";
import { DemoSurveys } from "@/lib/demo/surveys";
import { GraphDemo } from "@/lib/demo/components/GraphDemo";
import { BranchingLogicDemo } from "@/lib/demo/components/BranchingLogicDemo";
import { SurveyBuilder } from "@/packages/survey-form-builder/src";

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
        <h1 className="text-3xl font-bold mb-2">Intake form Builder Demo</h1>
        <div className="row">
        <div className="lg:col-span-12">
            <div className="border rounded-lg shadow-sm h-full overflow-hidden">
              <SurveyBuilder
                blockDefinitions={StandardBlocks}
                nodeDefinitions={StandardNodes}
                initialData={getInitialData()}
                onDataChange={setSurveyData}
              />
            </div>
          </div>
        </div>


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
