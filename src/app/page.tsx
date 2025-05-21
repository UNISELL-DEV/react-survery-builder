'use client';

import React, { useState } from 'react';
import { SurveyForm } from '@/packages/survey-form-renderer/src/components/SurveyForm';

// Example survey data from the builder
const sampleSurvey = {
  "rootNode": {
    "type": "section",
    "name": "New Survey",
    "uuid": "74914a1b-5be9-45ba-a346-1d5c8b62bbcd",
    "items": [
      {
        "type": "set",
        "name": "Page 1",
        "uuid": "822fdff3-9341-421d-a392-619da8d9396d",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "boxqb34c",
            "questionTitle": "What's your weightloss goal?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "options": [
              {
                "id": "b3c006c5-943b-4c68-a097-251b0d63a718",
                "label": "Lose 5 to 20 lbs",
                "value": "5-20"
              },
              {
                "id": "d8d34c20-5e3f-41d3-ac14-e241a639dc13",
                "label": "Lose 21 to 50 lbs",
                "value": "21-50"
              },
              {
                "id": "303c68ac-a694-4bf1-86ff-c27b1f954924",
                "label": "Lose 51+ lbs",
                "value": "51+"
              },
              {
                "id": "277285f5-bf29-42e5-8851-1e47277dc663",
                "label": "I'm not sure yet",
                "value": "unsure"
              }
            ],
            "uuid": "60fe4c1b-79fc-40be-b827-ce2b2de65b7c"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 2",
        "uuid": "c48c51cc-e478-4f6e-ba20-e66b9e6d67ac",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-3xl mx-auto py-8 px-4\"> <div class=\"flex w-full flex-col gap-1\">\n    <h4 class=\"text-gray-900 text-3xl font-regular\">\n      <p class=\"mb-6\"> Losing 5 to 20 lbs is closer than you think, and it doesn't require calorie counting, or a workout routine.\n      </p>\n      <p class=\"mb-6\"> To find out if you’re eligible for treatment, you’ll need to answer some questions about your goals, lifestyle and health history.\n      </p>\n      <p>\n        Ready?\n      </p>\n    </h4>\n  </div>\n</div>",
            "variableName": "",
            "className": "",
            "uuid": "0f165c88-7459-43cb-b674-fe4414c3aaf1"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 3",
        "uuid": "7a2c0bfc-a766-4e4e-9b75-1ff49597c989",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\">\n  <h2 class=\"text-3xl font-bold text-gray-800 mb-8\">How GLP-1 medication works</h2>\n  <div class=\"space-y-6\">\n    <div class=\"flex items-start space-x-4\">\n      <div class=\"flex-shrink-0\">\n        <svg class=\"w-7 h-7 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\"></path> <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M7.5 7.5h9M7.5 12h9M7.5 16.5h5\" style=\"stroke-dasharray: 3, 2;\"></path>\n        </svg>\n      </div>\n      <p class=\"text-gray-700 text-base\">\n        Mimics your body's natural hormones to regulate blood sugar & <strong class=\"font-semibold text-gray-900\">reduce appetite</strong>\n      </p>\n    </div>\n    <div class=\"flex items-start space-x-4\">\n      <div class=\"flex-shrink-0\">\n        <svg class=\"w-7 h-7 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.242 4.758A4.962 4.962 0 007.5 4.5c1.381 0 2.5 1.119 2.5 2.5 0 .29-.05.569-.138.829M16.758 4.758A4.962 4.962 0 0116.5 4.5c-1.381 0-2.5 1.119-2.5 2.5 0 .29.05.569.138.829M12 11c0 6.627-5.373 12-12 12s-12-5.373-12-12c0-2.033.54-3.935 1.481-5.57M12 11v0M7.5 11a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z\"></path>\n        </svg>\n      </div>\n      <p class=\"text-gray-700 text-base\">\n        Slows down digestion and delays stomach emptying, <strong class=\"font-semibold text-gray-900\">helping you feel fuller for longer</strong>\n      </p>\n    </div>\n    <div class=\"flex items-start space-x-4\">\n      <div class=\"flex-shrink-0\">\n        <svg class=\"w-7 h-7 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 19.128A9.38 9.38 0 0012 21c3.924 0 7.282-2.341 8.733-5.555M15 4.397A9.386 9.386 0 0012 3c-3.924 0-7.282 2.341-8.733 5.555m0 0A9.353 9.353 0 0012 15c2.228 0 4.23-1.03 5.59-2.646m-3.186 0A2.5 2.5 0 1112 10.5a2.5 2.5 0 012.404 1.854z\"></path>\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0zM12 6a3 3 0 110-6 3 3 0 010 6zm0 18a3 3 0 110-6 3 3 0 010 6z\"></path>\n        </svg>\n      </div>\n      <p class=\"text-gray-700 text-base\">\n        Acts on brain receptors to <strong class=\"font-semibold text-gray-900\">decrease food cravings</strong> & regulate eating behavior\n      </p>\n    </div>\n  </div>\n</div>",
            "variableName": "",
            "className": "",
            "uuid": "cbfb3099-0e36-4864-b520-e2546d88046b"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 4",
        "uuid": "1a250ac6-1959-43e2-9238-3e8adaac44f3",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\">\n  <div class=\"flex w-full flex-col gap-2\"> <h4 class=\"text-gray-900 text-3xl font-bold\"> <p>How Ivy works</p>\n    </h4>\n    <div>\n      <div class=\"space-y-6 mt-6\"> <div class=\"flex items-start space-x-4\">\n          <div class=\"flex-shrink-0\">\n            <svg class=\"w-7 h-7 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\"></path>\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 13V9m0 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 4h.01\"></path>\n            </svg>\n          </div>\n          <p class=\"text-gray-700 text-base\">\n            Fill out this medical questionnaire, 100% online\n          </p>\n        </div>\n\n        <div class=\"flex items-start space-x-4\">\n          <div class=\"flex-shrink-0\">\n            <svg class=\"w-7 h-7 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01\"></path>\n            </svg>\n          </div>\n          <p class=\"text-gray-700 text-base\">\n            A medical professional will review your answers and evaluate if you are eligible for treatment\n          </p>\n        </div>\n\n        <div class=\"flex items-start space-x-4\">\n          <div class=\"flex-shrink-0\">\n            <svg class=\"w-7 h-7 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4\"></path>\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 12l8 4 8-4\"></path>\n            </svg>\n          </div>\n          <p class=\"text-gray-700 text-base\">\n            If approved, your medication will be shipped within 48 hours\n          </p>\n        </div>\n\n        <div class=\"pl-11\"> <p class=\"text-gray-600 text-sm\"> Get unlimited access to follow-ups, adjustments, and questions.\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>",
            "variableName": "",
            "className": "",
            "uuid": "f1939970-154e-46d0-b3de-8685bc484e8a"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 5",
        "uuid": "d9a559b2-3add-485f-9b42-7963f1720bda",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "boxqb34c",
            "questionTitle": "Are you currently taking a GLP-1 medication?",
            "description": "e.g Ozempic, Wegovy, Zepbound, Mounjaro, Semaglutide, Tirzepatide",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": true,
            "options": [
              {
                "id": "b3c006c5-943b-4c68-a097-251b0d63a718",
                "label": "Yes",
                "value": "yes"
              },
              {
                "id": "d8d34c20-5e3f-41d3-ac14-e241a639dc13",
                "label": "No",
                "value": "no"
              }
            ],
            "uuid": "49e06e01-84d1-4d7b-84ef-4c067bda1b23"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 6",
        "uuid": "6a3a379a-45a0-4068-b5e5-d861889eddad",
        "items": [
          {
            "type": "textfield",
            "fieldName": "textInput1692",
            "label": "What is your weight?",
            "placeholder": "Type your answer here",
            "description": "",
            "defaultValue": "",
            "uuid": "122d3e3b-2de6-470e-a8d4-74e1fb6acae4"
          },
          {
            "type": "textfield",
            "fieldName": "textInput1692",
            "label": "What is your height?",
            "placeholder": "Type your answer here",
            "description": "",
            "defaultValue": "",
            "uuid": "3333c633-f252-4377-8c7b-552f2ae7a346"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 7",
        "uuid": "1c14950b-1171-4a9b-b076-209d58b86f0f",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "boxqb34c",
            "questionTitle": "Are you currently, or have you in the past two months, taken any of the following medications?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": true,
            "options": [
              {
                "id": "b3c006c5-943b-4c68-a097-251b0d63a718",
                "label": "Semaglutide (Ozempic, Wegovy, Rybelsus)",
                "value": "Semaglutide (Ozempic, Wegovy, Rybelsus)"
              },
              {
                "id": "d8d34c20-5e3f-41d3-ac14-e241a639dc13",
                "label": "Tirzepatide (Zepbound, Mounjaro)",
                "value": "Tirzepatide (Zepbound, Mounjaro)"
              },
              {
                "id": "303c68ac-a694-4bf1-86ff-c27b1f954924",
                "label": "None of these",
                "value": "None of these"
              }
            ],
            "uuid": "54197f31-8da6-450c-af52-5ec8f664f5c8"
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
                        layout='page-by-page'
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