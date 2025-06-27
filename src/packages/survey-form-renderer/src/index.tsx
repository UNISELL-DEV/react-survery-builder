import { SurveyForm } from './components/SurveyForm';
import { SurveyFormProvider, useSurveyForm } from './context/SurveyFormContext';
import { BlockRenderer } from './components/blocks/BlockRenderer';
import { TextInputRenderer } from './components/blocks/TextInputRenderer';
import { TextareaRenderer } from './components/blocks/TextareaRenderer';
import { RadioRenderer } from './components/blocks/RadioRenderer';
import { CheckboxRenderer } from './components/blocks/CheckboxRenderer';
import { SelectRenderer } from './components/blocks/SelectRenderer';
import { MarkdownRenderer } from './components/blocks/MarkdownRenderer';
import { HtmlRenderer } from './components/blocks/HtmlRenderer';
import { RangeRenderer } from './components/blocks/RangeRenderer';
import { DatePickerRenderer } from './components/blocks/DatePickerRenderer';
import { FileUploadRenderer } from './components/blocks/FileUploadRenderer';
import { MatrixRenderer } from './components/blocks/MatrixRenderer';
import { SelectableBoxRenderer } from './components/blocks/SelectableBoxRenderer';
import { ScriptRenderer } from './components/blocks/ScriptRenderer';
import { SetRenderer } from './components/blocks/SetRenderer';
import { AuthRenderer } from './components/blocks/AuthRenderer';
import { DebugInfo } from './components/ui/DebugInfo';

// New conditional components
import { ConditionalBlock } from './components/blocks/ConditionalBlock';
import { CalculatedFieldRenderer } from './components/blocks/CalculatedFieldRenderer';
import { BMICalculatorRenderer } from './components/blocks/BMICalculatorRenderer';
import { CheckoutRenderer } from './components/blocks/CheckoutRenderer';
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

// Types
export * from './types';

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
  ConditionalBlock,
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

export default SurveyForm;
