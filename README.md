# React Survey Builder

A comprehensive React-based survey builder and renderer ecosystem featuring a powerful visual drag-and-drop interface for creating dynamic, interactive surveys and forms with advanced conditional logic, multiple layout options, and extensive customization capabilities.

## 🚀 Features

### **Visual Survey Builder**
- **Drag-and-Drop Interface**: Intuitive visual editor with real-time preview
- **18+ Block Types**: Text inputs, radio buttons, checkboxes, file uploads, matrices, date pickers, and more
- **Custom Block Support**: Easily extend with your own custom block definitions
- **Node-Based Architecture**: Hierarchical survey structure with sections and pages
- **Live Preview**: See your survey as you build it

### **Advanced Logic & Conditional Features**
- **Conditional Logic**: Show/hide blocks based on user responses with complex condition rules
- **Navigation Rules**: Custom routing between survey sections based on user input
- **Calculated Fields**: Dynamic field calculations and computed values
- **Branching Logic**: Smart survey flow with condition-based page navigation
- **BMI Calculator**: Built-in health calculators and custom computation blocks
- **Validation Rules**: Field-level validation with custom error messages

### **Multiple Layout Options**
- **Page-by-Page**: Traditional multi-page survey experience
- **Continuous Scroll**: Single-page scrollable layout
- **Accordion**: Collapsible sections for better organization
- **Tabs**: Tabbed interface for easy navigation
- **Stepper**: Step-by-step progression with visual indicators
- **Full Page**: Immersive full-screen survey experience

### **Comprehensive Theming System**
- **7 Built-in Themes**: Default, Minimal, Colorful, Modern, Corporate, Dark, and Custom
- **Complete Customization**: Control every aspect of styling from colors to typography
- **Dark Mode Support**: Built-in dark/light mode toggle
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **CSS-in-JS**: Tailwind CSS integration with theme variables

### **Mobile-First Experience**
- **Swipe Navigation**: Touch gestures for mobile navigation
- **Responsive Layouts**: Optimized for all screen sizes
- **Mobile-Specific Controls**: Touch-friendly buttons and interactions
- **Progressive Web App**: Offline capability and app-like experience

### **Developer-Friendly**
- **TypeScript Support**: Full type safety and IntelliSense
- **Workspace Architecture**: Monorepo with separate builder and renderer packages
- **Extensible Block System**: Easy to add custom block types
- **Theme System**: Comprehensive theming with CSS variables
- **Modern Stack**: React 19, Next.js 15, Tailwind CSS 4

## 🏗️ Architecture

This project follows a **monorepo structure** with two main components:

### **Main Application** (`/src/app/`)
- **Builder Interface** (`/builder/`) - Visual survey creation with drag-and-drop
- **Demo Interface** (`/demo/`) - Interactive survey renderer with JSON upload
- **Landing Page** (`/`) - Project overview and sample survey demonstration

### **Survey Form Package** (`/src/packages/survey-form-package/`)
- **Builder Components** (`/src/builder/`) - Visual survey creation interface
- **Renderer Components** (`/src/renderer/`) - Survey form rendering engine
- **Block Definitions** (`/src/builder/blocks/`) - Individual form element types
- **Layout System** (`/src/renderer/layouts/`) - Different survey presentation modes
- **Theme Engine** (`/src/renderer/themes/`) - Comprehensive styling system

## 🎯 Block Types

The survey builder includes 18+ predefined block types:

### **Input Blocks**
- **Text Input**: Single-line text fields with validation
- **Textarea**: Multi-line text areas
- **Select Dropdown**: Single and multi-select dropdowns
- **Radio Buttons**: Single-choice selection
- **Checkboxes**: Multiple-choice selection
- **Selectable Boxes**: Visual selection cards with auto-continue
- **Range Slider**: Numeric range selection
- **Date Picker**: Date/time selection with calendar
- **File Upload**: File attachment with type validation

