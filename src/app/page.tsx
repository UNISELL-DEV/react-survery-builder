'use client';

import React, { useState } from 'react';
import { SurveyForm } from '@/packages/survey-form-renderer/src/components/SurveyForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check } from 'lucide-react';

// Example survey data from the builder
const sampleSurvey = 
{
  "rootNode": {
    "type": "section",
    "name": "TRT Initial Intake Form",
    "uuid": "5de71609-0e0e-4c8f-a79a-aa563ad91716",
    "items": [
      {
        "type": "set",
        "name": "Page 1 - Allergy History",
        "uuid": "8f09fe5a-3855-486c-9b05-167953c5dac1",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "allergyHistory",
            "questionTitle": "Have you ever had an adverse or allergic reaction to testosterone or testosterone replacement support medications?",
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
            "navigationRules": [
              {
                "condition": "allergyHistory == \"yes\"",
                "target": "disq-allergy-1171-4a9b-b076-209d58b86f23",
                "isPage": true
              },
              {
                "condition": "allergyHistory == \"no\"",
                "target": "f6366314-ec4a-4af5-8843-5928b7d8b515",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 2 - Medication History",
        "uuid": "f6366314-ec4a-4af5-8843-5928b7d8b515",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "medicationHistory",
            "questionTitle": "Are you currently taking or have you taken any of the following in the past?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "med-testosterone-injectable",
                "label": "Testosterone Injectable",
                "value": "testosterone-injectable"
              },
              {
                "id": "med-testosterone-topical",
                "label": "Testosterone Topical (Androgel, Testim, Bioidentical)",
                "value": "testosterone-topical"
              },
              {
                "id": "med-clomiphene",
                "label": "Clomiphene (Clomid)",
                "value": "clomiphene"
              },
              {
                "id": "med-enclomiphene",
                "label": "Enclomiphene",
                "value": "enclomiphene"
              },
              {
                "id": "med-hcg",
                "label": "HCG (Human Chorionic Gonadotropin)",
                "value": "hcg"
              },
              {
                "id": "med-gonadorelin",
                "label": "Gonadorelin",
                "value": "gonadorelin"
              },
              {
                "id": "med-anastrazole",
                "label": "Anastrazole (Arimadex)",
                "value": "anastrazole"
              },
              {
                "id": "med-none",
                "label": "No",
                "value": "none"
              }
            ],
            "uuid": "a775a4da-b947-4b4b-8067-df8b462ca635",
            "navigationRules": [
              {
                "condition": "medicationHistory == \"none\"",
                "target": "49e06e01-84d1-4d7b-84ef-4c067bda1b24",
                "isPage": true
              },
              {
                "condition": "medicationHistory != \"none\"",
                "target": "c48c51cc-e478-4f6e-ba20-e66b9e6d67ad",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 3 - Medication Timing",
        "uuid": "c48c51cc-e478-4f6e-ba20-e66b9e6d67ad",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "medicationTiming",
            "questionTitle": "Are you currently taking this medication, or did you take it previously?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "timing-current",
                "label": "Currently taking the medication",
                "value": "current"
              },
              {
                "id": "timing-previous",
                "label": "Previously took this medication",
                "value": "previous"
              }
            ],
            "uuid": "7a2c0bfc-a766-4e4e-9b75-1ff49597c990",
            "navigationRules": [
              {
                "condition": "medicationTiming == \"current\" || medicationTiming == \"previous\"",
                "target": "1a250ac6-1959-43e2-9238-3e8adaac44f4",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 4 - Medication Dose",
        "uuid": "1a250ac6-1959-43e2-9238-3e8adaac44f4",
        "items": [
          {
            "type": "textfield",
            "fieldName": "medicationDose",
            "label": "What dose were you taking, or are you taking currently?",
            "placeholder": "Enter dosage information",
            "description": "",
            "defaultValue": "",
            "uuid": "d9a559b2-3add-485f-9b42-7963f1720ddb"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 5 - Medical Advice",
        "uuid": "49e06e01-84d1-4d7b-84ef-4c067bda1b24",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "medicalAdvice",
            "questionTitle": "Have you been advised to avoid hormone replacement due to a medical condition?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "advice-yes",
                "label": "Yes",
                "value": "yes"
              },
              {
                "id": "advice-no",
                "label": "No",
                "value": "no"
              }
            ],
            "uuid": "ac93f201-0f57-4629-b567-46e13b2ced88",
            "navigationRules": [
              {
                "condition": "medicalAdvice == \"yes\"",
                "target": "disq-medical-1171-4a9b-b076-209d58b86f24",
                "isPage": true
              },
              {
                "condition": "medicalAdvice == \"no\"",
                "target": "1c14950b-1171-4a9b-b076-209d58b86f10",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 6 - Cancer History",
        "uuid": "1c14950b-1171-4a9b-b076-209d58b86f10",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "cancerHistory",
            "questionTitle": "Have you ever been diagnosed with prostate, breast, or testicular cancer?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "cancer-yes",
                "label": "Yes",
                "value": "yes"
              },
              {
                "id": "cancer-no",
                "label": "No",
                "value": "no"
              }
            ],
            "uuid": "54197f31-8da6-450c-af52-5ec8f664f5c9",
            "navigationRules": [
              {
                "condition": "cancerHistory == \"yes\"",
                "target": "disq-cancer-1171-4a9b-b076-209d58b86f25",
                "isPage": true
              },
              {
                "condition": "cancerHistory == \"no\"",
                "target": "e1c14950b-1171-4a9b-b076-209d58b86f11",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 7 - Polycythemia",
        "uuid": "e1c14950b-1171-4a9b-b076-209d58b86f11",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "polycythemia",
            "questionTitle": "Have you ever been diagnosed with polycythemia (too many red blood cells)?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "poly-yes",
                "label": "Yes",
                "value": "yes"
              },
              {
                "id": "poly-no",
                "label": "No",
                "value": "no"
              }
            ],
            "uuid": "f4197f31-8da6-450c-af52-5ec8f664f5c0",
            "navigationRules": [
              {
                "condition": "polycythemia == \"yes\"",
                "target": "disq-poly-1171-4a9b-b076-209d58b86f26",
                "isPage": true
              },
              {
                "condition": "polycythemia == \"no\"",
                "target": "g1c14950b-1171-4a9b-b076-209d58b86f12",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 8 - Medical Conditions",
        "uuid": "g1c14950b-1171-4a9b-b076-209d58b86f12",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "medicalConditions",
            "questionTitle": "Do you have a personal medical history involving any of the following medical conditions?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "multiSelect": true,
            "options": [
              {
                "id": "condition-cardiovascular",
                "label": "Cardiovascular (Heart Attack, Stroke, BP, Atrial Fibrillation, etc.)",
                "value": "cardiovascular"
              },
              {
                "id": "condition-bph",
                "label": "Benign Prostatic Hyperplasia (BPH)",
                "value": "bph"
              },
              {
                "id": "condition-hematologic",
                "label": "Hematologic-bleeding or clotting disorders (Deep Vein Thrombosis (DVT) or Pulmonary Embolism (PE))",
                "value": "hematologic"
              },
              {
                "id": "condition-hepatic",
                "label": "Hepatic-Liver conditions (Hepatitis, Jaundice, Liver Dysfunction)",
                "value": "hepatic"
              },
              {
                "id": "condition-edema",
                "label": "Edema (Swelling of the legs)",
                "value": "edema"
              },
              {
                "id": "condition-gynecomastia",
                "label": "Gynecomastia",
                "value": "gynecomastia"
              },
              {
                "id": "condition-hypercalcemia",
                "label": "Hypercalcemia",
                "value": "hypercalcemia"
              },
              {
                "id": "condition-prolactin",
                "label": "High Prolactin",
                "value": "high-prolactin"
              },
              {
                "id": "condition-sleep-apnea",
                "label": "Untreated or severe sleep apnea",
                "value": "sleep-apnea"
              },
              {
                "id": "condition-none",
                "label": "None of the above",
                "value": "none"
              }
            ],
            "uuid": "h4197f31-8da6-450c-af52-5ec8f664f5c1",
            "navigationRules": [
              {
                "condition": "medicalConditions.includes(\"cardiovascular\") || medicalConditions.includes(\"bph\") || medicalConditions.includes(\"hematologic\") || medicalConditions.includes(\"hepatic\") || medicalConditions.includes(\"edema\") || medicalConditions.includes(\"gynecomastia\") || medicalConditions.includes(\"hypercalcemia\") || medicalConditions.includes(\"high-prolactin\") || medicalConditions.includes(\"sleep-apnea\")",
                "target": "disq-conditions-1171-4a9b-b076-209d58b86f27",
                "isPage": true
              },
              {
                "condition": "medicalConditions.includes(\"none\") || !medicalConditions.some(condition => [\"cardiovascular\", \"bph\", \"hematologic\", \"hepatic\", \"edema\", \"gynecomastia\", \"hypercalcemia\", \"high-prolactin\", \"sleep-apnea\"].includes(condition))",
                "target": "i1c14950b-1171-4a9b-b076-209d58b86f13",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 9 - Symptom Assessment",
        "uuid": "i1c14950b-1171-4a9b-b076-209d58b86f13",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "libidoRating",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (5 being greatest): libido (sex drive)",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "libido-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "libido-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "libido-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "libido-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "libido-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "j4197f31-8da6-450c-af52-5ec8f664f5c2"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 10 - Erection Strength",
        "uuid": "k1c14950b-1171-4a9b-b076-209d58b86f14",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "erectionStrength",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (5 being greatest): erection strength",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "erection-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "erection-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "erection-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "erection-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "erection-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "l4197f31-8da6-450c-af52-5ec8f664f5c3"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 11 - Energy Level",
        "uuid": "m1c14950b-1171-4a9b-b076-209d58b86f15",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "energyLevel",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (1 is worst, 5 is best): energy level",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "energy-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "energy-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "energy-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "energy-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "energy-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "n4197f31-8da6-450c-af52-5ec8f664f5c4"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 12 - Enjoyment of Life",
        "uuid": "o1c14950b-1171-4a9b-b076-209d58b86f16",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "enjoymentOfLife",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (1 is worst, 5 is best): enjoyment of life",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "enjoyment-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "enjoyment-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "enjoyment-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "enjoyment-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "enjoyment-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "p4197f31-8da6-450c-af52-5ec8f664f5c5"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 13 - Depression Feelings",
        "uuid": "q1c14950b-1171-4a9b-b076-209d58b86f17",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "depressionFeelings",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (1 is worst, 5 is best): feelings of depression",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "depression-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "depression-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "depression-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "depression-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "depression-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "r4197f31-8da6-450c-af52-5ec8f664f5c6"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 14 - Anxiety Feelings",
        "uuid": "s1c14950b-1171-4a9b-b076-209d58b86f18",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "anxietyFeelings",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (1 is worst, 5 is best): feelings of anxiety",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "anxiety-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "anxiety-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "anxiety-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "anxiety-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "anxiety-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "t4197f31-8da6-450c-af52-5ec8f664f5c7"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 15 - Strength and Endurance",
        "uuid": "u1c14950b-1171-4a9b-b076-209d58b86f19",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "strengthEndurance",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (1 is worst, 5 is best): strength and/or endurance?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "strength-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "strength-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "strength-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "strength-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "strength-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "v4197f31-8da6-450c-af52-5ec8f664f5c8"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 16 - Sports Ability",
        "uuid": "w1c14950b-1171-4a9b-b076-209d58b86f20",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "sportsAbility",
            "questionTitle": "Rank the following as it applies to you on a scale of 1-5 (1 is worst, 5 is best): ability to play sports",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "sports-1",
                "label": "One",
                "value": "1"
              },
              {
                "id": "sports-2",
                "label": "Two",
                "value": "2"
              },
              {
                "id": "sports-3",
                "label": "Three",
                "value": "3"
              },
              {
                "id": "sports-4",
                "label": "Four",
                "value": "4"
              },
              {
                "id": "sports-5",
                "label": "Five",
                "value": "5"
              }
            ],
            "uuid": "x4197f31-8da6-450c-af52-5ec8f664f5c9"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 17 - Height Loss",
        "uuid": "y1c14950b-1171-4a9b-b076-209d58b86f21",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "heightLoss",
            "questionTitle": "Have you lost height?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "height-yes",
                "label": "Yes",
                "value": "yes"
              },
              {
                "id": "height-no",
                "label": "No",
                "value": "no"
              }
            ],
            "uuid": "z4197f31-8da6-450c-af52-5ec8f664f5d0"
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 18 - Fertility Concerns",
        "uuid": "aa1c14950b-1171-4a9b-b076-209d58b86f22",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "fertilityConcerns",
            "questionTitle": "Are you concerned with the side effects of low sperm count and decreased fertility that can occur with Testosterone?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "fertility-yes",
                "label": "Yes",
                "value": "yes"
              },
              {
                "id": "fertility-no",
                "label": "No",
                "value": "no"
              }
            ],
            "uuid": "bb4197f31-8da6-450c-af52-5ec8f664f5d1",
            "navigationRules": [
              {
                "condition": "fertilityConcerns == \"yes\"",
                "target": "qualified-enclo-1171-4a9b-b076-209d58b86f29",
                "isPage": true
              },
              {
                "condition": "fertilityConcerns == \"no\"",
                "target": "qualified-test-1171-4a9b-b076-209d58b86f28",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Disqualified - Allergy",
        "uuid": "disq-allergy-1171-4a9b-b076-209d58b86f23",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Unfortunately, you don't qualify for TRT</h2><p class=\"text-gray-600 mb-6\">Based on your allergy history with testosterone or related medications, we cannot safely provide TRT treatment at this time.</p><p class=\"text-sm text-gray-500\">We recommend consulting with your healthcare provider for alternative treatment options.</p></div></div>",
            "variableName": "",
            "className": "",
            "uuid": "disq-allergy-html-uuid",
            "isEndBlock": true,
          }
        ]
      },
      {
        "type": "set",
        "name": "Disqualified - Medical Condition",
        "uuid": "disq-medical-1171-4a9b-b076-209d58b86f24",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Unfortunately, you don't qualify for TRT</h2><p class=\"text-gray-600 mb-6\">Based on medical advice you've received to avoid hormone replacement therapy, we cannot provide TRT treatment at this time.</p><p class=\"text-sm text-gray-500\">Please follow your healthcare provider's recommendations regarding hormone replacement therapy.</p></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "disq-medical-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Disqualified - Cancer History",
        "uuid": "disq-cancer-1171-4a9b-b076-209d58b86f25",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Unfortunately, you don't qualify for TRT</h2><p class=\"text-gray-600 mb-6\">Due to your history of prostate, breast, or testicular cancer, TRT treatment is not recommended and could be unsafe.</p><p class=\"text-sm text-gray-500\">Please consult with your oncologist for appropriate treatment options.</p></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "disq-cancer-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Disqualified - Polycythemia",
        "uuid": "disq-poly-1171-4a9b-b076-209d58b86f26",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Unfortunately, you don't qualify for TRT</h2><p class=\"text-gray-600 mb-6\">Your history of polycythemia (high red blood cell count) makes TRT treatment unsafe, as it can further increase red blood cell production.</p><p class=\"text-sm text-gray-500\">Please work with your hematologist to manage your condition.</p></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "disq-poly-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Disqualified - Medical Conditions",
        "uuid": "disq-conditions-1171-4a9b-b076-209d58b86f27",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-red-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Unfortunately, you don't qualify for TRT</h2><p class=\"text-gray-600 mb-6\">Based on your medical history, TRT treatment may not be safe for you at this time. Your existing conditions require careful management.</p><p class=\"text-sm text-gray-500\">Please consult with your healthcare provider about alternative treatment options that are appropriate for your medical conditions.</p></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "disq-conditions-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Qualified - Testosterone Treatment",
        "uuid": "qualified-test-1171-4a9b-b076-209d58b86f28",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Congratulations! You qualify for TRT</h2><p class=\"text-gray-600 mb-6\">Based on your responses, you appear to be a good candidate for Testosterone Replacement Therapy. Our medical team will review your information and contact you with next steps.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">What happens next:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Medical review of your responses</li><li>• Lab work coordination</li><li>• Treatment plan development</li><li>• Medication delivery setup</li></ul></div></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "qualified-test-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Qualified - Enclomiphene Treatment",
        "uuid": "qualified-enclo-1171-4a9b-b076-209d58b86f29",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Congratulations! You qualify for Enclomiphene</h2><p class=\"text-gray-600 mb-6\">Based on your fertility concerns, we recommend Enclomiphene treatment, which can help boost testosterone while preserving fertility. Our medical team will review your information and contact you with next steps.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Benefits of Enclomiphene:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Increases natural testosterone production</li><li>• Preserves fertility and sperm production</li><li>• Oral medication (no injections)</li><li>• Fewer side effects than traditional TRT</li></ul></div></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "qualified-enclo-html-uuid"
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
            {showAlert && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <Check className="h-5 w-5" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Survey submitted successfully.
                  </AlertDescription>
                </Alert>
              )}


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <SurveyForm
                        survey={sampleSurvey}
                        onSubmit={handleSubmit}
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