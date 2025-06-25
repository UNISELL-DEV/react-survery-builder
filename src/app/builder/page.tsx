"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";


import { CreditCard } from 'lucide-react';
import { BlockDefinition, StandardBlocks, StandardNodes, SurveyBuilder } from "survey-form-builder/src";

// Create a custom credit card input block
const CreditCardBlock : BlockDefinition = {
  type: 'credit-card',
  name: 'Credit Card Input',
  description: 'Collect credit card information',
  icon: <CreditCard className="w-4 h-4" />,
  defaultData: {
    type: 'credit-card',
    fieldName: 'cardNumber',
    label: 'Card Number',
    placeholder: 'XXXX XXXX XXXX XXXX',
  },
  renderItem: ({ data }) => (
    <div className="space-y-2">
      <label>{data.label}</label>
      <input
        type="text"
        name={data.fieldName}
        placeholder={data.placeholder}
        className="w-full p-2 border rounded-md"
      />
    </div>
  ),
  renderFormFields: ({ data, onUpdate }) => (
    <div>
      {/* Form to customize this block */}
      <input
        value={data.label || ''}
        onChange={(e) => onUpdate?.({ ...data, label: e.target.value })}
      />
    </div>
  ),
  renderPreview: () => (
    <div className="p-2 bg-muted flex items-center justify-center">
      <input
        type="text"
        placeholder="XXXX XXXX XXXX XXXX"
        className="w-4/5 p-1 border"
        disabled
      />
    </div>
  ),
};

// Add your custom block to the SurveyBuilder
function App() {
  return (
    <SurveyBuilder
      blockDefinitions={[...StandardBlocks, CreditCardBlock]}
      nodeDefinitions={StandardNodes}
    />
  );
}

export default function Home() {
  const [surveyData, setSurveyData] = useState<any>(null);

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Intake form Builder</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/demo2">
              <Button className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                View Interactive Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="border rounded-lg shadow-sm h-[800px] overflow-hidden">
          <SurveyBuilder
            blockDefinitions={[...StandardBlocks, CreditCardBlock]}
            nodeDefinitions={StandardNodes}
            onDataChange={setSurveyData}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Generated Survey Data</h2>
          <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
            {surveyData ? JSON.stringify(surveyData, null, 2) : "No survey data yet"}
          </pre>
        </div>
      </div>
    </main>
  );
}
