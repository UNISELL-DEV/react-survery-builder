# Navigation Rules Guide

This guide provides comprehensive documentation for all available navigation rule operators in the React Survey Builder.

## Table of Contents
- [Overview](#overview)
- [Basic Structure](#basic-structure)
- [Operator Categories](#operator-categories)
  - [Comparison Operators](#comparison-operators)
  - [String Operators](#string-operators)
  - [Array/List Operators](#arraylist-operators)
  - [Logical Operators](#logical-operators)
- [Examples](#examples)
- [Best Practices](#best-practices)

## Overview

Navigation rules allow you to create dynamic survey flows based on user responses. Rules are evaluated when a user completes a block or page, determining where they should navigate next.

## Basic Structure

Each navigation rule has the following structure:

```json
{
  "condition": "fieldName operator value",
  "target": "uuid-of-target-page-or-block",
  "isPage": true
}
```

- **condition**: The expression to evaluate
- **target**: UUID of the destination page/block or "submit" to end the survey
- **isPage**: Whether the target is a page (true) or block (false)

**Important**: If no navigation rules are defined or no conditions match, the survey automatically flows to the next page/block in sequence. You only need to add navigation rules when you want to override this default sequential flow.

## Operator Categories

### Comparison Operators

These operators compare values directly.

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equals | `age == 18` |
| `!=` | Not equals | `country != "USA"` |
| `>` | Greater than | `score > 80` |
| `>=` | Greater than or equal | `experience >= 5` |
| `<` | Less than | `price < 100` |
| `<=` | Less than or equal | `rating <= 3` |

#### Examples:
```json
{
  "condition": "age >= 18",
  "target": "adult-section",
  "isPage": true
}
```

### String Operators

These operators work with text values.

| Operator | Description | Example |
|----------|-------------|---------|
| `contains` | Text contains substring | `email.contains("@company.com")` |
| `notContains` | Text doesn't contain substring | `!feedback.includes("satisfied")` |
| `startsWith` | Text starts with | `phone.startsWith("+1")` |
| `endsWith` | Text ends with | `email.endsWith(".edu")` |
| `matches` | Matches regex pattern | `new RegExp("^[A-Z]{2}\\d{4}$").test(code)` |

#### Examples:
```json
{
  "condition": "email.endsWith(\"@company.com\")",
  "target": "employee-benefits",
  "isPage": true
}
```

### Array/List Operators

These operators work with multi-select fields (checkboxes, multi-select dropdowns).

| Operator | Description | Example |
|----------|-------------|---------|
| `in` | Value is in list | `["USA", "Canada", "Mexico"].includes(country)` |
| `notIn` | Value is not in list | `!["spam", "junk"].includes(category)` |
| `containsAny` | Array contains any of values | `hobbies.some(v => ["sports", "fitness"].includes(v))` |
| `containsAll` | Array contains all values | `["reading", "writing"].every(v => skills.includes(v))` |
| `containsNone` | Array contains none of values | `!interests.some(v => ["gambling", "smoking"].includes(v))` |

#### Examples:
```json
// Check if user selected any technical skill
{
  "condition": "skills.some(v => [\"programming\", \"design\", \"data\"].includes(v))",
  "target": "technical-assessment",
  "isPage": true
}

// Simple array inclusion
{
  "condition": "[\"premium\", \"enterprise\"].includes(plan)",
  "target": "advanced-features",
  "isPage": true
}
```

### Logical Operators

These operators check field states and ranges.

| Operator | Description | Example |
|----------|-------------|---------|
| `isEmpty` | Field has no value | `!email || email === ""` |
| `isNotEmpty` | Field has a value | `email && email !== ""` |
| `between` | Value is between two values | `age >= 25 && age <= 65` |
| `notBetween` | Value is outside range | `score < 60 || score > 100` |

#### Examples:
```json
// Check if field is empty
{
  "condition": "!phoneNumber || phoneNumber === \"\"",
  "target": "contact-alternative",
  "isPage": true
}

// Check if value is in range
{
  "condition": "income >= 50000 && income <= 150000",
  "target": "middle-income-options",
  "isPage": true
}
```

## Examples

### Example 1: Multi-path Career Assessment

```json
{
  "type": "selectablebox",
  "fieldName": "primarySkill",
  "label": "What is your primary skill?",
  "options": ["programming", "design", "data", "management", "other"],
  "navigationRules": [
    {
      "condition": "[\"programming\", \"mobile\"].includes(primarySkill)",
      "target": "developer-path",
      "isPage": true
    },
    {
      "condition": "primarySkill == \"design\"",
      "target": "designer-path",
      "isPage": true
    },
    {
      "condition": "[\"data\", \"management\"].includes(primarySkill)",
      "target": "specialized-path",
      "isPage": true
    }
  ]
}
```

Note: If the user selects "other" or any unmatched option, the survey will automatically continue to the next page in sequence.

### Example 2: Age-based Navigation

```json
{
  "type": "number",
  "fieldName": "age",
  "label": "What is your age?",
  "navigationRules": [
    {
      "condition": "age < 18",
      "target": "parental-consent",
      "isPage": true
    },
    {
      "condition": "age >= 18 && age <= 65",
      "target": "main-survey",
      "isPage": true
    },
    {
      "condition": "age > 65",
      "target": "senior-survey",
      "isPage": true
    }
  ]
}
```

### Example 3: Complex Multi-select Logic

```json
{
  "type": "checkbox",
  "fieldName": "interests",
  "label": "Select your interests:",
  "options": ["sports", "music", "tech", "art", "travel"],
  "navigationRules": [
    {
      "condition": "interests.containsAll([\"tech\", \"art\"])",
      "target": "creative-tech-path",
      "isPage": true
    },
    {
      "condition": "interests.some(v => [\"sports\", \"travel\"].includes(v))",
      "target": "active-lifestyle-path",
      "isPage": true
    },
    {
      "condition": "interests.containsNone([\"tech\", \"sports\", \"travel\"])",
      "target": "cultural-path",
      "isPage": true
    }
  ]
}
```

Note: Any combination not matching these conditions will proceed to the next page in the normal flow.

### Example 4: Email Domain Routing

```json
{
  "type": "text",
  "fieldName": "email",
  "label": "Email address:",
  "navigationRules": [
    {
      "condition": "email.endsWith(\".edu\")",
      "target": "student-discount",
      "isPage": true
    },
    {
      "condition": "email.matches(\".*@(google|microsoft|apple)\\\\.com$\")",
      "target": "tech-employee-survey",
      "isPage": true
    },
    {
      "condition": "!email || email === \"\"",
      "target": "no-email-flow",
      "isPage": true
    }
  ]
}
```

Note: Standard email addresses (not matching any of these patterns) will continue to the next page.

## Best Practices

### 1. Understand Default Flow
The survey automatically flows to the next page/block when:
- No navigation rules are defined
- None of the defined conditions match
- A field is completed without any navigation rules

You only need navigation rules to:
- Jump to a specific page/block out of sequence
- Skip pages based on conditions
- End the survey early with "submit" target

### 2. Order Rules from Most Specific to Least Specific
Place more specific conditions before general ones:

```json
"navigationRules": [
  {
    "condition": "score >= 90",
    "target": "excellent-result",
    "isPage": true
  },
  {
    "condition": "score >= 70",
    "target": "good-result",
    "isPage": true
  },
  {
    "condition": "score >= 50",
    "target": "average-result",
    "isPage": true
  }
]
```

Note: Scores below 50 will continue to the next page in sequence.

### 3. Use Array Operators for Multiple Options
Instead of multiple OR conditions, use array inclusion:

```json
// Instead of:
"condition": "status == \"active\" || status == \"pending\" || status == \"review\""

// Use:
"condition": "[\"active\", \"pending\", \"review\"].includes(status)"
```

### 4. Escape Special Characters in Regex
When using regex patterns, remember to escape special characters:

```json
{
  "condition": "code.matches(\"^[A-Z]{2}\\\\d{4}$\")",
  "target": "valid-code-page"
}
```

### 5. Consider Empty Values
Always consider what happens when a field is empty:

```json
"navigationRules": [
  {
    "condition": "!email || email === \"\"",
    "target": "request-email"
  },
  {
    "condition": "email.endsWith(\".com\")",
    "target": "commercial-user"
  }
]
```

### 6. Use Appropriate Operators for Field Types
- Use numeric operators (`>`, `<`, `between`) for number fields
- Use string operators (`contains`, `startsWith`) for text fields  
- Use array operators (`containsAny`, `containsAll`) for multi-select fields

## Variable Selection

When creating navigation rules in the builder, you can:
1. Select field names from a dropdown to avoid spelling errors
2. Switch between literal values and variables for comparisons
3. Add multiple values for array operations
4. Specify ranges for between operations

The system automatically generates the correct condition syntax based on your selections.