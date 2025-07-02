import { SurveyForm } from './components/SurveyForm';
import { SurveyFormProvider, useSurveyForm } from './context/SurveyFormContext';
import { BlockRenderer } from './components/renderers/BlockRenderer';
import { TextInputRenderer } from './components/renderers/TextInputRenderer';
import { TextareaRenderer } from './components/renderers/TextareaRenderer';
import { RadioRenderer } from './components/renderers/RadioRenderer';
import { CheckboxRenderer } from './components/renderers/CheckboxRenderer';
import { SelectRenderer } from './components/renderers/SelectRenderer';
import { MarkdownRenderer } from './components/renderers/MarkdownRenderer';
import { HtmlRenderer } from './components/renderers/HtmlRenderer';
import { RangeRenderer } from './components/renderers/RangeRenderer';
import { DatePickerRenderer } from './components/renderers/DatePickerRenderer';
import { FileUploadRenderer } from './components/renderers/FileUploadRenderer';
import { MatrixRenderer } from './components/renderers/MatrixRenderer';
import { SelectableBoxRenderer } from './components/renderers/SelectableBoxRenderer';
import { ScriptRenderer } from './components/renderers/ScriptRenderer';
import { SetRenderer } from './components/renderers/SetRenderer';
import { AuthRenderer } from './components/renderers/AuthRenderer';
import { DebugInfo } from './components/ui/DebugInfo';

// New conditional components
import { ConditionalBlockRenderer } from './components/renderers/ConditionalBlockRenderer';
import { CalculatedFieldRenderer } from './components/renderers/CalculatedFieldRenderer';
import { BMICalculatorRenderer } from './components/renderers/BMICalculatorRenderer';
import { CheckoutRenderer } from './components/renderers/CheckoutRenderer';
import { ValidationSummary } from './components/ui/ValidationSummary';

// Utility functions
import {
  evaluateCondition,
  evaluateSimpleCondition,
  isBlockVisible,
  executeCalculation,
  calculateBMI
} from './utils/conditionalUtils';

import {
  evaluateLogic,
  getSurveyPages,
  getSurveyPageIds,
  getLocalized,
  getThemeClass,
  formatFieldName
} from './utils/surveyUtils';

import {
  blockTypeMap,
  validateBlock,
  isContentBlock,
  isInputBlock,
  supportsConditionalRendering,
  supportsBranchingLogic
} from './utils/blockAdapter';

export { applyDynamicColors } from './utils/colorUtils';

// Themes
export {
  themes,
  defaultTheme,
  minimalTheme,
  colorfulTheme,
  modernTheme,
  corporateTheme,
  darkTheme
} from './themes';

export {
  // Main components
  SurveyForm,
  SurveyFormProvider,
  useSurveyForm,

  // Block renderers
  BlockRenderer,
  TextInputRenderer,
  TextareaRenderer,
  RadioRenderer,
  CheckboxRenderer,
  SelectRenderer,
  MarkdownRenderer,
  HtmlRenderer,
  RangeRenderer,
  DatePickerRenderer,
  FileUploadRenderer,
  MatrixRenderer,
  SelectableBoxRenderer,
  ScriptRenderer,
  SetRenderer,
  AuthRenderer,

  // UI components
  DebugInfo,

  // New conditional components
  ConditionalBlockRenderer,
  CalculatedFieldRenderer,
  BMICalculatorRenderer,
  CheckoutRenderer,
  ValidationSummary,

  // Utility functions
  evaluateLogic,
  getSurveyPages,
  getLocalized,
  getThemeClass,
  formatFieldName,
  blockTypeMap,
  validateBlock,
  isContentBlock,
  isInputBlock,

  // Conditional utility functions
  evaluateCondition,
  evaluateSimpleCondition,
  isBlockVisible,
  executeCalculation,
  calculateBMI,
  supportsConditionalRendering,
  supportsBranchingLogic,
  getSurveyPageIds
};

// Export public types
export * from './types';

export * from "./survey/SurveyBuilder";

// Export context and hooks
export {
  SurveyBuilderProvider,
  useSurveyBuilder,
  ActionTypes
} from './context/SurveyBuilderContext';

// Export standard blocks
export * from './components/blocks';

// Export node definitions
export * from './components/nodes';

// Export utility functions
export * from './utils/nodeUtils';