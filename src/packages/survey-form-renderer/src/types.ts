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
  | "stepper";

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
}
