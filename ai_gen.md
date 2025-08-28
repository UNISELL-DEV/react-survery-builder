# AI Survey Generator Documentation

This document provides comprehensive guidance for Large Language Models (LLMs) to generate structured JSON surveys using the React Survey Builder system.

## Table of Contents
- [Core Structure](#core-structure)
- [Survey Schema](#survey-schema)
- [Block Types Reference](#block-types-reference)
- [Navigation Rules](#navigation-rules)
- [Validation Rules](#validation-rules)
- [Theme Configuration](#theme-configuration)
- [Best Practices](#best-practices)
- [Example Generation Prompts](#example-generation-prompts)

## Core Structure

The survey system uses a hierarchical structure:

```
rootNode (Section)
├── Set (Page/Group)
│   ├── Block (Form Element)
│   ├── Block (Form Element)
│   └── Block (Form Element)
├── Set (Page/Group)
└── Set (Page/Group)
```

### Key Concepts:
- **rootNode**: Top-level section containing the entire survey
- **set**: Pages or grouped sections containing related questions
- **block**: Individual form elements (questions, inputs, content)

## Survey Schema

### Basic Survey Structure

```json
{
  "rootNode": {
    "type": "section",
    "name": "Survey Name",
    "uuid": "unique-identifier",
    "items": [
      {
        "type": "set",
        "name": "Page Name",
        "uuid": "unique-page-id",
        "items": [
          // Block definitions go here
        ]
      }
    ]
  },
  "localizations": {
    "en": {}
  },
  "theme": {
    // Theme configuration
  }
}
```

### Universal Block Properties

Every block should include:
- `type`: Block type identifier
- `fieldName`: Unique field identifier for data storage
- `label`: Question or prompt text
- `uuid`: Unique identifier (use UUID v4 format)
- `navigationRules`: Array of conditional navigation rules (optional)
- `validationRules`: Array of validation rules (optional)

## Block Types Reference

### 1. Selectable Box Question (Recommended for Single Choice)
**Type**: `selectablebox`

Best for single-choice questions with visual appeal. Preferred over radio buttons and checkboxes for better UX.

```json
{
  "type": "selectablebox",
  "fieldName": "experienceLevel",
  "label": "What is your experience level?",
  "description": "Choose the option that best describes you",
  "boxSpacing": "4",
  "defaultValue": "",
  "showSelectionIndicator": false,
  "autoContinueOnSelect": false,
  "multiSelect": false,
  "showContinueButton": false,
  "options": [
    {
      "id": "exp-beginner",
      "label": "Beginner (0-1 years)",
      "value": "beginner"
    },
    {
      "id": "exp-intermediate",
      "label": "Intermediate (2-5 years)",
      "value": "intermediate"
    }
  ],
  "uuid": "unique-id",
  "navigationRules": []
}
```

**Properties:**
- `boxSpacing`: Space between boxes ("2", "3", "4", "6", "8")
- `showSelectionIndicator`: Show checkmark on selected option
- `autoContinueOnSelect`: Automatically proceed when option selected
- `showContinueButton`: Show manual continue button
- `multiSelect`: allow multi selection of options
- `options`: Array of selectable options with id, label, and value

### 2. Text Input
**Type**: `textfield`

For short text responses.

```json
{
  "type": "textfield",
  "fieldName": "firstName",
  "label": "What's your first name?",
  "placeholder": "Enter your first name",
  "description": "We'll use this to personalize your experience",
  "defaultValue": "",
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 3. Text Area
**Type**: `textarea`

For longer text responses.

```json
{
  "type": "textarea",
  "fieldName": "feedback",
  "label": "Please share your thoughts",
  "placeholder": "Tell us what you think...",
  "description": "Your feedback helps us improve",
  "defaultValue": "",
  "rows": 4,
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 4. Radio Buttons (Use sparingly)
**Type**: `radio`

Use only when specifically requested. Prefer selectablebox for better UX.

```json
{
  "type": "radio",
  "fieldName": "preference",
  "label": "Select your preference",
  "options": [
    {
      "id": "opt1",
      "label": "Option 1",
      "value": "option1"
    }
  ],
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 5. Checkboxes
**Type**: `checkbox`

Use only when specifically requested. Prefer selectablebox for better UX.

```json
{
  "type": "checkbox",
  "fieldName": "interests",
  "label": "Select all that apply",
  "options": [
    {
      "id": "tech",
      "label": "Technology",
      "value": "technology"
    },
    {
      "id": "design",
      "label": "Design",
      "value": "design"
    }
  ],
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 6. Select Dropdown
**Type**: `select`

For single selection from many options.

```json
{
  "type": "select",
  "fieldName": "country",
  "label": "Select your country",
  "placeholder": "Choose a country",
  "options": [
    {
      "id": "us",
      "label": "United States",
      "value": "US"
    }
  ],
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 7. Date Picker
**Type**: `datepicker`

For date selection.

```json
{
  "type": "datepicker",
  "fieldName": "birthdate",
  "label": "What's your date of birth?",
  "placeholder": "Select date",
  "dateFormat": "MM/dd/yyyy",
  "minDate": "1900-01-01",
  "maxDate": "2010-12-31",
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 8. File Upload
**Type**: `fileupload`

For file uploads.

```json
{
  "type": "fileupload",
  "fieldName": "resume",
  "label": "Upload your resume",
  "description": "Accepted formats: PDF, DOC, DOCX",
  "acceptedTypes": [".pdf", ".doc", ".docx"],
  "maxFileSize": "5MB",
  "multiple": false,
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 9. Range Slider
**Type**: `range`

For numeric ranges.

```json
{
  "type": "range",
  "fieldName": "satisfaction",
  "label": "Rate your satisfaction",
  "min": 1,
  "max": 10,
  "step": 1,
  "defaultValue": 5,
  "showValue": true,
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 10. HTML Block
**Type**: `html`

For custom HTML content.

```json
{
  "type": "html",
  "html": "<div class='custom-content'><h2>Thank You!</h2><p>Your response has been recorded.</p></div>",
  "variableName": "thankYouMessage",
  "className": "result-page",
  "isEndBlock": true,
  "uuid": "unique-id"
}
```

**Properties:**
- `isEndBlock`: Marks this as a survey termination point
- `showContinueButton`: Whether to show continue button
- `variableName`: Optional variable name for templating
- `className`: CSS classes for styling

### 11. Matrix/Grid Question
**Type**: `matrix`

For rating multiple items on the same scale.

```json
{
  "type": "matrix",
  "fieldName": "serviceRating",
  "label": "Rate our services",
  "rows": [
    {"id": "support", "label": "Customer Support"},
    {"id": "delivery", "label": "Delivery Speed"}
  ],
  "columns": [
    {"id": "excellent", "label": "Excellent"},
    {"id": "good", "label": "Good"},
    {"id": "fair", "label": "Fair"},
    {"id": "poor", "label": "Poor"}
  ],
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 12. Checkout Block
**Type**: `checkout`

For collecting contact/payment information.

```json
{
  "type": "checkout",
  "fieldName": "contactInfo",
  "label": "Contact Information",
  "description": "Please provide your details",
  "showContactInfo": true,
  "showShippingAddress": false,
  "showBillingAddress": false,
  "requireEmail": true,
  "requirePhone": false,
  "collectFullName": true,
  "allowCompany": false,
  "defaultCountry": "US",
  "uuid": "unique-id",
  "navigationRules": []
}
```

### 13. Calculated Field
**Type**: `calculated`

For computed values based on other fields.

```json
{
  "type": "calculated",
  "fieldName": "totalScore",
  "label": "Your Total Score",
  "formula": "question1 + question2 + question3",
  "dependencies": ["question1", "question2", "question3"],
  "displayFormat": "Score: {value}/30",
  "uuid": "unique-id"
}
```

## Navigation Rules

Navigation rules control survey flow based on user responses. They enable conditional branching and dynamic survey paths.

### Basic Navigation Rule Structure

```json
{
  "condition": "fieldName == \"value\"",
  "target": "target-uuid-or-page-id",
  "isPage": true
}
```
**Properties:**
- `condition`: condition required to navigate
- `target`: target block or page UUID
- `isPage`: Whether the target block a page


### Condition Syntax Examples

**Simple equality:**
```json
"condition": "experienceLevel == \"beginner\""
```

**Multiple values (OR logic):**
```json
"condition": "[\"option1\", \"option2\"].includes(fieldName)"
```

**Numeric comparisons:**
```json
"condition": "age >= 18"
```

**Multiple conditions (AND logic):**
```json
"condition": "experience == \"senior\" && department == \"engineering\""
```

**Array inclusion:**
```json
"condition": "[\"programming\", \"mobile\"].includes(primarySkill)"
```

### Navigation Rule Examples

**Branch to different result pages based on selection:**
```json
"navigationRules": [
  {
    "condition": "[\"programming\", \"mobile\"].includes(primarySkill)",
    "target": "developer-result-page-uuid",
    "isPage": true
  },
  {
    "condition": "[\"data\", \"ai\"].includes(primarySkill)",
    "target": "data-scientist-result-page-uuid",
    "isPage": true
  },
  {
    "condition": "primarySkill == \"design\"",
    "target": "designer-result-page-uuid",
    "isPage": true
  }
]
```

**Skip sections based on user input:**
```json
"navigationRules": [
  {
    "condition": "hasExperience == \"no\"",
    "target": "beginner-section-uuid",
    "isPage": true
  }
]
```

## Validation Rules

Validation rules ensure data quality and provide user feedback.

### Validation Rule Structure

```json
{
  "operator": "validation-type",
  "message": "Error message to display",
  "severity": "error",
  "value": "comparison-value"
}
```

### Available Validation Operators

- `isNotEmpty`: Field must not be empty
- `isEmpty`: Field must be empty
- `minLength`: Minimum character length
- `maxLength`: Maximum character length
- `equals`: Must equal specific value
- `notEquals`: Must not equal specific value
- `contains`: Must contain specific text
- `notContains`: Must not contain specific text
- `matches`: Must match regex pattern
- `email`: Must be valid email format
- `url`: Must be valid URL format
- `numeric`: Must be numeric
- `integer`: Must be integer
- `min`: Minimum numeric value
- `max`: Maximum numeric value
- `between`: Must be between two values

### Validation Examples

**Required field:**
```json
"validationRules": [
  {
    "operator": "isNotEmpty",
    "message": "This field is required",
    "severity": "error"
  }
]
```

**Email validation:**
```json
"validationRules": [
  {
    "operator": "email",
    "message": "Please enter a valid email address",
    "severity": "error"
  }
]
```

**Text length validation:**
```json
"validationRules": [
  {
    "operator": "minLength",
    "value": 10,
    "message": "Please provide at least 10 characters",
    "severity": "error"
  },
  {
    "operator": "maxLength",
    "value": 500,
    "message": "Please limit your response to 500 characters",
    "severity": "warning"
  }
]
```

**Numeric range validation:**
```json
"validationRules": [
  {
    "operator": "between",
    "value": [18, 65],
    "message": "Age must be between 18 and 65",
    "severity": "error"
  }
]
```

## Theme Configuration

The theme system controls visual appearance. Use predefined themes or create custom styling.

### Available Themes
- `default`: Clean, professional appearance
- `minimal`: Simplified, minimal styling
- `colorful`: Vibrant, engaging colors
- `modern`: Contemporary design
- `corporate`: Professional business style
- `dark`: Dark mode styling

### Basic Theme Usage

```json
{
  "theme": {
    "name": "default",
    "containerLayout": "max-w-2xl mx-auto py-8 px-4",
    "field": {
      "label": "text-lg font-medium text-gray-900 mb-2",
      "selectableBox": "p-4 transition-all duration-200 cursor-pointer rounded-lg",
      "selectableBoxDefault": "border border-gray-300 bg-white hover:bg-gray-50",
      "selectableBoxSelected": "border border-blue-500 bg-blue-50"
    },
    "button": {
      "primary": "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700",
      "secondary": "bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
    },
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#6B7280",
      "background": "#FFFFFF",
      "text": "#111827"
    }
  }
}
```

## Best Practices

### 1. Survey Design Principles

**Use Selectable Box Questions for Single Choice:**
- Always prefer `selectablebox` over `radio` and `checkbox` for better UX
- Set `autoContinueOnSelect: true` for smooth flow where applicable
- Use appropriate `boxSpacing` (typically "4")

**Logical Page Structure:**
- Group related questions on the same page (set)
- Keep pages focused on single topics

**Clear Navigation Flow:**
- Use descriptive page names
- Implement logical branching with navigation rules
- Provide clear result pages for different paths

### 2. Field Naming Conventions

```javascript
// Use camelCase for field names
"fieldName": "experienceLevel"
"fieldName": "preferredContactMethod"
"fieldName": "birthDate"

// Be descriptive but concise
"fieldName": "workExperience" // Good
"fieldName": "q1" // Avoid - not descriptive
"fieldName": "workExperienceInYearsOfProfessionalSoftwareDevelopment" // Too verbose
```

### 3. UUID Generation

Always generate unique UUIDs for each element:
```javascript
// Use format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
"uuid": "550e8400-e29b-41d4-a716-446655440000"
```

### 4. Option Structure

For all option-based blocks, use consistent structure:
```json
{
  "id": "unique-option-id",
  "label": "Display text shown to user",
  "value": "stored-value"
}
```

### 5. Result Pages

Create engaging result pages using HTML blocks:
- Use `isEndBlock: true` to terminate survey flow
- Include visual indicators (icons, colors)
- Provide actionable next steps
- Consider user's responses in the messaging

## Example Generation Prompts

### 1. Skills Assessment Survey

**Prompt:** "Create a technical skills assessment survey for software developers"

**Key Elements:**
- Experience level (selectablebox)
- Programming languages (checkbox)
- Preferred technologies (selectablebox)
- Project experience (textarea)
- Salary expectations (selectablebox)
- Navigation to different result pages based on skills

### 2. Customer Satisfaction Survey

**Prompt:** "Generate a customer satisfaction survey for an e-commerce platform"

**Key Elements:**
- Overall satisfaction (range slider)
- Service ratings (matrix)
- Specific feedback (textarea)
- Demographic information (various inputs)
- Likelihood to recommend (selectablebox)

### 3. Educational Needs Assessment

**Prompt:** "Build a survey to assess learning preferences and educational goals"

**Key Elements:**
- Current education level (selectablebox)
- Learning style preferences (checkbox)
- Subject interests (selectablebox)
- Time availability (radio)
- Goals and objectives (textarea)
- Branching based on experience level

### 4. Product Feature Prioritization

**Prompt:** "Create a survey to prioritize product features for development"

**Key Elements:**
- User role identification (selectablebox)
- Feature importance ratings (matrix)
- Current tool usage (checkbox)
- Pain points (textarea)
- Willingness to pay (range)

## Complete Example: Career Assessment Survey

```json
{
  "rootNode": {
    "type": "section",
    "name": "Career Path Assessment Survey",
    "uuid": "career-survey-root-uuid",
    "items": [
      {
        "type": "set",
        "name": "Experience & Background",
        "uuid": "experience-page-uuid",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "experienceLevel",
            "label": "What is your current level of professional experience?",
            "description": "Select the option that best describes your background",
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
            "uuid": "experience-question-uuid",
            "navigationRules": [
              {
                "condition": "experienceLevel == \"none\"",
                "target": "beginner-result-uuid",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Skills & Interests",
        "uuid": "skills-page-uuid",
        "items": [
          {
            "type": "selectablebox",
            "fieldName": "primaryInterest",
            "label": "Which area interests you most?",
            "boxSpacing": "4",
            "autoContinueOnSelect": true,
            "options": [
              {
                "id": "tech-programming",
                "label": "Software Development",
                "value": "programming"
              },
              {
                "id": "tech-data",
                "label": "Data Science & Analytics",
                "value": "data"
              },
              {
                "id": "tech-design",
                "label": "UI/UX Design",
                "value": "design"
              }
            ],
            "uuid": "interest-question-uuid",
            "navigationRules": [
              {
                "condition": "primaryInterest == \"programming\"",
                "target": "developer-result-uuid",
                "isPage": true
              },
              {
                "condition": "primaryInterest == \"data\"",
                "target": "data-result-uuid",
                "isPage": true
              },
              {
                "condition": "primaryInterest == \"design\"",
                "target": "design-result-uuid",
                "isPage": true
              }
            ]
          }
        ]
      },
      {
        "type": "set",
        "name": "Software Developer Path",
        "uuid": "developer-result-uuid",
        "items": [
          {
            "type": "html",
            "html": "<div class='result-page'><h2>🚀 Software Developer Path</h2><p>Based on your responses, software development is an excellent fit for you!</p><div class='next-steps'><h3>Recommended Steps:</h3><ul><li>Learn fundamental programming languages</li><li>Build portfolio projects</li><li>Contribute to open source</li></ul></div></div>",
            "isEndBlock": true,
            "showContinueButton": false,
            "uuid": "developer-result-content-uuid"
          }
        ]
      }
    ]
  },
  "localizations": {
    "en": {}
  },
  "theme": {
    "name": "default"
  }
}
```