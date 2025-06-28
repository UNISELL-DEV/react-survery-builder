# React Survey Builder

A flexible and customizable React library for building dynamic surveys and forms with a visual editor.

## Features

- **Visual Survey Builder**: Intuitive drag-and-drop interface for constructing surveys
- **Multiple Question Types**: Text, Textarea, Radio, Checkbox, HTML, Markdown, and more
- **Conditional Logic**: Add navigation logic to create dynamic flows based on responses
- **Localization Support**: Built-in tools for multi-language surveys
- **Customizable Design**: Styled with Tailwind CSS and Shadcn UI for a modern look
- **Extensible**: Easy to add custom question types and components
- **Export/Import**: Save and load surveys in JSON format
- **TypeScript Support**: Full type definitions for better development experience

## Installation

```bash
# Using npm
npm install survey-form-builder

# Using yarn
yarn add survey-form-builder

# Using pnpm
pnpm add survey-form-builder

# Using bun
bun add survey-form-builder
```

## Quick Start

```jsx
import { SurveyBuilder, StandardBlocks, StandardNodes } from 'survey-form-builder';

function App() {
  const handleDataChange = (data) => {
    console.log('Survey data:', data);
  };

  return (
    <div style={{ height: '800px' }}>
      <SurveyBuilder
        blockDefinitions={StandardBlocks}
        nodeDefinitions={StandardNodes}
        onDataChange={handleDataChange}
      />
    </div>
  );
}
```

## Creating Custom Question Types

You can extend the survey builder with your own custom block types:

```jsx
import { BlockDefinition } from 'survey-form-builder';
import { CreditCard } from 'lucide-react';

// Create a custom credit card input block
const CreditCardBlock = {
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
        onChange={(e) => onUpdate({ ...data, label: e.target.value })}
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
```

## Authentication Block

The `AuthBlock` allows you to authenticate users before they continue the survey.
Configure the following fields in the block editor:

- **loginUrl** – endpoint for login requests
- **signupUrl** – optional endpoint for creating new accounts
- **useOtp** – enable passwordless authentication
  - **sendOtpUrl** – endpoint to request the OTP
  - **verifyOtpUrl** – endpoint to verify the OTP
- **tokenField** – name of the property containing the token in the API response
- **tokenStorageKey** – key used to store the token in `localStorage` (default `authToken`)
- **validateTokenUrl** – optional endpoint to validate an existing token when the block mounts
- **requireName** – prompt for the user's name
- **requireEmail** – prompt for the user's email
- **nameLabel** – label for the name field
- **emailLabel** – label for the email field

All data returned from your authentication APIs is stored in the form context and included in the final submission JSON.

After successful authentication, the token is saved and the survey automatically continues.

### API Structure

Each endpoint should accept and return JSON. A typical login request sends `{ name, email }` and expects a response containing at least the property defined by `tokenField` (default `token`). When `useOtp` is enabled, `sendOtpUrl` receives `{ name, email }` and `verifyOtpUrl` should verify `{ email, otp }`.

Any extra data returned from these APIs is merged into the form context and can be used later in your survey or submission handler.

### Testing Endpoints

The AuthBlock editor includes a **Test Endpoints** button which issues a simple `GET` request to each configured URL and reports whether it responds successfully. Use this to confirm your URLs are reachable while building your survey.

## API Reference

### SurveyBuilder Component

The main component for the survey builder interface.

| Prop | Type | Description |
|------|------|-------------|
| `initialData` | `object` | Optional initial survey data |
| `blockDefinitions` | `array` | Array of block definition objects |
| `nodeDefinitions` | `array` | Array of node definition objects |
| `onDataChange` | `function` | Callback when survey data changes |

### BlockDefinition Interface

Interface for defining custom question/content blocks.

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | Unique identifier for the block type |
| `name` | `string` | Display name in the UI |
| `description` | `string` | Description of the block |
| `icon` | `ReactNode` | Icon to display in the UI |
| `defaultData` | `object` | Default properties for new instances |
| `renderItem` | `function` | React component to render the block |
| `renderFormFields` | `function` | React component to render the editor form |
| `renderPreview` | `function` | React component to render a preview |
| `validate` | `function` | Optional validation function |

## Migrating from Vanilla JS Version

This library is a complete rewrite of a vanilla JavaScript survey builder, now using React and modern web technologies. If you're migrating from the vanilla JS version:

1. Replace script imports with React component imports
2. Convert your block definitions to the new format
3. Use the `SurveyBuilder` component instead of direct DOM manipulation
4. Update any custom UI to use React components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
