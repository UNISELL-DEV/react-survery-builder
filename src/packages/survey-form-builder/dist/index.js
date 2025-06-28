var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  ActionTypes: () => ActionTypes,
  AuthBlock: () => AuthBlock,
  BMICalculatorBlock: () => BMICalculatorBlock,
  CalculatedFieldBlock: () => CalculatedFieldBlock,
  CheckboxBlock: () => CheckboxBlock,
  CheckoutBlock: () => CheckoutBlock,
  ConditionalBlock: () => ConditionalBlock,
  DatePickerBlock: () => DatePickerBlock,
  FileUploadBlock: () => FileUploadBlock,
  HtmlBlock: () => HtmlBlock,
  MarkdownBlock: () => MarkdownBlock,
  MatrixBlock: () => MatrixBlock,
  RadioBlock: () => RadioBlock,
  RangeBlock: () => RangeBlock,
  ScriptBlock: () => ScriptBlock,
  SectionNodeDefinition: () => SectionNodeDefinition,
  SelectBlock: () => SelectBlock,
  SelectableBoxQuestionBlock: () => SelectableBoxQuestionBlock,
  StandardBlocks: () => StandardBlocks,
  StandardNodes: () => StandardNodes,
  SurveyBuilder: () => SurveyBuilder,
  SurveyBuilderProvider: () => SurveyBuilderProvider,
  TextInputBlock: () => TextInputBlock,
  TextareaBlock: () => TextareaBlock,
  cloneNode: () => cloneNode,
  ensureNodeUuids: () => ensureNodeUuids,
  findNodeById: () => findNodeById,
  getAllNodes: () => getAllNodes,
  getAllParentNodes: () => getAllParentNodes,
  getLeafNodePaths: () => getLeafNodePaths,
  getParentNode: () => getParentNode,
  linkNodes: () => linkNodes,
  useSurveyBuilder: () => useSurveyBuilder
});
module.exports = __toCommonJS(index_exports);

// src/survey/SurveyBuilder.tsx
var import_react9 = __toESM(require("react"));

// src/components/ui/button.tsx
var React2 = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/button.tsx
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ React2.createElement(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/tabs.tsx
var React3 = __toESM(require("react"));
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"));
var Tabs = TabsPrimitive.Root;
var TabsList = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React3.createElement(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React3.createElement(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React3.createElement(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// src/components/ui/sheet.tsx
var React4 = __toESM(require("react"));
var SheetPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_class_variance_authority2 = require("class-variance-authority");
var import_lucide_react = require("lucide-react");
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React4.createElement(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = (0, import_class_variance_authority2.cva)(
  "fixed overflow-y-scroll z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React4.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ React4.createElement(SheetPortal, null, /* @__PURE__ */ React4.createElement(SheetOverlay, null), /* @__PURE__ */ React4.createElement(
  SheetPrimitive.Content,
  {
    ref,
    className: cn(sheetVariants({ side }), className),
    ...props
  },
  /* @__PURE__ */ React4.createElement(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, /* @__PURE__ */ React4.createElement(import_lucide_react.X, { className: "h-4 w-4" }), /* @__PURE__ */ React4.createElement("span", { className: "sr-only" }, "Close")),
  children
)));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ React4.createElement(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ React4.createElement(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React4.createElement(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React4.createElement(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/components/ui/alert.tsx
var React5 = __toESM(require("react"));
var import_class_variance_authority3 = require("class-variance-authority");
var alertVariants = (0, import_class_variance_authority3.cva)(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Alert = React5.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ React5.createElement(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
var AlertTitle = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5.createElement(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React5.createElement(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

// src/context/SurveyBuilderContext.tsx
var import_react = require("react");
var import_uuid = require("uuid");
var defaultTheme = {
  name: "default",
  containerLayout: "max-w-2xl mx-auto py-4 px-4 sm:px-6",
  header: "mb-8",
  title: "text-3xl font-bold text-gray-900 mb-4 text-center",
  description: "text-lg text-gray-600 mb-8 text-center",
  background: "bg-gray-50",
  card: "bg-white shadow-sm rounded-lg p-6 mb-6",
  container: {
    card: "bg-white border border-gray-200 rounded-lg",
    border: "border-gray-200",
    activeBorder: "border-blue-500",
    activeBg: "bg-blue-50",
    header: "bg-gray-50"
  },
  field: {
    label: "block text-sm font-medium text-gray-700 mb-2",
    input: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    description: "mt-1 text-sm text-gray-500",
    error: "mt-1 text-sm text-red-600",
    radio: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300",
    checkbox: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded",
    select: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    textarea: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    file: "w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50",
    matrix: "border-collapse w-full text-sm",
    range: "accent-blue-600",
    text: "text-gray-900",
    activeText: "text-blue-600",
    placeholder: "text-gray-400",
    boxBorder: "border-gray-300"
  },
  progress: {
    bar: "h-2 bg-[#3B82F6] rounded-full overflow-hidden",
    dots: "flex space-x-2 justify-center",
    numbers: "flex space-x-2 justify-center",
    percentage: "text-right text-sm text-gray-600 mb-1",
    label: "text-sm text-gray-600 mb-1"
  },
  button: {
    primary: "inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    secondary: "inline-flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    text: "text-sm font-medium text-blue-600 hover:text-blue-500",
    navigation: "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  },
  colors: {
    primary: "#3B82F6",
    secondary: "#6B7280",
    accent: "#1D4ED8",
    background: "#FFFFFF",
    text: "#111827",
    border: "#D1D5DB",
    error: "#EF4444",
    success: "#10B981"
  }
};
var useSurveyBuilder = () => {
  const context = (0, import_react.useContext)(SurveyBuilderContext);
  if (context === void 0) {
    throw new Error("useSurveyBuilder must be used within a SurveyBuilderProvider");
  }
  return context;
};
var initialState = {
  rootNode: null,
  definitions: {
    blocks: {},
    nodes: {}
  },
  localizations: {
    en: {}
  },
  theme: defaultTheme,
  selectedNode: null,
  displayMode: "list"
};
var ActionTypes = {
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
  UPDATE_THEME: "UPDATE_THEME",
  IMPORT_SURVEY: "IMPORT_SURVEY"
};
var surveyBuilderReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INIT_SURVEY:
      return {
        ...state,
        rootNode: action.payload.rootNode || null,
        localizations: action.payload.localizations || { en: {} },
        theme: action.payload.theme || defaultTheme
      };
    case ActionTypes.SET_ROOT_NODE:
      return {
        ...state,
        rootNode: action.payload
      };
    case ActionTypes.ADD_NODE: {
      if (!state.rootNode) return state;
      const { parentUuid, nodeData } = action.payload;
      const newNode = { ...nodeData, uuid: nodeData.uuid || (0, import_uuid.v4)() };
      const addNodeToParent = (node) => {
        if (node.uuid === parentUuid) {
          return {
            ...node,
            nodes: [...node.nodes || [], newNode]
          };
        }
        if (node.items) {
          const updatedItems = node.items.map((item) => {
            if (typeof item === "object" && item.uuid) {
              return addNodeToParent(item);
            }
            return item;
          });
          if (updatedItems !== node.items) {
            return { ...node, items: updatedItems };
          }
        }
        if (node.nodes) {
          const updatedNodes = node.nodes.map((childNode) => {
            if (typeof childNode === "string") return childNode;
            return addNodeToParent(childNode);
          });
          if (updatedNodes !== node.nodes) {
            return { ...node, nodes: updatedNodes };
          }
        }
        return node;
      };
      return {
        ...state,
        rootNode: addNodeToParent(state.rootNode)
      };
    }
    case ActionTypes.UPDATE_NODE: {
      if (!state.rootNode) return state;
      const { uuid, nodeData } = action.payload;
      const updateNode = (node) => {
        if (node.uuid === uuid) {
          return { ...node, ...nodeData, uuid };
        }
        let updated = false;
        let updatedNode = { ...node };
        if (node.items) {
          const updatedItems = node.items.map((item) => {
            if (typeof item === "object" && item.uuid) {
              const updatedItem = updateNode(item);
              if (updatedItem !== item) {
                updated = true;
              }
              return updatedItem;
            }
            return item;
          });
          if (updated) {
            updatedNode.items = updatedItems;
          }
        }
        if (!updated && node.nodes) {
          const updatedNodes = node.nodes.map((childNode) => {
            if (typeof childNode === "string") return childNode;
            const updatedChildNode = updateNode(childNode);
            if (updatedChildNode !== childNode) {
              updated = true;
            }
            return updatedChildNode;
          });
          if (updated) {
            updatedNode.nodes = updatedNodes;
          }
        }
        return updated ? updatedNode : node;
      };
      return {
        ...state,
        rootNode: updateNode(state.rootNode)
      };
    }
    case ActionTypes.REMOVE_NODE: {
      if (!state.rootNode) return state;
      const uuid = action.payload;
      const removeNode = (node) => {
        if (node.uuid === uuid) {
          return null;
        }
        let updatedNode = { ...node };
        let hasChanges = false;
        if (node.items) {
          const updatedItems = node.items.map((item) => {
            if (typeof item === "object" && item.uuid === uuid) {
              hasChanges = true;
              return null;
            }
            if (typeof item === "object" && item.uuid) {
              const result = removeNode(item);
              if (result !== item) {
                hasChanges = true;
              }
              return result;
            }
            return item;
          }).filter(Boolean);
          if (hasChanges) {
            updatedNode.items = updatedItems;
          }
        }
        if (node.nodes) {
          const updatedNodes = node.nodes.map((childNode) => {
            if (typeof childNode === "string") {
              if (childNode === uuid) {
                hasChanges = true;
                return null;
              }
              return childNode;
            }
            const result = removeNode(childNode);
            if (result !== childNode) {
              hasChanges = true;
            }
            return result;
          }).filter(Boolean);
          if (hasChanges) {
            updatedNode.nodes = updatedNodes;
          }
        }
        return hasChanges ? updatedNode : node;
      };
      return {
        ...state,
        rootNode: removeNode(state.rootNode)
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
            [type]: definition
          }
        }
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
            [type]: definition
          }
        }
      };
    }
    case ActionTypes.SET_SELECTED_NODE:
      return {
        ...state,
        selectedNode: action.payload
      };
    case ActionTypes.SET_DISPLAY_MODE:
      return {
        ...state,
        displayMode: action.payload
      };
    case ActionTypes.UPDATE_LOCALIZATIONS:
      return {
        ...state,
        localizations: action.payload
      };
    case ActionTypes.UPDATE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case ActionTypes.IMPORT_SURVEY:
      return {
        ...state,
        rootNode: action.payload.rootNode || null,
        localizations: action.payload.localizations || { en: {} },
        theme: action.payload.theme || defaultTheme
      };
    default:
      return state;
  }
};
var SurveyBuilderContext = (0, import_react.createContext)(
  void 0
);
var SurveyBuilderProvider = ({
  children,
  initialData
}) => {
  const [state, dispatch] = (0, import_react.useReducer)(
    surveyBuilderReducer,
    {
      ...initialState,
      rootNode: (initialData == null ? void 0 : initialData.rootNode) || null,
      localizations: (initialData == null ? void 0 : initialData.localizations) || { en: {} },
      theme: (initialData == null ? void 0 : initialData.theme) || defaultTheme
    }
  );
  const addBlockDefinition = (type, definition) => {
    dispatch({
      type: ActionTypes.ADD_BLOCK_DEFINITION,
      payload: { type, definition }
    });
  };
  const addNodeDefinition = (type, definition) => {
    dispatch({
      type: ActionTypes.ADD_NODE_DEFINITION,
      payload: { type, definition }
    });
  };
  const createId = () => (0, import_uuid.v4)();
  const initSurvey = () => {
    const data = {
      rootNode: {
        type: "section",
        name: "New Form",
        uuid: createId(),
        items: [],
        navigationLogic: "return 0;",
        entryLogic: "",
        exitLogic: "",
        backLogic: ""
      },
      localizations: {
        en: {}
      },
      theme: defaultTheme
    };
    dispatch({
      type: ActionTypes.INIT_SURVEY,
      payload: data
    });
  };
  const createNode = (parentUuid, type, initialData2 = {}) => {
    const nodeDefinition = state.definitions.nodes[type];
    if (!nodeDefinition) return;
    console.log(nodeDefinition);
    const nodeData = {
      ...nodeDefinition.defaultData,
      ...initialData2,
      type
    };
    dispatch({
      type: ActionTypes.ADD_NODE,
      payload: { parentUuid, nodeData }
    });
  };
  const updateNode = (uuid, data) => {
    dispatch({
      type: ActionTypes.UPDATE_NODE,
      payload: { uuid, nodeData: data }
    });
  };
  const removeNode = (uuid) => {
    dispatch({
      type: ActionTypes.REMOVE_NODE,
      payload: uuid
    });
  };
  const setSelectedNode = (uuid) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_NODE,
      payload: uuid
    });
  };
  const setDisplayMode = (mode) => {
    dispatch({
      type: ActionTypes.SET_DISPLAY_MODE,
      payload: mode
    });
  };
  const updateLocalizations = (localizations) => {
    dispatch({
      type: ActionTypes.UPDATE_LOCALIZATIONS,
      payload: localizations
    });
  };
  const updateTheme = (theme) => {
    dispatch({
      type: ActionTypes.UPDATE_THEME,
      payload: theme
    });
  };
  const importSurvey = (data) => {
    dispatch({
      type: ActionTypes.IMPORT_SURVEY,
      payload: data
    });
  };
  const exportSurvey = () => {
    return {
      rootNode: state.rootNode,
      localizations: state.localizations,
      theme: state.theme
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
    updateTheme,
    importSurvey,
    exportSurvey
  };
  return /* @__PURE__ */ React.createElement(SurveyBuilderContext.Provider, { value }, children);
};

// src/survey/SurveyNode.tsx
var SurveyNode = ({ data }) => {
  const { state, updateNode, removeNode } = useSurveyBuilder();
  const getNodeComponent = () => {
    const nodeDefinition = state.definitions.nodes[data.type];
    if (!nodeDefinition) {
      return /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Unknown Node Type"), /* @__PURE__ */ React.createElement(AlertDescription, null, "No definition found for node type: ", data.type));
    }
    return nodeDefinition.renderNode({
      data,
      onUpdate: (updatedData) => {
        updateNode(data.uuid, updatedData);
      },
      onRemove: () => {
        if (data.uuid) {
          removeNode(data.uuid);
        }
      }
    });
  };
  const renderChildNodes = () => {
    if (!data.nodes || data.nodes.length === 0) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "ml-8 mt-2 border-l-2 border-muted pl-4" }, data.nodes.map((nodeRef, index) => {
      if (typeof nodeRef === "string") {
        const childNode = state.rootNode ? findNodeByUuid(state.rootNode, nodeRef) : null;
        if (!childNode) {
          return /* @__PURE__ */ React.createElement(Alert, { key: nodeRef, variant: "destructive" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Missing Node"), /* @__PURE__ */ React.createElement(AlertDescription, null, "Cannot find node with reference: ", nodeRef));
        }
        return /* @__PURE__ */ React.createElement(SurveyNode, { key: nodeRef, data: childNode });
      }
      return /* @__PURE__ */ React.createElement(SurveyNode, { key: nodeRef.uuid || index, data: nodeRef });
    }));
  };
  return /* @__PURE__ */ React.createElement("div", { className: "survey-node" }, getNodeComponent(), renderChildNodes());
};
var findNodeByUuid = (rootNode, uuid) => {
  if (rootNode.uuid === uuid) return rootNode;
  if (!rootNode.nodes) return null;
  for (const childNode of rootNode.nodes) {
    if (typeof childNode === "string") {
      continue;
    }
    if (childNode.uuid === uuid) return childNode;
    const foundNode = findNodeByUuid(childNode, uuid);
    if (foundNode) return foundNode;
  }
  return null;
};

// src/survey/helpers/LocalizationEditor.tsx
var import_react2 = require("react");

// src/components/ui/input.tsx
var React6 = __toESM(require("react"));
var Input = React6.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ React6.createElement(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/ui/card.tsx
var React7 = __toESM(require("react"));
var Card = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// src/components/ui/label.tsx
var React8 = __toESM(require("react"));
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_class_variance_authority4 = require("class-variance-authority");
var labelVariants = (0, import_class_variance_authority4.cva)(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React8.createElement(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

// src/survey/helpers/LocalizationEditor.tsx
var import_lucide_react2 = require("lucide-react");
var LocalizationEditor = () => {
  const { state, updateLocalizations } = useSurveyBuilder();
  const [newLanguageCode, setNewLanguageCode] = (0, import_react2.useState)("");
  const [labels, setLabels] = (0, import_react2.useState)([]);
  const [localizations, setLocalizations] = (0, import_react2.useState)({});
  const [copySuccess, setCopySuccess] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    setLocalizations(state.localizations);
  }, [state.localizations]);
  (0, import_react2.useEffect)(() => {
    if (!state.rootNode) return;
    const extractedLabels = extractLabelsFromSurvey(state.rootNode);
    setLabels(extractedLabels);
    updateEnglishLabels(extractedLabels);
  }, [state.rootNode]);
  const updateEnglishLabels = (extractedLabels) => {
    const englishLabels = { ...localizations.en || {} };
    let updated = false;
    for (const label of extractedLabels) {
      if (!englishLabels[label]) {
        englishLabels[label] = label;
        updated = true;
      }
    }
    if (updated) {
      const updatedLocalizations = {
        ...localizations,
        en: englishLabels
      };
      setLocalizations(updatedLocalizations);
      updateLocalizations(updatedLocalizations);
    }
  };
  const handleAddLanguage = () => {
    if (!newLanguageCode || newLanguageCode.trim() === "") return;
    if (localizations[newLanguageCode]) return;
    const newLang = {};
    labels.forEach((label) => {
      newLang[label] = "";
    });
    const updatedLocalizations = {
      ...localizations,
      [newLanguageCode]: newLang
    };
    setLocalizations(updatedLocalizations);
    updateLocalizations(updatedLocalizations);
    setNewLanguageCode("");
  };
  const handleRemoveLanguage = (langCode) => {
    if (langCode === "en") return;
    const { [langCode]: _, ...rest } = localizations;
    setLocalizations(rest);
    updateLocalizations(rest);
  };
  const handleUpdateTranslation = (langCode, label, value) => {
    const updatedLang = {
      ...localizations[langCode],
      [label]: value
    };
    const updatedLocalizations = {
      ...localizations,
      [langCode]: updatedLang
    };
    setLocalizations(updatedLocalizations);
    updateLocalizations(updatedLocalizations);
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(localizations, null, 2));
    setCopySuccess("Copied to clipboard!");
    setTimeout(() => setCopySuccess(null), 3e3);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-semibold" }, "Localizations"), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      onClick: handleCopyToClipboard,
      className: "flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement(import_lucide_react2.ClipboardCopy, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Copy JSON")
  )), copySuccess && /* @__PURE__ */ React.createElement(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800" }, /* @__PURE__ */ React.createElement(AlertDescription, null, copySuccess)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 items-end" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2 flex-grow" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "new-language" }, "Add Language"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "new-language",
      placeholder: "Language code (e.g., fr, es-ES)",
      value: newLanguageCode,
      onChange: (e) => setNewLanguageCode(e.target.value)
    }
  )), /* @__PURE__ */ React.createElement(Button, { type: "button", onClick: handleAddLanguage }, "Add")), labels.length === 0 && /* @__PURE__ */ React.createElement(Alert, null, /* @__PURE__ */ React.createElement(AlertDescription, null, "No text labels found in the survey. Add content with text to enable localization.")), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, Object.keys(localizations).map((langCode) => /* @__PURE__ */ React.createElement(Card, { key: langCode }, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between pb-2" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-lg" }, langCode === "en" ? "English (Default)" : langCode), langCode !== "en" && /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => handleRemoveLanguage(langCode)
    },
    "Remove"
  )), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, labels.map((label) => /* @__PURE__ */ React.createElement("div", { key: label, className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement(Label, { className: "mb-2" }, langCode === "en" ? "Original Text" : "English"), /* @__PURE__ */ React.createElement("div", { className: "p-2 bg-muted rounded-md text-sm" }, langCode === "en" ? label : localizations.en[label] || label)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement(Label, { className: "mb-2" }, langCode === "en" ? "English" : `${langCode} Translation`), /* @__PURE__ */ React.createElement(
    Input,
    {
      value: localizations[langCode][label] || "",
      onChange: (e) => handleUpdateTranslation(langCode, label, e.target.value),
      disabled: langCode === "en"
    }
  ))))))))));
};
var extractLabelsFromSurvey = (node) => {
  const labels = /* @__PURE__ */ new Set();
  const processNode = (currentNode) => {
    if (!currentNode) return;
    if (currentNode.name) labels.add(currentNode.name);
    if (currentNode.label) labels.add(currentNode.label);
    if (currentNode.description) labels.add(currentNode.description);
    if (currentNode.text) labels.add(currentNode.text);
    if (currentNode.html) labels.add(currentNode.html);
    if (currentNode.placeholder) labels.add(currentNode.placeholder);
    if (currentNode.options && Array.isArray(currentNode.options)) {
      for (const option of currentNode.options) {
        if (option.label) labels.add(option.label);
        if (option.text) labels.add(option.text);
      }
    }
    if (currentNode.labels && Array.isArray(currentNode.labels)) {
      for (const label of currentNode.labels) {
        if (typeof label === "string") labels.add(label);
      }
    }
    if (currentNode.items && Array.isArray(currentNode.items)) {
      for (const item of currentNode.items) {
        if (item && typeof item === "object") {
          processNode(item);
        }
      }
    }
    if (currentNode.nodes && Array.isArray(currentNode.nodes)) {
      for (const childNode of currentNode.nodes) {
        if (typeof childNode !== "string" && childNode) {
          processNode(childNode);
        }
      }
    }
  };
  processNode(node);
  const labelsArray = Array.from(labels);
  return labelsArray;
};

// src/survey/panels/BlockLibrary.tsx
var BlockLibrary = () => {
  const { state } = useSurveyBuilder();
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-medium mb-2" }, "Available Block Types"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground mb-4" }, "These are the content blocks that can be added to survey pages."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, Object.entries(state.definitions.blocks).map(([type, definition]) => /* @__PURE__ */ React.createElement(
    Card,
    {
      key: type,
      draggable: true,
      onDragStart: (e) => {
        e.dataTransfer.setData("application/x-block-type", type);
      },
      className: "hover:bg-accent/10 cursor-pointer transition-colors"
    },
    /* @__PURE__ */ React.createElement(CardHeader, { className: "p-3" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm flex items-center gap-2" }, definition.icon && /* @__PURE__ */ React.createElement("span", null, definition.icon), definition.name), /* @__PURE__ */ React.createElement(CardDescription, { className: "text-xs" }, definition.description)),
    /* @__PURE__ */ React.createElement(CardContent, { className: "p-3 pt-0" }, /* @__PURE__ */ React.createElement("div", { className: "border rounded-md p-2 bg-muted/50" }, definition.renderPreview()))
  )), Object.keys(state.definitions.blocks).length === 0 && /* @__PURE__ */ React.createElement("div", { className: "col-span-1 sm:col-span-2 p-4 bg-muted rounded-md text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No block definitions available. Add block definitions to get started.")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-medium mb-2" }, "Available Node Types"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground mb-4" }, "These are the node types that can be added to the survey structure."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, Object.entries(state.definitions.nodes).map(([type, definition]) => /* @__PURE__ */ React.createElement(Card, { key: type, className: "hover:bg-accent/10 cursor-pointer transition-colors" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "p-3" }, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-sm flex items-center gap-2" }, definition.icon && /* @__PURE__ */ React.createElement("span", null, definition.icon), definition.name), /* @__PURE__ */ React.createElement(CardDescription, { className: "text-xs" }, definition.description)))), Object.keys(state.definitions.nodes).length === 0 && /* @__PURE__ */ React.createElement("div", { className: "col-span-1 sm:col-span-2 p-4 bg-muted rounded-md text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, "No node definitions available. Add node definitions to get started.")))));
};

// src/survey/helpers/JsonEditor.tsx
var import_react3 = require("react");

// src/components/ui/textarea.tsx
var React9 = __toESM(require("react"));
var Textarea = React9.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React9.createElement(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

// src/utils/nodeUtils.ts
var import_uuid2 = require("uuid");
var findNodeById = (rootNode, uuid) => {
  if (!rootNode) return null;
  if (rootNode.uuid === uuid) return rootNode;
  if (!rootNode.nodes || rootNode.nodes.length === 0) return null;
  for (const childNode of rootNode.nodes) {
    if (typeof childNode === "string") continue;
    const foundNode = findNodeById(childNode, uuid);
    if (foundNode) return foundNode;
  }
  return null;
};
var getAllNodes = (rootNode) => {
  if (!rootNode) return [];
  const nodes = [rootNode];
  if (rootNode.nodes && rootNode.nodes.length > 0) {
    for (const childNode of rootNode.nodes) {
      if (typeof childNode === "string") continue;
      nodes.push(...getAllNodes(childNode));
    }
  }
  return nodes;
};
var getParentNode = (rootNode, uuid) => {
  if (!rootNode || !rootNode.nodes || rootNode.nodes.length === 0) return null;
  for (const childNode of rootNode.nodes) {
    if (typeof childNode === "string") {
      if (childNode === uuid) return rootNode;
      continue;
    }
    if (childNode.uuid === uuid) return rootNode;
    const parent = getParentNode(childNode, uuid);
    if (parent) return parent;
  }
  return null;
};
var getAllParentNodes = (rootNode, uuid) => {
  if (!rootNode) return [];
  const parent = getParentNode(rootNode, uuid);
  if (!parent) return [];
  if (parent === rootNode) return [parent];
  return [...getAllParentNodes(rootNode, parent.uuid), parent];
};
var ensureNodeUuids = (node) => {
  const nodeWithUuid = {
    ...node,
    uuid: node.uuid || (0, import_uuid2.v4)()
  };
  if (nodeWithUuid.nodes && nodeWithUuid.nodes.length > 0) {
    nodeWithUuid.nodes = nodeWithUuid.nodes.map((childNode) => {
      if (typeof childNode === "string") return childNode;
      return ensureNodeUuids(childNode);
    });
  }
  return nodeWithUuid;
};
var getLeafNodePaths = (rootNode) => {
  if (!rootNode) return [];
  if (!rootNode.nodes || rootNode.nodes.length === 0) {
    return [[rootNode]];
  }
  const paths = [];
  for (const childNode of rootNode.nodes) {
    if (typeof childNode === "string") continue;
    const childPaths = getLeafNodePaths(childNode);
    childPaths.forEach((path) => {
      paths.push([rootNode, ...path]);
    });
  }
  return paths.length > 0 ? paths : [[rootNode]];
};
var cloneNode = (node) => {
  const clonedNode = { ...node, uuid: (0, import_uuid2.v4)() };
  if (clonedNode.nodes && clonedNode.nodes.length > 0) {
    clonedNode.nodes = clonedNode.nodes.map((childNode) => {
      if (typeof childNode === "string") return childNode;
      return cloneNode(childNode);
    });
  }
  return clonedNode;
};
var linkNodes = (sourceNode, targetNode) => {
  const uuid = typeof targetNode === "string" ? targetNode : targetNode.uuid;
  if (!uuid) return sourceNode;
  return {
    ...sourceNode,
    nodes: [...sourceNode.nodes || [], uuid]
  };
};

// src/survey/helpers/JsonEditor.tsx
var JsonEditor = () => {
  const { state, importSurvey, exportSurvey } = useSurveyBuilder();
  const [exportJson, setExportJson] = (0, import_react3.useState)("");
  const [importJson, setImportJson] = (0, import_react3.useState)("");
  const [error, setError] = (0, import_react3.useState)(null);
  const [success, setSuccess] = (0, import_react3.useState)(null);
  const handleExport = () => {
    const data = exportSurvey();
    setExportJson(JSON.stringify(data, null, 2));
    setError(null);
    setSuccess("Survey exported successfully!");
    setTimeout(() => {
      setSuccess(null);
    }, 3e3);
  };
  const handleImport = () => {
    try {
      setError(null);
      setSuccess(null);
      if (!importJson.trim()) {
        setError("Please enter JSON data to import");
        return;
      }
      const data = JSON.parse(importJson);
      if (!data.rootNode || typeof data.rootNode !== "object") {
        setError("Invalid survey data: rootNode is required and must be an object");
        return;
      }
      const rootNodeWithUuids = ensureNodeUuids(data.rootNode);
      importSurvey({
        rootNode: rootNodeWithUuids,
        localizations: data.localizations || { en: {} }
      });
      setSuccess("Survey imported successfully!");
      setTimeout(() => {
        setSuccess(null);
      }, 3e3);
    } catch (err) {
      setError(`Error importing survey: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(Tabs, { defaultValue: "import" }, /* @__PURE__ */ React.createElement(TabsList, null, /* @__PURE__ */ React.createElement(TabsTrigger, { value: "import" }, "Import"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "export" }, "Export")), /* @__PURE__ */ React.createElement(TabsContent, { value: "import" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-medium mb-2" }, "Import Survey"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, "Paste a valid JSON survey definition below to import it."), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      value: importJson,
      onChange: (e) => setImportJson(e.target.value),
      placeholder: '{\n  "rootNode": { "type": "section", ... },\n  "localizations": { "en": { ... } }\n}',
      rows: 12,
      className: "font-mono text-sm"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ React.createElement(Button, { type: "button", onClick: handleImport }, "Import")), error && /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Error"), /* @__PURE__ */ React.createElement(AlertDescription, null, error)), success && /* @__PURE__ */ React.createElement(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Success"), /* @__PURE__ */ React.createElement(AlertDescription, null, success)))), /* @__PURE__ */ React.createElement(TabsContent, { value: "export" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-medium mb-2" }, "Export Survey"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, "Export the current survey definition as JSON."), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      value: exportJson,
      rows: 12,
      className: "font-mono text-sm",
      readOnly: true
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2" }, /* @__PURE__ */ React.createElement(Button, { type: "button", onClick: handleExport }, "Refresh"), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      onClick: () => {
        navigator.clipboard.writeText(exportJson);
        setSuccess("Copied to clipboard!");
        setTimeout(() => setSuccess(null), 3e3);
      },
      disabled: !exportJson
    },
    "Copy to Clipboard"
  )), success && /* @__PURE__ */ React.createElement(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Success"), /* @__PURE__ */ React.createElement(AlertDescription, null, success))))));
};

// src/survey/SurveryGraph.tsx
var import_react5 = __toESM(require("react"));
var import_lucide_react6 = require("lucide-react");

// src/components/common/NavigationRulesEditorDialog.tsx
var import_react4 = __toESM(require("react"));

// src/components/ui/checkbox.tsx
var React10 = __toESM(require("react"));
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_lucide_react3 = require("lucide-react");
var Checkbox = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React10.createElement(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React10.createElement(
    CheckboxPrimitive.Indicator,
    {
      className: cn("flex items-center justify-center text-current")
    },
    /* @__PURE__ */ React10.createElement(import_lucide_react3.Check, { className: "h-4 w-4" })
  )
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/ui/dialog.tsx
var React11 = __toESM(require("react"));
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_lucide_react4 = require("lucide-react");
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React11.createElement(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React11.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React11.createElement(DialogPortal, null, /* @__PURE__ */ React11.createElement(DialogOverlay, null), /* @__PURE__ */ React11.createElement(
  DialogPrimitive.Content,
  {
    ref,
    className: cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
      className
    ),
    ...props
  },
  children,
  /* @__PURE__ */ React11.createElement(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" }, /* @__PURE__ */ React11.createElement(import_lucide_react4.X, { className: "h-4 w-4" }), /* @__PURE__ */ React11.createElement("span", { className: "sr-only" }, "Close"))
)));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ React11.createElement(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ React11.createElement(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React11.createElement(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React11.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React11.createElement(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/ui/badge.tsx
var React12 = __toESM(require("react"));
var import_class_variance_authority5 = require("class-variance-authority");
var badgeVariants = (0, import_class_variance_authority5.cva)(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ React12.createElement("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/select.tsx
var React13 = __toESM(require("react"));
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_lucide_react5 = require("lucide-react");
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React13.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props
  },
  children,
  /* @__PURE__ */ React13.createElement(SelectPrimitive.Icon, { asChild: true }, /* @__PURE__ */ React13.createElement(import_lucide_react5.ChevronDown, { className: "h-4 w-4 opacity-50" }))
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React13.createElement(import_lucide_react5.ChevronUp, { className: "h-4 w-4" })
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React13.createElement(import_lucide_react5.ChevronDown, { className: "h-4 w-4" })
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React13.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ React13.createElement(SelectPrimitive.Portal, null, /* @__PURE__ */ React13.createElement(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props
  },
  /* @__PURE__ */ React13.createElement(SelectScrollUpButton, null),
  /* @__PURE__ */ React13.createElement(
    SelectPrimitive.Viewport,
    {
      className: cn(
        "p-1",
        position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
      )
    },
    children
  ),
  /* @__PURE__ */ React13.createElement(SelectScrollDownButton, null)
)));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React13.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React13.createElement("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React13.createElement(SelectPrimitive.ItemIndicator, null, /* @__PURE__ */ React13.createElement(import_lucide_react5.Check, { className: "h-4 w-4" }))),
  /* @__PURE__ */ React13.createElement(SelectPrimitive.ItemText, null, children)
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/common/NavigationRulesEditorDialog.tsx
function parseRule(rule) {
  const match = rule.condition.match(
    /^(\w+)\s*(==|!=|>=|<=|>|<|contains|startsWith|endsWith)\s*(.+)$/
  );
  if (match) {
    const [, field, operator, value] = match;
    return {
      field,
      operator,
      value: value.replace(/^['"]|['"]$/g, ""),
      target: String(rule.target),
      isPage: rule.isPage,
      isDefault: rule.isDefault
    };
  }
  return {
    field: "",
    operator: "==",
    value: "",
    target: String(rule.target),
    isPage: rule.isPage,
    isDefault: rule.isDefault
  };
}
function buildRule(state) {
  if (state.isDefault) {
    return {
      condition: "true",
      target: state.target,
      isPage: state.isPage,
      isDefault: true
    };
  }
  return {
    condition: `${state.field} ${state.operator} ${JSON.stringify(state.value)}`,
    target: state.target,
    isPage: state.isPage,
    isDefault: state.isDefault
  };
}
var NavigationRulesEditorDialog = ({
  data,
  onUpdate,
  nodeId,
  nodeName,
  navigationRules = [],
  availableFields = [],
  availableTargets = { pages: [], blocks: [] },
  onSave,
  onClose
}) => {
  const { state } = useSurveyBuilder();
  const collectFieldNames = import_react4.default.useCallback((node) => {
    if (!node) return [];
    let names = [];
    if (node.fieldName) names.push(node.fieldName);
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        names = names.concat(collectFieldNames(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          names = names.concat(collectFieldNames(n));
        }
      }
    }
    return names;
  }, []);
  const collectPages = import_react4.default.useCallback((node) => {
    if (!node) return [];
    let pages = [];
    if (node.type === "set") {
      pages.push({ uuid: node.uuid || "", name: node.name || node.uuid || "Page" });
    }
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        pages = pages.concat(collectPages(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          pages = pages.concat(collectPages(n));
        }
      }
    }
    return pages;
  }, []);
  const collectBlocks = import_react4.default.useCallback((node) => {
    if (!node) return [];
    let blocks = [];
    if (node.type !== "set") {
      blocks.push({
        uuid: node.uuid || "",
        name: node.name || node.fieldName || node.uuid || "Block"
      });
    }
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        blocks = blocks.concat(collectBlocks(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          blocks = blocks.concat(collectBlocks(n));
        }
      }
    }
    return blocks;
  }, []);
  const fieldOptions = import_react4.default.useMemo(() => collectFieldNames(state.rootNode), [state.rootNode]);
  const pageOptions = import_react4.default.useMemo(() => collectPages(state.rootNode), [state.rootNode]);
  const blockOptions = import_react4.default.useMemo(() => collectBlocks(state.rootNode), [state.rootNode]);
  const [rules, setRules] = import_react4.default.useState(() => {
    return (navigationRules || []).map(parseRule);
  });
  const update = (rules2) => {
    onSave == null ? void 0 : onSave(rules2);
    onClose();
  };
  import_react4.default.useEffect(() => {
    const converted = rules.map(buildRule);
    onSave == null ? void 0 : onSave(converted);
  }, [rules]);
  const handleRuleChange = (index, field, value) => {
    setRules((prev) => {
      const newRules = [...prev];
      newRules[index] = { ...newRules[index], [field]: value };
      return newRules;
    });
  };
  const handleTargetChange = (index, val) => {
    if (val === "submit") {
      setRules((prev) => {
        const newRules = [...prev];
        newRules[index] = { ...newRules[index], target: "submit", isPage: false };
        return newRules;
      });
      return;
    }
    const [kind, uuid] = val.split(":");
    setRules((prev) => {
      const newRules = [...prev];
      newRules[index] = { ...newRules[index], target: uuid, isPage: kind === "page" };
      return newRules;
    });
  };
  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { field: "", operator: "==", value: "", target: "", isPage: true }
    ]);
  };
  const removeRule = (index) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ import_react4.default.createElement(Dialog, { open: true, onOpenChange: onClose }, /* @__PURE__ */ import_react4.default.createElement(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-scroll" }, /* @__PURE__ */ import_react4.default.createElement(DialogHeader, null, /* @__PURE__ */ import_react4.default.createElement(DialogTitle, null, "Edit Navigation Rules ", /* @__PURE__ */ import_react4.default.createElement(Badge, { variant: "outline" }, nodeName))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-4 mt-4" }, /* @__PURE__ */ import_react4.default.createElement(Label, null, "Navigation Rules"), rules.map((rule, idx) => /* @__PURE__ */ import_react4.default.createElement("div", { key: idx, className: "border rounded-md p-3 space-y-2" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-4 gap-2" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react4.default.createElement(Label, null, "Variable"), /* @__PURE__ */ import_react4.default.createElement(
    Select,
    {
      value: rule.field,
      onValueChange: (val) => handleRuleChange(idx, "field", val)
    },
    /* @__PURE__ */ import_react4.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(SelectValue, { placeholder: "Select field" })),
    /* @__PURE__ */ import_react4.default.createElement(SelectContent, null, fieldOptions.map((name) => /* @__PURE__ */ import_react4.default.createElement(SelectItem, { key: name, value: name }, name)))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react4.default.createElement(Label, null, "Operator"), /* @__PURE__ */ import_react4.default.createElement(
    Select,
    {
      value: rule.operator,
      onValueChange: (val) => handleRuleChange(idx, "operator", val)
    },
    /* @__PURE__ */ import_react4.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(SelectValue, { placeholder: "Operator" })),
    /* @__PURE__ */ import_react4.default.createElement(SelectContent, null, [
      "==",
      "!=",
      ">",
      ">=",
      "<",
      "<=",
      "contains"
    ].map((op) => /* @__PURE__ */ import_react4.default.createElement(SelectItem, { key: op, value: op }, op)))
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react4.default.createElement(Label, null, "Value"), /* @__PURE__ */ import_react4.default.createElement(
    Input,
    {
      value: rule.value,
      onChange: (e) => handleRuleChange(idx, "value", e.target.value)
    }
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react4.default.createElement(Label, null, "Target"), /* @__PURE__ */ import_react4.default.createElement(
    Select,
    {
      value: rule.target === "submit" ? "submit" : rule.isPage ? `page:${rule.target}` : `block:${rule.target}`,
      onValueChange: (val) => handleTargetChange(idx, val)
    },
    /* @__PURE__ */ import_react4.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react4.default.createElement(SelectValue, { placeholder: "Choose" })),
    /* @__PURE__ */ import_react4.default.createElement(SelectContent, null, /* @__PURE__ */ import_react4.default.createElement(SelectGroup, null, /* @__PURE__ */ import_react4.default.createElement(SelectLabel, null, "Pages"), pageOptions.map((p) => /* @__PURE__ */ import_react4.default.createElement(SelectItem, { key: `page-${p.uuid}`, value: `page:${p.uuid}` }, p.name))), /* @__PURE__ */ import_react4.default.createElement(SelectGroup, null, /* @__PURE__ */ import_react4.default.createElement(SelectLabel, null, "Blocks"), blockOptions.map((b) => /* @__PURE__ */ import_react4.default.createElement(SelectItem, { key: `block-${b.uuid}`, value: `block:${b.uuid}` }, b.name))), /* @__PURE__ */ import_react4.default.createElement(SelectItem, { value: "submit" }, "Submit"))
  ))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react4.default.createElement(
    Checkbox,
    {
      id: `default-${idx}`,
      checked: rule.isDefault || false,
      onCheckedChange: (checked) => handleRuleChange(idx, "isDefault", !!checked)
    }
  ), /* @__PURE__ */ import_react4.default.createElement(Label, { htmlFor: `default-${idx}` }, "Default"), /* @__PURE__ */ import_react4.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => removeRule(idx),
      className: "ml-auto"
    },
    "Remove"
  )))), /* @__PURE__ */ import_react4.default.createElement(Button, { type: "button", variant: "outline", size: "sm", onClick: addRule }, "Add Rule")), /* @__PURE__ */ import_react4.default.createElement(DialogFooter, { className: "mt-4" }, /* @__PURE__ */ import_react4.default.createElement(Button, { type: "button", variant: "outline", onClick: onClose }, "Cancel"), /* @__PURE__ */ import_react4.default.createElement(Button, { type: "button", onClick: () => update(rules.map(buildRule)) }, "Save"))));
};

// src/survey/SurveryGraph.tsx
var SurveyGraph = ({
  rootNode,
  zoomable = true,
  height = "600px"
}) => {
  const { state, updateNode } = useSurveyBuilder();
  const svgRef = (0, import_react5.useRef)(null);
  const containerRef = (0, import_react5.useRef)(null);
  const [nodes, setNodes] = (0, import_react5.useState)([]);
  const [edges, setEdges] = (0, import_react5.useState)([]);
  const [selectedNode, setSelectedNode] = (0, import_react5.useState)(null);
  const [hoveredEdge, setHoveredEdge] = (0, import_react5.useState)(null);
  const [editingRules, setEditingRules] = (0, import_react5.useState)(null);
  const [expandedPages, setExpandedPages] = (0, import_react5.useState)(/* @__PURE__ */ new Set());
  const [zoom, setZoom] = (0, import_react5.useState)(0.8);
  const [pan, setPan] = (0, import_react5.useState)({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = (0, import_react5.useState)(false);
  const [dragNode, setDragNode] = (0, import_react5.useState)(null);
  const [dragStart, setDragStart] = (0, import_react5.useState)({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = (0, import_react5.useState)(false);
  const [panStart, setPanStart] = (0, import_react5.useState)({ x: 0, y: 0 });
  const [mousePos, setMousePos] = (0, import_react5.useState)({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = (0, import_react5.useState)("select");
  const LAYOUT_CONFIG = {
    NODE_SPACING_X: 400,
    NODE_SPACING_Y: 200,
    LEVEL_SPACING: 500,
    PAGE_CONTAINER_PADDING: 60,
    NAV_NODE_OFFSET_X: 80,
    NAV_NODE_OFFSET_Y: 100,
    NAV_NODE_SPACING: 140,
    MIN_NODE_WIDTH: 280,
    MIN_NODE_HEIGHT: 120,
    PAGE_NODE_MIN_HEIGHT: 160
  };
  const getNodeColorByType = (type, isPageNode = false, isNavigationNode = false) => {
    if (isPageNode) {
      return {
        fill: "#f8fafc",
        stroke: "#64748b",
        darkFill: "#334155",
        darkStroke: "#94a3b8"
      };
    }
    if (isNavigationNode) {
      return {
        fill: "#fef3c7",
        stroke: "#f59e0b",
        darkFill: "#78350f",
        darkStroke: "#fbbf24"
      };
    }
    const colorMap = {
      "section": { fill: "#f0f9ff", stroke: "#0ea5e9", darkFill: "#0c4a6e", darkStroke: "#38bdf8" },
      "set": { fill: "#f0fdf4", stroke: "#22c55e", darkFill: "#14532d", darkStroke: "#4ade80" },
      "selectablebox": { fill: "#fefce8", stroke: "#eab308", darkFill: "#713f12", darkStroke: "#facc15" },
      "textfield": { fill: "#faf5ff", stroke: "#a855f7", darkFill: "#581c87", darkStroke: "#c084fc" },
      "html": { fill: "#fdf2f8", stroke: "#ec4899", darkFill: "#831843", darkStroke: "#f472b6" },
      "button": { fill: "#f3e8ff", stroke: "#8b5cf6", darkFill: "#5b21b6", darkStroke: "#a78bfa" },
      "checkbox": { fill: "#ecfdf5", stroke: "#10b981", darkFill: "#064e3b", darkStroke: "#34d399" },
      "radio": { fill: "#fff7ed", stroke: "#f97316", darkFill: "#7c2d12", darkStroke: "#fb923c" },
      "textarea": { fill: "#f0f9ff", stroke: "#0ea5e9", darkFill: "#0c4a6e", darkStroke: "#38bdf8" },
      "date": { fill: "#fef2f2", stroke: "#ef4444", darkFill: "#7f1d1d", darkStroke: "#f87171" },
      "time": { fill: "#f5f3ff", stroke: "#8b5cf6", darkFill: "#5b21b6", darkStroke: "#a78bfa" },
      "number": { fill: "#fefce8", stroke: "#eab308", darkFill: "#713f12", darkStroke: "#facc15" }
    };
    return colorMap[type] || { fill: "#f8fafc", stroke: "#64748b", darkFill: "#334155", darkStroke: "#94a3b8" };
  };
  const checkNodeCollision = (x, y, width, height2, existingNodes, excludeId) => {
    const padding = 20;
    return existingNodes.some((node) => {
      if (node.id === excludeId) return false;
      return !(x + width + padding < node.x || x > node.x + node.width + padding || y + height2 + padding < node.y || y > node.y + node.height + padding);
    });
  };
  const findAvailablePosition = (preferredX, preferredY, width, height2, existingNodes, excludeId) => {
    if (!checkNodeCollision(preferredX, preferredY, width, height2, existingNodes, excludeId)) {
      return { x: preferredX, y: preferredY };
    }
    const searchRadius = 50;
    const maxAttempts = 50;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const radius = attempt * searchRadius;
      for (let angle = 0; angle < 360; angle += 45) {
        const radian = angle * Math.PI / 180;
        const x = preferredX + Math.cos(radian) * radius;
        const y = preferredY + Math.sin(radian) * radius;
        if (!checkNodeCollision(x, y, width, height2, existingNodes, excludeId)) {
          return { x, y };
        }
      }
    }
    return { x: preferredX, y: preferredY };
  };
  const togglePageExpansion = (pageId) => {
    setExpandedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageId)) {
        newSet.delete(pageId);
      } else {
        newSet.add(pageId);
      }
      return newSet;
    });
  };
  const collectFieldNames = (0, import_react5.useCallback)((node) => {
    if (!node) return [];
    let names = [];
    if (node.fieldName) names.push(node.fieldName);
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        names = names.concat(collectFieldNames(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          names = names.concat(collectFieldNames(n));
        }
      }
    }
    return names;
  }, []);
  const collectTargets = (0, import_react5.useCallback)((node) => {
    if (!node) return { pages: [], blocks: [] };
    let pages = [];
    let blocks = [];
    if (node.uuid) {
      if (node.type === "set" || node.type === "section") {
        pages.push({ uuid: node.uuid, name: node.name || node.uuid });
      } else {
        blocks.push({
          uuid: node.uuid,
          name: node.name || node.fieldName || node.uuid
        });
      }
    }
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        const subTargets = collectTargets(item);
        pages = pages.concat(subTargets.pages);
        blocks = blocks.concat(subTargets.blocks);
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          const subTargets = collectTargets(n);
          pages = pages.concat(subTargets.pages);
          blocks = blocks.concat(subTargets.blocks);
        }
      }
    }
    return { pages, blocks };
  }, []);
  const layoutNodes = (0, import_react5.useCallback)((rootNode2) => {
    const flowNodes = [];
    const flowEdges = [];
    const visited = /* @__PURE__ */ new Set();
    const nodeMap = /* @__PURE__ */ new Map();
    const levelNodes = /* @__PURE__ */ new Map();
    const collectAllNodes = (node) => {
      if (!node || !node.uuid) return;
      nodeMap.set(node.uuid, node);
      if (node.items && Array.isArray(node.items)) {
        node.items.forEach((item) => {
          if (item.uuid) {
            collectAllNodes(item);
          }
        });
      }
      if (node.nodes) {
        node.nodes.forEach((childNode) => {
          if (typeof childNode !== "string" && childNode.uuid) {
            collectAllNodes(childNode);
          }
        });
      }
    };
    collectAllNodes(rootNode2);
    const processNode = (node, x = 0, y = 0, level = 0, parentLevel = -1) => {
      if (!node.uuid || visited.has(node.uuid)) return { width: 0, height: 0 };
      visited.add(node.uuid);
      const isRootSection = node.type === "section" && level === 0;
      const isPageNode = node.type === "set";
      const itemsWithNavRules = [];
      if (node.items) {
        node.items.forEach((item) => {
          if (item.navigationRules && item.navigationRules.length > 0) {
            itemsWithNavRules.push(item);
          }
        });
      }
      let nodeWidth = LAYOUT_CONFIG.MIN_NODE_WIDTH;
      let nodeHeight = LAYOUT_CONFIG.MIN_NODE_HEIGHT;
      if (isRootSection) {
        nodeWidth = 400;
        nodeHeight = 100;
      } else if (isPageNode) {
        const itemCount = node.items ? node.items.length : 0;
        nodeHeight = Math.max(LAYOUT_CONFIG.PAGE_NODE_MIN_HEIGHT, 100 + itemCount * 25);
      }
      const preferredPosition = findAvailablePosition(x, y, nodeWidth, nodeHeight, flowNodes);
      const flowNode = {
        id: node.uuid,
        x: preferredPosition.x,
        y: preferredPosition.y,
        width: nodeWidth,
        height: nodeHeight,
        data: {
          label: node.name || "Unnamed",
          description: node.description || "",
          nodeType: node.type,
          itemType: node.type,
          originalData: node,
          hasConditionalFlow: itemsWithNavRules.length > 0,
          isPageNode: isPageNode || isRootSection,
          isNavigationNode: false,
          pageItems: node.items || [],
          parentPageId: void 0
        }
      };
      flowNodes.push(flowNode);
      if (!levelNodes.has(level)) {
        levelNodes.set(level, []);
      }
      levelNodes.get(level).push(flowNode);
      if (isPageNode && itemsWithNavRules.length > 0) {
        let navNodeX = flowNode.x + LAYOUT_CONFIG.NAV_NODE_OFFSET_X;
        let navNodeY = flowNode.y + flowNode.height + LAYOUT_CONFIG.NAV_NODE_OFFSET_Y;
        itemsWithNavRules.forEach((item, index) => {
          const navNodeId = `${item.uuid}_nav`;
          const navPosition = findAvailablePosition(
            navNodeX,
            navNodeY + index * LAYOUT_CONFIG.NAV_NODE_SPACING,
            280,
            80,
            flowNodes
          );
          const navFlowNode = {
            id: navNodeId,
            x: navPosition.x,
            y: navPosition.y,
            width: 280,
            height: 80,
            data: {
              label: item.fieldName || item.label || "Navigation Item",
              description: item.label || item.description || "",
              nodeType: item.type,
              itemType: item.type,
              originalData: item,
              hasConditionalFlow: true,
              isPageNode: false,
              isNavigationNode: true,
              parentPageId: node.uuid
            }
          };
          flowNodes.push(navFlowNode);
          flowEdges.push({
            id: `${node.uuid}-${navNodeId}`,
            source: node.uuid,
            target: navNodeId,
            isConditional: false
          });
          if (item.navigationRules) {
            item.navigationRules.forEach((rule) => {
              const edge = {
                id: `${navNodeId}-${rule.target}`,
                source: navNodeId,
                target: rule.target,
                label: rule.condition === "true" ? "default" : rule.condition,
                isConditional: rule.condition !== "true" && !rule.isDefault
              };
              flowEdges.push(edge);
            });
          }
        });
      }
      if (node.items && Array.isArray(node.items)) {
        if (isRootSection) {
          let pageX = flowNode.x + flowNode.width + LAYOUT_CONFIG.NODE_SPACING_X;
          const pageY = flowNode.y;
          node.items.forEach((item, index) => {
            if (item.type === "set" && item.uuid && !visited.has(item.uuid)) {
              const itemDimensions = processNode(item, pageX, pageY, level + 1, level);
              pageX += LAYOUT_CONFIG.NODE_SPACING_X + nodeWidth;
            }
          });
        }
      }
      if (itemsWithNavRules.length > 0) {
        const allTargets = /* @__PURE__ */ new Set();
        itemsWithNavRules.forEach((item) => {
          if (item.navigationRules) {
            item.navigationRules.forEach((rule) => {
              allTargets.add(rule.target);
            });
          }
        });
        let targetX = flowNode.x + LAYOUT_CONFIG.LEVEL_SPACING;
        let targetY = flowNode.y;
        Array.from(allTargets).forEach((targetId, index) => {
          const targetNode = nodeMap.get(targetId);
          if (targetNode && !visited.has(targetId)) {
            const childPosition = findAvailablePosition(
              targetX,
              targetY + index * LAYOUT_CONFIG.NODE_SPACING_Y,
              nodeWidth,
              nodeHeight,
              flowNodes
            );
            processNode(targetNode, childPosition.x, childPosition.y, level + 1, level);
          }
        });
      }
      return {
        width: flowNode.width,
        height: flowNode.height
      };
    };
    if (rootNode2) {
      processNode(rootNode2, 100, 100, 0);
    }
    return { nodes: flowNodes, edges: flowEdges };
  }, []);
  (0, import_react5.useEffect)(() => {
    if (!rootNode) {
      setNodes([]);
      setEdges([]);
      return;
    }
    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutNodes(rootNode);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [rootNode, layoutNodes]);
  const handleWheel = (0, import_react5.useCallback)((e) => {
    if (!zoomable) return;
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.max(0.3, Math.min(2, prev + delta)));
  }, [zoomable]);
  const handleMouseDown = (e, nodeId) => {
    var _a;
    if (!zoomable) return;
    e.preventDefault();
    if (e.button === 0) {
      if (nodeId && cursorMode === "select") {
        setSelectedNode(nodeId);
        setDragNode(nodeId);
        const rect = (_a = svgRef.current) == null ? void 0 : _a.getBoundingClientRect();
        if (rect) {
          const node = nodes.find((n) => n.id === nodeId);
          if (node) {
            const x = (e.clientX - rect.left - pan.x) / zoom;
            const y = (e.clientY - rect.top - pan.y) / zoom;
            setDragStart({ x: x - node.x, y: y - node.y });
          }
        }
      } else if (!nodeId || cursorMode === "pan") {
        setIsPanning(true);
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        setSelectedNode(null);
      }
    }
  };
  const handleMouseMove = (e) => {
    var _a;
    if (!zoomable) return;
    const rect = (_a = svgRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    setMousePos({ x, y });
    if (dragNode && cursorMode === "select") {
      setNodes((prev) => prev.map(
        (node) => node.id === dragNode ? { ...node, x: x - dragStart.x, y: y - dragStart.y } : node
      ));
    } else if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };
  const handleMouseUp = () => {
    setDragNode(null);
    setIsPanning(false);
  };
  (0, import_react5.useEffect)(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && !e.repeat) {
        e.preventDefault();
        setCursorMode("pan");
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setCursorMode("select");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const handleZoom = (delta) => {
    if (!zoomable) return;
    setZoom((prev) => Math.max(0.3, Math.min(2, prev + delta)));
  };
  const handleFitView = () => {
    var _a;
    if (!zoomable || nodes.length === 0) return;
    const padding = 100;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach((node) => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + node.width);
      maxY = Math.max(maxY, node.y + node.height);
    });
    const width = maxX - minX + padding * 2;
    const height2 = maxY - minY + padding * 2;
    const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (containerRect) {
      const scaleX = containerRect.width / width;
      const scaleY = containerRect.height / height2;
      const newZoom = Math.min(scaleX, scaleY, 1);
      setZoom(newZoom);
      setPan({
        x: (containerRect.width - width * newZoom) / 2 - minX * newZoom + padding * newZoom,
        y: (containerRect.height - height2 * newZoom) / 2 - minY * newZoom + padding * newZoom
      });
    }
  };
  const generateEdgePath = (edge) => {
    const source = nodes.find((n) => n.id === edge.source);
    const target = nodes.find((n) => n.id === edge.target);
    if (!source || !target) return "";
    const sx = source.x + source.width / 2;
    const sy = source.y + source.height;
    const tx = target.x + target.width / 2;
    const ty = target.y;
    const dx = Math.abs(tx - sx);
    const dy = Math.abs(ty - sy);
    const curveStrength = Math.min(dy * 0.5, 150);
    const cp1x = sx;
    const cp1y = sy + curveStrength;
    const cp2x = tx;
    const cp2y = ty - curveStrength;
    return `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tx} ${ty}`;
  };
  const saveNavigationRules = (0, import_react5.useCallback)((nodeId, rules) => {
    setEdges((prev) => {
      const otherEdges = prev.filter((e) => e.source !== nodeId);
      const newEdges = rules.map((rule) => ({
        id: `${nodeId}-${rule.target}`,
        source: nodeId,
        target: rule.target,
        label: rule.condition === "true" ? "default" : rule.condition,
        isConditional: rule.condition !== "true" && !rule.isDefault
      }));
      return [...otherEdges, ...newEdges];
    });
    const selectedNodeData2 = nodes.find((n) => n.id === nodeId);
    if (!(selectedNodeData2 == null ? void 0 : selectedNodeData2.data.originalData) || !updateNode) return;
    const originalData = selectedNodeData2.data.originalData;
    const updatedNodeData = {
      ...originalData,
      navigationRules: rules
    };
    try {
      updateNode(nodeId, updatedNodeData);
    } catch (error) {
      console.error("Error updating node in context:", error);
    }
    setNodes((prev) => prev.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            hasConditionalFlow: rules.length > 0,
            originalData: updatedNodeData
          }
        };
      }
      return node;
    }));
  }, [nodes, updateNode]);
  const isDarkMode = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const selectedNodeData = nodes.find((n) => n.id === selectedNode);
  const fieldNames = (0, import_react5.useMemo)(() => collectFieldNames(rootNode), [rootNode, collectFieldNames]);
  const targets = (0, import_react5.useMemo)(() => collectTargets(rootNode), [rootNode, collectTargets]);
  if (!rootNode) {
    return /* @__PURE__ */ import_react5.default.createElement(
      "div",
      {
        className: "flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md",
        style: { height }
      },
      /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "text-lg font-semibold mb-2" }, "No Survey Data"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-gray-600 dark:text-gray-400" }, "Create a survey to see the graph visualization."))
    );
  }
  return /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      className: "w-full bg-gray-50 dark:bg-gray-900 relative rounded-md",
      style: { height, overflow: "hidden" },
      ref: containerRef,
      onWheel: (e) => {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    /* @__PURE__ */ import_react5.default.createElement(
      "svg",
      {
        ref: svgRef,
        className: `w-full h-full ${cursorMode === "pan" ? "cursor-move" : "cursor-default"}`,
        onMouseDown: (e) => handleMouseDown(e),
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        onWheel: handleWheel,
        style: {
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none"
        }
      },
      /* @__PURE__ */ import_react5.default.createElement("defs", null, /* @__PURE__ */ import_react5.default.createElement(
        "marker",
        {
          id: "arrowhead",
          markerWidth: "10",
          markerHeight: "7",
          refX: "10",
          refY: "3.5",
          orient: "auto"
        },
        /* @__PURE__ */ import_react5.default.createElement(
          "polygon",
          {
            points: "0 0, 10 3.5, 0 7",
            fill: isDarkMode ? "#9ca3af" : "#6b7280"
          }
        )
      ), /* @__PURE__ */ import_react5.default.createElement(
        "marker",
        {
          id: "arrowhead-conditional",
          markerWidth: "10",
          markerHeight: "7",
          refX: "10",
          refY: "3.5",
          orient: "auto"
        },
        /* @__PURE__ */ import_react5.default.createElement(
          "polygon",
          {
            points: "0 0, 10 3.5, 0 7",
            fill: isDarkMode ? "#fb923c" : "#f97316"
          }
        )
      ), /* @__PURE__ */ import_react5.default.createElement(
        "marker",
        {
          id: "arrowhead-highlighted",
          markerWidth: "12",
          markerHeight: "9",
          refX: "12",
          refY: "4.5",
          orient: "auto"
        },
        /* @__PURE__ */ import_react5.default.createElement(
          "polygon",
          {
            points: "0 0, 12 4.5, 0 9",
            fill: isDarkMode ? "#3b82f6" : "#2563eb"
          }
        )
      ), /* @__PURE__ */ import_react5.default.createElement("filter", { id: "shadow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, /* @__PURE__ */ import_react5.default.createElement("feGaussianBlur", { in: "SourceAlpha", stdDeviation: "3" }), /* @__PURE__ */ import_react5.default.createElement("feOffset", { dx: "0", dy: "2", result: "offsetblur" }), /* @__PURE__ */ import_react5.default.createElement("feFlood", { floodColor: "#000000", floodOpacity: "0.1" }), /* @__PURE__ */ import_react5.default.createElement("feComposite", { in2: "offsetblur", operator: "in" }), /* @__PURE__ */ import_react5.default.createElement("feMerge", null, /* @__PURE__ */ import_react5.default.createElement("feMergeNode", null), /* @__PURE__ */ import_react5.default.createElement("feMergeNode", { in: "SourceGraphic" }))), /* @__PURE__ */ import_react5.default.createElement("filter", { id: "glow", x: "-50%", y: "-50%", width: "200%", height: "200%" }, /* @__PURE__ */ import_react5.default.createElement("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }), /* @__PURE__ */ import_react5.default.createElement("feMerge", null, /* @__PURE__ */ import_react5.default.createElement("feMergeNode", { in: "coloredBlur" }), /* @__PURE__ */ import_react5.default.createElement("feMergeNode", { in: "SourceGraphic" })))),
      /* @__PURE__ */ import_react5.default.createElement("g", { transform: `translate(${pan.x}, ${pan.y}) scale(${zoom})` }, edges.map((edge) => {
        const path = generateEdgePath(edge);
        const pathId = `path-${edge.id}`;
        const isHighlighted = hoveredEdge === edge.id || selectedNode && (edge.source === selectedNode || edge.target === selectedNode);
        return /* @__PURE__ */ import_react5.default.createElement("g", { key: edge.id }, /* @__PURE__ */ import_react5.default.createElement("defs", null, /* @__PURE__ */ import_react5.default.createElement("path", { id: pathId, d: path })), /* @__PURE__ */ import_react5.default.createElement(
          "path",
          {
            d: path,
            fill: "none",
            stroke: "white",
            strokeWidth: isHighlighted ? "6" : "4",
            opacity: "0.8"
          }
        ), /* @__PURE__ */ import_react5.default.createElement(
          "path",
          {
            d: path,
            fill: "none",
            stroke: isHighlighted ? isDarkMode ? "#3b82f6" : "#2563eb" : edge.isConditional ? isDarkMode ? "#fb923c" : "#f97316" : isDarkMode ? "#9ca3af" : "#6b7280",
            strokeWidth: isHighlighted ? "3" : "2",
            strokeDasharray: edge.isConditional ? "5,5" : "",
            markerEnd: isHighlighted ? "url(#arrowhead-highlighted)" : edge.isConditional ? "url(#arrowhead-conditional)" : "url(#arrowhead)",
            filter: isHighlighted ? "url(#glow)" : "",
            className: "cursor-pointer",
            onMouseEnter: () => setHoveredEdge(edge.id),
            onMouseLeave: () => setHoveredEdge(null)
          }
        ), edge.label && /* @__PURE__ */ import_react5.default.createElement("g", null, /* @__PURE__ */ import_react5.default.createElement(
          "rect",
          {
            x: "0",
            y: "0",
            width: edge.label.length * 6 + 8,
            height: "16",
            rx: "8",
            fill: isDarkMode ? "#1f2937" : "white",
            stroke: isDarkMode ? "#374151" : "#e5e7eb",
            strokeWidth: "1",
            opacity: "0.95"
          },
          /* @__PURE__ */ import_react5.default.createElement(
            "animateTransform",
            {
              attributeName: "transform",
              type: "translate",
              values: "0,-8;0,-8",
              dur: "1s"
            }
          )
        ), /* @__PURE__ */ import_react5.default.createElement(
          "text",
          {
            className: "text-xs font-medium",
            fill: isHighlighted ? isDarkMode ? "#60a5fa" : "#2563eb" : isDarkMode ? "#d1d5db" : "#6b7280",
            dy: "4",
            dx: "4"
          },
          /* @__PURE__ */ import_react5.default.createElement("textPath", { href: `#${pathId}`, startOffset: "50%", textAnchor: "middle" }, edge.label.length > 20 ? edge.label.substring(0, 17) + "..." : edge.label)
        )));
      }), nodes.map((node) => {
        const colors = getNodeColorByType(node.data.itemType, node.data.isPageNode, node.data.isNavigationNode);
        const isSelected = selectedNode === node.id;
        const isConnected = edges.some((e) => e.source === node.id || e.target === node.id);
        return /* @__PURE__ */ import_react5.default.createElement(
          "g",
          {
            key: node.id,
            transform: `translate(${node.x}, ${node.y})`,
            className: cursorMode === "select" ? "cursor-pointer" : "",
            onMouseDown: (e) => {
              e.stopPropagation();
              handleMouseDown(e, node.id);
            }
          },
          isSelected && /* @__PURE__ */ import_react5.default.createElement(
            "rect",
            {
              x: "-6",
              y: "-6",
              width: node.width + 12,
              height: node.height + 12,
              rx: "12",
              fill: "none",
              stroke: isDarkMode ? "#3b82f6" : "#2563eb",
              strokeWidth: "2",
              opacity: "0.6",
              filter: "url(#shadow)"
            }
          ),
          isConnected && !isSelected && /* @__PURE__ */ import_react5.default.createElement(
            "circle",
            {
              cx: node.width + 15,
              cy: "15",
              r: "4",
              fill: isDarkMode ? "#10b981" : "#059669",
              opacity: "0.7"
            }
          ),
          /* @__PURE__ */ import_react5.default.createElement(
            "rect",
            {
              width: node.width,
              height: node.height,
              rx: "8",
              fill: isDarkMode ? colors.darkFill : colors.fill,
              stroke: isDarkMode ? colors.darkStroke : colors.stroke,
              strokeWidth: isSelected ? "2" : "1",
              filter: "url(#shadow)"
            }
          ),
          /* @__PURE__ */ import_react5.default.createElement("defs", null, /* @__PURE__ */ import_react5.default.createElement("linearGradient", { id: `gradient-${node.id}`, x1: "0%", y1: "0%", x2: "0%", y2: "100%" }, /* @__PURE__ */ import_react5.default.createElement("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.1)" }), /* @__PURE__ */ import_react5.default.createElement("stop", { offset: "100%", stopColor: "rgba(0,0,0,0.05)" }))),
          /* @__PURE__ */ import_react5.default.createElement(
            "rect",
            {
              width: node.width,
              height: node.height,
              rx: "8",
              fill: `url(#gradient-${node.id})`
            }
          ),
          /* @__PURE__ */ import_react5.default.createElement(
            "rect",
            {
              width: node.width,
              height: "32",
              rx: "8",
              fill: isDarkMode ? colors.darkStroke : colors.stroke,
              opacity: "0.15"
            }
          ),
          /* @__PURE__ */ import_react5.default.createElement(
            "rect",
            {
              x: "8",
              y: "8",
              width: "auto",
              height: "16",
              rx: "8",
              fill: isDarkMode ? colors.darkStroke : colors.stroke,
              opacity: "0.8"
            }
          ),
          /* @__PURE__ */ import_react5.default.createElement(
            "text",
            {
              x: "12",
              y: "19",
              className: "text-xs font-semibold",
              fill: "white"
            },
            node.data.isNavigationNode ? "RULE" : node.data.isPageNode ? "PAGE" : node.data.itemType.toUpperCase()
          ),
          /* @__PURE__ */ import_react5.default.createElement(
            "text",
            {
              x: "12",
              y: "50",
              className: "text-sm font-bold",
              fill: isDarkMode ? "#f8fafc" : "#1e293b"
            },
            node.data.label.length > 30 ? node.data.label.substring(0, 27) + "..." : node.data.label
          ),
          node.data.isPageNode && node.data.pageItems && node.data.pageItems.length > 0 && /* @__PURE__ */ import_react5.default.createElement("g", null, /* @__PURE__ */ import_react5.default.createElement(
            "line",
            {
              x1: "12",
              y1: "68",
              x2: node.width - 12,
              y2: "68",
              stroke: isDarkMode ? colors.darkStroke : colors.stroke,
              strokeOpacity: "0.3"
            }
          ), node.data.pageItems.slice(0, 4).map((item, index) => /* @__PURE__ */ import_react5.default.createElement("g", { key: item.uuid || index }, /* @__PURE__ */ import_react5.default.createElement(
            "text",
            {
              x: "16",
              y: 85 + index * 20,
              className: "text-xs",
              fill: isDarkMode ? "#cbd5e1" : "#64748b"
            },
            `${index + 1}. ${(item.label || item.fieldName || item.type || "Item").substring(0, 35)}${(item.label || item.fieldName || item.type || "Item").length > 35 ? "..." : ""}`
          ), item.navigationRules && item.navigationRules.length > 0 && /* @__PURE__ */ import_react5.default.createElement(
            "circle",
            {
              cx: node.width - 20,
              cy: 82 + index * 20,
              r: "3",
              fill: isDarkMode ? "#fb923c" : "#f97316"
            }
          ))), node.data.pageItems.length > 4 && /* @__PURE__ */ import_react5.default.createElement(
            "text",
            {
              x: "16",
              y: 85 + 4 * 20,
              className: "text-xs font-medium",
              fill: isDarkMode ? "#94a3b8" : "#6b7280"
            },
            "+",
            node.data.pageItems.length - 4,
            " more items..."
          )),
          node.data.isNavigationNode && node.data.description && /* @__PURE__ */ import_react5.default.createElement(
            "text",
            {
              x: "12",
              y: "70",
              className: "text-xs",
              fill: isDarkMode ? "#cbd5e1" : "#64748b"
            },
            node.data.description.length > 35 ? node.data.description.substring(0, 32) + "..." : node.data.description
          ),
          /* @__PURE__ */ import_react5.default.createElement("g", { transform: `translate(${node.width - 40}, 8)` }, node.data.hasConditionalFlow && /* @__PURE__ */ import_react5.default.createElement("g", null, /* @__PURE__ */ import_react5.default.createElement(
            "circle",
            {
              cx: "12",
              cy: "12",
              r: "10",
              fill: isDarkMode ? "#fb7185" : "#f43f5e",
              opacity: "0.2"
            }
          ), /* @__PURE__ */ import_react5.default.createElement(
            "path",
            {
              d: "M8 12l3 3 6-6",
              stroke: isDarkMode ? "#fb7185" : "#f43f5e",
              strokeWidth: "2",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ))),
          isSelected && /* @__PURE__ */ import_react5.default.createElement(
            "text",
            {
              x: node.width / 2,
              y: node.height + 20,
              textAnchor: "middle",
              className: "text-xs",
              fill: isDarkMode ? "#94a3b8" : "#64748b"
            },
            node.data.isNavigationNode ? "Click settings to edit rules" : "Page overview"
          )
        );
      }))
    ),
    zoomable && /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-2" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        onClick: () => handleZoom(0.1),
        className: "flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
        title: "Zoom In"
      },
      /* @__PURE__ */ import_react5.default.createElement(import_lucide_react6.ZoomIn, { className: "w-4 h-4" })
    ), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        onClick: () => handleZoom(-0.1),
        className: "flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
        title: "Zoom Out"
      },
      /* @__PURE__ */ import_react5.default.createElement(import_lucide_react6.ZoomOut, { className: "w-4 h-4" })
    ), /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        onClick: handleFitView,
        className: "flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
        title: "Fit View"
      },
      /* @__PURE__ */ import_react5.default.createElement(import_lucide_react6.Maximize2, { className: "w-4 h-4" })
    ), /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }), /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        onClick: () => setCursorMode(cursorMode === "select" ? "pan" : "select"),
        className: `flex items-center justify-center w-8 h-8 rounded-lg transition-all ${cursorMode === "pan" ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"}`,
        title: cursorMode === "select" ? "Switch to Pan Mode (or hold Space)" : "Switch to Select Mode"
      },
      cursorMode === "select" ? /* @__PURE__ */ import_react5.default.createElement(import_lucide_react6.Move, { className: "w-4 h-4" }) : /* @__PURE__ */ import_react5.default.createElement(import_lucide_react6.MousePointer, { className: "w-4 h-4" })
    )), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center mt-2" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-xs text-gray-500 dark:text-gray-400 font-mono" }, Math.round(zoom * 100), "%"))),
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute bottom-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-3" }, /* @__PURE__ */ import_react5.default.createElement("h4", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Legend"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-3 h-3 bg-green-100 dark:bg-green-900 border border-green-500 rounded" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-gray-600 dark:text-gray-400" }, "Page")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-3 h-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-500 rounded" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-gray-600 dark:text-gray-400" }, "Navigation Rule")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-3 h-px bg-gray-400" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-gray-600 dark:text-gray-400" }, "Sequential Flow")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-3 h-px bg-orange-500 border-dashed border-b" }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-gray-600 dark:text-gray-400" }, "Conditional Flow")))),
    selectedNode && selectedNodeData && /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute top-4 right-4 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-t-xl border-b border-gray-200/50 dark:border-gray-600/50" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "text-sm font-bold text-gray-900 dark:text-white" }, selectedNodeData.data.isNavigationNode ? "Navigation Rule" : selectedNodeData.data.isPageNode ? "Page Details" : "Item Details"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, selectedNodeData.data.isNavigationNode ? "Controls flow between pages" : "Survey content")), selectedNodeData.data.isNavigationNode && /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        onClick: () => setEditingRules(selectedNode),
        className: "flex items-center gap-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md transition-colors"
      },
      /* @__PURE__ */ import_react5.default.createElement(import_lucide_react6.Settings, { className: "w-3 h-3" }),
      "Edit"
    ))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "p-4 space-y-4" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Name"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-sm font-semibold text-gray-900 dark:text-white mt-1" }, selectedNodeData.data.label)), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Type"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex gap-2 mt-1" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border" }, selectedNodeData.data.nodeType), selectedNodeData.data.isPageNode && /* @__PURE__ */ import_react5.default.createElement("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800" }, "PAGE"), selectedNodeData.data.isNavigationNode && /* @__PURE__ */ import_react5.default.createElement("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800" }, "NAVIGATION"))), selectedNodeData.data.isPageNode && selectedNodeData.data.pageItems && /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Items (", selectedNodeData.data.pageItems.length, ")"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "mt-2 space-y-1 max-h-32 overflow-y-auto" }, selectedNodeData.data.pageItems.map((item, index) => /* @__PURE__ */ import_react5.default.createElement("div", { key: item.uuid || index, className: "flex items-center justify-between text-xs" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-gray-600 dark:text-gray-300" }, item.fieldName || item.label || item.type || "Item"), item.navigationRules && item.navigationRules.length > 0 && /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-2 h-2 bg-orange-500 rounded-full", title: "Has navigation rules" }))))), selectedNodeData.data.description && /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Description"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed" }, selectedNodeData.data.description.length > 120 ? selectedNodeData.data.description.substring(0, 117) + "..." : selectedNodeData.data.description)), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Connections"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "mt-1 space-y-1" }, edges.filter((e) => e.source === selectedNode || e.target === selectedNode).map((edge) => /* @__PURE__ */ import_react5.default.createElement("div", { key: edge.id, className: "text-xs text-gray-600 dark:text-gray-300" }, edge.source === selectedNode ? "\u2192" : "\u2190", " ", edge.label || "Connection")), edges.filter((e) => e.source === selectedNode || e.target === selectedNode).length === 0 && /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-xs text-gray-400 dark:text-gray-500" }, "No connections"))), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, "Status"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2 mt-1" }, selectedNodeData.data.hasConditionalFlow ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-2 h-2 bg-orange-500 rounded-full" }), "Has Rules") : /* @__PURE__ */ import_react5.default.createElement("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), "Sequential"))))),
    editingRules && selectedNodeData && /* @__PURE__ */ import_react5.default.createElement(
      NavigationRulesEditorDialog,
      {
        data: selectedNodeData.data.originalData,
        nodeId: editingRules,
        nodeName: selectedNodeData.data.label,
        navigationRules: selectedNodeData.data.originalData.navigationRules || [],
        availableFields: fieldNames,
        availableTargets: targets,
        onSave: (rules) => saveNavigationRules(editingRules, rules),
        onClose: () => setEditingRules(null)
      }
    )
  );
};

// src/survey/panels/ThemeBuilder.tsx
var import_react7 = __toESM(require("react"));
var import_react8 = require("react");

// src/components/ui/separator.tsx
var React16 = __toESM(require("react"));
var SeparatorPrimitive = __toESM(require("@radix-ui/react-separator"));
var Separator2 = React16.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ React16.createElement(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator2.displayName = SeparatorPrimitive.Root.displayName;

// src/components/ui/toggle-group.tsx
var React18 = __toESM(require("react"));
var ToggleGroupPrimitive = __toESM(require("@radix-ui/react-toggle-group"));

// src/components/ui/toggle.tsx
var React17 = __toESM(require("react"));
var TogglePrimitive = __toESM(require("@radix-ui/react-toggle"));
var import_class_variance_authority6 = require("class-variance-authority");
var toggleVariants = (0, import_class_variance_authority6.cva)(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Toggle = React17.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ React17.createElement(
  TogglePrimitive.Root,
  {
    ref,
    className: cn(toggleVariants({ variant, size, className })),
    ...props
  }
));
Toggle.displayName = TogglePrimitive.Root.displayName;

// src/components/ui/toggle-group.tsx
var ToggleGroupContext = React18.createContext({
  size: "default",
  variant: "default"
});
var ToggleGroup = React18.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ React18.createElement(
  ToggleGroupPrimitive.Root,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props
  },
  /* @__PURE__ */ React18.createElement(ToggleGroupContext.Provider, { value: { variant, size } }, children)
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
var ToggleGroupItem = React18.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React18.useContext(ToggleGroupContext);
  return /* @__PURE__ */ React18.createElement(
    ToggleGroupPrimitive.Item,
    {
      ref,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      ),
      ...props
    },
    children
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// src/components/ui/popover.tsx
var import_react6 = __toESM(require("react"));
var PopoverTrigger = ({
  children,
  className,
  onClick
}) => {
  return /* @__PURE__ */ import_react6.default.createElement(
    "div",
    {
      className: cn("cursor-pointer", className),
      onClick
    },
    children
  );
};
var PopoverContent = ({
  children,
  className,
  open,
  onClose
}) => {
  const ref = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && open) {
        onClose == null ? void 0 : onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, open]);
  if (!open) return null;
  return /* @__PURE__ */ import_react6.default.createElement(
    "div",
    {
      ref,
      className: cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in zoom-in-95 mt-1",
        className
      )
    },
    children
  );
};
var PopoverRoot = ({ children }) => {
  const [open, setOpen] = (0, import_react6.useState)(false);
  const childrenWithProps = import_react6.default.Children.map(children, (child) => {
    if (import_react6.default.isValidElement(child)) {
      if (child.type === PopoverTrigger) {
        return import_react6.default.cloneElement(child, {
          onClick: () => setOpen(!open)
        });
      }
      if (child.type === PopoverContent) {
        return import_react6.default.cloneElement(child, {
          open,
          onClose: () => setOpen(false)
        });
      }
    }
    return child;
  });
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, childrenWithProps);
};

// src/survey/panels/ThemeBuilder.tsx
var import_lucide_react7 = require("lucide-react");
var import_src = require("survey-form-renderer/src");
var PRESET_OPTIONS = {
  fontSize: [
    { label: "Extra Small", value: "text-xs" },
    { label: "Small", value: "text-sm" },
    { label: "Base", value: "text-base" },
    { label: "Large", value: "text-lg" },
    { label: "Extra Large", value: "text-xl" },
    { label: "2X Large", value: "text-2xl" },
    { label: "3X Large", value: "text-3xl" },
    { label: "4X Large", value: "text-4xl" }
  ],
  fontWeight: [
    { label: "Thin", value: "font-thin" },
    { label: "Light", value: "font-light" },
    { label: "Normal", value: "font-normal" },
    { label: "Medium", value: "font-medium" },
    { label: "Semibold", value: "font-semibold" },
    { label: "Bold", value: "font-bold" },
    { label: "Extra Bold", value: "font-extrabold" }
  ],
  textAlign: [
    { label: "Left", value: "text-left", icon: "\u2B05\uFE0F" },
    { label: "Center", value: "text-center", icon: "\u2194\uFE0F" },
    { label: "Right", value: "text-right", icon: "\u27A1\uFE0F" },
    { label: "Justify", value: "text-justify", icon: "\u2630" }
  ],
  borderRadius: [
    { label: "None", value: "rounded-none", preview: "\u25FB\uFE0F" },
    { label: "Small", value: "rounded-sm", preview: "\u2B1C" },
    { label: "Default", value: "rounded", preview: "\u2B1C" },
    { label: "Medium", value: "rounded-md", preview: "\u2B1C" },
    { label: "Large", value: "rounded-lg", preview: "\u2B1C" },
    { label: "XL", value: "rounded-xl", preview: "\u2B1C" },
    { label: "2XL", value: "rounded-2xl", preview: "\u2B1C" },
    { label: "3XL", value: "rounded-3xl", preview: "\u2B1C" },
    { label: "Full", value: "rounded-full", preview: "\u2B55" }
  ],
  borderWidth: [
    { label: "None", value: "border-0" },
    { label: "1px", value: "border" },
    { label: "2px", value: "border-2" },
    { label: "4px", value: "border-4" },
    { label: "8px", value: "border-8" }
  ],
  shadow: [
    { label: "None", value: "shadow-none" },
    { label: "Small", value: "shadow-sm" },
    { label: "Default", value: "shadow" },
    { label: "Medium", value: "shadow-md" },
    { label: "Large", value: "shadow-lg" },
    { label: "XL", value: "shadow-xl" },
    { label: "2XL", value: "shadow-2xl" }
  ],
  spacing: [
    { label: "None", value: "0" },
    { label: "0.5", value: "0.5" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "8", value: "8" },
    { label: "10", value: "10" },
    { label: "12", value: "12" },
    { label: "16", value: "16" }
  ],
  containerWidth: [
    { label: "Small", value: "max-w-sm" },
    { label: "Medium", value: "max-w-md" },
    { label: "Large", value: "max-w-lg" },
    { label: "XL", value: "max-w-xl" },
    { label: "2XL", value: "max-w-2xl" },
    { label: "3XL", value: "max-w-3xl" },
    { label: "4XL", value: "max-w-4xl" },
    { label: "5XL", value: "max-w-5xl" },
    { label: "Full", value: "max-w-full" }
  ]
};
var COLOR_PRESETS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#9333EA" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Green", value: "#10B981" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Gray", value: "#6B7280" },
  { name: "Slate", value: "#475569" },
  { name: "Transparent", value: "#00FFFFFF" },
  { name: "Black", value: "#000000" }
];
var parseTailwindClasses = (classString) => {
  const classes = classString.split(" ").filter(Boolean);
  const parsed = {
    fontSize: "",
    fontWeight: "",
    textAlign: "",
    textColor: "",
    bgColor: "",
    borderRadius: "",
    borderWidth: "",
    borderColor: "",
    shadow: "",
    padding: {},
    margin: {},
    custom: []
  };
  classes.forEach((cls) => {
    if (cls.startsWith("text-") && PRESET_OPTIONS.fontSize.some((opt) => opt.value === cls)) {
      parsed.fontSize = cls;
    } else if (cls.startsWith("font-")) {
      parsed.fontWeight = cls;
    } else if (["text-left", "text-center", "text-right", "text-justify"].includes(cls)) {
      parsed.textAlign = cls;
    } else if (cls.startsWith("text-") && (cls.includes("[#") || cls.includes("-50") || cls.includes("-100") || cls.includes("-200") || cls.includes("-300") || cls.includes("-400") || cls.includes("-500") || cls.includes("-600") || cls.includes("-700") || cls.includes("-800") || cls.includes("-900"))) {
      parsed.textColor = cls;
    } else if (cls.startsWith("bg-")) {
      parsed.bgColor = cls;
    } else if (cls.startsWith("rounded")) {
      parsed.borderRadius = cls;
    } else if (cls === "border" || cls.match(/^border-\d+$/)) {
      parsed.borderWidth = cls;
    } else if (cls.startsWith("border-") && !cls.match(/^border-\d+$/)) {
      parsed.borderColor = cls;
    } else if (cls.startsWith("shadow")) {
      parsed.shadow = cls;
    } else if (cls.match(/^p[tlrbxy]?-/)) {
      const [type, value] = cls.split("-");
      parsed.padding[type] = value;
    } else if (cls.match(/^m[tlrbxy]?-/)) {
      const [type, value] = cls.split("-");
      parsed.margin[type] = value;
    } else {
      parsed.custom.push(cls);
    }
  });
  return parsed;
};
var extractColorFromClass = (colorClass) => {
  if (!colorClass) return "#000000";
  const match = colorClass.match(/\[(#[0-9a-fA-F]{6})\]/);
  if (match) return match[1];
  const colorMap = {
    "gray-50": "#F9FAFB",
    "gray-100": "#F3F4F6",
    "gray-200": "#E5E7EB",
    "gray-300": "#D1D5DB",
    "gray-400": "#9CA3AF",
    "gray-500": "#6B7280",
    "gray-600": "#4B5563",
    "gray-700": "#374151",
    "gray-800": "#1F2937",
    "gray-900": "#111827",
    "blue-50": "#EFF6FF",
    "blue-100": "#DBEAFE",
    "blue-200": "#BFDBFE",
    "blue-300": "#93C5FD",
    "blue-400": "#60A5FA",
    "blue-500": "#3B82F6",
    "blue-600": "#2563EB",
    "blue-700": "#1D4ED8",
    "blue-800": "#1E40AF",
    "blue-900": "#1E3A8A",
    "red-50": "#FEF2F2",
    "red-100": "#FEE2E2",
    "red-200": "#FECACA",
    "red-300": "#FCA5A5",
    "red-400": "#F87171",
    "red-500": "#EF4444",
    "red-600": "#DC2626",
    "red-700": "#B91C1C",
    "red-800": "#991B1B",
    "red-900": "#7F1D1D",
    "green-50": "#F0FDF4",
    "green-100": "#DCFCE7",
    "green-200": "#BBF7D0",
    "green-300": "#86EFAC",
    "green-400": "#4ADE80",
    "green-500": "#22C55E",
    "green-600": "#16A34A",
    "green-700": "#15803D",
    "green-800": "#166534",
    "green-900": "#14532D",
    "purple-50": "#FAF5FF",
    "purple-100": "#F3E8FF",
    "purple-200": "#E9D5FF",
    "purple-300": "#D8B4FE",
    "purple-400": "#C084FC",
    "purple-500": "#A855F7",
    "purple-600": "#9333EA",
    "purple-700": "#7C3AED",
    "purple-800": "#6B21A8",
    "purple-900": "#581C87"
  };
  for (const [key, value] of Object.entries(colorMap)) {
    if (colorClass.includes(key)) return value;
  }
  return "#000000";
};
var ColorPicker = ({ value, onChange, label, prefix = "text" }) => {
  const hexColor = extractColorFromClass(value);
  const handleColorChange = (color) => {
    onChange(`${prefix}-[${color}]`);
  };
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react7.default.createElement(Label, null, label), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(PopoverRoot, null, /* @__PURE__ */ import_react7.default.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      variant: "outline",
      className: "w-full justify-start gap-2"
    },
    /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "w-4 h-4 rounded border",
        style: { backgroundColor: hexColor }
      }
    ),
    /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-sm" }, hexColor)
  )), /* @__PURE__ */ import_react7.default.createElement(PopoverContent, { className: "w-80" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Quick Colors"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-6 gap-2 mt-2" }, COLOR_PRESETS.map((preset) => /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      key: preset.value,
      className: "w-10 h-10 rounded border-2 hover:scale-110 transition-transform",
      style: { backgroundColor: preset.value },
      onClick: () => handleColorChange(preset.value),
      title: preset.name
    }
  )))), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Custom Color"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ import_react7.default.createElement(
    "input",
    {
      type: "color",
      value: hexColor,
      onChange: (e) => handleColorChange(e.target.value),
      className: "w-20 h-10 rounded cursor-pointer"
    }
  ), /* @__PURE__ */ import_react7.default.createElement(
    Input,
    {
      value: hexColor,
      onChange: (e) => handleColorChange(e.target.value),
      placeholder: "#000000"
    }
  )))))), /* @__PURE__ */ import_react7.default.createElement(
    Input,
    {
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder: `${prefix}-gray-900`,
      className: "flex-1"
    }
  )));
};
var SpacingControl = ({ value, onChange, type }) => {
  const prefix = type === "padding" ? "p" : "m";
  const updateSpacing = (side, val) => {
    const newValue = { ...value };
    if (val === "0") {
      delete newValue[`${prefix}${side}`];
    } else {
      newValue[`${prefix}${side}`] = val;
    }
    onChange(newValue);
  };
  const allValue = value[prefix] || "0";
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "capitalize" }, type), /* @__PURE__ */ import_react7.default.createElement(Badge, { variant: "outline" }, Object.keys(value).length, " rules")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2 p-4 border rounded-lg bg-gray-50" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "w-16 text-xs" }, "All"), /* @__PURE__ */ import_react7.default.createElement(Select, { value: allValue, onValueChange: (val) => updateSpacing("", val) }, /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, { className: "h-8" }, /* @__PURE__ */ import_react7.default.createElement(SelectValue, null)), /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.spacing.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label))))), /* @__PURE__ */ import_react7.default.createElement(Separator2, null), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-2 gap-2" }, [
    { side: "t", label: "Top" },
    { side: "r", label: "Right" },
    { side: "b", label: "Bottom" },
    { side: "l", label: "Left" }
  ].map(({ side, label }) => /* @__PURE__ */ import_react7.default.createElement("div", { key: side, className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "w-12 text-xs" }, label), /* @__PURE__ */ import_react7.default.createElement(
    Select,
    {
      value: value[`${prefix}${side}`] || "0",
      onValueChange: (val) => updateSpacing(side, val)
    },
    /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, { className: "h-8" }, /* @__PURE__ */ import_react7.default.createElement(SelectValue, null)),
    /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.spacing.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label)))
  ))))));
};
var VisualStyleBuilder = ({ value, onChange, presetType }) => {
  const parsed = parseTailwindClasses(value);
  const updateClasses = (updates) => {
    const newParsed = { ...parsed, ...updates };
    const classes = [];
    if (newParsed.fontSize) classes.push(newParsed.fontSize);
    if (newParsed.fontWeight) classes.push(newParsed.fontWeight);
    if (newParsed.textAlign) classes.push(newParsed.textAlign);
    if (newParsed.textColor) classes.push(newParsed.textColor);
    if (newParsed.bgColor) classes.push(newParsed.bgColor);
    if (newParsed.borderRadius) classes.push(newParsed.borderRadius);
    if (newParsed.borderWidth) classes.push(newParsed.borderWidth);
    if (newParsed.borderColor) classes.push(newParsed.borderColor);
    if (newParsed.shadow) classes.push(newParsed.shadow);
    Object.entries(newParsed.padding).forEach(([key, val]) => {
      classes.push(`${key}-${val}`);
    });
    Object.entries(newParsed.margin).forEach(([key, val]) => {
      classes.push(`${key}-${val}`);
    });
    classes.push(...newParsed.custom);
    onChange(classes.join(" "));
  };
  const [showAdvanced, setShowAdvanced] = (0, import_react8.useState)(false);
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Sparkles, { className: "w-4 h-4" }), "Quick Presets"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-2 gap-2" }, FIELD_PRESETS[presetType].map((preset) => /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      key: preset.name,
      variant: "outline",
      size: "sm",
      onClick: () => onChange(preset.value),
      className: "justify-start text-xs"
    },
    preset.name
  )))), /* @__PURE__ */ import_react7.default.createElement(Separator2, null), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "font-medium flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Type, { className: "w-4 h-4" }), "Typography"), /* @__PURE__ */ import_react7.default.createElement(Select, { value: parsed.fontSize, onValueChange: (val) => updateClasses({ fontSize: val }) }, /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react7.default.createElement(SelectValue, { placeholder: "Font Size" })), /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.fontSize.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label)))), /* @__PURE__ */ import_react7.default.createElement(Select, { value: parsed.fontWeight, onValueChange: (val) => updateClasses({ fontWeight: val }) }, /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react7.default.createElement(SelectValue, { placeholder: "Font Weight" })), /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.fontWeight.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label)))), /* @__PURE__ */ import_react7.default.createElement(
    ToggleGroup,
    {
      type: "single",
      value: parsed.textAlign,
      onValueChange: (val) => updateClasses({ textAlign: val })
    },
    PRESET_OPTIONS.textAlign.map((opt) => /* @__PURE__ */ import_react7.default.createElement(ToggleGroupItem, { key: opt.value, value: opt.value, className: "data-[state=on]:bg-blue-100" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-xs" }, opt.icon)))
  )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react7.default.createElement("h4", { className: "font-medium flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Paintbrush, { className: "w-4 h-4" }), "Appearance"), /* @__PURE__ */ import_react7.default.createElement(Select, { value: parsed.borderRadius, onValueChange: (val) => updateClasses({ borderRadius: val }) }, /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react7.default.createElement(SelectValue, { placeholder: "Border Radius" })), /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.borderRadius.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement("span", null, opt.preview), /* @__PURE__ */ import_react7.default.createElement("span", null, opt.label)))))), /* @__PURE__ */ import_react7.default.createElement(Select, { value: parsed.shadow, onValueChange: (val) => updateClasses({ shadow: val }) }, /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react7.default.createElement(SelectValue, { placeholder: "Shadow" })), /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.shadow.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label)))), parsed.borderWidth && /* @__PURE__ */ import_react7.default.createElement(Select, { value: parsed.borderWidth, onValueChange: (val) => updateClasses({ borderWidth: val }) }, /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react7.default.createElement(SelectValue, { placeholder: "Border Width" })), /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.borderWidth.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label)))))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ import_react7.default.createElement(
    ColorPicker,
    {
      value: parsed.textColor,
      onChange: (val) => updateClasses({ textColor: val }),
      label: "Text Color",
      prefix: "text"
    }
  ), /* @__PURE__ */ import_react7.default.createElement(
    ColorPicker,
    {
      value: parsed.bgColor,
      onChange: (val) => updateClasses({ bgColor: val }),
      label: "Background Color",
      prefix: "bg"
    }
  ), parsed.borderWidth && /* @__PURE__ */ import_react7.default.createElement(
    ColorPicker,
    {
      value: parsed.borderColor,
      onChange: (val) => updateClasses({ borderColor: val }),
      label: "Border Color",
      prefix: "border"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: () => setShowAdvanced(!showAdvanced),
      className: "w-full justify-between"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Sliders, { className: "w-4 h-4" }), "Advanced Spacing"),
    showAdvanced ? /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.X, { className: "w-4 h-4" }) : /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Plus, { className: "w-4 h-4" })
  ), showAdvanced && /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50" }, /* @__PURE__ */ import_react7.default.createElement(
    SpacingControl,
    {
      value: parsed.padding,
      onChange: (val) => updateClasses({ padding: val }),
      type: "padding"
    }
  ), /* @__PURE__ */ import_react7.default.createElement(
    SpacingControl,
    {
      value: parsed.margin,
      onChange: (val) => updateClasses({ margin: val }),
      type: "margin"
    }
  ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Custom Classes"), /* @__PURE__ */ import_react7.default.createElement(
    Textarea,
    {
      value: parsed.custom.join(" "),
      onChange: (e) => updateClasses({ custom: e.target.value.split(" ").filter(Boolean) }),
      placeholder: "Add any additional Tailwind classes here...",
      rows: 2
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 bg-gray-100 rounded-lg" }, /* @__PURE__ */ import_react7.default.createElement("code", { className: "text-xs text-gray-700 break-all" }, value)));
};
var themePresets = {
  default: {
    name: "default",
    containerLayout: "max-w-2xl mx-auto py-4 px-4 sm:px-6",
    header: "mb-8",
    title: "text-3xl font-bold text-gray-900 mb-4 text-center",
    description: "text-lg text-gray-600 mb-8 text-center",
    background: "bg-gray-50",
    card: "bg-white shadow-sm rounded-lg p-6 mb-6",
    container: {
      card: "bg-white border border-gray-200 rounded-lg",
      border: "border-gray-200",
      activeBorder: "border-blue-500",
      activeBg: "bg-blue-50",
      header: "bg-gray-50"
    },
    field: {
      label: "block text-sm font-medium text-gray-700 mb-2",
      input: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
      description: "mt-1 text-sm text-gray-500",
      error: "mt-1 text-sm text-red-600",
      radio: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300",
      checkbox: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded",
      select: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
      textarea: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
      file: "w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50",
      matrix: "border-collapse w-full text-sm",
      range: "accent-blue-600",
      text: "text-gray-900",
      activeText: "text-blue-600",
      placeholder: "text-gray-400",
      boxBorder: "border-gray-300",
      // SelectableBox specific styles
      selectableBox: "p-4 transition-all duration-200 hover:shadow-sm cursor-pointer",
      selectableBoxDefault: "border border-gray-300 bg-white",
      selectableBoxSelected: "border-blue-500 bg-blue-50 ring-1 ring-blue-500",
      selectableBoxHover: "hover:border-gray-400 hover:shadow-sm",
      selectableBoxFocus: "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
      selectableBoxDisabled: "opacity-50 cursor-not-allowed",
      selectableBoxContainer: "",
      selectableBoxText: "text-gray-900 font-medium",
      selectableBoxTextSelected: "text-blue-900",
      selectableBoxIndicator: "bg-blue-500 text-white",
      selectableBoxIndicatorIcon: "text-white"
    },
    progress: {
      bar: "h-2 bg-[#3B82F6] rounded-full overflow-hidden",
      dots: "flex space-x-2 justify-center",
      numbers: "flex space-x-2 justify-center",
      percentage: "text-right text-sm text-gray-600 mb-1",
      label: "text-sm text-gray-600 mb-1"
    },
    button: {
      primary: "inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
      secondary: "inline-flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
      text: "text-sm font-medium text-blue-600 hover:text-blue-500",
      navigation: "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    },
    colors: {
      primary: "#3B82F6",
      secondary: "#6B7280",
      accent: "#1D4ED8",
      background: "#FFFFFF",
      text: "#111827",
      border: "#D1D5DB",
      error: "#EF4444",
      success: "#10B981"
    }
  },
  minimal: {
    name: "minimal",
    containerLayout: "max-w-xl mx-auto py-8 px-4",
    header: "mb-12",
    title: "text-2xl font-light text-gray-900 mb-6 text-center",
    description: "text-base text-gray-600 mb-8 text-center",
    background: "bg-white",
    card: "bg-white border-b border-gray-100 py-8",
    container: {
      card: "bg-white",
      border: "border-gray-100",
      activeBorder: "border-gray-900",
      activeBg: "bg-gray-50",
      header: "bg-white"
    },
    field: {
      label: "block text-sm font-normal text-gray-900 mb-3",
      input: "w-full border-0 border-b border-gray-200 rounded-none focus:border-gray-900 focus:ring-0 py-3 px-0",
      description: "mt-2 text-xs text-gray-500",
      error: "mt-2 text-xs text-red-600",
      radio: "focus:ring-gray-900 h-4 w-4 text-gray-900 border-gray-300",
      checkbox: "focus:ring-gray-900 h-4 w-4 text-gray-900 border-gray-300 rounded-none",
      select: "w-full border-0 border-b border-gray-200 rounded-none focus:border-gray-900 focus:ring-0",
      textarea: "w-full border-0 border-b border-gray-200 rounded-none focus:border-gray-900 focus:ring-0",
      file: "w-full text-sm text-gray-900 border border-gray-200 rounded-none cursor-pointer bg-white",
      matrix: "border-collapse w-full text-sm",
      range: "accent-gray-900",
      text: "text-gray-900",
      activeText: "text-gray-900",
      placeholder: "text-gray-400",
      boxBorder: "border-gray-200",
      // SelectableBox minimal styles
      selectableBox: "p-6 transition-all duration-200 cursor-pointer",
      selectableBoxDefault: "border-b border-gray-100 bg-white",
      selectableBoxSelected: "border-b-2 border-gray-900 bg-gray-50",
      selectableBoxHover: "hover:bg-gray-50",
      selectableBoxFocus: "focus-within:bg-gray-50",
      selectableBoxDisabled: "opacity-50 cursor-not-allowed",
      selectableBoxContainer: "",
      selectableBoxText: "text-gray-900 font-normal",
      selectableBoxTextSelected: "text-gray-900 font-medium",
      selectableBoxIndicator: "bg-gray-900 text-white",
      selectableBoxIndicatorIcon: "text-white"
    },
    progress: {
      bar: "h-1 bg-gray-100 rounded-none overflow-hidden",
      dots: "flex space-x-1 justify-center",
      numbers: "flex space-x-1 justify-center",
      percentage: "text-right text-xs text-gray-600 mb-2",
      label: "text-xs text-gray-600 mb-2"
    },
    button: {
      primary: "inline-flex justify-center py-3 px-8 text-sm font-normal border border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white focus:outline-none transition-colors",
      secondary: "inline-flex justify-center py-3 px-8 text-sm font-normal text-gray-600 bg-white hover:text-gray-900 focus:outline-none",
      text: "text-sm font-normal text-gray-600 hover:text-gray-900",
      navigation: "inline-flex items-center px-8 py-3 text-sm font-normal border border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white focus:outline-none transition-colors"
    },
    colors: {
      primary: "#111827",
      secondary: "#6B7280",
      accent: "#000000",
      background: "#FFFFFF",
      text: "#111827",
      border: "#E5E7EB",
      error: "#DC2626",
      success: "#059669"
    }
  },
  modern: {
    name: "modern",
    containerLayout: "max-w-2xl mx-auto py-4 px-4 sm:px-6",
    header: "mb-8",
    title: "text-4xl font-light text-[#E67E4D] mb-6 text-start leading-tight",
    description: "text-xl text-gray-900 leading-relaxed font-normal text-start max-w-md mx-auto",
    background: "bg-transparent",
    card: "bg-white p-8 mb-8",
    container: {
      card: "bg-white border border-gray-100 rounded-xl",
      border: "border-gray-100",
      activeBorder: "border-[#E67E4D]",
      activeBg: "bg-[#E67E4D]/5",
      header: "bg-white"
    },
    field: {
      label: "block text-xl font-medium text-gray-900 mb-4 text-start text-[#C48A66]",
      input: "w-full rounded-xl border-gray-200 shadow-sm focus:border-[#E67E4D] focus:ring-[#E67E4D] text-lg py-4 px-4",
      description: "mt-2 text-base text-gray-600 text-start",
      error: "mt-2 text-sm text-red-600 font-medium text-start",
      radio: "focus:ring-[#E67E4D] h-5 w-5 text-[#E67E4D] border-gray-300",
      checkbox: "focus:ring-[#E67E4D] h-5 w-5 text-[#E67E4D] border-gray-300 rounded-md",
      select: "w-full rounded-xl border-gray-200 shadow-sm focus:border-[#E67E4D] focus:ring-[#E67E4D] text-lg py-4 px-4",
      textarea: "w-full rounded-xl border-gray-200 shadow-sm focus:border-[#E67E4D] focus:ring-[#E67E4D] text-lg py-4 px-4",
      file: "w-full text-base text-gray-900 border border-gray-200 rounded-xl cursor-pointer bg-gray-50 py-4 px-4",
      matrix: "border-collapse w-full text-base rounded-lg overflow-hidden",
      range: "accent-[#E67E4D] focus:outline-none focus:ring-2 focus:ring-[#E67E4D]",
      text: "text-gray-900 text-sm",
      activeText: "text-[#E67E4D]",
      placeholder: "text-gray-400",
      boxBorder: "border-[#C48A66]",
      // SelectableBox modern styles
      selectableBox: "p-6 transition-all duration-300 cursor-pointer rounded-xl",
      selectableBoxDefault: "border border-gray-200 bg-white shadow-sm",
      selectableBoxSelected: "border-[#E67E4D] bg-[#E67E4D]/5 shadow-md ring-1 ring-[#E67E4D]/20",
      selectableBoxHover: "hover:border-[#C48A66] hover:shadow-md hover:scale-[1.02]",
      selectableBoxFocus: "focus-within:ring-2 focus-within:ring-[#E67E4D] focus-within:ring-offset-2",
      selectableBoxDisabled: "opacity-50 cursor-not-allowed",
      selectableBoxContainer: "",
      selectableBoxText: "text-gray-900 text-lg font-medium",
      selectableBoxTextSelected: "text-[#E67E4D] font-semibold",
      selectableBoxIndicator: "bg-[#E67E4D] text-white shadow-sm",
      selectableBoxIndicatorIcon: "text-white"
    },
    progress: {
      bar: "h-2 bg-[#3B82F6] rounded-full overflow-hidden",
      dots: "flex space-x-2 justify-center",
      numbers: "flex space-x-2 justify-center",
      percentage: "text-right text-base text-gray-900 font-medium mb-1",
      label: "text-base text-gray-600 mb-1 text-start"
    },
    button: {
      primary: "inline-flex justify-center py-4 px-16 text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-w-[200px]",
      secondary: "inline-flex justify-center py-3 px-8 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E67E4D]",
      text: "text-base font-medium text-[#E67E4D] hover:text-[#D86B3C]",
      navigation: "inline-flex items-center px-8 py-4 text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
    },
    colors: {
      primary: "#E67E4D",
      secondary: "#6B7280",
      accent: "#D86B3C",
      background: "#FFFFFF",
      text: "#111827",
      border: "#E5E7EB",
      error: "#EF4444",
      success: "#10B981"
    }
  },
  colorful: {
    name: "colorful",
    containerLayout: "max-w-3xl mx-auto py-6 px-4 sm:px-6",
    header: "mb-10",
    title: "text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 text-center",
    description: "text-lg text-gray-700 mb-8 text-center",
    background: "bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50",
    card: "bg-white shadow-lg rounded-2xl p-8 mb-8 border border-purple-100",
    container: {
      card: "bg-white border border-purple-200 rounded-2xl shadow-sm",
      border: "border-purple-200",
      activeBorder: "border-purple-500",
      activeBg: "bg-purple-50",
      header: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    field: {
      label: "block text-base font-semibold text-gray-800 mb-3",
      input: "w-full rounded-xl border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-3 px-4",
      description: "mt-2 text-sm text-gray-600",
      error: "mt-2 text-sm text-red-600 font-medium",
      radio: "focus:ring-purple-500 h-5 w-5 text-purple-600 border-purple-300",
      checkbox: "focus:ring-purple-500 h-5 w-5 text-purple-600 border-purple-300 rounded-md",
      select: "w-full rounded-xl border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-3 px-4",
      textarea: "w-full rounded-xl border-purple-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-base py-3 px-4",
      file: "w-full text-base text-gray-900 border border-purple-200 rounded-xl cursor-pointer bg-purple-50 py-3 px-4",
      matrix: "border-collapse w-full text-base rounded-xl overflow-hidden",
      range: "accent-purple-600",
      text: "text-gray-800",
      activeText: "text-purple-600",
      placeholder: "text-gray-400",
      boxBorder: "border-purple-300",
      // SelectableBox colorful styles
      selectableBox: "p-6 transition-all duration-300 cursor-pointer rounded-2xl transform hover:scale-105",
      selectableBoxDefault: "border-2 border-purple-200 bg-white shadow-sm",
      selectableBoxSelected: "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg ring-2 ring-purple-200",
      selectableBoxHover: "hover:border-purple-400 hover:shadow-md",
      selectableBoxFocus: "focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2",
      selectableBoxDisabled: "opacity-50 cursor-not-allowed transform-none",
      selectableBoxContainer: "",
      selectableBoxText: "text-gray-800 text-base font-semibold",
      selectableBoxTextSelected: "text-purple-700 font-bold",
      selectableBoxIndicator: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg",
      selectableBoxIndicatorIcon: "text-white"
    },
    progress: {
      bar: "h-3 bg-[#3B82F6] rounded-full overflow-hidden",
      dots: "flex space-x-2 justify-center",
      numbers: "flex space-x-2 justify-center",
      percentage: "text-right text-base text-purple-600 font-semibold mb-2",
      label: "text-base text-gray-700 mb-2 font-medium"
    },
    button: {
      primary: "inline-flex justify-center py-3 px-8 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-200",
      secondary: "inline-flex justify-center py-3 px-8 border-2 border-purple-200 text-base font-semibold rounded-xl text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
      text: "text-base font-semibold text-purple-600 hover:text-purple-700",
      navigation: "inline-flex items-center px-8 py-3 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-200"
    },
    colors: {
      primary: "#9333EA",
      secondary: "#6B7280",
      accent: "#EC4899",
      background: "#FFFFFF",
      text: "#1F2937",
      border: "#D1D5DB",
      error: "#EF4444",
      success: "#10B981"
    }
  },
  corporate: {
    name: "corporate",
    containerLayout: "max-w-4xl mx-auto py-8 px-6 sm:px-8",
    header: "mb-12",
    title: "text-3xl font-semibold text-slate-800 mb-6 text-center tracking-tight",
    description: "text-lg text-slate-600 mb-10 text-center max-w-2xl mx-auto leading-relaxed",
    background: "bg-slate-50",
    card: "bg-white shadow-sm border border-slate-200 rounded-lg p-8 mb-8",
    container: {
      card: "bg-white border border-slate-200 rounded-lg",
      border: "border-slate-200",
      activeBorder: "border-slate-600",
      activeBg: "bg-slate-50",
      header: "bg-slate-100"
    },
    field: {
      label: "block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide",
      input: "w-full rounded-md border-slate-300 shadow-sm focus:border-slate-600 focus:ring-slate-600 text-base py-3 px-4",
      description: "mt-2 text-sm text-slate-500",
      error: "mt-2 text-sm text-red-600 font-medium",
      radio: "focus:ring-slate-600 h-4 w-4 text-slate-600 border-slate-300",
      checkbox: "focus:ring-slate-600 h-4 w-4 text-slate-600 border-slate-300 rounded",
      select: "w-full rounded-md border-slate-300 shadow-sm focus:border-slate-600 focus:ring-slate-600 text-base py-3 px-4",
      textarea: "w-full rounded-md border-slate-300 shadow-sm focus:border-slate-600 focus:ring-slate-600 text-base py-3 px-4",
      file: "w-full text-base text-slate-900 border border-slate-300 rounded-md cursor-pointer bg-slate-50 py-3 px-4",
      matrix: "border-collapse w-full text-base",
      range: "accent-slate-600",
      text: "text-slate-900",
      activeText: "text-slate-600",
      placeholder: "text-slate-400",
      boxBorder: "border-slate-300",
      // SelectableBox corporate styles
      selectableBox: "p-5 transition-all duration-200 cursor-pointer rounded-lg",
      selectableBoxDefault: "border border-slate-300 bg-white shadow-sm",
      selectableBoxSelected: "border-slate-600 bg-slate-50 shadow-md",
      selectableBoxHover: "hover:border-slate-400 hover:shadow-sm",
      selectableBoxFocus: "focus-within:ring-2 focus-within:ring-slate-600 focus-within:ring-offset-2",
      selectableBoxDisabled: "opacity-50 cursor-not-allowed",
      selectableBoxContainer: "",
      selectableBoxText: "text-slate-900 font-medium tracking-wide",
      selectableBoxTextSelected: "text-slate-700 font-semibold",
      selectableBoxIndicator: "bg-slate-600 text-white",
      selectableBoxIndicatorIcon: "text-white"
    },
    progress: {
      bar: "h-2 bg-slate-200 rounded overflow-hidden",
      dots: "flex space-x-3 justify-center",
      numbers: "flex space-x-3 justify-center",
      percentage: "text-right text-sm text-slate-600 font-semibold mb-2",
      label: "text-sm text-slate-600 mb-2 font-medium"
    },
    button: {
      primary: "inline-flex justify-center py-3 px-6 text-base font-semibold rounded-md text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200",
      secondary: "inline-flex justify-center py-3 px-6 border border-slate-300 text-base font-semibold rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
      text: "text-base font-semibold text-slate-600 hover:text-slate-700",
      navigation: "inline-flex items-center px-6 py-3 text-base font-semibold rounded-md text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200"
    },
    colors: {
      primary: "#475569",
      secondary: "#64748B",
      accent: "#334155",
      background: "#F8FAFC",
      text: "#1E293B",
      border: "#CBD5E1",
      error: "#DC2626",
      success: "#059669"
    }
  },
  dark: {
    name: "dark",
    containerLayout: "max-w-2xl mx-auto py-6 px-4 sm:px-6",
    header: "mb-10",
    title: "text-3xl font-bold text-white mb-6 text-center",
    description: "text-lg text-gray-300 mb-8 text-center",
    background: "bg-gray-900",
    card: "bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8",
    container: {
      card: "bg-gray-800 border border-gray-700 rounded-lg",
      border: "border-gray-700",
      activeBorder: "border-blue-400",
      activeBg: "bg-gray-700",
      header: "bg-gray-700"
    },
    field: {
      label: "block text-sm font-medium text-gray-200 mb-2",
      input: "w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring-blue-400 text-base py-3 px-4",
      description: "mt-2 text-sm text-gray-400",
      error: "mt-2 text-sm text-red-400 font-medium",
      radio: "focus:ring-blue-400 h-4 w-4 text-blue-500 border-gray-600 bg-gray-700",
      checkbox: "focus:ring-blue-400 h-4 w-4 text-blue-500 border-gray-600 bg-gray-700 rounded",
      select: "w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring-blue-400 text-base py-3 px-4",
      textarea: "w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring-blue-400 text-base py-3 px-4",
      file: "w-full text-base text-gray-200 border border-gray-600 bg-gray-700 rounded-md cursor-pointer py-3 px-4",
      matrix: "border-collapse w-full text-base",
      range: "accent-blue-500",
      text: "text-gray-200",
      activeText: "text-blue-400",
      placeholder: "text-gray-500",
      boxBorder: "border-gray-600",
      // SelectableBox dark styles
      selectableBox: "p-5 transition-all duration-200 cursor-pointer rounded-lg",
      selectableBoxDefault: "border border-gray-600 bg-gray-800",
      selectableBoxSelected: "border-blue-400 bg-gray-700 ring-1 ring-blue-400/50",
      selectableBoxHover: "hover:border-gray-500 hover:bg-gray-750",
      selectableBoxFocus: "focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-gray-900",
      selectableBoxDisabled: "opacity-50 cursor-not-allowed",
      selectableBoxContainer: "",
      selectableBoxText: "text-gray-200 font-medium",
      selectableBoxTextSelected: "text-blue-300 font-semibold",
      selectableBoxIndicator: "bg-blue-500 text-gray-900",
      selectableBoxIndicatorIcon: "text-gray-900"
    },
    progress: {
      bar: "h-2 bg-gray-700 rounded overflow-hidden",
      dots: "flex space-x-2 justify-center",
      numbers: "flex space-x-2 justify-center",
      percentage: "text-right text-sm text-gray-300 font-medium mb-2",
      label: "text-sm text-gray-300 mb-2"
    },
    button: {
      primary: "inline-flex justify-center py-3 px-6 text-base font-medium rounded-md text-gray-900 bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors duration-200",
      secondary: "inline-flex justify-center py-3 px-6 border border-gray-600 text-base font-medium rounded-md text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900",
      text: "text-base font-medium text-blue-400 hover:text-blue-300",
      navigation: "inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-gray-900 bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors duration-200"
    },
    colors: {
      primary: "#3B82F6",
      secondary: "#6B7280",
      accent: "#60A5FA",
      background: "#111827",
      text: "#F9FAFB",
      border: "#374151",
      error: "#F87171",
      success: "#34D399"
    }
  },
  custom: void 0
};
var FIELD_PRESETS = {
  label: [
    { name: "Default", value: "block text-sm font-medium text-gray-700 mb-2" },
    { name: "Bold", value: "block text-base font-semibold text-gray-900 mb-3" },
    { name: "Uppercase", value: "block text-xs font-bold uppercase tracking-wide text-gray-700 mb-2" },
    { name: "Minimal", value: "block text-sm font-normal text-gray-600 mb-1" }
  ],
  input: [
    { name: "Default", value: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" },
    { name: "Modern", value: "w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-colors" },
    { name: "Minimal", value: "w-full border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 px-0 py-2" },
    { name: "Floating", value: "w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none" }
  ],
  select: [
    { name: "Default", value: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" },
    { name: "Modern", value: "w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-colors" },
    { name: "Minimal", value: "w-full border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 px-0 py-2" },
    { name: "Floating", value: "w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none appearance-none" }
  ],
  checkbox: [
    { name: "Default", value: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" },
    { name: "Large", value: "focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded-md" },
    { name: "Square", value: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-none" },
    { name: "Minimal", value: "focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-400 rounded" }
  ],
  radio: [
    { name: "Default", value: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" },
    { name: "Large", value: "focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300" },
    { name: "Colorful", value: "focus:ring-purple-500 h-5 w-5 text-purple-600 border-purple-300" },
    { name: "Minimal", value: "focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-400" }
  ],
  textarea: [
    { name: "Default", value: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" },
    { name: "Modern", value: "w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-colors" },
    { name: "Minimal", value: "w-full border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 px-0 py-2 resize-none" },
    { name: "Large", value: "w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none min-h-[120px]" }
  ],
  button: [
    { name: "Default", value: "inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700" },
    { name: "Pill", value: "inline-flex justify-center py-3 px-8 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700" },
    { name: "Gradient", value: "inline-flex justify-center py-3 px-6 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" },
    { name: "Outline", value: "inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-50" }
  ],
  card: [
    { name: "Default", value: "bg-white shadow-sm rounded-lg p-6 mb-6" },
    { name: "Bordered", value: "bg-white border-2 border-gray-200 rounded-xl p-8 mb-6" },
    { name: "Floating", value: "bg-white shadow-lg rounded-2xl p-8 mb-8 hover:shadow-xl transition-shadow" },
    { name: "Minimal", value: "bg-transparent border-b border-gray-200 pb-6 mb-6" }
  ],
  selectableBox: [
    { name: "Default", value: "p-4 transition-all duration-200 hover:shadow-sm cursor-pointer border border-gray-300 bg-white rounded-md" },
    { name: "Modern", value: "p-6 transition-all duration-300 cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm hover:scale-[1.02]" },
    { name: "Minimal", value: "p-6 transition-all duration-200 cursor-pointer border-b border-gray-100 bg-white hover:bg-gray-50" },
    { name: "Card Style", value: "p-6 transition-all duration-300 cursor-pointer rounded-2xl border-2 border-purple-200 bg-white shadow-sm hover:scale-105" },
    { name: "Corporate", value: "p-5 transition-all duration-200 cursor-pointer rounded-lg border border-slate-300 bg-white shadow-sm" },
    { name: "Dark", value: "p-5 transition-all duration-200 cursor-pointer rounded-lg border border-gray-600 bg-gray-800" }
  ]
};
var ThemePreview = ({ theme, state }) => /* @__PURE__ */ import_react7.default.createElement(Card, { className: "h-fit sticky top-4" }, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, { className: "text-lg" }, "Live Preview"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "See your changes in real-time")), /* @__PURE__ */ import_react7.default.createElement(CardContent, null, state.rootNode ? /* @__PURE__ */ import_react7.default.createElement(
  import_src.SurveyForm,
  {
    survey: state,
    layout: "fullpage",
    enableDebug: false,
    progressBar: {
      type: "percentage",
      showPercentage: true,
      showStepInfo: true,
      position: "top"
    }
  }
) : /* @__PURE__ */ import_react7.default.createElement("p", null, "Add some blocks to see survey in action")));
var ThemeBuilder = ({ onDataChange }) => {
  var _a;
  const { state, updateTheme, exportSurvey } = useSurveyBuilder();
  const [currentTheme, setCurrentTheme] = (0, import_react8.useState)(state.theme);
  const [copySuccess, setCopySuccess] = (0, import_react8.useState)(null);
  const [selectedPreset, setSelectedPreset] = (0, import_react8.useState)(state.theme.name);
  const [showPreview, setShowPreview] = (0, import_react8.useState)(true);
  const [editMode, setEditMode] = (0, import_react8.useState)("visual");
  (0, import_react8.useEffect)(() => {
    setCurrentTheme(state.theme);
    setSelectedPreset(state.theme.name);
  }, [state.theme]);
  import_react7.default.useEffect(() => {
    onDataChange == null ? void 0 : onDataChange(exportSurvey());
  }, [state.rootNode, state.localizations, onDataChange]);
  const handleThemeUpdate = (updatedTheme) => {
    const newTheme = { ...currentTheme, ...updatedTheme };
    setCurrentTheme(newTheme);
    updateTheme(newTheme);
  };
  const handlePresetChange = (presetName) => {
    const preset = themePresets[presetName];
    if (preset) {
      setSelectedPreset(presetName);
      setCurrentTheme(preset);
      updateTheme(preset);
    }
  };
  const updateNestedProperty = (section, key, value) => {
    if (section === "colors" || section === "field" || section === "container" || section === "progress" || section === "button") {
      const updatedSection = {
        ...currentTheme[section],
        [key]: value
      };
      handleThemeUpdate({ [section]: updatedSection });
    } else {
      handleThemeUpdate({ [section]: value });
    }
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(currentTheme, null, 2));
    setCopySuccess("Theme copied to clipboard!");
    setTimeout(() => setCopySuccess(null), 3e3);
  };
  const handleExportTheme = () => {
    const dataStr = JSON.stringify(currentTheme, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentTheme.name}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleImportTheme = (event) => {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a3;
        try {
          const importedTheme = JSON.parse((_a3 = e.target) == null ? void 0 : _a3.result);
          setCurrentTheme(importedTheme);
          updateTheme(importedTheme);
          setSelectedPreset(importedTheme.name || "custom");
        } catch (error) {
          console.error("Error parsing theme file:", error);
        }
      };
      reader.readAsText(file);
    }
  };
  const handleResetToPreset = () => {
    if (selectedPreset !== "custom") {
      handlePresetChange(selectedPreset);
    }
  };
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "min-h-screen bg-gray-50" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "lg:grid lg:grid-cols-12 lg:gap-6 lg:p-6 min-h-full" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "lg:col-span-8 space-y-6 p-4 lg:p-0" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: handleResetToPreset,
      className: "flex items-center gap-2"
    },
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.RefreshCw, { className: "w-4 h-4" }),
    "Reset"
  ), /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: handleExportTheme,
      className: "flex items-center gap-2"
    },
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Download, { className: "w-4 h-4" }),
    "Export"
  ), /* @__PURE__ */ import_react7.default.createElement("label", { className: "cursor-pointer" }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      asChild: true,
      className: "flex items-center gap-2"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", null, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Upload, { className: "w-4 h-4" }), "Import")
  ), /* @__PURE__ */ import_react7.default.createElement(
    "input",
    {
      type: "file",
      accept: ".json",
      onChange: handleImportTheme,
      className: "hidden"
    }
  ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(
    ToggleGroup,
    {
      type: "single",
      value: editMode,
      onValueChange: (val) => val && setEditMode(val)
    },
    /* @__PURE__ */ import_react7.default.createElement(ToggleGroupItem, { value: "visual", className: "data-[state=on]:bg-blue-100" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Palette, { className: "w-4 h-4 mr-1" }), "Visual"),
    /* @__PURE__ */ import_react7.default.createElement(ToggleGroupItem, { value: "code", className: "data-[state=on]:bg-blue-100" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Type, { className: "w-4 h-4 mr-1" }), "Code")
  ), /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => setShowPreview(!showPreview),
      className: "flex lg:hidden items-center gap-2"
    },
    showPreview ? /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Eye, { className: "w-4 h-4" }),
    "Preview"
  ))), copySuccess && /* @__PURE__ */ import_react7.default.createElement(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800" }, /* @__PURE__ */ import_react7.default.createElement(AlertDescription, null, copySuccess)), /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Sparkles, { className: "w-5 h-5" }), "Theme Presets"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Choose a preset theme or create your own custom design")), /* @__PURE__ */ import_react7.default.createElement(CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" }, Object.entries(themePresets).filter(([_, preset]) => preset !== void 0).map(([key, preset]) => /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      key,
      onClick: () => handlePresetChange(key),
      className: `p-4 rounded-lg border-2 transition-all hover:scale-105 ${selectedPreset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`
    },
    /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-sm font-medium text-start capitalize" }, preset.name),
    /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-2 flex gap-1" }, /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "w-3 h-3 rounded-full border",
        style: { backgroundColor: preset.colors.primary }
      }
    ), /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "w-3 h-3 rounded-full border",
        style: { backgroundColor: preset.colors.secondary }
      }
    ), /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "w-3 h-3 rounded-full border",
        style: { backgroundColor: preset.colors.accent }
      }
    ))
  ))))), editMode === "visual" ? /* @__PURE__ */ import_react7.default.createElement(Tabs, { defaultValue: "colors", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(TabsList, { className: "grid w-full grid-cols-6" }, /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "colors", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Palette, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden sm:inline" }, "Colors")), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "layout", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Layout, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden sm:inline" }, "Layout")), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "typography", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Type, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden sm:inline" }, "Typography")), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "fields", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Package, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden sm:inline" }, "Fields")), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "buttons", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.MousePointer, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden sm:inline" }, "Buttons")), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "progress", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.BarChart3, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden sm:inline" }, "Progress"))), /* @__PURE__ */ import_react7.default.createElement(TabsContent, { value: "colors", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Color Palette"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Click on any color to customize it with the visual picker")), /* @__PURE__ */ import_react7.default.createElement(CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, Object.entries(currentTheme.colors).map(([key, value]) => /* @__PURE__ */ import_react7.default.createElement("div", { key, className: "space-y-2" }, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "capitalize flex items-center gap-2" }, key, /* @__PURE__ */ import_react7.default.createElement(PopoverRoot, null, /* @__PURE__ */ import_react7.default.createElement(PopoverTrigger, null, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Info, { className: "w-3 h-3 text-gray-400" })), /* @__PURE__ */ import_react7.default.createElement(PopoverContent, { className: "text-sm" }, key === "primary" && "Main brand color used for primary actions", key === "secondary" && "Supporting color for secondary elements", key === "accent" && "Highlight color for special elements", key === "background" && "Main background color", key === "text" && "Primary text color", key === "border" && "Default border color", key === "error" && "Color for error messages", key === "success" && "Color for success messages"))), /* @__PURE__ */ import_react7.default.createElement(PopoverRoot, null, /* @__PURE__ */ import_react7.default.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      variant: "outline",
      className: "w-full h-12 justify-between"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-sm font-mono" }, value),
    /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        className: "w-8 h-8 rounded border",
        style: { backgroundColor: value }
      }
    )
  )), /* @__PURE__ */ import_react7.default.createElement(PopoverContent, { className: "w-80" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Quick Colors"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-6 gap-2 mt-2" }, COLOR_PRESETS.map((preset) => /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      key: preset.value,
      className: "w-10 h-10 rounded border-2 hover:scale-110 transition-transform",
      style: { backgroundColor: preset.value },
      onClick: () => updateNestedProperty("colors", key, preset.value),
      title: preset.name
    }
  )))), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Custom Color"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ import_react7.default.createElement(
    "input",
    {
      type: "color",
      value,
      onChange: (e) => updateNestedProperty("colors", key, e.target.value),
      className: "w-20 h-10 rounded cursor-pointer"
    }
  ), /* @__PURE__ */ import_react7.default.createElement(
    Input,
    {
      value,
      onChange: (e) => updateNestedProperty("colors", key, e.target.value),
      placeholder: "#000000"
    }
  )))))))))))), /* @__PURE__ */ import_react7.default.createElement(TabsContent, { value: "layout", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Container & Layout"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Configure the overall structure and spacing")), /* @__PURE__ */ import_react7.default.createElement(CardContent, { className: "space-y-6" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Grid3X3, { className: "w-4 h-4" }), "Container Width"), /* @__PURE__ */ import_react7.default.createElement(
    Select,
    {
      value: ((_a = currentTheme.containerLayout.match(/max-w-\w+/)) == null ? void 0 : _a[0]) || "max-w-2xl",
      onValueChange: (val) => {
        const newLayout = currentTheme.containerLayout.replace(/max-w-\w+/, val);
        handleThemeUpdate({ containerLayout: newLayout });
      }
    },
    /* @__PURE__ */ import_react7.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react7.default.createElement(SelectValue, null)),
    /* @__PURE__ */ import_react7.default.createElement(SelectContent, null, PRESET_OPTIONS.containerWidth.map((opt) => /* @__PURE__ */ import_react7.default.createElement(SelectItem, { key: opt.value, value: opt.value }, opt.label)))
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Background Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.background,
      onChange: (val) => handleThemeUpdate({ background: val }),
      presetType: "card"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, null, "Card Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.card,
      onChange: (val) => handleThemeUpdate({ card: val }),
      presetType: "card"
    }
  )))))), /* @__PURE__ */ import_react7.default.createElement(TabsContent, { value: "typography", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Typography Settings"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Customize text styles for headers and descriptions")), /* @__PURE__ */ import_react7.default.createElement(CardContent, { className: "space-y-6" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "mb-2" }, "Title Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.title,
      onChange: (val) => handleThemeUpdate({ title: val }),
      presetType: "label"
    }
  )), /* @__PURE__ */ import_react7.default.createElement(Separator2, null), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "mb-2" }, "Description Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.description,
      onChange: (val) => handleThemeUpdate({ description: val }),
      presetType: "label"
    }
  ))))), /* @__PURE__ */ import_react7.default.createElement(TabsContent, { value: "fields", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Form Field Styles"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Customize each form element type with visual tools")), /* @__PURE__ */ import_react7.default.createElement(CardContent, null, /* @__PURE__ */ import_react7.default.createElement(Tabs, { defaultValue: "label", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(TabsList, { className: "grid grid-cols-3 lg:grid-cols-7 gap-1" }, /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "label" }, "Label"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "input" }, "Input"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "select" }, "Select"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "checkbox" }, "Checkbox"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "radio" }, "Radio"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "textarea" }, "Textarea"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "selectableBox", className: "flex items-center gap-1" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.CheckSquare, { className: "w-3 h-3" }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "hidden lg:inline" }, "Box"))), Object.entries({
    label: "label",
    input: "input",
    select: "select",
    checkbox: "checkbox",
    radio: "radio",
    textarea: "textarea",
    selectableBox: "selectableBox"
  }).map(([key, presetKey]) => /* @__PURE__ */ import_react7.default.createElement(TabsContent, { key, value: key }, key === "selectableBox" ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react7.default.createElement(Alert, null, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.CheckSquare, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement(AlertDescription, null, "Customize the appearance of selectable box questions. These settings affect the overall container, selected state, hover effects, and more.")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 gap-6" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-base font-semibold mb-3 block" }, "Base Box Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBox || "",
      onChange: (val) => updateNestedProperty("field", "selectableBox", val),
      presetType: "selectableBox"
    }
  )), /* @__PURE__ */ import_react7.default.createElement(Separator2, null), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Default State"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxDefault || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxDefault", val),
      presetType: "selectableBox"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Selected State"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxSelected || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxSelected", val),
      presetType: "selectableBox"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Hover Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxHover || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxHover", val),
      presetType: "selectableBox"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Focus Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxFocus || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxFocus", val),
      presetType: "selectableBox"
    }
  ))), /* @__PURE__ */ import_react7.default.createElement(Separator2, null), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Text Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxText || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxText", val),
      presetType: "label"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Selected Text Style"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxTextSelected || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxTextSelected", val),
      presetType: "label"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Selection Indicator"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxIndicator || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxIndicator", val),
      presetType: "button"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "text-sm font-medium mb-2 block" }, "Indicator Icon"), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field.selectableBoxIndicatorIcon || "",
      onChange: (val) => updateNestedProperty("field", "selectableBoxIndicatorIcon", val),
      presetType: "label"
    }
  ))))) : /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.field[key],
      onChange: (val) => updateNestedProperty("field", key, val),
      presetType: presetKey
    }
  ))))))), /* @__PURE__ */ import_react7.default.createElement(TabsContent, { value: "buttons", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Button Styles"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Design your buttons with visual customization tools")), /* @__PURE__ */ import_react7.default.createElement(CardContent, null, /* @__PURE__ */ import_react7.default.createElement(Tabs, { defaultValue: "primary", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(TabsList, { className: "grid grid-cols-4" }, /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "primary" }, "Primary"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "secondary" }, "Secondary"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "text" }, "Text"), /* @__PURE__ */ import_react7.default.createElement(TabsTrigger, { value: "navigation" }, "Navigation")), Object.entries(currentTheme.button).map(([key]) => /* @__PURE__ */ import_react7.default.createElement(TabsContent, { key, value: key }, /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value: currentTheme.button[key],
      onChange: (val) => updateNestedProperty("button", key, val),
      presetType: "button"
    }
  ))))))), /* @__PURE__ */ import_react7.default.createElement(TabsContent, { value: "progress", className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Progress Indicators"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Style progress bars and navigation elements")), /* @__PURE__ */ import_react7.default.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 gap-6" }, Object.entries(currentTheme.progress).map(([key, value]) => /* @__PURE__ */ import_react7.default.createElement("div", { key }, /* @__PURE__ */ import_react7.default.createElement(Label, { className: "capitalize mb-2" }, key.replace(/([A-Z])/g, " $1").trim()), /* @__PURE__ */ import_react7.default.createElement(
    VisualStyleBuilder,
    {
      value,
      onChange: (val) => updateNestedProperty("progress", key, val),
      presetType: "label"
    }
  )))))))) : /* @__PURE__ */ import_react7.default.createElement(Card, null, /* @__PURE__ */ import_react7.default.createElement(CardHeader, null, /* @__PURE__ */ import_react7.default.createElement(CardTitle, null, "Advanced Code Editor"), /* @__PURE__ */ import_react7.default.createElement(CardDescription, null, "Edit the theme JSON directly for full control")), /* @__PURE__ */ import_react7.default.createElement(CardContent, null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react7.default.createElement(Alert, null, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.Info, { className: "w-4 h-4" }), /* @__PURE__ */ import_react7.default.createElement(AlertDescription, null, "Changes made here will be applied immediately. Make sure your JSON is valid!")), /* @__PURE__ */ import_react7.default.createElement(
    Textarea,
    {
      value: JSON.stringify(currentTheme, null, 2),
      onChange: (e) => {
        try {
          const parsed = JSON.parse(e.target.value);
          setCurrentTheme(parsed);
          updateTheme(parsed);
        } catch (error) {
        }
      },
      className: "font-mono text-sm min-h-[400px]",
      spellCheck: false
    }
  ), /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react7.default.createElement(
    Button,
    {
      variant: "outline",
      size: "sm",
      onClick: handleCopyToClipboard,
      className: "flex items-center gap-2"
    },
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react7.ClipboardCopy, { className: "w-4 h-4" }),
    "Copy JSON"
  ), /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-sm text-gray-500" }, Object.keys(currentTheme).length, " properties"))))), showPreview && /* @__PURE__ */ import_react7.default.createElement("div", { className: "lg:hidden" }, /* @__PURE__ */ import_react7.default.createElement(ThemePreview, { theme: currentTheme, state }))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "hidden lg:block lg:col-span-4 min-h-9/10" }, /* @__PURE__ */ import_react7.default.createElement(ThemePreview, { theme: currentTheme, state }))));
};

// src/survey/SurveyBuilder.tsx
var SurveyBuilder = ({
  initialData,
  onDataChange,
  blockDefinitions = [],
  nodeDefinitions = []
}) => {
  return /* @__PURE__ */ import_react9.default.createElement(SurveyBuilderProvider, { initialData }, /* @__PURE__ */ import_react9.default.createElement(
    SurveyBuilderContent,
    {
      onDataChange,
      blockDefinitions,
      nodeDefinitions
    }
  ));
};
var SurveyBuilderContent = ({
  onDataChange,
  blockDefinitions = [],
  nodeDefinitions = []
}) => {
  const {
    state,
    addBlockDefinition,
    addNodeDefinition,
    initSurvey,
    createNode,
    setDisplayMode,
    exportSurvey
  } = useSurveyBuilder();
  const [isPanelOpen, setIsPanelOpen] = (0, import_react9.useState)(false);
  const [isThemeBuilderOpen, setIsThemeBuilderOpen] = (0, import_react9.useState)(false);
  import_react9.default.useEffect(() => {
    const existing = new Set(Object.keys(state.definitions.blocks));
    blockDefinitions.forEach((def) => {
      if (!existing.has(def.type)) {
        addBlockDefinition(def.type, def);
      }
    });
  }, [blockDefinitions, state.definitions.blocks, addBlockDefinition]);
  import_react9.default.useEffect(() => {
    const existing = new Set(Object.keys(state.definitions.nodes));
    nodeDefinitions.forEach((def) => {
      if (!existing.has(def.type)) {
        addNodeDefinition(def.type, def);
      }
    });
  }, [nodeDefinitions, state.definitions.nodes, addNodeDefinition]);
  import_react9.default.useEffect(() => {
    onDataChange == null ? void 0 : onDataChange(exportSurvey());
  }, [state.rootNode, state.localizations, onDataChange]);
  const handleCreateRootNode = import_react9.default.useCallback(() => {
    if (!state.rootNode && Object.keys(state.definitions.nodes).length > 0) {
      initSurvey();
    }
  }, [state.rootNode, state.definitions.nodes, createNode]);
  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
  };
  return /* @__PURE__ */ import_react9.default.createElement("div", { className: "survey-builder h-full flex flex-col pb-5" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "survey-builder-header flex items-center justify-between p-4 bg-card border-b" }, /* @__PURE__ */ import_react9.default.createElement("h2", { className: "text-xl font-bold" }, "Form Builder"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react9.default.createElement(
    Tabs,
    {
      value: state.displayMode,
      onValueChange: (v) => handleDisplayModeChange(v),
      className: "mr-4"
    },
    /* @__PURE__ */ import_react9.default.createElement(TabsList, null, /* @__PURE__ */ import_react9.default.createElement(TabsTrigger, { value: "list" }, "List View"), /* @__PURE__ */ import_react9.default.createElement(TabsTrigger, { value: "graph" }, "Graph View"), /* @__PURE__ */ import_react9.default.createElement(TabsTrigger, { value: "lang" }, "Localizations"))
  ), /* @__PURE__ */ import_react9.default.createElement(Sheet, { open: isThemeBuilderOpen, onOpenChange: setIsThemeBuilderOpen }, /* @__PURE__ */ import_react9.default.createElement(SheetTrigger, { asChild: true }, /* @__PURE__ */ import_react9.default.createElement(Button, { type: "button", variant: "outline" }, "Theme Builder")), /* @__PURE__ */ import_react9.default.createElement(SheetContent, { side: "right", className: "w-full" }, /* @__PURE__ */ import_react9.default.createElement(SheetHeader, null, /* @__PURE__ */ import_react9.default.createElement(SheetTitle, null, "Theme Builder")), /* @__PURE__ */ import_react9.default.createElement(ThemeBuilder, { onDataChange }))), /* @__PURE__ */ import_react9.default.createElement(Sheet, { open: isPanelOpen, onOpenChange: setIsPanelOpen }, /* @__PURE__ */ import_react9.default.createElement(SheetTrigger, { asChild: true }, /* @__PURE__ */ import_react9.default.createElement(Button, { type: "button", variant: "outline" }, "Tools")), /* @__PURE__ */ import_react9.default.createElement(SheetContent, { side: "right", className: "w-[540px] sm:w-[540px]" }, /* @__PURE__ */ import_react9.default.createElement(SheetHeader, null, /* @__PURE__ */ import_react9.default.createElement(SheetTitle, null, "Tools")), /* @__PURE__ */ import_react9.default.createElement(Tabs, { defaultValue: "blocks", className: "mt-4" }, /* @__PURE__ */ import_react9.default.createElement(TabsList, { className: "mb-4" }, /* @__PURE__ */ import_react9.default.createElement(TabsTrigger, { value: "blocks" }, "Block Library"), /* @__PURE__ */ import_react9.default.createElement(TabsTrigger, { value: "json" }, "JSON")), /* @__PURE__ */ import_react9.default.createElement(TabsContent, { value: "blocks", className: "overflow-y-scroll" }, /* @__PURE__ */ import_react9.default.createElement(BlockLibrary, null)), /* @__PURE__ */ import_react9.default.createElement(TabsContent, { value: "json" }, /* @__PURE__ */ import_react9.default.createElement(JsonEditor, null))))), !state.rootNode && /* @__PURE__ */ import_react9.default.createElement(Button, { type: "button", onClick: handleCreateRootNode }, "Create Form"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "survey-builder-content flex-grow p-4 overflow-auto" }, state.displayMode === "list" && /* @__PURE__ */ import_react9.default.createElement("div", { className: "survey-list space-y-4" }, state.rootNode ? /* @__PURE__ */ import_react9.default.createElement(SurveyNode, { data: state.rootNode }) : /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-center p-12 bg-muted rounded-lg" }, /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-lg font-semibold mb-4" }, "No Form Created"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-muted-foreground mb-6" }, 'Click "Create Form" to start building your Form.'), /* @__PURE__ */ import_react9.default.createElement(Button, { type: "button", onClick: handleCreateRootNode }, "Create Form"))), state.displayMode === "graph" && /* @__PURE__ */ import_react9.default.createElement("div", { className: "survey-graph" }, state.rootNode ? /* @__PURE__ */ import_react9.default.createElement("div", { className: "h-full flex flex-col" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-sm text-muted-foreground mb-4 bg-muted rounded-md p-3" }, /* @__PURE__ */ import_react9.default.createElement("p", null, "This graph view shows the structure of your survey, including sections, pages, and blocks. Conditional paths are shown with dashed lines."), /* @__PURE__ */ import_react9.default.createElement("p", { className: "mt-1" }, "You can zoom and pan to explore the graph. Hover over nodes to see more details.")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex-grow" }, /* @__PURE__ */ import_react9.default.createElement(SurveyGraph, { rootNode: state.rootNode }))) : /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-center p-12 bg-muted rounded-lg" }, /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-lg font-semibold mb-4" }, "No Survey Created"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-muted-foreground mb-6" }, "Create a survey first to see the graph visualization."), /* @__PURE__ */ import_react9.default.createElement(Button, { type: "button", onClick: handleCreateRootNode }, "Create Survey"))), state.displayMode === "lang" && /* @__PURE__ */ import_react9.default.createElement("div", { className: "survey-lang" }, /* @__PURE__ */ import_react9.default.createElement(LocalizationEditor, null))));
};

// src/components/blocks/TextInputBlock.tsx
var import_lucide_react8 = require("lucide-react");
var import_uuid3 = require("uuid");
var TextInputBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "question1"
    }
  ), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "placeholder" }, "Placeholder"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "placeholder",
      value: data.placeholder || "",
      onChange: (e) => handleChange("placeholder", e.target.value),
      placeholder: "Type your answer here..."
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "defaultValue" }, "Default Value"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "defaultValue",
      value: data.defaultValue || "",
      onChange: (e) => handleChange("defaultValue", e.target.value)
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )));
};
var TextInputBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, data.label && /* @__PURE__ */ React.createElement(Label, { htmlFor: data.fieldName }, data.label), data.description && /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ React.createElement(
    Input,
    {
      id: data.fieldName,
      name: data.fieldName,
      placeholder: data.placeholder,
      defaultValue: data.defaultValue
    }
  ));
};
var TextInputBlockPreview = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      placeholder: "Text input field",
      className: "w-4/5 max-w-full",
      disabled: true
    }
  ));
};
var TextInputBlock = {
  type: "textfield",
  name: "Text Input",
  description: "Single line text field for short answers",
  icon: /* @__PURE__ */ React.createElement(import_lucide_react8.LucideTextCursor, { className: "w-4 h-4" }),
  defaultData: {
    type: "textfield",
    fieldName: `textInput${(0, import_uuid3.v4)().substring(0, 4)}`,
    label: "Text Input Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: ""
  },
  renderItem: (props) => /* @__PURE__ */ React.createElement(TextInputBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ React.createElement(TextInputBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ React.createElement(TextInputBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/TextareaBlock.tsx
var import_react10 = __toESM(require("react"));
var import_lucide_react9 = require("lucide-react");
var import_uuid4 = require("uuid");
var TextareaBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react10.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "textArea1"
    }
  ), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ import_react10.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: "placeholder" }, "Placeholder"), /* @__PURE__ */ import_react10.default.createElement(
    Input,
    {
      id: "placeholder",
      value: data.placeholder || "",
      onChange: (e) => handleChange("placeholder", e.target.value),
      placeholder: "Type your answer here..."
    }
  )), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: "rows" }, "Rows"), /* @__PURE__ */ import_react10.default.createElement(
    Input,
    {
      id: "rows",
      type: "number",
      value: data.rows || "3",
      onChange: (e) => handleChange("rows", e.target.value),
      placeholder: "3",
      min: "2",
      max: "10"
    }
  ))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react10.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: "defaultValue" }, "Default Value"), /* @__PURE__ */ import_react10.default.createElement(
    Textarea,
    {
      id: "defaultValue",
      value: data.defaultValue || "",
      onChange: (e) => handleChange("defaultValue", e.target.value),
      placeholder: "Default response text",
      rows: 3
    }
  )));
};
var TextareaBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, data.label && /* @__PURE__ */ import_react10.default.createElement(Label, { htmlFor: data.fieldName }, data.label), data.description && /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react10.default.createElement(
    Textarea,
    {
      id: data.fieldName,
      name: data.fieldName,
      placeholder: data.placeholder,
      defaultValue: data.defaultValue,
      rows: data.rows ? parseInt(data.rows, 10) : 3
    }
  ));
};
var TextareaBlockPreview = () => {
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react10.default.createElement(
    Textarea,
    {
      placeholder: "Multi-line text input",
      className: "w-4/5 max-w-full",
      rows: 2,
      disabled: true
    }
  ));
};
var TextareaBlock = {
  type: "textarea",
  name: "Text Area",
  description: "Multi-line text field for longer answers",
  icon: /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.AlignLeft, { className: "w-4 h-4" }),
  defaultData: {
    type: "textarea",
    fieldName: `textArea${(0, import_uuid4.v4)().substring(0, 4)}`,
    label: "Text Area Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: "",
    rows: "3"
  },
  renderItem: (props) => /* @__PURE__ */ import_react10.default.createElement(TextareaBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react10.default.createElement(TextareaBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react10.default.createElement(TextareaBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/RadioBlock.tsx
var import_react11 = __toESM(require("react"));

// src/components/ui/radio-group.tsx
var React23 = __toESM(require("react"));
var RadioGroupPrimitive = __toESM(require("@radix-ui/react-radio-group"));
var import_lucide_react10 = require("lucide-react");
var RadioGroup = React23.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React23.createElement(
    RadioGroupPrimitive.Root,
    {
      className: cn("", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React23.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React23.createElement(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    },
    /* @__PURE__ */ React23.createElement(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center" }, /* @__PURE__ */ React23.createElement(import_lucide_react10.Circle, { className: "h-3.5 w-3.5 fill-primary" }))
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// src/components/blocks/RadioBlock.tsx
var import_lucide_react11 = require("lucide-react");
var import_lucide_react12 = require("lucide-react");
var import_uuid5 = require("uuid");
var RadioBlockForm = ({
  data,
  onUpdate
}) => {
  const [newLabel, setNewLabel] = (0, import_react11.useState)("");
  const [newValue, setNewValue] = (0, import_react11.useState)("");
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleAddOption = () => {
    if (!newLabel.trim()) return;
    const labels = [...data.labels || []];
    const values = [...data.values || []];
    labels.push(newLabel);
    values.push(newValue || newLabel);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      labels,
      values
    });
    setNewLabel("");
    setNewValue("");
  };
  const handleRemoveOption = (index) => {
    const labels = [...data.labels || []];
    const values = [...data.values || []];
    labels.splice(index, 1);
    values.splice(index, 1);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      labels,
      values
    });
  };
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react11.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "radioOption1"
    }
  ), /* @__PURE__ */ import_react11.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react11.default.createElement(Label, { htmlFor: "label" }, "Question Label"), /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ import_react11.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react11.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react11.default.createElement(Label, null, "Options"), /* @__PURE__ */ import_react11.default.createElement("div", { className: "border rounded-md p-4 space-y-3" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-4" }, (data.labels || []).map((label, index) => /* @__PURE__ */ import_react11.default.createElement("div", { key: index, className: "flex items-center gap-2" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react11.default.createElement(import_lucide_react12.Circle, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      value: label,
      onChange: (e) => {
        const labels = [...data.labels || []];
        labels[index] = e.target.value;
        handleChange("labels", labels);
      },
      placeholder: "Option label"
    }
  ), /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      value: (data.values || [])[index],
      onChange: (e) => {
        const values = [...data.values || []];
        values[index] = e.target.value;
        handleChange("values", values);
      },
      placeholder: "Option value"
    }
  )), /* @__PURE__ */ import_react11.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: () => handleRemoveOption(index),
      className: "text-destructive"
    },
    /* @__PURE__ */ import_react11.default.createElement(import_lucide_react11.CircleX, { className: "h-4 w-4" })
  )))), /* @__PURE__ */ import_react11.default.createElement("div", { className: "pt-2 border-t mt-2" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex items-center gap-2 mt-2" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react11.default.createElement(import_lucide_react11.CirclePlus, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      value: newLabel,
      onChange: (e) => setNewLabel(e.target.value),
      placeholder: "New option label"
    }
  ), /* @__PURE__ */ import_react11.default.createElement(
    Input,
    {
      value: newValue,
      onChange: (e) => setNewValue(e.target.value),
      placeholder: "New option value (optional)"
    }
  )), /* @__PURE__ */ import_react11.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: handleAddOption
    },
    /* @__PURE__ */ import_react11.default.createElement(import_lucide_react11.CirclePlus, { className: "h-4 w-4 text-primary" })
  ))))));
};
var RadioBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: "space-y-4" }, data.label && /* @__PURE__ */ import_react11.default.createElement(Label, null, data.label), data.description && /* @__PURE__ */ import_react11.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react11.default.createElement(RadioGroup, { defaultValue: data.defaultValue, className: "grid gap-2" }, (data.labels || []).map((label, index) => /* @__PURE__ */ import_react11.default.createElement("div", { key: index, className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react11.default.createElement(
    RadioGroupItem,
    {
      value: (data.values || [])[index],
      id: `${data.fieldName}-${index}`
    }
  ), /* @__PURE__ */ import_react11.default.createElement(Label, { htmlFor: `${data.fieldName}-${index}` }, label)))));
};
var RadioBlockPreview = () => {
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react11.default.createElement(RadioGroup, { defaultValue: "1", className: "w-4/5 max-w-full space-y-1 grid gap-2" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react11.default.createElement(RadioGroupItem, { value: "1", id: "preview-1" }), /* @__PURE__ */ import_react11.default.createElement(Label, { htmlFor: "preview-1" }, "Option 1")), /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react11.default.createElement(RadioGroupItem, { value: "2", id: "preview-2" }), /* @__PURE__ */ import_react11.default.createElement(Label, { htmlFor: "preview-2" }, "Option 2"))));
};
var RadioBlock = {
  type: "radio",
  name: "Radio Buttons",
  description: "Single selection from multiple options",
  icon: /* @__PURE__ */ import_react11.default.createElement(import_lucide_react11.CircleCheck, { className: "w-4 h-4" }),
  defaultData: {
    type: "radio",
    fieldName: `radioOption${(0, import_uuid5.v4)().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: "1"
  },
  renderItem: (props) => /* @__PURE__ */ import_react11.default.createElement(RadioBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react11.default.createElement(RadioBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react11.default.createElement(RadioBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/CheckboxBlock.tsx
var import_react12 = __toESM(require("react"));
var import_lucide_react13 = require("lucide-react");
var import_uuid6 = require("uuid");
var CheckboxBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react12.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "checkboxField1"
    }
  ), /* @__PURE__ */ import_react12.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ import_react12.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Checkbox option"
    }
  ), /* @__PURE__ */ import_react12.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Text displayed next to the checkbox"))), /* @__PURE__ */ import_react12.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "value" }, "Value (when checked)"), /* @__PURE__ */ import_react12.default.createElement(
    Input,
    {
      id: "value",
      value: data.value || "",
      onChange: (e) => handleChange("value", e.target.value),
      placeholder: "true"
    }
  )), /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex items-center space-x-2 pt-8" }, /* @__PURE__ */ import_react12.default.createElement(
    Checkbox,
    {
      id: "defaultChecked",
      checked: !!data.defaultValue,
      onCheckedChange: (checked) => {
        handleChange("defaultValue", !!checked);
      }
    }
  ), /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "defaultChecked" }, "Default to checked"))), /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react12.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this option"
    }
  )), /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react12.default.createElement(
    Checkbox,
    {
      id: "showYesNo",
      checked: !!data.showYesNo,
      onCheckedChange: (checked) => {
        handleChange("showYesNo", !!checked);
      }
    }
  ), /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "showYesNo" }, "Show Yes/No labels")), data.showYesNo && /* @__PURE__ */ import_react12.default.createElement("div", { className: "grid grid-cols-2 gap-4 mt-2" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "trueLabel" }, "Yes Label"), /* @__PURE__ */ import_react12.default.createElement(
    Input,
    {
      id: "trueLabel",
      value: data.trueLabel || "Yes",
      onChange: (e) => handleChange("trueLabel", e.target.value)
    }
  )), /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "falseLabel" }, "No Label"), /* @__PURE__ */ import_react12.default.createElement(
    Input,
    {
      id: "falseLabel",
      value: data.falseLabel || "No",
      onChange: (e) => handleChange("falseLabel", e.target.value)
    }
  )))));
};
var CheckboxBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react12.default.createElement(
    Checkbox,
    {
      id: data.fieldName,
      name: data.fieldName,
      defaultChecked: !!data.defaultValue,
      value: data.value || "true"
    }
  ), /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: data.fieldName }, data.label)), data.description && /* @__PURE__ */ import_react12.default.createElement("p", { className: "text-sm text-muted-foreground ml-6" }, data.description), data.showYesNo && /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex space-x-4 ml-6 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react12.default.createElement("span", null, "Checked: ", data.trueLabel || "Yes"), /* @__PURE__ */ import_react12.default.createElement("span", null, "Unchecked: ", data.falseLabel || "No")));
};
var CheckboxBlockPreview = () => {
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex items-center space-x-2 w-4/5 max-w-full" }, /* @__PURE__ */ import_react12.default.createElement(Checkbox, { id: "preview-checkbox", disabled: true }), /* @__PURE__ */ import_react12.default.createElement(Label, { htmlFor: "preview-checkbox" }, "Checkbox option")));
};
var CheckboxBlock = {
  type: "checkbox",
  name: "Checkbox",
  description: "Single checkbox for binary/boolean options",
  icon: /* @__PURE__ */ import_react12.default.createElement(import_lucide_react13.CheckSquare, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkbox",
    fieldName: `checkbox${(0, import_uuid6.v4)().substring(0, 4)}`,
    label: "Check this option",
    description: "",
    value: "true",
    defaultValue: false,
    showYesNo: false,
    trueLabel: "Yes",
    falseLabel: "No"
  },
  renderItem: (props) => /* @__PURE__ */ import_react12.default.createElement(CheckboxBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react12.default.createElement(CheckboxBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react12.default.createElement(CheckboxBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/MarkdownBlock.tsx
var import_react13 = __toESM(require("react"));
var import_lucide_react14 = require("lucide-react");
var renderMarkdown = (text) => {
  let html = text.replace(/^### (.*$)/gim, "<h3>$1</h3>").replace(/^## (.*$)/gim, "<h2>$1</h2>").replace(/^# (.*$)/gim, "<h1>$1</h1>").replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>").replace(/\*(.*)\*/gim, "<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>').replace(/^\s*\n\*/gim, "<ul>\n*").replace(/^(\*.+)\s*\n([^\*])/gim, "$1\n</ul>\n\n$2").replace(/^\*(.+)/gim, "<li>$1</li>").replace(/^\s*\n\s*\n/gim, "</p><p>");
  if (!html.startsWith("<h") && !html.startsWith("<ul")) {
    html = "<p>" + html;
  }
  if (!html.endsWith("</p>") && !html.endsWith("</ul>")) {
    html = html + "</p>";
  }
  return html;
};
var MarkdownBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const [preview, setPreview] = (0, import_react13.useState)(false);
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react13.default.createElement(Label, { htmlFor: "variableName" }, "Variable Name (Optional)"), /* @__PURE__ */ import_react13.default.createElement(
    Input,
    {
      id: "variableName",
      value: data.variableName || "",
      onChange: (e) => handleChange("variableName", e.target.value),
      placeholder: "markdownVar"
    }
  ), /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Optional variable to use in templates")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react13.default.createElement(Label, { htmlFor: "className" }, "CSS Class Names"), /* @__PURE__ */ import_react13.default.createElement(
    Input,
    {
      id: "className",
      value: data.className || "",
      onChange: (e) => handleChange("className", e.target.value),
      placeholder: "markdown-content"
    }
  ))), /* @__PURE__ */ import_react13.default.createElement("div", { className: "flex items-center space-x-2 mb-2" }, /* @__PURE__ */ import_react13.default.createElement(
    Checkbox,
    {
      id: "updateContent",
      checked: !!data.updateContent,
      onCheckedChange: (checked) => {
        handleChange("updateContent", !!checked);
      }
    }
  ), /* @__PURE__ */ import_react13.default.createElement(Label, { htmlFor: "updateContent" }, "Auto-update content from variables")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react13.default.createElement(Label, { htmlFor: "text" }, "Markdown Content"), /* @__PURE__ */ import_react13.default.createElement(
    "button",
    {
      type: "button",
      className: "text-xs text-primary hover:underline",
      onClick: () => setPreview(!preview)
    },
    preview ? "Edit Markdown" : "Preview"
  )), preview ? /* @__PURE__ */ import_react13.default.createElement(
    "div",
    {
      className: "border rounded-md p-4 min-h-[200px] prose prose-sm max-w-none",
      dangerouslySetInnerHTML: { __html: renderMarkdown(data.text || "") }
    }
  ) : /* @__PURE__ */ import_react13.default.createElement(
    Textarea,
    {
      id: "text",
      value: data.text || "",
      onChange: (e) => handleChange("text", e.target.value),
      placeholder: "# Markdown content\\n\\nYou can use **bold** and *italic* text",
      rows: 10,
      className: "font-mono text-sm"
    }
  )));
};
var MarkdownBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react13.default.createElement(
    "div",
    {
      className: `prose prose-sm max-w-none ${data.className || ""}`,
      dangerouslySetInnerHTML: { __html: renderMarkdown(data.text || "") }
    }
  );
};
var MarkdownBlockPreview = () => {
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "text-center w-4/5 max-w-full text-sm" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "text-muted-foreground" }, "Markdown"), /* @__PURE__ */ import_react13.default.createElement("code", { className: "px-2 py-1 bg-muted rounded-md text-xs" }, "## Heading")));
};
var MarkdownBlock = {
  type: "markdown",
  name: "Markdown",
  description: "Formatted text content using Markdown syntax",
  icon: /* @__PURE__ */ import_react13.default.createElement(import_lucide_react14.FileText, { className: "w-4 h-4" }),
  defaultData: {
    type: "markdown",
    text: "## Markdown Heading\n\nThis is a paragraph with **bold** and *italic* text.\n\n* List item 1\n* List item 2",
    variableName: "",
    className: "",
    updateContent: false
  },
  renderItem: (props) => /* @__PURE__ */ import_react13.default.createElement(MarkdownBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react13.default.createElement(MarkdownBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react13.default.createElement(MarkdownBlockPreview, null),
  validate: (data) => {
    if (!data.text) return "Content is required";
    return null;
  }
};

// src/components/blocks/HtmlBlock.tsx
var import_react14 = __toESM(require("react"));
var import_lucide_react15 = require("lucide-react");
var HtmlBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const [preview, setPreview] = (0, import_react14.useState)(false);
  return /* @__PURE__ */ import_react14.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react14.default.createElement(Label, { htmlFor: "variableName" }, "Variable Name (Optional)"), /* @__PURE__ */ import_react14.default.createElement(
    Input,
    {
      id: "variableName",
      value: data.variableName || "",
      onChange: (e) => handleChange("variableName", e.target.value),
      placeholder: "htmlVar"
    }
  ), /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Optional variable to use in templates")), /* @__PURE__ */ import_react14.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react14.default.createElement(Label, { htmlFor: "className" }, "CSS Class Names"), /* @__PURE__ */ import_react14.default.createElement(
    Input,
    {
      id: "className",
      value: data.className || "",
      onChange: (e) => handleChange("className", e.target.value),
      placeholder: "html-content custom-styles"
    }
  ))), /* @__PURE__ */ import_react14.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react14.default.createElement(Label, { htmlFor: "html" }, "HTML Content"), /* @__PURE__ */ import_react14.default.createElement(
    "button",
    {
      type: "button",
      className: "text-xs text-primary hover:underline",
      onClick: () => setPreview(!preview)
    },
    preview ? "Edit HTML" : "Preview"
  )), preview ? /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      className: "border rounded-md p-4 min-h-[200px] overflow-auto",
      dangerouslySetInnerHTML: { __html: data.html || "" }
    }
  ) : /* @__PURE__ */ import_react14.default.createElement(
    Textarea,
    {
      id: "html",
      value: data.html || "",
      onChange: (e) => handleChange("html", e.target.value),
      placeholder: "<h2>HTML Content</h2>\\n<p>You can add any HTML here</p>",
      rows: 10,
      className: "font-mono text-sm"
    }
  )));
};
var HtmlBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      className: data.className || "",
      dangerouslySetInnerHTML: { __html: data.html || "" }
    }
  );
};
var HtmlBlockPreview = () => {
  return /* @__PURE__ */ import_react14.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "text-center w-4/5 max-w-full text-sm" }, /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-muted-foreground" }, "HTML"), /* @__PURE__ */ import_react14.default.createElement("code", { className: "px-2 py-1 bg-muted rounded-md text-xs" }, "<div></div>")));
};
var HtmlBlock = {
  type: "html",
  name: "HTML",
  description: "Custom HTML content",
  icon: /* @__PURE__ */ import_react14.default.createElement(import_lucide_react15.Code, { className: "w-4 h-4" }),
  defaultData: {
    type: "html",
    html: "<h2>HTML Content</h2>\n<p>This is a <strong>custom</strong> HTML block.</p>",
    variableName: "",
    className: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react14.default.createElement(HtmlBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react14.default.createElement(HtmlBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react14.default.createElement(HtmlBlockPreview, null),
  validate: (data) => {
    if (!data.html) return "HTML content is required";
    return null;
  }
};

// src/components/blocks/ScriptBlock.tsx
var import_react15 = __toESM(require("react"));
var import_lucide_react16 = require("lucide-react");
var ScriptBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react15.default.createElement(Label, { htmlFor: "script" }, "JavaScript Code"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-xs text-muted-foreground" }, "This script will be executed when the page is rendered. The script has access to ", /* @__PURE__ */ import_react15.default.createElement("code", null, "formData"), ", ", /* @__PURE__ */ import_react15.default.createElement("code", null, "pageData"), ", and ", /* @__PURE__ */ import_react15.default.createElement("code", null, "renderer"), " objects."), /* @__PURE__ */ import_react15.default.createElement(
    Textarea,
    {
      id: "script",
      value: data.script || "",
      onChange: (e) => handleChange("script", e.target.value),
      placeholder: "// Example: validate or transform form data\\nconsole.log('Running script...');\\nformData.calculatedValue = formData.input1 + formData.input2;",
      rows: 12,
      className: "font-mono text-sm"
    }
  )));
};
var ScriptBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-2 border rounded bg-muted/20" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-2 text-muted-foreground" }, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react16.Terminal, { className: "h-4 w-4" }), /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-sm" }, "Script Block (runs on page load)")), data.script && /* @__PURE__ */ import_react15.default.createElement("pre", { className: "mt-2 text-xs font-mono whitespace-pre-wrap p-2 bg-muted rounded" }, data.script.length > 100 ? `${data.script.substring(0, 100)}...` : data.script));
};
var ScriptBlockPreview = () => {
  return /* @__PURE__ */ import_react15.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "text-center w-4/5 max-w-full text-sm" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-muted-foreground" }, "JavaScript"), /* @__PURE__ */ import_react15.default.createElement("code", { className: "px-2 py-1 bg-muted rounded-md text-xs" }, "console.log()")));
};
var ScriptBlock = {
  type: "script",
  name: "Script",
  description: "Custom JavaScript code for form logic",
  icon: /* @__PURE__ */ import_react15.default.createElement(import_lucide_react16.Terminal, { className: "w-4 h-4" }),
  defaultData: {
    type: "script",
    script: "// This script runs when the page loads\nconsole.log('Script block executed');\n\n// You can access and modify form data\n// formData.calculated = formData.input1 + formData.input2;"
  },
  renderItem: (props) => /* @__PURE__ */ import_react15.default.createElement(ScriptBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react15.default.createElement(ScriptBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react15.default.createElement(ScriptBlockPreview, null),
  validate: (data) => {
    if (!data.script) return "Script content is required";
    return null;
  }
};

// src/components/blocks/AuthBlock.tsx
var import_react16 = __toESM(require("react"));
var import_lucide_react17 = require("lucide-react");
var AuthBlockForm = ({ data, onUpdate, onRemove }) => {
  const [testResults, setTestResults] = import_react16.default.useState([]);
  const [testData, setTestData] = import_react16.default.useState({
    name: "Test User",
    email: "test@example.com",
    mobile: "+1234567890",
    otp: "123456"
  });
  const [isTestingFlow, setIsTestingFlow] = import_react16.default.useState(false);
  const handleChange = (field, value) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleMappingChange = (oldPath, newPath, formField) => {
    const fieldMappings = { ...data.fieldMappings || {} };
    if (oldPath !== newPath && oldPath in fieldMappings) {
      delete fieldMappings[oldPath];
    }
    fieldMappings[newPath] = formField;
    handleChange("fieldMappings", fieldMappings);
  };
  const addMapping = () => {
    const fieldMappings = { ...data.fieldMappings || {} };
    let counter = 1;
    while (fieldMappings[`new_mapping_${counter}`] !== void 0) {
      counter++;
    }
    fieldMappings[`new_mapping_${counter}`] = "";
    handleChange("fieldMappings", fieldMappings);
  };
  const removeMapping = (path) => {
    const fieldMappings = { ...data.fieldMappings || {} };
    delete fieldMappings[path];
    handleChange("fieldMappings", fieldMappings);
  };
  const handleHeaderChange = (oldKey, newKey, value) => {
    const customHeaders = { ...data.customHeaders || {} };
    if (oldKey !== newKey && oldKey in customHeaders) {
      delete customHeaders[oldKey];
    }
    customHeaders[newKey] = value;
    handleChange("customHeaders", customHeaders);
  };
  const addHeader = () => {
    const customHeaders = { ...data.customHeaders || {} };
    let counter = 1;
    while (customHeaders[`new_header_${counter}`] !== void 0) {
      counter++;
    }
    customHeaders[`new_header_${counter}`] = "";
    handleChange("customHeaders", customHeaders);
  };
  const removeHeader = (key) => {
    const customHeaders = { ...data.customHeaders || {} };
    delete customHeaders[key];
    handleChange("customHeaders", customHeaders);
  };
  const handleBodyParamChange = (oldKey, newKey, value) => {
    const additionalBodyParams = { ...data.additionalBodyParams || {} };
    if (oldKey !== newKey && oldKey in additionalBodyParams) {
      delete additionalBodyParams[oldKey];
    }
    additionalBodyParams[newKey] = value;
    handleChange("additionalBodyParams", additionalBodyParams);
  };
  const addBodyParam = () => {
    const additionalBodyParams = { ...data.additionalBodyParams || {} };
    let counter = 1;
    while (additionalBodyParams[`new_param_${counter}`] !== void 0) {
      counter++;
    }
    additionalBodyParams[`new_param_${counter}`] = "";
    handleChange("additionalBodyParams", additionalBodyParams);
  };
  const removeBodyParam = (key) => {
    const additionalBodyParams = { ...data.additionalBodyParams || {} };
    delete additionalBodyParams[key];
    handleChange("additionalBodyParams", additionalBodyParams);
  };
  const getNestedValue = (obj, path) => {
    if (!path || !obj) return void 0;
    return path.split(".").reduce((current, key) => current == null ? void 0 : current[key], obj);
  };
  const getValidationErrors = () => {
    const errors = [];
    if (!data.requireEmail && !data.requireMobile) {
      errors.push("Either email or mobile must be enabled for authentication to work");
    }
    if (!data.loginUrl && !data.signupUrl) {
      errors.push("At least one authentication URL (login or signup) is required");
    }
    if (data.useOtp) {
      if (data.requireEmail && (!data.sendEmailOtpUrl || !data.verifyEmailOtpUrl)) {
        errors.push("Email OTP URLs are required when email is enabled with OTP");
      }
      if (data.requireMobile && (!data.sendMobileOtpUrl || !data.verifyMobileOtpUrl)) {
        errors.push("Mobile OTP URLs are required when mobile is enabled with OTP");
      }
    }
    return errors;
  };
  const validationErrors = getValidationErrors();
  const testEndpoints = async () => {
    const endpoints = [
      { label: "loginUrl", url: data.loginUrl },
      { label: "signupUrl", url: data.signupUrl },
      { label: "sendEmailOtpUrl", url: data.sendEmailOtpUrl },
      { label: "verifyEmailOtpUrl", url: data.verifyEmailOtpUrl },
      { label: "sendMobileOtpUrl", url: data.sendMobileOtpUrl },
      { label: "verifyMobileOtpUrl", url: data.verifyMobileOtpUrl },
      { label: "validateTokenUrl", url: data.validateTokenUrl }
    ];
    const results = [];
    for (const ep of endpoints) {
      if (!ep.url) continue;
      try {
        const res = await fetch(ep.url, { method: "OPTIONS" });
        results.push(`${ep.label}: ${res.ok ? "\u2705 reachable" : `\u274C ${res.status}`}`);
      } catch (e) {
        results.push(`${ep.label}: \u274C error`);
      }
    }
    setTestResults(results.length ? results : ["No URLs configured"]);
  };
  const testAuthFlow = async () => {
    setIsTestingFlow(true);
    const results = [];
    try {
      results.push("\u{1F680} Testing step-by-step authentication flow...\n");
      const headers = {
        "Content-Type": "application/json"
      };
      const customHeaders = data.customHeaders || {};
      Object.entries(customHeaders).forEach(([key, value]) => {
        if (key && value && key.trim() && value.trim()) {
          headers[key] = value;
        }
      });
      results.push(`\u{1F527} Request headers: ${JSON.stringify(headers, null, 2)}
`);
      const baseRequestBody = {};
      if (data.requireName) baseRequestBody.name = testData.name;
      if (data.requireEmail) baseRequestBody.email = testData.email;
      if (data.requireMobile) baseRequestBody.mobile = testData.mobile;
      const additionalParams = data.additionalBodyParams || {};
      Object.entries(additionalParams).forEach(([key, value]) => {
        if (key && value && key.trim() && value.trim()) {
          baseRequestBody[key] = value;
        }
      });
      results.push(`\u{1F4CB} Base request body: ${JSON.stringify(baseRequestBody, null, 2)}
`);
      if (data.useOtp) {
        results.push("\u{1F510} Testing OTP Flow...");
        if (data.requireEmail && data.sendEmailOtpUrl) {
          try {
            results.push("\u{1F4E7} Step 1: Sending email OTP...");
            const otpRes = await fetch(data.sendEmailOtpUrl, {
              method: "POST",
              headers,
              body: JSON.stringify(baseRequestBody)
            });
            if (otpRes.ok) {
              const otpData = await otpRes.json();
              results.push(`\u2705 Email OTP sent successfully`);
              results.push(`\u{1F4E7} Response: ${JSON.stringify(otpData, null, 2)}
`);
              if (data.verifyEmailOtpUrl) {
                results.push("\u{1F50D} Step 2: Verifying email OTP...");
                const verifyBody = { ...baseRequestBody, email: testData.email, otp: testData.otp };
                const verifyRes = await fetch(data.verifyEmailOtpUrl, {
                  method: "POST",
                  headers,
                  body: JSON.stringify(verifyBody)
                });
                if (verifyRes.ok) {
                  const verifyData = await verifyRes.json();
                  results.push(`\u2705 Email OTP verification successful`);
                  results.push(`\u{1F510} Auth response: ${JSON.stringify(verifyData, null, 2)}
`);
                  if (data.fieldMappings && Object.keys(data.fieldMappings).length > 0) {
                    results.push(`\u{1F5FA}\uFE0F Testing field mappings:`);
                    Object.entries(data.fieldMappings).forEach(([apiPath, formField]) => {
                      const value = getNestedValue(verifyData, apiPath);
                      results.push(`  ${apiPath} \u2192 ${formField}: ${value}`);
                    });
                    results.push("");
                  }
                  const tokenField = data.tokenField || "token";
                  const token = verifyData[tokenField];
                  if (token && data.validateTokenUrl) {
                    results.push("\u{1F504} Step 3: Validating token...");
                    const validateBody = { ...baseRequestBody, [tokenField]: token };
                    const validateRes = await fetch(data.validateTokenUrl, {
                      method: "POST",
                      headers,
                      body: JSON.stringify(validateBody)
                    });
                    if (validateRes.ok) {
                      const validateData = await validateRes.json();
                      results.push(`\u2705 Token validation successful`);
                      results.push(`\u{1F464} User data: ${JSON.stringify(validateData, null, 2)}`);
                    } else {
                      results.push(`\u274C Token validation failed: ${validateRes.status}`);
                    }
                  }
                } else {
                  const errorData = await verifyRes.text();
                  results.push(`\u274C Email OTP verification failed: ${verifyRes.status}`);
                  results.push(`Error: ${errorData}`);
                }
              }
            } else {
              const errorData = await otpRes.text();
              results.push(`\u274C Email OTP sending failed: ${otpRes.status}`);
              results.push(`Error: ${errorData}`);
            }
          } catch (error) {
            results.push(`\u274C Email OTP flow error: ${error.message}`);
          }
        }
        if (data.requireMobile && data.sendMobileOtpUrl) {
          try {
            results.push("\u{1F4F1} Testing mobile OTP flow...");
            const otpRes = await fetch(data.sendMobileOtpUrl, {
              method: "POST",
              headers,
              body: JSON.stringify(baseRequestBody)
            });
            if (otpRes.ok) {
              const otpData = await otpRes.json();
              results.push(`\u2705 Mobile OTP sent successfully`);
              results.push(`\u{1F4F1} Response: ${JSON.stringify(otpData, null, 2)}
`);
              if (data.verifyMobileOtpUrl) {
                results.push("\u{1F50D} Verifying mobile OTP...");
                const verifyBody = { ...baseRequestBody, mobile: testData.mobile, otp: testData.otp };
                const verifyRes = await fetch(data.verifyMobileOtpUrl, {
                  method: "POST",
                  headers,
                  body: JSON.stringify(verifyBody)
                });
                if (verifyRes.ok) {
                  const verifyData = await verifyRes.json();
                  results.push(`\u2705 Mobile OTP verification successful`);
                  results.push(`\u{1F510} Auth response: ${JSON.stringify(verifyData, null, 2)}`);
                } else {
                  results.push(`\u274C Mobile OTP verification failed: ${verifyRes.status}`);
                }
              }
            } else {
              results.push(`\u274C Mobile OTP sending failed: ${otpRes.status}`);
            }
          } catch (error) {
            results.push(`\u274C Mobile OTP flow error: ${error.message}`);
          }
        }
      } else {
        results.push("\u{1F513} Testing Direct Authentication Flow...");
        if (data.loginUrl) {
          try {
            results.push("\u{1F511} Testing login endpoint...");
            const loginRes = await fetch(data.loginUrl, {
              method: "POST",
              headers,
              body: JSON.stringify(baseRequestBody)
            });
            if (loginRes.ok) {
              const loginData = await loginRes.json();
              results.push(`\u2705 Direct login successful`);
              results.push(`\u{1F510} Auth response: ${JSON.stringify(loginData, null, 2)}
`);
              const tokenField = data.tokenField || "token";
              const token = loginData[tokenField];
              if (token && data.validateTokenUrl) {
                results.push("\u{1F504} Testing token validation...");
                const validateBody = { ...baseRequestBody, [tokenField]: token };
                const validateRes = await fetch(data.validateTokenUrl, {
                  method: "POST",
                  headers,
                  body: JSON.stringify(validateBody)
                });
                if (validateRes.ok) {
                  const validateData = await validateRes.json();
                  results.push(`\u2705 Token validation successful`);
                  results.push(`\u{1F464} User data: ${JSON.stringify(validateData, null, 2)}`);
                } else {
                  results.push(`\u274C Token validation failed: ${validateRes.status}`);
                }
              }
              if (data.fieldMappings && Object.keys(data.fieldMappings).length > 0) {
                results.push(`\u{1F5FA}\uFE0F Testing field mappings:`);
                Object.entries(data.fieldMappings).forEach(([apiPath, formField]) => {
                  const value = getNestedValue(loginData, apiPath);
                  results.push(`  ${apiPath} \u2192 ${formField}: ${value}`);
                });
              }
            } else {
              const errorData = await loginRes.text();
              results.push(`\u274C Direct login failed: ${loginRes.status}`);
              results.push(`Error: ${errorData}`);
            }
          } catch (error) {
            results.push(`\u274C Direct login error: ${error.message}`);
          }
        }
      }
      results.push("\n\u{1F389} Flow testing completed!");
    } catch (error) {
      results.push(`\u274C Flow test error: ${error.message}`);
    }
    setTestResults(results);
    setIsTestingFlow(false);
  };
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement(Card, null, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Settings, { className: "w-4 h-4" }), "Authentication Block Configuration")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, validationErrors.length > 0 && /* @__PURE__ */ import_react16.default.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.AlertTriangle, { className: "h-4 w-4" }), /* @__PURE__ */ import_react16.default.createElement(AlertDescription, null, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-1" }, validationErrors.map((error, index) => /* @__PURE__ */ import_react16.default.createElement("div", { key: index }, "\u2022 ", error))))), /* @__PURE__ */ import_react16.default.createElement(Tabs, { defaultValue: "config", className: "w-full" }, /* @__PURE__ */ import_react16.default.createElement(TabsList, { className: "grid w-full grid-cols-5" }, /* @__PURE__ */ import_react16.default.createElement(TabsTrigger, { value: "config" }, "Configuration"), /* @__PURE__ */ import_react16.default.createElement(TabsTrigger, { value: "parameters" }, "Parameters"), /* @__PURE__ */ import_react16.default.createElement(TabsTrigger, { value: "mapping" }, "Data Mapping"), /* @__PURE__ */ import_react16.default.createElement(TabsTrigger, { value: "testing" }, "Testing"), /* @__PURE__ */ import_react16.default.createElement(TabsTrigger, { value: "docs" }, "API Docs")), /* @__PURE__ */ import_react16.default.createElement(TabsContent, { value: "config", className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement(Card, null, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Settings, { className: "w-4 h-4" }), "Basic Settings")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-6" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name (for data storage)"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "authResults",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "authResults"
    }
  ), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-xs text-muted-foreground" }, "This is where the authentication data will be stored in the form results")), /* @__PURE__ */ import_react16.default.createElement(Card, { className: "p-4 border-blue-200" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center space-x-2 mb-3" }, /* @__PURE__ */ import_react16.default.createElement(
    Checkbox,
    {
      id: "skipIfLoggedIn",
      checked: !!data.skipIfLoggedIn,
      onCheckedChange: (checked) => handleChange("skipIfLoggedIn", !!checked)
    }
  ), /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "skipIfLoggedIn", className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.SkipForward, { className: "w-4 h-4" }), "Skip if Already Logged In")), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-sm text-blue-800" }, "When enabled, this authentication block will be automatically skipped if a valid authentication token is found in storage. This is useful for multi-step forms where users might navigate back and forth."), data.skipIfLoggedIn && /* @__PURE__ */ import_react16.default.createElement("div", { className: "mt-2 p-2 bg-blue-100 rounded text-xs text-blue-700" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Note:"), " The block will only be skipped if both a valid token exists and", data.validateTokenUrl ? " the token validation passes." : " no token validation URL is configured.")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "loginUrl" }, "Login URL"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "loginUrl",
      value: data.loginUrl || "",
      onChange: (e) => handleChange("loginUrl", e.target.value),
      placeholder: "https://api.example.com/login"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "signupUrl" }, "Signup URL (Optional)"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "signupUrl",
      value: data.signupUrl || "",
      onChange: (e) => handleChange("signupUrl", e.target.value),
      placeholder: "https://api.example.com/signup"
    }
  ))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "tokenField" }, "Token Field Name"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "tokenField",
      value: data.tokenField || "token",
      onChange: (e) => handleChange("tokenField", e.target.value),
      placeholder: "token"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "tokenStorageKey" }, "Token Storage Key"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "tokenStorageKey",
      value: data.tokenStorageKey || "authToken",
      onChange: (e) => handleChange("tokenStorageKey", e.target.value),
      placeholder: "authToken"
    }
  ))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "validateTokenUrl" }, "Token Validation URL (Optional)"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "validateTokenUrl",
      value: data.validateTokenUrl || "",
      onChange: (e) => handleChange("validateTokenUrl", e.target.value),
      placeholder: "https://api.example.com/validate-token"
    }
  ), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Used to validate existing tokens when users return", data.skipIfLoggedIn ? " and when skip if logged in is enabled" : "")), /* @__PURE__ */ import_react16.default.createElement(Card, { className: "p-4 bg-muted/50" }, /* @__PURE__ */ import_react16.default.createElement("h4", { className: "font-medium mb-3" }, "Required Fields"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react16.default.createElement(
    Checkbox,
    {
      id: "requireName",
      checked: !!data.requireName,
      onCheckedChange: (checked) => handleChange("requireName", !!checked)
    }
  ), /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "requireName" }, "Require Name")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react16.default.createElement(
    Checkbox,
    {
      id: "requireEmail",
      checked: !!data.requireEmail,
      onCheckedChange: (checked) => handleChange("requireEmail", !!checked)
    }
  ), /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "requireEmail" }, "Require Email")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react16.default.createElement(
    Checkbox,
    {
      id: "requireMobile",
      checked: !!data.requireMobile,
      onCheckedChange: (checked) => handleChange("requireMobile", !!checked)
    }
  ), /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "requireMobile" }, "Require Mobile"))), !data.requireEmail && !data.requireMobile && /* @__PURE__ */ import_react16.default.createElement(Alert, { className: "mt-3" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.AlertTriangle, { className: "h-4 w-4" }), /* @__PURE__ */ import_react16.default.createElement(AlertDescription, null, "At least one of Email or Mobile must be enabled for authentication to work"))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "nameLabel" }, "Name Field Label"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "nameLabel",
      value: data.nameLabel || "Name",
      onChange: (e) => handleChange("nameLabel", e.target.value),
      placeholder: "Name"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "emailLabel" }, "Email Field Label"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "emailLabel",
      value: data.emailLabel || "Email",
      onChange: (e) => handleChange("emailLabel", e.target.value),
      placeholder: "Email"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "mobileLabel" }, "Mobile Field Label"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "mobileLabel",
      value: data.mobileLabel || "Mobile Number",
      onChange: (e) => handleChange("mobileLabel", e.target.value),
      placeholder: "Mobile Number"
    }
  ))))), /* @__PURE__ */ import_react16.default.createElement(Card, null, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Shield, { className: "w-4 h-4" }), "OTP Configuration")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react16.default.createElement(
    Checkbox,
    {
      id: "useOtp",
      checked: !!data.useOtp,
      onCheckedChange: (checked) => handleChange("useOtp", !!checked)
    }
  ), /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "useOtp" }, "Enable OTP Authentication")), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-sm text-muted-foreground" }, "When enabled, users will receive verification codes instead of direct login"), data.useOtp && /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-4 p-4 rounded-lg" }, data.requireEmail && /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "sendEmailOtpUrl" }, "Send Email OTP URL"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "sendEmailOtpUrl",
      value: data.sendEmailOtpUrl || "",
      onChange: (e) => handleChange("sendEmailOtpUrl", e.target.value),
      placeholder: "https://api.example.com/send-email-otp"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "verifyEmailOtpUrl" }, "Verify Email OTP URL"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "verifyEmailOtpUrl",
      value: data.verifyEmailOtpUrl || "",
      onChange: (e) => handleChange("verifyEmailOtpUrl", e.target.value),
      placeholder: "https://api.example.com/verify-email-otp"
    }
  ))), data.requireMobile && /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "sendMobileOtpUrl" }, "Send Mobile OTP URL"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "sendMobileOtpUrl",
      value: data.sendMobileOtpUrl || "",
      onChange: (e) => handleChange("sendMobileOtpUrl", e.target.value),
      placeholder: "https://api.example.com/send-mobile-otp"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "verifyMobileOtpUrl" }, "Verify Mobile OTP URL"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "verifyMobileOtpUrl",
      value: data.verifyMobileOtpUrl || "",
      onChange: (e) => handleChange("verifyMobileOtpUrl", e.target.value),
      placeholder: "https://api.example.com/verify-mobile-otp"
    }
  ))))))), /* @__PURE__ */ import_react16.default.createElement(TabsContent, { value: "parameters", className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement(Card, null, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Settings, { className: "w-4 h-4" }), "Custom Headers"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Add custom headers to all API requests (e.g., X-Merchant-ID, Authorization, API-Key).")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, Object.entries(data.customHeaders || {}).map(([headerKey, headerValue], index) => /* @__PURE__ */ import_react16.default.createElement("div", { key: index, className: "grid grid-cols-5 gap-2 items-end" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "col-span-2 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement(Label, { className: "text-xs" }, "Header Name"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      value: headerKey,
      onChange: (e) => handleHeaderChange(headerKey, e.target.value, headerValue),
      placeholder: "X-Merchant-ID",
      className: "text-sm"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-center text-muted-foreground" }, ":"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react16.default.createElement(Label, { className: "text-xs" }, "Header Value"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      value: headerValue,
      onChange: (e) => handleHeaderChange(headerKey, headerKey, e.target.value),
      placeholder: "123",
      className: "text-sm"
    }
  )), /* @__PURE__ */ import_react16.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => removeHeader(headerKey)
    },
    /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Trash2, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ import_react16.default.createElement(Button, { type: "button", variant: "outline", onClick: addHeader }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Plus, { className: "w-4 h-4 mr-2" }), "Add Header"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Common headers:"), /* @__PURE__ */ import_react16.default.createElement("ul", { className: "mt-1 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "X-Merchant-ID"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "123"), " (for merchant identification)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "Authorization"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "Bearer your-api-key"), " (for API authentication)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "X-API-Key"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "your-api-key"), " (for API key authentication)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "X-Client-Version"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "1.0.0"), " (for client version tracking)"))))), /* @__PURE__ */ import_react16.default.createElement(Card, null, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Settings, { className: "w-4 h-4" }), "Additional Body Parameters"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Add additional parameters to the request body for all API calls.")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, Object.entries(data.additionalBodyParams || {}).map(([paramKey, paramValue], index) => /* @__PURE__ */ import_react16.default.createElement("div", { key: index, className: "grid grid-cols-5 gap-2 items-end" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "col-span-2 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement(Label, { className: "text-xs" }, "Parameter Name"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      value: paramKey,
      onChange: (e) => handleBodyParamChange(paramKey, e.target.value, paramValue),
      placeholder: "merchant_id",
      className: "text-sm"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-center text-muted-foreground" }, ":"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react16.default.createElement(Label, { className: "text-xs" }, "Parameter Value"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      value: paramValue,
      onChange: (e) => handleBodyParamChange(paramKey, paramKey, e.target.value),
      placeholder: "123",
      className: "text-sm"
    }
  )), /* @__PURE__ */ import_react16.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => removeBodyParam(paramKey)
    },
    /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Trash2, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ import_react16.default.createElement(Button, { type: "button", variant: "outline", onClick: addBodyParam }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Plus, { className: "w-4 h-4 mr-2" }), "Add Parameter"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Common parameters:"), /* @__PURE__ */ import_react16.default.createElement("ul", { className: "mt-1 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "merchant_id"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "123"), " (for merchant identification)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "source"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "web"), " (for request source tracking)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "app_version"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "1.0.0"), " (for app version tracking)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "locale"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "en_US"), " (for localization)")))))), /* @__PURE__ */ import_react16.default.createElement(TabsContent, { value: "mapping", className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement(Card, null, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.MapPin, { className: "w-4 h-4" }), "API Response Data Mapping"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-sm text-muted-foreground" }, 'Map fields from your API response to form values. Use dot notation for nested values (e.g., "user.department").')), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, Object.entries(data.fieldMappings || {}).map(([apiPath, formField], index) => /* @__PURE__ */ import_react16.default.createElement("div", { key: index, className: "grid grid-cols-5 gap-2 items-end" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "col-span-2 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement(Label, { className: "text-xs" }, "API Response Path"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      value: apiPath,
      onChange: (e) => handleMappingChange(apiPath, e.target.value, formField),
      placeholder: "user.department",
      className: "text-sm"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-center text-muted-foreground" }, "\u2192"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react16.default.createElement(Label, { className: "text-xs" }, "Form Field"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      value: formField,
      onChange: (e) => handleMappingChange(apiPath, apiPath, e.target.value),
      placeholder: "department",
      className: "text-sm"
    }
  )), /* @__PURE__ */ import_react16.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => removeMapping(apiPath)
    },
    /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Trash2, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ import_react16.default.createElement(Button, { type: "button", variant: "outline", onClick: addMapping }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.Plus, { className: "w-4 h-4 mr-2" }), "Add Mapping"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Example mappings:"), /* @__PURE__ */ import_react16.default.createElement("ul", { className: "mt-1 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "user.id"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "userId")), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "user.department"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "department")), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "subscription.tier"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "userTier")), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "metadata.role"), " \u2192 ", /* @__PURE__ */ import_react16.default.createElement("code", null, "userRole"))))))), /* @__PURE__ */ import_react16.default.createElement(TabsContent, { value: "testing", className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement(Card, { className: "max-w-2xl" }, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.TestTube, { className: "w-4 h-4" }), "API Testing")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-4 gap-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "testName" }, "Test Name"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "testName",
      value: testData.name,
      onChange: (e) => setTestData((prev) => ({ ...prev, name: e.target.value })),
      placeholder: "Test User"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "testEmail" }, "Test Email"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "testEmail",
      value: testData.email,
      onChange: (e) => setTestData((prev) => ({ ...prev, email: e.target.value })),
      placeholder: "test@example.com"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "testMobile" }, "Test Mobile"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "testMobile",
      value: testData.mobile,
      onChange: (e) => setTestData((prev) => ({ ...prev, mobile: e.target.value })),
      placeholder: "+1234567890"
    }
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react16.default.createElement(Label, { htmlFor: "testOtp" }, "Test OTP"), /* @__PURE__ */ import_react16.default.createElement(
    Input,
    {
      id: "testOtp",
      value: testData.otp,
      onChange: (e) => setTestData((prev) => ({ ...prev, otp: e.target.value })),
      placeholder: "123456"
    }
  ))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react16.default.createElement(Button, { type: "button", variant: "outline", onClick: testEndpoints }, "Test Endpoint Reachability"), /* @__PURE__ */ import_react16.default.createElement(
    Button,
    {
      type: "button",
      variant: "default",
      onClick: testAuthFlow,
      disabled: isTestingFlow || validationErrors.length > 0
    },
    isTestingFlow ? "Testing..." : "Test Complete Auth Flow"
  )), validationErrors.length > 0 && /* @__PURE__ */ import_react16.default.createElement(Alert, null, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.AlertTriangle, { className: "h-4 w-4" }), /* @__PURE__ */ import_react16.default.createElement(AlertDescription, null, "Please fix the configuration errors above before testing.")), testResults.length > 0 && /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-4 ounded" }, /* @__PURE__ */ import_react16.default.createElement("h4", { className: "font-medium mb-2" }, "Test Results:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "text-sm whitespace-pre-wrap font-mono max-h-96 overflow-y-auto" }, testResults.join("\n")))))), /* @__PURE__ */ import_react16.default.createElement(TabsContent, { value: "docs", className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement(Card, { className: "max-w-2xl" }, /* @__PURE__ */ import_react16.default.createElement(CardHeader, null, /* @__PURE__ */ import_react16.default.createElement(CardTitle, { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.BookOpen, { className: "w-4 h-4" }), "API Documentation")), /* @__PURE__ */ import_react16.default.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "prose prose-sm max-w-none" }, /* @__PURE__ */ import_react16.default.createElement("h3", null, "Authentication Flow Overview"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-4 rounded-lg" }, /* @__PURE__ */ import_react16.default.createElement("h4", { className: "text-blue-800 font-medium" }, "Step-by-Step User Experience:"), /* @__PURE__ */ import_react16.default.createElement("ol", { className: "text-blue-700 mt-2 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("li", null, "1. User enters name (if required)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "2. User enters email (if required)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "3. User enters mobile (if required)"), /* @__PURE__ */ import_react16.default.createElement("li", null, "4a. If OTP enabled: User receives and enters verification code"), /* @__PURE__ */ import_react16.default.createElement("li", null, "4b. If OTP disabled: Direct authentication occurs"), /* @__PURE__ */ import_react16.default.createElement("li", null, "5. User is authenticated and can continue"))), data.skipIfLoggedIn && /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-4 rounded-lg" }, /* @__PURE__ */ import_react16.default.createElement("h4", { className: "text-green-800 font-medium" }, "Skip if Logged In Behavior:"), /* @__PURE__ */ import_react16.default.createElement("ul", { className: "text-green-700 mt-2 space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 If a valid token exists in storage, this block will be automatically skipped"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 If a validation URL is configured, the token will be validated before skipping"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 Users can still manually navigate back to this block to sign in as a different user"), /* @__PURE__ */ import_react16.default.createElement("li", null, "\u2022 Forward navigation from this block will skip it again if still logged in"))), /* @__PURE__ */ import_react16.default.createElement("h4", null, "1. Direct Authentication (OTP Disabled)"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Login/Signup Request:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto" }, `POST /api/login
Content-Type: application/json

{
  "email": "user@example.com", // if requireEmail is true
  "mobile": "+1234567890", // if requireMobile is true
  "name": "John Doe" // if requireName is true
}`)), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Success Response:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto" }, `{
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "mobile": "+1234567890", 
    "name": "John Doe",
    // ... other user data
  },
  "success": true
}`)), /* @__PURE__ */ import_react16.default.createElement("h4", null, "2. OTP Authentication Flow"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Send OTP Request:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto" }, `POST /api/send-email-otp  // or /api/send-mobile-otp
Content-Type: application/json
X-Merchant-ID: 123

{
  "email": "user@example.com",     // for email OTP
  "mobile": "+1234567890",         // for mobile OTP  
  "name": "John Doe",              // optional
  "merchant_id": "123",            // additional body param (if configured)
  "source": "web"                  // additional body param (if configured)
}`)), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Verify OTP Request:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto" }, `POST /api/verify-email-otp  // or /api/verify-mobile-otp
Content-Type: application/json
X-Merchant-ID: 123

{
  "email": "user@example.com",     // for email OTP
  "mobile": "+1234567890",         // for mobile OTP
  "otp": "123456",
  "merchant_id": "123",            // additional body param (if configured)
  "source": "web"                  // additional body param (if configured)
}`)), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "OTP Verification Success Response:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto" }, `{
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "mobile": "+1234567890",
    "name": "John Doe",
    // ... other user data
  },
  "success": true
}`)), /* @__PURE__ */ import_react16.default.createElement("h4", null, "3. Token Validation (Optional)"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Request:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto" }, `POST /api/validate-token
Content-Type: application/json
X-Merchant-ID: 123

{
  "token": "jwt_token_here",
  "merchant_id": "123",            // additional body param (if configured)
  "source": "web"                  // additional body param (if configured)
}`)), /* @__PURE__ */ import_react16.default.createElement("h4", null, "4. Error Response Format"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "All endpoints should return errors in this format:"), /* @__PURE__ */ import_react16.default.createElement("pre", { className: "mt-2 bg-gray-800 text-red-400 p-2 rounded overflow-x-auto" }, `{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_FAILED"
}`)), /* @__PURE__ */ import_react16.default.createElement("h4", null, "5. Data Storage"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-green-800" }, "The authentication data will be stored in the form results under the field name you specified. The stored data includes all user information, token, and mapped fields from your API response.")), /* @__PURE__ */ import_react16.default.createElement("h4", null, "6. Custom Headers & Body Parameters"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3 rounded text-sm" }, /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-purple-800 mb-2" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Custom Headers:"), " All configured custom headers are sent with every API request. Common use cases include merchant identification, API keys, and version tracking."), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-purple-800" }, /* @__PURE__ */ import_react16.default.createElement("strong", null, "Additional Body Parameters:"), " These parameters are automatically added to the request body of all API calls, allowing you to send additional context like merchant_id, source tracking, etc."))))))))));
};
var AuthBlockItem = ({ data }) => {
  const validationErrors = [];
  if (!data.requireEmail && !data.requireMobile) {
    validationErrors.push("Either email or mobile must be enabled");
  }
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-4 border rounded-md text-center text-sm" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.UserCheck, { className: "w-6 h-6 mx-auto mb-2 text-muted-foreground" }), /* @__PURE__ */ import_react16.default.createElement("div", { className: "font-medium" }, "Authentication Required"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-xs text-muted-foreground mt-1 space-y-1" }, data.useOtp && /* @__PURE__ */ import_react16.default.createElement("div", null, "OTP: ", data.requireEmail && data.requireMobile ? "Email & Mobile" : data.requireEmail ? "Email" : "Mobile"), data.skipIfLoggedIn && /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-blue-600 flex items-center justify-center gap-1" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.SkipForward, { className: "w-3 h-3" }), "Skip if logged in"), validationErrors.length > 0 && /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-red-500 flex items-center justify-center gap-1" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.AlertTriangle, { className: "w-3 h-3" }), "Configuration needed")));
};
var AuthBlockPreview = () => {
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "w-full flex items-center justify-center py-1 text-sm" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.UserCheck, { className: "w-4 h-4 mr-2" }), " Auth");
};
var AuthBlock = {
  type: "auth",
  name: "Authentication",
  description: "Step-by-step user authentication with optional OTP",
  icon: /* @__PURE__ */ import_react16.default.createElement(import_lucide_react17.UserCheck, { className: "w-4 h-4" }),
  defaultData: {
    type: "auth",
    fieldName: "authResults",
    loginUrl: "",
    signupUrl: "",
    useOtp: false,
    sendEmailOtpUrl: "",
    verifyEmailOtpUrl: "",
    sendMobileOtpUrl: "",
    verifyMobileOtpUrl: "",
    tokenField: "token",
    tokenStorageKey: "authToken",
    validateTokenUrl: "",
    requireName: false,
    requireEmail: true,
    requireMobile: false,
    nameLabel: "Name",
    emailLabel: "Email",
    mobileLabel: "Mobile Number",
    fieldMappings: {},
    customHeaders: {},
    additionalBodyParams: {},
    skipIfLoggedIn: false
    // New configuration option
  },
  renderItem: (props) => /* @__PURE__ */ import_react16.default.createElement(AuthBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react16.default.createElement(AuthBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react16.default.createElement(AuthBlockPreview, null),
  validate: (data) => {
    if (!data.requireEmail && !data.requireMobile) {
      return "Either email or mobile must be enabled for authentication to work";
    }
    if (!data.loginUrl && !data.signupUrl) {
      return "At least one authentication URL (login or signup) is required";
    }
    if (data.useOtp) {
      if (data.requireEmail && (!data.sendEmailOtpUrl || !data.verifyEmailOtpUrl)) {
        return "Both Send Email OTP URL and Verify Email OTP URL are required when Email is enabled with OTP";
      }
      if (data.requireMobile && (!data.sendMobileOtpUrl || !data.verifyMobileOtpUrl)) {
        return "Both Send Mobile OTP URL and Verify Mobile OTP URL are required when Mobile is enabled with OTP";
      }
    }
    return null;
  }
};

// src/components/blocks/SelectBlock.tsx
var import_react17 = __toESM(require("react"));
var import_lucide_react18 = require("lucide-react");
var import_uuid7 = require("uuid");
var SelectBlockForm = ({
  data,
  onUpdate
}) => {
  const [newLabel, setNewLabel] = (0, import_react17.useState)("");
  const [newValue, setNewValue] = (0, import_react17.useState)("");
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleAddOption = () => {
    if (!newLabel.trim()) return;
    const labels = [...data.labels || []];
    const values = [...data.values || []];
    labels.push(newLabel);
    values.push(newValue || newLabel);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      labels,
      values
    });
    setNewLabel("");
    setNewValue("");
  };
  const handleRemoveOption = (index) => {
    const labels = [...data.labels || []];
    const values = [...data.values || []];
    labels.splice(index, 1);
    values.splice(index, 1);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      labels,
      values
    });
  };
  return /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react17.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "selectField1"
    }
  ), /* @__PURE__ */ import_react17.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react17.default.createElement(Label, { htmlFor: "label" }, "Question Label"), /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ import_react17.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react17.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react17.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react17.default.createElement(Label, { htmlFor: "placeholder" }, "Placeholder"), /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      id: "placeholder",
      value: data.placeholder || "",
      onChange: (e) => handleChange("placeholder", e.target.value),
      placeholder: "Select an option..."
    }
  )), /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react17.default.createElement(Label, { htmlFor: "defaultValue" }, "Default Value"), /* @__PURE__ */ import_react17.default.createElement(
    Select,
    {
      value: data.defaultValue || "",
      onValueChange: (value) => handleChange("defaultValue", value)
    },
    /* @__PURE__ */ import_react17.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react17.default.createElement(SelectValue, { placeholder: "Select a default option" })),
    /* @__PURE__ */ import_react17.default.createElement(SelectContent, null, (data.labels || []).map((label, index) => /* @__PURE__ */ import_react17.default.createElement(SelectItem, { key: index, value: (data.values || [])[index] }, label)))
  ))), /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react17.default.createElement(Label, null, "Options"), /* @__PURE__ */ import_react17.default.createElement("div", { className: "border rounded-md p-4 space-y-3" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-4" }, (data.labels || []).map((label, index) => /* @__PURE__ */ import_react17.default.createElement("div", { key: index, className: "flex items-center gap-2" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react17.default.createElement(import_lucide_react18.ListFilter, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      value: label,
      onChange: (e) => {
        const labels = [...data.labels || []];
        labels[index] = e.target.value;
        handleChange("labels", labels);
      },
      placeholder: "Option label"
    }
  ), /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      value: (data.values || [])[index],
      onChange: (e) => {
        const values = [...data.values || []];
        values[index] = e.target.value;
        handleChange("values", values);
      },
      placeholder: "Option value"
    }
  )), /* @__PURE__ */ import_react17.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: () => handleRemoveOption(index),
      className: "text-destructive"
    },
    /* @__PURE__ */ import_react17.default.createElement(import_lucide_react18.CircleX, { className: "h-4 w-4" })
  )))), /* @__PURE__ */ import_react17.default.createElement("div", { className: "pt-2 border-t mt-2" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex items-center gap-2 mt-2" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react17.default.createElement(import_lucide_react18.CirclePlus, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      value: newLabel,
      onChange: (e) => setNewLabel(e.target.value),
      placeholder: "New option label"
    }
  ), /* @__PURE__ */ import_react17.default.createElement(
    Input,
    {
      value: newValue,
      onChange: (e) => setNewValue(e.target.value),
      placeholder: "New option value (optional)"
    }
  )), /* @__PURE__ */ import_react17.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: handleAddOption
    },
    /* @__PURE__ */ import_react17.default.createElement(import_lucide_react18.CirclePlus, { className: "h-4 w-4 text-primary" })
  ))))));
};
var SelectBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-2" }, data.label && /* @__PURE__ */ import_react17.default.createElement(Label, { htmlFor: data.fieldName }, data.label), data.description && /* @__PURE__ */ import_react17.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react17.default.createElement(Select, { defaultValue: data.defaultValue }, /* @__PURE__ */ import_react17.default.createElement(SelectTrigger, { id: data.fieldName }, /* @__PURE__ */ import_react17.default.createElement(SelectValue, { placeholder: data.placeholder || "Select an option..." })), /* @__PURE__ */ import_react17.default.createElement(SelectContent, null, (data.labels || []).map((label, index) => /* @__PURE__ */ import_react17.default.createElement(SelectItem, { key: index, value: (data.values || [])[index] }, label)))));
};
var SelectBlockPreview = () => {
  return /* @__PURE__ */ import_react17.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react17.default.createElement(Select, { disabled: true }, /* @__PURE__ */ import_react17.default.createElement(SelectTrigger, { className: "w-4/5 max-w-full" }, /* @__PURE__ */ import_react17.default.createElement(SelectValue, { placeholder: "Dropdown select" }))));
};
var SelectBlock = {
  type: "select",
  name: "Dropdown Select",
  description: "Single selection from a dropdown list",
  icon: /* @__PURE__ */ import_react17.default.createElement(import_lucide_react18.ListFilter, { className: "w-4 h-4" }),
  defaultData: {
    type: "select",
    fieldName: `select${(0, import_uuid7.v4)().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    placeholder: "Choose from the list...",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react17.default.createElement(SelectBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react17.default.createElement(SelectBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react17.default.createElement(SelectBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/RangeBlock.tsx
var import_react19 = __toESM(require("react"));

// src/components/ui/slider.tsx
var import_react18 = __toESM(require("react"));
var Slider = ({
  id = 0,
  min = 0,
  max = 100,
  step = 1,
  value = [0],
  disabled = false,
  onValueChange,
  className
}) => {
  const trackRef = (0, import_react18.useRef)(null);
  const thumbRefs = (0, import_react18.useRef)([]);
  const [dragging, setDragging] = (0, import_react18.useState)(null);
  const [internalValues, setInternalValues] = (0, import_react18.useState)(value);
  (0, import_react18.useEffect)(() => {
    setInternalValues(value);
  }, [value]);
  const normalizeValue = (val) => {
    const clampedValue = Math.min(max, Math.max(min, val));
    const stepCount = Math.round((clampedValue - min) / step);
    return min + stepCount * step;
  };
  const getPercentage = (val) => {
    return (val - min) / (max - min) * 100;
  };
  const handleTrackClick = (e) => {
    var _a;
    if (disabled) return;
    const rect = (_a = trackRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    const percentage = (e.clientX - rect.left) / rect.width;
    const newValue = min + percentage * (max - min);
    const normalizedValue = normalizeValue(newValue);
    const newValues = [...internalValues];
    newValues[0] = normalizedValue;
    setInternalValues(newValues);
    onValueChange == null ? void 0 : onValueChange(newValues);
  };
  const handleThumbMouseDown = (index) => (e) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(index);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    if (dragging === null || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const newValue = min + percentage * (max - min);
    const normalizedValue = normalizeValue(newValue);
    const newValues = [...internalValues];
    newValues[dragging] = normalizedValue;
    setInternalValues(newValues);
    onValueChange == null ? void 0 : onValueChange(newValues);
  };
  const handleMouseUp = () => {
    setDragging(null);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  return /* @__PURE__ */ import_react18.default.createElement(
    "div",
    {
      className: cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )
    },
    /* @__PURE__ */ import_react18.default.createElement(
      "div",
      {
        ref: trackRef,
        className: "relative h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800",
        onClick: handleTrackClick
      },
      /* @__PURE__ */ import_react18.default.createElement(
        "div",
        {
          className: "absolute h-full rounded-full bg-primary",
          style: {
            left: "0%",
            width: `${getPercentage(internalValues[0])}%`
          }
        }
      ),
      internalValues.map((val, index) => /* @__PURE__ */ import_react18.default.createElement(
        "div",
        {
          key: index,
          ref: (el) => thumbRefs.current[index] = el,
          className: cn(
            "absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
            dragging === index && "ring-2 ring-ring ring-offset-2"
          ),
          style: {
            left: `${getPercentage(val)}%`
          },
          onMouseDown: handleThumbMouseDown(index),
          role: "slider",
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": val,
          tabIndex: disabled ? -1 : 0
        }
      ))
    )
  );
};

// src/components/blocks/RangeBlock.tsx
var import_lucide_react19 = require("lucide-react");
var import_uuid8 = require("uuid");
var RangeBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "rangeField1"
    }
  ), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "label" }, "Question Label"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "min" }, "Minimum Value"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "min",
      type: "number",
      value: data.min || "0",
      onChange: (e) => handleChange("min", parseInt(e.target.value, 10))
    }
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "max" }, "Maximum Value"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "max",
      type: "number",
      value: data.max || "100",
      onChange: (e) => handleChange("max", parseInt(e.target.value, 10))
    }
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "step" }, "Step"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "step",
      type: "number",
      value: data.step || "1",
      onChange: (e) => handleChange("step", parseInt(e.target.value, 10))
    }
  ))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "defaultValue" }, "Default Value"), /* @__PURE__ */ import_react19.default.createElement("div", { className: "pt-4" }, /* @__PURE__ */ import_react19.default.createElement(
    Slider,
    {
      id: "defaultValue",
      min: parseInt(String(data.min || "0"), 10),
      max: parseInt(String(data.max || "100"), 10),
      step: parseInt(String(data.step || "1"), 10),
      value: [data.defaultValue !== void 0 ? Number(data.defaultValue) : parseInt(String(data.min || "0"), 10)],
      onValueChange: (values) => handleChange("defaultValue", values[0])
    }
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex justify-between mt-1 text-xs text-muted-foreground" }, /* @__PURE__ */ import_react19.default.createElement("span", null, data.min || 0), /* @__PURE__ */ import_react19.default.createElement("span", null, "Current: ", data.defaultValue !== void 0 ? data.defaultValue : data.min || 0), /* @__PURE__ */ import_react19.default.createElement("span", null, data.max || 100))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "showValue" }, "Value Label"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "showValue",
      value: data.showValue || "Selected: {value}",
      onChange: (e) => handleChange("showValue", e.target.value),
      placeholder: "Value: {value}"
    }
  ), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Use ", "{value}", " to show the selected value")), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: "markStep" }, "Show Marks Every"), /* @__PURE__ */ import_react19.default.createElement(
    Input,
    {
      id: "markStep",
      type: "number",
      value: data.markStep || "0",
      onChange: (e) => handleChange("markStep", parseInt(e.target.value, 10)),
      placeholder: "0"
    }
  ), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Set to 0 to hide marks, or specify an interval"))));
};
var RangeBlockItem = ({
  data
}) => {
  const [value, setValue] = import_react19.default.useState(
    data.defaultValue !== void 0 ? Number(data.defaultValue) : parseInt(String(data.min || "0"), 10)
  );
  const min = parseInt(String(data.min || "0"), 10);
  const max = parseInt(String(data.max || "100"), 10);
  const step = parseInt(String(data.step || "1"), 10);
  const marks = [];
  if (data.markStep && parseInt(String(data.markStep), 10) > 0) {
    const markStep = parseInt(String(data.markStep), 10);
    for (let i = min; i <= max; i += markStep) {
      marks.push(
        /* @__PURE__ */ import_react19.default.createElement("div", { key: i, className: "absolute text-xs -translate-x-1/2", style: { left: `${(i - min) / (max - min) * 100}%`, top: "20px" } }, i)
      );
    }
  }
  const valueDisplay = data.showValue ? data.showValue.replace("{value}", String(value)) : `Value: ${value}`;
  return /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-4" }, data.label && /* @__PURE__ */ import_react19.default.createElement(Label, { htmlFor: data.fieldName }, data.label), data.description && /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react19.default.createElement("div", { className: "pt-2" }, /* @__PURE__ */ import_react19.default.createElement(
    Slider,
    {
      id: data.fieldName,
      min,
      max,
      step,
      value: [value],
      onValueChange: (values) => setValue(values[0]),
      className: "mb-6"
    }
  ), marks.length > 0 && /* @__PURE__ */ import_react19.default.createElement("div", { className: "relative h-6 mt-1" }, marks), /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex justify-between text-sm text-muted-foreground" }, /* @__PURE__ */ import_react19.default.createElement("span", null, min), /* @__PURE__ */ import_react19.default.createElement("span", { className: "font-medium text-primary" }, valueDisplay), /* @__PURE__ */ import_react19.default.createElement("span", null, max))));
};
var RangeBlockPreview = () => {
  return /* @__PURE__ */ import_react19.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react19.default.createElement(
    Slider,
    {
      value: [50],
      max: 100,
      step: 1,
      disabled: true,
      className: "w-4/5 max-w-full"
    }
  ));
};
var RangeBlock = {
  type: "range",
  name: "Range Slider",
  description: "Slider for selecting numeric values within a range",
  icon: /* @__PURE__ */ import_react19.default.createElement(import_lucide_react19.ArrowRightToLine, { className: "w-4 h-4" }),
  defaultData: {
    type: "range",
    fieldName: `range${(0, import_uuid8.v4)().substring(0, 4)}`,
    label: "Select a value",
    description: "",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: "Selected: {value}",
    markStep: 25
  },
  renderItem: (props) => /* @__PURE__ */ import_react19.default.createElement(RangeBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react19.default.createElement(RangeBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react19.default.createElement(RangeBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    const min = parseInt(String(data.min || "0"), 10);
    const max = parseInt(String(data.max || "100"), 10);
    if (min >= max) return "Minimum value must be less than maximum value";
    return null;
  }
};

// src/components/blocks/DatePickerBlock.tsx
var import_react22 = __toESM(require("react"));
var import_lucide_react20 = require("lucide-react");
var import_uuid9 = require("uuid");

// src/components/ui/calendar.tsx
var import_react20 = __toESM(require("react"));
var Calendar = ({
  selected,
  onSelect,
  className
}) => {
  const [currentMonth, setCurrentMonth] = (0, import_react20.useState)(
    selected ? new Date(selected) : /* @__PURE__ */ new Date()
  );
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };
  const isSelected = (date) => {
    if (!selected) return false;
    return date.getDate() === selected.getDate() && date.getMonth() === selected.getMonth() && date.getFullYear() === selected.getFullYear();
  };
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const daysArray = [];
    weekdays.forEach((day) => {
      daysArray.push(
        /* @__PURE__ */ import_react20.default.createElement("div", { key: `weekday-${day}`, className: "text-center text-sm font-medium" }, day)
      );
    });
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(/* @__PURE__ */ import_react20.default.createElement("div", { key: `empty-${i}` }));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      daysArray.push(
        /* @__PURE__ */ import_react20.default.createElement("div", { key: `day-${day}`, className: "text-center p-1" }, /* @__PURE__ */ import_react20.default.createElement(
          Button,
          {
            variant: isSelected(date) ? "default" : "ghost",
            className: cn(
              "h-8 w-8 rounded-full p-0 font-normal",
              isSelected(date) && "bg-primary text-primary-foreground"
            ),
            onClick: () => onSelect == null ? void 0 : onSelect(date)
          },
          day
        ))
      );
    }
    return daysArray;
  };
  return /* @__PURE__ */ import_react20.default.createElement("div", { className: cn("p-3", className) }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ import_react20.default.createElement(Button, { variant: "ghost", size: "sm", onClick: prevMonth }, "<"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "font-medium" }, formatMonth(currentMonth)), /* @__PURE__ */ import_react20.default.createElement(Button, { variant: "ghost", size: "sm", onClick: nextMonth }, ">")), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-7 gap-1" }, renderCalendar()));
};

// src/components/ui/switch.tsx
var import_react21 = __toESM(require("react"));
var Switch = ({
  id,
  className,
  checked = false,
  onCheckedChange,
  ...props
}) => {
  const handleChange = (e) => {
    onCheckedChange == null ? void 0 : onCheckedChange(e.target.checked);
  };
  return /* @__PURE__ */ import_react21.default.createElement("div", { className: cn("relative inline-flex h-5 w-9 flex-shrink-0 items-center", className) }, /* @__PURE__ */ import_react21.default.createElement(
    "input",
    {
      type: "checkbox",
      id,
      checked,
      onChange: handleChange,
      className: "peer sr-only",
      ...props
    }
  ), /* @__PURE__ */ import_react21.default.createElement(
    "label",
    {
      htmlFor: id,
      className: cn(
        "absolute left-0 right-0 h-5 w-9 cursor-pointer rounded-full transition-colors",
        "after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform",
        checked ? "bg-primary after:translate-x-4" : "bg-input after:translate-x-0",
        "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
      )
    }
  ));
};

// src/components/blocks/DatePickerBlock.tsx
var formatDate = (date, format = "PPP") => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  if (format === "PP") {
    options.month = "short";
  } else if (format === "P") {
    options.month = "numeric";
  }
  return date.toLocaleDateString("en-US", options);
};
var DatePickerBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleDateChange = (date) => {
    if (date) {
      onUpdate == null ? void 0 : onUpdate({
        ...data,
        defaultValue: date.toISOString()
      });
    } else {
      onUpdate == null ? void 0 : onUpdate({
        ...data,
        defaultValue: void 0
      });
    }
  };
  const defaultDate = data.defaultValue ? new Date(data.defaultValue) : void 0;
  const formattedDate = defaultDate ? formatDate(defaultDate, "PPP") : "No default date";
  return /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "dateField1"
    }
  ), /* @__PURE__ */ import_react22.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "label" }, "Question Label"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ import_react22.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "placeholder" }, "Placeholder"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "placeholder",
      value: data.placeholder || "",
      onChange: (e) => handleChange("placeholder", e.target.value),
      placeholder: "Select a date..."
    }
  )), /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "dateFormat" }, "Date Format"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "dateFormat",
      value: data.dateFormat || "",
      onChange: (e) => handleChange("dateFormat", e.target.value),
      placeholder: "PPP (e.g., April 29, 2025)"
    }
  ), /* @__PURE__ */ import_react22.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Format pattern: PPP, PP, or P"))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "defaultValue" }, "Default Value"), /* @__PURE__ */ import_react22.default.createElement(PopoverRoot, null, /* @__PURE__ */ import_react22.default.createElement(PopoverTrigger, null, /* @__PURE__ */ import_react22.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      className: cn(
        "w-full justify-start text-left font-normal",
        !defaultDate && "text-muted-foreground"
      )
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react20.CalendarIcon, { className: "mr-2 h-4 w-4" }),
    formattedDate
  )), /* @__PURE__ */ import_react22.default.createElement(PopoverContent, null, /* @__PURE__ */ import_react22.default.createElement(
    Calendar,
    {
      selected: defaultDate,
      onSelect: handleDateChange
    }
  )))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2 pt-6" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react22.default.createElement(
    Switch,
    {
      id: "showCalendarOnFocus",
      checked: data.showCalendarOnFocus === true,
      onCheckedChange: (checked) => handleChange("showCalendarOnFocus", checked)
    }
  ), /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "showCalendarOnFocus" }, "Show calendar on input focus")))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-3 gap-4" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "minDate" }, "Minimum Date"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "minDate",
      type: "date",
      value: data.minDate || "",
      onChange: (e) => handleChange("minDate", e.target.value)
    }
  )), /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "maxDate" }, "Maximum Date"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "maxDate",
      type: "date",
      value: data.maxDate || "",
      onChange: (e) => handleChange("maxDate", e.target.value)
    }
  )), /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: "disabledDays" }, "Disabled Days"), /* @__PURE__ */ import_react22.default.createElement(
    Input,
    {
      id: "disabledDays",
      placeholder: "0,6 (Sun,Sat)",
      value: data.disabledDays || "",
      onChange: (e) => handleChange("disabledDays", e.target.value)
    }
  ), /* @__PURE__ */ import_react22.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Comma-separated days (0=Sun, 6=Sat)"))));
};
var DatePickerBlockItem = ({
  data
}) => {
  const [date, setDate] = import_react22.default.useState(
    data.defaultValue ? new Date(data.defaultValue) : void 0
  );
  const [isOpen, setIsOpen] = import_react22.default.useState(false);
  const formatSelectedDate = (date2) => {
    try {
      return formatDate(date2, data.dateFormat || "PPP");
    } catch (e) {
      return formatDate(date2, "PPP");
    }
  };
  const disabledDays = import_react22.default.useMemo(() => {
    if (!data.disabledDays) return void 0;
    try {
      return data.disabledDays.split(",").map((d) => parseInt(d.trim(), 10));
    } catch (e) {
      return void 0;
    }
  }, [data.disabledDays]);
  const dateConstraints = import_react22.default.useMemo(() => {
    const constraints = {};
    if (data.minDate) {
      try {
        constraints.from = new Date(data.minDate);
      } catch (e) {
      }
    }
    if (data.maxDate) {
      try {
        constraints.to = new Date(data.maxDate);
      } catch (e) {
      }
    }
    return constraints;
  }, [data.minDate, data.maxDate]);
  return /* @__PURE__ */ import_react22.default.createElement("div", { className: "space-y-2" }, data.label && /* @__PURE__ */ import_react22.default.createElement(Label, { htmlFor: data.fieldName }, data.label), data.description && /* @__PURE__ */ import_react22.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react22.default.createElement(PopoverRoot, null, /* @__PURE__ */ import_react22.default.createElement(PopoverTrigger, null, /* @__PURE__ */ import_react22.default.createElement(
    Button,
    {
      type: "button",
      id: data.fieldName,
      variant: "outline",
      className: cn(
        "w-full justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react20.CalendarIcon, { className: "mr-2 h-4 w-4" }),
    date ? formatSelectedDate(date) : data.placeholder || "Select a date"
  )), /* @__PURE__ */ import_react22.default.createElement(PopoverContent, null, /* @__PURE__ */ import_react22.default.createElement(
    Calendar,
    {
      selected: date,
      onSelect: setDate,
      disabled: dateConstraints,
      disableWeekdays: disabledDays
    }
  ))));
};
var DatePickerBlockPreview = () => {
  return /* @__PURE__ */ import_react22.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react22.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      className: "w-4/5 max-w-full justify-start text-left font-normal text-muted-foreground",
      disabled: true
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react20.CalendarIcon, { className: "mr-2 h-4 w-4" }),
    "Date picker"
  ));
};
var DatePickerBlock = {
  type: "datepicker",
  name: "Date Picker",
  description: "Calendar component for selecting a date",
  icon: /* @__PURE__ */ import_react22.default.createElement(import_lucide_react20.Calendar, { className: "w-4 h-4" }),
  defaultData: {
    type: "datepicker",
    fieldName: `date${(0, import_uuid9.v4)().substring(0, 4)}`,
    label: "Select a date",
    description: "",
    placeholder: "Pick a date",
    dateFormat: "PPP",
    showCalendarOnFocus: true,
    minDate: "",
    maxDate: "",
    disabledDays: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react22.default.createElement(DatePickerBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react22.default.createElement(DatePickerBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react22.default.createElement(DatePickerBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/FileUploadBlock.tsx
var import_react23 = __toESM(require("react"));
var import_lucide_react21 = require("lucide-react");
var import_uuid10 = require("uuid");
var FileUploadBlockForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleFileExtensions = (extensionsStr) => {
    const extensions = extensionsStr.split(",").map((ext) => ext.trim()).filter((ext) => ext).map((ext) => ext.startsWith(".") ? ext : `.${ext}`);
    handleChange("acceptedFileTypes", extensions);
  };
  return /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "fileUpload1"
    }
  ), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "label" }, "Question Label"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Your question here?"
    }
  ), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Question or prompt shown to the respondent"))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "acceptedFileTypes" }, "Accepted File Types"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "acceptedFileTypes",
      value: (data.acceptedFileTypes || []).join(", "),
      onChange: (e) => handleFileExtensions(e.target.value),
      placeholder: ".jpg, .png, .pdf"
    }
  ), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Comma-separated file extensions")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "maxFileSize" }, "Maximum File Size (MB)"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "maxFileSize",
      type: "number",
      value: data.maxFileSize || "5",
      onChange: (e) => handleChange("maxFileSize", e.target.value),
      min: "0.1",
      step: "0.1"
    }
  ))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "maxFiles" }, "Maximum Files"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "maxFiles",
      type: "number",
      value: data.maxFiles || "1",
      onChange: (e) => handleChange("maxFiles", e.target.value),
      min: "1",
      step: "1"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2 pt-6" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react23.default.createElement(
    Checkbox,
    {
      id: "showPreview",
      checked: data.showPreview === true,
      onCheckedChange: (checked) => handleChange("showPreview", !!checked)
    }
  ), /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "showPreview" }, "Show previews for images")))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "helpText" }, "Upload Instructions"), /* @__PURE__ */ import_react23.default.createElement(
    Input,
    {
      id: "helpText",
      value: data.helpText || "",
      onChange: (e) => handleChange("helpText", e.target.value),
      placeholder: "Drag and drop files here or click to browse"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2 pt-1" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react23.default.createElement(
    Checkbox,
    {
      id: "required",
      checked: data.required === true,
      onCheckedChange: (checked) => handleChange("required", !!checked)
    }
  ), /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: "required" }, "Required"))));
};
var FileUploadBlockItem = ({
  data
}) => {
  var _a;
  const fileInputRef = import_react23.default.useRef(null);
  const [files, setFiles] = import_react23.default.useState([]);
  const [isDragging, setIsDragging] = import_react23.default.useState(false);
  const handleFileSelect = (selectedFiles) => {
    var _a2;
    if (!selectedFiles) return;
    const maxFiles = parseInt(String(data.maxFiles || "1"), 10);
    const maxFileSize = parseFloat(String(data.maxFileSize || "5")) * 1024 * 1024;
    const acceptedTypes = data.acceptedFileTypes || [];
    const validFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileExt = `.${(_a2 = file.name.split(".").pop()) == null ? void 0 : _a2.toLowerCase()}`;
      const isValidType = acceptedTypes.length === 0 || acceptedTypes.includes(fileExt);
      const isValidSize = file.size <= maxFileSize;
      if (isValidType && isValidSize) {
        validFiles.push(file);
      }
    }
    const newFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(newFiles);
  };
  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };
  const renderFilePreviews = () => {
    return files.map((file, index) => {
      const isImage = file.type.startsWith("image/");
      const showPreview = data.showPreview && isImage;
      return /* @__PURE__ */ import_react23.default.createElement(
        "div",
        {
          key: index,
          className: "flex items-center gap-2 p-2 rounded-md border bg-card mt-2"
        },
        showPreview && /* @__PURE__ */ import_react23.default.createElement("div", { className: "w-10 h-10 flex-shrink-0 rounded overflow-hidden" }, /* @__PURE__ */ import_react23.default.createElement(
          "img",
          {
            src: URL.createObjectURL(file),
            alt: file.name,
            className: "w-full h-full object-cover"
          }
        )),
        /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex-grow truncate" }, /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-sm font-medium truncate" }, file.name), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-muted-foreground" }, (file.size / 1024).toFixed(1), " KB")),
        /* @__PURE__ */ import_react23.default.createElement(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "icon",
            onClick: () => handleRemoveFile(index),
            className: "flex-shrink-0"
          },
          /* @__PURE__ */ import_react23.default.createElement(import_lucide_react21.X, { className: "h-4 w-4" })
        )
      );
    });
  };
  return /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, data.label && /* @__PURE__ */ import_react23.default.createElement(Label, { htmlFor: data.fieldName }, data.label), data.description && /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react23.default.createElement(
    "div",
    {
      className: `border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"}`,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: () => {
        var _a2;
        return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
      }
    },
    /* @__PURE__ */ import_react23.default.createElement(import_lucide_react21.FileUp, { className: "mx-auto h-10 w-10 text-muted-foreground mb-2" }),
    /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-sm font-medium mb-1" }, data.helpText || "Drag and drop files here or click to browse"),
    /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-muted-foreground" }, data.acceptedFileTypes && data.acceptedFileTypes.length > 0 ? `Accepted formats: ${data.acceptedFileTypes.join(", ")}` : "All file formats accepted", data.maxFileSize && ` \u2022 Max size: ${data.maxFileSize} MB`, data.maxFiles && parseInt(String(data.maxFiles), 10) > 1 && ` \u2022 Max files: ${data.maxFiles}`),
    /* @__PURE__ */ import_react23.default.createElement(
      "input",
      {
        ref: fileInputRef,
        id: data.fieldName,
        type: "file",
        className: "hidden",
        accept: ((_a = data.acceptedFileTypes) == null ? void 0 : _a.join(",")) || void 0,
        multiple: parseInt(String(data.maxFiles || "1"), 10) > 1,
        onChange: (e) => handleFileSelect(e.target.files)
      }
    )
  ), files.length > 0 && /* @__PURE__ */ import_react23.default.createElement("div", { className: "mt-4 space-y-1" }, renderFilePreviews()));
};
var FileUploadBlockPreview = () => {
  return /* @__PURE__ */ import_react23.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center border rounded px-3 py-2 w-4/5 max-w-full text-muted-foreground" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react21.Upload, { className: "w-4 h-4 mr-2" }), /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-sm" }, "File upload")));
};
var FileUploadBlock = {
  type: "fileupload",
  name: "File Upload",
  description: "Component for uploading files",
  icon: /* @__PURE__ */ import_react23.default.createElement(import_lucide_react21.Upload, { className: "w-4 h-4" }),
  defaultData: {
    type: "fileupload",
    fieldName: `file${(0, import_uuid10.v4)().substring(0, 4)}`,
    label: "Upload files",
    description: "",
    acceptedFileTypes: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: "5",
    maxFiles: "1",
    helpText: "Drag and drop files here or click to browse",
    showPreview: true,
    required: false
  },
  renderItem: (props) => /* @__PURE__ */ import_react23.default.createElement(FileUploadBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react23.default.createElement(FileUploadBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react23.default.createElement(FileUploadBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/MatrixBlock.tsx
var import_react24 = __toESM(require("react"));

// src/components/ui/table.tsx
var React37 = __toESM(require("react"));
var Table = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement("div", { className: "relative w-full overflow-auto" }, /* @__PURE__ */ React37.createElement(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
)));
Table.displayName = "Table";
var TableHeader = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
  "tfoot",
  {
    ref,
    className: cn("bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/blocks/MatrixBlock.tsx
var import_lucide_react22 = require("lucide-react");
var import_uuid11 = require("uuid");
var MatrixBlockForm = ({
  data,
  onUpdate
}) => {
  const [newQuestionText, setNewQuestionText] = (0, import_react24.useState)("");
  const [newOptionText, setNewOptionText] = (0, import_react24.useState)("");
  const [newOptionValue, setNewOptionValue] = (0, import_react24.useState)("");
  const questions = data.questions || [];
  const options = data.options || [];
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    const newQuestions = [
      ...questions,
      {
        id: (0, import_uuid11.v4)(),
        text: newQuestionText
      }
    ];
    handleChange("questions", newQuestions);
    setNewQuestionText("");
  };
  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    handleChange("questions", newQuestions);
  };
  const handleUpdateQuestion = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      text
    };
    handleChange("questions", newQuestions);
  };
  const handleAddOption = () => {
    if (!newOptionText.trim()) return;
    const newOptions = [
      ...options,
      {
        id: (0, import_uuid11.v4)(),
        text: newOptionText,
        value: newOptionValue || newOptionText
      }
    ];
    handleChange("options", newOptions);
    setNewOptionText("");
    setNewOptionValue("");
  };
  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    handleChange("options", newOptions);
  };
  const handleUpdateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };
    handleChange("options", newOptions);
  };
  return /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react24.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "matrixField1"
    }
  ), /* @__PURE__ */ import_react24.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react24.default.createElement(Label, { htmlFor: "label" }, "Matrix Title"), /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Rate the following items"
    }
  ))), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react24.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text"), /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-2 border rounded-md p-4" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react24.default.createElement(Label, null, "Rows (Questions)")), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-3" }, questions.map((question, index) => /* @__PURE__ */ import_react24.default.createElement("div", { key: question.id, className: "flex items-center gap-2" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react24.default.createElement("span", { className: "text-xs text-muted-foreground" }, index + 1)), /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex-grow" }, /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      value: question.text,
      onChange: (e) => handleUpdateQuestion(index, e.target.value),
      placeholder: "Question text"
    }
  )), /* @__PURE__ */ import_react24.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: () => handleRemoveQuestion(index),
      className: "text-destructive"
    },
    /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.CircleX, { className: "h-4 w-4" })
  ))), /* @__PURE__ */ import_react24.default.createElement("div", { className: "pt-2 border-t" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.CirclePlus, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex-grow" }, /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      value: newQuestionText,
      onChange: (e) => setNewQuestionText(e.target.value),
      placeholder: "Add new question",
      onKeyDown: (e) => e.key === "Enter" && handleAddQuestion()
    }
  )), /* @__PURE__ */ import_react24.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: handleAddQuestion
    },
    /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.CirclePlus, { className: "h-4 w-4 text-primary" })
  ))))), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-2 border rounded-md p-4" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react24.default.createElement(Label, null, "Columns (Answer Options)")), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-3" }, options.map((option, index) => /* @__PURE__ */ import_react24.default.createElement("div", { key: option.id, className: "flex items-center gap-2" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react24.default.createElement("span", { className: "text-xs text-muted-foreground" }, index + 1)), /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      value: option.text,
      onChange: (e) => handleUpdateOption(index, "text", e.target.value),
      placeholder: "Option label"
    }
  ), /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      value: option.value,
      onChange: (e) => handleUpdateOption(index, "value", e.target.value),
      placeholder: "Option value"
    }
  )), /* @__PURE__ */ import_react24.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: () => handleRemoveOption(index),
      className: "text-destructive"
    },
    /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.CircleX, { className: "h-4 w-4" })
  ))), /* @__PURE__ */ import_react24.default.createElement("div", { className: "pt-2 border-t" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.CirclePlus, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react24.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      value: newOptionText,
      onChange: (e) => setNewOptionText(e.target.value),
      placeholder: "New option label"
    }
  ), /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      value: newOptionValue,
      onChange: (e) => setNewOptionValue(e.target.value),
      placeholder: "New option value (optional)"
    }
  )), /* @__PURE__ */ import_react24.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: handleAddOption
    },
    /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.CirclePlus, { className: "h-4 w-4 text-primary" })
  ))))), /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react24.default.createElement(Label, { htmlFor: "columnHeader" }, "Column Header (Optional)"), /* @__PURE__ */ import_react24.default.createElement(
    Input,
    {
      id: "columnHeader",
      value: data.columnHeader || "",
      onChange: (e) => handleChange("columnHeader", e.target.value),
      placeholder: "Rating"
    }
  )));
};
var MatrixBlockItem = ({
  data
}) => {
  const [responses, setResponses] = import_react24.default.useState({});
  const questions = data.questions || [];
  const options = data.options || [];
  const handleSelect = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };
  return /* @__PURE__ */ import_react24.default.createElement("div", { className: "space-y-4" }, data.label && /* @__PURE__ */ import_react24.default.createElement("h3", { className: "text-lg font-medium" }, data.label), data.description && /* @__PURE__ */ import_react24.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react24.default.createElement("div", { className: "border rounded-md overflow-x-auto" }, /* @__PURE__ */ import_react24.default.createElement(Table, null, /* @__PURE__ */ import_react24.default.createElement(TableHeader, null, /* @__PURE__ */ import_react24.default.createElement(TableRow, null, /* @__PURE__ */ import_react24.default.createElement(TableHead, { className: "w-[250px]" }), options.map((option) => /* @__PURE__ */ import_react24.default.createElement(TableHead, { key: option.id, className: "text-center whitespace-nowrap" }, option.text)))), /* @__PURE__ */ import_react24.default.createElement(TableBody, null, questions.map((question) => /* @__PURE__ */ import_react24.default.createElement(
    RadioGroup,
    {
      key: question.id,
      asChild: true,
      value: responses[question.id] || "",
      onValueChange: (value) => handleSelect(question.id, value)
    },
    /* @__PURE__ */ import_react24.default.createElement(TableRow, null, /* @__PURE__ */ import_react24.default.createElement(TableCell, { className: "font-medium" }, question.text), options.map((option) => /* @__PURE__ */ import_react24.default.createElement(TableCell, { key: option.id, className: "text-center" }, /* @__PURE__ */ import_react24.default.createElement(
      RadioGroupItem,
      {
        value: option.value,
        id: `${data.fieldName}-${question.id}-${option.id}`,
        className: "mx-auto"
      }
    ))))
  ))))));
};
var MatrixBlockPreview = () => {
  return /* @__PURE__ */ import_react24.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "w-4/5 max-w-full h-10 border rounded-md flex items-center justify-center" }, /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.Grid3X3, { className: "w-4 h-4 mr-2 text-muted-foreground" }), /* @__PURE__ */ import_react24.default.createElement("span", { className: "text-sm text-muted-foreground" }, "Matrix grid")));
};
var MatrixBlock = {
  type: "matrix",
  name: "Matrix / Grid",
  description: "Grid of questions with the same response options",
  icon: /* @__PURE__ */ import_react24.default.createElement(import_lucide_react22.Grid3X3, { className: "w-4 h-4" }),
  defaultData: {
    type: "matrix",
    fieldName: `matrix${(0, import_uuid11.v4)().substring(0, 4)}`,
    label: "Please rate the following items",
    description: "Select one option for each row",
    columnHeader: "Rating",
    questions: [
      { id: (0, import_uuid11.v4)(), text: "Item 1" },
      { id: (0, import_uuid11.v4)(), text: "Item 2" },
      { id: (0, import_uuid11.v4)(), text: "Item 3" }
    ],
    options: [
      { id: (0, import_uuid11.v4)(), text: "Poor", value: "1" },
      { id: (0, import_uuid11.v4)(), text: "Fair", value: "2" },
      { id: (0, import_uuid11.v4)(), text: "Good", value: "3" },
      { id: (0, import_uuid11.v4)(), text: "Excellent", value: "4" }
    ]
  },
  renderItem: (props) => /* @__PURE__ */ import_react24.default.createElement(MatrixBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react24.default.createElement(MatrixBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react24.default.createElement(MatrixBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Matrix title is required";
    if (!data.questions || data.questions.length === 0) return "At least one question is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/SelectableBoxQuestionBlock.tsx
var import_react25 = __toESM(require("react"));
var import_lucide_react23 = require("lucide-react");
var import_uuid12 = require("uuid");
var SelectableBoxQuestionForm = ({
  data,
  onUpdate
}) => {
  const [newOptionLabel, setNewOptionLabel] = (0, import_react25.useState)("");
  const [newOptionValue, setNewOptionValue] = (0, import_react25.useState)("");
  const options = data.options || [];
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleAddOption = () => {
    if (!newOptionLabel.trim()) return;
    const newOptions = [
      ...options,
      {
        id: (0, import_uuid12.v4)(),
        label: newOptionLabel,
        value: newOptionValue || newOptionLabel
      }
    ];
    handleChange("options", newOptions);
    setNewOptionLabel("");
    setNewOptionValue("");
  };
  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    handleChange("options", newOptions);
  };
  const handleUpdateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };
    handleChange("options", newOptions);
  };
  return /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react25.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "selectBox1"
    }
  ), /* @__PURE__ */ import_react25.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing responses")), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react25.default.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "What's your goal?"
    }
  ))), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react25.default.createElement(Label, { htmlFor: "description" }, "Description/Help Text (Optional)"), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Additional information about this question"
    }
  )), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2 border rounded-md p-4" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react25.default.createElement(Label, null, "Selectable Options")), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-3" }, options.map((option, index) => /* @__PURE__ */ import_react25.default.createElement("div", { key: option.id, className: "flex items-center gap-2" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react25.default.createElement("span", { className: "text-xs text-muted-foreground" }, index + 1)), /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      value: option.label,
      onChange: (e) => handleUpdateOption(index, "label", e.target.value),
      placeholder: "Option label"
    }
  ), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      value: option.value,
      onChange: (e) => handleUpdateOption(index, "value", e.target.value),
      placeholder: "Option value"
    }
  )), /* @__PURE__ */ import_react25.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: () => handleRemoveOption(index),
      className: "text-destructive"
    },
    /* @__PURE__ */ import_react25.default.createElement(import_lucide_react23.CircleX, { className: "h-4 w-4" })
  ))), /* @__PURE__ */ import_react25.default.createElement("div", { className: "pt-2 border-t" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "w-6 h-6 flex items-center justify-center" }, /* @__PURE__ */ import_react25.default.createElement(import_lucide_react23.CirclePlus, { className: "h-4 w-4 text-muted-foreground" })), /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex-grow grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      value: newOptionLabel,
      onChange: (e) => setNewOptionLabel(e.target.value),
      placeholder: "New option label",
      onKeyDown: (e) => e.key === "Enter" && handleAddOption()
    }
  ), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      value: newOptionValue,
      onChange: (e) => setNewOptionValue(e.target.value),
      placeholder: "New option value (optional)"
    }
  )), /* @__PURE__ */ import_react25.default.createElement(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      onClick: handleAddOption
    },
    /* @__PURE__ */ import_react25.default.createElement(import_lucide_react23.CirclePlus, { className: "h-4 w-4 text-primary" })
  ))))), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2 pt-2 border-t" }, /* @__PURE__ */ import_react25.default.createElement(Label, null, "Visual Settings"), /* @__PURE__ */ import_react25.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react25.default.createElement(Label, { htmlFor: "boxSpacing" }, "Spacing Between Boxes"), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      id: "boxSpacing",
      type: "number",
      min: "0",
      max: "8",
      value: data.boxSpacing || "4",
      onChange: (e) => handleChange("boxSpacing", e.target.value)
    }
  ), /* @__PURE__ */ import_react25.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Space between selectable boxes (0-8)")), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react25.default.createElement(Label, { htmlFor: "defaultValue" }, "Default Selected Value (Optional)"), /* @__PURE__ */ import_react25.default.createElement(
    Input,
    {
      id: "defaultValue",
      value: data.defaultValue || "",
      onChange: (e) => handleChange("defaultValue", e.target.value),
      placeholder: "Leave blank for no default selection"
    }
  ))), /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-2 pt-2" }, /* @__PURE__ */ import_react25.default.createElement(Label, { htmlFor: "showSelectionIndicator" }, "Selection Style"), /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react25.default.createElement(
    "input",
    {
      type: "checkbox",
      id: "showSelectionIndicator",
      checked: data.showSelectionIndicator !== false,
      onChange: (e) => handleChange("showSelectionIndicator", e.target.checked),
      className: "rounded border-gray-300 text-primary focus:ring-primary"
    }
  ), /* @__PURE__ */ import_react25.default.createElement("label", { htmlFor: "showSelectionIndicator", className: "text-sm" }, "Show selection indicator icon")))));
};
var SelectableBoxQuestionItem = ({
  data
}) => {
  const [selectedValue, setSelectedValue] = import_react25.default.useState(data.defaultValue || "");
  const idPrefix = (0, import_react25.useId)();
  const options = data.options || [];
  const boxSpacing = data.boxSpacing || "4";
  const showSelectionIndicator = data.showSelectionIndicator !== false;
  return /* @__PURE__ */ import_react25.default.createElement("div", { className: "space-y-4" }, data.label && /* @__PURE__ */ import_react25.default.createElement("h3", { className: "text-2xl font-bold" }, data.label), data.description && /* @__PURE__ */ import_react25.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description), /* @__PURE__ */ import_react25.default.createElement(
    RadioGroup,
    {
      value: selectedValue,
      onValueChange: setSelectedValue,
      className: `space-y-${boxSpacing}`
    },
    options.map((option) => {
      const isSelected = selectedValue === option.value;
      return /* @__PURE__ */ import_react25.default.createElement("div", { key: option.id, className: "relative" }, /* @__PURE__ */ import_react25.default.createElement(
        RadioGroupItem,
        {
          value: option.value,
          id: `${idPrefix}-${data.fieldName}-${option.id}`,
          className: "sr-only"
        }
      ), /* @__PURE__ */ import_react25.default.createElement(
        Label,
        {
          htmlFor: `${idPrefix}-${data.fieldName}-${option.id}`,
          className: "block w-full cursor-pointer"
        },
        /* @__PURE__ */ import_react25.default.createElement(
          Card,
          {
            className: `p-4 transition-colors ${isSelected ? "border-primary bg-primary/5 dark:bg-primary/20" : "hover:bg-accent dark:hover:bg-accent/50"}`
          },
          /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react25.default.createElement("span", { className: "text-foreground" }, option.label), isSelected && showSelectionIndicator && /* @__PURE__ */ import_react25.default.createElement("div", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground" }, /* @__PURE__ */ import_react25.default.createElement(import_lucide_react23.CheckSquare, { className: "h-3 w-3" })))
        )
      ));
    })
  ));
};
var SelectableBoxQuestionPreview = () => {
  return /* @__PURE__ */ import_react25.default.createElement("div", { className: "w-full flex items-center justify-center py-1" }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "w-4/5 max-w-full h-10 border rounded-md flex items-center justify-center" }, /* @__PURE__ */ import_react25.default.createElement(import_lucide_react23.CheckSquare, { className: "w-4 h-4 mr-2 text-muted-foreground" }), /* @__PURE__ */ import_react25.default.createElement("span", { className: "text-sm text-muted-foreground" }, "Selectable Box Question")));
};
var SelectableBoxQuestionBlock = {
  type: "selectablebox",
  name: "Selectable Box Question",
  description: "Question with selectable box options",
  icon: /* @__PURE__ */ import_react25.default.createElement(import_lucide_react23.CheckSquare, { className: "w-4 h-4" }),
  defaultData: {
    type: "selectablebox",
    fieldName: `boxq${(0, import_uuid12.v4)().substring(0, 4)}`,
    label: "What's your goal?",
    description: "",
    boxSpacing: "4",
    defaultValue: "",
    showSelectionIndicator: true,
    options: [
      { id: (0, import_uuid12.v4)(), label: "Lose 5 to 20 lbs", value: "5-20" },
      { id: (0, import_uuid12.v4)(), label: "Lose 21 to 50 lbs", value: "21-50" },
      { id: (0, import_uuid12.v4)(), label: "Lose 51+ lbs", value: "51+" },
      { id: (0, import_uuid12.v4)(), label: "I'm not sure yet", value: "unsure" }
    ]
  },
  renderItem: (props) => /* @__PURE__ */ import_react25.default.createElement(SelectableBoxQuestionItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react25.default.createElement(SelectableBoxQuestionForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react25.default.createElement(SelectableBoxQuestionPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/BMICalculatorBlock.tsx
var import_react26 = __toESM(require("react"));

// src/components/ui/progress.tsx
var React40 = __toESM(require("react"));
var ProgressPrimitive = __toESM(require("@radix-ui/react-progress"));
var Progress = React40.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ React40.createElement(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React40.createElement(
    ProgressPrimitive.Indicator,
    {
      className: "h-full w-full flex-1 bg-primary transition-all",
      style: { transform: `translateX(-${100 - (value || 0)}%)` }
    }
  )
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// src/components/blocks/BMICalculatorBlock.tsx
var import_lucide_react24 = require("lucide-react");
var BMICalculatorForm = ({
  data,
  onUpdate
}) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ import_react26.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "BMI Calculator"
    }
  )), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "description" }, "Description"), /* @__PURE__ */ import_react26.default.createElement(
    Textarea,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Calculate your Body Mass Index",
      rows: 3
    }
  )), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react26.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "bmiResult"
    }
  ), /* @__PURE__ */ import_react26.default.createElement("p", { className: "text-xs text-muted-foreground" }, "The name of the field to store the BMI results")), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "defaultUnit" }, "Default Unit System"), /* @__PURE__ */ import_react26.default.createElement(Select, { value: data.defaultUnit || "metric", onValueChange: (value) => handleChange("defaultUnit", value) }, /* @__PURE__ */ import_react26.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react26.default.createElement(SelectValue, { placeholder: "Select default unit system" })), /* @__PURE__ */ import_react26.default.createElement(SelectContent, null, /* @__PURE__ */ import_react26.default.createElement(SelectItem, { value: "metric" }, "Metric (cm, kg)"), /* @__PURE__ */ import_react26.default.createElement(SelectItem, { value: "imperial" }, "Imperial (ft/in, lbs)")))), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "theme" }, "Theme"), /* @__PURE__ */ import_react26.default.createElement(Select, { value: data.theme || "default", onValueChange: (value) => handleChange("theme", value) }, /* @__PURE__ */ import_react26.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react26.default.createElement(SelectValue, null)), /* @__PURE__ */ import_react26.default.createElement(SelectContent, null, /* @__PURE__ */ import_react26.default.createElement(SelectItem, { value: "default" }, "Default"), /* @__PURE__ */ import_react26.default.createElement(SelectItem, { value: "minimal" }, "Minimal"), /* @__PURE__ */ import_react26.default.createElement(SelectItem, { value: "gradient" }, "Gradient")))), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "className" }, "CSS Class Names"), /* @__PURE__ */ import_react26.default.createElement(
    Input,
    {
      id: "className",
      value: data.className || "",
      onChange: (e) => handleChange("className", e.target.value),
      placeholder: "custom-bmi-calculator"
    }
  )), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement(
    Checkbox,
    {
      id: "showResults",
      checked: !!data.showResults,
      onCheckedChange: (checked) => {
        handleChange("showResults", !!checked);
      }
    }
  ), /* @__PURE__ */ import_react26.default.createElement(Label, { htmlFor: "showResults" }, "Show results?")));
};
var BMICalculatorItem = ({
  data,
  onUpdate
}) => {
  const [unitSystem, setUnitSystem] = (0, import_react26.useState)(data.defaultUnit || "metric");
  const [height, setHeight] = (0, import_react26.useState)(unitSystem === "metric" ? 170 : 70);
  const [weight, setWeight] = (0, import_react26.useState)(unitSystem === "metric" ? 70 : 150);
  const getImperialHeight = () => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return { feet, inches };
  };
  const setImperialHeight = (feet, inches) => {
    setHeight(feet * 12 + inches);
  };
  const calculateBMI = () => {
    let heightInMeters;
    let weightInKg = weight;
    if (unitSystem === "metric") {
      heightInMeters = height / 100;
    } else {
      heightInMeters = height * 0.0254;
      weightInKg = weight * 0.453592;
    }
    const bmi2 = weightInKg / (heightInMeters * heightInMeters);
    return bmi2;
  };
  const getBMIData = (bmi2) => {
    if (bmi2 < 18.5) return {
      category: "Underweight",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      progress: Math.min(bmi2 / 18.5 * 25, 25),
      advice: "Consider gaining weight through a balanced diet"
    };
    if (bmi2 < 25) return {
      category: "Normal Weight",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      progress: 25 + (bmi2 - 18.5) / (25 - 18.5) * 25,
      advice: "Great! Maintain your healthy lifestyle"
    };
    if (bmi2 < 30) return {
      category: "Overweight",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
      progress: 50 + (bmi2 - 25) / (30 - 25) * 25,
      advice: "Consider a balanced diet and regular exercise"
    };
    return {
      category: "Obese",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 border-red-200",
      textColor: "text-red-700",
      progress: Math.min(75 + (bmi2 - 30) / 10 * 25, 100),
      advice: "Consult a healthcare professional for guidance"
    };
  };
  const bmi = calculateBMI();
  const bmiData = getBMIData(bmi);
  const imperialHeight = getImperialHeight();
  import_react26.default.useEffect(() => {
    if (data.fieldName && onUpdate) {
      onUpdate({
        ...data,
        [data.fieldName]: {
          bmi: parseFloat(bmi.toFixed(1)),
          category: bmiData.category,
          height: unitSystem === "metric" ? height : imperialHeight,
          weight,
          unitSystem
        }
      });
    }
  }, [height, weight, unitSystem, bmi, bmiData.category]);
  const theme = data.theme || "default";
  const getCardClassName = () => {
    const base = `w-full max-w-2xl border-0 ${data.className || ""}`;
    switch (theme) {
      case "minimal":
        return `${base} shadow-none bg-transparent`;
      case "gradient":
        return `${base} bg-gradient-to-br from-background via-background to-accent/10 shadow-lg`;
      default:
        return `${base} shadow-md`;
    }
  };
  return /* @__PURE__ */ import_react26.default.createElement(Card, { className: getCardClassName() }, /* @__PURE__ */ import_react26.default.createElement(CardHeader, { className: "text-center pb-6" }, /* @__PURE__ */ import_react26.default.createElement(CardTitle, { className: "flex items-center justify-center gap-3 text-2xl" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: `p-2 rounded-full bg-gradient-to-r ${bmiData.color}` }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Activity, { className: "w-6 h-6 text-white" })), data.label || "BMI Calculator"), data.description && /* @__PURE__ */ import_react26.default.createElement("p", { className: "text-muted-foreground max-w-md mx-auto" }, data.description)), /* @__PURE__ */ import_react26.default.createElement(CardContent, { className: "space-y-8" }, /* @__PURE__ */ import_react26.default.createElement(Tabs, { value: unitSystem, onValueChange: (value) => {
    setUnitSystem(value);
    if (value === "metric") {
      setHeight(170);
      setWeight(70);
    } else {
      setHeight(70);
      setWeight(150);
    }
  }, className: "w-full" }, /* @__PURE__ */ import_react26.default.createElement(TabsList, { className: "grid w-full grid-cols-2 mb-6" }, /* @__PURE__ */ import_react26.default.createElement(TabsTrigger, { value: "metric", className: "flex items-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Ruler, { className: "w-4 h-4" }), "Metric"), /* @__PURE__ */ import_react26.default.createElement(TabsTrigger, { value: "imperial", className: "flex items-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Weight, { className: "w-4 h-4" }), "Imperial")), /* @__PURE__ */ import_react26.default.createElement(TabsContent, { value: "metric", className: "space-y-6" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "grid grid-cols-2 gap-6" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react26.default.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Ruler, { className: "w-4 h-4 text-muted-foreground" }), "Height (cm)"), /* @__PURE__ */ import_react26.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react26.default.createElement(
    Input,
    {
      type: "number",
      value: height,
      onChange: (e) => setHeight(parseInt(e.target.value) || 170),
      min: 100,
      max: 250,
      className: "text-center text-xl font-semibold h-14 text-lg",
      placeholder: "170"
    }
  ), /* @__PURE__ */ import_react26.default.createElement("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "cm"))), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react26.default.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Weight, { className: "w-4 h-4 text-muted-foreground" }), "Weight (kg)"), /* @__PURE__ */ import_react26.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react26.default.createElement(
    Input,
    {
      type: "number",
      value: weight,
      onChange: (e) => setWeight(parseInt(e.target.value) || 70),
      min: 30,
      max: 300,
      className: "text-center text-xl font-semibold h-14",
      placeholder: "70"
    }
  ), /* @__PURE__ */ import_react26.default.createElement("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "kg"))))), /* @__PURE__ */ import_react26.default.createElement(TabsContent, { value: "imperial", className: "space-y-6" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "grid grid-cols-2 gap-6" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react26.default.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Ruler, { className: "w-4 h-4 text-muted-foreground" }), "Height"), /* @__PURE__ */ import_react26.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react26.default.createElement(
    Select,
    {
      value: imperialHeight.feet.toString(),
      onValueChange: (value) => setImperialHeight(parseInt(value), imperialHeight.inches)
    },
    /* @__PURE__ */ import_react26.default.createElement(SelectTrigger, { className: "h-14" }, /* @__PURE__ */ import_react26.default.createElement(SelectValue, null)),
    /* @__PURE__ */ import_react26.default.createElement(SelectContent, null, [3, 4, 5, 6, 7, 8].map((ft) => /* @__PURE__ */ import_react26.default.createElement(SelectItem, { key: ft, value: ft.toString() }, ft, "'")))
  ), /* @__PURE__ */ import_react26.default.createElement(
    Select,
    {
      value: imperialHeight.inches.toString(),
      onValueChange: (value) => setImperialHeight(imperialHeight.feet, parseInt(value))
    },
    /* @__PURE__ */ import_react26.default.createElement(SelectTrigger, { className: "h-14" }, /* @__PURE__ */ import_react26.default.createElement(SelectValue, null)),
    /* @__PURE__ */ import_react26.default.createElement(SelectContent, null, Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ import_react26.default.createElement(SelectItem, { key: i, value: i.toString() }, i, '"')))
  ))), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react26.default.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Weight, { className: "w-4 h-4 text-muted-foreground" }), "Weight (lbs)"), /* @__PURE__ */ import_react26.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react26.default.createElement(
    Input,
    {
      type: "number",
      value: weight,
      onChange: (e) => setWeight(parseInt(e.target.value) || 150),
      min: 70,
      max: 660,
      className: "text-center text-xl font-semibold h-14",
      placeholder: "150"
    }
  ), /* @__PURE__ */ import_react26.default.createElement("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "lbs")))))), /* @__PURE__ */ import_react26.default.createElement(Separator2, null), data.showResults ? /* @__PURE__ */ import_react26.default.createElement("div", { className: `space-y-6 p-6 rounded-xl border-2 ${bmiData.bgColor}` }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "text-center space-y-3" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "flex items-center justify-center gap-2 mb-2" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.TrendingUp, { className: "w-5 h-5 text-muted-foreground" }), /* @__PURE__ */ import_react26.default.createElement("span", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide" }, "Your BMI Score")), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: `text-5xl font-bold bg-gradient-to-r ${bmiData.color} bg-clip-text text-transparent` }, bmi.toFixed(1)), /* @__PURE__ */ import_react26.default.createElement(Badge, { variant: "secondary", className: `px-4 py-1 text-sm font-medium ${bmiData.textColor} bg-white/80` }, bmiData.category))), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "flex justify-between text-xs font-medium text-muted-foreground px-1" }, /* @__PURE__ */ import_react26.default.createElement("span", null, "Underweight"), /* @__PURE__ */ import_react26.default.createElement("span", null, "Normal"), /* @__PURE__ */ import_react26.default.createElement("span", null, "Overweight"), /* @__PURE__ */ import_react26.default.createElement("span", null, "Obese")), /* @__PURE__ */ import_react26.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react26.default.createElement(Progress, { value: bmiData.progress, className: "h-3 bg-white/50" }), /* @__PURE__ */ import_react26.default.createElement("div", { className: "absolute top-0 left-0 h-3 w-full bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-400 rounded-full opacity-20" })), /* @__PURE__ */ import_react26.default.createElement("div", { className: "flex justify-between text-xs text-muted-foreground px-1" }, /* @__PURE__ */ import_react26.default.createElement("span", null, "<18.5"), /* @__PURE__ */ import_react26.default.createElement("span", null, "18.5-24.9"), /* @__PURE__ */ import_react26.default.createElement("span", null, "25-29.9"), /* @__PURE__ */ import_react26.default.createElement("span", null, "\u226530"))), /* @__PURE__ */ import_react26.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react26.default.createElement("p", { className: `text-sm font-medium ${bmiData.textColor}` }, bmiData.advice))) : null));
};
var BMICalculatorPreview = () => {
  return /* @__PURE__ */ import_react26.default.createElement("div", { className: "w-full flex items-center justify-center py-4" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "text-center space-y-3" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "p-2 rounded-full bg-gradient-to-r from-green-500 to-green-600" }, /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Activity, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ import_react26.default.createElement("span", { className: "font-semibold" }, "BMI Calculator")), /* @__PURE__ */ import_react26.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react26.default.createElement("div", { className: "text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent" }, "23.5"), /* @__PURE__ */ import_react26.default.createElement(Badge, { variant: "secondary", className: "text-xs" }, "Normal Weight")), /* @__PURE__ */ import_react26.default.createElement("div", { className: "flex gap-2 justify-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react26.default.createElement("span", null, "Height \u2022 Weight \u2022 BMI"))));
};
var BMICalculatorBlock = {
  type: "bmiCalculator",
  name: "BMI Calculator",
  description: "Modern BMI calculator with sleek design and intuitive controls",
  icon: /* @__PURE__ */ import_react26.default.createElement(import_lucide_react24.Activity, { className: "w-4 h-4" }),
  defaultData: {
    type: "bmiCalculator",
    label: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    fieldName: "bmiResult",
    defaultUnit: "metric",
    showResults: false,
    theme: "default",
    className: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react26.default.createElement(BMICalculatorItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react26.default.createElement(BMICalculatorForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react26.default.createElement(BMICalculatorPreview, null),
  validate: (data) => {
    if (!data.label) return "Label is required";
    if (!data.fieldName) return "Field name is required";
    return null;
  }
};

// src/components/blocks/CalculatedFieldBlock.tsx
var import_react27 = __toESM(require("react"));
var import_lucide_react25 = require("lucide-react");
var CalculatedFieldForm = ({
  data,
  onUpdate
}) => {
  var _a;
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleDependenciesChange = (value) => {
    const dependencies = value.split(",").map((dep) => dep.trim()).filter((dep) => dep.length > 0);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      dependencies
    });
  };
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Calculated Result"
    }
  )), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "description" }, "Description"), /* @__PURE__ */ import_react27.default.createElement(
    Textarea,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "This field is automatically calculated",
      rows: 3
    }
  )), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "calculatedResult"
    }
  ), /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "The name of the field to store the calculated value")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "formula" }, "Formula"), /* @__PURE__ */ import_react27.default.createElement(
    Textarea,
    {
      id: "formula",
      value: data.formula || "",
      onChange: (e) => handleChange("formula", e.target.value),
      placeholder: `// Simple calculation
return fieldA + fieldB * 0.5;

// Or complex logic
if (!bmiCalculator) return "Please complete BMI calculation";
const bmi = Number(bmiCalculator.bmi);
if (bmi >= 30) return "High Risk";
return "Low Risk";`,
      className: "font-mono text-sm min-h-[120px]",
      rows: 8
    }
  ), /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Full JavaScript code block. Can return numbers, strings, or complex objects. Use field names as variables."), /* @__PURE__ */ import_react27.default.createElement("div", { className: "text-xs text-muted-foreground bg-muted p-3 rounded space-y-2" }, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Examples:"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Simple calculation:"), /* @__PURE__ */ import_react27.default.createElement("code", { className: "block mt-1 p-2 bg-background rounded" }, "return height * weight / 10000;")), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Conditional logic:"), /* @__PURE__ */ import_react27.default.createElement("code", { className: "block mt-1 p-2 bg-background rounded text-xs whitespace-pre" }, `if (!income) return "No data";
if (income > 100000) return "High earner";
return "Standard";`)), /* @__PURE__ */ import_react27.default.createElement("div", null, /* @__PURE__ */ import_react27.default.createElement("strong", null, "Complex object access:"), /* @__PURE__ */ import_react27.default.createElement("code", { className: "block mt-1 p-2 bg-background rounded text-xs whitespace-pre" }, `if (!bmiCalculator?.bmi) return "Incomplete";
const bmi = bmiCalculator.bmi;
return bmi > 25 ? "Overweight" : "Normal";`))))), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "dependencies" }, "Dependencies"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "dependencies",
      value: ((_a = data.dependencies) == null ? void 0 : _a.join(", ")) || "",
      onChange: (e) => handleDependenciesChange(e.target.value),
      placeholder: "fieldA, fieldB, fieldC"
    }
  ), /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Comma-separated list of field names that this calculation depends on")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "note" }, "Note"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "note",
      value: data.note || "",
      onChange: (e) => handleChange("note", e.target.value),
      placeholder: "Based on your previous inputs"
    }
  ), /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Optional note to display below the calculated value")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "displayFormat" }, "Display Format"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "displayFormat",
      value: data.displayFormat || "",
      onChange: (e) => handleChange("displayFormat", e.target.value),
      placeholder: "currency, percentage, decimal:2, or leave empty"
    }
  ), /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Optional formatting for numeric results: currency, percentage, decimal:X, or leave empty for raw output")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "resultType" }, "Expected Result Type"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "resultType",
      value: data.resultType || "",
      onChange: (e) => handleChange("resultType", e.target.value),
      placeholder: "number, string, object"
    }
  ), /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Expected return type from the formula (for documentation purposes)")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { htmlFor: "className" }, "CSS Class Names"), /* @__PURE__ */ import_react27.default.createElement(
    Input,
    {
      id: "className",
      value: data.className || "",
      onChange: (e) => handleChange("className", e.target.value),
      placeholder: "calculated-field custom-styles"
    }
  )));
};
var CalculatedFieldItem = ({
  data,
  onUpdate
}) => {
  const [displayValue, setDisplayValue] = (0, import_react27.useState)(data.calculatedValue || null);
  const formatValue = (value) => {
    if (value === null || value === void 0) return "";
    if (typeof value !== "number") {
      return String(value);
    }
    if (!data.displayFormat) return value.toString();
    switch (data.displayFormat) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
      case "percentage":
        return `${(value * 100).toFixed(1)}%`;
      default:
        if (data.displayFormat.startsWith("decimal:")) {
          const decimals = parseInt(data.displayFormat.split(":")[1]) || 2;
          return value.toFixed(decimals);
        }
        return value.toString();
    }
  };
  (0, import_react27.useEffect)(() => {
    if (displayValue !== null && data.fieldName && onUpdate) {
      onUpdate({
        ...data,
        calculatedValue: displayValue,
        [data.fieldName]: displayValue
      });
    }
  }, [displayValue, data.fieldName]);
  const getStatusIcon = () => {
    if (displayValue !== null) return /* @__PURE__ */ import_react27.default.createElement(import_lucide_react25.CheckCircle, { className: "w-4 h-4 text-green-500" });
    return /* @__PURE__ */ import_react27.default.createElement(import_lucide_react25.Info, { className: "w-4 h-4 text-muted-foreground" });
  };
  const getStatusColor = () => {
    if (displayValue !== null) return "border-green-200 bg-green-50";
    return "border-blue-200 bg-blue-50";
  };
  return /* @__PURE__ */ import_react27.default.createElement(Card, { className: `w-full ${data.className || ""}` }, /* @__PURE__ */ import_react27.default.createElement(CardHeader, { className: "pb-3" }, /* @__PURE__ */ import_react27.default.createElement(CardTitle, { className: "flex items-center gap-2 text-lg" }, /* @__PURE__ */ import_react27.default.createElement(import_lucide_react25.Calculator, { className: "w-5 h-5 text-primary" }), data.label || "Calculated Field"), data.description && /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.description)), /* @__PURE__ */ import_react27.default.createElement(CardContent, { className: "space-y-4" }, data.formula && /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { className: "text-sm font-medium" }, "Formula:"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "bg-muted rounded-lg p-3 border" }, /* @__PURE__ */ import_react27.default.createElement("pre", { className: "text-xs font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto" }, data.formula))), data.dependencies && data.dependencies.length > 0 && /* @__PURE__ */ import_react27.default.createElement("div", { className: "flex items-center gap-2 flex-wrap" }, /* @__PURE__ */ import_react27.default.createElement(Label, { className: "text-sm font-medium" }, "Depends on:"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "flex flex-wrap gap-1" }, data.dependencies.map((dep) => /* @__PURE__ */ import_react27.default.createElement(Badge, { key: dep, variant: "secondary", className: "text-xs" }, dep)))), data.resultType && /* @__PURE__ */ import_react27.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react27.default.createElement(Label, { className: "text-sm font-medium" }, "Returns:"), /* @__PURE__ */ import_react27.default.createElement(Badge, { variant: "outline", className: "text-xs font-mono" }, data.resultType))), /* @__PURE__ */ import_react27.default.createElement(Separator2, null), /* @__PURE__ */ import_react27.default.createElement("div", { className: `p-4 rounded-lg border-2 ${getStatusColor()}` }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-sm font-medium text-muted-foreground" }, "Result"), displayValue !== null ? /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-2xl font-bold text-green-700" }, formatValue(displayValue)), typeof displayValue === "object" && /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Object result - check console for full value")) : /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-lg text-muted-foreground" }, "Will be calculated automatically"), /* @__PURE__ */ import_react27.default.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded p-2" }, /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-xs text-blue-800 font-medium mb-1" }, "Preview Formula:"), /* @__PURE__ */ import_react27.default.createElement("pre", { className: "text-xs text-blue-700 font-mono whitespace-pre-wrap" }, data.formula ? data.formula.substring(0, 100) + (data.formula.length > 100 ? "..." : "") : "Not configured")))), getStatusIcon())), data.note && /* @__PURE__ */ import_react27.default.createElement("div", { className: "pt-2" }, /* @__PURE__ */ import_react27.default.createElement("p", { className: "text-sm text-muted-foreground" }, data.note)), !displayValue && data.dependencies && data.dependencies.length > 0 && /* @__PURE__ */ import_react27.default.createElement(Alert, null, /* @__PURE__ */ import_react27.default.createElement(import_lucide_react25.Info, { className: "h-4 w-4" }), /* @__PURE__ */ import_react27.default.createElement(AlertDescription, { className: "text-xs" }, /* @__PURE__ */ import_react27.default.createElement("strong", null, "This field will be calculated from:"), /* @__PURE__ */ import_react27.default.createElement("br", null), data.dependencies.map((dep) => /* @__PURE__ */ import_react27.default.createElement(Badge, { key: dep, variant: "outline", className: "mr-1 mt-1 text-xs" }, dep)), /* @__PURE__ */ import_react27.default.createElement("br", null), /* @__PURE__ */ import_react27.default.createElement("span", { className: "text-muted-foreground" }, "The calculation will happen automatically when the survey is filled out.")))));
};
var CalculatedFieldPreview = () => {
  return /* @__PURE__ */ import_react27.default.createElement("div", { className: "w-full flex items-center justify-center py-3" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "text-center space-y-2" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ import_react27.default.createElement(import_lucide_react25.Calculator, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ import_react27.default.createElement("span", { className: "font-medium" }, "Calculated Field")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react27.default.createElement("div", { className: "bg-muted rounded px-2 py-1" }, /* @__PURE__ */ import_react27.default.createElement("code", { className: "text-xs" }, "if (bmi ", ">", ' 25) return "High Risk"')), /* @__PURE__ */ import_react27.default.createElement("div", { className: "text-lg font-bold text-orange-600" }, "High Risk")), /* @__PURE__ */ import_react27.default.createElement("div", { className: "text-xs text-muted-foreground" }, "Complex formula results")));
};
var CalculatedFieldBlock = {
  type: "calculatedField",
  name: "Calculated Field",
  description: "Display a value calculated from a formula based on other fields",
  icon: /* @__PURE__ */ import_react27.default.createElement(import_lucide_react25.Calculator, { className: "w-4 h-4" }),
  defaultData: {
    type: "calculatedField",
    label: "Calculated Result",
    description: "This field is automatically calculated using custom logic",
    fieldName: "calculatedResult",
    formula: `// Example: BMI risk assessment
if (!bmiCalculator) return "Please complete BMI calculation";
const bmi = Number(bmiCalculator.bmi);
if (isNaN(bmi)) return "Invalid BMI value";
if (bmi >= 30) return "High Risk";
if (bmi >= 25) return "Moderate Risk";
return "Low Risk";`,
    dependencies: ["bmiCalculator"],
    note: "Based on your BMI calculation",
    displayFormat: "",
    resultType: "string",
    className: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react27.default.createElement(CalculatedFieldItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react27.default.createElement(CalculatedFieldForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react27.default.createElement(CalculatedFieldPreview, null),
  validate: (data) => {
    if (!data.label) return "Label is required";
    if (!data.fieldName) return "Field name is required";
    if (!data.formula) return "Formula is required";
    if (!data.dependencies || data.dependencies.length === 0) return "At least one dependency is required";
    return null;
  }
};

// src/components/blocks/ConditionalBlock.tsx
var import_react28 = __toESM(require("react"));
var import_lucide_react26 = require("lucide-react");
var ConditionalBlockForm = ({
  data,
  onUpdate
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const [showChildConfig, setShowChildConfig] = (0, import_react28.useState)(false);
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  const handleChildBlockChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      childBlock: {
        ...data.childBlock,
        [field]: value
      }
    });
  };
  return /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.GitBranch, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ import_react28.default.createElement(Label, { className: "text-base font-medium" }, "Conditional Logic")), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "condition" }, "Condition"), /* @__PURE__ */ import_react28.default.createElement(
    Textarea,
    {
      id: "condition",
      value: data.condition || "",
      onChange: (e) => handleChange("condition", e.target.value),
      placeholder: `// Show this block when condition is true
return age >= 18 && country === "US";

// Or simple field comparison
return fieldA === "Yes";`,
      className: "font-mono text-sm min-h-[100px]",
      rows: 5
    }
  ), /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-xs text-muted-foreground" }, "JavaScript expression that returns true/false. Use field names as variables."), /* @__PURE__ */ import_react28.default.createElement("div", { className: "text-xs text-muted-foreground bg-muted p-3 rounded space-y-2" }, /* @__PURE__ */ import_react28.default.createElement("strong", null, "Examples:"), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react28.default.createElement("code", { className: "block" }, "return age ", ">", "= 18;"), /* @__PURE__ */ import_react28.default.createElement("code", { className: "block" }, "return income ", ">", " 50000 && hasInsurance === true;"), /* @__PURE__ */ import_react28.default.createElement("code", { className: "block" }, 'return bmiCalculator?.category === "Overweight";'), /* @__PURE__ */ import_react28.default.createElement("code", { className: "block" }, 'return answers.includes("Option A");')))), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "dependencies" }, "Dependencies"), /* @__PURE__ */ import_react28.default.createElement(
    Input,
    {
      id: "dependencies",
      value: ((_a = data.dependencies) == null ? void 0 : _a.join(", ")) || "",
      onChange: (e) => {
        const dependencies = e.target.value.split(",").map((dep) => dep.trim()).filter((dep) => dep.length > 0);
        handleChange("dependencies", dependencies);
      },
      placeholder: "age, country, fieldA"
    }
  ), /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Comma-separated list of field names this condition depends on"))), /* @__PURE__ */ import_react28.default.createElement(Separator2, null), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.Code, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ import_react28.default.createElement(Label, { className: "text-base font-medium" }, "Child Block")), /* @__PURE__ */ import_react28.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => setShowChildConfig(!showChildConfig)
    },
    showChildConfig ? /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.Eye, { className: "w-4 h-4" }),
    showChildConfig ? "Hide" : "Show",
    " Config"
  )), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childBlockType" }, "Block Type"), /* @__PURE__ */ import_react28.default.createElement(
    Select,
    {
      value: ((_b = data.childBlock) == null ? void 0 : _b.type) || "text",
      onValueChange: (value) => handleChildBlockChange("type", value)
    },
    /* @__PURE__ */ import_react28.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react28.default.createElement(SelectValue, { placeholder: "Select block type" })),
    /* @__PURE__ */ import_react28.default.createElement(SelectContent, null, /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "text" }, "Text Input"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "textarea" }, "Text Area"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "select" }, "Select Dropdown"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "checkbox" }, "Checkbox"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "radio" }, "Radio Buttons"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "number" }, "Number Input"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "date" }, "Date Input"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "file" }, "File Upload"), /* @__PURE__ */ import_react28.default.createElement(SelectItem, { value: "html" }, "HTML Content"))
  )), showChildConfig && /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-4 p-4 border rounded-lg bg-muted/20" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childLabel" }, "Label"), /* @__PURE__ */ import_react28.default.createElement(
    Input,
    {
      id: "childLabel",
      value: ((_c = data.childBlock) == null ? void 0 : _c.label) || "",
      onChange: (e) => handleChildBlockChange("label", e.target.value),
      placeholder: "Enter label for the child block"
    }
  )), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childFieldName" }, "Field Name"), /* @__PURE__ */ import_react28.default.createElement(
    Input,
    {
      id: "childFieldName",
      value: ((_d = data.childBlock) == null ? void 0 : _d.fieldName) || "",
      onChange: (e) => handleChildBlockChange("fieldName", e.target.value),
      placeholder: "conditionalField"
    }
  )), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childDescription" }, "Description"), /* @__PURE__ */ import_react28.default.createElement(
    Textarea,
    {
      id: "childDescription",
      value: ((_e = data.childBlock) == null ? void 0 : _e.description) || "",
      onChange: (e) => handleChildBlockChange("description", e.target.value),
      placeholder: "Optional description for the child block",
      rows: 2
    }
  )), (((_f = data.childBlock) == null ? void 0 : _f.type) === "text" || ((_g = data.childBlock) == null ? void 0 : _g.type) === "textarea" || ((_h = data.childBlock) == null ? void 0 : _h.type) === "number") && /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childPlaceholder" }, "Placeholder"), /* @__PURE__ */ import_react28.default.createElement(
    Input,
    {
      id: "childPlaceholder",
      value: ((_i = data.childBlock) == null ? void 0 : _i.placeholder) || "",
      onChange: (e) => handleChildBlockChange("placeholder", e.target.value),
      placeholder: "Enter placeholder text"
    }
  )), (((_j = data.childBlock) == null ? void 0 : _j.type) === "select" || ((_k = data.childBlock) == null ? void 0 : _k.type) === "radio" || ((_l = data.childBlock) == null ? void 0 : _l.type) === "checkbox") && /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childOptions" }, "Options"), /* @__PURE__ */ import_react28.default.createElement(
    Textarea,
    {
      id: "childOptions",
      value: ((_n = (_m = data.childBlock) == null ? void 0 : _m.options) == null ? void 0 : _n.join("\n")) || "",
      onChange: (e) => {
        const options = e.target.value.split("\n").filter((opt) => opt.trim().length > 0);
        handleChildBlockChange("options", options);
      },
      placeholder: "Option 1\nOption 2\nOption 3",
      rows: 3
    }
  ), /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-xs text-muted-foreground" }, "One option per line")), ((_o = data.childBlock) == null ? void 0 : _o.type) === "html" && /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "childHtml" }, "HTML Content"), /* @__PURE__ */ import_react28.default.createElement(
    Textarea,
    {
      id: "childHtml",
      value: ((_p = data.childBlock) == null ? void 0 : _p.html) || "",
      onChange: (e) => handleChildBlockChange("html", e.target.value),
      placeholder: "<p>Your HTML content here</p>",
      className: "font-mono text-sm",
      rows: 4
    }
  )))), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement(Label, { htmlFor: "className" }, "CSS Class Names"), /* @__PURE__ */ import_react28.default.createElement(
    Input,
    {
      id: "className",
      value: data.className || "",
      onChange: (e) => handleChange("className", e.target.value),
      placeholder: "conditional-block custom-styles"
    }
  )));
};
var ConditionalBlockItem = ({
  data,
  onUpdate
}) => {
  const [isVisible] = (0, import_react28.useState)(true);
  if (!isVisible) {
    return null;
  }
  const renderChildBlock = () => {
    var _a;
    const childBlock = data.childBlock;
    if (!childBlock) return null;
    switch (childBlock.type) {
      case "text":
      case "number":
        return /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, childBlock.label && /* @__PURE__ */ import_react28.default.createElement(Label, null, childBlock.label), childBlock.description && /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-sm text-muted-foreground" }, childBlock.description), /* @__PURE__ */ import_react28.default.createElement(
          Input,
          {
            type: childBlock.type,
            placeholder: childBlock.placeholder,
            onChange: (e) => {
              if (onUpdate && childBlock.fieldName) {
                onUpdate({
                  ...data,
                  [childBlock.fieldName]: e.target.value
                });
              }
            }
          }
        ));
      case "textarea":
        return /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, childBlock.label && /* @__PURE__ */ import_react28.default.createElement(Label, null, childBlock.label), childBlock.description && /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-sm text-muted-foreground" }, childBlock.description), /* @__PURE__ */ import_react28.default.createElement(
          Textarea,
          {
            placeholder: childBlock.placeholder,
            rows: 3,
            onChange: (e) => {
              if (onUpdate && childBlock.fieldName) {
                onUpdate({
                  ...data,
                  [childBlock.fieldName]: e.target.value
                });
              }
            }
          }
        ));
      case "select":
        return /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, childBlock.label && /* @__PURE__ */ import_react28.default.createElement(Label, null, childBlock.label), childBlock.description && /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-sm text-muted-foreground" }, childBlock.description), /* @__PURE__ */ import_react28.default.createElement(Select, { onValueChange: (value) => {
          if (onUpdate && childBlock.fieldName) {
            onUpdate({
              ...data,
              [childBlock.fieldName]: value
            });
          }
        } }, /* @__PURE__ */ import_react28.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react28.default.createElement(SelectValue, { placeholder: "Select an option" })), /* @__PURE__ */ import_react28.default.createElement(SelectContent, null, (_a = childBlock.options) == null ? void 0 : _a.map((option, index) => /* @__PURE__ */ import_react28.default.createElement(SelectItem, { key: index, value: option }, option)))));
      case "html":
        return /* @__PURE__ */ import_react28.default.createElement(
          "div",
          {
            className: "prose prose-sm max-w-none",
            dangerouslySetInnerHTML: { __html: childBlock.html || "" }
          }
        );
      default:
        return /* @__PURE__ */ import_react28.default.createElement("div", { className: "p-4 border border-dashed rounded-lg text-center text-muted-foreground" }, /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-sm" }, 'Child block type "', childBlock.type, '" will render here'));
    }
  };
  return /* @__PURE__ */ import_react28.default.createElement(Card, { className: `w-full ${data.className || ""}` }, /* @__PURE__ */ import_react28.default.createElement(CardHeader, { className: "pb-3" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react28.default.createElement(CardTitle, { className: "flex items-center gap-2 text-lg" }, /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.GitBranch, { className: "w-5 h-5 text-primary" }), "Conditional Content"), /* @__PURE__ */ import_react28.default.createElement(Badge, { variant: "secondary", className: "text-xs" }, "Condition Met"))), /* @__PURE__ */ import_react28.default.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ import_react28.default.createElement(Alert, null, /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.Info, { className: "h-4 w-4" }), /* @__PURE__ */ import_react28.default.createElement(AlertDescription, null, /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react28.default.createElement("p", { className: "text-sm font-medium" }, "This content is shown when:"), /* @__PURE__ */ import_react28.default.createElement("div", { className: "bg-muted rounded p-2" }, /* @__PURE__ */ import_react28.default.createElement("pre", { className: "text-xs font-mono whitespace-pre-wrap" }, data.condition || "No condition specified")), data.dependencies && data.dependencies.length > 0 && /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center gap-2 flex-wrap" }, /* @__PURE__ */ import_react28.default.createElement("span", { className: "text-xs font-medium" }, "Depends on:"), data.dependencies.map((dep) => /* @__PURE__ */ import_react28.default.createElement(Badge, { key: dep, variant: "outline", className: "text-xs" }, dep)))))), /* @__PURE__ */ import_react28.default.createElement(Separator2, null), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.ChevronRight, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ import_react28.default.createElement("span", { className: "text-sm font-medium text-muted-foreground" }, "Conditional Content:")), /* @__PURE__ */ import_react28.default.createElement("div", { className: "pl-6 border-l-2 border-primary/20" }, renderChildBlock()))));
};
var ConditionalBlockPreview = () => {
  return /* @__PURE__ */ import_react28.default.createElement("div", { className: "w-full flex items-center justify-center py-3" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "text-center space-y-2" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.GitBranch, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ import_react28.default.createElement("span", { className: "font-medium" }, "Conditional Block")), /* @__PURE__ */ import_react28.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react28.default.createElement("div", { className: "flex items-center justify-center gap-1" }, /* @__PURE__ */ import_react28.default.createElement(Badge, { variant: "outline", className: "text-xs" }, "if (condition)"), /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.ChevronRight, { className: "w-3 h-3 text-muted-foreground" }), /* @__PURE__ */ import_react28.default.createElement(Badge, { variant: "secondary", className: "text-xs" }, "show content")), /* @__PURE__ */ import_react28.default.createElement("div", { className: "text-xs text-muted-foreground" }, "Shows content conditionally"))));
};
var ConditionalBlock = {
  type: "conditional",
  name: "Conditional Block",
  description: "Display content only when specific conditions are met",
  icon: /* @__PURE__ */ import_react28.default.createElement(import_lucide_react26.GitBranch, { className: "w-4 h-4" }),
  defaultData: {
    type: "conditional",
    condition: `// Show when age is 18 or older
return age >= 18;`,
    dependencies: ["age"],
    childBlock: {
      type: "text",
      label: "Additional Information",
      fieldName: "additionalInfo",
      placeholder: "Enter additional information",
      description: "This field appears when you're 18 or older"
    },
    className: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react28.default.createElement(ConditionalBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react28.default.createElement(ConditionalBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react28.default.createElement(ConditionalBlockPreview, null),
  validate: (data) => {
    if (!data.condition) return "Condition is required";
    if (!data.childBlock) return "Child block configuration is required";
    if (!data.childBlock.type) return "Child block type is required";
    if (!data.dependencies || data.dependencies.length === 0) {
      return "At least one dependency field is required";
    }
    return null;
  }
};

// src/components/blocks/CheckoutBlock.tsx
var import_react29 = __toESM(require("react"));
var import_lucide_react27 = require("lucide-react");
var import_uuid13 = require("uuid");
var CheckoutBlockForm = ({ data, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "fieldName" }, "Field Name"), /* @__PURE__ */ import_react29.default.createElement(
    Input,
    {
      id: "fieldName",
      value: data.fieldName || "",
      onChange: (e) => handleChange("fieldName", e.target.value),
      placeholder: "checkout"
    }
  ), /* @__PURE__ */ import_react29.default.createElement("p", { className: "text-xs text-muted-foreground" }, "Unique identifier for storing checkout data")), /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "label" }, "Label"), /* @__PURE__ */ import_react29.default.createElement(
    Input,
    {
      id: "label",
      value: data.label || "",
      onChange: (e) => handleChange("label", e.target.value),
      placeholder: "Checkout Information"
    }
  ))), /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "description" }, "Description"), /* @__PURE__ */ import_react29.default.createElement(
    Input,
    {
      id: "description",
      value: data.description || "",
      onChange: (e) => handleChange("description", e.target.value),
      placeholder: "Please provide your contact and shipping details"
    }
  )), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "showContactInfo",
      checked: !!data.showContactInfo,
      onCheckedChange: (checked) => handleChange("showContactInfo", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "showContactInfo" }, "Show Contact Information")), /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "showShippingAddress",
      checked: !!data.showShippingAddress,
      onCheckedChange: (checked) => handleChange("showShippingAddress", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "showShippingAddress" }, "Show Shipping Address"))), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "showBillingAddress",
      checked: !!data.showBillingAddress,
      onCheckedChange: (checked) => handleChange("showBillingAddress", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "showBillingAddress" }, "Show Billing Address")), /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "sameAsBilling",
      checked: !!data.sameAsBilling,
      onCheckedChange: (checked) => handleChange("sameAsBilling", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "sameAsBilling" }, "Same as Shipping (Default)"))), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "requireEmail",
      checked: !!data.requireEmail,
      onCheckedChange: (checked) => handleChange("requireEmail", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "requireEmail" }, "Require Email")), /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "requirePhone",
      checked: !!data.requirePhone,
      onCheckedChange: (checked) => handleChange("requirePhone", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "requirePhone" }, "Require Phone"))), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "collectFullName",
      checked: !!data.collectFullName,
      onCheckedChange: (checked) => handleChange("collectFullName", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "collectFullName" }, "Collect Full Name")), /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react29.default.createElement(
    Checkbox,
    {
      id: "allowCompany",
      checked: !!data.allowCompany,
      onCheckedChange: (checked) => handleChange("allowCompany", !!checked)
    }
  ), /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "allowCompany" }, "Allow Company Field"))), /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "defaultCountry" }, "Default Country"), /* @__PURE__ */ import_react29.default.createElement(Select, { value: data.defaultCountry || "US", onValueChange: (value) => handleChange("defaultCountry", value) }, /* @__PURE__ */ import_react29.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react29.default.createElement(SelectValue, { placeholder: "Select country" })), /* @__PURE__ */ import_react29.default.createElement(SelectContent, null, /* @__PURE__ */ import_react29.default.createElement(SelectItem, { value: "US" }, "United States"), /* @__PURE__ */ import_react29.default.createElement(SelectItem, { value: "CA" }, "Canada"), /* @__PURE__ */ import_react29.default.createElement(SelectItem, { value: "GB" }, "United Kingdom"), /* @__PURE__ */ import_react29.default.createElement(SelectItem, { value: "AU" }, "Australia"), /* @__PURE__ */ import_react29.default.createElement(SelectItem, { value: "FR" }, "France"), /* @__PURE__ */ import_react29.default.createElement(SelectItem, { value: "DE" }, "Germany")))), /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react29.default.createElement(Label, { htmlFor: "className" }, "CSS Class Names"), /* @__PURE__ */ import_react29.default.createElement(
    Input,
    {
      id: "className",
      value: data.className || "",
      onChange: (e) => handleChange("className", e.target.value),
      placeholder: "checkout-form"
    }
  )));
};
var CheckoutBlockItem = ({ data }) => {
  return /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-6 p-4 border rounded-lg bg-gray-50" }, data.label && /* @__PURE__ */ import_react29.default.createElement(Label, { className: "text-lg font-semibold" }, data.label), data.showContactInfo && /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react29.default.createElement("h3", { className: "font-medium text-sm text-gray-700" }, "Contact Information"), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, data.requireEmail && /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Email address", className: "text-sm" }), data.requirePhone && /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Phone number", className: "text-sm" }))), data.showShippingAddress && /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react29.default.createElement("h3", { className: "font-medium text-sm text-gray-700" }, "Shipping Address"), /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2" }, data.collectFullName && /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "First name", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Last name", className: "text-sm" })), data.allowCompany && /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Company (optional)", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Address line 1", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Address line 2 (optional)", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2" }, /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "City", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "State", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "ZIP code", className: "text-sm" })))), data.showBillingAddress && /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react29.default.createElement("h3", { className: "font-medium text-sm text-gray-700" }, "Billing Address"), /* @__PURE__ */ import_react29.default.createElement("div", { className: "flex items-center space-x-2 mb-2" }, /* @__PURE__ */ import_react29.default.createElement(Checkbox, { disabled: true, checked: data.sameAsBilling }), /* @__PURE__ */ import_react29.default.createElement(Label, { className: "text-sm" }, "Same as shipping address")), /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2 opacity-50" }, /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Address line 1", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2" }, /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "City", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "State", className: "text-sm" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "ZIP code", className: "text-sm" })))));
};
var CheckoutBlockPreview = () => {
  return /* @__PURE__ */ import_react29.default.createElement("div", { className: "w-full flex items-center justify-center py-2" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "space-y-2 w-4/5 max-w-full" }, /* @__PURE__ */ import_react29.default.createElement("div", { className: "text-xs font-medium text-gray-600" }, "Contact & Shipping"), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Email", className: "text-xs h-8" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "Address", className: "text-xs h-8" }), /* @__PURE__ */ import_react29.default.createElement("div", { className: "grid grid-cols-3 gap-1" }, /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "City", className: "text-xs h-8" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "State", className: "text-xs h-8" }), /* @__PURE__ */ import_react29.default.createElement(Input, { disabled: true, placeholder: "ZIP", className: "text-xs h-8" }))));
};
var CheckoutBlock = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details with Shopify-like experience",
  icon: /* @__PURE__ */ import_react29.default.createElement(import_lucide_react27.ShoppingCart, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkout",
    fieldName: `checkout${(0, import_uuid13.v4)().substring(0, 4)}`,
    label: "Checkout Information",
    description: "Please provide your contact and shipping details",
    showContactInfo: true,
    showShippingAddress: true,
    showBillingAddress: false,
    sameAsBilling: true,
    requireEmail: true,
    requirePhone: true,
    collectFullName: true,
    allowCompany: false,
    defaultCountry: "US",
    className: ""
  },
  renderItem: (props) => /* @__PURE__ */ import_react29.default.createElement(CheckoutBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ import_react29.default.createElement(CheckoutBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ import_react29.default.createElement(CheckoutBlockPreview, null),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    return null;
  }
};

// src/components/blocks/index.ts
var StandardBlocks = [
  // Basic input blocks
  TextInputBlock,
  TextareaBlock,
  SelectBlock,
  RadioBlock,
  CheckboxBlock,
  // Advanced input blocks
  RangeBlock,
  DatePickerBlock,
  FileUploadBlock,
  MatrixBlock,
  SelectableBoxQuestionBlock,
  // Content blocks
  MarkdownBlock,
  HtmlBlock,
  // Logic blocks
  AuthBlock,
  ScriptBlock,
  // Advanced calculation and conditional blocks
  BMICalculatorBlock,
  CalculatedFieldBlock,
  ConditionalBlock,
  CheckoutBlock
];

// src/components/nodes/SectionNodeDefinition.tsx
var import_react35 = __toESM(require("react"));
var import_lucide_react30 = require("lucide-react");
var import_uuid16 = require("uuid");

// src/survey/nodes/SectionNode.tsx
var import_react34 = require("react");

// src/survey/blocks/ContentBlockPage.tsx
var import_react33 = require("react");

// src/components/ui/sortable.tsx
var import_core = require("@dnd-kit/core");
var import_modifiers = require("@dnd-kit/modifiers");
var import_sortable = require("@dnd-kit/sortable");
var import_utilities = require("@dnd-kit/utilities");
var import_react_slot2 = require("@radix-ui/react-slot");
var React46 = __toESM(require("react"));
var ReactDOM = __toESM(require("react-dom"));

// src/lib/composition.ts
var React45 = __toESM(require("react"));
function setRef(ref, value) {
  if (typeof ref === "function") {
    const result = ref(value);
    return typeof result === "function" ? result : void 0;
  }
  if (ref !== null && ref !== void 0 && typeof ref === "object" && "current" in ref) {
    ref.current = value;
  }
  return void 0;
}
function composeRefs(...refs) {
  return (node) => {
    const cleanups = [];
    let hasCleanup = false;
    for (const ref of refs) {
      const cleanup = setRef(ref, node);
      cleanups.push(cleanup);
      if (typeof cleanup === "function") {
        hasCleanup = true;
      }
    }
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            const ref = refs[i];
            if (ref && typeof ref !== "function") {
              setRef(ref, null);
            }
          }
        }
      };
    }
    return void 0;
  };
}
function useComposedRefs(...refs) {
  return React45.useCallback(composeRefs(...refs), refs);
}

// src/components/ui/sortable.tsx
var orientationConfig = {
  vertical: {
    modifiers: [import_modifiers.restrictToVerticalAxis, import_modifiers.restrictToParentElement],
    strategy: import_sortable.verticalListSortingStrategy,
    collisionDetection: import_core.closestCenter
  },
  horizontal: {
    modifiers: [import_modifiers.restrictToHorizontalAxis, import_modifiers.restrictToParentElement],
    strategy: import_sortable.horizontalListSortingStrategy,
    collisionDetection: import_core.closestCenter
  },
  mixed: {
    modifiers: [import_modifiers.restrictToParentElement],
    strategy: void 0,
    collisionDetection: import_core.closestCorners
  }
};
var ROOT_NAME = "Sortable";
var CONTENT_NAME = "SortableContent";
var ITEM_NAME = "SortableItem";
var ITEM_HANDLE_NAME = "SortableItemHandle";
var OVERLAY_NAME = "SortableOverlay";
var SORTABLE_ERRORS = {
  [ROOT_NAME]: `\`${ROOT_NAME}\` components must be within \`${ROOT_NAME}\``,
  [CONTENT_NAME]: `\`${CONTENT_NAME}\` must be within \`${ROOT_NAME}\``,
  [ITEM_NAME]: `\`${ITEM_NAME}\` must be within \`${CONTENT_NAME}\``,
  [ITEM_HANDLE_NAME]: `\`${ITEM_HANDLE_NAME}\` must be within \`${ITEM_NAME}\``,
  [OVERLAY_NAME]: `\`${OVERLAY_NAME}\` must be within \`${ROOT_NAME}\``
};
var SortableRootContext = React46.createContext(null);
SortableRootContext.displayName = ROOT_NAME;
function useSortableContext(name) {
  const context = React46.useContext(SortableRootContext);
  if (!context) {
    throw new Error(SORTABLE_ERRORS[name]);
  }
  return context;
}
function Sortable(props) {
  const {
    value,
    onValueChange,
    collisionDetection,
    modifiers,
    strategy,
    onMove,
    orientation = "vertical",
    flatCursor = false,
    getItemValue: getItemValueProp,
    accessibility,
    ...sortableProps
  } = props;
  const id = React46.useId();
  const [activeId, setActiveId] = React46.useState(null);
  const sensors = (0, import_core.useSensors)(
    (0, import_core.useSensor)(import_core.MouseSensor),
    (0, import_core.useSensor)(import_core.TouchSensor),
    (0, import_core.useSensor)(import_core.KeyboardSensor, {
      coordinateGetter: import_sortable.sortableKeyboardCoordinates
    })
  );
  const config = React46.useMemo(
    () => orientationConfig[orientation],
    [orientation]
  );
  const getItemValue = React46.useCallback(
    (item) => {
      if (typeof item === "object" && !getItemValueProp) {
        throw new Error("getItemValue is required when using array of objects");
      }
      return getItemValueProp ? getItemValueProp(item) : item;
    },
    [getItemValueProp]
  );
  const items = React46.useMemo(() => {
    return value.map((item) => getItemValue(item));
  }, [value, getItemValue]);
  const onDragStart = React46.useCallback(
    (event) => {
      var _a;
      (_a = sortableProps.onDragStart) == null ? void 0 : _a.call(sortableProps, event);
      if (event.activatorEvent.defaultPrevented) return;
      setActiveId(event.active.id);
    },
    [sortableProps.onDragStart]
  );
  const onDragEnd = React46.useCallback(
    (event) => {
      var _a;
      (_a = sortableProps.onDragEnd) == null ? void 0 : _a.call(sortableProps, event);
      if (event.activatorEvent.defaultPrevented) return;
      const { active, over } = event;
      if (over && active.id !== (over == null ? void 0 : over.id)) {
        const activeIndex = value.findIndex(
          (item) => getItemValue(item) === active.id
        );
        const overIndex = value.findIndex(
          (item) => getItemValue(item) === over.id
        );
        if (onMove) {
          onMove({ ...event, activeIndex, overIndex });
        } else {
          onValueChange == null ? void 0 : onValueChange((0, import_sortable.arrayMove)(value, activeIndex, overIndex));
        }
      }
      setActiveId(null);
    },
    [value, onValueChange, onMove, getItemValue, sortableProps.onDragEnd]
  );
  const onDragCancel = React46.useCallback(
    (event) => {
      var _a;
      (_a = sortableProps.onDragCancel) == null ? void 0 : _a.call(sortableProps, event);
      if (event.activatorEvent.defaultPrevented) return;
      setActiveId(null);
    },
    [sortableProps.onDragCancel]
  );
  const announcements = React46.useMemo(
    () => ({
      onDragStart({ active }) {
        var _a;
        const activeValue = active.id.toString();
        return `Grabbed sortable item "${activeValue}". Current position is ${((_a = active.data.current) == null ? void 0 : _a.sortable.index) + 1} of ${value.length}. Use arrow keys to move, space to drop.`;
      },
      onDragOver({ active, over }) {
        var _a, _b, _c, _d;
        if (over) {
          const overIndex = (_b = (_a = over.data.current) == null ? void 0 : _a.sortable.index) != null ? _b : 0;
          const activeIndex = (_d = (_c = active.data.current) == null ? void 0 : _c.sortable.index) != null ? _d : 0;
          const moveDirection = overIndex > activeIndex ? "down" : "up";
          const activeValue = active.id.toString();
          return `Sortable item "${activeValue}" moved ${moveDirection} to position ${overIndex + 1} of ${value.length}.`;
        }
        return "Sortable item is no longer over a droppable area. Press escape to cancel.";
      },
      onDragEnd({ active, over }) {
        var _a, _b;
        const activeValue = active.id.toString();
        if (over) {
          const overIndex = (_b = (_a = over.data.current) == null ? void 0 : _a.sortable.index) != null ? _b : 0;
          return `Sortable item "${activeValue}" dropped at position ${overIndex + 1} of ${value.length}.`;
        }
        return `Sortable item "${activeValue}" dropped. No changes were made.`;
      },
      onDragCancel({ active }) {
        var _a, _b;
        const activeIndex = (_b = (_a = active.data.current) == null ? void 0 : _a.sortable.index) != null ? _b : 0;
        const activeValue = active.id.toString();
        return `Sorting cancelled. Sortable item "${activeValue}" returned to position ${activeIndex + 1} of ${value.length}.`;
      },
      onDragMove({ active, over }) {
        var _a, _b, _c, _d;
        if (over) {
          const overIndex = (_b = (_a = over.data.current) == null ? void 0 : _a.sortable.index) != null ? _b : 0;
          const activeIndex = (_d = (_c = active.data.current) == null ? void 0 : _c.sortable.index) != null ? _d : 0;
          const moveDirection = overIndex > activeIndex ? "down" : "up";
          const activeValue = active.id.toString();
          return `Sortable item "${activeValue}" is moving ${moveDirection} to position ${overIndex + 1} of ${value.length}.`;
        }
        return "Sortable item is no longer over a droppable area. Press escape to cancel.";
      }
    }),
    [value]
  );
  const screenReaderInstructions = React46.useMemo(
    () => ({
      draggable: `
        To pick up a sortable item, press space or enter.
        While dragging, use the ${orientation === "vertical" ? "up and down" : orientation === "horizontal" ? "left and right" : "arrow"} keys to move the item.
        Press space or enter again to drop the item in its new position, or press escape to cancel.
      `
    }),
    [orientation]
  );
  const contextValue = React46.useMemo(
    () => ({
      id,
      items,
      modifiers: modifiers != null ? modifiers : config.modifiers,
      strategy: strategy != null ? strategy : config.strategy,
      activeId,
      setActiveId,
      getItemValue,
      flatCursor
    }),
    [
      id,
      items,
      modifiers,
      strategy,
      config.modifiers,
      config.strategy,
      activeId,
      getItemValue,
      flatCursor
    ]
  );
  return /* @__PURE__ */ React46.createElement(
    SortableRootContext.Provider,
    {
      value: contextValue
    },
    /* @__PURE__ */ React46.createElement(
      import_core.DndContext,
      {
        collisionDetection: collisionDetection != null ? collisionDetection : config.collisionDetection,
        modifiers: modifiers != null ? modifiers : config.modifiers,
        sensors,
        ...sortableProps,
        id,
        onDragStart,
        onDragEnd,
        onDragCancel,
        accessibility: {
          announcements,
          screenReaderInstructions,
          ...accessibility
        }
      }
    )
  );
}
var SortableContentContext = React46.createContext(false);
SortableContentContext.displayName = CONTENT_NAME;
var SortableContent = React46.forwardRef(
  (props, forwardedRef) => {
    const {
      strategy: strategyProp,
      asChild,
      withoutSlot,
      children,
      ...contentProps
    } = props;
    const context = useSortableContext(CONTENT_NAME);
    const ContentPrimitive = asChild ? import_react_slot2.Slot : "div";
    return /* @__PURE__ */ React46.createElement(SortableContentContext.Provider, { value: true }, /* @__PURE__ */ React46.createElement(
      import_sortable.SortableContext,
      {
        items: context.items,
        strategy: strategyProp != null ? strategyProp : context.strategy
      },
      withoutSlot ? children : /* @__PURE__ */ React46.createElement(
        ContentPrimitive,
        {
          "data-slot": "sortable-content",
          ...contentProps,
          ref: forwardedRef
        },
        children
      )
    ));
  }
);
SortableContent.displayName = CONTENT_NAME;
var SortableItemContext = React46.createContext(null);
SortableItemContext.displayName = ITEM_NAME;
var SortableItem = React46.forwardRef(
  (props, forwardedRef) => {
    const {
      value,
      style,
      asHandle,
      asChild,
      disabled,
      className,
      ...itemProps
    } = props;
    const inSortableContent = React46.useContext(SortableContentContext);
    const inSortableOverlay = React46.useContext(SortableOverlayContext);
    if (!inSortableContent && !inSortableOverlay) {
      throw new Error(SORTABLE_ERRORS[ITEM_NAME]);
    }
    if (value === "") {
      throw new Error(`\`${ITEM_NAME}\` value cannot be an empty string`);
    }
    const context = useSortableContext(ITEM_NAME);
    const id = React46.useId();
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging
    } = (0, import_sortable.useSortable)({ id: value, disabled });
    const composedRef = useComposedRefs(forwardedRef, (node) => {
      if (disabled) return;
      setNodeRef(node);
      if (asHandle) setActivatorNodeRef(node);
    });
    const composedStyle = React46.useMemo(() => {
      return {
        transform: import_utilities.CSS.Translate.toString(transform),
        transition,
        ...style
      };
    }, [transform, transition, style]);
    const itemContext = React46.useMemo(
      () => ({
        id,
        attributes,
        listeners,
        setActivatorNodeRef,
        isDragging,
        disabled
      }),
      [id, attributes, listeners, setActivatorNodeRef, isDragging, disabled]
    );
    const ItemPrimitive = asChild ? import_react_slot2.Slot : "div";
    return /* @__PURE__ */ React46.createElement(SortableItemContext.Provider, { value: itemContext }, /* @__PURE__ */ React46.createElement(
      ItemPrimitive,
      {
        id,
        "data-disabled": disabled,
        "data-dragging": isDragging ? "" : void 0,
        "data-slot": "sortable-item",
        ...itemProps,
        ...asHandle && !disabled ? attributes : {},
        ...asHandle && !disabled ? listeners : {},
        ref: composedRef,
        style: composedStyle,
        className: cn(
          "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
          {
            "touch-none select-none": asHandle,
            "cursor-default": context.flatCursor,
            "data-dragging:cursor-grabbing": !context.flatCursor,
            "cursor-grab": !isDragging && asHandle && !context.flatCursor,
            "opacity-50": isDragging,
            "pointer-events-none opacity-50": disabled
          },
          className
        )
      }
    ));
  }
);
SortableItem.displayName = ITEM_NAME;
var SortableItemHandle = React46.forwardRef((props, forwardedRef) => {
  const { asChild, disabled, className, ...itemHandleProps } = props;
  const itemContext = React46.useContext(SortableItemContext);
  if (!itemContext) {
    throw new Error(SORTABLE_ERRORS[ITEM_HANDLE_NAME]);
  }
  const context = useSortableContext(ITEM_HANDLE_NAME);
  const isDisabled = disabled != null ? disabled : itemContext.disabled;
  const composedRef = useComposedRefs(forwardedRef, (node) => {
    if (!isDisabled) return;
    itemContext.setActivatorNodeRef(node);
  });
  const HandlePrimitive = asChild ? import_react_slot2.Slot : "button";
  return /* @__PURE__ */ React46.createElement(
    HandlePrimitive,
    {
      type: "button",
      "aria-controls": itemContext.id,
      "data-disabled": isDisabled,
      "data-dragging": itemContext.isDragging ? "" : void 0,
      "data-slot": "sortable-item-handle",
      ...itemHandleProps,
      ...isDisabled ? {} : itemContext.attributes,
      ...isDisabled ? {} : itemContext.listeners,
      ref: composedRef,
      className: cn(
        "select-none disabled:pointer-events-none disabled:opacity-50",
        context.flatCursor ? "cursor-default" : "cursor-grab data-dragging:cursor-grabbing",
        className
      ),
      disabled: isDisabled
    }
  );
});
SortableItemHandle.displayName = ITEM_HANDLE_NAME;
var SortableOverlayContext = React46.createContext(false);
SortableOverlayContext.displayName = OVERLAY_NAME;
var dropAnimation = {
  sideEffects: (0, import_core.defaultDropAnimationSideEffects)({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
var Root12 = Sortable;
var Content5 = SortableContent;
var Item4 = SortableItem;
var ItemHandle = SortableItemHandle;

// src/survey/blocks/ContentBlockPage.tsx
var import_sortable3 = require("@dnd-kit/sortable");
var import_lucide_react28 = require("lucide-react");

// src/survey/blocks/ContentBlockItem.tsx
var import_react32 = require("react");

// src/components/common/NavigationRulesEditor.tsx
var import_react30 = __toESM(require("react"));
function parseRule2(rule) {
  const match = rule.condition.match(
    /^(\w+)\s*(==|!=|>=|<=|>|<|contains|startsWith|endsWith)\s*(.+)$/
  );
  if (match) {
    const [, field, operator, value] = match;
    return {
      field,
      operator,
      value: value.replace(/^['"]|['"]$/g, ""),
      target: String(rule.target),
      isPage: rule.isPage,
      isDefault: rule.isDefault
    };
  }
  return {
    field: "",
    operator: "==",
    value: "",
    target: String(rule.target),
    isPage: rule.isPage,
    isDefault: rule.isDefault
  };
}
function buildRule2(state) {
  if (state.isDefault) {
    return {
      condition: "true",
      target: state.target,
      isPage: state.isPage,
      isDefault: true
    };
  }
  return {
    condition: `${state.field} ${state.operator} ${JSON.stringify(state.value)}`,
    target: state.target,
    isPage: state.isPage,
    isDefault: state.isDefault
  };
}
var NavigationRulesEditor = ({ data, onUpdate }) => {
  const { state } = useSurveyBuilder();
  const collectFieldNames = import_react30.default.useCallback((node) => {
    if (!node) return [];
    let names = [];
    if (node.fieldName) names.push(node.fieldName);
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        names = names.concat(collectFieldNames(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          names = names.concat(collectFieldNames(n));
        }
      }
    }
    return names;
  }, []);
  const collectPages = import_react30.default.useCallback((node) => {
    if (!node) return [];
    let pages = [];
    if (node.type === "set") {
      pages.push({ uuid: node.uuid || "", name: node.name || node.uuid || "Page" });
    }
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        pages = pages.concat(collectPages(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          pages = pages.concat(collectPages(n));
        }
      }
    }
    return pages;
  }, []);
  const collectBlocks = import_react30.default.useCallback((node) => {
    if (!node) return [];
    let blocks = [];
    if (node.type !== "set") {
      blocks.push({
        uuid: node.uuid || "",
        name: node.name || node.fieldName || node.uuid || "Block"
      });
    }
    if (Array.isArray(node.items)) {
      for (const item of node.items) {
        blocks = blocks.concat(collectBlocks(item));
      }
    }
    if (Array.isArray(node.nodes)) {
      for (const n of node.nodes) {
        if (typeof n !== "string") {
          blocks = blocks.concat(collectBlocks(n));
        }
      }
    }
    return blocks;
  }, []);
  const fieldOptions = import_react30.default.useMemo(() => collectFieldNames(state.rootNode), [state.rootNode]);
  const pageOptions = import_react30.default.useMemo(() => collectPages(state.rootNode), [state.rootNode]);
  const blockOptions = import_react30.default.useMemo(() => collectBlocks(state.rootNode), [state.rootNode]);
  const [rules, setRules] = import_react30.default.useState(() => {
    return (data.navigationRules || []).map(parseRule2);
  });
  import_react30.default.useEffect(() => {
    const converted = rules.map(buildRule2);
    onUpdate == null ? void 0 : onUpdate({ ...data, navigationRules: converted });
  }, [rules]);
  const handleRuleChange = (index, field, value) => {
    setRules((prev) => {
      const newRules = [...prev];
      newRules[index] = { ...newRules[index], [field]: value };
      return newRules;
    });
  };
  const handleTargetChange = (index, val) => {
    if (val === "submit") {
      setRules((prev) => {
        const newRules = [...prev];
        newRules[index] = { ...newRules[index], target: "submit", isPage: false };
        return newRules;
      });
      return;
    }
    const [kind, uuid] = val.split(":");
    setRules((prev) => {
      const newRules = [...prev];
      newRules[index] = { ...newRules[index], target: uuid, isPage: kind === "page" };
      return newRules;
    });
  };
  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { field: "", operator: "==", value: "", target: "", isPage: true }
    ]);
  };
  const removeRule = (index) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ import_react30.default.createElement("div", { className: "space-y-4 mt-4" }, /* @__PURE__ */ import_react30.default.createElement(Label, null, "Navigation Rules"), rules.map((rule, idx) => /* @__PURE__ */ import_react30.default.createElement("div", { key: idx, className: "border rounded-md p-3 space-y-2" }, /* @__PURE__ */ import_react30.default.createElement("div", { className: "grid grid-cols-4 gap-2" }, /* @__PURE__ */ import_react30.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react30.default.createElement(Label, null, "Variable"), /* @__PURE__ */ import_react30.default.createElement(
    Select,
    {
      value: rule.field,
      onValueChange: (val) => handleRuleChange(idx, "field", val)
    },
    /* @__PURE__ */ import_react30.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react30.default.createElement(SelectValue, { placeholder: "Select field" })),
    /* @__PURE__ */ import_react30.default.createElement(SelectContent, null, fieldOptions.map((name) => /* @__PURE__ */ import_react30.default.createElement(SelectItem, { key: name, value: name }, name)))
  )), /* @__PURE__ */ import_react30.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react30.default.createElement(Label, null, "Operator"), /* @__PURE__ */ import_react30.default.createElement(
    Select,
    {
      value: rule.operator,
      onValueChange: (val) => handleRuleChange(idx, "operator", val)
    },
    /* @__PURE__ */ import_react30.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react30.default.createElement(SelectValue, { placeholder: "Operator" })),
    /* @__PURE__ */ import_react30.default.createElement(SelectContent, null, [
      "==",
      "!=",
      ">",
      ">=",
      "<",
      "<=",
      "contains"
    ].map((op) => /* @__PURE__ */ import_react30.default.createElement(SelectItem, { key: op, value: op }, op)))
  )), /* @__PURE__ */ import_react30.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react30.default.createElement(Label, null, "Value"), /* @__PURE__ */ import_react30.default.createElement(
    Input,
    {
      value: rule.value,
      onChange: (e) => handleRuleChange(idx, "value", e.target.value)
    }
  )), /* @__PURE__ */ import_react30.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react30.default.createElement(Label, null, "Target"), /* @__PURE__ */ import_react30.default.createElement(
    Select,
    {
      value: rule.target === "submit" ? "submit" : rule.isPage ? `page:${rule.target}` : `block:${rule.target}`,
      onValueChange: (val) => handleTargetChange(idx, val)
    },
    /* @__PURE__ */ import_react30.default.createElement(SelectTrigger, null, /* @__PURE__ */ import_react30.default.createElement(SelectValue, { placeholder: "Choose" })),
    /* @__PURE__ */ import_react30.default.createElement(SelectContent, null, /* @__PURE__ */ import_react30.default.createElement(SelectGroup, null, /* @__PURE__ */ import_react30.default.createElement(SelectLabel, null, "Pages"), pageOptions.map((p) => /* @__PURE__ */ import_react30.default.createElement(SelectItem, { key: `page-${p.uuid}`, value: `page:${p.uuid}` }, p.name))), /* @__PURE__ */ import_react30.default.createElement(SelectGroup, null, /* @__PURE__ */ import_react30.default.createElement(SelectLabel, null, "Blocks"), blockOptions.map((b) => /* @__PURE__ */ import_react30.default.createElement(SelectItem, { key: `block-${b.uuid}`, value: `block:${b.uuid}` }, b.name))), /* @__PURE__ */ import_react30.default.createElement(SelectItem, { value: "submit" }, "Submit"))
  ))), /* @__PURE__ */ import_react30.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react30.default.createElement(
    Checkbox,
    {
      id: `default-${idx}`,
      checked: rule.isDefault || false,
      onCheckedChange: (checked) => handleRuleChange(idx, "isDefault", !!checked)
    }
  ), /* @__PURE__ */ import_react30.default.createElement(Label, { htmlFor: `default-${idx}` }, "Default"), /* @__PURE__ */ import_react30.default.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => removeRule(idx),
      className: "ml-auto"
    },
    "Remove"
  )))), /* @__PURE__ */ import_react30.default.createElement(Button, { type: "button", variant: "outline", size: "sm", onClick: addRule }, "Add Rule"));
};

// src/components/common/CommonBlockRules.tsx
var import_react31 = __toESM(require("react"));
var CommonBlockRules = ({ data, onUpdate }) => {
  var _a;
  const [isEndBlock, setIsEndBlock] = import_react31.default.useState(!!data.isEndBlock);
  const [autoContinueOnSelect, setAutoContinueOnSelect] = import_react31.default.useState(!!data.autoContinueOnSelect);
  const [showContinueButton, setShowContinueButton] = import_react31.default.useState((_a = data.showContinueButton) != null ? _a : true);
  const handleEndBlockChange = (checked) => {
    setIsEndBlock(checked);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      isEndBlock: checked
    });
  };
  const handleAutoContinueChange = (checked) => {
    setAutoContinueOnSelect(checked);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      autoContinueOnSelect: checked
    });
  };
  const handleShowContinueChange = (checked) => {
    setShowContinueButton(checked);
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      showContinueButton: checked
    });
  };
  import_react31.default.useEffect(() => {
    setIsEndBlock(!!data.isEndBlock);
  }, [data.isEndBlock]);
  return /* @__PURE__ */ import_react31.default.createElement("div", { className: "space-y-4 mt-4 mb-4" }, /* @__PURE__ */ import_react31.default.createElement(Label, null, "Base Settings"), /* @__PURE__ */ import_react31.default.createElement("div", { className: "flex items-center gap-2 mt-4" }, /* @__PURE__ */ import_react31.default.createElement(
    Checkbox,
    {
      id: "is-end-block",
      checked: isEndBlock,
      onCheckedChange: handleEndBlockChange
    }
  ), /* @__PURE__ */ import_react31.default.createElement(Label, { htmlFor: "is-end-block" }, "Mark as end block?")), /* @__PURE__ */ import_react31.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react31.default.createElement(
    Checkbox,
    {
      id: "is-auto-block",
      checked: autoContinueOnSelect,
      onCheckedChange: handleAutoContinueChange
    }
  ), /* @__PURE__ */ import_react31.default.createElement(Label, { htmlFor: "is-auto-block" }, "Auto Continue To next?")), /* @__PURE__ */ import_react31.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react31.default.createElement(
    Checkbox,
    {
      id: "is-show-block",
      checked: showContinueButton,
      onCheckedChange: handleShowContinueChange
    }
  ), /* @__PURE__ */ import_react31.default.createElement(Label, { htmlFor: "is-show-block" }, "Show Next Button?")));
};
var CommonBlockRules_default = CommonBlockRules;

// src/survey/blocks/ContentBlockItem.tsx
var ContentBlockItem = ({
  data,
  onUpdate,
  onRemove
}) => {
  const { state } = useSurveyBuilder();
  const [isEditing, setIsEditing] = (0, import_react32.useState)(false);
  const blockDefinition = state.definitions.blocks[data.type];
  if (!blockDefinition) {
    return /* @__PURE__ */ React.createElement(Card, { className: "mb-4 content-block-item border-destructive" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between pb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-destructive" }, "Unknown block type: ", data.type)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        type: "button",
        variant: "destructive",
        size: "sm",
        onClick: onRemove
      },
      "Remove"
    ))));
  }
  return /* @__PURE__ */ React.createElement(Card, { className: "mb-4 content-block-item" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between pb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, blockDefinition.icon && /* @__PURE__ */ React.createElement("span", null, blockDefinition.icon), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, data.name || blockDefinition.name), data.fieldName && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-muted px-2 py-1 rounded-md" }, data.fieldName)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(Dialog, { open: isEditing, onOpenChange: setIsEditing }, /* @__PURE__ */ React.createElement(DialogTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm"
    },
    "Edit"
  )), /* @__PURE__ */ React.createElement(DialogContent, { className: "max-w-3xl overflow-y-scroll max-h-screen" }, /* @__PURE__ */ React.createElement(DialogHeader, null, /* @__PURE__ */ React.createElement(DialogTitle, null, "Edit ", blockDefinition.name)), /* @__PURE__ */ React.createElement("div", { className: "py-4" }, /* @__PURE__ */ React.createElement(CommonBlockRules_default, { data, onUpdate }), blockDefinition.renderFormFields({
    data,
    onUpdate,
    onRemove: () => {
      setIsEditing(false);
      onRemove();
    }
  }), /* @__PURE__ */ React.createElement(NavigationRulesEditor, { data, onUpdate })))), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: onRemove
    },
    "Remove"
  ))), /* @__PURE__ */ React.createElement(CardContent, null, blockDefinition.renderItem({
    data,
    onUpdate,
    onRemove
  })), /* @__PURE__ */ React.createElement(CardFooter, { className: "bg-muted/50 flex justify-end" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-muted-foreground" }, data.uuid ? `ID: ${data.uuid.substring(0, 8)}` : "New Item")));
};

// src/survey/blocks/ContentBlockPage.tsx
var import_uuid14 = require("uuid");
var ContentBlockPage = ({
  data,
  onUpdate,
  onRemove
}) => {
  var _a;
  const { state } = useSurveyBuilder();
  const [collapsed, setCollapsed] = (0, import_react33.useState)(false);
  const handleNameChange = (e) => {
    onUpdate({
      ...data,
      name: e.target.value
    });
  };
  const handleAddBlockItem = (blockType) => {
    const blockDefinition = state.definitions.blocks[blockType];
    if (!blockDefinition) return;
    onUpdate({
      ...data,
      items: [
        ...data.items || [],
        {
          ...blockDefinition.defaultData,
          uuid: (0, import_uuid14.v4)()
        }
      ]
    });
  };
  const handleBlockUpdate = (index, blockData) => {
    const newItems = [...data.items || []];
    newItems[index] = blockData;
    onUpdate({
      ...data,
      items: newItems
    });
  };
  const handleBlockRemove = (index) => {
    const newItems = [...data.items || []];
    newItems.splice(index, 1);
    onUpdate({
      ...data,
      items: newItems
    });
  };
  const handleBlockMove = (activeIndex, overIndex) => {
    if (activeIndex === overIndex) return;
    const newItems = (0, import_sortable3.arrayMove)(data.items || [], activeIndex, overIndex);
    onUpdate({
      ...data,
      items: newItems
    });
  };
  return /* @__PURE__ */ React.createElement(Card, { className: "mb-4 content-block-page" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between pb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      value: data.name || "",
      onChange: handleNameChange,
      placeholder: "Page Name",
      className: "w-[300px]"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => setCollapsed(!collapsed)
    },
    collapsed ? "Expand" : "Collapse"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: onRemove
    },
    "Remove"
  ))), !collapsed && /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(
    Root12,
    {
      value: data.items || [],
      onMove: ({ activeIndex, overIndex }) => handleBlockMove(activeIndex, overIndex),
      getItemValue: (item) => item.uuid
    },
    /* @__PURE__ */ React.createElement(
      Content5,
      {
        className: "space-y-4",
        onDragOver: (e) => {
          if (e.dataTransfer.types.includes("application/x-block-type")) {
            e.preventDefault();
          }
        },
        onDrop: (e) => {
          const type = e.dataTransfer.getData("application/x-block-type");
          if (type) {
            handleAddBlockItem(type);
          }
        }
      },
      (data.items || []).map((block, index) => /* @__PURE__ */ React.createElement(Item4, { key: block.uuid || index, value: block.uuid }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(ItemHandle, { className: "absolute -left-5 top-2 cursor-grab text-muted-foreground" }, /* @__PURE__ */ React.createElement(import_lucide_react28.GripVertical, { className: "h-4 w-4" })), /* @__PURE__ */ React.createElement(
        ContentBlockItem,
        {
          data: block,
          onUpdate: (updatedBlock) => handleBlockUpdate(index, updatedBlock),
          onRemove: () => handleBlockRemove(index)
        }
      ))))
    )
  ), /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-medium mb-2" }, "Add Item"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2" }, Object.entries(state.definitions.blocks).map(([type, definition]) => /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      key: type,
      variant: "outline",
      size: "sm",
      onClick: () => handleAddBlockItem(type),
      draggable: true,
      onDragStart: (e) => {
        e.dataTransfer.setData("application/x-block-type", type);
      },
      className: "justify-start"
    },
    definition.icon && /* @__PURE__ */ React.createElement("span", { className: "mr-2" }, definition.icon),
    /* @__PURE__ */ React.createElement("span", { className: "truncate" }, definition.name)
  )))))), /* @__PURE__ */ React.createElement(CardFooter, { className: "bg-muted/50 flex justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-muted-foreground" }, `Items: ${((_a = data.items) == null ? void 0 : _a.length) || 0}`), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-muted-foreground" }, data.uuid ? `ID: ${data.uuid}` : "New Page")));
};

// src/survey/nodes/SectionNode.tsx
var import_uuid15 = require("uuid");
var import_sortable5 = require("@dnd-kit/sortable");
var import_lucide_react29 = require("lucide-react");
var SectionNode = ({
  data,
  onUpdate,
  onRemove
}) => {
  const { createNode } = useSurveyBuilder();
  const [collapsed, setCollapsed] = (0, import_react34.useState)(false);
  const handleNameChange = (e) => {
    onUpdate({
      ...data,
      name: e.target.value
    });
  };
  const handleScriptChange = (type, value) => {
    onUpdate({
      ...data,
      [type]: value
    });
  };
  const handleAddPage = () => {
    var _a;
    onUpdate({
      ...data,
      items: [
        ...data.items || [],
        {
          type: "set",
          name: `Page ${(((_a = data.items) == null ? void 0 : _a.length) || 0) + 1}`,
          uuid: (0, import_uuid15.v4)(),
          items: []
        }
      ]
    });
  };
  const handleUpdatePage = (index, pageData) => {
    const newItems = [...data.items || []];
    newItems[index] = pageData;
    onUpdate({
      ...data,
      items: newItems
    });
  };
  const handleRemovePage = (index) => {
    const newItems = [...data.items || []];
    newItems.splice(index, 1);
    onUpdate({
      ...data,
      items: newItems
    });
  };
  const handleAddChildSection = () => {
    if (data.uuid) {
      createNode(data.uuid, "section");
    }
  };
  const handlePageMove = (activeIndex, overIndex) => {
    if (activeIndex === overIndex) return;
    const newItems = (0, import_sortable5.arrayMove)(data.items || [], activeIndex, overIndex);
    onUpdate({
      ...data,
      items: newItems
    });
  };
  return /* @__PURE__ */ React.createElement(Card, { className: "mb-4 section-node" }, /* @__PURE__ */ React.createElement(CardHeader, { className: "flex flex-row items-center justify-between pb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      value: data.name || "",
      onChange: handleNameChange,
      placeholder: "Section Name",
      className: "w-[300px]"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      type: "button",
      variant: "outline",
      size: "sm",
      onClick: () => setCollapsed(!collapsed)
    },
    collapsed ? "Expand" : "Collapse"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      size: "sm",
      type: "button",
      onClick: onRemove
    },
    "Remove"
  ))), "      ", !collapsed && /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement(Tabs, { defaultValue: "pages" }, /* @__PURE__ */ React.createElement(TabsList, { className: "mb-4" }, /* @__PURE__ */ React.createElement(TabsTrigger, { value: "pages" }, "Pages"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "scripts" }, "Scripts"), /* @__PURE__ */ React.createElement(TabsTrigger, { value: "children" }, "Child Nodes")), "            ", /* @__PURE__ */ React.createElement(TabsContent, { value: "pages" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(
    Root12,
    {
      value: data.items || [],
      onMove: ({ activeIndex, overIndex }) => handlePageMove(activeIndex, overIndex),
      getItemValue: (item) => item.uuid
    },
    /* @__PURE__ */ React.createElement(Content5, { className: "space-y-4" }, (data.items || []).map((page, index) => /* @__PURE__ */ React.createElement(Item4, { key: page.uuid || index, value: page.uuid }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(ItemHandle, { className: "absolute -left-5 top-2 cursor-grab text-muted-foreground" }, /* @__PURE__ */ React.createElement(import_lucide_react29.GripVertical, { className: "h-4 w-4" })), /* @__PURE__ */ React.createElement(
      ContentBlockPage,
      {
        key: page.uuid || index,
        data: page,
        onUpdate: (updatedPage) => handleUpdatePage(index, updatedPage),
        onRemove: () => handleRemovePage(index)
      }
    )))))
  ), /* @__PURE__ */ React.createElement(Button, { type: "button", onClick: handleAddPage }, "Add Page"))), /* @__PURE__ */ React.createElement(TabsContent, { value: "scripts" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "entryLogic" }, "On Entry Script"), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      id: "entryLogic",
      value: data.entryLogic || "",
      onChange: (e) => handleScriptChange("entryLogic", e.target.value),
      placeholder: "(formData, pageData, renderer, navigation) => { /* Initialize section */ }",
      className: "font-mono text-sm h-24"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "exitLogic" }, "On Exit Script"), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      id: "exitLogic",
      value: data.exitLogic || "",
      onChange: (e) => handleScriptChange("exitLogic", e.target.value),
      placeholder: "(formData, pageData, renderer, navigation) => { /* Cleanup section */ }",
      className: "font-mono text-sm h-24"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "backLogic" }, "On Back Navigation Script"), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      id: "backLogic",
      value: data.backLogic || "",
      onChange: (e) => handleScriptChange("backLogic", e.target.value),
      placeholder: "(formData, pageData, renderer, stack) => { /* Handle back navigation logic */ }",
      className: "font-mono text-sm h-24"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { htmlFor: "navigationLogic" }, "Navigation Script"), /* @__PURE__ */ React.createElement(
    Textarea,
    {
      id: "navigationLogic",
      value: data.navigationLogic || "",
      onChange: (e) => handleScriptChange("navigationLogic", e.target.value),
      placeholder: "(formData, pageData, renderer) => { return 0; }",
      className: "font-mono text-sm h-24"
    }
  )))), /* @__PURE__ */ React.createElement(TabsContent, { value: "children" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, (data.nodes || []).map((nodeRef, index) => {
    return /* @__PURE__ */ React.createElement("div", { key: typeof nodeRef === "string" ? nodeRef : nodeRef.uuid || index, className: "p-2 border rounded-md" }, typeof nodeRef === "string" ? `Child Node Reference: ${nodeRef}` : `Child Node: ${nodeRef.name || "Unnamed Node"}`);
  }), /* @__PURE__ */ React.createElement(Button, { type: "button", onClick: handleAddChildSection }, "Add Child Section"))))), /* @__PURE__ */ React.createElement(CardFooter, { className: "bg-muted/50 flex justify-end" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-muted-foreground" }, data.uuid ? `ID: ${data.uuid}` : "New Section")));
};

// src/components/nodes/SectionNodeDefinition.tsx
var SectionNodeDefinition = {
  type: "section",
  name: "Section",
  uuid: (0, import_uuid16.v4)(),
  description: "A section containing multiple pages",
  icon: /* @__PURE__ */ import_react35.default.createElement(import_lucide_react30.LayoutGrid, { className: "w-4 h-4" }),
  defaultData: {
    type: "section",
    name: "New Section",
    uuid: (0, import_uuid16.v4)(),
    items: [
      {
        type: "set",
        name: "Page 1",
        uuid: (0, import_uuid16.v4)(),
        items: []
      }
    ],
    navigationLogic: "return 0;",
    entryLogic: "",
    exitLogic: "",
    backLogic: ""
  },
  // GOOD: returns JSX, so React treats it as its own component
  renderNode: (props) => /* @__PURE__ */ import_react35.default.createElement(SectionNode, { ...props })
};

// src/components/nodes/index.ts
var StandardNodes = [
  SectionNodeDefinition
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionTypes,
  AuthBlock,
  BMICalculatorBlock,
  CalculatedFieldBlock,
  CheckboxBlock,
  CheckoutBlock,
  ConditionalBlock,
  DatePickerBlock,
  FileUploadBlock,
  HtmlBlock,
  MarkdownBlock,
  MatrixBlock,
  RadioBlock,
  RangeBlock,
  ScriptBlock,
  SectionNodeDefinition,
  SelectBlock,
  SelectableBoxQuestionBlock,
  StandardBlocks,
  StandardNodes,
  SurveyBuilder,
  SurveyBuilderProvider,
  TextInputBlock,
  TextareaBlock,
  cloneNode,
  ensureNodeUuids,
  findNodeById,
  getAllNodes,
  getAllParentNodes,
  getLeafNodePaths,
  getParentNode,
  linkNodes,
  useSurveyBuilder
});
