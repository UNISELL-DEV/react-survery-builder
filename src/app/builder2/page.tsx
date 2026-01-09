"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";


import { CreditCard, Loader2 } from 'lucide-react';
import { BlockDefinition, GlobalCustomField, StandardBlocks, StandardNodes, registerBlock, useSurveyBuilder, ThemeDefinition } from "@/packages/survey-form-package/src";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { DynamicKeyValueField } from "./components/DynamicKeyValueField";
import { InteractiveBmiBlock } from "./custom-blocks/InteractiveBmi";
import { PatientDataMappingField } from "./components/Patientdatamappingfield";
import { UniqueEffectsBlock } from "./custom-blocks/UniqueEffectsBlock";
import { BMI3CalculatorBlock } from "./custom-blocks/BmiCalculator";
import { GoalWeightBlock } from "./custom-blocks/Bmigoal";
import dynamic from "next/dynamic";

// LocalStorage key for themes
const STORAGE_KEY = 'survey_custom_themes';

// Dynamic import directly from SurveyForm file to avoid dagre dependency chain
const SurveyBuilder = dynamic(
  () => import("@/packages/survey-form-package/src/builder/survey/SurveyBuilder").then(mod => mod.SurveyBuilder),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }
);

// Saved theme interface
interface SavedTheme {
  id: string;
  name: string;
  theme: ThemeDefinition;
  createdAt: string;
  updatedAt: string;
}

// Get saved themes from localStorage
const getSavedThemes = (): SavedTheme[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const themes = JSON.parse(stored);
    return Array.isArray(themes) ? themes : [];
  } catch (error) {
    console.error('Error loading saved themes:', error);
    return [];
  }
};

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
  renderBlock: ({ block, value, onChange, error, disabled }) => (
    <div className="space-y-2">
      {block.label && (
        <label className="block text-sm font-medium text-gray-900 mb-1">
          {block.label}
        </label>
      )}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={block.placeholder || 'XXXX XXXX XXXX XXXX'}
        disabled={disabled}
        className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100' : ''}`}
      />
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}
    </div>
  )
};

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [surveyData, setSurveyData] = useState<any>(null);
  const [customThemes, setCustomThemes] = useState<Record<string, ThemeDefinition>>({});

  // Register the custom block when component mounts
  useEffect(() => {
    registerBlock(UniqueEffectsBlock);
    registerBlock(BMI3CalculatorBlock);
    registerBlock(GoalWeightBlock);

    // Optional: return cleanup function if you want to unregister on unmount
    // return () => unregisterBlock('credit-card');
  }, []);

  // Load saved themes from localStorage
  useEffect(() => {
    const savedThemes = getSavedThemes();
    const themesRecord = Object.fromEntries(
      savedThemes.map(saved => [saved.name, saved.theme])
    );
    setCustomThemes(themesRecord);
  }, []);

  // Define your global custom fields
  const globalCustomFields: GlobalCustomField[] = [
    {
      key: "referenceQuestionKey",
      label: "Reference Question Key",
      description: "Unique identifier for this question used in data analysis",
      component: ({ data, onUpdate, value }) => (
        <DynamicKeyValueField
          onUpdate={onUpdate} data={data}
          label="Telegra Question Config"
          keyPlaceholder="Telegra Key"
          valuePlaceholder="Telegra Value"
          description="Custom keys for storing telegra information."
          keyName="telegraData"
        />
      ),
      defaultValue: "",
      showLabel: false
    },
    // You can add more custom fields here
    {
      key: "questionCategory",
      label: "Question Category",
      description: "Category for organizing questions in reports",
      component: ({ data, onUpdate, value }) => (
        <input
          value={value || ""}
          onChange={(e) => onUpdate({ ...data, questionCategory: e.target.value })}
          placeholder="e.g. Demographics, Health, Preferences"
          className="w-full p-2 border rounded-md"
        />
      ),
      defaultValue: "",
      showLabel: true
    },
    {
      key: "patientDataKey",
      label: "Reference patient Key",
      description: "Map to patient data.",
      component: ({ data, onUpdate, value }) => (
        <PatientDataMappingField
          onUpdate={onUpdate} data={data}
          label="Patient Data Mapping"
          description="Custom data mapping for patient information."
          keyName="patientMap"
        />
      ),
      defaultValue: "",
      showLabel: false
    },
  ];

  const customData = {
    apiEndpoint: 'https://api.example.com',
    userId: '12345',
    // any other custom data
  };

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Intake form Builder</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/demo">
              <Button className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg">
                View Interactive Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="border rounded-lg shadow-sm h-[800px] overflow-hidden">
          <SurveyBuilder
            blockDefinitions={[...StandardBlocks, UniqueEffectsBlock, BMI3CalculatorBlock, GoalWeightBlock]}
            nodeDefinitions={StandardNodes}
            globalCustomFields={globalCustomFields}
            customThemes={customThemes}
            onDataChange={setSurveyData}
            customData={customData}
            mode="paged"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Generated Survey Data</h2>
          <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] text-xs">
            {surveyData ? JSON.stringify(surveyData, null, 2) : "No survey data yet"}
          </pre>
        </div>
      </div>
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
    </main>
  );
}
