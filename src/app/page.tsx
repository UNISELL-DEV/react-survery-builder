'use client';

import React, { useState } from 'react';
import { SurveyForm } from '@/packages/survey-form-renderer/src/components/SurveyForm';

// Example survey data from the builder
const sampleSurvey = 
{
  "rootNode": {
    "type": "section",
    "name": "New Survey",
    "uuid": "30fb78d9-d253-4f06-a373-20fb6a3f4fdb",
    "items": [
      {
        "type": "set",
        "name": "Page 1",
        "uuid": "8f09fe5a-3855-486c-9b05-167953c5dac7",
        "items": [
          {
            "type": "textfield",
            "fieldName": "textInpute426",
            "label": "Text Input Question",
            "placeholder": "Type your answer here",
            "description": "",
            "defaultValue": "",
            "uuid": "dd060ccd-cab8-49a5-a007-5f5b638c5902"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 2",
        "uuid": "f6366314-ec4a-4af5-8843-5928b7d8b514",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "boxq12f6",
            "questionTitle": "What's your goal?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": true,
            "options": [
              {
                "id": "084d92b6-32f6-4c86-932d-6135b112a88f",
                "label": "Lose 5 to 20 lbs",
                "value": "5-20"
              },
              {
                "id": "8163f76f-5e24-4023-8631-07634eac8c81",
                "label": "Lose 21 to 50 lbs",
                "value": "21-50"
              },
              {
                "id": "64763efb-f44f-41e7-a1ed-de307f2f5441",
                "label": "Lose 51+ lbs",
                "value": "51+"
              },
              {
                "id": "ee26833b-b6eb-49b5-8360-706d12b7a68b",
                "label": "I'm not sure yet",
                "value": "unsure"
              }
            ],
            "uuid": "a775a4da-b947-4b4b-8067-df8b462ca634"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 3",
        "uuid": "d27dc2d5-6046-4fce-bb61-14aa429cdda6",
        "items": [
          {
            "type": "bmiCalculator",
            "label": "BMI Calculator",
            "description": "Calculate your Body Mass Index",
            "fieldName": "bmiResult",
            "defaultUnit": "metric",
            "theme": "default",
            "className": "",
            "uuid": "ac93f201-0f57-4629-b567-46e13b2ced87",
            "bmiResult": {
              "bmi": 24.2,
              "category": "Normal Weight",
              "height": 170,
              "weight": 70,
              "unitSystem": "metric"
            }
          }
        ]
      }
    ],
    "navigationLogic": "return 0;",
    "entryLogic": "",
    "exitLogic": "",
    "backLogic": ""
  },
  "localizations": {
    "en": {}
  }
};

export default function FormRendererExample() {
    const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [activeTheme, setActiveTheme] = useState('modern');

    const handleSubmit = (data: Record<string, any>) => {
        setSubmittedData(data);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    return (
        <div className="container mx-auto p-4 mt-4">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-3xl font-bold">IVYRX</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <SurveyForm
                        survey={sampleSurvey}
                        onSubmit={handleSubmit}
                        layout='fullpage'
                        theme={activeTheme as any}
                        enableDebug={false}
                        progressBar={{
                            type: 'bar',
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