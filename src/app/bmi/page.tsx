"use client";

import React, { useState } from 'react';
import { SurveyForm } from '@/packages/survey-form-renderer/src';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

export default function ConditionalBranchingExample() {
  const [theme, setTheme] = useState<'default' | 'dark'>('default');
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Example survey with conditional branching
  const surveyData = {
    rootNode: {
      type: 'section',
      name: 'Conditional Branching Demo',
      items: [
        // Page 1: Initial health assessment
        {
          type: 'set',
          label: 'Health Assessment',
          description: 'Please provide some basic health information',
          items: [
            {
              type: 'textfield',
              label: 'Age',
              fieldName: 'age',
              placeholder: 'Enter your age',
              required: true,
            },
            {
              type: 'radio',
              label: 'Do you have any health conditions?',
              fieldName: 'hasHealthConditions',
              labels: ['Yes', 'No'],
              values: [true, false],
              required: true,
            }
          ],
          // Branch based on health conditions
          branchingLogic: {
            condition: 'hasHealthConditions === false',
            targetPage: 2, // Go to health conditions page
          }
        },

        // Page 2: Health conditions (shown conditionally)
        {
          type: 'set',
          label: 'Health Conditions',
          description: 'Please provide more details about your health conditions',
          items: [
            {
              type: 'checkbox',
              label: 'Select all conditions that apply to you:',
              fieldName: 'conditions',
              labels: ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Other'],
              values: ['diabetes', 'hypertension', 'heart', 'asthma', 'other'],
            },
            {
              type: 'textarea',
              label: 'Please provide more details about your conditions',
              fieldName: 'conditionsDetails',
              placeholder: 'Enter details here...',
              visibleIf: "conditions && conditions.includes('other')",
            }
          ],
          // Always go to BMI page next
          branchingLogic: {
            condition: 'true',
            targetPage: 2,
          }
        },

        // Page 3: BMI Calculator
        {
          type: 'set',
          label: 'BMI Calculator',
          description: 'Let\'s calculate your Body Mass Index (BMI)',
          items: [
            {
              type: 'bmiCalculator',
              label: 'BMI Calculator',
              description: 'Use the sliders to input your height and weight',
              fieldName: 'bmiCalculator',
            },
            {
              type: 'calculated',
              label: 'Your BMI Classification',
              description: 'Based on your BMI, here is your risk category',
              fieldName: 'bmiRisk',
              formula: `
                // Simple formula that uses the bmi value directly if available
                if (!bmiCalculator) return "Please complete BMI calculation";
                if (!bmiCalculator.bmi) return "Please complete BMI calculation";

                const bmi = Number(bmiCalculator.bmi);

                if (isNaN(bmi)) return "Invalid BMI value";
                if (bmi >= 30) return "High Risk";
                if (bmi >= 25) return "Moderate Risk";
                return "Low Risk";
              `,
              dependencies: ['bmiCalculator'],
            }
          ],
          // Branch based on BMI risk
          branchingLogic: {
            condition: 'bmiRisk === "High Risk"',
            targetPage: 3, // Go to high risk page
          }
        },

        // Page 4: High BMI Risk (shown conditionally)
        {
          type: 'set',
          label: 'High BMI Risk Recommendations',
          description: 'Based on your BMI, here are some important health recommendations',
          items: [
            {
              type: 'markdown',
              markdown: "## Important Health Recommendations\n\nYour BMI indicates that you are in a high-risk category. We recommend:\n\n\n1. **Consult with a healthcare provider** about weight management options\n\n2. **Regular health screenings** for blood pressure, cholesterol, and blood sugar\n\n3. **Gradual and sustainable lifestyle changes** rather than extreme diets\n\n4. **Regular physical activity** (at least 150 minutes per week of moderate activity)\n\n5. **Monitor your diet** focusing on whole foods, fruits, vegetables, and lean proteins",
              variableName: "",
              className: "",
                updateContent: false,
            },
            {
              type: 'checkbox',
              label: 'I acknowledge these recommendations',
              fieldName: 'acknowledgeRisks',
              labels: ['I understand the health risks associated with my BMI'],
              values: [true],
              required: true,
            }
          ],
          // Submit after this page
          branchingLogic: {
            condition: 'true',
            targetPage: 'submit',
          }
        },

        // Page 5: Final questions (for non-high risk paths)
        {
          type: 'set',
          label: 'Final Questions',
          description: 'Just a few more questions about your health goals',
          items: [
            {
              type: 'select',
              label: 'What is your primary health goal?',
              fieldName: 'healthGoal',
              labels: [
                'Maintain current health',
                'Weight management',
                'Increase physical activity',
                'Reduce stress',
                'Improve sleep',
                'Other'
              ],
              values: [
                'maintain',
                'weight',
                'activity',
                'stress',
                'sleep',
                'other'
              ],
            },
            {
              type: 'textarea',
              label: 'Please describe your health goal',
              fieldName: 'healthGoalDetails',
              placeholder: 'Enter details here...',
              visibleIf: "healthGoal === 'other'",
            },
            {
              type: 'range',
              label: 'How committed are you to achieving this goal?',
              fieldName: 'commitment',
              min: 1,
              max: 10,
              step: 1,
              showValue: true,
              defaultValue: 5,
            }
          ]
        }
      ]
    }
  };

  // Custom validators
  const customValidators = {
    age: {
      validate: (value: any, formValues: Record<string, any>) => {
        const age = parseInt(value, 10);
        if (isNaN(age)) return 'Please enter a valid number';
        if (age < 18) return 'You must be 18 or older to use this calculator';
        if (age > 120) return 'Please enter a valid age';
        return null;
      }
    }
  };

  // Handle form submission
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    setFormData(data);
    setShowResults(true);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Conditional Branching Example</h1>
        <ThemeSwitcher value={theme === 'dark'} onChange={(isDark) => setTheme(isDark ? 'dark' : 'default')} />
      </div>

      <p className="text-lg mb-8">
        This example demonstrates conditional branching, BMI calculation, and adaptive form flow
        based on user responses.
      </p>

      {!showResults ? (
        <div className="bg-card border rounded-lg">
          <SurveyForm
            survey={surveyData}
            onSubmit={handleSubmit}
            theme={theme}
            layout="page-by-page"
            customValidators={customValidators}
            debug={false}
          />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Form Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
              {JSON.stringify(formData, null, 2)}
            </pre>
            <Button
              className="mt-4"
              onClick={() => {
                setShowResults(false);
                setFormData({});
              }}
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
