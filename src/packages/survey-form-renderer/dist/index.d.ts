import React$1, { ReactNode } from 'react';

interface ThemeDefinition {
    name: SurveyTheme;
    containerLayout: string;
    header: string;
    title: string;
    description: string;
    background: string;
    card: string;
    field: {
        label: string;
        input: string;
        description: string;
        error: string;
        radio: string;
        checkbox: string;
        select: string;
        textarea: string;
        file: string;
        matrix: string;
        range: string;
        text: string;
        activeText: string;
        placeholder: string;
        boxBorder?: string;
        selectableBox?: string;
        selectableBoxDefault?: string;
        selectableBoxSelected?: string;
        selectableBoxHover?: string;
        selectableBoxFocus?: string;
        selectableBoxDisabled?: string;
        selectableBoxContainer?: string;
        selectableBoxText?: string;
        selectableBoxTextSelected?: string;
        selectableBoxIndicator?: string;
        selectableBoxIndicatorIcon?: string;
    };
    container: {
        card: string;
        border: string;
        activeBorder: string;
        activeBg: string;
        header: string;
    };
    progress: {
        bar: string;
        dots: string;
        numbers: string;
        percentage: string;
        label: string;
    };
    button: {
        primary: string;
        secondary: string;
        text: string;
        navigation: string;
    };
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        border: string;
        error: string;
        success: string;
    };
}
declare const defaultTheme: ThemeDefinition;
declare const minimalTheme: ThemeDefinition;
declare const colorfulTheme: ThemeDefinition;
declare const modernTheme: ThemeDefinition;
declare const corporateTheme: ThemeDefinition;
declare const darkTheme: ThemeDefinition;
declare const themes: Record<SurveyTheme, ThemeDefinition>;