### **Advanced Blocks**
- **Matrix**: Grid-based questions (Likert scales, rating matrices)
- **Conditional**: Dynamic blocks that appear based on logic
- **Calculated Field**: Computed values based on other responses
- **BMI Calculator**: Health assessment with automatic BMI calculation
- **Checkout**: Contact information and payment collection
- **Authentication**: User login/registration forms

### **Content Blocks**
- **HTML**: Rich content with custom HTML
- **Markdown**: Formatted text with Markdown support
- **Script**: Custom JavaScript execution

## 🎨 Theming System

Comprehensive theming with 7 built-in themes:

```typescript
// Available themes
type SurveyTheme = 
  | "default"     // Clean, professional gray theme
  | "minimal"     // Simplified, typography-focused
  | "colorful"    // Vibrant, engaging colors
  | "modern"      // Contemporary design with gradients
  | "corporate"   // Professional business theme
  | "dark"        // Dark mode optimized
  | "custom";     // Fully customizable
```

Each theme controls:
- **Colors**: Primary, secondary, accent, background, text, borders
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Margins, padding, component sizing
- **Components**: Buttons, inputs, cards, progress bars
- **Animations**: Transitions and interactive effects

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, or bun package manager

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/UNISELL-DEV/react-survey-builder.git
cd react-survey-builder
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
bun install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### **Development Commands**

#### Main Application
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build the application
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

#### Survey Form Package
```bash
cd src/packages/survey-form-package
npm run build    # Build the package using tsup
npm run dev      # Build package in watch mode
npm run lint     # Run Biome linting
```

## 📖 Usage Examples

### **Basic Survey Renderer**

```typescript
import { SurveyForm } from 'survey-form-package';

function MyApp() {
  const surveyData = {
    rootNode: {
      type: "section",
      name: "Customer Feedback",
      items: [
        {
          type: "set",
          name: "Contact Information",
          items: [
            {
              type: "textfield",
              fieldName: "name",
              label: "Full Name",
              placeholder: "Enter your full name"
            },
            {
              type: "selectablebox",
              fieldName: "rating",
              label: "How satisfied are you?",
              options: [
                { id: "very-satisfied", label: "Very Satisfied", value: "5" },
                { id: "satisfied", label: "Satisfied", value: "4" },
                { id: "neutral", label: "Neutral", value: "3" },
                { id: "dissatisfied", label: "Dissatisfied", value: "2" },
                { id: "very-dissatisfied", label: "Very Dissatisfied", value: "1" }
              ]
            }
          ]
        }
      ]
    }
  };

  return (
    <SurveyForm
      survey={surveyData}
      theme="modern"
      layout="page-by-page"
      progressBar={{
        type: 'percentage',
        showPercentage: true,
        position: 'top'
      }}
      onSubmit={(data) => console.log('Survey submitted:', data)}
      onChange={(data) => console.log('Data changed:', data)}
    />
  );
}
```

### **Custom Block Creation**

```typescript
import { BlockDefinition } from 'survey-form-package';

const CustomRatingBlock: BlockDefinition = {
  type: 'star-rating',
  name: 'Star Rating',
  description: 'Visual star rating component',
  icon: <StarIcon className="w-4 h-4" />,
  defaultData: {
    type: 'star-rating',
    fieldName: 'rating',
    label: 'Rate your experience',
    maxStars: 5,
    allowHalfStars: true
  },
  renderItem: ({ data, value, onChange }) => (
    <StarRatingComponent
      value={value}
      maxStars={data.maxStars}
      onChange={onChange}
      allowHalfStars={data.allowHalfStars}
    />
  ),
  renderFormFields: ({ data, onUpdate }) => (
    <div>
      <label>Maximum Stars</label>
      <input 
        type="number" 
        value={data.maxStars} 
        onChange={(e) => onUpdate({...data, maxStars: parseInt(e.target.value)})}
      />
    </div>
  )
};
```

### **Advanced Conditional Logic**

