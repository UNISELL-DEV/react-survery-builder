import type React from "react";
import { act, createContext, useContext, useReducer, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid";
import {
  BlockData,
  type BlockDefinition,
  type LocalizationMap,
  type NodeData,
  type NodeDefinition,
  type SurveyBuilderAction,
  type SurveyBuilderState,
  type UUID
} from "../types";

// Custom hook
export const useSurveyBuilder = () => {
  const context = useContext(SurveyBuilderContext);
  if (context === undefined) {
    throw new Error("useSurveyBuilder must be used within a SurveyBuilderProvider");
  }
  return context;
};

// Initial state
const initialState: SurveyBuilderState = {
  rootNode: null,
  definitions: {
    blocks: {},
    nodes: {},
  },
  localizations: {
    en: {},
  },
  selectedNode: null,
  displayMode: "list",
};

// Action types
export const ActionTypes = {
  INIT_SURVEY: "INIT_SURVEY",
  SET_ROOT_NODE: "SET_ROOT_NODE",
  ADD_NODE: "ADD_NODE",
  UPDATE_NODE: "UPDATE_NODE",
  REMOVE_NODE: "REMOVE_NODE",
  ADD_BLOCK_DEFINITION: "ADD_BLOCK_DEFINITION",
  ADD_NODE_DEFINITION: "ADD_NODE_DEFINITION",
  SET_SELECTED_NODE: "SET_SELECTED_NODE",
  SET_DISPLAY_MODE: "SET_DISPLAY_MODE",
  UPDATE_LOCALIZATIONS: "UPDATE_LOCALIZATIONS",
  IMPORT_SURVEY: "IMPORT_SURVEY",
};

// Reducer
const surveyBuilderReducer = (
  state: SurveyBuilderState,
  action: SurveyBuilderAction
): SurveyBuilderState => {
  switch (action.type) {
    case ActionTypes.INIT_SURVEY:
      return {
        ...state,
        rootNode: action.payload.rootNode || null,
        localizations: action.payload.localizations || { en: {} },
      };
    case ActionTypes.SET_ROOT_NODE:
      return {
        ...state,
        rootNode: action.payload,
      };

    case ActionTypes.ADD_NODE: {
      if (!state.rootNode) return state;

      const { parentUuid, nodeData } = action.payload;
      const newNode = { ...nodeData, uuid: nodeData.uuid || uuidv4() };

      // Helper function to add node to parent
      const addNodeToParent = (node: NodeData): NodeData => {
        if (node.uuid === parentUuid) {
          return {
            ...node,
            nodes: [...(node.nodes || []), newNode],
          };
        }

        if (!node.nodes) return node;

        return {
          ...node,
          nodes: node.nodes.map((childNode) => {
            if (typeof childNode === "string") return childNode;
            return addNodeToParent(childNode);
          }),
        };
      };

      return {
        ...state,
        rootNode: addNodeToParent(state.rootNode),
      };
    }

    case ActionTypes.UPDATE_NODE: {
      if (!state.rootNode) return state;

      const { uuid, nodeData } = action.payload;

      // Helper function to update node
      const updateNode = (node: NodeData): NodeData => {
        if (node.uuid === uuid) {
          return { ...node, ...nodeData, uuid };
        }

        if (!node.nodes) return node;

        return {
          ...node,
          nodes: node.nodes.map((childNode) => {
            if (typeof childNode === "string") return childNode;
            return updateNode(childNode);
          }),
        };
      };

      return {
        ...state,
        rootNode: updateNode(state.rootNode),
      };
    }

    case ActionTypes.REMOVE_NODE: {
      if (!state.rootNode) return state;

      const uuid = action.payload;

      // Helper function to remove node
      const removeNode = (node: NodeData): NodeData | null => {
        if (node.uuid === uuid) {
          return null;
        }

        if (!node.nodes) return node;

        const updatedNodes = node.nodes
          .map((childNode) => {
            if (typeof childNode === "string") {
              return childNode === uuid ? null : childNode;
            }
            return removeNode(childNode);
          })
          .filter(Boolean) as Array<NodeData | UUID>;

        return {
          ...node,
          nodes: updatedNodes,
        };
      };

      return {
        ...state,
        rootNode: removeNode(state.rootNode),
      };
    }

    case ActionTypes.ADD_BLOCK_DEFINITION: {
      const { type, definition } = action.payload;
      return {
        ...state,
        definitions: {
          ...state.definitions,
          blocks: {
            ...state.definitions.blocks,
            [type]: definition,
          },
        },
      };
    }

    case ActionTypes.ADD_NODE_DEFINITION: {
      const { type, definition } = action.payload;
      return {
        ...state,
        definitions: {
          ...state.definitions,
          nodes: {
            ...state.definitions.nodes,
            [type]: definition,
          },
        },
      };
    }

    case ActionTypes.SET_SELECTED_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };

    case ActionTypes.SET_DISPLAY_MODE:
      return {
        ...state,
        displayMode: action.payload,
      };

    case ActionTypes.UPDATE_LOCALIZATIONS:
      return {
        ...state,
        localizations: action.payload,
      };

    case ActionTypes.IMPORT_SURVEY:
      return {
        ...state,
        rootNode: action.payload.rootNode || null,
        localizations: action.payload.localizations || { en: {} },
      };

    default:
      return state;
  }
};