type UUID = string;
interface SurveyFormRendererProps {
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
    progressBar?: ProgressBarOptions | boolean;
    navigationButtons?: NavigationButtonsOptions;
    autoScroll?: boolean;
    autoFocus?: boolean;
    showSummary?: boolean;
    submitText?: string;
    className?: string;
    computedFields?: ComputedFieldsConfig;
    customValidators?: Record<string, CustomValidator>;
    debug?: boolean;
    enableDebug?: boolean;
    logo?: any;
}
type SurveyTheme = "default" | "minimal" | "colorful" | "modern" | "corporate" | "dark" | "custom" | any;
type SurveyLayout = "page-by-page" | "continuous" | "accordion" | "tabs" | "stepper" | "fullpage";
interface ProgressBarOptions {
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
interface NavigationButtonsOptions {
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
interface BlockRendererProps {
    block: BlockData;
    value?: any;
    onChange?: (value: any) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    customComponents?: Record<string, React.FC<BlockRendererProps>>;
    theme?: ThemeDefinition;
    isVisible?: boolean;
    customValidation?: (value: any) => string | null;
}
interface PageRendererProps {
    page: Array<BlockData>;
    values: Record<string, any>;
    onChange: (field: string, value: any) => void;
    onBlur?: (field: string) => void;
    errors: Record<string, string>;
    disabled?: boolean;
    customComponents?: Record<string, React.FC<BlockRendererProps>>;
    theme?: SurveyTheme;
}
interface SurveyFormContextProps {
    values: Record<string, any>;
    setValue: (field: string, value: any) => void;
    errors: Record<string, string>;
    setError: (field: string, error: string | null) => void;
    currentPage: number;
    currentBlockIndex: number;
    totalPages: number;
    goToPage: (pageIndex: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    goToNextBlock: (fValue?: Record<string, any>) => void;
    goToPreviousBlock: () => void;
    isFirstPage: boolean;
    isLastPage: boolean;
    isSubmitting: boolean;
    isValid: boolean;
    submit: () => void;
    language: string;
    setLanguage: (lang: string) => void;
    theme: ThemeDefinition;
    surveyData: {
        rootNode: NodeData;
        localizations?: LocalizationMap;
    };
    conditionalErrors: Record<string, string>;
    computedValues: Record<string, any>;
    updateComputedValues: () => void;
    evaluateCondition: (condition: string, contextData?: Record<string, any>) => boolean;
    getNextPageIndex: () => number | null;
    getVisibleBlocks: (blocks: BlockData[]) => BlockData[];
    validateField: (fieldName: string, value: any) => string | null;
    logo?: any;
}
interface CustomValidator {
    validate: (value: any, formValues: Record<string, any>) => string | null;
    validateAsync?: (value: any, formValues: Record<string, any>) => Promise<string | null>;
    dependencies?: string[];
}
interface ComputedFieldsConfig {
    [fieldName: string]: {
        formula: string;
        dependencies: string[];
        format?: (value: any) => any;
    };
}
interface ConditionalBlockProps extends BlockRendererProps {
    condition: string;
    contextData?: Record<string, any>;
}
interface CalculatedFieldProps extends BlockRendererProps {
    formula: string;
    dependencies: string[];
    format?: (value: any) => any;
}
type ConditionOperator = '==' | '!=' | '>' | '>=' | '<' | '<=' | 'contains' | 'startsWith' | 'endsWith' | 'empty' | 'notEmpty' | 'between' | 'in' | 'notIn';
interface ConditionRule {
    field: string;
    operator: ConditionOperator;
    value: any;
    type?: 'string' | 'number' | 'boolean' | 'date';
}
interface BranchingLogic {
    condition: string | ConditionRule | ConditionRule[];
    targetPage?: number | 'next' | 'prev' | 'submit';
    targetField?: string;
    message?: string;
}
interface NavigationRule {
    condition: string;
    target: string;
    isPage?: boolean;
    isDefault?: boolean;
}
interface CalculationRule {
    formula: string;
    targetField: string;
    dependencies: string[];
    runOn?: 'change' | 'blur' | 'submit' | 'pageChange';
}
interface CurrentValues {
    [key: string]: string | number | boolean;
}
interface EvaluationResult {
    matched: boolean;
    target: string | null;
    isPage: boolean | null;
    error?: any;
}
interface MobileNavigationConfig {
    enableSwipeNavigation?: boolean;
    enableDoubleTapToGoBack?: boolean;
    showMobileBackButton?: boolean;
    preventBrowserBack?: boolean;
    swipeThreshold?: number;
}
interface SwipeDirection {
    direction: 'left' | 'right' | 'up' | 'down' | null;
    distance: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
interface BlockData {
    type: string;
    name?: string;
    label?: string;
    description?: string;
    fieldName?: string;
    placeholder?: string;
    text?: string;
    html?: string;
    items?: Array<BlockData>;
    labels?: Array<string>;
    values?: Array<string | number | boolean>;
    defaultValue?: any;
    className?: string;
    showResults?: boolean;
    navigationRules?: NavigationRule[];
    visibleIf?: any;
    isEndBlock?: boolean;
    /** If true, automatically continue to the next step when an option is selected */
    autoContinueOnSelect?: boolean;
    /** Whether to show the continue button for this block/page */
    showContinueButton?: boolean;
    [key: string]: any;
}
interface NodeData {
    uuid?: UUID;
    name?: string;
    type: string;
    items?: Array<BlockData>;
    nodes?: Array<NodeData | UUID>;
    navigationLogic?: string;
    entryLogic?: string;
    exitLogic?: string;
    backLogic?: string;
    [key: string]: any;
}
interface LocalizationMap {
    [key: string]: {
        [key: string]: string;
    };
}
interface BlockDefinition {
    type: string;
    name: string;
    description: string;
    icon?: ReactNode;
    defaultData: BlockData;
    validate?: (data: BlockData) => string | null;
}

declare const SurveyForm: React$1.FC<SurveyFormRendererProps>;

interface NavigationHistoryEntry {
    pageIndex: number;
    blockIndex: number;
    timestamp: number;
    trigger: 'forward' | 'back' | 'jump' | 'initial';
}
interface EnhancedSurveyFormContextProps extends SurveyFormContextProps {
    navigationHistory: NavigationHistoryEntry[];
    canGoBack: boolean;
    getActualProgress: () => number;
    getTotalVisibleSteps: () => number;
    getCurrentStepPosition: () => number;
}
interface SurveyFormProviderProps {
    children: ReactNode;
    surveyData: {
        rootNode: NodeData;
    };
    defaultValues?: Record<string, any>;
    onSubmit?: (data: Record<string, any>) => void;
    onChange?: (data: Record<string, any>) => void;
    onPageChange?: (pageIndex: number, totalPages: number) => void;
    language?: string;
    theme?: ThemeDefinition;
    computedFields?: ComputedFieldsConfig;
    customValidators?: Record<string, CustomValidator>;
    debug?: boolean;
    enableDebug?: boolean;
    logo?: any;
}
declare const SurveyFormProvider: React$1.FC<SurveyFormProviderProps>;
declare const useSurveyForm: () => EnhancedSurveyFormContextProps;

/**
 * A component that renders different types of blocks based on their type
 */
declare const BlockRenderer: React$1.ForwardRefExoticComponent<BlockRendererProps & React$1.RefAttributes<HTMLElement>>;

interface TextInputRendererProps {
    block: BlockData;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const TextInputRenderer: React$1.ForwardRefExoticComponent<TextInputRendererProps & React$1.RefAttributes<HTMLInputElement>>;

interface TextareaRendererProps {
    block: BlockData;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string | null;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const TextareaRenderer: React$1.ForwardRefExoticComponent<TextareaRendererProps & React$1.RefAttributes<HTMLTextAreaElement>>;

interface RadioRendererProps {
    block: BlockData;
    value?: string | number;
    onChange?: (value: string | number | boolean) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const RadioRenderer: React$1.FC<RadioRendererProps>;

interface CheckboxRendererProps {
    block: BlockData;
    value?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const CheckboxRenderer: React$1.ForwardRefExoticComponent<CheckboxRendererProps & React$1.RefAttributes<HTMLButtonElement>>;

interface SelectRendererProps {
    block: BlockData;
    value?: string | number;
    onChange?: (value: string | number | boolean) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const SelectRenderer: React$1.ForwardRefExoticComponent<SelectRendererProps & React$1.RefAttributes<HTMLButtonElement>>;

interface MarkdownRendererProps {
    block: BlockData;
    theme?: ThemeDefinition;
}
declare const MarkdownRenderer: React$1.FC<MarkdownRendererProps>;

interface HtmlRendererProps {
    block: BlockData;
    theme?: ThemeDefinition;
}
declare const HtmlRenderer: React$1.FC<HtmlRendererProps>;

interface RangeRendererProps {
    block: BlockData;
    value?: string | number;
    onChange?: (value: string | number) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const RangeRenderer: React$1.FC<RangeRendererProps>;

interface DatePickerRendererProps {
    block: BlockData;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const DatePickerRenderer: React$1.FC<DatePickerRendererProps>;

interface FileUploadRendererProps {
    block: BlockData;
    value?: File[] | string;
    onChange?: (value: File[]) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const FileUploadRenderer: React$1.FC<FileUploadRendererProps>;

interface MatrixRendererProps {
    block: BlockData;
    value?: Record<string, string>;
    onChange?: (value: Record<string, string>) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const MatrixRenderer: React$1.FC<MatrixRendererProps>;

interface SelectableBoxRendererProps {
    block: BlockData;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const SelectableBoxRenderer: React$1.FC<SelectableBoxRendererProps>;

interface ScriptRendererProps {
    block: BlockData;
    theme?: ThemeDefinition;
}
/**
 * The ScriptRenderer evaluates JavaScript code in a controlled environment.
 * It doesn't render anything visible but can modify form state, show/hide questions,
 * validate fields, etc. based on the script's logic.
 */
declare const ScriptRenderer: React$1.FC<ScriptRendererProps>;

/**
 * Renderer for "set" block type
 * Sets are containers for other blocks and can also contain conditional logic
 */
declare const SetRenderer: React$1.FC<BlockRendererProps>;

declare const AuthRenderer: React$1.FC<BlockRendererProps>;

interface DebugInfoProps {
    show?: boolean;
}
/**
 * Component to display debug information about the survey state
 * Only visible in development mode when show=true
 */
declare const DebugInfo: React$1.FC<DebugInfoProps>;

/**
 * A component that conditionally renders its children based on a condition
 */
declare const ConditionalBlock: React$1.FC<ConditionalBlockProps>;

/**
 * A component that displays a calculated value based on a formula and dependencies
 */
declare const CalculatedFieldRenderer: React$1.FC<CalculatedFieldProps>;

interface BMICalculatorRendererProps {
    block: {
        fieldName?: string;
        label?: string;
        description?: string;
        className?: string;
        showResults?: boolean;
        heightUnit?: 'cm' | 'inches';
        weightUnit?: 'kg' | 'lbs';
        defaultUnit?: 'metric' | 'imperial';
        theme?: ThemeDefinition;
    };
    value?: {
        height?: number;
        weight?: number;
        bmi?: number;
        category?: string;
        unitSystem?: string;
    };
    onChange?: (value: any) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
/**
 * A specialized block for calculating BMI with modern design
 */
declare const BMICalculatorRenderer: React$1.FC<BMICalculatorRendererProps>;

interface CheckoutRendererProps {
    block: BlockData;
    value?: any;
    onChange?: (value: any) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    theme?: ThemeDefinition;
}
declare const CheckoutRenderer: React$1.FC<CheckoutRendererProps>;

interface ValidationSummaryProps {
    fieldNames?: string[];
    showIcon?: boolean;
    className?: string;
}
/**
 * A component that displays a summary of validation errors
 */
declare const ValidationSummary: React$1.FC<ValidationSummaryProps>;

/**
 * Evaluates a simple condition between two values using the specified operator
 */
declare function evaluateSimpleCondition(fieldValue: any, operator: ConditionOperator, comparisonValue: any, valueType?: 'string' | 'number' | 'boolean' | 'date'): boolean;
/**
 * Evaluates a condition expression or rule against field values
 */
declare function evaluateCondition(condition: string | ConditionRule | ConditionRule[], fieldValues: Record<string, any>): boolean;
/**
 * Executes a calculation rule to compute a field value
 */
declare function executeCalculation(calculationRule: CalculationRule, fieldValues: Record<string, any>): any;
/**
 * Evaluates if a block should be visible based on its visibility condition
 */
declare function isBlockVisible(block: {
    visibleIf?: string | ConditionRule | ConditionRule[];
}, fieldValues: Record<string, any>): boolean;
/**
 * Simple BMI calculator example
 */
declare function calculateBMI(weightInKg: number, heightInCm: number): {
    bmi: number;
    category: string;
};

/**
 * Extracts all pages/sections from a survey
 * @param rootNode The survey root node
 * @returns Array of page blocks
 */
declare function getSurveyPages(rootNode: NodeData): Array<BlockData[]>;
/**
 * Returns an array of page UUIDs in the same order as getSurveyPages
 */
declare function getSurveyPageIds(rootNode: NodeData): string[];
/**
 * Safely evaluate logic script in a survey
 *
 * @param script The logic script to evaluate
 * @param context The context object with form data and helper functions
 */
declare function evaluateLogic(script: string, context: {
    fieldValues: Record<string, any>;
    setValue?: (field: string, value: any) => void;
    setError?: (field: string, error: string | null) => void;
    currentPage?: number;
    getFieldValue?: (fieldName: string) => any;
    showAlert?: (message: string) => void;
}): any;
/**
 * Gets a localized label for a block
 */
declare function getLocalized(block: BlockData, field: string, language: string, localizations?: Record<string, Record<string, string>>): any;
/**
 * Generate a className based on theme and customization options
 */
declare function getThemeClass(theme: string, baseClass: string, customClass?: string): string;
/**
 * Formats a field name into a human-readable label
 */
declare function formatFieldName(fieldName: string): string;

/**
 * Maps survey builder block types to the appropriate renderer components
 * This allows us to re-use the validation and properties from the original blocks
 */
declare const blockTypeMap: Record<string, any>;
/**
 * Validates a block using its original validation function from the survey builder
 */
declare function validateBlock(block: BlockData): string | null;
/**
 * Checks if a block is a content block (doesn't collect data)
 */
declare function isContentBlock(blockType: string): boolean;
/**
 * Checks if a block is an input block (collects data)
 */
declare function isInputBlock(blockType: string): boolean;
/**
 * Checks if a block supports conditional rendering
 */
declare function supportsConditionalRendering(blockType: string): boolean;
/**
 * Checks if a block supports branching logic
 */
declare function supportsBranchingLogic(blockType: string): boolean;

declare function applyDynamicColors(theme: any): void;

export { AuthRenderer, BMICalculatorRenderer, type BlockData, type BlockDefinition, BlockRenderer, type BlockRendererProps, type BranchingLogic, type CalculatedFieldProps, CalculatedFieldRenderer, type CalculationRule, CheckboxRenderer, CheckoutRenderer, type ComputedFieldsConfig, type ConditionOperator, type ConditionRule, ConditionalBlock, type ConditionalBlockProps, type CurrentValues, type CustomValidator, DatePickerRenderer, DebugInfo, type EvaluationResult, FileUploadRenderer, HtmlRenderer, type LocalizationMap, MarkdownRenderer, MatrixRenderer, type MobileNavigationConfig, type NavigationButtonsOptions, type NavigationRule, type NodeData, type PageRendererProps, type ProgressBarOptions, RadioRenderer, RangeRenderer, ScriptRenderer, SelectRenderer, SelectableBoxRenderer, SetRenderer, SurveyForm, type SurveyFormContextProps, SurveyFormProvider, type SurveyFormRendererProps, type SurveyLayout, type SurveyTheme, type SwipeDirection, TextInputRenderer, TextareaRenderer, type UUID, ValidationSummary, applyDynamicColors, blockTypeMap, calculateBMI, colorfulTheme, corporateTheme, darkTheme, SurveyForm as default, defaultTheme, evaluateCondition, evaluateLogic, evaluateSimpleCondition, executeCalculation, formatFieldName, getLocalized, getSurveyPageIds, getSurveyPages, getThemeClass, isBlockVisible, isContentBlock, isInputBlock, minimalTheme, modernTheme, supportsBranchingLogic, supportsConditionalRendering, themes, useSurveyForm, validateBlock };