```typescript
// Example: Show different questions based on user type
const conditionalSurvey = {
  rootNode: {
    type: "section",
    name: "User Assessment",
    items: [
      {
        type: "set",
        name: "User Type",
        items: [
          {
            type: "selectablebox",
            fieldName: "userType",
            label: "What type of user are you?",
            options: [
              { id: "beginner", label: "Beginner", value: "beginner" },
              { id: "intermediate", label: "Intermediate", value: "intermediate" },
              { id: "advanced", label: "Advanced", value: "advanced" }
            ],
            navigationRules: [
              {
                condition: "userType == 'beginner'",
                target: "beginner-questions-page-id",
                isPage: true
              },
              {
                condition: "userType == 'advanced'",
                target: "advanced-questions-page-id",
                isPage: true
              }
            ]
          }
        ]
      }
    ]
  }
};
```

## 🔧 Configuration

### **Survey Form Props**

```typescript
interface SurveyFormProps {
  survey: {
    rootNode: NodeData;
    localizations?: LocalizationMap;
    theme?: ThemeDefinition;
  };
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void;
  onPageChange?: (pageIndex: number, totalPages: number) => void;
  defaultValues?: Record<string, any>;
  language?: string;
  theme?: SurveyTheme;
  layout?: SurveyLayout;
  progressBar?: ProgressBarOptions;
  navigationButtons?: NavigationButtonsOptions;
  autoScroll?: boolean;
  autoFocus?: boolean;
  showSummary?: boolean;
  className?: string;
  logo?: ReactNode;
  enableDebug?: boolean;
}
```

### **Layout Options**

```typescript
type SurveyLayout = 
  | "page-by-page"  // Traditional multi-page navigation
  | "continuous"    // Single scrollable page
  | "accordion"     // Collapsible sections
  | "tabs"          // Tabbed interface
  | "stepper"       // Step-by-step with progress
  | "fullpage";     // Full-screen experience
```

### **Progress Bar Configuration**

```typescript
interface ProgressBarOptions {
  type?: "bar" | "dots" | "numbers" | "percentage";
  showPercentage?: boolean;
  showStepInfo?: boolean;
  showStepTitles?: boolean;
  position?: "top" | "bottom";
  animation?: boolean;
}
```

## 🎯 Sample Survey Structure

The project includes a comprehensive sample survey demonstrating:

- **Multi-page navigation** with conditional routing
- **Selectable box questions** with auto-continue functionality
- **Conditional logic** based on user responses
- **Custom HTML result pages** with tailored recommendations
- **Checkout integration** for lead capture
- **Professional styling** with consistent theming

Key features demonstrated:
- Career assessment with personalized recommendations
- Educational background evaluation
- Skills and interests mapping
- Dynamic page routing based on responses
- Custom result pages with actionable advice

## 🛠️ Development

### **Project Structure**
```
react-survey-builder/
├── src/
│   ├── app/                          # Next.js application
│   │   ├── builder/                  # Visual survey builder
│   │   ├── demo/                     # Interactive demo
│   │   └── page.tsx                  # Landing page with sample survey
│   ├── packages/
│   │   └── survey-form-package/      # Core survey package
│   │       ├── src/
│   │       │   ├── builder/          # Survey builder components
│   │       │   │   ├── blocks/       # Block definitions
│   │       │   │   ├── survey/       # Builder interface
│   │       │   │   └── common/       # Shared components
│   │       │   ├── renderer/         # Survey renderer
│   │       │   │   ├── layouts/      # Layout components
│   │       │   │   ├── renderers/    # Block renderers
│   │       │   │   └── themes/       # Theme definitions
│   │       │   ├── components/       # UI components
│   │       │   ├── context/          # React contexts
│   │       │   ├── hooks/            # Custom hooks
│   │       │   ├── utils/            # Utility functions
│   │       │   └── types.ts          # TypeScript definitions
│   │       └── package.json
│   └── components/                   # Shared UI components
├── public/                           # Static assets
└── package.json                      # Main package configuration
```

