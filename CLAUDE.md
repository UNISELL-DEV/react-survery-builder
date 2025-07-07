# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
We use Bun package manager.

### Main Application
- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build the application
- `bun run start` - Start production server  
- `bun run lint` - Run Next.js linting

### Survey Form Package (Workspace)
- `cd src/packages/survey-form-package`
- `bun run build` - Build the package using tsup
- `bun run dev` - Build package in watch mode
- `bun run lint` - Run Biome linting

## Architecture Overview

This is a **monorepo** with a Next.js app and a custom survey package built as a workspace. The main application demonstrates the survey builder and renderer capabilities.

### Key Components

**Main App Structure:**
- `/src/app/builder/page.tsx` - Survey builder interface with custom block examples
- `/src/app/demo/page.tsx` - Interactive survey form demo with JSON upload capability
- `/src/app/page.tsx` - Landing page

**Survey Form Package (`src/packages/survey-form-package`):**
- **Builder Components** (`src/builder/`) - Visual drag-and-drop survey creation interface
  - `blocks/` - Individual form element definitions (TextInput, Radio, Checkbox, etc.)
  - `survey/SurveyBuilder.tsx` - Main builder component
  - `survey/SurveyNode.tsx` - Node-based survey structure
- **Renderer Components** (`src/renderer/`) - Survey form rendering engine
  - `SurveyForm.tsx` - Main form renderer
  - `layouts/` - Different layout options (page-by-page, continuous, accordion, etc.)
  - `renderers/` - Individual block renderers matching builder blocks
- **Types** (`src/types.ts`) - Core TypeScript interfaces
- **Context** (`src/context/`) - React contexts for survey state management

### Block System Architecture

The survey system uses a **Block Definition pattern** where each form element type has:
- `BlockDefinition` interface with `type`, `name`, `description`, `icon`, `defaultData`
- `renderItem` - How the block appears in forms
- `renderFormFields` - Configuration UI in the builder
- `renderPreview` - Preview in block library

**Standard blocks include:** TextInput, Radio, Checkbox, Select, Date, File Upload, Matrix, Range, Conditional, Calculated Fields, etc.

### Survey Data Structure

Surveys use a hierarchical structure:
- `rootNode` - Top-level section containing the entire survey
- `NodeData` - Sections/pages with `type`, `uuid`, `items[]`
- `BlockData` - Individual form elements with field configurations
- Navigation rules and conditional logic supported via `navigationRules` and `visibleIf`

### Theme System

Extensive theming support with predefined themes (`default`, `minimal`, `colorful`, `modern`, `corporate`, `dark`) and custom theme definitions. Themes control styling for containers, fields, buttons, progress indicators, and colors.

### Key Features

- **Conditional Logic** - Show/hide blocks based on user responses
- **Navigation Rules** - Custom routing between survey sections  
- **Calculated Fields** - Dynamic field calculations based on other responses
- **Multiple Layouts** - Page-by-page, continuous scroll, accordion, tabs, stepper, fullpage
- **Progress Tracking** - Multiple progress indicator styles
- **Localization Support** - Multi-language survey content
- **Mobile Navigation** - Swipe gestures and mobile-optimized controls
- **Custom Validation** - Field-level validation with custom rules

## Development Notes

- Uses **React 19** and **Next.js 15** with Turbopack
- **Tailwind CSS** for styling with custom theme system
- **Radix UI** components for accessible UI primitives
- **Framer Motion** for animations
- **@dnd-kit** for drag-and-drop functionality in builder
- Package built with **tsup** for efficient bundling
- Workspace structure allows independent package development

The builder creates JSON survey definitions that the renderer consumes to display interactive forms.