'use client';

import React, { useState } from 'react';
import { SurveyForm } from 'survey-form-package/src';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, Upload, AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';

// Example survey data from the builder
const sampleSurvey = {
  "rootNode": {
    "type": "section",
    "name": "Career Path Assessment Survey",
    "uuid": "5de71609-0e0e-4c8f-a79a-aa563ad91716",
    "items": [
      {
        "type": "set",
        "name": "Page 1 - Background & Experience",
        "uuid": "8f09fe5a-3855-486c-9b05-167953c5dac1",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "experienceLevel",
            "label": "What is your current level of professional experience in technology?",
            "description": "This helps us understand your starting point for career recommendations",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "exp-none",
                "label": "No professional experience",
                "value": "none"
              },
              {
                "id": "exp-entry",
                "label": "0-2 years experience",
                "value": "entry"
              },
              {
                "id": "exp-mid",
                "label": "3-5 years experience",
                "value": "mid"
              },
              {
                "id": "exp-senior",
                "label": "5+ years experience",
                "value": "senior"
              }
            ],
            "uuid": "dd060ccd-cab8-49a5-a007-5f5b638c5901",
            "navigationRules": [
              {
                "condition": "experienceLevel == \"none\"",
                "target": "1c14950b-1171-4a9b-b076-209d58b86f10",
                "isPage": true
              },
              {
                "condition": "experienceLevel != \"none\"",
                "target": "1c14950b-1171-4a9b-b076-209d58b86f10",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 2 - Education Background",
        "uuid": "1c14950b-1171-4a9b-b076-209d58b86f10",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "educationBackground",
            "label": "What is your educational background?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "edu-high-school",
                "label": "High School",
                "value": "high-school"
              },
              {
                "id": "edu-associates",
                "label": "Associate's Degree",
                "value": "associates"
              },
              {
                "id": "edu-bachelors",
                "label": "Bachelor's Degree",
                "value": "bachelors"
              },
              {
                "id": "edu-masters",
                "label": "Master's Degree or higher",
                "value": "masters"
              },
              {
                "id": "edu-bootcamp",
                "label": "Coding Bootcamp/Certification",
                "value": "bootcamp"
              },
              {
                "id": "edu-self-taught",
                "label": "Self-taught",
                "value": "self-taught"
              }
            ],
            "uuid": "ac93f201-0f57-4629-b567-46e13b2ced88",
            "navigationRules": [
              {
                "condition": "educationBackground == \"high-school\"",
                "target": "disq-education-1171-4a9b-b076-209d58b86f24",
                "isPage": true
              },
              {
                "condition": "educationBackground != \"high-school\"",
                "target": "f6366314-ec4a-4af5-8843-5928b7d8b515",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 3 - Skills & Interests Assessment",
        "uuid": "f6366314-ec4a-4af5-8843-5928b7d8b515",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "primarySkill",
            "label": "Which technical area interests you most?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "skill-programming",
                "label": "Programming/Software Development",
                "value": "programming"
              },
              {
                "id": "skill-data",
                "label": "Data Analysis/Data Science",
                "value": "data"
              },
              {
                "id": "skill-design",
                "label": "UI/UX Design",
                "value": "design"
              },
              {
                "id": "skill-cybersecurity",
                "label": "Cybersecurity",
                "value": "cybersecurity"
              },
              {
                "id": "skill-cloud",
                "label": "Cloud Computing/DevOps",
                "value": "cloud"
              },
              {
                "id": "skill-ai",
                "label": "Artificial Intelligence/Machine Learning",
                "value": "ai"
              },
              {
                "id": "skill-mobile",
                "label": "Mobile App Development",
                "value": "mobile"
              },
              {
                "id": "skill-project-management",
                "label": "Project Management",
                "value": "project-management"
              },
              {
                "id": "skill-none",
                "label": "None of the above",
                "value": "none"
              }
            ],
            "uuid": "a775a4da-b947-4b4b-8067-df8b462ca635",
            "navigationRules": [
              {
                "condition": "primarySkill == \"none\"",
                "target": "disq-interest-1171-4a9b-b076-209d58b86f25",
                "isPage": true
              },
              {
                "condition": "primarySkill != \"none\"",
                "target": "c48c51cc-e478-4f6e-ba20-e66b9e6d67ad",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 4 - Learning Style",
        "uuid": "c48c51cc-e478-4f6e-ba20-e66b9e6d67ad",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "learningStyle",
            "label": "How do you prefer to learn new skills?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "learn-formal",
                "label": "Formal education (university, courses)",
                "value": "formal"
              },
              {
                "id": "learn-online",
                "label": "Online tutorials and self-study",
                "value": "online"
              },
              {
                "id": "learn-hands-on",
                "label": "Hands-on projects and practice",
                "value": "hands-on"
              },
              {
                "id": "learn-mentorship",
                "label": "Mentorship and guidance",
                "value": "mentorship"
              }
            ],
            "uuid": "7a2c0bfc-a766-4e4e-9b75-1ff49597c990",
            "navigationRules": [
              {
                "condition": "learningStyle == \"formal\"",
                "target": "1a250ac6-1959-43e2-9238-3e8adaac44f4",
                "isPage": true
              },
              {
                "condition": "learningStyle != \"formal\"",
                "target": "1a250ac6-1959-43e2-9238-3e8adaac44f4",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 5 - Problem Solving Assessment",
        "uuid": "1a250ac6-1959-43e2-9238-3e8adaac44f4",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "problemSolving",
            "label": "Rate your problem-solving abilities on a scale of 1-5 (5 being excellent)",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "problem-1",
                "label": "1 - Need significant help",
                "value": "1"
              },
              {
                "id": "problem-2",
                "label": "2 - Below average",
                "value": "2"
              },
              {
                "id": "problem-3",
                "label": "3 - Average",
                "value": "3"
              },
              {
                "id": "problem-4",
                "label": "4 - Above average",
                "value": "4"
              },
              {
                "id": "problem-5",
                "label": "5 - Excellent",
                "value": "5"
              }
            ],
            "uuid": "j4197f31-8da6-450c-af52-5ec8f664f5c2",
            "navigationRules": [
              {
                "condition": "problemSolving >= \"4\"",
                "target": "e1c14950b-1171-4a9b-b076-209d58b86f11",
                "isPage": true
              },
              {
                "condition": "problemSolving < \"4\"",
                "target": "e1c14950b-1171-4a9b-b076-209d58b86f11",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 6 - Communication Assessment",
        "uuid": "e1c14950b-1171-4a9b-b076-209d58b86f11",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "communicationPreference",
            "label": "How much do you enjoy communicating with clients/stakeholders?",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "comm-love",
                "label": "Love it - I'm energized by client interaction",
                "value": "love"
              },
              {
                "id": "comm-enjoy",
                "label": "Enjoy it in moderation",
                "value": "enjoy"
              },
              {
                "id": "comm-tolerate",
                "label": "Can tolerate it when necessary",
                "value": "tolerate"
              },
              {
                "id": "comm-avoid",
                "label": "Prefer to minimize client interaction",
                "value": "avoid"
              }
            ],
            "uuid": "r4197f31-8da6-450c-af52-5ec8f664f5c6",
            "navigationRules": [
              {
                "condition": "communicationPreference == \"love\"",
                "target": "i1c14950b-1171-4a9b-b076-209d58b86f13",
                "isPage": true
              },
              {
                "condition": "communicationPreference != \"love\"",
                "target": "i1c14950b-1171-4a9b-b076-209d58b86f13",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 7 - Experience Details",
        "uuid": "i1c14950b-1171-4a9b-b076-209d58b86f13",
        "items": [
          {
            "type": "textfield",
            "fieldName": "previousExperience",
            "label": "Briefly describe any relevant experience or projects you've worked on",
            "placeholder": "e.g., Built a personal website, completed online courses, worked on team projects...",
            "description": "This helps us better understand your background",
            "defaultValue": "",
            "uuid": "d9a559b2-3add-485f-9b42-7963f1720ddb",
            "navigationRules": [
              {
                "condition": "previousExperience != \"\"",
                "target": "m1c14950b-1171-4a9b-b076-209d58b86f15",
                "isPage": true
              },
              {
                "condition": "previousExperience == \"\"",
                "target": "m1c14950b-1171-4a9b-b076-209d58b86f15",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Page 8 - Final Preferences",
        "uuid": "m1c14950b-1171-4a9b-b076-209d58b86f15",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "salaryExpectation",
            "label": "What is your target salary range? (USD annually)",
            "description": "",
            "boxSpacing": "4",
            "defaultValue": "",
            "showSelectionIndicator": false,
            "autoContinueOnSelect": true,
            "showContinueButton": false,
            "options": [
              {
                "id": "salary-40k",
                "label": "$40,000 - $60,000",
                "value": "40k-60k"
              },
              {
                "id": "salary-60k",
                "label": "$60,000 - $80,000",
                "value": "60k-80k"
              },
              {
                "id": "salary-80k",
                "label": "$80,000 - $120,000",
                "value": "80k-120k"
              },
              {
                "id": "salary-120k",
                "label": "$120,000+",
                "value": "120k+"
              },
              {
                "id": "salary-unsure",
                "label": "Not sure yet",
                "value": "unsure"
              }
            ],
            "uuid": "v4197f31-8da6-450c-af52-5ec8f664f5c8",
            "navigationRules": [
              {
                "condition": "primarySkill == \"programming\"",
                "target": "qualified-developer-1171-4a9b-b076-209d58b86f28",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"mobile\"",
                "target": "qualified-developer-1171-4a9b-b076-209d58b86f28",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"data\"",
                "target": "qualified-data-1171-4a9b-b076-209d58b86f29",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"ai\"",
                "target": "qualified-data-1171-4a9b-b076-209d58b86f29",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"design\"",
                "target": "qualified-design-1171-4a9b-b076-209d58b86f30",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"project-management\"",
                "target": "qualified-management-1171-4a9b-b076-209d58b86f31",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"cybersecurity\"",
                "target": "qualified-general-1171-4a9b-b076-209d58b86f32",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"cloud\"",
                "target": "qualified-general-1171-4a9b-b076-209d58b86f32",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Needs More Preparation",
        "uuid": "disq-education-1171-4a9b-b076-209d58b86f24",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-yellow-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Let's Build Your Foundation First!</h2><p class=\"text-gray-600 mb-6\">Based on your current background, we recommend building some foundational skills before diving into a specific tech career path.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Recommended next steps:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Consider taking basic computer science courses</li><li>• Try free online coding tutorials</li><li>• Explore community college tech programs</li><li>• Build a simple project to test your interest</li></ul></div></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "disq-education-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Explore Other Interests",
        "uuid": "disq-interest-1171-4a9b-b076-209d58b86f25",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-purple-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Let's Explore Your Interests!</h2><p class=\"text-gray-600 mb-6\">It looks like you haven't found your tech passion yet. That's perfectly okay! Technology offers many different paths.</p><div class=\"bg-green-50 border border-green-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-green-900 mb-2\">We recommend:</h3><ul class=\"text-sm text-green-800 space-y-1\"><li>• Take our detailed skills assessment</li><li>• Try introductory courses in different areas</li><li>• Attend tech meetups and networking events</li><li>• Shadow professionals in various tech roles</li></ul></div></div></div>",
            "variableName": "",
            "className": "",
            "isEndBlock": true,
            "uuid": "disq-interest-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Software Developer Path",
        "uuid": "qualified-developer-1171-4a9b-b076-209d58b86f28",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Perfect! You're suited for Software Development</h2><p class=\"text-gray-600 mb-6\">Based on your interests and skills, we recommend pursuing a career in software development. You show strong problem-solving aptitude and interest in programming.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Your development path:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Start with web development fundamentals (HTML, CSS, JavaScript)</li><li>• Learn a backend language (Python, Java, or Node.js)</li><li>• Build portfolio projects</li><li>• Contribute to open source projects</li><li>• Apply for junior developer positions</li></ul></div><div class=\"bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4\"><p class=\"text-sm text-gray-700\"><strong>Salary Range:</strong> $60,000 - $150,000+ depending on experience and location</p></div></div></div>",
            "variableName": "",
            "className": "",
            "showContinueButton": true,
            "navigationRules": [
              {
                "condition": "primarySkill == \"programming\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"mobile\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              }
            ],
            "uuid": "qualified-developer-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Data Science Path",
        "uuid": "qualified-data-1171-4a9b-b076-209d58b86f29",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Excellent! You're ideal for Data Science</h2><p class=\"text-gray-600 mb-6\">Your interest in data analysis and AI, combined with your analytical thinking, makes you a great candidate for data science roles.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Your learning roadmap:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Master Python and SQL</li><li>• Learn statistics and mathematics</li><li>• Study machine learning algorithms</li><li>• Work with data visualization tools</li><li>• Build data science portfolio projects</li></ul></div><div class=\"bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4\"><p class=\"text-sm text-gray-700\"><strong>Salary Range:</strong> $70,000 - $180,000+ for experienced data scientists</p></div></div></div>",
            "variableName": "",
            "className": "",
            "showContinueButton": true,
            "navigationRules": [
              {
                "condition": "primarySkill == \"data\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"ai\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              }
            ],
            "uuid": "qualified-data-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "UI/UX Design Path",
        "uuid": "qualified-design-1171-4a9b-b076-209d58b86f30",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Great Choice! UI/UX Design is Perfect for You</h2><p class=\"text-gray-600 mb-6\">Your creative interests and user-focused thinking make you an ideal candidate for UI/UX design roles in the tech industry.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Your design journey:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Learn design principles and user psychology</li><li>• Master design tools (Figma, Sketch, Adobe Creative Suite)</li><li>• Study user research methods</li><li>• Build a strong design portfolio</li><li>• Practice with real client projects</li></ul></div><div class=\"bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4\"><p class=\"text-sm text-gray-700\"><strong>Salary Range:</strong> $55,000 - $140,000+ for senior UX designers</p></div></div></div>",
            "variableName": "",
            "className": "",
            "showContinueButton": true,
            "navigationRules": [
              {
                "condition": "primarySkill == \"design\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              }
            ],
            "uuid": "qualified-design-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Tech Management Path",
        "uuid": "qualified-management-1171-4a9b-b076-209d58b86f31",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Perfect! You're Built for Tech Management</h2><p class=\"text-gray-600 mb-6\">Your strong communication skills and interest in project management make you ideal for technical leadership roles.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Your leadership path:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Develop project management skills (Agile, Scrum)</li><li>• Learn basic technical concepts</li><li>• Study team leadership and communication</li><li>• Get certified in project management (PMP, CSM)</li><li>• Start as associate product manager or project coordinator</li></ul></div><div class=\"bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4\"><p class=\"text-sm text-gray-700\"><strong>Salary Range:</strong> $65,000 - $160,000+ for senior technical managers</p></div></div></div>",
            "variableName": "",
            "className": "",
            "showContinueButton": true,
            "navigationRules": [
              {
                "condition": "primarySkill == \"project-management\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              }
            ],
            "uuid": "qualified-management-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "General Tech Path",
        "uuid": "qualified-general-1171-4a9b-b076-209d58b86f32",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center\"><div class=\"mb-6\"><div class=\"mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center\"><svg class=\"w-8 h-8 text-green-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg></div></div><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">You Have Great Potential in Tech!</h2><p class=\"text-gray-600 mb-6\">Based on your responses, you have multiple strengths that could lead to success in various tech roles. We recommend exploring several areas to find your best fit.</p><div class=\"bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6\"><h3 class=\"font-semibold text-blue-900 mb-2\">Explore these areas:</h3><ul class=\"text-sm text-blue-800 space-y-1\"><li>• Try introductory courses in programming, design, and data analysis</li><li>• Attend tech meetups and networking events</li><li>• Consider a tech bootcamp with career exploration</li><li>• Shadow professionals in different tech roles</li><li>• Start with general tech support or operations roles</li></ul></div><div class=\"bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4\"><p class=\"text-sm text-gray-700\"><strong>Entry Salary Range:</strong> $40,000 - $70,000 with growth potential to $100,000+</p></div></div></div>",
            "variableName": "",
            "className": "",
            "showContinueButton": true,
            "navigationRules": [
              {
                "condition": "primarySkill == \"cybersecurity\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              },
              {
                "condition": "primarySkill == \"cloud\"",
                "target": "40bf913e-76ac-432a-bac8-981acdad2712",
                "isPage": true
              }
            ],
            "uuid": "qualified-general-html-uuid"
          }
        ]
      },
      {
        "type": "set",
        "name": "Get Your Personalized Career Plan",
        "uuid": "40bf913e-76ac-432a-bac8-981acdad2712",
        "items": [
          {
            "type": "html",
            "html": "<div class=\"w-full max-w-2xl mx-auto py-8 px-4\"><div class=\"text-center mb-8\"><h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Ready to Start Your Tech Journey?</h2><p class=\"text-gray-600\">Get your personalized career roadmap, resource recommendations, and access to our mentorship program.</p></div></div>",
            "variableName": "",
            "className": "",
            "uuid": "career-plan-intro-html"
          },
          {
            "type": "checkout",
            "fieldName": "careerPlanCheckout",
            "label": "Get Your Career Plan",
            "description": "Enter your contact information to receive your personalized tech career roadmap and resources.",
            "showContactInfo": true,
            "showShippingAddress": false,
            "showBillingAddress": false,
            "sameAsBilling": false,
            "requireEmail": true,
            "requirePhone": true,
            "collectFullName": true,
            "allowCompany": false,
            "defaultCountry": "US",
            "className": "",
            "uuid": "a4d78c0b-4ac2-4196-a043-32f59c17e5a7",
            "navigationRules": []
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
  },
  "theme": {
    "name": "clean",
    "containerLayout": "max-w-full mx-auto py-8 px-4 sm:px-6",
    "header": "mb-8",
    "title": "text-3xl font-semibold text-gray-900 mb-4 text-left",
    "description": "text-lg text-gray-600 mb-6 text-left",
    "background": "bg-white",
    "card": "bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-200",
    "container": {
      "card": "bg-white border border-gray-200 rounded-lg shadow-sm",
      "border": "border-gray-200",
      "activeBorder": "border-gray-400",
      "activeBg": "bg-gray-50",
      "header": "bg-gray-100"
    },
    "field": {
      "label": "block text-base font-medium text-gray-900 mb-4",
      "input": "w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base py-3 px-4",
      "description": "mt-2 text-sm text-gray-600",
      "error": "mt-2 text-sm text-red-600 font-medium",
      "radio": "focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300",
      "checkbox": "focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded",
      "select": "w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base py-3 px-4",
      "textarea": "w-full rounded-lg border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base py-3 px-4",
      "file": "w-full text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 py-3 px-4",
      "matrix": "border-collapse w-full text-base rounded-lg overflow-hidden",
      "range": "accent-gray-600",
      "text": "text-gray-900",
      "activeText": "text-gray-900",
      "placeholder": "text-gray-500",
      "boxBorder": "border-gray-300",
      "selectableBox": "p-5 transition-all duration-200 cursor-pointer rounded-lg",
      "selectableBoxDefault": "border border-gray-300 bg-white hover:bg-gray-50",
      "selectableBoxSelected": "border border-gray-400 bg-gray-50",
      "selectableBoxHover": "hover:border-gray-400",
      "selectableBoxFocus": "focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2",
      "selectableBoxDisabled": "opacity-50 cursor-not-allowed",
      "selectableBoxContainer": "space-y-3",
      "selectableBoxText": "text-gray-900 text-base font-normal",
      "selectableBoxTextSelected": "text-gray-900 font-normal",
      "selectableBoxIndicator": "bg-gray-600 text-white",
      "selectableBoxIndicatorIcon": "text-white"
    },
    "progress": {
      "bar": "h-2 bg-[#757575] rounded-full overflow-hidden",
      "dots": "flex space-x-2 justify-center",
      "numbers": "flex space-x-2 justify-center",
      "percentage": "text-right text-base text-gray-600 font-medium mb-2",
      "label": "text-base text-gray-700 mb-2 font-medium"
    },
    "button": {
      "primary": "inline-flex justify-center py-3 px-6 text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200",
      "secondary": "inline-flex justify-center py-3 px-6 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
      "text": "text-base font-medium text-gray-600 hover:text-gray-800",
      "navigation": "inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
    },
    "colors": {
      "primary": "#111827",
      "secondary": "#6B7280",
      "accent": "#374151",
      "background": "#FFFFFF",
      "text": "#111827",
      "border": "#D1D5DB",
      "error": "#EF4444",
      "success": "#10B981"
    }
  }
};



export default function FormRendererExample() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Survey submitted successfully.');
  const [activeTheme, setActiveTheme] = useState('modern');
  const [currentSurvey, setCurrentSurvey] = useState(sampleSurvey);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSubmit = (data: Record<string, any>) => {
      setSubmittedData(data);
      setAlertMessage('Survey submitted successfully.');
      setShowAlert(true);
      setTimeout(() => {
          setShowAlert(false);
      }, 5000);
  };

  const handleChange = (data: Record<string, any>) => {
      console.log(data);
  };

  const validateAndLoadJson = () => {
      try {
          setJsonError('');
          const parsedJson = JSON.parse(jsonInput);
          
          // Basic validation to ensure it's a survey object
          if (!parsedJson.rootNode || !parsedJson.rootNode.type || !parsedJson.rootNode.items) {
              setJsonError('Invalid survey format. Must contain rootNode with type and items properties.');
              return;
          }

          setCurrentSurvey(parsedJson);
          setJsonInput('');
          setIsSheetOpen(false);
          
          // Show success message
          setAlertMessage('Survey loaded successfully.');
          setShowAlert(true);
          setTimeout(() => {
              setShowAlert(false);
          }, 3000);
          
      } catch (error) {
          setJsonError('Invalid JSON format. Please check your syntax.');
      }
  };

  const loadSampleJson = () => {
      setJsonInput(JSON.stringify(currentSurvey, null, 2));
      setJsonError('');
  };

  const clearJson = () => {
      setJsonInput('');
      setJsonError('');
  };

  return (
      <div className="container-fluid mx-auto min-h-screen">
          <div className="flex items-center justify-between">              
              <div className="flex items-center gap-2">
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                      <SheetTrigger asChild>
                          <Button 
                              className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
                              size="icon"
                          >
                              <Upload className="h-5 w-5 text-white" />
                          </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto px-4">
                          <SheetHeader>
                              <SheetTitle>Load Survey Configuration</SheetTitle>
                              <SheetDescription>
                                  Paste your survey JSON configuration below to dynamically load a different survey.
                              </SheetDescription>
                          </SheetHeader>
                          
                          <div className="space-y-4 mt-6">
                              <div className="space-y-2">
                                  <Label htmlFor="json-input">Survey JSON Configuration</Label>
                                  <Textarea
                                      id="json-input"
                                      placeholder="Paste your survey JSON here..."
                                      value={jsonInput}
                                      onChange={(e) => setJsonInput(e.target.value)}
                                      className="min-h-[400px] font-mono text-sm"
                                  />
                              </div>
                              
                              {jsonError && (
                                  <Alert className="bg-red-50 text-red-800 border-red-200">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertTitle>Error</AlertTitle>
                                      <AlertDescription>{jsonError}</AlertDescription>
                                  </Alert>
                              )}
                              
                              <div className="flex flex-wrap gap-2">
                                  <Button 
                                      onClick={validateAndLoadJson}
                                      disabled={!jsonInput.trim()}
                                      className="flex items-center gap-2"
                                  >
                                      <Check className="h-4 w-4" />
                                      Load Survey
                                  </Button>
                                  <Button 
                                      variant="outline" 
                                      onClick={loadSampleJson}
                                  >
                                      Load Current JSON
                                  </Button>
                                  <Button 
                                      variant="secondary" 
                                      onClick={clearJson}
                                  >
                                      Clear
                                  </Button>
                              </div>
                              
                              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                  <h4 className="font-medium mb-2">Expected JSON Format:</h4>
                                  <pre className="text-xs overflow-x-auto">
{`{
"rootNode": {
  "type": "section",
  "name": "Survey Name",
  "uuid": "unique-id",
  "items": [
    {
      "type": "set",
      "name": "Page Name",
      "uuid": "page-uuid",
      "items": [...]
    }
  ]
},
"localizations": {
  "en": {}
}
}`}
                                  </pre>
                              </div>
                          </div>
                      </SheetContent>
                  </Sheet>
              </div>
          </div>
          
          {showAlert && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <Check className="h-5 w-5" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                      {alertMessage}
                  </AlertDescription>
              </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-12">
                  <SurveyForm
                      logo={<Logo className="h-5 sm:h-6 w-auto text-primary mx-auto" />}
                      survey={currentSurvey as any}
                      onSubmit={handleSubmit}
                      onChange={handleChange}
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