### **Adding Custom Blocks**

1. **Create block definition**
```typescript
// src/packages/survey-form-package/src/builder/blocks/YourCustomBlock.tsx
import { BlockDefinition } from '../../types';

export const YourCustomBlock: BlockDefinition = {
  type: 'your-custom-type',
  name: 'Your Custom Block',
  description: 'Description of your block',
  icon: <YourIcon />,
  defaultData: {
    type: 'your-custom-type',
    // default properties
  },
  renderItem: ({ data, value, onChange }) => {
    // Render logic for the actual form
  },
  renderFormFields: ({ data, onUpdate }) => {
    // Render configuration form for the builder
  },
  renderPreview: () => {
    // Render preview in block library
  }
};
```

2. **Add corresponding renderer**
```typescript
// src/packages/survey-form-package/src/renderer/renderers/YourCustomRenderer.tsx
export const YourCustomRenderer: React.FC<BlockRendererProps> = ({ 
  block, 
  value, 
  onChange 
}) => {
  // Render logic for the survey form
};
```

3. **Register in index files**
```typescript
// Add to src/packages/survey-form-package/src/builder/blocks/index.ts
export { YourCustomBlock } from './YourCustomBlock';

// Add to BlockRenderer.tsx
import { YourCustomRenderer } from './YourCustomRenderer';
```

### **Tech Stack**
- **Framework**: React 19 with Next.js 15
- **Build Tool**: Turbopack for fast development
- **Styling**: Tailwind CSS 4 with CSS-in-JS
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Type Safety**: TypeScript 5
- **Package Management**: npm workspaces
- **Bundling**: tsup for package builds

### **Performance Optimizations**
- **Tree Shaking**: Modular imports and exports
- **Code Splitting**: Dynamic imports for layouts and renderers
- **Memoization**: React.memo and useMemo for expensive calculations
- **Lazy Loading**: Components loaded on demand
- **Bundle Analysis**: Optimized package sizes

## 📚 API Reference

### **Core Components**

#### **SurveyForm**
Main component for rendering surveys.

```typescript
<SurveyForm
  survey={surveyData}
  theme="modern"
  layout="page-by-page"
  onSubmit={handleSubmit}
  onChange={handleChange}
  progressBar={{ type: 'percentage', position: 'top' }}
  navigationButtons={{ showPrevious: true, showNext: true }}
/>
```

#### **SurveyBuilder**
Visual builder component for creating surveys.

```typescript
<SurveyBuilder
  blockDefinitions={[...StandardBlocks, ...customBlocks]}
  nodeDefinitions={StandardNodes}
  onDataChange={handleDataChange}
  initialData={existingSurvey}
/>
```

### **Hooks**

#### **useSurveyForm**
```typescript
const {
  values,
  errors,
  currentPage,
  totalPages,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  submit,
  isValid
} = useSurveyForm(survey, options);
```

#### **useMobileNavigation**
```typescript
const {
  enableSwipe,
  handleSwipeLeft,
  handleSwipeRight,
  swipeDirection
} = useMobileNavigation({
  onSwipeLeft: goToNextPage,
  onSwipeRight: goToPreviousPage
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting: `npm run lint`
6. Submit a pull request

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/). 

- ✅ **Permitted**: Open source projects, educational use, personal projects
- ❌ **Requires License**: Commercial use, SaaS products, client projects

For commercial licensing, please contact the maintainers.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **@dnd-kit** for drag-and-drop functionality
- **React** and **Next.js** teams for excellent frameworks

## 📞 Support

- 📧 **Email**: [sayeed99@live.com]
- 💬 **Discussions**: [GitHub Discussions](https://github.com/UNISELL-DEV/react-survey-builder/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/UNISELL-DEV/react-survey-builder/issues)

---

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/). You may use the code for open source or other non-commercial purposes. For commercial use or projects where you will charge end users, please contact the maintainers to obtain a commercial license.

