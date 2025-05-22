import type { ReactNode } from "react";
import type { NodeData, BlockData, LocalizationMap } from "../../../lib/survey/types";

export interface SurveyFormRendererProps {
  survey: {
    rootNode: NodeData;
    localizations?: LocalizationMap;
  };
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void;
  onPageChange?: (pageIndex: number, totalPages: number) => void;
  defaultValues?: Record<string, any>;
  language?: string;
  theme?: SurveyTheme;
  layout?: SurveyLayout;
  progressBar?: ProgressBarOptions | boolean;
  navigationButtons?: NavigationButtonsOptions;
  autoScroll?: boolean;
  autoFocus?: boolean;
  showSummary?: boolean;
  submitText?: string;
  className?: string;
  // New properties for conditional features
  computedFields?: ComputedFieldsConfig;
  customValidators?: Record<string, CustomValidator>;
  debug?: boolean;
  enableDebug?: boolean;
}

export type SurveyTheme =
  | "default"
  | "minimal"
  | "colorful"
  | "modern"
  | "corporate"
  | "dark";

export type SurveyLayout =
  | "page-by-page"
  | "continuous"
  | "accordion"
  | "tabs"
  | "stepper"
  | "fullpage";

export interface ProgressBarOptions {
  type?: "bar" | "dots" | "numbers" | "percentage";
  showPercentage?: boolean;
  showStepInfo?: boolean;
  showStepTitles?: boolean;
  showStepNumbers?: boolean;
  position?: "top" | "bottom";
  color?: string;
  backgroundColor?: string;
  height?: number | string;
  animation?: boolean;
}

export interface NavigationButtonsOptions {
  showPrevious?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  previousText?: string;
  nextText?: string;
  submitText?: string;
  position?: "bottom" | "split";
  align?: "left" | "center" | "right";
  style?: "default" | "outlined" | "text";
}

export interface BlockRendererProps {
  block: BlockData;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  customComponents?: Record<string, React.ComponentType<BlockRendererProps>>;
  theme?: SurveyTheme;
  // New props for conditional rendering
  isVisible?: boolean;
  customValidation?: (value: any) => string | null;
}

export interface PageRendererProps {
  page: Array<BlockData>;
  values: Record<string, any>;
  onChange: (field: string, value: any) => void;
  onBlur?: (field: string) => void;
  errors: Record<string, string>;
  disabled?: boolean;
  customComponents?: Record<string, React.ComponentType<BlockRendererProps>>;
  theme?: SurveyTheme;
}

export interface SurveyFormContextProps {
  values: Record<string, any>;
  setValue: (field: string, value: any) => void;
  errors: Record<string, string>;
  setError: (field: string, error: string | null) => void;
  currentPage: number;
  totalPages: number;
  goToPage: (pageIndex: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  submit: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  theme: SurveyTheme;
  surveyData: {
    rootNode: NodeData;
    localizations?: LocalizationMap;
  };
  // New props for conditional features
  conditionalErrors: Record<string, string>;
  computedValues: Record<string, any>;
  updateComputedValues: () => void;
  evaluateCondition: (condition: string, contextData?: Record<string, any>) => boolean;
  getNextPageIndex: () => number | null;
  getVisibleBlocks: (blocks: BlockData[]) => BlockData[];
  validateField: (fieldName: string, value: any) => string | null;
}

// New interfaces for conditional branching and validation

export interface CustomValidator {
  validate: (value: any, formValues: Record<string, any>) => string | null;
  validateAsync?: (value: any, formValues: Record<string, any>) => Promise<string | null>;
  dependencies?: string[]; // List of field names this validator depends on
}

export interface ComputedFieldsConfig {
  [fieldName: string]: {
    formula: string;
    dependencies: string[];
    format?: (value: any) => any;
  };
}

export interface ConditionalBlockProps extends BlockRendererProps {
  condition: string;
  contextData?: Record<string, any>;
}

export interface CalculatedFieldProps extends BlockRendererProps {
  formula: string;
  dependencies: string[];
  format?: (value: any) => any;
}

export type ConditionOperator =
  | '==' | '!=' | '>' | '>=' | '<' | '<='
  | 'contains' | 'startsWith' | 'endsWith'
  | 'empty' | 'notEmpty' | 'between' | 'in' | 'notIn';

export interface ConditionRule {
  field: string;
  operator: ConditionOperator;
  value: any;
  type?: 'string' | 'number' | 'boolean' | 'date';
}

export interface BranchingLogic {
  condition: string | ConditionRule | ConditionRule[];
  targetPage?: number | 'next' | 'prev' | 'submit';
  targetField?: string;
  message?: string;
}

export interface CalculationRule {
  formula: string;
  targetField: string;
  dependencies: string[];
  runOn?: 'change' | 'blur' | 'submit' | 'pageChange';
}