// Context
interface SurveyBuilderContextType {
  state: SurveyBuilderState;
  dispatch: React.Dispatch<SurveyBuilderAction>;

  // Helper functions
  addBlockDefinition: (type: string, definition: BlockDefinition) => void;
  addNodeDefinition: (type: string, definition: NodeDefinition) => void;
  initSurvey: () => void;
  createNode: (parentUuid: UUID, type: string, initialData?: Partial<NodeData>) => void;
  updateNode: (uuid: UUID, data: Partial<NodeData>) => void;
  removeNode: (uuid: UUID) => void;
  setSelectedNode: (uuid: UUID | null) => void;
  setDisplayMode: (mode: "list" | "graph" | "lang") => void;
  updateLocalizations: (localizations: LocalizationMap) => void;
  importSurvey: (data: { rootNode: NodeData; localizations?: LocalizationMap }) => void;
  exportSurvey: () => { rootNode: NodeData | null; localizations: LocalizationMap };
}

const SurveyBuilderContext = createContext<SurveyBuilderContextType | undefined>(
  undefined
);

// Provider
interface SurveyBuilderProviderProps {
  children: ReactNode;
  initialData?: {
    rootNode?: NodeData;
    localizations?: LocalizationMap;
  };
}

export const SurveyBuilderProvider: React.FC<SurveyBuilderProviderProps> = ({
  children,
  initialData,
}) => {
  const [state, dispatch] = useReducer(
    surveyBuilderReducer,
    {
      ...initialState,
      rootNode: initialData?.rootNode || null,
      localizations: initialData?.localizations || { en: {} },
    }
  );

  // Helper functions
  const addBlockDefinition = (type: string, definition: BlockDefinition) => {
    dispatch({
      type: ActionTypes.ADD_BLOCK_DEFINITION,
      payload: { type, definition },
    });
  };

  const addNodeDefinition = (type: string, definition: NodeDefinition) => {
    dispatch({
      type: ActionTypes.ADD_NODE_DEFINITION,
      payload: { type, definition },
    });
  };

  const createId = () => uuidv4();

  const initSurvey = () => {
    const data = {
      rootNode: {
        type: "section",
        name: "New Survey",
        uuid: createId(),
        items: [
        ],
        navigationLogic: "return 0;",
        entryLogic: "",
        exitLogic: "",
        backLogic: ""
      },
      localizations: {
        en: {}
      }
    };
    dispatch({
      type: ActionTypes.INIT_SURVEY,
      payload: data,
    });
  }

  const createNode = (parentUuid: UUID, type: string, initialData: Partial<NodeData> = {}) => {
    const nodeDefinition = state.definitions.nodes[type];

    if (!nodeDefinition) return;

    console.log(nodeDefinition)

    const nodeData = {
      ...nodeDefinition.defaultData,
      ...initialData,
      type,
    };

    console.log(nodeData)

    dispatch({
      type: ActionTypes.ADD_NODE,
      payload: { parentUuid, nodeData },
    });
  };

  const updateNode = (uuid: UUID, data: Partial<NodeData>) => {
    dispatch({
      type: ActionTypes.UPDATE_NODE,
      payload: { uuid, nodeData: data },
    });
  };

  const removeNode = (uuid: UUID) => {
    dispatch({
      type: ActionTypes.REMOVE_NODE,
      payload: uuid,
    });
  };

  const setSelectedNode = (uuid: UUID | null) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_NODE,
      payload: uuid,
    });
  };

  const setDisplayMode = (mode: "list" | "graph" | "lang") => {
    dispatch({
      type: ActionTypes.SET_DISPLAY_MODE,
      payload: mode,
    });
  };

  const updateLocalizations = (localizations: LocalizationMap) => {
    dispatch({
      type: ActionTypes.UPDATE_LOCALIZATIONS,
      payload: localizations,
    });
  };

  const importSurvey = (data: { rootNode: NodeData; localizations?: LocalizationMap }) => {
    dispatch({
      type: ActionTypes.IMPORT_SURVEY,
      payload: data,
    });
  };

  const exportSurvey = () => {
    return {
      rootNode: state.rootNode,
      localizations: state.localizations,
    };
  };

  const value = {
    state,
    dispatch,
    addBlockDefinition,
    addNodeDefinition,
    initSurvey,
    createNode,
    updateNode,
    removeNode,
    setSelectedNode,
    setDisplayMode,
    updateLocalizations,
    importSurvey,
    exportSurvey,
  };

  return (
    <SurveyBuilderContext.Provider value={value}>
      {children}
    </SurveyBuilderContext.Provider>
  );
};