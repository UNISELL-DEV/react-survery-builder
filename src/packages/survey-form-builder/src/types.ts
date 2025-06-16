import type { JSX, ReactNode } from "react";

export type UUID = string;

export interface NavigationRule {
  condition: string;
  target: UUID | string;
  isPage?: boolean;
  isDefault?: boolean;
}

export interface NodeData {
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

export interface BlockData {
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
  [key: string]: any;
}

export interface ContentBlockItemProps {
  data: BlockData;
  onUpdate?: (data: BlockData) => void;
  onRemove?: () => void;
}

export interface BlockDefinition {
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

export interface NodeDefinition {
  type: string;
  name: string;
  description: string;
  uuid: UUID,
  icon?: ReactNode;
  defaultData: NodeData;
  renderNode: (props: {
    data: NodeData;
    onUpdate: (data: NodeData) => void;
    onRemove: () => void;
  }) => JSX.Element;
}

export interface LocalizationMap {
  [key: string]: {
    [key: string]: string;
  };
}

export interface SurveyBuilderState {
  rootNode: NodeData | null;
  definitions: {
    blocks: Record<string, BlockDefinition>;
    nodes: Record<string, NodeDefinition>;
  };
  localizations: LocalizationMap;
  selectedNode: UUID | null;
  displayMode: 'list' | 'graph' | 'lang';
}

export interface SurveyBuilderAction {
  type: string;
  payload?: any;
}
