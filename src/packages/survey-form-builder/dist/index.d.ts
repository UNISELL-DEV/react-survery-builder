import React, { ReactNode, JSX } from 'react';

type UUID = string;
interface NavigationRule {
    condition: string;
    target: UUID | string;
    isPage?: boolean;
    isDefault?: boolean;
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
interface ContentBlockItemProps {
    data: BlockData;
    onUpdate?: (data: BlockData) => void;
    onRemove?: () => void;
}
interface BlockDefinition {
    type: string;
    name: string;
    description: string;
    icon?: ReactNode;
    defaultData: BlockData;
    renderItem: (props: ContentBlockItemProps) => JSX.Element;
    renderFormFields: (props: ContentBlockItemProps) => JSX.Element;
    renderPreview: () => JSX.Element;
    validate?: (data: BlockData) => string | null;
}
interface NodeDefinition {
    type: string;
    name: string;
    description: string;
    uuid: UUID;
    icon?: ReactNode;
    defaultData: NodeData;
    renderNode: (props: {
        data: NodeData;
        onUpdate: (data: NodeData) => void;
        onRemove: () => void;
    }) => JSX.Element;
}
interface LocalizationMap {
    [key: string]: {
        [key: string]: string;
    };
}
type SurveyTheme = "default" | "minimal" | "colorful" | "modern" | "corporate" | "dark" | "custom";
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
interface SurveyBuilderState {
    rootNode: NodeData | null;
    definitions: {
        blocks: Record<string, BlockDefinition>;
        nodes: Record<string, NodeDefinition>;
    };
    localizations: LocalizationMap;
    theme: ThemeDefinition;
    selectedNode: UUID | null;
    displayMode: 'list' | 'graph' | 'lang' | 'theme';
}
interface SurveyBuilderAction {
    type: string;
    payload?: any;
}

interface SurveyBuilderProps {
    initialData?: {
        rootNode?: NodeData;
        localizations?: LocalizationMap;
    };
    onDataChange?: (data: {
        rootNode: NodeData | null;
        localizations: LocalizationMap;
    }) => void;
    blockDefinitions?: BlockDefinition[];
    nodeDefinitions?: NodeDefinition[];
}
declare const SurveyBuilder: React.FC<SurveyBuilderProps>;

declare const useSurveyBuilder: () => SurveyBuilderContextType;
declare const ActionTypes: {
    INIT_SURVEY: string;
    SET_ROOT_NODE: string;
    ADD_NODE: string;
    UPDATE_NODE: string;
    REMOVE_NODE: string;
    ADD_BLOCK_DEFINITION: string;
    ADD_NODE_DEFINITION: string;
    SET_SELECTED_NODE: string;
    SET_DISPLAY_MODE: string;
    UPDATE_LOCALIZATIONS: string;
    UPDATE_THEME: string;
    IMPORT_SURVEY: string;
};
interface SurveyBuilderContextType {
    state: SurveyBuilderState;
    dispatch: React.Dispatch<SurveyBuilderAction>;
    addBlockDefinition: (type: string, definition: BlockDefinition) => void;
    addNodeDefinition: (type: string, definition: NodeDefinition) => void;
    initSurvey: () => void;
    createNode: (parentUuid: UUID, type: string, initialData?: Partial<NodeData>) => void;
    updateNode: (uuid: UUID, data: Partial<NodeData>) => void;
    removeNode: (uuid: UUID) => void;
    setSelectedNode: (uuid: UUID | null) => void;
    setDisplayMode: (mode: "list" | "graph" | "lang") => void;
    updateLocalizations: (localizations: LocalizationMap) => void;
    updateTheme: (theme: ThemeDefinition) => void;
    importSurvey: (data: {
        rootNode: NodeData;
        localizations?: LocalizationMap;
        theme?: ThemeDefinition;
    }) => void;
    exportSurvey: () => {
        rootNode: NodeData | null;
        localizations: LocalizationMap;
        theme: ThemeDefinition;
    };
}
interface SurveyBuilderProviderProps {
    children: ReactNode;
    initialData?: {
        rootNode?: NodeData;
        localizations?: LocalizationMap;
        theme?: ThemeDefinition;
    };
}
declare const SurveyBuilderProvider: React.FC<SurveyBuilderProviderProps>;

declare const TextInputBlock: BlockDefinition;

declare const TextareaBlock: BlockDefinition;

declare const RadioBlock: BlockDefinition;

declare const CheckboxBlock: BlockDefinition;

declare const MarkdownBlock: BlockDefinition;

declare const HtmlBlock: BlockDefinition;

declare const ScriptBlock: BlockDefinition;

declare const AuthBlock: BlockDefinition;

declare const SelectBlock: BlockDefinition;

declare const RangeBlock: BlockDefinition;

declare const DatePickerBlock: BlockDefinition;

declare const FileUploadBlock: BlockDefinition;

declare const MatrixBlock: BlockDefinition;

declare const SelectableBoxQuestionBlock: BlockDefinition;

declare const BMICalculatorBlock: BlockDefinition;

declare const CalculatedFieldBlock: BlockDefinition;

declare const ConditionalBlock: BlockDefinition;

declare const CheckoutBlock: BlockDefinition;

declare const StandardBlocks: BlockDefinition[];

declare const SectionNodeDefinition: NodeDefinition;

declare const StandardNodes: NodeDefinition[];

/**
 * Find a node by UUID in the survey tree
 */
declare const findNodeById: (rootNode: NodeData | null, uuid: UUID) => NodeData | null;
/**
 * Get all nodes in the survey tree (flattened)
 */
declare const getAllNodes: (rootNode: NodeData | null) => NodeData[];
/**
 * Get direct parent node of a node by UUID
 */
declare const getParentNode: (rootNode: NodeData | null, uuid: UUID) => NodeData | null;
/**
 * Get all parent nodes of a node by UUID
 */
declare const getAllParentNodes: (rootNode: NodeData | null, uuid: UUID) => NodeData[];
/**
 * Ensure all nodes have UUIDs (useful for imported data)
 */
declare const ensureNodeUuids: (node: NodeData) => NodeData;
/**
 * Get the paths to all leaf nodes (nodes without children)
 */
declare const getLeafNodePaths: (rootNode: NodeData | null) => NodeData[][];
/**
 * Clone a node with all its children
 */
declare const cloneNode: (node: NodeData) => NodeData;
/**
 * Create a link between two nodes
 */
declare const linkNodes: (sourceNode: NodeData, targetNode: NodeData | UUID) => NodeData;

export { ActionTypes, AuthBlock, BMICalculatorBlock, type BlockData, type BlockDefinition, CalculatedFieldBlock, CheckboxBlock, CheckoutBlock, ConditionalBlock, type ContentBlockItemProps, DatePickerBlock, FileUploadBlock, HtmlBlock, type LocalizationMap, MarkdownBlock, MatrixBlock, type NavigationRule, type NodeData, type NodeDefinition, RadioBlock, RangeBlock, ScriptBlock, SectionNodeDefinition, SelectBlock, SelectableBoxQuestionBlock, StandardBlocks, StandardNodes, SurveyBuilder, type SurveyBuilderAction, SurveyBuilderProvider, type SurveyBuilderState, type SurveyTheme, TextInputBlock, TextareaBlock, type ThemeDefinition, type UUID, cloneNode, ensureNodeUuids, findNodeById, getAllNodes, getAllParentNodes, getLeafNodePaths, getParentNode, linkNodes, useSurveyBuilder };
