var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// src/utils/surveyUtils.ts
var surveyUtils_exports = {};
__export(surveyUtils_exports, {
  evaluateLogic: () => evaluateLogic,
  formatFieldName: () => formatFieldName,
  getLocalized: () => getLocalized,
  getSurveyPageIds: () => getSurveyPageIds,
  getSurveyPages: () => getSurveyPages,
  getThemeClass: () => getThemeClass
});
function getSurveyPages(rootNode) {
  const pages = [];
  if (!rootNode.nodes && !rootNode.items) {
    return pages;
  }
  if (rootNode.items && rootNode.items.length > 0) {
    const setBlocks = rootNode.items.filter((item) => item.type === "set");
    if (setBlocks.length > 0) {
      setBlocks.forEach((setBlock) => {
        if (setBlock.items && setBlock.items.length > 0) {
          pages.push(setBlock.items);
        }
      });
    } else {
      pages.push(rootNode.items);
    }
  }
  if (rootNode.nodes && rootNode.nodes.length > 0) {
    rootNode.nodes.forEach((nodeRef) => {
      const node = typeof nodeRef === "string" ? { type: "section", uuid: nodeRef } : nodeRef;
      if (node.type !== "section") {
        return;
      }
      if (node.items && node.items.length > 0) {
        const setBlocks = node.items.filter((item) => item.type === "set");
        if (setBlocks.length > 0) {
          setBlocks.forEach((setBlock) => {
            if (setBlock.items && setBlock.items.length > 0) {
              pages.push(setBlock.items);
            }
          });
        } else {
          pages.push(node.items);
        }
      }
      if (node.nodes && node.nodes.length > 0) {
        const childPages = getSurveyPages(node);
        pages.push(...childPages);
      }
    });
  }
  if (pages.length === 0) {
    pages.push([]);
  }
  return pages;
}
function getSurveyPageIds(rootNode) {
  const ids = [];
  const processNode = (node) => {
    if (node.items && node.items.length > 0) {
      const setBlocks = node.items.filter((item) => item.type === "set");
      if (setBlocks.length > 0) {
        setBlocks.forEach((setBlock) => {
          ids.push(setBlock.uuid || "");
        });
      } else {
        ids.push(node.uuid || "");
      }
    }
    if (node.nodes && node.nodes.length > 0) {
      node.nodes.forEach((n) => {
        const child = typeof n === "string" ? { type: "section", uuid: n } : n;
        if (child.type === "section") {
          processNode(child);
        }
      });
    }
  };
  processNode(rootNode);
  if (ids.length === 0) {
    ids.push(rootNode.uuid || "");
  }
  return ids;
}
function evaluateLogic(script, context) {
  try {
    const sanitizedScript = script.replace(/import\s*\{/g, "").replace(/require\s*\(/g, "").replace(/process/g, "").replace(/global/g, "").replace(/window/g, "").replace(/document/g, "").replace(/eval\s*\(/g, "");
    const fn = new Function("context", `
      "use strict";
      // Extract context values
      const fieldValues = context.fieldValues || {};
      const setValue = context.setValue;
      const setError = context.setError;
      const currentPage = context.currentPage;
      const getFieldValue = context.getFieldValue || ((fieldName) => fieldValues[fieldName]);
      const showAlert = context.showAlert || ((message) => console.log(message));

      try {
        ${sanitizedScript}
        return { isValid: true };
      } catch (error) {
        return { isValid: false, errorMessage: error.message };
      }
    `);
    return fn(context);
  } catch (error) {
    console.error("Error executing logic script:", error);
    return { isValid: false, errorMessage: "Error in logic script" };
  }
}
function getLocalized(block, field, language, localizations) {
  if (!localizations || !language || language === "en") {
    return block[field];
  }
  const langMap = localizations[language];
  if (!langMap) {
    return block[field];
  }
  const blockId = block.uuid;
  if (!blockId) {
    return block[field];
  }
  const key = `${blockId}.${field}`;
  return langMap[key] || block[field];
}
function getThemeClass(theme, baseClass, customClass) {
  const themeClass = `theme-${theme}`;
  return `${baseClass} ${themeClass} ${customClass || ""}`.trim();
}
function formatFieldName(fieldName) {
  return fieldName.replace(/([A-Z])/g, " $1").replace(/([0-9]+)/g, " $1 ").replace(/^./, (char) => char.toUpperCase()).replace(/_/g, " ").replace(/\s+/g, " ").trim();
}
var init_surveyUtils = __esm({
  "src/utils/surveyUtils.ts"() {
  }
});

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  ActionTypes: () => ActionTypes,
  AuthBlock: () => AuthBlock2,
  AuthRenderer: () => AuthRenderer,
  BMICalculatorBlock: () => BMICalculatorBlock,
  BMICalculatorRenderer: () => BMICalculatorRenderer,
  BlockRenderer: () => BlockRenderer,
  CalculatedFieldBlock: () => CalculatedFieldBlock,
  CalculatedFieldRenderer: () => CalculatedFieldRenderer,
  CheckboxBlock: () => CheckboxBlock2,
  CheckboxRenderer: () => CheckboxRenderer,
  CheckoutBlock: () => CheckoutBlock3,
  CheckoutRenderer: () => CheckoutRenderer,
  ConditionalBlock: () => ConditionalBlock,
  ConditionalBlockRenderer: () => ConditionalBlockRenderer,
  DatePickerBlock: () => DatePickerBlock2,
  DatePickerRenderer: () => DatePickerRenderer,
  DebugInfo: () => DebugInfo,
  FileUploadBlock: () => FileUploadBlock2,
  FileUploadRenderer: () => FileUploadRenderer,
  HtmlBlock: () => HtmlBlock2,
  HtmlRenderer: () => HtmlRenderer,
  MarkdownBlock: () => MarkdownBlock2,
  MarkdownRenderer: () => MarkdownRenderer,
  MatrixBlock: () => MatrixBlock2,
  MatrixRenderer: () => MatrixRenderer,
  RadioBlock: () => RadioBlock2,
  RadioRenderer: () => RadioRenderer,
  RangeBlock: () => RangeBlock2,
  RangeRenderer: () => RangeRenderer,
  ScriptBlock: () => ScriptBlock2,
  ScriptRenderer: () => ScriptRenderer,
  SectionNodeDefinition: () => SectionNodeDefinition,
  SelectBlock: () => SelectBlock2,
  SelectRenderer: () => SelectRenderer,
  SelectableBoxQuestionBlock: () => SelectableBoxQuestionBlock2,
  SelectableBoxRenderer: () => SelectableBoxRenderer,
  SetRenderer: () => SetRenderer,
  StandardBlocks: () => StandardBlocks,
  StandardNodes: () => StandardNodes,
  SurveyBuilder: () => SurveyBuilder,
  SurveyBuilderProvider: () => SurveyBuilderProvider,
  SurveyForm: () => SurveyForm,
  SurveyFormProvider: () => SurveyFormProvider,
  TextInputBlock: () => TextInputBlock2,
  TextInputRenderer: () => TextInputRenderer,
  TextareaBlock: () => TextareaBlock2,
  TextareaRenderer: () => TextareaRenderer,
  ValidationSummary: () => ValidationSummary,
  applyDynamicColors: () => applyDynamicColors,
  blockTypeMap: () => blockTypeMap,
  calculateBMI: () => calculateBMI,
  cloneNode: () => cloneNode,
  colorfulTheme: () => colorfulTheme,
  corporateTheme: () => corporateTheme,
  darkTheme: () => darkTheme,
  defaultTheme: () => defaultTheme,
  ensureNodeUuids: () => ensureNodeUuids,
  evaluateCondition: () => evaluateCondition,
  evaluateLogic: () => evaluateLogic,
  evaluateSimpleCondition: () => evaluateSimpleCondition,
  executeCalculation: () => executeCalculation,
  findNodeById: () => findNodeById,
  formatFieldName: () => formatFieldName,
  getAllNodes: () => getAllNodes,
  getAllParentNodes: () => getAllParentNodes,
  getLeafNodePaths: () => getLeafNodePaths,
  getLocalized: () => getLocalized,
  getParentNode: () => getParentNode,
  getSurveyPageIds: () => getSurveyPageIds,
  getSurveyPages: () => getSurveyPages,
  getThemeClass: () => getThemeClass,
  isBlockVisible: () => isBlockVisible,
  isContentBlock: () => isContentBlock,
  isInputBlock: () => isInputBlock,
  linkNodes: () => linkNodes,
  minimalTheme: () => minimalTheme,
  modernTheme: () => modernTheme,
  supportsBranchingLogic: () => supportsBranchingLogic,
  supportsConditionalRendering: () => supportsConditionalRendering,
  themes: () => themes,
  useSurveyBuilder: () => useSurveyBuilder,
  useSurveyForm: () => useSurveyForm,
  validateBlock: () => validateBlock
});
module.exports = __toCommonJS(index_exports);

// src/components/SurveyForm.tsx
var import_react27 = require("react");

// src/context/SurveyFormContext.tsx
var import_react = require("react");
init_surveyUtils();

// src/utils/conditionalUtils.ts
function evaluateSimpleCondition(fieldValue, operator, comparisonValue, valueType = "string") {
  if (fieldValue === null || fieldValue === void 0) {
    if (operator === "empty") return true;
    if (operator === "notEmpty") return false;
    if (operator === "==") return comparisonValue === null || comparisonValue === void 0;
    if (operator === "!=") return comparisonValue !== null && comparisonValue !== void 0;
    return false;
  }
  let typedFieldValue = fieldValue;
  let typedComparisonValue = comparisonValue;
  if (valueType === "number") {
    typedFieldValue = Number(fieldValue);
    typedComparisonValue = Number(comparisonValue);
  } else if (valueType === "boolean") {
    typedFieldValue = Boolean(fieldValue);
    typedComparisonValue = Boolean(comparisonValue);
  } else if (valueType === "date") {
    typedFieldValue = new Date(fieldValue);
    typedComparisonValue = new Date(comparisonValue);
  } else if (valueType === "string") {
    typedFieldValue = String(fieldValue);
    typedComparisonValue = String(comparisonValue);
  }
  switch (operator) {
    case "==":
      return typedFieldValue == typedComparisonValue;
    case "!=":
      return typedFieldValue != typedComparisonValue;
    case ">":
      return typedFieldValue > typedComparisonValue;
    case ">=":
      return typedFieldValue >= typedComparisonValue;
    case "<":
      return typedFieldValue < typedComparisonValue;
    case "<=":
      return typedFieldValue <= typedComparisonValue;
    case "contains":
      return String(typedFieldValue).includes(String(typedComparisonValue));
    case "startsWith":
      return String(typedFieldValue).startsWith(String(typedComparisonValue));
    case "endsWith":
      return String(typedFieldValue).endsWith(String(typedComparisonValue));
    case "empty":
      return typedFieldValue === "" || typedFieldValue === null || typedFieldValue === void 0 || Array.isArray(typedFieldValue) && typedFieldValue.length === 0;
    case "notEmpty":
      return typedFieldValue !== "" && typedFieldValue !== null && typedFieldValue !== void 0 && (!Array.isArray(typedFieldValue) || typedFieldValue.length > 0);
    case "between":
      if (Array.isArray(typedComparisonValue) && typedComparisonValue.length === 2) {
        return typedFieldValue >= typedComparisonValue[0] && typedFieldValue <= typedComparisonValue[1];
      }
      return false;
    case "in":
      return Array.isArray(typedComparisonValue) && typedComparisonValue.includes(typedFieldValue);
    case "notIn":
      return Array.isArray(typedComparisonValue) && !typedComparisonValue.includes(typedFieldValue);
    default:
      console.warn(`Unknown operator: ${operator}`);
      return false;
  }
}
function evaluateConditionRule(rule, fieldValues) {
  const fieldValue = fieldValues[rule.field];
  return evaluateSimpleCondition(
    fieldValue,
    rule.operator,
    rule.value,
    rule.type
  );
}
function evaluateNavigationalRule(conditionalRule, currentValues) {
  try {
    const { condition, target, isPage } = conditionalRule;
    const context = { ...currentValues };
    const evaluator = new Function(...Object.keys(context), `return ${condition}`);
    const result = evaluator(...Object.values(context));
    if (result) {
      return {
        matched: true,
        target,
        isPage: isPage ? true : false
      };
    }
    return {
      matched: false,
      target: null,
      isPage: null
    };
  } catch (error) {
    console.error("Error evaluating condition:", error);
    return {
      matched: false,
      target: null,
      isPage: null,
      error
    };
  }
}
function evaluateCondition(condition, fieldValues) {
  if (typeof condition === "string") {
    try {
      const sanitizedCondition = condition.replace(/import\s*\{/g, "").replace(/require\s*\(/g, "").replace(/process/g, "").replace(/global/g, "").replace(/window/g, "").replace(/document/g, "").replace(/eval\s*\(/g, "").trim();
      const normalized = sanitizedCondition.replace(/^return\s+/i, "").replace(/;?\s*$/, "");
      const conditionFn = new Function("values", `
        "use strict";
        try {
          // Access values directly from the values object
          // Example: If condition is "age > 18", we'll reference values.age
          const result = (${translateConditionToExplicitReferences(normalized)});
          return result;
        } catch (e) {
          console.error("Error evaluating condition:", e);
          return false;
        }
      `);
      return Boolean(conditionFn(fieldValues));
    } catch (error) {
      console.error("Error parsing condition expression:", error);
      return false;
    }
  }
  if (!Array.isArray(condition)) {
    return evaluateConditionRule(condition, fieldValues);
  }
  return condition.every(
    (rule) => evaluateConditionRule(rule, fieldValues)
  );
}
function translateConditionToExplicitReferences(condition) {
  return condition.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b(?!\s*:|\s*\(|\[|\.])/g, (match, name) => {
    const keywords = [
      "true",
      "false",
      "null",
      "undefined",
      "NaN",
      "Infinity",
      "if",
      "else",
      "return",
      "function",
      "var",
      "let",
      "const",
      "new",
      "this",
      "typeof",
      "instanceof",
      "in"
    ];
    if (keywords.includes(name)) {
      return name;
    }
    return `values.${name}`;
  });
}
function getNextPageIndex(currentPage, branchingLogic, fieldValues, totalPages) {
  if (!branchingLogic || !branchingLogic.condition) {
    return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  }
  const conditionMet = evaluateCondition(branchingLogic.condition, fieldValues);
  if (!conditionMet) {
    return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  }
  const { targetPage } = branchingLogic;
  if (typeof targetPage === "number") {
    if (targetPage >= 0 && targetPage < totalPages) {
      return targetPage;
    }
  } else if (targetPage === "next") {
    return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  } else if (targetPage === "prev") {
    return currentPage - 1 >= 0 ? currentPage - 1 : currentPage;
  } else if (targetPage === "submit") {
    return -1;
  }
  return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
}
function getNextPageFromNavigationRules(blocks, pages, pageIds, fieldValues) {
  var _a;
  for (const block of blocks) {
    if (!block.navigationRules) continue;
    for (const rule of block.navigationRules) {
      if (evaluateCondition(rule.condition, fieldValues)) {
        if (rule.target === "submit") {
          return -1;
        }
        if (rule.isPage) {
          const idx = pageIds.indexOf(String(rule.target));
          if (idx >= 0) return idx;
        } else {
          const idx = pages.findIndex(
            (p) => p.some((b) => b.uuid === rule.target)
          );
          if (idx >= 0) return idx;
        }
      }
    }
  }
  for (const block of blocks) {
    const defaultRule = (_a = block.navigationRules) == null ? void 0 : _a.find((r) => r.isDefault);
    if (defaultRule) {
      if (defaultRule.target === "submit") return -1;
      if (defaultRule.isPage) {
        const idx = pageIds.indexOf(String(defaultRule.target));
        if (idx >= 0) return idx;
      } else {
        const idx = pages.findIndex(
          (p) => p.some((b) => b.uuid === defaultRule.target)
        );
        if (idx >= 0) return idx;
      }
    }
  }
  return null;
}
function findBlockPosition(pages, target) {
  for (let pIndex = 0; pIndex < pages.length; pIndex++) {
    const bIndex = pages[pIndex].findIndex((b) => b.uuid === target);
    if (bIndex >= 0) {
      return { pageIndex: pIndex, blockIndex: bIndex };
    }
  }
  return null;
}
function getNextStepFromNavigationRules(block, pages, pageIds, fieldValues) {
  if (!block.navigationRules) return null;
  for (const rule of block.navigationRules) {
    const evaluate = evaluateNavigationalRule(rule, fieldValues);
    if (evaluate.matched) {
      if (evaluate.target === "submit") {
        return "submit";
      }
      if (evaluate.isPage) {
        const idx = pageIds.indexOf(String(evaluate.target));
        if (idx >= 0) return { pageIndex: idx, blockIndex: 0 };
      } else {
        const pos = findBlockPosition(pages, String(evaluate.target));
        if (pos) return pos;
      }
    }
  }
  const defaultRule = block.navigationRules.find((r) => r.isDefault);
  if (defaultRule) {
    if (defaultRule.target === "submit") return "submit";
    if (defaultRule.isPage) {
      const idx = pageIds.indexOf(String(defaultRule.target));
      if (idx >= 0) return { pageIndex: idx, blockIndex: 0 };
    } else {
      const pos = findBlockPosition(pages, String(defaultRule.target));
      if (pos) return pos;
    }
  }
  return null;
}
function executeCalculation(calculationRule, fieldValues) {
  try {
    const sanitizedFormula = calculationRule.formula.replace(/import\s*\{/g, "").replace(/require\s*\(/g, "").replace(/process/g, "").replace(/global/g, "").replace(/window/g, "").replace(/document/g, "").replace(/eval\s*\(/g, "");
    const functionBody = `
      "use strict";

      try {
        // Make all fields directly available
        ${Object.keys(fieldValues).map(
      (key) => `const ${key} = ${JSON.stringify(fieldValues[key])};`
    ).join("\n")}

        // Execute formula
        ${sanitizedFormula}
      } catch (error) {
        console.error("Error in formula execution:", error);
        return null;
      }
    `;
    const fn = new Function(functionBody);
    return fn();
  } catch (error) {
    console.error("Error executing calculation:", error);
    return null;
  }
}
function isBlockVisible(block, fieldValues) {
  if (!block.visibleIf) {
    return true;
  }
  return evaluateCondition(block.visibleIf, fieldValues);
}
function calculateBMI(weightInKg, heightInCm) {
  const heightInM = heightInCm / 100;
  const bmi = weightInKg / (heightInM * heightInM);
  let category = "";
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }
  return { bmi: parseFloat(bmi.toFixed(1)), category };
}

// src/context/SurveyFormContext.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SurveyFormContext = (0, import_react.createContext)({
  values: {},
  setValue: () => {
  },
  errors: {},
  setError: () => {
  },
  currentPage: 0,
  currentBlockIndex: 0,
  totalPages: 0,
  goToPage: () => {
  },
  goToNextPage: () => {
  },
  goToPreviousPage: () => {
  },
  goToNextBlock: () => {
  },
  goToPreviousBlock: () => {
  },
  isFirstPage: true,
  isLastPage: true,
  isSubmitting: false,
  isValid: true,
  submit: () => {
  },
  language: "en",
  setLanguage: () => {
  },
  theme: null,
  surveyData: { rootNode: { type: "" } },
  conditionalErrors: {},
  computedValues: {},
  updateComputedValues: () => {
  },
  evaluateCondition: () => false,
  getNextPageIndex: () => null,
  getVisibleBlocks: () => [],
  validateField: () => null,
  navigationHistory: [],
  canGoBack: false,
  getActualProgress: () => 0,
  getTotalVisibleSteps: () => 0,
  getCurrentStepPosition: () => 0
});
var SurveyFormProvider = ({
  children,
  surveyData,
  defaultValues = {},
  onSubmit,
  onChange,
  onPageChange,
  language = "en",
  theme,
  computedFields = {},
  customValidators = {},
  enableDebug = false,
  debug = false,
  logo = null
}) => {
  const [values, setValues] = (0, import_react.useState)(defaultValues);
  const [errors, setErrors] = (0, import_react.useState)({});
  const [conditionalErrors, setConditionalErrors] = (0, import_react.useState)({});
  const [computedValues, setComputedValues] = (0, import_react.useState)({});
  const [currentPage, setCurrentPage] = (0, import_react.useState)(0);
  const [currentBlockIndex, setCurrentBlockIndex] = (0, import_react.useState)(0);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const [currentLanguage, setCurrentLanguage] = (0, import_react.useState)(language);
  const [navigationHistory, setNavigationHistory] = (0, import_react.useState)([
    {
      pageIndex: 0,
      blockIndex: 0,
      timestamp: Date.now(),
      trigger: "initial"
    }
  ]);
  const navigationHistoryRef = (0, import_react.useRef)(navigationHistory);
  const currentPageRef = (0, import_react.useRef)(currentPage);
  const currentBlockIndexRef = (0, import_react.useRef)(currentBlockIndex);
  const isHandlingPopStateRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    navigationHistoryRef.current = navigationHistory;
  }, [navigationHistory]);
  (0, import_react.useEffect)(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);
  (0, import_react.useEffect)(() => {
    currentBlockIndexRef.current = currentBlockIndex;
  }, [currentBlockIndex]);
  const pages = getSurveyPages(surveyData.rootNode);
  const pageIds = getSurveyPageIds(surveyData.rootNode);
  const totalPages = Math.max(1, pages.length);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const canGoBack = navigationHistory.length > 1;
  const shouldSkipBlockOnBack = (0, import_react.useCallback)((pageIndex, blockIndex) => {
    if (pageIndex < 0 || pageIndex >= pages.length) return false;
    const pageBlocks = pages[pageIndex] || [];
    const block = pageBlocks[blockIndex];
    if (!block || block.type !== "auth") return false;
    const skipIfLoggedIn = block.skipIfLoggedIn;
    if (!skipIfLoggedIn) return false;
    return false;
  }, [pages]);
  const findPreviousNonSkippableBlock = (0, import_react.useCallback)((currentNavigationHistory) => {
    let historyIndex = currentNavigationHistory.length - 2;
    while (historyIndex >= 0) {
      const entry = currentNavigationHistory[historyIndex];
      const { pageIndex, blockIndex } = entry;
      if (!shouldSkipBlockOnBack(pageIndex, blockIndex)) {
        return { pageIndex, blockIndex };
      }
      historyIndex--;
    }
    return null;
  }, [shouldSkipBlockOnBack]);
  (0, import_react.useEffect)(() => {
    const handlePopState = (event) => {
      if (isHandlingPopStateRef.current) {
        return;
      }
      isHandlingPopStateRef.current = true;
      const currentNavHistory = navigationHistoryRef.current;
      const hasInternalHistory = currentNavHistory.length > 1;
      if (hasInternalHistory) {
        event.preventDefault();
        const target = findPreviousNonSkippableBlock(currentNavHistory);
        if (target) {
          const newHistory = currentNavHistory.slice(0, -1);
          setNavigationHistory(newHistory);
          setCurrentPage(target.pageIndex);
          setCurrentBlockIndex(target.blockIndex);
          if (onPageChange) {
            onPageChange(target.pageIndex, totalPages);
          }
          window.history.replaceState(
            {
              surveyPage: target.pageIndex,
              surveyBlock: target.blockIndex,
              timestamp: Date.now()
            },
            "",
            window.location.href
          );
        } else {
          isHandlingPopStateRef.current = false;
          window.history.back();
          return;
        }
      } else {
        isHandlingPopStateRef.current = false;
        return;
      }
      setTimeout(() => {
        isHandlingPopStateRef.current = false;
      }, 100);
    };
    window.history.replaceState(
      {
        surveyPage: currentPage,
        surveyBlock: currentBlockIndex,
        timestamp: Date.now()
      },
      "",
      window.location.href
    );
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const addToNavigationHistory = (0, import_react.useCallback)((pageIndex, blockIndex, trigger) => {
    const newEntry = {
      pageIndex,
      blockIndex,
      timestamp: Date.now(),
      trigger
    };
    setNavigationHistory((prev) => {
      const lastEntry = prev[prev.length - 1];
      if (lastEntry && lastEntry.pageIndex === pageIndex && lastEntry.blockIndex === blockIndex) {
        return prev;
      }
      const newHistory = [...prev, newEntry];
      return newHistory.slice(-50);
    });
    if (trigger === "forward" || trigger === "jump") {
      window.history.pushState(
        {
          surveyPage: pageIndex,
          surveyBlock: blockIndex,
          timestamp: Date.now()
        },
        "",
        window.location.href
      );
    }
  }, []);
  const getVisibleBlocks = (0, import_react.useCallback)((blocks) => {
    return blocks.filter((block) => {
      if (!block.visibleIf) return true;
      return isBlockVisible(block, { ...values, ...computedValues });
    });
  }, [values, computedValues]);
  const getTotalVisibleSteps = (0, import_react.useCallback)(() => {
    return pages.reduce((total, pageBlocks) => {
      const visibleBlocks = getVisibleBlocks(pageBlocks);
      return total + visibleBlocks.length;
    }, 0);
  }, [pages, getVisibleBlocks]);
  const getCurrentStepPosition = (0, import_react.useCallback)(() => {
    let position = 0;
    for (let i = 0; i < currentPage; i++) {
      const visibleBlocks = getVisibleBlocks(pages[i] || []);
      position += visibleBlocks.length;
    }
    const currentPageBlocks2 = pages[currentPage] || [];
    const visibleCurrentPageBlocks2 = getVisibleBlocks(currentPageBlocks2);
    const currentBlockInVisibleBlocks = visibleCurrentPageBlocks2.findIndex(
      (block, index) => {
        const actualIndex = currentPageBlocks2.findIndex((b) => b.uuid === block.uuid);
        return actualIndex === currentBlockIndex;
      }
    );
    if (currentBlockInVisibleBlocks >= 0) {
      position += currentBlockInVisibleBlocks;
    }
    return position;
  }, [currentPage, currentBlockIndex, pages, getVisibleBlocks]);
  const getActualProgress = (0, import_react.useCallback)(() => {
    const totalSteps = getTotalVisibleSteps();
    const currentPosition = getCurrentStepPosition();
    if (totalSteps === 0) return 0;
    return Math.min(100, (currentPosition + 1) / totalSteps * 100);
  }, [getTotalVisibleSteps, getCurrentStepPosition]);
  const updateComputedValues = (0, import_react.useCallback)(() => {
    if (Object.keys(computedFields).length === 0) return;
    const newComputedValues = {};
    Object.entries(computedFields).forEach(([fieldName, config]) => {
      const result = executeCalculation(
        {
          formula: config.formula,
          targetField: fieldName,
          dependencies: config.dependencies
        },
        { ...values, ...computedValues }
      );
      newComputedValues[fieldName] = config.format ? config.format(result) : result;
    });
    setComputedValues((prev) => ({ ...prev, ...newComputedValues }));
  }, [values, computedValues, computedFields]);
  (0, import_react.useEffect)(() => {
    updateComputedValues();
  }, [values, updateComputedValues]);
  const evaluateConditionWithContext = (0, import_react.useCallback)((condition, contextData) => {
    const contextValues = {
      ...values,
      ...computedValues,
      ...contextData || {}
    };
    return evaluateCondition(condition, contextValues);
  }, [values, computedValues]);
  const getNextPageIndex2 = (0, import_react.useCallback)(() => {
    const currentPageBlocks2 = pages[currentPage] || [];
    let branchingLogic;
    if (currentPageBlocks2.length > 0) {
      const firstBlock = currentPageBlocks2[0];
      if (typeof firstBlock === "object" && firstBlock.branchingLogic) {
        branchingLogic = firstBlock.branchingLogic;
      }
    }
    if (!branchingLogic) {
      const page = pages[currentPage];
      if (Array.isArray(page) && page.length > 0) {
        const setParent = page[0];
        if (typeof setParent === "object" && setParent.branchingLogic) {
          branchingLogic = setParent.branchingLogic;
        }
      }
    }
    if (branchingLogic) {
      const nextIndex = getNextPageIndex(
        currentPage,
        branchingLogic,
        { ...values, ...computedValues },
        totalPages
      );
      if (nextIndex === -1) {
        return null;
      }
      return nextIndex;
    }
    const navIndex = getNextPageFromNavigationRules(
      currentPageBlocks2,
      pages,
      pageIds,
      { ...values, ...computedValues }
    );
    if (navIndex !== null) {
      return navIndex === -1 ? null : navIndex;
    }
    return currentPage + 1 < totalPages ? currentPage + 1 : null;
  }, [currentPage, pages, totalPages, values, computedValues]);
  const validateField = (0, import_react.useCallback)((fieldName, value) => {
    const validator = customValidators[fieldName];
    if (!validator) return null;
    try {
      const error = validator.validate(value, { ...values, ...computedValues });
      return error;
    } catch (error) {
      console.error(`Error validating field ${fieldName}:`, error);
      return `Validation error: ${error.message}`;
    }
  }, [customValidators, values, computedValues]);
  const currentPageBlocks = pages[currentPage] || [];
  const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);
  const currentPageFields = visibleCurrentPageBlocks.filter((block) => block.fieldName).map((block) => block.fieldName);
  const isValid = currentPageFields.every((field) => !errors[field] && !conditionalErrors[field]);
  const setValue = (field, value) => {
    setValues((prev) => {
      const updatedValues = { ...prev, [field]: value };
      const currentPageItem = pages[currentPage];
      if (Array.isArray(currentPageItem) && currentPageItem.length > 0) {
        const setParent = currentPageItem[0];
        if (typeof setParent === "object" && setParent.exitLogic) {
          try {
            const result = evaluateLogic(setParent.exitLogic, {
              fieldValues: updatedValues,
              getFieldValue: (name) => updatedValues[name] || computedValues[name]
            });
            if (result && typeof result === "object" && isValid === false) {
              setError(field, result.errorMessage || "Invalid value");
            } else {
              setError(field, null);
            }
          } catch (error) {
            console.error("Error evaluating exit logic:", error);
          }
        }
      }
      const validationError = validateField(field, value);
      if (validationError) {
        setConditionalErrors((prev2) => ({ ...prev2, [field]: validationError }));
      } else {
        setConditionalErrors((prev2) => {
          const newErrors = { ...prev2 };
          delete newErrors[field];
          return newErrors;
        });
      }
      if (onChange) {
        onChange(updatedValues);
      }
      return updatedValues;
    });
  };
  const setError = (field, error) => {
    setErrors((prev) => {
      if (error === null) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return { ...prev, [field]: error };
    });
  };
  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      addToNavigationHistory(pageIndex, 0, "jump");
      setCurrentPage(pageIndex);
      setCurrentBlockIndex(0);
      if (onPageChange) {
        onPageChange(pageIndex, totalPages);
      }
    }
  };
  const goToNextBlock = (fValue) => {
    const pageBlocks = pages[currentPage] || [];
    const currentBlock = pageBlocks[currentBlockIndex];
    if (currentBlock == null ? void 0 : currentBlock.isEndBlock) {
      submit();
      return;
    }
    const mergedValues = fValue ? { ...values, ...fValue } : values;
    if (fValue) {
      setValues((prev) => ({ ...prev, ...fValue }));
    }
    const target = getNextStepFromNavigationRules(
      currentBlock,
      pages,
      pageIds,
      { ...mergedValues, ...computedValues }
    );
    if (target === "submit") {
      submit();
      return;
    }
    if (target) {
      addToNavigationHistory(target.pageIndex, target.blockIndex, "forward");
      setCurrentPage(target.pageIndex);
      setCurrentBlockIndex(target.blockIndex);
      if (onPageChange) {
        onPageChange(target.pageIndex, totalPages);
      }
      return;
    }
    if (currentBlockIndex < pageBlocks.length - 1) {
      const newBlockIndex = currentBlockIndex + 1;
      addToNavigationHistory(currentPage, newBlockIndex, "forward");
      setCurrentBlockIndex(newBlockIndex);
      return;
    }
    const nextIndex = getNextPageIndex2();
    if (nextIndex === null) {
      submit();
    } else {
      addToNavigationHistory(nextIndex, 0, "forward");
      goToPage(nextIndex);
    }
  };
  const goToPreviousBlock = () => {
    if (navigationHistory.length <= 1) {
      window.history.back();
      return;
    }
    const target = findPreviousNonSkippableBlock(navigationHistory);
    if (target) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentPage(target.pageIndex);
      setCurrentBlockIndex(target.blockIndex);
      if (onPageChange) {
        onPageChange(target.pageIndex, totalPages);
      }
    } else {
      window.history.back();
    }
  };
  const goToNextPage = () => {
    goToNextBlock();
  };
  const goToPreviousPage = () => {
    goToPreviousBlock();
  };
  const submit = async () => {
    setIsSubmitting(true);
    updateComputedValues();
    let hasErrors = false;
    const allFields = pages.flat().filter((block) => block.fieldName).map((block) => block.fieldName);
    const newConditionalErrors = {};
    allFields.forEach((field) => {
      const value = values[field];
      const validationError = validateField(field, value);
      if (validationError) {
        newConditionalErrors[field] = validationError;
        hasErrors = true;
      }
    });
    setConditionalErrors(newConditionalErrors);
    if (!hasErrors && Object.keys(errors).length === 0) {
      if (onSubmit) {
        try {
          const submissionData = {
            ...values,
            ...computedValues
          };
          await onSubmit(submissionData);
        } catch (error) {
          console.error("Error during form submission:", error);
        }
      }
    }
    setIsSubmitting(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SurveyFormContext.Provider,
    {
      value: {
        values,
        setValue,
        errors,
        setError,
        currentPage,
        currentBlockIndex,
        totalPages,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        goToNextBlock,
        goToPreviousBlock,
        isFirstPage,
        isLastPage,
        isSubmitting,
        isValid,
        submit,
        language: currentLanguage,
        setLanguage: setCurrentLanguage,
        theme,
        surveyData,
        conditionalErrors,
        computedValues,
        updateComputedValues,
        evaluateCondition: evaluateConditionWithContext,
        getNextPageIndex: getNextPageIndex2,
        getVisibleBlocks,
        validateField,
        navigationHistory,
        canGoBack,
        getActualProgress,
        getTotalVisibleSteps,
        getCurrentStepPosition,
        logo
      },
      children
    }
  );
};
var useSurveyForm = () => (0, import_react.useContext)(SurveyFormContext);

// src/components/layouts/PageByPageLayout.tsx
var import_react21 = require("react");

// src/themes/index.ts
var defaultTheme = {
  name: "default",
  containerLayout: "max-w-3xl mx-auto py-8 px-4 sm:px-6",
  header: "mb-8",
  title: "text-3xl font-bold text-gray-900 mb-2",
  description: "text-lg text-gray-600",
  background: "bg-white",
  card: "bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6",
  field: {
    label: "block text-sm font-medium text-gray-900 mb-1",
    input: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    description: "mt-1 text-sm text-gray-500",
    error: "mt-1 text-sm text-red-600",
    radio: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300",
    checkbox: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded",
    select: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    textarea: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
    file: "w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50",
    matrix: "border-collapse w-full text-sm",
    range: "accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
    text: "text-gray-700",
    activeText: "text-blue-600",
    placeholder: "text-gray-400"
  },
  container: {
    card: "bg-white border border-gray-200 rounded-lg",
    border: "border-gray-200",
    activeBorder: "border-blue-500",
    activeBg: "bg-blue-50",
    header: "bg-gray-50"
  },
  progress: {
    bar: "h-2 bg-[#3B82F6] rounded-full overflow-hidden",
    dots: "flex space-x-2",
    numbers: "flex space-x-2",
    percentage: "text-right text-sm text-gray-500 mb-1",
    label: "text-sm text-gray-500 mb-1"
  },
  button: {
    primary: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    secondary: "inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    text: "text-sm font-medium text-blue-600 hover:text-blue-500",
    navigation: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  },
  colors: {
    primary: "#3B82F6",
    // blue-500
    secondary: "#6B7280",
    // gray-500
    accent: "#F59E0B",
    // amber-500
    background: "#FFFFFF",
    // white
    text: "#111827",
    // gray-900
    border: "#D1D5DB",
    // gray-300
    error: "#EF4444",
    // red-500
    success: "#10B981"
    // emerald-500
  }
};
var minimalTheme = {
  name: "minimal",
  containerLayout: "max-w-3xl mx-auto py-8 px-4 sm:px-6",
  header: "mb-6",
  title: "text-2xl font-medium text-gray-900 mb-2",
  description: "text-base text-gray-600",
  background: "bg-card",
  card: "bg-white p-6 mb-6",
  field: {
    label: "block text-sm font-normal text-gray-700 mb-1",
    input: "w-full border-0 border-b border-gray-200 py-2 focus:border-gray-900 focus:ring-0",
    description: "mt-1 text-xs text-gray-500",
    error: "mt-1 text-xs text-red-500",
    radio: "focus:ring-0 h-4 w-4 text-gray-900 border-gray-300",
    checkbox: "focus:ring-0 h-4 w-4 text-gray-900 border-gray-300 rounded",
    select: "w-full border-0 border-b border-gray-200 py-2 focus:border-gray-900 focus:ring-0",
    textarea: "w-full border border-gray-200 py-2 focus:border-gray-900 focus:ring-0",
    file: "w-full text-sm text-gray-700 border border-gray-200 cursor-pointer bg-transparent",
    matrix: "border-collapse w-full text-sm border-transparent",
    range: "accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
    text: "text-gray-700",
    activeText: "text-blue-600",
    placeholder: "text-gray-400"
  },
  container: {
    card: "bg-white border border-gray-200 rounded-lg",
    border: "border-gray-200",
    activeBorder: "border-blue-500",
    activeBg: "bg-blue-50",
    header: "bg-gray-50"
  },
  progress: {
    bar: "h-1 bg-gray-100 overflow-hidden",
    dots: "flex space-x-1",
    numbers: "flex space-x-1",
    percentage: "text-right text-xs text-gray-400 mb-1",
    label: "text-xs text-gray-400 mb-1"
  },
  button: {
    primary: "py-2 px-4 text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none",
    secondary: "py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none",
    text: "text-sm font-medium text-gray-700 hover:text-gray-900",
    navigation: "flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none"
  },
  colors: {
    primary: "#111827",
    // gray-900
    secondary: "#6B7280",
    // gray-500
    accent: "#111827",
    // gray-900
    background: "#F9FAFB",
    // gray-50
    text: "#111827",
    // gray-900
    border: "#E5E7EB",
    // gray-200
    error: "#EF4444",
    // red-500
    success: "#10B981"
    // emerald-500
  }
};
var colorfulTheme = {
  name: "colorful",
  containerLayout: "max-w-3xl mx-auto py-8 px-4 sm:px-6",
  header: "mb-8",
  title: "text-3xl font-bold text-purple-900 mb-3",
  description: "text-lg text-purple-700",
  background: "bg-card",
  card: "bg-white shadow-lg border border-purple-100 rounded-xl p-6 mb-6",
  container: {
    card: "bg-white border border-gray-200 rounded-lg",
    border: "border-gray-200",
    activeBorder: "border-blue-500",
    activeBg: "bg-blue-50",
    header: "bg-gray-50"
  },
  field: {
    label: "block text-sm font-semibold text-purple-800 mb-1",
    input: "w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50",
    description: "mt-1 text-sm text-purple-600",
    error: "mt-1 text-sm text-pink-600 font-medium",
    radio: "focus:ring-purple-500 h-4 w-4 text-purple-600 border-purple-300",
    checkbox: "focus:ring-purple-500 h-4 w-4 text-purple-600 border-purple-300 rounded",
    select: "w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50",
    textarea: "w-full rounded-lg border-purple-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50",
    file: "w-full text-sm text-purple-900 border border-purple-200 rounded-lg cursor-pointer bg-purple-50",
    matrix: "border-collapse w-full text-sm rounded-lg overflow-hidden",
    range: "accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
    text: "text-gray-700",
    activeText: "text-blue-600",
    placeholder: "text-gray-400"
  },
  progress: {
    bar: "h-2 bg-purple-100 rounded-full overflow-hidden",
    dots: "flex space-x-2",
    numbers: "flex space-x-2",
    percentage: "text-right text-sm text-purple-600 font-medium mb-1",
    label: "text-sm text-purple-600 mb-1"
  },
  button: {
    primary: "inline-flex justify-center py-2 px-6 shadow-md text-sm font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
    secondary: "inline-flex justify-center py-2 px-6 border border-purple-200 shadow-md text-sm font-medium rounded-full text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
    text: "text-sm font-medium text-purple-600 hover:text-purple-800",
    navigation: "inline-flex items-center px-6 py-2 shadow-md text-sm font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
  },
  colors: {
    primary: "#8B5CF6",
    // purple-500
    secondary: "#EC4899",
    // pink-500
    accent: "#F59E0B",
    // amber-500
    background: "#F5F3FF",
    // purple-50
    text: "#6D28D9",
    // purple-700
    border: "#DDD6FE",
    // purple-200
    error: "#DB2777",
    // pink-600
    success: "#10B981"
    // emerald-500
  }
};
var modernTheme = {
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
    boxBorder: "border-[#C48A66]"
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
    // coral orange
    secondary: "#6B7280",
    // gray-500
    accent: "#D86B3C",
    // darker coral
    background: "#FFFFFF",
    // white
    text: "#111827",
    // gray-900
    border: "#E5E7EB",
    // gray-200
    error: "#EF4444",
    // red-500
    success: "#10B981"
    // emerald-500
  }
};
var corporateTheme = {
  name: "corporate",
  containerLayout: "max-w-3xl mx-auto py-8 px-4 sm:px-6",
  header: "mb-8",
  title: "text-2xl font-bold text-gray-800 mb-2",
  description: "text-base text-gray-600",
  background: "bg-gray-50",
  card: "bg-white shadow border-t-4 border-blue-700 p-6 mb-6",
  container: {
    card: "bg-white border border-gray-200 rounded-lg",
    border: "border-gray-200",
    activeBorder: "border-blue-500",
    activeBg: "bg-blue-50",
    header: "bg-gray-50"
  },
  field: {
    label: "block text-sm font-semibold text-gray-700 mb-1",
    input: "w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700",
    description: "mt-1 text-sm text-gray-500",
    error: "mt-1 text-sm text-red-700",
    radio: "focus:ring-blue-700 h-4 w-4 text-blue-700 border-gray-300",
    checkbox: "focus:ring-blue-700 h-4 w-4 text-blue-700 border-gray-300 rounded",
    select: "w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700",
    textarea: "w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-700 focus:ring-blue-700",
    file: "w-full text-sm text-gray-700 border border-gray-300 rounded-sm cursor-pointer bg-gray-50",
    matrix: "border-collapse w-full text-sm border-gray-200",
    range: "accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
    text: "text-gray-700",
    activeText: "text-blue-600",
    placeholder: "text-gray-400"
  },
  progress: {
    bar: "h-2 bg-gray-200 overflow-hidden",
    dots: "flex space-x-1",
    numbers: "flex space-x-1",
    percentage: "text-right text-sm text-gray-600 mb-1",
    label: "text-sm text-gray-600 mb-1"
  },
  button: {
    primary: "inline-flex justify-center py-2 px-4 text-sm font-medium rounded-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700",
    secondary: "inline-flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700",
    text: "text-sm font-medium text-blue-700 hover:text-blue-800",
    navigation: "inline-flex items-center px-4 py-2 text-sm font-medium rounded-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
  },
  colors: {
    primary: "#1D4ED8",
    // blue-700
    secondary: "#4B5563",
    // gray-600
    accent: "#0369A1",
    // sky-700
    background: "#F9FAFB",
    // gray-50
    text: "#1F2937",
    // gray-800
    border: "#D1D5DB",
    // gray-300
    error: "#B91C1C",
    // red-700
    success: "#047857"
    // emerald-700
  }
};
var darkTheme = {
  name: "dark",
  containerLayout: "max-w-3xl mx-auto py-8 px-4 sm:px-6",
  header: "mb-6",
  title: "text-2xl font-bold text-white mb-2",
  description: "text-base text-gray-400",
  background: "bg-gray-900 dark",
  card: "bg-card text-card-foreground shadow-sm border border-border rounded-lg p-6 mb-6 dark",
  field: {
    label: "block text-sm font-medium text-foreground mb-1.5",
    input: "bg-input text-foreground",
    description: "mt-1 text-sm text-muted-foreground",
    error: "mt-1 text-sm text-destructive",
    radio: "text-primary border-input",
    checkbox: "text-primary border-input",
    select: "bg-input text-foreground",
    textarea: "bg-input text-foreground",
    file: "border border-input bg-background text-foreground",
    matrix: "border-border",
    range: "bg-background",
    text: "text-foreground",
    activeText: "text-primary",
    placeholder: "text-muted-foreground"
  },
  container: {
    card: "bg-card text-card-foreground border-border",
    border: "border-border",
    activeBorder: "border-primary",
    activeBg: "bg-primary/10",
    header: "bg-muted"
  },
  progress: {
    bar: "h-2 bg-secondary/20 rounded-full overflow-hidden",
    dots: "flex space-x-2",
    numbers: "flex space-x-2",
    percentage: "text-right text-sm text-muted-foreground mb-1",
    label: "text-sm text-muted-foreground mb-1"
  },
  button: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    text: "text-sm font-medium text-primary hover:text-primary/80",
    navigation: "bg-primary text-primary-foreground hover:bg-primary/90"
  },
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))",
    background: "hsl(var(--background))",
    text: "hsl(var(--foreground))",
    border: "hsl(var(--border))",
    error: "hsl(var(--destructive))",
    success: "hsl(var(--success))"
  }
};
var themes = {
  default: defaultTheme,
  minimal: minimalTheme,
  colorful: colorfulTheme,
  modern: modernTheme,
  corporate: corporateTheme,
  dark: darkTheme,
  custom: void 0
};

// src/components/ui/ProgressBar.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ProgressBar = ({
  currentPage,
  totalPages,
  options = {
    type: "bar",
    showPercentage: true,
    showStepInfo: true,
    position: "top",
    animation: true
  }
}) => {
  const { theme } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const {
    type = "bar",
    showPercentage = true,
    showStepInfo = true,
    showStepTitles = false,
    showStepNumbers = true,
    position = "top",
    color = themeConfig.colors.primary,
    backgroundColor = themeConfig.colors.border,
    height = "8px",
    animation = true
  } = options;
  const progress = totalPages <= 1 ? 100 : Math.max(0, Math.min(100, currentPage / (totalPages - 1) * 100));
  const wrapperClass = `survey-progress-wrapper ${position === "bottom" ? "mt-6 mb-2" : "mb-6 mt-2"}`;
  const renderProgressIndicator = () => {
    switch (type) {
      case "dots":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: themeConfig.progress.dots, children: Array.from({ length: totalPages }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: `h-3 w-3 rounded-full ${index <= currentPage ? "bg-primary-600" : "bg-gray-200"}`,
            style: {
              backgroundColor: index <= currentPage ? color : backgroundColor,
              transition: animation ? "background-color 0.3s ease" : "none"
            }
          },
          index
        )) });
      case "numbers":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: themeConfig.progress.numbers, children: Array.from({ length: totalPages }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: `flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${index <= currentPage ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"}`,
            style: {
              backgroundColor: index <= currentPage ? color : backgroundColor,
              transition: animation ? "background-color 0.3s ease" : "none"
            },
            children: index + 1
          },
          index
        )) });
      case "percentage":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-center text-lg font-bold", children: [
          Math.round(progress),
          "%"
        ] });
      case "bar":
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: themeConfig.progress.bar,
            style: { height },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "div",
              {
                className: "bg-primary-600 h-full",
                style: {
                  width: `${progress}%`,
                  backgroundColor: color,
                  transition: animation ? "width 0.3s ease" : "none"
                }
              }
            )
          }
        );
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: wrapperClass, children: [
    showStepInfo && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex justify-between mb-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: themeConfig.progress.label, children: showStepNumbers && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        "Page ",
        currentPage + 1,
        " of ",
        totalPages
      ] }) }),
      showPercentage && type !== "percentage" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: themeConfig.progress.percentage, children: [
        Math.round(progress),
        "%"
      ] })
    ] }),
    renderProgressIndicator()
  ] });
};

// src/components/ui/button.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/ui/button.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? import_react_slot.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/NavigationButtons.tsx
var import_lucide_react = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var NavigationButtons = ({
  onPrevious,
  onNext,
  onSubmit,
  isValid = true,
  options = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: "Previous",
    nextText: "Next",
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  submitText = "Submit"
}) => {
  const { theme } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const isDarkMode = theme.name === "dark";
  const {
    showPrevious = true,
    showNext = true,
    showSubmit = true,
    previousText = "Previous",
    nextText = "Next",
    position = "bottom",
    align = "center",
    style = "default"
  } = options;
  if (!showPrevious && !showNext && !showSubmit) {
    return null;
  }
  const getPrimaryVariant = () => {
    if (style === "outlined") return "outline";
    if (style === "text") return "ghost";
    return "default";
  };
  const getSecondaryVariant = () => {
    if (style === "text") return "ghost";
    return "outline";
  };
  const alignmentClass = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
  const containerClass = cn(
    "flex items-center gap-4 mt-6",
    position === "split" ? "justify-between" : alignmentClass
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: containerClass, children: [
    showPrevious && onPrevious && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      Button,
      {
        type: "button",
        variant: getSecondaryVariant(),
        onClick: onPrevious,
        className: "gap-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.ArrowLeft, { className: "h-4 w-4 mr-1" }),
          previousText
        ]
      }
    ),
    position === "split" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-grow" }),
    showNext && onNext && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      Button,
      {
        type: "button",
        variant: getPrimaryVariant(),
        onClick: onNext,
        disabled: !isValid,
        className: "gap-1",
        children: [
          nextText,
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.ArrowRight, { className: "h-4 w-4 ml-1" })
        ]
      }
    ),
    showSubmit && onSubmit && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      Button,
      {
        type: "submit",
        variant: getPrimaryVariant(),
        onClick: onSubmit,
        disabled: !isValid,
        className: "gap-1",
        children: [
          options.submitText || submitText,
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react.Send, { className: "h-4 w-4 ml-1" })
        ]
      }
    )
  ] });
};

// src/components/renderers/BlockRenderer.tsx
var import_react19 = require("react");

// src/components/renderers/TextInputRenderer.tsx
var import_react2 = require("react");

// src/components/ui/input.tsx
var React2 = __toESM(require("react"));
var import_jsx_runtime5 = require("react/jsx-runtime");
var Input = React2.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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

// src/components/ui/label.tsx
var React3 = __toESM(require("react"));
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_class_variance_authority2 = require("class-variance-authority");
var import_jsx_runtime6 = require("react/jsx-runtime");
var labelVariants = (0, import_class_variance_authority2.cva)(
  "text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[color:var(--x)]"
);
var Label = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

// src/components/renderers/TextInputRenderer.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var TextInputRenderer = (0, import_react2.forwardRef)(
  ({ block, value, onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.target.value);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "survey-text-input space-y-2", children: [
      block.label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Label,
        {
          htmlFor: block.fieldName,
          className: cn("text-base", themeConfig.field.label),
          children: block.label
        }
      ),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        Input,
        {
          id: block.fieldName,
          name: block.fieldName,
          type: "text",
          value: value || "",
          placeholder: block.placeholder,
          disabled,
          onChange: handleChange,
          onBlur,
          ref,
          className: cn(error && "border-destructive", themeConfig.field.input),
          "aria-invalid": !!error
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
    ] });
  }
);
TextInputRenderer.displayName = "TextInputRenderer";

// src/components/renderers/TextareaRenderer.tsx
var import_react3 = require("react");

// src/components/ui/textarea.tsx
var React5 = __toESM(require("react"));
var import_jsx_runtime8 = require("react/jsx-runtime");
var Textarea = React5.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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

// src/components/renderers/TextareaRenderer.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var TextareaRenderer = (0, import_react3.forwardRef)(
  ({ block, value, onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.target.value);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "survey-textarea space-y-2", children: [
      block.label && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        Label,
        {
          htmlFor: block.fieldName,
          className: cn("text-base", themeConfig.field.label),
          children: block.label
        }
      ),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        Textarea,
        {
          id: block.fieldName,
          name: block.fieldName,
          value: value || "",
          placeholder: block.placeholder,
          disabled,
          onChange: handleChange,
          onBlur,
          ref,
          className: cn(error && "border-destructive", themeConfig.field.textarea),
          "aria-invalid": !!error,
          rows: block.rows || 4
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
    ] });
  }
);
TextareaRenderer.displayName = "TextareaRenderer";

// src/components/ui/radio-group.tsx
var React7 = __toESM(require("react"));
var RadioGroupPrimitive = __toESM(require("@radix-ui/react-radio-group"));
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var RadioGroup = React7.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    RadioGroupPrimitive.Root,
    {
      className: cn("", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React7.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react2.Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// src/components/renderers/RadioRenderer.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var RadioRenderer = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  const labels = block.labels || [];
  const values = block.values || labels.map((_, i) => i);
  const handleChange = (selectedValue) => {
    if (onChange) {
      onChange(selectedValue);
    }
    if (onBlur) {
      onBlur();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "survey-radio space-y-3", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Label, { className: cn("text-base block", themeConfig.field.label), children: block.label }),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      RadioGroup,
      {
        value: value == null ? void 0 : value.toString(),
        onValueChange: (val) => {
          const originalValue = values[labels.findIndex(
            (_, i) => values[i].toString() === val
          )];
          handleChange(originalValue);
        },
        className: "space-y-1 mt-2",
        disabled,
        children: labels.map((label, index) => {
          const optionValue = values[index];
          const id = `${block.fieldName}-${index}`;
          const stringValue = typeof optionValue === "string" ? optionValue : optionValue.toString();
          return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              RadioGroupItem,
              {
                id,
                value: stringValue,
                disabled,
                "aria-invalid": !!error
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              Label,
              {
                htmlFor: id,
                className: "text-sm font-normal cursor-pointer",
                children: label
              }
            )
          ] }, id);
        })
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
  ] });
};

// src/components/renderers/CheckboxRenderer.tsx
var import_react4 = require("react");

// src/components/ui/checkbox.tsx
var React8 = __toESM(require("react"));
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Checkbox = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react3.Check, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/renderers/CheckboxRenderer.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var CheckboxRenderer = (0, import_react4.forwardRef)(
  ({ block, value = [], onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const labels = block.labels || [];
    const values = block.values || labels.map((_, i) => i);
    const handleChange = (optionValue, checked) => {
      if (!onChange) return;
      const currentValues = [...value || []];
      if (checked) {
        if (!currentValues.includes(optionValue)) {
          onChange([...currentValues, optionValue]);
        }
      } else {
        onChange(currentValues.filter((v) => v !== optionValue));
      }
      if (onBlur) {
        onBlur();
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "survey-checkbox space-y-3", children: [
      block.label && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Label, { className: cn("text-base block", themeConfig.field.label), children: block.label }),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "space-y-2 mt-2", children: labels.map((label, index) => {
        const optionValue = values[index];
        const id = `${block.fieldName}-${index}`;
        const isChecked = typeof optionValue === "string" || typeof optionValue === "number" ? (value == null ? void 0 : value.includes(optionValue)) || false : false;
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center space-x-2 py-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            Checkbox,
            {
              id,
              name: `${block.fieldName}[]`,
              checked: isChecked,
              disabled,
              onCheckedChange: (checked) => handleChange(optionValue, checked),
              "aria-invalid": !!error,
              ref: index === 0 ? ref : void 0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            Label,
            {
              htmlFor: id,
              className: "text-sm font-normal cursor-pointer",
              children: label
            }
          )
        ] }, id);
      }) }),
      error && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
    ] });
  }
);
CheckboxRenderer.displayName = "CheckboxRenderer";

// src/components/renderers/SelectRenderer.tsx
var import_react5 = require("react");

// src/components/ui/select.tsx
var React10 = __toESM(require("react"));
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react4.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react4.ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react4.ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React10.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectScrollUpButton, {}),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react4.Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/renderers/SelectRenderer.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var SelectRenderer = (0, import_react5.forwardRef)(
  ({ block, value, onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.target.value);
    };
    const labels = block.labels || [];
    const values = block.values || labels.map((_, i) => i);
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "survey-select space-y-2", children: [
      block.label && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        Label,
        {
          htmlFor: block.fieldName,
          className: cn("text-base", themeConfig.field.label),
          children: block.label
        }
      ),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        Select,
        {
          name: block.fieldName,
          value: value !== void 0 && value !== null ? value.toString() : void 0,
          onValueChange: (selectedValue) => {
            const index = values.findIndex((v) => v.toString() === selectedValue);
            if (index !== -1) {
              onChange == null ? void 0 : onChange(values[index]);
            } else {
              onChange == null ? void 0 : onChange(selectedValue);
            }
            if (onBlur) onBlur();
          },
          disabled,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              SelectTrigger,
              {
                id: block.fieldName,
                className: cn(error && "border-destructive", themeConfig.field.select),
                "aria-invalid": !!error,
                ref,
                children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectValue, { placeholder: block.placeholder || "Select an option" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectContent, { children: labels.map((label, index) => {
              const optionValue = values[index];
              const stringValue = optionValue !== void 0 ? optionValue.toString() : "";
              return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(SelectItem, { value: stringValue, children: label }, index);
            }) })
          ]
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
    ] });
  }
);
SelectRenderer.displayName = "SelectRenderer";

// src/components/renderers/MarkdownRenderer.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var parseMarkdown = (markdown) => {
  if (!markdown) return "";
  let html = markdown.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, content) => {
    const level = hashes.length;
    return `<h${level} class="md-heading md-h${level}">${content}</h${level}>`;
  });
  html = html.replace(/\n\n([^#].*?)\n\n/gs, (_, content) => {
    return `

<p class="md-paragraph">${content}</p>

`;
  });
  html = html.replace(/(?<!\n)\n(?!\n)/g, "<br />");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="md-link">$1</a>');
  html = html.replace(/^\s*[-*+]\s+(.*?)(?=\n\s*[-*+]|\n\n|$)/gms, (_, content) => {
    return `<li class="md-list-item">${content}</li>`;
  });
  html = html.replace(/(<li class="md-list-item">.*?<\/li>)+/gs, '<ul class="md-list">$&</ul>');
  html = html.replace(/^\s*\d+\.\s+(.*?)(?=\n\s*\d+\.|\n\n|$)/gms, (_, content) => {
    return `<li class="md-list-item">${content}</li>`;
  });
  html = html.replace(/(<li class="md-list-item">.*?<\/li>)+/gs, '<ol class="md-list">$&</ol>');
  return html;
};
var MarkdownRenderer = ({ block, theme = null }) => {
  const themeConfig = theme != null ? theme : themes.default;
  const html = parseMarkdown(block.text || "");
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "div",
    {
      className: "survey-markdown",
      dangerouslySetInnerHTML: { __html: html }
    }
  );
};

// src/components/renderers/HtmlRenderer.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var HtmlRenderer = ({
  block,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    "div",
    {
      className: "survey-html",
      dangerouslySetInnerHTML: { __html: block.html || "" }
    }
  );
};

// src/components/renderers/RangeRenderer.tsx
var import_react7 = require("react");

// src/components/ui/slider.tsx
var import_react6 = require("react");
var import_jsx_runtime18 = require("react/jsx-runtime");
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
  const trackRef = (0, import_react6.useRef)(null);
  const thumbRefs = (0, import_react6.useRef)([]);
  const [dragging, setDragging] = (0, import_react6.useState)(null);
  const [internalValues, setInternalValues] = (0, import_react6.useState)(value);
  (0, import_react6.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      className: cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
        "div",
        {
          ref: trackRef,
          className: "relative h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800",
          onClick: handleTrackClick,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "div",
              {
                className: "absolute h-full rounded-full bg-primary",
                style: {
                  left: "0%",
                  width: `${getPercentage(internalValues[0])}%`
                }
              }
            ),
            internalValues.map((val, index) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "div",
              {
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
              },
              index
            ))
          ]
        }
      )
    }
  );
};

// src/components/renderers/RangeRenderer.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
var RangeRenderer = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  const min = parseInt(String(block.min || "0"), 10);
  const max = parseInt(String(block.max || "100"), 10);
  const step = parseInt(String(block.step || "1"), 10);
  const markStep = parseInt(String(block.markStep || "0"), 10);
  const [currentValue, setCurrentValue] = (0, import_react7.useState)(
    value !== void 0 ? Number(value) : block.defaultValue !== void 0 ? Number(block.defaultValue) : min
  );
  (0, import_react7.useEffect)(() => {
    if (value !== void 0) {
      setCurrentValue(Number(value));
    }
  }, [value]);
  const handleChange = (values) => {
    if (values.length > 0) {
      const newValue = values[0];
      setCurrentValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };
  let valueDisplay = `Value: ${currentValue}`;
  if (block.showValue) {
    if (typeof block.showValue === "string") {
      valueDisplay = block.showValue.replace("{value}", String(currentValue));
    } else {
      valueDisplay = `Value: ${currentValue}`;
    }
  } else if (block.showValue === false) {
    valueDisplay = "";
  }
  const marks = [];
  if (markStep > 0) {
    for (let i = min; i <= max; i += markStep) {
      const percentage = (i - min) / (max - min) * 100;
      marks.push(
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
          "div",
          {
            className: "absolute text-xs -translate-x-1/2",
            style: { left: `${percentage}%`, top: "20px" },
            children: i
          },
          i
        )
      );
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "survey-range space-y-4", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
      Label,
      {
        htmlFor: block.fieldName,
        className: cn("text-base", themeConfig.field.label),
        children: block.label
      }
    ),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "pt-4 px-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        Slider,
        {
          id: block.fieldName,
          min,
          max,
          step,
          value: [currentValue],
          onValueChange: handleChange,
          disabled,
          className: cn(error && "border-destructive", themeConfig.field.range),
          "aria-invalid": !!error
        }
      ),
      marks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "relative h-6 mt-1", children: marks }),
      valueDisplay && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex justify-between mt-3 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cn("text-muted-foreground", themeConfig.field.text), children: min }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cn("font-medium", themeConfig.field.activeText), children: valueDisplay }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cn("text-muted-foreground", themeConfig.field.text), children: max })
      ] })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
  ] });
};

// src/components/renderers/DatePickerRenderer.tsx
var import_react10 = __toESM(require("react"));

// src/components/ui/calendar.tsx
var import_react8 = require("react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var Calendar = ({
  selected,
  onSelect,
  className
}) => {
  const [currentMonth, setCurrentMonth] = (0, import_react8.useState)(
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
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "text-center text-sm font-medium", children: day }, `weekday-${day}`)
      );
    });
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(/* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", {}, `empty-${i}`));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      daysArray.push(
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "text-center p-1", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          Button,
          {
            variant: isSelected(date) ? "default" : "ghost",
            className: cn(
              "h-8 w-8 rounded-full p-0 font-normal",
              isSelected(date) && "bg-primary text-primary-foreground"
            ),
            onClick: () => onSelect == null ? void 0 : onSelect(date),
            children: day
          }
        ) }, `day-${day}`)
      );
    }
    return daysArray;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: cn("p-3", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Button, { variant: "ghost", size: "sm", onClick: prevMonth, children: "<" }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "font-medium", children: formatMonth(currentMonth) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Button, { variant: "ghost", size: "sm", onClick: nextMonth, children: ">" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "grid grid-cols-7 gap-1", children: renderCalendar() })
  ] });
};

// src/components/ui/popover.tsx
var import_react9 = __toESM(require("react"));
var import_jsx_runtime21 = require("react/jsx-runtime");
var PopoverTrigger = ({
  children,
  className,
  onClick
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      className: cn("cursor-pointer", className),
      onClick,
      children
    }
  );
};
var PopoverContent = ({
  children,
  className,
  open,
  onClose
}) => {
  const ref = (0, import_react9.useRef)(null);
  (0, import_react9.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      ref,
      className: cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in zoom-in-95 mt-1",
        className
      ),
      children
    }
  );
};
var PopoverRoot = ({ children }) => {
  const [open, setOpen] = (0, import_react9.useState)(false);
  const childrenWithProps = import_react9.default.Children.map(children, (child) => {
    if (import_react9.default.isValidElement(child)) {
      if (child.type === PopoverTrigger) {
        return import_react9.default.cloneElement(child, {
          onClick: () => setOpen(!open)
        });
      }
      if (child.type === PopoverContent) {
        return import_react9.default.cloneElement(child, {
          open,
          onClose: () => setOpen(false)
        });
      }
    }
    return child;
  });
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_jsx_runtime21.Fragment, { children: childrenWithProps });
};

// src/components/renderers/DatePickerRenderer.tsx
var import_date_fns = require("date-fns");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime22 = require("react/jsx-runtime");
var getDateFormat = (formatStr = "PPP") => {
  switch (formatStr) {
    case "P":
      return "MM/dd/yyyy";
    case "PP":
      return "MMM d, yyyy";
    case "PPP":
    default:
      return "MMMM d, yyyy";
  }
};
var DatePickerRenderer = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  const [date, setDate] = (0, import_react10.useState)(
    value ? new Date(value) : block.defaultValue ? new Date(block.defaultValue) : null
  );
  const [isCalendarOpen, setIsCalendarOpen] = (0, import_react10.useState)(false);
  (0, import_react10.useEffect)(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate.toISOString());
    }
    if (onBlur) {
      onBlur();
    }
    setIsCalendarOpen(false);
  };
  const handleInputClick = () => {
    if (!disabled && block.showCalendarOnFocus) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };
  const disabledDays = import_react10.default.useMemo(() => {
    if (!block.disabledDays) return void 0;
    try {
      return block.disabledDays.split(",").map((d) => parseInt(d.trim(), 10));
    } catch (e) {
      return void 0;
    }
  }, [block.disabledDays]);
  const dateConstraints = import_react10.default.useMemo(() => {
    const constraints = {};
    if (block.minDate) {
      try {
        constraints.from = new Date(block.minDate);
      } catch (e) {
      }
    }
    if (block.maxDate) {
      try {
        constraints.to = new Date(block.maxDate);
      } catch (e) {
      }
    }
    return constraints;
  }, [block.minDate, block.maxDate]);
  const formattedDate = date ? (0, import_date_fns.formatDate)(date, block.dateFormat || "PPP") : "";
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "survey-datepicker space-y-2", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      Label,
      {
        htmlFor: block.fieldName,
        className: cn("text-base", themeConfig.field.label),
        children: block.label
      }
    ),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(PopoverRoot, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
        Button,
        {
          id: block.fieldName,
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            error && "border-destructive",
            themeConfig.field.input
          ),
          disabled,
          onClick: () => setIsCalendarOpen(true),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react5.CalendarIcon, { className: "mr-2 h-4 w-4" }),
            date ? (0, import_date_fns.format)(date, getDateFormat(block.dateFormat)) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { children: block.placeholder || "Select a date" })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Calendar,
        {
          mode: "single",
          selected: date || void 0,
          onSelect: (newDate) => {
            if (newDate) {
              handleDateSelect(newDate);
            }
          },
          disabled: dateConstraints,
          disableWeekdays: disabledDays,
          initialFocus: true
        }
      ) })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
  ] });
};

// src/components/renderers/FileUploadRenderer.tsx
var import_react11 = require("react");
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime23 = require("react/jsx-runtime");
var FileUploadRenderer = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  const fileInputRef = (0, import_react11.useRef)(null);
  const [files, setFiles] = (0, import_react11.useState)(() => {
    if (Array.isArray(value)) {
      return value;
    }
    return [];
  });
  const [isDragging, setIsDragging] = (0, import_react11.useState)(false);
  const maxFiles = parseInt(String(block.maxFiles || "1"), 10);
  const maxFileSize = parseFloat(String(block.maxFileSize || "5")) * 1024 * 1024;
  const acceptedTypes = block.acceptedFileTypes || [];
  const handleFileSelect = (selectedFiles) => {
    var _a;
    if (!selectedFiles || disabled) return;
    const validFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileExt = `.${(_a = file.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()}`;
      const isValidType = acceptedTypes.length === 0 || acceptedTypes.includes(fileExt);
      const isValidSize = file.size <= maxFileSize;
      if (isValidType && isValidSize) {
        validFiles.push(file);
      }
    }
    const newFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
    }
    if (onBlur) {
      onBlur();
    }
  };
  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };
  const renderFilePreviews = () => {
    return files.map((file, index) => {
      const isImage = file.type.startsWith("image/");
      const showPreview = block.showPreview && isImage;
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        "div",
        {
          className: `flex items-center gap-2 p-2 rounded-md mt-2 ${themeConfig.container.card}`,
          children: [
            showPreview && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "w-10 h-10 flex-shrink-0 rounded overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              "img",
              {
                src: URL.createObjectURL(file),
                alt: file.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex-grow truncate", children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: `text-sm font-medium truncate ${themeConfig.field.label}`, children: file.name }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: `text-xs ${themeConfig.field.description}`, children: [
                (file.size / 1024).toFixed(1),
                " KB"
              ] })
            ] }),
            !disabled && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              "button",
              {
                type: "button",
                onClick: () => handleRemoveFile(index),
                className: `flex-shrink-0 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`,
                "aria-label": "Remove file",
                children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ]
        },
        index
      );
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "survey-file-upload space-y-3", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      Label,
      {
        htmlFor: block.fieldName,
        className: cn("text-base", themeConfig.field.label),
        children: block.label
      }
    ),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
      "div",
      {
        className: cn(
          "border-2 border-dashed rounded-md p-6 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-input",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          error && "border-destructive",
          themeConfig.container.border
        ),
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onClick: () => {
          var _a;
          return !disabled && ((_a = fileInputRef.current) == null ? void 0 : _a.click());
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_lucide_react6.UploadCloud,
            {
              className: cn("mx-auto h-10 w-10 mb-2 text-muted-foreground", themeConfig.field.description)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: cn("text-sm font-medium mb-1", themeConfig.field.text), children: block.helpText || "Drag and drop files here or click to browse" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: cn("text-xs text-muted-foreground", themeConfig.field.description), children: [
            acceptedTypes && acceptedTypes.length > 0 ? `Accepted formats: ${acceptedTypes.join(", ")}` : "All file formats accepted",
            block.maxFileSize && ` \u2022 Max size: ${block.maxFileSize} MB`,
            maxFiles > 1 && ` \u2022 Max files: ${maxFiles}`
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "input",
            {
              ref: fileInputRef,
              id: block.fieldName,
              type: "file",
              className: "hidden",
              accept: (acceptedTypes == null ? void 0 : acceptedTypes.join(",")) || void 0,
              multiple: maxFiles > 1,
              onChange: (e) => handleFileSelect(e.target.files),
              disabled
            }
          )
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "mt-4 space-y-2", children: files.map((file, index) => {
      const isImage = file.type.startsWith("image/");
      const showPreview = block.showPreview && isImage;
      return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        "div",
        {
          className: cn(
            "flex items-center gap-2 p-2 rounded-md border",
            themeConfig.container.card
          ),
          children: [
            showPreview && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "w-10 h-10 flex-shrink-0 rounded overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              "img",
              {
                src: URL.createObjectURL(file),
                alt: file.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex-grow truncate", children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: cn("text-sm font-medium truncate", themeConfig.field.label), children: file.name }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: cn("text-xs text-muted-foreground", themeConfig.field.description), children: [
                (file.size / 1024).toFixed(1),
                " KB"
              ] })
            ] }),
            !disabled && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => handleRemoveFile(index),
                className: "h-7 w-7",
                "aria-label": "Remove file",
                children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react6.X, { className: "h-4 w-4" })
              }
            )
          ]
        },
        index
      );
    }) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
  ] });
};

// src/components/renderers/MatrixRenderer.tsx
var import_react12 = require("react");

// src/components/ui/table.tsx
var React18 = __toESM(require("react"));
var import_jsx_runtime24 = require("react/jsx-runtime");
var Table = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  "tfoot",
  {
    ref,
    className: cn("bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
var TableHead = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
var TableCell = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
var TableCaption = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/renderers/MatrixRenderer.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var MatrixRenderer = ({
  block,
  value = {},
  onChange,
  onBlur,
  error,
  disabled,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  const questions = block.questions || [];
  const options = block.options || [];
  const [responses, setResponses] = (0, import_react12.useState)(value || {});
  (0, import_react12.useEffect)(() => {
    if (value) {
      setResponses(value);
    }
  }, [value]);
  const handleSelect = (questionId, optionValue) => {
    const newResponses = {
      ...responses,
      [questionId]: optionValue
    };
    setResponses(newResponses);
    if (onChange) {
      onChange(newResponses);
    }
    if (onBlur) {
      onBlur();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "survey-matrix space-y-4", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      Label,
      {
        className: cn("text-base block", themeConfig.field.label),
        children: block.label
      }
    ),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: cn("rounded-md border", themeConfig.container.card), children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TableHeader, { className: themeConfig.container.header, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TableHead, { className: "w-[250px]", children: block.columnHeader || "" }),
        options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TableHead, { className: "text-center whitespace-nowrap", children: option.text }, option.id))
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TableBody, { children: questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        TableRow,
        {
          className: cn(responses[question.id] && themeConfig.container.activeBg),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TableCell, { className: cn("font-medium", themeConfig.field.text), children: question.text }),
            options.map((option) => {
              const id = `${block.fieldName}-${question.id}-${option.id}`;
              const isSelected = responses[question.id] === option.value;
              return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TableCell, { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
                RadioGroup,
                {
                  name: `${block.fieldName}-${question.id}`,
                  value: responses[question.id],
                  onValueChange: (value2) => handleSelect(question.id, value2),
                  disabled,
                  className: "flex",
                  children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
                    RadioGroupItem,
                    {
                      id,
                      value: option.value,
                      "aria-invalid": !!error,
                      className: cn(
                        isSelected && themeConfig.container.activeBorder
                      )
                    }
                  )
                }
              ) }) }, option.id);
            })
          ]
        },
        question.id
      )) })
    ] }) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
  ] });
};

// src/components/renderers/SelectableBoxRenderer.tsx
var import_react13 = require("react");

// src/components/ui/card.tsx
var React20 = __toESM(require("react"));
var import_jsx_runtime26 = require("react/jsx-runtime");
var Card = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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
var CardHeader = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// src/components/renderers/SelectableBoxRenderer.tsx
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var SelectableBoxRenderer = ({
  block,
  value = "",
  onChange,
  onBlur,
  error,
  disabled,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  const idPrefix = (0, import_react13.useId)();
  const options = block.options || [];
  const boxSpacing = block.boxSpacing || "4";
  const showSelectionIndicator = block.showSelectionIndicator !== false;
  const [selectedValue, setSelectedValue] = (0, import_react13.useState)(value || "");
  (0, import_react13.useEffect)(() => {
    setSelectedValue(value || "");
  }, [value]);
  const handleSelect = (optionValue) => {
    setSelectedValue(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
    if (onBlur) {
      onBlur();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "survey-box-question space-y-4", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      Label,
      {
        className: cn("text-lg font-bold block", themeConfig.field.label),
        children: block.label
      }
    ),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
      RadioGroup,
      {
        value: selectedValue,
        onValueChange: handleSelect,
        disabled,
        className: `space-y-${boxSpacing} my-8`,
        children: options.map((option) => {
          const isSelected = selectedValue === option.value;
          const id = `${idPrefix}-${block.fieldName}-${option.id}`;
          return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              RadioGroupItem,
              {
                value: option.value,
                id,
                className: "sr-only",
                "aria-invalid": !!error
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              Label,
              {
                htmlFor: id,
                className: cn(
                  "block w-full cursor-pointer",
                  disabled && "opacity-50 cursor-not-allowed"
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
                  Card,
                  {
                    className: cn(
                      // Base box styling from theme
                      themeConfig.field.selectableBox || "p-4 transition-colors hover:bg-accent dark:hover:bg-accent/50",
                      // Selected state styling
                      isSelected ? themeConfig.field.selectableBoxSelected || themeConfig.field.boxBorder || "border-primary" : themeConfig.field.selectableBoxDefault || "border-[#ccc]",
                      // Hover state styling
                      !disabled && (themeConfig.field.selectableBoxHover || "hover:border-gray-400"),
                      // Focus state styling
                      themeConfig.field.selectableBoxFocus || "focus-within:ring-2 focus-within:ring-offset-2",
                      // Disabled state styling
                      disabled && (themeConfig.field.selectableBoxDisabled || "opacity-50 cursor-not-allowed")
                    ),
                    children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: cn(
                      "flex items-center justify-between",
                      themeConfig.field.selectableBoxContainer || ""
                    ), children: [
                      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: cn(
                        "text-foreground",
                        themeConfig.field.selectableBoxText || themeConfig.field.text,
                        isSelected && (themeConfig.field.selectableBoxTextSelected || themeConfig.field.activeText)
                      ), children: option.label }),
                      isSelected && showSelectionIndicator && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn(
                        "flex h-5 w-5 items-center justify-center rounded-full",
                        themeConfig.field.selectableBoxIndicator || "bg-primary text-primary-foreground"
                      ), children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react7.CheckSquare, { className: cn(
                        "h-3 w-3",
                        themeConfig.field.selectableBoxIndicatorIcon || ""
                      ) }) })
                    ] })
                  }
                )
              }
            )
          ] }, option.id);
        })
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error), children: error })
  ] });
};

// src/components/renderers/ScriptRenderer.tsx
var import_react14 = require("react");
init_surveyUtils();
var ScriptRenderer = ({ block }) => {
  const { values, setValue, currentPage, setError } = (0, import_react14.useContext)(SurveyFormContext);
  (0, import_react14.useEffect)(() => {
    if (typeof block.script !== "string" || !block.script.trim()) return;
    try {
      const context = {
        fieldValues: values,
        setValue,
        setError,
        currentPage,
        // Additional safe helper functions could be provided here
        // For example:
        getFieldValue: (fieldName) => values[fieldName],
        showAlert: (message) => console.log("Script alert:", message)
        // Safe console log
      };
      evaluateLogic(block.script, context);
    } catch (error) {
      console.error("Error executing script block:", error);
      if (block.fieldName) {
        setError(block.fieldName, `Script error: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  }, [values, currentPage, block.script, block.fieldName, setValue, setError]);
  return null;
};

// src/components/ui/alert.tsx
var React23 = __toESM(require("react"));
var import_class_variance_authority3 = require("class-variance-authority");
var import_jsx_runtime28 = require("react/jsx-runtime");
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
var Alert = React23.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
var AlertTitle = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

// src/components/ui/ValidationSummary.tsx
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime29 = require("react/jsx-runtime");
var ValidationSummary = ({
  fieldNames,
  showIcon = true,
  className = ""
}) => {
  const { errors, conditionalErrors } = useSurveyForm();
  const allErrors = { ...errors, ...conditionalErrors };
  const filteredErrors = fieldNames ? Object.entries(allErrors).filter(([field]) => fieldNames.includes(field)) : Object.entries(allErrors);
  if (filteredErrors.length === 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(Alert, { variant: "destructive", className: `mb-4 ${className}`, children: [
    showIcon && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react8.AlertCircle, { className: "h-4 w-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(AlertTitle, { children: "Validation Errors" }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(AlertDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("ul", { className: "mt-2 list-disc pl-5", children: filteredErrors.map(([field, error]) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("li", { className: "text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("strong", { children: [
        field,
        ":"
      ] }),
      " ",
      error
    ] }, field)) }) })
  ] });
};

// src/components/renderers/SetRenderer.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var SetRenderer = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = null,
  customComponents
}) => {
  const {
    getVisibleBlocks,
    evaluateCondition: evaluateCondition2
  } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const items = block.items || [];
  const visibleItems = getVisibleBlocks(items);
  if (visibleItems.length === 0) {
    return null;
  }
  const fieldNames = visibleItems.filter((child) => child.fieldName).map((child) => child.fieldName);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(Card, { className: cn("border bg-card", block.className), children: [
    (block.label || block.description) && /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(CardHeader, { children: [
      block.label && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CardTitle, { className: themeConfig.field.label, children: block.label }),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(CardDescription, { className: themeConfig.field.description, children: block.description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(CardContent, { className: "space-y-4 p-4", children: [
      fieldNames.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(ValidationSummary, { fieldNames }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "set-items space-y-4", children: visibleItems.map((childBlock, index) => {
        const isChildVisible = childBlock.visibleIf ? evaluateCondition2(childBlock.visibleIf) : true;
        if (!isChildVisible) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          BlockRenderer,
          {
            block: childBlock,
            value: childBlock.fieldName ? value == null ? void 0 : value[childBlock.fieldName] : void 0,
            onChange: (newValue) => {
              if (childBlock.fieldName && onChange) {
                const newValues = { ...value || {} };
                newValues[childBlock.fieldName] = newValue;
                onChange(newValues);
              }
            },
            onBlur,
            error: childBlock.fieldName && error ? error[childBlock.fieldName] : void 0,
            disabled,
            theme,
            customComponents,
            isVisible: isChildVisible
          },
          childBlock.uuid || `${block.uuid}-child-${index}`
        );
      }) })
    ] })
  ] });
};

// src/components/renderers/ConditionalBlockRenderer.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var ConditionalBlockRenderer = ({
  block,
  condition,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme,
  contextData,
  customComponents
}) => {
  const { evaluateCondition: evaluateCondition2 } = useSurveyForm();
  const conditionMet = evaluateCondition2(condition, contextData);
  if (!conditionMet) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    BlockRenderer,
    {
      block,
      value,
      onChange,
      onBlur,
      error,
      disabled,
      customComponents,
      theme
    }
  );
};

// src/components/renderers/CalculatedFieldRenderer.tsx
var import_react15 = require("react");
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime32 = require("react/jsx-runtime");
var CalculatedFieldRenderer = ({
  block,
  formula,
  dependencies,
  format: format2,
  theme = null
}) => {
  const { values, computedValues, updateComputedValues } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const [error, setError] = (0, import_react15.useState)(null);
  const [displayValue, setDisplayValue] = (0, import_react15.useState)("Waiting for inputs...");
  const prevDependencyValues = (0, import_react15.useRef)([]);
  (0, import_react15.useEffect)(() => {
    const currentDependencyValues = dependencies.map((dep) => values[dep]);
    const dependenciesChanged = dependencies.some((dep, index) => {
      return prevDependencyValues.current[index] !== currentDependencyValues[index];
    });
    prevDependencyValues.current = currentDependencyValues;
    if (dependenciesChanged) {
      const dependenciesReady = dependencies.every((dep) => {
        const value = values[dep] !== void 0 ? values[dep] : computedValues[dep];
        return value !== void 0;
      });
      if (dependenciesReady) {
        try {
          const safeValues = { ...values };
          dependencies.forEach((dep) => {
            if (typeof safeValues[dep] === "object" && safeValues[dep] !== null) {
              try {
                safeValues[dep] = { ...safeValues[dep] };
              } catch (e) {
                console.warn(`Couldn't safely copy dependency ${dep}:`, e);
              }
            }
          });
          const calculatedValue = executeCalculation(
            {
              formula,
              targetField: block.fieldName || "calculated",
              dependencies
            },
            { ...safeValues, ...computedValues }
          );
          if (calculatedValue !== null && calculatedValue !== void 0) {
            setDisplayValue(format2 ? format2(calculatedValue) : String(calculatedValue));
            setError(null);
          } else {
            setDisplayValue("N/A");
            setError("Could not calculate value");
          }
          try {
            updateComputedValues();
          } catch (e) {
            console.error("Error updating computed values:", e);
            setError(`Error updating values: ${e.message}`);
          }
        } catch (error2) {
          console.error("Error calculating value:", error2);
          setDisplayValue("Error");
          setError(`Error calculating: ${error2.message}`);
        }
      } else {
        setDisplayValue("Waiting for inputs...");
        setError(null);
      }
    }
  }, [values, computedValues, dependencies, formula, format2, block.fieldName, updateComputedValues]);
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Card, { className: cn("w-full border bg-card", block.className), children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(CardContent, { className: "p-4", children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Label, { className: cn("text-base block font-medium mb-2", themeConfig.field.label), children: block.label }),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: cn("text-sm text-muted-foreground mb-3", themeConfig.field.description), children: block.description }),
    /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: cn(
      "p-3 rounded-md",
      error ? "bg-destructive/10" : "bg-accent/50"
    ), children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex items-center gap-2", children: [
        error && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_lucide_react9.AlertCircle, { className: "h-4 w-4 text-destructive" }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { className: cn(
          "text-lg font-semibold",
          error ? "text-destructive" : ""
        ), children: displayValue })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { className: "text-sm text-destructive mt-1", children: error })
    ] }),
    block.note && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: block.note })
  ] }) });
};

// src/components/renderers/BMICalculatorRenderer.tsx
var import_react16 = require("react");

// src/components/ui/badge.tsx
var import_class_variance_authority4 = require("class-variance-authority");
var import_jsx_runtime33 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority4.cva)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/progress.tsx
var React25 = __toESM(require("react"));
var ProgressPrimitive = __toESM(require("@radix-ui/react-progress"));
var import_jsx_runtime34 = require("react/jsx-runtime");
var Progress = React25.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// src/components/ui/tabs.tsx
var React26 = __toESM(require("react"));
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"));
var import_jsx_runtime35 = require("react/jsx-runtime");
var Tabs = TabsPrimitive.Root;
var TabsList = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
var TabsTrigger = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
var TabsContent = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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

// src/components/ui/separator.tsx
var React27 = __toESM(require("react"));
var SeparatorPrimitive = __toESM(require("@radix-ui/react-separator"));
var import_jsx_runtime36 = require("react/jsx-runtime");
var Separator2 = React27.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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

// src/components/renderers/BMICalculatorRenderer.tsx
var import_lucide_react10 = require("lucide-react");
var import_jsx_runtime37 = require("react/jsx-runtime");
var BMICalculatorRenderer = ({
  block,
  value = {},
  onChange,
  onBlur,
  error,
  disabled = false,
  theme = null
}) => {
  const { setValue } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const initialRenderRef = (0, import_react16.useRef)(true);
  const fieldName = block.fieldName || "bmiCalculator";
  const [unitSystem, setUnitSystem] = (0, import_react16.useState)(
    value.unitSystem || block.defaultUnit || "metric"
  );
  const [height, setHeight] = (0, import_react16.useState)(
    value.height || (unitSystem === "metric" ? 170 : 70)
  );
  const [weight, setWeight] = (0, import_react16.useState)(
    value.weight || (unitSystem === "metric" ? 70 : 150)
  );
  const prevValuesRef = (0, import_react16.useRef)({
    height: value.height || (unitSystem === "metric" ? 170 : 70),
    weight: value.weight || (unitSystem === "metric" ? 70 : 150),
    unitSystem: value.unitSystem || block.defaultUnit || "metric"
  });
  const getImperialHeight = () => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return { feet, inches };
  };
  const setImperialHeight = (feet, inches) => {
    setHeight(feet * 12 + inches);
  };
  const calculateBMIEnhanced = () => {
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
  const bmi = calculateBMIEnhanced();
  const bmiData = getBMIData(bmi);
  const imperialHeight = getImperialHeight();
  (0, import_react16.useEffect)(() => {
    const prevValues = prevValuesRef.current;
    const hasChanged = prevValues.height !== height || prevValues.weight !== weight || prevValues.unitSystem !== unitSystem;
    if (onChange && height > 0 && weight > 0 && hasChanged) {
      const calculatedBmi = calculateBMIEnhanced();
      const calculatedBmiData = getBMIData(calculatedBmi);
      const newValue = {
        height,
        weight,
        bmi: parseFloat(calculatedBmi.toFixed(1)),
        category: calculatedBmiData.category,
        unitSystem
      };
      onChange(newValue);
      prevValuesRef.current = {
        height,
        weight,
        unitSystem
      };
    }
  }, [height, weight, unitSystem, onChange]);
  const getCardClassName = () => {
    const base = `w-full max-w-2xl border-0 shadow-none ${block.className || ""}`;
    const blockTheme = block.theme;
    switch (blockTheme.name) {
      case "minimal":
        return `${base} shadow-none bg-transparent`;
      case "colorful":
        return `${base} bg-gradient-to-br from-background via-background to-accent/10 shadow-lg`;
      default:
        return `${base}`;
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Card, { className: getCardClassName(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(CardHeader, { className: "text-center pb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(CardTitle, { className: "flex items-center justify-center gap-3 text-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: `p-2 rounded-full bg-gradient-to-r ${bmiData.color}`, children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Activity, { className: "w-6 h-6 text-white" }) }),
        block.label || "BMI Calculator"
      ] }),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("p", { className: "text-muted-foreground max-w-md mx-auto", children: block.description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(CardContent, { className: "space-y-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
        Tabs,
        {
          value: unitSystem,
          onValueChange: (value2) => {
            setUnitSystem(value2);
            if (value2 === "metric") {
              setHeight(170);
              setWeight(70);
            } else {
              setHeight(70);
              setWeight(150);
            }
          },
          className: "w-full",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(TabsList, { className: "grid w-full grid-cols-2 mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(TabsTrigger, { value: "metric", className: "flex items-center gap-2", disabled, children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Ruler, { className: "w-4 h-4" }),
                "Metric"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(TabsTrigger, { value: "imperial", className: "flex items-center gap-2", disabled, children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Weight, { className: "w-4 h-4" }),
                "Imperial"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(TabsContent, { value: "metric", className: "space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "grid grid-cols-2 gap-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Ruler, { className: "w-4 h-4 text-muted-foreground" }),
                  "Height (cm)"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "relative", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                    Input,
                    {
                      type: "number",
                      value: height,
                      onChange: (e) => setHeight(parseInt(e.target.value) || 170),
                      onBlur,
                      disabled,
                      min: 100,
                      max: 250,
                      className: "text-center text-xl font-semibold h-14",
                      placeholder: "170"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "cm" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Weight, { className: "w-4 h-4 text-muted-foreground" }),
                  "Weight (kg)"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "relative", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                    Input,
                    {
                      type: "number",
                      value: weight,
                      onChange: (e) => setWeight(parseInt(e.target.value) || 70),
                      onBlur,
                      disabled,
                      min: 30,
                      max: 300,
                      className: "text-center text-xl font-semibold h-14",
                      placeholder: "70"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "kg" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(TabsContent, { value: "imperial", className: "space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "grid grid-cols-2 gap-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Ruler, { className: "w-4 h-4 text-muted-foreground" }),
                  "Height"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
                    Select,
                    {
                      value: imperialHeight.feet.toString(),
                      onValueChange: (value2) => setImperialHeight(parseInt(value2), imperialHeight.inches),
                      disabled,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SelectTrigger, { className: "h-14", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SelectValue, {}) }),
                        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SelectContent, { children: [3, 4, 5, 6, 7, 8].map((ft) => /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(SelectItem, { value: ft.toString(), children: [
                          ft,
                          "'"
                        ] }, ft)) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
                    Select,
                    {
                      value: imperialHeight.inches.toString(),
                      onValueChange: (value2) => setImperialHeight(imperialHeight.feet, parseInt(value2)),
                      disabled,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SelectTrigger, { className: "h-14", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SelectValue, {}) }),
                        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(SelectContent, { children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(SelectItem, { value: i.toString(), children: [
                          i,
                          '"'
                        ] }, i)) })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.Weight, { className: "w-4 h-4 text-muted-foreground" }),
                  "Weight (lbs)"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "relative", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
                    Input,
                    {
                      type: "number",
                      value: weight,
                      onChange: (e) => setWeight(parseInt(e.target.value) || 150),
                      onBlur,
                      disabled,
                      min: 70,
                      max: 660,
                      className: "text-center text-xl font-semibold h-14",
                      placeholder: "150"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "lbs" })
                ] })
              ] })
            ] }) })
          ]
        }
      ),
      block.showResults ? /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Separator2, {}) : null,
      block.showResults ? /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: `space-y-6 p-6 rounded-xl border-2 ${bmiData.bgColor}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(import_lucide_react10.TrendingUp, { className: "w-5 h-5 text-muted-foreground" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide", children: "Your BMI Score" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: `text-5xl font-bold bg-gradient-to-r ${bmiData.color} bg-clip-text text-transparent`, children: bmi.toFixed(1) }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Badge, { variant: "secondary", className: `px-4 py-1 text-sm font-medium ${bmiData.textColor} bg-white/80`, children: bmiData.category })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex justify-between text-xs font-medium text-muted-foreground px-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "Underweight" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "Normal" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "Overweight" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "Obese" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(Progress, { value: bmiData.progress, className: "h-3 bg-white/50" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "absolute top-0 left-0 h-3 w-full bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-400 rounded-full opacity-20" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex justify-between text-xs text-muted-foreground px-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "<18.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "18.5-24.9" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "25-29.9" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "\u226530" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("p", { className: `text-sm font-medium ${bmiData.textColor}`, children: bmiData.advice }) })
      ] }) : null,
      error && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: cn("text-sm text-destructive mt-2 p-3 bg-destructive/10 rounded-md", themeConfig.field.error), children: error })
    ] })
  ] });
};

// src/components/renderers/CheckoutRenderer.tsx
var import_react17 = require("react");
var import_jsx_runtime38 = require("react/jsx-runtime");
var countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "MX", name: "Mexico" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" }
];
var usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" }
];
var emptyAddress = () => ({
  firstName: "",
  lastName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "US"
});
var CheckoutRenderer = ({
  block,
  value = {},
  onChange,
  onBlur,
  error,
  disabled = false,
  theme = null
}) => {
  var _a, _b;
  const { setValue } = useSurveyForm();
  const fieldName = block.fieldName || "checkout";
  const [formState, setFormState] = (0, import_react17.useState)({
    email: value.email || "",
    phone: value.phone || "",
    shippingAddress: value.shippingAddress || emptyAddress(),
    billingAddress: value.billingAddress || emptyAddress(),
    billingIsSame: (_b = value.billingIsSame) != null ? _b : (_a = block.sameAsBilling) != null ? _a : true
  });
  (0, import_react17.useEffect)(() => {
    const updatedState = {
      ...formState,
      billingAddress: formState.billingIsSame ? formState.shippingAddress : formState.billingAddress
    };
    onChange == null ? void 0 : onChange(updatedState);
    setValue(fieldName, updatedState);
  }, [formState]);
  const handleContactChange = (field, val) => {
    setFormState((prev) => ({ ...prev, [field]: val }));
  };
  const handleAddressChange = (addressType, field, val) => {
    setFormState((prev) => ({
      ...prev,
      [addressType]: { ...prev[addressType], [field]: val }
    }));
  };
  const handleBillingToggle = (checked) => {
    setFormState((prev) => ({ ...prev, billingIsSame: checked }));
  };
  const inputClassName = "h-12 px-4 border border-gray-300 rounded-lg text-base placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white";
  const labelClassName = "text-sm font-medium text-gray-700 mb-1 block";
  const sectionClassName = "bg-white border border-gray-200 rounded-xl p-6 shadow-sm";
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: cn("survey-checkout space-y-6 max-w-2xl mx-auto", block.className), children: [
    block.label && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "text-center space-y-2 pb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("h2", { className: "text-2xl font-semibold text-gray-900", children: block.label }),
      block.description && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("p", { className: "text-gray-600 text-base", children: block.description })
    ] }),
    block.showContactInfo && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: sectionClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3", children: "*" }),
        "Contact Information"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "space-y-4", children: [
        block.requireEmail && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { htmlFor: `${fieldName}-email`, className: labelClassName, children: [
            "Email address ",
            block.requireEmail && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Input,
            {
              id: `${fieldName}-email`,
              type: "email",
              value: formState.email,
              onChange: (e) => handleContactChange("email", e.target.value),
              onBlur,
              disabled,
              placeholder: "john@example.com",
              className: cn(inputClassName, error && "border-red-500 focus:ring-red-500 focus:border-red-500")
            }
          )
        ] }),
        block.requirePhone && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { htmlFor: `${fieldName}-phone`, className: labelClassName, children: [
            "Phone number ",
            block.requirePhone && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Input,
            {
              id: `${fieldName}-phone`,
              type: "tel",
              value: formState.phone,
              onChange: (e) => handleContactChange("phone", e.target.value),
              onBlur,
              disabled,
              placeholder: "+1 (555) 123-4567",
              className: cn(inputClassName, error && "border-red-500 focus:ring-red-500 focus:border-red-500")
            }
          )
        ] })
      ] })
    ] }),
    block.showShippingAddress && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: sectionClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3", children: "*" }),
        "Shipping Address"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "space-y-4", children: [
        block.collectFullName && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "First name ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.shippingAddress.firstName,
                onChange: (e) => handleAddressChange("shippingAddress", "firstName", e.target.value),
                placeholder: "John",
                className: inputClassName,
                disabled
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "Last name ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.shippingAddress.lastName,
                onChange: (e) => handleAddressChange("shippingAddress", "lastName", e.target.value),
                placeholder: "Doe",
                className: inputClassName,
                disabled
              }
            )
          ] })
        ] }),
        block.allowCompany && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Label, { className: labelClassName, children: "Company (optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Input,
            {
              value: formState.shippingAddress.company,
              onChange: (e) => handleAddressChange("shippingAddress", "company", e.target.value),
              placeholder: "Acme Inc.",
              className: inputClassName,
              disabled
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
            "Address ",
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Input,
            {
              value: formState.shippingAddress.address1,
              onChange: (e) => handleAddressChange("shippingAddress", "address1", e.target.value),
              placeholder: "123 Main Street",
              className: inputClassName,
              disabled
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          Input,
          {
            value: formState.shippingAddress.address2,
            onChange: (e) => handleAddressChange("shippingAddress", "address2", e.target.value),
            placeholder: "Apartment, suite, etc. (optional)",
            className: inputClassName,
            disabled
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "City ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.shippingAddress.city,
                onChange: (e) => handleAddressChange("shippingAddress", "city", e.target.value),
                placeholder: "New York",
                className: inputClassName,
                disabled
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "State ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
              Select,
              {
                value: formState.shippingAddress.state,
                onValueChange: (value2) => handleAddressChange("shippingAddress", "state", value2),
                disabled,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectTrigger, { className: cn(inputClassName, "h-12"), children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectValue, { placeholder: "State" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectContent, { className: "max-h-60", children: usStates.map((state) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectItem, { value: state.code, children: state.name }, state.code)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "ZIP code ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.shippingAddress.zip,
                onChange: (e) => handleAddressChange("shippingAddress", "zip", e.target.value),
                placeholder: "10001",
                className: inputClassName,
                disabled
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
            "Country ",
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
            Select,
            {
              value: formState.shippingAddress.country,
              onValueChange: (value2) => handleAddressChange("shippingAddress", "country", value2),
              disabled,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectTrigger, { className: cn(inputClassName, "h-12"), children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectValue, { placeholder: "Country" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectContent, { children: countries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectItem, { value: country.code, children: country.name }, country.code)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    block.showBillingAddress && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: sectionClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("h3", { className: "text-lg font-semibold text-gray-900 flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3", children: "*" }),
          "Billing Address"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Checkbox,
            {
              id: "billingIsSame",
              checked: formState.billingIsSame,
              onCheckedChange: handleBillingToggle,
              disabled,
              className: "w-5 h-5"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Label, { htmlFor: "billingIsSame", className: "text-sm text-gray-700 font-medium cursor-pointer", children: "Same as shipping address" })
        ] })
      ] }),
      !formState.billingIsSame && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "space-y-4", children: [
        block.collectFullName && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "First name ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.billingAddress.firstName,
                onChange: (e) => handleAddressChange("billingAddress", "firstName", e.target.value),
                placeholder: "John",
                className: inputClassName,
                disabled
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "Last name ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.billingAddress.lastName,
                onChange: (e) => handleAddressChange("billingAddress", "lastName", e.target.value),
                placeholder: "Doe",
                className: inputClassName,
                disabled
              }
            )
          ] })
        ] }),
        block.allowCompany && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Label, { className: labelClassName, children: "Company (optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Input,
            {
              value: formState.billingAddress.company,
              onChange: (e) => handleAddressChange("billingAddress", "company", e.target.value),
              placeholder: "Acme Inc.",
              className: inputClassName,
              disabled
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
            "Address ",
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            Input,
            {
              value: formState.billingAddress.address1,
              onChange: (e) => handleAddressChange("billingAddress", "address1", e.target.value),
              placeholder: "123 Main Street",
              className: inputClassName,
              disabled
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
          Input,
          {
            value: formState.billingAddress.address2,
            onChange: (e) => handleAddressChange("billingAddress", "address2", e.target.value),
            placeholder: "Apartment, suite, etc. (optional)",
            className: inputClassName,
            disabled
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "City ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.billingAddress.city,
                onChange: (e) => handleAddressChange("billingAddress", "city", e.target.value),
                placeholder: "New York",
                className: inputClassName,
                disabled
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "State ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
              Select,
              {
                value: formState.billingAddress.state,
                onValueChange: (value2) => handleAddressChange("billingAddress", "state", value2),
                disabled,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectTrigger, { className: cn(inputClassName, "h-12"), children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectValue, { placeholder: "State" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectContent, { className: "max-h-60", children: usStates.map((state) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectItem, { value: state.code, children: state.name }, state.code)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
              "ZIP code ",
              /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
              Input,
              {
                value: formState.billingAddress.zip,
                onChange: (e) => handleAddressChange("billingAddress", "zip", e.target.value),
                placeholder: "10001",
                className: inputClassName,
                disabled
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(Label, { className: labelClassName, children: [
            "Country ",
            /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
            Select,
            {
              value: formState.billingAddress.country,
              onValueChange: (value2) => handleAddressChange("billingAddress", "country", value2),
              disabled,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectTrigger, { className: cn(inputClassName, "h-12"), children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectValue, { placeholder: "Country" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectContent, { children: countries.map((country) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(SelectItem, { value: country.code, children: country.name }, country.code)) })
              ]
            }
          )
        ] })
      ] }),
      formState.billingIsSame && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("p", { className: "text-sm text-gray-600 flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { className: "w-4 h-4 text-green-500 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
        "Your billing address is the same as your shipping address."
      ] }) })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { className: "w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("h3", { className: "text-sm font-medium text-red-800", children: "Please fix the following errors:" }),
        /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("p", { className: "text-sm text-red-700 mt-1", children: error })
      ] })
    ] }) })
  ] });
};

// src/components/renderers/AuthRenderer.tsx
var import_react18 = require("react");
var import_lucide_react11 = require("lucide-react");
var import_framer_motion = require("framer-motion");
var import_jsx_runtime39 = require("react/jsx-runtime");
var AuthRenderer = ({ block }) => {
  const { goToNextBlock, setValue, navigationHistory } = useSurveyForm();
  const fieldName = block.fieldName || "authResults";
  const tokenField = block.tokenField || "token";
  const storageKey = block.tokenStorageKey || "authToken";
  const nameLabel = block.nameLabel || "Name";
  const emailLabel = block.emailLabel || "Email";
  const mobileLabel = block.mobileLabel || "Mobile Number";
  const useOtp = block.useOtp || false;
  const requireName = block.requireName || false;
  const requireEmail = block.requireEmail || true;
  const requireMobile = block.requireMobile || false;
  const skipIfLoggedIn = block.skipIfLoggedIn || false;
  const [currentStep, setCurrentStep] = (0, import_react18.useState)("name");
  const [name, setName] = (0, import_react18.useState)("");
  const [email, setEmail] = (0, import_react18.useState)("");
  const [mobile, setMobile] = (0, import_react18.useState)("");
  const [emailOtp, setEmailOtp] = (0, import_react18.useState)("");
  const [mobileOtp, setMobileOtp] = (0, import_react18.useState)("");
  const [loading, setLoading] = (0, import_react18.useState)(false);
  const [error, setError] = (0, import_react18.useState)(null);
  const [success, setSuccess] = (0, import_react18.useState)(null);
  const [otpSent, setOtpSent] = (0, import_react18.useState)({});
  const [isManualNavigation, setIsManualNavigation] = (0, import_react18.useState)(false);
  const hasInitialized = (0, import_react18.useRef)(false);
  const checkIfBackNavigation = () => {
    if (navigationHistory.length < 2) return false;
    const currentEntry = navigationHistory[navigationHistory.length - 1];
    const previousEntry = navigationHistory[navigationHistory.length - 2];
    return currentEntry && previousEntry && (previousEntry.pageIndex > currentEntry.pageIndex || previousEntry.pageIndex === currentEntry.pageIndex && previousEntry.blockIndex > currentEntry.blockIndex) && previousEntry.trigger === "back";
  };
  (0, import_react18.useEffect)(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    const isBackNav = checkIfBackNavigation();
    setIsManualNavigation(isBackNav);
    try {
      const user = JSON.parse(localStorage.getItem(storageKey));
      if (user) {
        const existing = user[tokenField];
        if (existing) {
          setLoading(true);
          if (skipIfLoggedIn && !isBackNav && !block.validateTokenUrl) {
            setTimeout(() => {
              const authResults = {
                token: existing,
                isAuthenticated: true,
                timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                skipped: true,
                skipReason: "Already logged in (no validation required)"
              };
              setValue(fieldName, user);
              setLoading(false);
              goToNextBlock();
            }, 100);
            return;
          }
          if (block.validateTokenUrl) {
            const headers = buildRequestHeaders();
            const baseBody = { [tokenField]: existing };
            const requestBody = buildRequestBody(baseBody);
            fetch(block.validateTokenUrl, {
              method: "POST",
              headers,
              body: JSON.stringify(requestBody)
            }).then((res) => res.ok ? res.json() : Promise.reject()).then((data) => {
              const processedData = applyFieldMappings(data);
              if (!isBackNav) {
                const authResults = {
                  ...processedData,
                  name: (data == null ? void 0 : data.name) || "",
                  email: (data == null ? void 0 : data.email) || "",
                  mobile: (data == null ? void 0 : data.mobile) || "",
                  token: existing,
                  isAuthenticated: true,
                  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
                  skipped: true,
                  skipReason: "Already logged in (validation passed)"
                };
                setValue(fieldName, data);
                setLoading(false);
                goToNextBlock();
                return;
              }
              saveToFieldName(processedData, existing);
              setCurrentStep("welcome");
              if (data == null ? void 0 : data.name) setName(data.name);
              if (data == null ? void 0 : data.email) setEmail(data.email);
              if (data == null ? void 0 : data.mobile) setMobile(data.mobile);
              setLoading(false);
            }).catch(() => {
              localStorage.removeItem(storageKey);
              determineFirstStep();
              setLoading(false);
            });
          } else {
            if (isBackNav || !skipIfLoggedIn) {
              setCurrentStep("welcome");
              setValue(fieldName, user);
              setLoading(false);
            }
          }
        } else {
          determineFirstStep();
        }
      }
    } catch (e) {
      determineFirstStep();
    }
  }, []);
  (0, import_react18.useEffect)(() => {
    if (!hasInitialized.current) return;
    const isBackNav = checkIfBackNavigation();
    if (isBackNav) {
      setIsManualNavigation(true);
      const existing = localStorage.getItem(storageKey);
      if (existing && currentStep !== "welcome") {
        setCurrentStep("welcome");
      }
    }
  }, [navigationHistory]);
  const determineFirstStep = () => {
    if (requireName) {
      setCurrentStep("name");
    } else if (requireEmail) {
      setCurrentStep("email");
    } else if (requireMobile) {
      setCurrentStep("phone");
    } else {
      setCurrentStep("email");
    }
  };
  const getNestedValue = (obj, path) => {
    if (!path || !obj) return void 0;
    return path.split(".").reduce((current, key) => current == null ? void 0 : current[key], obj);
  };
  const applyFieldMappings = (responseData) => {
    const fieldMappings = block.fieldMappings || {};
    const mappedData = { ...responseData };
    Object.entries(fieldMappings).forEach(([apiPath, formField]) => {
      const value = getNestedValue(responseData, apiPath);
      if (value !== void 0) {
        mappedData[formField] = value;
      }
    });
    return mappedData;
  };
  const saveToFieldName = (data, token) => {
    const authResults = {
      ...data,
      name,
      email,
      mobile,
      token: token || data[tokenField],
      isAuthenticated: true,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      skipped: false
    };
    setValue(fieldName, data);
  };
  const handleStepSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (currentStep === "name") {
      if (!name.trim()) {
        setError("Name is required");
        return;
      }
      setCurrentStep(requireEmail ? "email" : "phone");
      return;
    }
    if (currentStep === "email") {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }
      if (requireMobile) {
        setCurrentStep("phone");
        return;
      }
      await handleAuthentication();
      return;
    }
    if (currentStep === "phone") {
      if (!mobile.trim()) {
        setError("Mobile number is required");
        return;
      }
      await handleAuthentication();
      return;
    }
    if (currentStep === "email-otp") {
      await handleOtpVerification("email");
      return;
    }
    if (currentStep === "phone-otp") {
      await handleOtpVerification("mobile");
      return;
    }
  };
  const buildRequestHeaders = () => {
    const headers = {
      "Content-Type": "application/json"
    };
    const customHeaders = block.customHeaders || {};
    Object.entries(customHeaders).forEach(([key, value]) => {
      if (key && value) {
        headers[key] = value;
      }
    });
    return headers;
  };
  const buildRequestBody = (baseBody) => {
    const requestBody = { ...baseBody };
    const additionalParams = block.additionalBodyParams || {};
    Object.entries(additionalParams).forEach(([key, value]) => {
      if (key && value) {
        requestBody[key] = value;
      }
    });
    return requestBody;
  };
  const handleAuthentication = async () => {
    setLoading(true);
    try {
      const baseBody = {};
      if (requireName && name) baseBody.name = name;
      if (requireEmail && email) baseBody.email = email;
      if (requireMobile && mobile) baseBody.mobile = mobile;
      const headers = buildRequestHeaders();
      if (useOtp) {
        if (requireEmail && block.sendEmailOtpUrl) {
          const requestBody = buildRequestBody(baseBody);
          const otpRes = await fetch(block.sendEmailOtpUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody)
          });
          if (otpRes.ok) {
            setOtpSent((prev) => ({ ...prev, email: true }));
            setSuccess("OTP sent to your email");
            setCurrentStep("email-otp");
          } else {
            const errorData = await otpRes.json();
            throw new Error(errorData.error || "Failed to send email OTP");
          }
        } else if (requireMobile && block.sendMobileOtpUrl) {
          const requestBody = buildRequestBody(baseBody);
          const otpRes = await fetch(block.sendMobileOtpUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody)
          });
          if (otpRes.ok) {
            setOtpSent((prev) => ({ ...prev, mobile: true }));
            setSuccess("OTP sent to your mobile");
            setCurrentStep("phone-otp");
          } else {
            const errorData = await otpRes.json();
            throw new Error(errorData.error || "Failed to send mobile OTP");
          }
        }
      } else {
        const url = block.loginUrl || block.signupUrl;
        const requestBody = buildRequestBody(baseBody);
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody)
        });
        const data = await res.json();
        if (res.ok) {
          const processedData = applyFieldMappings(data);
          if (data[tokenField]) {
            localStorage.setItem(storageKey, JSON.stringify(data));
          }
          saveToFieldName(processedData, data[tokenField]);
          goToNextBlock();
        } else {
          throw new Error(data.error || "Authentication failed");
        }
      }
    } catch (e) {
      setError(e.message || "Authentication failed");
    }
    setLoading(false);
  };
  const handleOtpVerification = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const otp = type === "email" ? emailOtp : mobileOtp;
      const verifyUrl = type === "email" ? block.verifyEmailOtpUrl : block.verifyMobileOtpUrl;
      const baseBody = type === "email" ? { name, email, otp } : { name, mobile, otp };
      const headers = buildRequestHeaders();
      const requestBody = buildRequestBody(baseBody);
      const res = await fetch(verifyUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      });
      const data = await res.json();
      if (res.ok) {
        const processedData = applyFieldMappings(data);
        if (data[tokenField]) {
          localStorage.setItem(storageKey, JSON.stringify(data));
        }
        saveToFieldName(processedData, data[tokenField]);
        goToNextBlock();
      } else {
        throw new Error(data.error || "OTP verification failed");
      }
    } catch (e) {
      setError(e.message || "OTP verification failed");
    }
    setLoading(false);
  };
  const handleWelcomeContinue = () => {
    if (skipIfLoggedIn) {
      goToNextBlock();
    } else {
      goToNextBlock();
    }
  };
  const handleSignInAsDifferent = () => {
    localStorage.removeItem(storageKey);
    setCurrentStep("name");
    setName("");
    setEmail("");
    setMobile("");
    setError(null);
    setSuccess(null);
    setIsManualNavigation(false);
  };
  const getStepIcon = () => {
    switch (currentStep) {
      case "name":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.User, { className: "w-6 h-6" });
      case "email":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.Mail, { className: "w-6 h-6" });
      case "phone":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.Phone, { className: "w-6 h-6" });
      case "email-otp":
      case "phone-otp":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.KeyRound, { className: "w-6 h-6" });
      case "welcome":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.CheckCircle2, { className: "w-6 h-6" });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.User, { className: "w-6 h-6" });
    }
  };
  const getStepTitle = () => {
    switch (currentStep) {
      case "name":
        return `What's your ${nameLabel.toLowerCase()}?`;
      case "email":
        return `What's your ${emailLabel.toLowerCase()}?`;
      case "phone":
        return `What's your ${mobileLabel.toLowerCase()}?`;
      case "email-otp":
        return "Enter email verification code";
      case "phone-otp":
        return "Enter mobile verification code";
      case "welcome":
        return "Welcome back!";
      default:
        return "Authentication";
    }
  };
  const getStepDescription = () => {
    switch (currentStep) {
      case "name":
        return `Please enter your ${nameLabel.toLowerCase()}`;
      case "email":
        return useOtp ? "We'll send a verification code to this email" : "We'll use this to authenticate you";
      case "phone":
        return useOtp ? "We'll send a verification code to this number" : "We'll use this to authenticate you";
      case "email-otp":
        return `Enter the verification code sent to ${email}`;
      case "phone-otp":
        return `Enter the verification code sent to ${mobile}`;
      case "welcome":
        return name ? `Hello ${name}, you're already authenticated.` : "You're already authenticated.";
      default:
        return "";
    }
  };
  const canSubmit = () => {
    switch (currentStep) {
      case "name":
        return name.trim().length > 0;
      case "email":
        return email.trim().length > 0 && email.includes("@");
      case "phone":
        return mobile.trim().length > 0;
      case "email-otp":
        return emailOtp.length >= 4;
      case "phone-otp":
        return mobileOtp.length >= 4;
      default:
        return false;
    }
  };
  const renderInput = () => {
    switch (currentStep) {
      case "name":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          Input,
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: `Enter your ${nameLabel.toLowerCase()}`,
            className: "text-lg h-14 text-center",
            autoFocus: true,
            onKeyPress: (e) => e.key === "Enter" && canSubmit() && handleStepSubmit()
          }
        );
      case "email":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          Input,
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: `Enter your ${emailLabel.toLowerCase()}`,
            className: "text-lg h-14 text-center",
            autoFocus: true,
            onKeyPress: (e) => e.key === "Enter" && canSubmit() && handleStepSubmit()
          }
        );
      case "phone":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          Input,
          {
            type: "tel",
            value: mobile,
            onChange: (e) => setMobile(e.target.value),
            placeholder: `Enter your ${mobileLabel.toLowerCase()}`,
            className: "text-lg h-14 text-center",
            autoFocus: true,
            onKeyPress: (e) => e.key === "Enter" && canSubmit() && handleStepSubmit()
          }
        );
      case "email-otp":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          Input,
          {
            type: "text",
            value: emailOtp,
            onChange: (e) => setEmailOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
            placeholder: "Enter verification code",
            className: "text-lg h-14 text-center tracking-widest font-mono",
            maxLength: 6,
            autoFocus: true,
            onKeyPress: (e) => e.key === "Enter" && canSubmit() && handleStepSubmit()
          }
        );
      case "phone-otp":
        return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
          Input,
          {
            type: "text",
            value: mobileOtp,
            onChange: (e) => setMobileOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
            placeholder: "Enter verification code",
            className: "text-lg h-14 text-center tracking-widest font-mono",
            maxLength: 6,
            autoFocus: true,
            onKeyPress: (e) => e.key === "Enter" && canSubmit() && handleStepSubmit()
          }
        );
      default:
        return null;
    }
  };
  if (loading && currentStep !== "email-otp" && currentStep !== "phone-otp" && currentStep !== "welcome") {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Card, { className: "w-full max-w-md mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center justify-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.Loader2, { className: "w-4 h-4 animate-spin" }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "text-sm text-muted-foreground", children: skipIfLoggedIn ? "Checking authentication..." : "Checking authentication..." })
      ] }),
      skipIfLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center justify-center space-x-2 mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.SkipForward, { className: "w-3 h-3 text-blue-500" }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "text-xs text-blue-600", children: "Skip if logged in enabled" })
      ] })
    ] }) });
  }
  if (currentStep === "welcome") {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      import_framer_motion.motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(Card, { className: "w-full max-w-md mx-auto", children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(CardHeader, { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              import_framer_motion.motion.div,
              {
                className: "w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center",
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { delay: 0.2, type: "spring", stiffness: 200 },
                children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.CheckCircle2, { className: "w-6 h-6 text-green-600" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(CardTitle, { className: "text-xl", children: getStepTitle() }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(CardDescription, { children: getStepDescription() }),
            skipIfLoggedIn && isManualNavigation && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { className: "mt-2 p-2 bg-blue-50 rounded-md", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center justify-center space-x-2 text-sm text-blue-700", children: [
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.SkipForward, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { children: "Auto-skip is enabled, but you manually navigated here" })
            ] }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
              Button,
              {
                onClick: handleWelcomeContinue,
                className: "w-full",
                size: "lg",
                children: [
                  "Continue",
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.ArrowRight, { className: "ml-2 w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              Button,
              {
                variant: "outline",
                onClick: handleSignInAsDifferent,
                className: "w-full",
                children: "Sign in as different user"
              }
            )
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
    import_framer_motion.motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(Card, { className: "w-full max-w-md mx-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            import_framer_motion.motion.div,
            {
              className: "w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center",
              initial: { scale: 0, rotate: -180 },
              animate: { scale: 1, rotate: 0 },
              transition: { type: "spring", stiffness: 200, damping: 15 },
              children: getStepIcon()
            },
            currentStep
          ),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(CardTitle, { className: "text-xl", children: getStepTitle() }),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(CardDescription, { children: getStepDescription() }),
          skipIfLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { className: "mt-2 p-2 bg-blue-50 rounded-md", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center justify-center space-x-2 text-xs text-blue-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.SkipForward, { className: "w-3 h-3" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { children: "Will skip if already logged in" })
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_framer_motion.AnimatePresence, { mode: "wait", children: [
            error && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              import_framer_motion.motion.div,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
                children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(Alert, { variant: "destructive", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.AlertCircle, { className: "h-4 w-4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(AlertDescription, { children: error })
                ] })
              }
            ),
            success && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
              import_framer_motion.motion.div,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
                children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(Alert, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.CheckCircle2, { className: "h-4 w-4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(AlertDescription, { children: success })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            import_framer_motion.motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.1 },
              children: renderInput()
            },
            currentStep
          ),
          (currentStep === "email-otp" || currentStep === "phone-otp") && otpSent && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            import_framer_motion.motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "text-center",
              children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(Badge, { variant: "secondary", className: "text-xs", children: "Code sent successfully" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            Button,
            {
              onClick: handleStepSubmit,
              disabled: !canSubmit() || loading,
              className: "w-full",
              size: "lg",
              children: loading ? /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_jsx_runtime39.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.Loader2, { className: "w-4 h-4 animate-spin mr-2" }),
                currentStep.includes("otp") ? "Verifying..." : "Processing..."
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(import_jsx_runtime39.Fragment, { children: [
                currentStep.includes("otp") ? "Verify Code" : "Continue",
                /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(import_lucide_react11.ArrowRight, { className: "ml-2 w-4 h-4" })
              ] })
            }
          ),
          currentStep.includes("otp") && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setCurrentStep(requireEmail ? "email" : "phone");
                setError(null);
                setSuccess(null);
                setEmailOtp("");
                setMobileOtp("");
                setOtpSent({});
              },
              className: "w-full",
              children: "Back to previous step"
            }
          )
        ] })
      ] })
    }
  );
};

// src/utils/blockAdapter.tsx
var import_lucide_react13 = require("lucide-react");
var import_uuid2 = require("uuid");

// src/utils/blockdefinations.tsx
var import_lucide_react12 = require("lucide-react");
var import_uuid = require("uuid");
var import_jsx_runtime40 = require("react/jsx-runtime");
var CheckoutBlock = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.ShoppingCart, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkout",
    fieldName: `checkout${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Checkout",
    description: "",
    showShippingAddress: true,
    showBillingAddress: false,
    requireEmail: true,
    requirePhone: false,
    className: ""
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    return null;
  }
};
var CheckboxBlock = {
  type: "checkbox",
  name: "Checkbox",
  description: "Single checkbox for binary/boolean options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.CheckSquare, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkbox",
    fieldName: `checkbox${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Check this option",
    description: "",
    value: "true",
    defaultValue: false,
    showYesNo: false,
    trueLabel: "Yes",
    falseLabel: "No"
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};
var DatePickerBlock = {
  type: "datepicker",
  name: "Date Picker",
  description: "Calendar component for selecting a date",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.Calendar, { className: "w-4 h-4" }),
  defaultData: {
    type: "datepicker",
    fieldName: `date${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Select a date",
    description: "",
    placeholder: "Pick a date",
    dateFormat: "PPP",
    showCalendarOnFocus: true,
    minDate: "",
    maxDate: "",
    disabledDays: ""
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};
var FileUploadBlock = {
  type: "fileupload",
  name: "File Upload",
  description: "Component for uploading files",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.Upload, { className: "w-4 h-4" }),
  defaultData: {
    type: "fileupload",
    fieldName: `file${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Upload files",
    description: "",
    acceptedFileTypes: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: "5",
    maxFiles: "1",
    helpText: "Drag and drop files here or click to browse",
    showPreview: true,
    required: false
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};
var HtmlBlock = {
  type: "html",
  name: "HTML",
  description: "Custom HTML content",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.Code, { className: "w-4 h-4" }),
  defaultData: {
    type: "html",
    html: "<h2>HTML Content</h2>\n<p>This is a <strong>custom</strong> HTML block.</p>",
    variableName: "",
    className: ""
  },
  validate: (data) => {
    if (!data.html) return "HTML content is required";
    return null;
  }
};
var AuthBlock = {
  type: "auth",
  name: "Authentication",
  description: "Authenticate user before continuing",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.UserCheck, { className: "w-4 h-4" }),
  defaultData: {
    type: "auth",
    loginUrl: "",
    signupUrl: "",
    useOtp: false,
    sendOtpUrl: "",
    verifyOtpUrl: "",
    tokenField: "token",
    tokenStorageKey: "authToken",
    validateTokenUrl: "",
    requireName: false,
    requireEmail: true,
    nameLabel: "Name",
    emailLabel: "Email"
  },
  validate: () => null
};
var MarkdownBlock = {
  type: "markdown",
  name: "Markdown",
  description: "Formatted text content using Markdown syntax",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.FileText, { className: "w-4 h-4" }),
  defaultData: {
    type: "markdown",
    text: "## Markdown Heading\n\nThis is a paragraph with **bold** and *italic* text.\n\n* List item 1\n* List item 2",
    variableName: "",
    className: "",
    updateContent: false
  },
  validate: (data) => {
    if (!data.text) return "Content is required";
    return null;
  }
};
var MatrixBlock = {
  type: "matrix",
  name: "Matrix / Grid",
  description: "Grid of questions with the same response options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.Grid3X3, { className: "w-4 h-4" }),
  defaultData: {
    type: "matrix",
    fieldName: `matrix${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Please rate the following items",
    description: "Select one option for each row",
    columnHeader: "Rating",
    questions: [
      { id: (0, import_uuid.v4)(), text: "Item 1" },
      { id: (0, import_uuid.v4)(), text: "Item 2" },
      { id: (0, import_uuid.v4)(), text: "Item 3" }
    ],
    options: [
      { id: (0, import_uuid.v4)(), text: "Poor", value: "1" },
      { id: (0, import_uuid.v4)(), text: "Fair", value: "2" },
      { id: (0, import_uuid.v4)(), text: "Good", value: "3" },
      { id: (0, import_uuid.v4)(), text: "Excellent", value: "4" }
    ]
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Matrix title is required";
    if (!data.questions || data.questions.length === 0) return "At least one question is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  }
};
var RadioBlock = {
  type: "radio",
  name: "Radio Buttons",
  description: "Single selection from multiple options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.CircleCheck, { className: "w-4 h-4" }),
  defaultData: {
    type: "radio",
    fieldName: `radioOption${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: "1"
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  }
};
var RangeBlock = {
  type: "range",
  name: "Range Slider",
  description: "Slider for selecting numeric values within a range",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.ArrowRightToLine, { className: "w-4 h-4" }),
  defaultData: {
    type: "range",
    fieldName: `range${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Select a value",
    description: "",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: "Selected: {value}",
    markStep: 25
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    const min = parseInt(String(data.min || "0"), 10);
    const max = parseInt(String(data.max || "100"), 10);
    if (min >= max) return "Minimum value must be less than maximum value";
    return null;
  }
};
var ScriptBlock = {
  type: "script",
  name: "Script",
  description: "Custom JavaScript code for form logic",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.Terminal, { className: "w-4 h-4" }),
  defaultData: {
    type: "script",
    script: "// This script runs when the page loads\nconsole.log('Script block executed');\n\n// You can access and modify form data\n// formData.calculated = formData.input1 + formData.input2;"
  },
  validate: (data) => {
    if (!data.script) return "Script content is required";
    return null;
  }
};
var SelectableBoxQuestionBlock = {
  type: "selectablebox",
  name: "Selectable Box Question",
  description: "Question with selectable box options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.CheckSquare, { className: "w-4 h-4" }),
  defaultData: {
    type: "selectablebox",
    fieldName: `boxq${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "What's your goal?",
    description: "",
    boxSpacing: "4",
    defaultValue: "",
    showSelectionIndicator: true,
    options: [
      { id: (0, import_uuid.v4)(), label: "Lose 5 to 20 lbs", value: "5-20" },
      { id: (0, import_uuid.v4)(), label: "Lose 21 to 50 lbs", value: "21-50" },
      { id: (0, import_uuid.v4)(), label: "Lose 51+ lbs", value: "51+" },
      { id: (0, import_uuid.v4)(), label: "I'm not sure yet", value: "unsure" }
    ]
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  }
};
var SelectBlock = {
  type: "select",
  name: "Dropdown Select",
  description: "Single selection from a dropdown list",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.ListFilter, { className: "w-4 h-4" }),
  defaultData: {
    type: "select",
    fieldName: `select${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    placeholder: "Choose from the list...",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: ""
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  }
};
var TextareaBlock = {
  type: "textarea",
  name: "Text Area",
  description: "Multi-line text field for longer answers",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.AlignLeft, { className: "w-4 h-4" }),
  defaultData: {
    type: "textarea",
    fieldName: `textArea${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Text Area Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: "",
    rows: "3"
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};
var TextInputBlock = {
  type: "textfield",
  name: "Text Input",
  description: "Single line text field for short answers",
  icon: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(import_lucide_react12.LucideTextCursor, { className: "w-4 h-4" }),
  defaultData: {
    type: "textfield",
    fieldName: `textInput${(0, import_uuid.v4)().substring(0, 4)}`,
    label: "Text Input Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: ""
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/utils/blockAdapter.tsx
var import_jsx_runtime41 = require("react/jsx-runtime");
var CheckoutBlockDefinition = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details",
  icon: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_lucide_react13.ShoppingCart, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkout",
    fieldName: `checkout${(0, import_uuid2.v4)().substring(0, 4)}`,
    label: "Checkout",
    description: "",
    showShippingAddress: true,
    showBillingAddress: false,
    requireEmail: true,
    requirePhone: false,
    className: ""
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    return null;
  }
};
var blockTypeMap = {
  // Basic input blocks
  textfield: TextInputBlock,
  textarea: TextareaBlock,
  select: SelectBlock,
  radio: RadioBlock,
  checkbox: CheckboxBlock,
  // Advanced input blocks
  range: RangeBlock,
  datepicker: DatePickerBlock,
  fileupload: FileUploadBlock,
  matrix: MatrixBlock,
  selectablebox: SelectableBoxQuestionBlock,
  // Content blocks
  markdown: MarkdownBlock,
  html: HtmlBlock,
  auth: AuthBlock,
  // Logic blocks
  script: ScriptBlock,
  // Container blocks
  set: { type: "set" },
  // Simple definition for set type
  // Conditional blocks
  conditional: {
    type: "conditional",
    validate: (block) => {
      if (!block.condition) return "Condition is required";
      if (!block.childBlock) return "Child block is required";
      return null;
    }
  },
  // Calculated blocks
  calculated: {
    type: "calculated",
    validate: (block) => {
      if (!block.formula) return "Formula is required";
      if (!block.dependencies || !Array.isArray(block.dependencies))
        return "Dependencies array is required";
      return null;
    }
  },
  // BMI Calculator block
  bmiCalculator: {
    type: "bmiCalculator",
    validate: (block) => {
      return null;
    }
  },
  // Checkout block
  checkout: CheckoutBlockDefinition
};
function validateBlock(block) {
  const blockDefinition = blockTypeMap[block.type];
  if (blockDefinition && typeof blockDefinition.validate === "function") {
    return blockDefinition.validate(block);
  }
  return null;
}
function isContentBlock(blockType) {
  return ["markdown", "html", "script", "calculated"].includes(blockType);
}
function isInputBlock(blockType) {
  return !isContentBlock(blockType);
}
function supportsConditionalRendering(blockType) {
  return true;
}
function supportsBranchingLogic(blockType) {
  return ["radio", "select", "checkbox", "range", "textfield", "bmiCalculator", "checkout"].includes(blockType);
}

// src/components/renderers/BlockRenderer.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
var BlockRenderer = (0, import_react19.forwardRef)((props, ref) => {
  const { block, value, onChange, onBlur, error, disabled, customComponents, theme = null, isVisible } = props;
  const { getVisibleBlocks } = useSurveyForm();
  if (isVisible === false) {
    return null;
  }
  const validationError = validateBlock(block);
  const commonProps = {
    value,
    onChange,
    onBlur,
    error: error != null ? error : validationError === null ? void 0 : validationError,
    disabled,
    theme
  };
  if (customComponents && customComponents[block.type]) {
    const CustomComponent = customComponents[block.type];
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(CustomComponent, { ...props });
  }
  if (!blockTypeMap[block.type] && !["conditional", "calculated", "bmiCalculator", "checkout"].includes(block.type)) {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { className: "p-4 border border-gray-300 rounded", children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "text-sm text-gray-500", children: [
      "Unknown block type: ",
      block.type
    ] }) });
  }
  if (block.type === "conditional" && block.condition) {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      ConditionalBlockRenderer,
      {
        ...props,
        condition: block.condition,
        block: block.childBlock || { type: "html", html: "No child block specified" }
      }
    );
  }
  if (block.type === "calculated" && block.formula) {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      CalculatedFieldRenderer,
      {
        ...props,
        formula: block.formula,
        dependencies: block.dependencies || [],
        format: block.format
      }
    );
  }
  if (block.type === "bmiCalculator") {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(BMICalculatorRenderer, { ...props });
  }
  if (block.type === "checkout") {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(CheckoutRenderer, { ...props });
  }
  switch (block.type) {
    case "textfield":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(TextInputRenderer, { block, ...commonProps, ref });
    case "textarea":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(TextareaRenderer, { block, ...commonProps, ref });
    case "radio":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(RadioRenderer, { block, ...commonProps });
    case "checkbox":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(CheckboxRenderer, { block, ...commonProps });
    case "select":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SelectRenderer, { block, ...commonProps, ref });
    case "range":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(RangeRenderer, { block, ...commonProps });
    case "datepicker":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(DatePickerRenderer, { block, ...commonProps });
    case "fileupload":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(FileUploadRenderer, { block, ...commonProps });
    case "matrix":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(MatrixRenderer, { block, ...commonProps });
    case "selectablebox":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SelectableBoxRenderer, { block, ...commonProps });
    case "markdown":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(MarkdownRenderer, { block, ...commonProps });
    case "html":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(HtmlRenderer, { block, ...commonProps });
    case "auth":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(AuthRenderer, { block, ...commonProps });
    case "script":
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ScriptRenderer, { block, theme });
    case "set":
      if (block.items) {
        const visibleItems = getVisibleBlocks(block.items);
        const blockWithVisibleItems = { ...block, items: visibleItems };
        return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SetRenderer, { block: blockWithVisibleItems, ...commonProps });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(SetRenderer, { block, ...commonProps });
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: "p-4 border border-gray-300 rounded", children: [
        /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("p", { className: "font-medium mb-1", children: block.label || block.name || block.type }),
        block.description && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("p", { className: "text-sm text-gray-500 mb-2", children: block.description }),
        /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("p", { className: "text-sm bg-yellow-50 p-2 rounded border border-yellow-200", children: [
          "Renderer not implemented for block type: ",
          block.type
        ] })
      ] });
  }
});
BlockRenderer.displayName = "BlockRenderer";

// src/components/ui/DebugInfo.tsx
var import_react20 = require("react");

// src/components/ui/collapsible.tsx
var CollapsiblePrimitive = __toESM(require("@radix-ui/react-collapsible"));
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;

// src/components/ui/DebugInfo.tsx
var import_lucide_react14 = require("lucide-react");
var import_jsx_runtime43 = require("react/jsx-runtime");
var DebugInfo = ({ show = false }) => {
  const [isOpen, setIsOpen] = (0, import_react20.useState)(true);
  if (!show) return null;
  const {
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    values,
    errors
  } = useSurveyForm();
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Card, { className: "mt-4 mb-2 font-mono text-xs border border-border dark:border-border", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(Collapsible, { open: isOpen, onOpenChange: setIsOpen, className: "w-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(CardHeader, { className: "p-2 pb-0", children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(CardTitle, { className: "text-sm font-bold", children: "Survey Debug Info" }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(CollapsibleTrigger2, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(Button, { variant: "ghost", size: "sm", className: "p-0 h-7 w-7", children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react14.ChevronUp, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(import_lucide_react14.ChevronDown, { size: 16 }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(CollapsibleContent2, { children: /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)(CardContent, { className: "p-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: "Current Page:" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: currentPage }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: "Total Pages:" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: totalPages }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: "Is First Page:" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: isFirstPage ? "Yes" : "No" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: "Is Last Page:" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { children: isLastPage ? "Yes" : "No" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "font-bold mb-1", children: "Form Values:" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("pre", { className: "p-1 text-xs rounded border border-border bg-muted dark:bg-muted", children: JSON.stringify(values, null, 2) })
      ] }),
      Object.keys(errors).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: "mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: "font-bold mb-1", children: "Errors:" }),
        /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("pre", { className: "p-1 text-xs rounded border border-border bg-muted dark:bg-muted text-destructive", children: JSON.stringify(errors, null, 2) })
      ] })
    ] }) })
  ] }) });
};

// src/components/layouts/PageByPageLayout.tsx
var import_framer_motion2 = require("framer-motion");
var import_jsx_runtime44 = require("react/jsx-runtime");
var PageByPageLayout = ({
  progressBar = true,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: "Previous",
    nextText: "Next",
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = "Submit",
  enableDebug = false,
  showPageLocationHeader = false
}) => {
  var _a, _b;
  const showDebug = process.env.NODE_ENV !== "production";
  const {
    currentPage,
    totalPages,
    values,
    setValue,
    errors,
    goToNextPage,
    goToPreviousPage,
    isFirstPage,
    isLastPage,
    submit,
    isValid,
    theme
  } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const containerRef = (0, import_react21.useRef)(null);
  const firstInputRef = (0, import_react21.useRef)(null);
  (0, import_react21.useEffect)(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [currentPage, autoScroll]);
  (0, import_react21.useEffect)(() => {
    if (autoFocus && firstInputRef.current) {
      setTimeout(() => {
        var _a2;
        (_a2 = firstInputRef.current) == null ? void 0 : _a2.focus();
      }, 300);
    }
  }, [currentPage, autoFocus]);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const { surveyData } = useSurveyForm();
  const pages = getSurveyPages2(surveyData.rootNode);
  const currentPageBlocks = currentPage < pages.length ? pages[currentPage] : [];
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  const pageTitle = ((_a = currentPageBlocks[0]) == null ? void 0 : _a.name) || `Page ${currentPage + 1}`;
  const isDarkMode = theme.name === "dark";
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "survey-page-by-page-layout", ref: containerRef, children: [
    progressBar && currentPage >= 0 && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      ProgressBar,
      {
        currentPage,
        totalPages,
        options: typeof progressBar === "object" ? progressBar : void 0
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("form", { onSubmit: handleSubmit, className: "survey-form", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(import_framer_motion2.AnimatePresence, { mode: "wait", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
      import_framer_motion2.motion.div,
      {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
        transition: { duration: 0.3 },
        className: "w-full",
        children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Card, { className: cn("border", isDarkMode && "bg-card text-card-foreground border-border"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(CardHeader, { children: showPageLocationHeader && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(CardTitle, { children: pageTitle }) }),
          /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(CardContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "survey-page-content space-y-6", children: currentPageBlocks.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
              BlockRenderer,
              {
                block,
                value: block.fieldName ? values[block.fieldName] : void 0,
                onChange: (value) => {
                  if (block.fieldName) setValue(block.fieldName, value);
                  if (block.autoContinueOnSelect) {
                    goToNextPage();
                  }
                },
                error: block.fieldName ? errors[block.fieldName] : void 0,
                ref: index === 0 ? firstInputRef : void 0,
                theme
              },
              block.uuid || `block-${index}`
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(DebugInfo, { show: enableDebug }),
            /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
              NavigationButtons,
              {
                onPrevious: !isFirstPage ? goToPreviousPage : void 0,
                onNext: !isLastPage ? goToNextPage : void 0,
                onSubmit: isLastPage ? submit : void 0,
                isValid,
                options: {
                  ...navigationButtons,
                  showNext: (navigationButtons == null ? void 0 : navigationButtons.showNext) !== false && ((_b = currentPageBlocks[0]) == null ? void 0 : _b.showContinueButton) !== false
                },
                submitText
              }
            ) })
          ] })
        ] })
      },
      currentPage
    ) }) })
  ] });
};

// src/components/layouts/FullPageSurveyLayout.tsx
var import_react22 = require("react");
var import_framer_motion3 = require("framer-motion");
var import_lucide_react15 = require("lucide-react");
init_surveyUtils();
var import_jsx_runtime45 = require("react/jsx-runtime");
var FullPageSurveyLayout = ({
  progressBar = true,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: "Previous",
    nextText: "Continue",
    submitText: "Complete Survey",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = "Complete Survey",
  enableDebug = false,
  showNavigationHistory = false,
  logo = null
}) => {
  var _a;
  const {
    currentPage,
    currentBlockIndex,
    totalPages,
    values,
    setValue,
    errors,
    goToNextBlock,
    goToPreviousBlock,
    isFirstPage,
    isLastPage,
    submit,
    isValid,
    theme,
    surveyData,
    // Enhanced navigation properties
    navigationHistory,
    canGoBack,
    getActualProgress,
    getTotalVisibleSteps,
    getCurrentStepPosition,
    getVisibleBlocks
  } = useSurveyForm();
  const containerRef = (0, import_react22.useRef)(null);
  const firstInputRef = (0, import_react22.useRef)(null);
  const pages = getSurveyPages(surveyData.rootNode);
  const currentPageBlocks = currentPage < pages.length ? pages[currentPage] : [];
  const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);
  (0, import_react22.useEffect)(() => {
    if (autoFocus && firstInputRef.current) {
      setTimeout(() => {
        var _a2;
        (_a2 = firstInputRef.current) == null ? void 0 : _a2.focus();
      }, 200);
    }
  }, [currentPage, currentBlockIndex, autoFocus]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentBlock2 = currentPageBlocks[currentBlockIndex];
    if (currentBlock2 == null ? void 0 : currentBlock2.isEndBlock) {
      submit();
    } else if (isLastPage && currentBlockIndex === currentPageBlocks.length - 1) {
      submit();
    } else {
      goToNextBlock();
    }
  };
  const handlePrevious = () => {
    if (canGoBack) {
      goToPreviousBlock();
    }
  };
  const progressPercentage = getActualProgress();
  const currentStepPosition = getCurrentStepPosition();
  const totalVisibleSteps = getTotalVisibleSteps();
  const continueText = (navigationButtons == null ? void 0 : navigationButtons.nextText) || "Continue";
  const completeText = (navigationButtons == null ? void 0 : navigationButtons.submitText) || submitText;
  const showNextButton = (navigationButtons == null ? void 0 : navigationButtons.showNext) !== false && ((_a = currentPageBlocks[currentBlockIndex]) == null ? void 0 : _a.showContinueButton) !== false;
  const debugInfo = enableDebug ? {
    currentPage,
    currentBlockIndex,
    totalPages,
    totalVisibleSteps,
    currentStepPosition,
    progressPercentage: Math.round(progressPercentage),
    navigationHistoryLength: navigationHistory.length,
    canGoBack,
    visibleBlocksInCurrentPage: visibleCurrentPageBlocks.length
  } : null;
  const currentBlock = currentPageBlocks[currentBlockIndex];
  const blockDisclaimer = currentBlock == null ? void 0 : currentBlock.disclaimer;
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
    "div",
    {
      className: "survey-fullpage-layout min-h-max flex flex-col",
      ref: containerRef,
      children: [
        enableDebug && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full bg-yellow-50 border-b border-yellow-200 p-2 text-xs", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("details", { className: "cursor-pointer", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("summary", { className: "font-medium text-yellow-800", children: "Debug Info" }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("pre", { className: "mt-2 text-yellow-700 whitespace-pre-wrap", children: JSON.stringify(debugInfo, null, 2) })
        ] }) }) }),
        logo && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full flex py-2 px-4 border-gray-100 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full flex max-w-lg mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "justify-start", children: logo }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full backdrop-blur-sm border-gray-100", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "w-full max-w-lg mx-auto py-4", children: [
          progressBar && typeof progressBar === "object" && progressBar.position !== "bottom" && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "h-2 w-full rounded-full overflow-hidden bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              import_framer_motion3.motion.div,
              {
                className: cn(
                  "h-full transition-all duration-500 ease-out rounded-full",
                  theme.progress.bar || "bg-[#a55a36]"
                ),
                initial: { width: "0%" },
                animate: { width: `${progressPercentage}%` }
              }
            ) }),
            progressBar.type === "dots" && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "flex justify-center space-x-1 mt-2", children: Array.from({ length: totalVisibleSteps }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
              "div",
              {
                className: cn(
                  "w-2 h-2 rounded-full transition-colors",
                  i <= currentStepPosition ? "bg-[#E67E4D]" : "bg-gray-200"
                )
              },
              i
            )) }),
            progressBar.type === "numbers" && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "text-center text-xs text-gray-500 mt-2", children: [
              currentStepPosition + 1,
              " / ",
              totalVisibleSteps
            ] })
          ] }),
          progressBar === true && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "h-2 w-full rounded-full overflow-hidden bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
            import_framer_motion3.motion.div,
            {
              className: "h-full bg-[#E67E4D] transition-all duration-500 ease-out rounded-full",
              initial: { width: "0%" },
              animate: { width: `${progressPercentage}%` }
            }
          ) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "flex items-center justify-start h-8", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "flex items-center", children: (navigationButtons == null ? void 0 : navigationButtons.showPrevious) !== false && canGoBack && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: handlePrevious,
                className: cn(
                  "opacity-70 hover:opacity-100 transition-all duration-200",
                  "w-8 h-8 p-0 rounded-full",
                  "border border-gray-200",
                  "hover:bg-gray-50 hover:scale-105",
                  "focus:ring-2 focus:ring-[#E67E4D]/20"
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_lucide_react15.ChevronLeft, { className: "w-4 h-4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "sr-only", children: (navigationButtons == null ? void 0 : navigationButtons.previousText) || "Previous" })
                ]
              }
            ),
            showNavigationHistory && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "text-xs text-gray-500 flex items-center opacity-70", children: [
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_lucide_react15.History, { className: "w-3 h-3 mr-1" }),
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "tabular-nums", children: navigationHistory.length - 1 })
            ] })
          ] }) }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "flex-1 flex flex-col", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_framer_motion3.AnimatePresence, { mode: "wait", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
          import_framer_motion3.motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.3, ease: "easeInOut" },
            className: "flex-1 flex flex-col",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "flex-[0.8] flex flex-col justify-start items-center px-4 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full max-w-lg space-y-6", children: currentPageBlocks[currentBlockIndex] && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "text-start", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                BlockRenderer,
                {
                  block: currentPageBlocks[currentBlockIndex],
                  value: currentPageBlocks[currentBlockIndex].fieldName ? values[currentPageBlocks[currentBlockIndex].fieldName] : void 0,
                  onChange: (value) => {
                    const currentBlock2 = currentPageBlocks[currentBlockIndex];
                    const field = currentBlock2.fieldName;
                    if (field) setValue(field, value);
                    if (currentBlock2.autoContinueOnSelect) {
                      goToNextBlock(field ? { [field]: value } : void 0);
                    }
                  },
                  error: currentPageBlocks[currentBlockIndex].fieldName ? errors[currentPageBlocks[currentBlockIndex].fieldName] : void 0,
                  ref: firstInputRef,
                  theme
                }
              ) }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full backdrop-blur-sm border-gray-100", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "w-full max-w-2xl mx-auto px-4 py-4", children: [
                blockDisclaimer && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "text-xs text-gray-500 leading-relaxed max-w-md mx-auto text-center", children: blockDisclaimer }) }),
                /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
                  "div",
                  {
                    className: cn(
                      "flex items-center",
                      (navigationButtons == null ? void 0 : navigationButtons.align) === "left" ? "justify-start" : (navigationButtons == null ? void 0 : navigationButtons.align) === "right" ? "justify-end" : "justify-center"
                    ),
                    children: [
                      (navigationButtons == null ? void 0 : navigationButtons.position) === "split" && canGoBack && (navigationButtons == null ? void 0 : navigationButtons.showPrevious) !== false && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          onClick: handlePrevious,
                          className: "mr-auto",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_lucide_react15.ChevronLeft, { className: "mr-2 w-4 h-4" }),
                            (navigationButtons == null ? void 0 : navigationButtons.previousText) || "Previous"
                          ]
                        }
                      ),
                      showNextButton && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
                        Button,
                        {
                          type: "submit",
                          disabled: !isValid,
                          size: "lg",
                          className: cn(
                            "bg-black hover:bg-gray-800 text-white",
                            "px-16 py-4 text-base font-medium",
                            "rounded-full min-w-[200px]",
                            "transition-all duration-200",
                            "hover:scale-[1.02] active:scale-[0.98]",
                            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          ),
                          children: /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("span", { className: "flex items-center", children: [
                            isLastPage && currentBlockIndex === currentPageBlocks.length - 1 ? completeText : continueText,
                            !(isLastPage && currentBlockIndex === currentPageBlocks.length - 1) && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(import_lucide_react15.ArrowRight, { className: "ml-2 w-4 h-4" })
                          ] })
                        }
                      )
                    ]
                  }
                ) })
              ] }) })
            ]
          },
          `${currentPage}-${currentBlockIndex}`
        ) }) }),
        progressBar && typeof progressBar === "object" && progressBar.position === "bottom" && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full border-t bg-white/80 backdrop-blur-sm", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "w-full max-w-2xl mx-auto px-4 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "h-2 w-full rounded-full overflow-hidden bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          import_framer_motion3.motion.div,
          {
            className: cn(
              "h-full transition-all duration-500 ease-out rounded-full",
              progressBar.color || "bg-[#E67E4D]"
            ),
            initial: { width: "0%" },
            animate: { width: `${progressPercentage}%` }
          }
        ) }) }) })
      ]
    }
  );
};

// src/components/layouts/ContinuousLayout.tsx
var import_react23 = require("react");
var import_jsx_runtime46 = require("react/jsx-runtime");
var ContinuousLayout = ({
  progressBar = true,
  navigationButtons = {
    showPrevious: false,
    showNext: false,
    showSubmit: true,
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = true,
  autoFocus = false,
  showSummary = false,
  submitText = "Submit",
  enableDebug = false
}) => {
  const showDebug = process.env.NODE_ENV !== "production";
  const {
    values,
    setValue,
    errors,
    submit,
    isValid,
    theme
  } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const containerRef = (0, import_react23.useRef)(null);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const { surveyData } = useSurveyForm();
  const pages = getSurveyPages2(surveyData.rootNode);
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  const isDarkMode = theme.name === "dark";
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "survey-continuous-layout", ref: containerRef, children: [
    progressBar && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
      ProgressBar,
      {
        currentPage: 0,
        totalPages: 1,
        options: typeof progressBar === "object" ? progressBar : void 0
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("form", { onSubmit: handleSubmit, className: "survey-form", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(Card, { className: cn("border", isDarkMode && "bg-card text-card-foreground border-border"), children: /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "survey-continuous-content space-y-10", children: pages.map((pageBlocks, pageIndex) => {
        var _a, _b;
        return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "space-y-8", children: [
          ((_a = pageBlocks[0]) == null ? void 0 : _a.name) && /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(CardTitle, { className: "text-xl", children: pageBlocks[0].name }),
            ((_b = pageBlocks[0]) == null ? void 0 : _b.description) && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(CardDescription, { className: "mt-1", children: pageBlocks[0].description })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "space-y-6", children: pageBlocks.map((block, blockIndex) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
            BlockRenderer,
            {
              block,
              value: block.fieldName ? values[block.fieldName] : void 0,
              onChange: (value) => block.fieldName && setValue(block.fieldName, value),
              error: block.fieldName ? errors[block.fieldName] : void 0,
              theme
            },
            block.uuid || `block-${pageIndex}-${blockIndex}`
          )) })
        ] }, `page-${pageIndex}`);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(DebugInfo, { show: enableDebug }),
      /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
        NavigationButtons,
        {
          onSubmit: submit,
          isValid,
          options: {
            ...navigationButtons,
            showPrevious: false,
            showNext: false,
            showSubmit: true
          },
          submitText
        }
      ) })
    ] }) }) })
  ] });
};

// src/components/layouts/AccordionLayout.tsx
var import_react24 = require("react");
var import_jsx_runtime47 = require("react/jsx-runtime");
var AccordionLayout = ({
  progressBar = false,
  navigationButtons = {
    showPrevious: false,
    showNext: false,
    showSubmit: true,
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = false,
  autoFocus = false,
  showSummary = false,
  submitText = "Submit",
  enableDebug = false
}) => {
  const {
    values,
    setValue,
    errors,
    submit,
    isValid,
    theme
  } = useSurveyForm();
  const [expandedSections, setExpandedSections] = (0, import_react24.useState)([0]);
  const themeConfig = theme != null ? theme : themes.default;
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const pages = getSurveyPages2(useSurveyForm().surveyData.rootNode);
  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "survey-accordion-layout", children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("form", { onSubmit: handleSubmit, className: "survey-form", children: /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "space-y-4", children: [
    pages.map((pageBlocks, pageIndex) => {
      var _a, _b;
      const isExpanded = expandedSections.includes(pageIndex);
      const sectionName = ((_a = pageBlocks[0]) == null ? void 0 : _a.name) || `Section ${pageIndex + 1}`;
      return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: `border rounded-md overflow-hidden ${themeConfig.background}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(
          "div",
          {
            className: `
                    p-4 font-medium flex items-center justify-between cursor-pointer
                    transition-colors
                    ${isExpanded ? "bg-gray-100" : ""}
                  `,
            onClick: () => toggleSection(pageIndex),
            style: {
              backgroundColor: isExpanded ? themeConfig.colors.background : "transparent",
              borderBottom: isExpanded ? `1px solid ${themeConfig.colors.border}` : "none"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { className: "font-bold", children: sectionName }),
                ((_b = pageBlocks[0]) == null ? void 0 : _b.description) && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: pageBlocks[0].description })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { className: "text-xl", children: isExpanded ? "\u2212" : "+" })
            ]
          }
        ),
        isExpanded && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "p-4 space-y-6", children: pageBlocks.map((block, blockIndex) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          BlockRenderer,
          {
            block,
            value: block.fieldName ? values[block.fieldName] : void 0,
            onChange: (value) => block.fieldName && setValue(block.fieldName, value),
            error: block.fieldName ? errors[block.fieldName] : void 0,
            theme
          },
          block.uuid || `block-${pageIndex}-${blockIndex}`
        )) })
      ] }, `section-${pageIndex}`);
    }),
    /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: themeConfig.card, children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
      NavigationButtons,
      {
        onSubmit: submit,
        isValid,
        options: {
          ...navigationButtons,
          showPrevious: false,
          showNext: false,
          showSubmit: true
        },
        submitText
      }
    ) })
  ] }) }) });
};

// src/components/layouts/TabsLayout.tsx
var import_react25 = require("react");
var import_jsx_runtime48 = require("react/jsx-runtime");
var TabsLayout = ({
  progressBar = false,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: "Previous",
    nextText: "Next",
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = true,
  autoFocus = false,
  showSummary = false,
  submitText = "Submit"
}) => {
  var _a, _b, _c;
  const {
    currentPage,
    totalPages,
    values,
    setValue,
    errors,
    goToNextPage,
    goToPreviousPage,
    isFirstPage,
    isLastPage,
    submit,
    isValid,
    theme,
    goToPage
  } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const containerRef = (0, import_react25.useRef)(null);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const pages = getSurveyPages2(useSurveyForm().surveyData.rootNode);
  (0, import_react25.useEffect)(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [currentPage, autoScroll]);
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "survey-tabs-layout", ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "survey-tabs mb-6 flex items-center border-b overflow-x-auto", children: pages.map((pageBlocks, index) => {
      var _a2;
      const isActive = index === currentPage;
      const tabTitle = ((_a2 = pageBlocks[0]) == null ? void 0 : _a2.name) || `Page ${index + 1}`;
      return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
        "button",
        {
          className: `
                px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap
                ${isActive ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `,
          style: {
            borderBottomColor: isActive ? themeConfig.colors.primary : "transparent",
            color: isActive ? themeConfig.colors.primary : themeConfig.colors.secondary
          },
          onClick: () => goToPage(index),
          children: tabTitle
        },
        `tab-${index}`
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("form", { onSubmit: handleSubmit, className: "survey-form", children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: themeConfig.card, children: [
      pages[currentPage] && ((_a = pages[currentPage][0]) == null ? void 0 : _a.description) && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: themeConfig.header, children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("p", { className: themeConfig.description, children: pages[currentPage][0].description }) }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "survey-page-content space-y-6", children: (_b = pages[currentPage]) == null ? void 0 : _b.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
        BlockRenderer,
        {
          block,
          value: block.fieldName ? values[block.fieldName] : void 0,
          onChange: (value) => {
            if (block.fieldName) setValue(block.fieldName, value);
            if (block.autoContinueOnSelect) {
              goToNextPage();
            }
          },
          error: block.fieldName ? errors[block.fieldName] : void 0,
          theme
        },
        block.uuid || `block-${index}`
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
        NavigationButtons,
        {
          onPrevious: !isFirstPage ? goToPreviousPage : void 0,
          onNext: !isLastPage ? goToNextPage : void 0,
          onSubmit: isLastPage ? submit : void 0,
          isValid,
          options: {
            ...navigationButtons,
            showNext: (navigationButtons == null ? void 0 : navigationButtons.showNext) !== false && ((_c = pages[currentPage][0]) == null ? void 0 : _c.showContinueButton) !== false
          },
          submitText
        }
      )
    ] }) })
  ] });
};

// src/components/layouts/StepperLayout.tsx
var import_react26 = require("react");
var import_lucide_react16 = require("lucide-react");
var import_jsx_runtime49 = require("react/jsx-runtime");
var StepperLayout = ({
  progressBar = true,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: "Previous",
    nextText: "Next",
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = "Submit",
  enableDebug = false
}) => {
  var _a, _b, _c;
  const showDebug = process.env.NODE_ENV !== "production";
  const {
    currentPage,
    currentBlockIndex,
    totalPages,
    values,
    setValue,
    errors,
    goToNextBlock,
    goToPreviousBlock,
    isFirstPage,
    isLastPage,
    submit,
    isValid,
    theme,
    goToPage,
    surveyData
  } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const containerRef = (0, import_react26.useRef)(null);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const pages = getSurveyPages2(surveyData.rootNode);
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  const isDarkMode = theme.name === "dark";
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "survey-stepper-layout", ref: containerRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "survey-stepper-tabs mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "flex items-center justify-center flex-wrap gap-2", children: pages.map((pageBlocks, index) => {
      var _a2, _b2;
      const isActive = index === currentPage;
      const isCompleted = index < currentPage;
      const stepTitle = ((_a2 = pageBlocks[0]) == null ? void 0 : _a2.name) || `Step ${index + 1}`;
      return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
        "div",
        {
          className: "flex items-center",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
              Button,
              {
                variant: isActive ? "default" : isCompleted ? "outline" : "secondary",
                size: "sm",
                className: cn(
                  "h-9 rounded-full flex items-center mr-1",
                  isCompleted && "bg-primary/10 hover:bg-primary/20"
                ),
                onClick: () => goToPage(index),
                children: [
                  isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(import_lucide_react16.CheckIcon, { className: "h-4 w-4 mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "h-5 w-5 rounded-full flex items-center justify-center text-xs mr-1", children: index + 1 }),
                  ((_b2 = pageBlocks[0]) == null ? void 0 : _b2.name) && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "hidden sm:inline-block text-sm", children: stepTitle })
                ]
              }
            ),
            index < pages.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
              "div",
              {
                className: cn(
                  "hidden sm:block w-8 h-0.5",
                  index < currentPage ? "bg-primary" : "bg-muted"
                )
              }
            )
          ]
        },
        `step-${index}`
      );
    }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("form", { onSubmit: handleSubmit, className: "survey-form", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(Card, { className: cn("border", isDarkMode && "bg-card text-card-foreground border-border"), children: [
      pages[currentPage] && ((_a = pages[currentPage][0]) == null ? void 0 : _a.name) && /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(CardHeader, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(CardTitle, { children: pages[currentPage][0].name }),
        ((_b = pages[currentPage][0]) == null ? void 0 : _b.description) && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(CardDescription, { children: pages[currentPage][0].description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(CardContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "survey-page-content space-y-6", children: pages[currentPage] && pages[currentPage][currentBlockIndex] && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
          BlockRenderer,
          {
            block: pages[currentPage][currentBlockIndex],
            value: pages[currentPage][currentBlockIndex].fieldName ? values[pages[currentPage][currentBlockIndex].fieldName] : void 0,
            onChange: (value) => {
              const currentBlock = pages[currentPage][currentBlockIndex];
              const field = currentBlock.fieldName;
              if (field) setValue(field, value);
              if (currentBlock.autoContinueOnSelect) {
                goToNextBlock();
              }
            },
            error: pages[currentPage][currentBlockIndex].fieldName ? errors[pages[currentPage][currentBlockIndex].fieldName] : void 0,
            theme
          },
          pages[currentPage][currentBlockIndex].uuid || `block-${currentBlockIndex}`
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(DebugInfo, { show: enableDebug }),
        /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
          NavigationButtons,
          {
            onPrevious: !isFirstPage || currentBlockIndex > 0 ? goToPreviousBlock : void 0,
            onNext: goToNextBlock,
            onSubmit: isLastPage && currentBlockIndex === pages[currentPage].length - 1 ? submit : void 0,
            isValid,
            options: {
              ...navigationButtons,
              showNext: (navigationButtons == null ? void 0 : navigationButtons.showNext) !== false && ((_c = pages[currentPage][currentBlockIndex]) == null ? void 0 : _c.showContinueButton) !== false
            },
            submitText
          }
        ) })
      ] })
    ] }) })
  ] });
};

// src/components/SurveyForm.tsx
init_surveyUtils();

// src/utils/colorUtils.ts
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
var VARIANT_PSEUDOS = {
  hover: ":hover",
  focus: ":focus",
  active: ":active",
  disabled: ":disabled",
  "focus-visible": ":focus-visible",
  checked: ":checked"
};
function escapeCSSSelector(className) {
  return className.replace(/:/g, "\\:").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/#/g, "\\#").replace(/\//g, "\\/");
}
function applyDynamicColors(theme) {
  if (typeof document === "undefined" || !theme) return;
  const styleId = "dynamic-color-styles";
  let styleTag = document.getElementById(styleId);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }
  const sheet = styleTag.sheet;
  const existing = /* @__PURE__ */ new Set();
  for (let i = 0; i < sheet.cssRules.length; i++) {
    existing.add(sheet.cssRules[i].cssText);
  }
  const addRule = (selector, rule) => {
    const text = `${selector}{${rule}}`;
    if (!existing.has(text)) {
      try {
        sheet.insertRule(text, sheet.cssRules.length);
        existing.add(text);
      } catch (error) {
        console.warn(`Failed to insert CSS rule: ${text}`, error);
      }
    }
  };
  const parseClasses = (classes) => {
    classes.split(/\s+/).forEach((cls) => {
      const match = cls.match(/^(?:([a-zA-Z-]+):)?(text|bg|border|ring|accent)-\[(#[0-9a-fA-F]{6})\](?:\/(\d{1,3}))?$/);
      if (match) {
        const variant = match[1];
        const type = match[2];
        const color = match[3];
        const alpha = match[4] ? parseInt(match[4], 10) / 100 : 1;
        const rgba = hexToRgba(color, alpha);
        let selector = `.${escapeCSSSelector(cls)}`;
        if (variant && VARIANT_PSEUDOS[variant]) {
          selector += VARIANT_PSEUDOS[variant];
        }
        const prop = type === "text" ? `color: ${rgba}` : type === "bg" ? `background-color: ${rgba}` : type === "border" ? `border-color: ${rgba}` : type === "ring" ? `--tw-ring-color: ${rgba}` : `accent-color: ${rgba}`;
        addRule(selector, prop);
      }
    });
  };
  const traverse = (obj) => {
    if (!obj) return;
    if (typeof obj === "string") {
      parseClasses(obj);
    } else if (typeof obj === "object") {
      Object.values(obj).forEach(traverse);
    }
  };
  traverse(theme);
}

// src/components/SurveyForm.tsx
var import_jsx_runtime50 = require("react/jsx-runtime");
var SurveyForm = ({
  survey,
  onSubmit,
  onChange,
  onPageChange,
  defaultValues = {},
  language = "en",
  theme = null,
  layout = "stepper",
  progressBar = true,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: "Previous",
    nextText: "Next",
    submitText: "Submit",
    position: "bottom",
    align: "center",
    style: "default"
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = "Submit",
  enableDebug = false,
  logo = null,
  className = ""
}) => {
  var _a, _b;
  if (enableDebug) {
    console.log("SurveyForm rendering with survey data:", ((_a = survey == null ? void 0 : survey.rootNode) == null ? void 0 : _a.type) || "No survey data");
  }
  const themeConfig = (_b = survey == null ? void 0 : survey.theme) != null ? _b : themes.modern;
  (0, import_react27.useEffect)(() => {
    applyDynamicColors(themeConfig);
  }, [themeConfig]);
  const containerClass = getThemeClass(
    theme,
    `survey-form-container ${themeConfig.containerLayout} antialiased`,
    className
  );
  const renderLayout = (enableDebug2) => {
    const layoutProps = {
      enableDebug: enableDebug2,
      progressBar,
      navigationButtons,
      autoScroll,
      autoFocus,
      showSummary,
      submitText,
      logo
    };
    switch (layout) {
      case "continuous":
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(ContinuousLayout, { ...layoutProps });
      case "accordion":
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(AccordionLayout, { ...layoutProps });
      case "tabs":
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(TabsLayout, { ...layoutProps });
      case "stepper":
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(StepperLayout, { ...layoutProps });
      case "fullpage":
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(FullPageSurveyLayout, { ...layoutProps });
      case "page-by-page":
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(PageByPageLayout, { ...layoutProps });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: `${containerClass} ${themeConfig.background} min-h-screen flex justify-center`, children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
    SurveyFormProvider,
    {
      surveyData: survey,
      defaultValues,
      onSubmit,
      onChange,
      onPageChange,
      enableDebug,
      language,
      theme: themeConfig,
      logo,
      children: renderLayout(enableDebug)
    }
  ) });
};

// src/index.tsx
init_surveyUtils();

// src/survey/SurveyBuilder.tsx
var import_react35 = __toESM(require("react"));

// src/components/ui/sheet.tsx
var React40 = __toESM(require("react"));
var SheetPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_class_variance_authority5 = require("class-variance-authority");
var import_lucide_react17 = require("lucide-react");
var import_jsx_runtime51 = require("react/jsx-runtime");
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React40.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
var sheetVariants = (0, import_class_variance_authority5.cva)(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
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
var SheetContent = React40.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(SheetPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(SheetOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(import_lucide_react17.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
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
var SheetTitle = React40.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React40.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// src/context/SurveyBuilderContext.tsx
var import_react28 = require("react");
var import_uuid3 = require("uuid");
var import_jsx_runtime52 = require("react/jsx-runtime");
var defaultTheme2 = {
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
  const context = (0, import_react28.useContext)(SurveyBuilderContext);
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
  theme: defaultTheme2,
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
        theme: action.payload.theme || defaultTheme2
      };
    case ActionTypes.SET_ROOT_NODE:
      return {
        ...state,
        rootNode: action.payload
      };
    case ActionTypes.ADD_NODE: {
      if (!state.rootNode) return state;
      const { parentUuid, nodeData } = action.payload;
      const newNode = { ...nodeData, uuid: nodeData.uuid || (0, import_uuid3.v4)() };
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
        theme: action.payload.theme || defaultTheme2
      };
    default:
      return state;
  }
};
var SurveyBuilderContext = (0, import_react28.createContext)(
  void 0
);
var SurveyBuilderProvider = ({
  children,
  initialData
}) => {
  const [state, dispatch] = (0, import_react28.useReducer)(
    surveyBuilderReducer,
    {
      ...initialState,
      rootNode: (initialData == null ? void 0 : initialData.rootNode) || null,
      localizations: (initialData == null ? void 0 : initialData.localizations) || { en: {} },
      theme: (initialData == null ? void 0 : initialData.theme) || defaultTheme2
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
  const createId = () => (0, import_uuid3.v4)();
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
      theme: defaultTheme2
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
  return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SurveyBuilderContext.Provider, { value, children });
};

// src/survey/SurveyNode.tsx
var import_jsx_runtime53 = require("react/jsx-runtime");
var SurveyNode = ({ data }) => {
  const { state, updateNode, removeNode } = useSurveyBuilder();
  const getNodeComponent = () => {
    const nodeDefinition = state.definitions.nodes[data.type];
    if (!nodeDefinition) {
      return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(AlertTitle, { children: "Unknown Node Type" }),
        /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(AlertDescription, { children: [
          "No definition found for node type: ",
          data.type
        ] })
      ] });
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
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("div", { className: "ml-8 mt-2 border-l-2 border-muted pl-4", children: data.nodes.map((nodeRef, index) => {
      if (typeof nodeRef === "string") {
        const childNode = state.rootNode ? findNodeByUuid(state.rootNode, nodeRef) : null;
        if (!childNode) {
          return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(Alert, { variant: "destructive", children: [
            /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(AlertTitle, { children: "Missing Node" }),
            /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(AlertDescription, { children: [
              "Cannot find node with reference: ",
              nodeRef
            ] })
          ] }, nodeRef);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(SurveyNode, { data: childNode }, nodeRef);
      }
      return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(SurveyNode, { data: nodeRef }, nodeRef.uuid || index);
    }) });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { className: "survey-node", children: [
    getNodeComponent(),
    renderChildNodes()
  ] });
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
var import_react29 = require("react");
var import_lucide_react18 = require("lucide-react");
var import_jsx_runtime54 = require("react/jsx-runtime");
var LocalizationEditor = () => {
  const { state, updateLocalizations } = useSurveyBuilder();
  const [newLanguageCode, setNewLanguageCode] = (0, import_react29.useState)("");
  const [labels, setLabels] = (0, import_react29.useState)([]);
  const [localizations, setLocalizations] = (0, import_react29.useState)({});
  const [copySuccess, setCopySuccess] = (0, import_react29.useState)(null);
  (0, import_react29.useEffect)(() => {
    setLocalizations(state.localizations);
  }, [state.localizations]);
  (0, import_react29.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("h2", { className: "text-xl font-semibold", children: "Localizations" }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: handleCopyToClipboard,
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(import_lucide_react18.ClipboardCopy, { className: "w-4 h-4" }),
            /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { children: "Copy JSON" })
          ]
        }
      )
    ] }),
    copySuccess && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800", children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(AlertDescription, { children: copySuccess }) }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex gap-4 items-end", children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "space-y-2 flex-grow", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Label, { htmlFor: "new-language", children: "Add Language" }),
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
          Input,
          {
            id: "new-language",
            placeholder: "Language code (e.g., fr, es-ES)",
            value: newLanguageCode,
            onChange: (e) => setNewLanguageCode(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Button, { type: "button", onClick: handleAddLanguage, children: "Add" })
    ] }),
    labels.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Alert, { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(AlertDescription, { children: "No text labels found in the survey. Add content with text to enable localization." }) }),
    /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "space-y-6", children: Object.keys(localizations).map((langCode) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(Card, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(CardTitle, { className: "text-lg", children: langCode === "en" ? "English (Default)" : langCode }),
        langCode !== "en" && /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => handleRemoveLanguage(langCode),
            children: "Remove"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "space-y-4", children: labels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Label, { className: "mb-2", children: langCode === "en" ? "Original Text" : "English" }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("div", { className: "p-2 bg-muted rounded-md text-sm", children: langCode === "en" ? label : localizations.en[label] || label })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Label, { className: "mb-2", children: langCode === "en" ? "English" : `${langCode} Translation` }),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
            Input,
            {
              value: localizations[langCode][label] || "",
              onChange: (e) => handleUpdateTranslation(langCode, label, e.target.value),
              disabled: langCode === "en"
            }
          )
        ] })
      ] }, label)) }) })
    ] }, langCode)) })
  ] });
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
var import_jsx_runtime55 = require("react/jsx-runtime");
var BlockLibrary = () => {
  const { state } = useSurveyBuilder();
  return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("h3", { className: "text-sm font-medium mb-2", children: "Available Block Types" }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: "These are the content blocks that can be added to survey pages." }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        Object.entries(state.definitions.blocks).map(([type, definition]) => /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
          Card,
          {
            draggable: true,
            onDragStart: (e) => {
              e.dataTransfer.setData("application/x-block-type", type);
            },
            className: "hover:bg-accent/10 cursor-pointer transition-colors",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(CardHeader, { className: "p-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                  definition.icon && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { children: definition.icon }),
                  definition.name
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(CardDescription, { className: "text-xs", children: definition.description })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(CardContent, { className: "p-3 pt-0", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "border rounded-md p-2 bg-muted/50", children: definition.renderPreview() }) })
            ]
          },
          type
        )),
        Object.keys(state.definitions.blocks).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "col-span-1 sm:col-span-2 p-4 bg-muted rounded-md text-center", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { className: "text-muted-foreground", children: "No block definitions available. Add block definitions to get started." }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("h3", { className: "text-sm font-medium mb-2", children: "Available Node Types" }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: "These are the node types that can be added to the survey structure." }),
      /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        Object.entries(state.definitions.nodes).map(([type, definition]) => /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(Card, { className: "hover:bg-accent/10 cursor-pointer transition-colors", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(CardHeader, { className: "p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            definition.icon && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("span", { children: definition.icon }),
            definition.name
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(CardDescription, { className: "text-xs", children: definition.description })
        ] }) }, type)),
        Object.keys(state.definitions.nodes).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "col-span-1 sm:col-span-2 p-4 bg-muted rounded-md text-center", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("p", { className: "text-muted-foreground", children: "No node definitions available. Add node definitions to get started." }) })
      ] })
    ] })
  ] });
};

// src/survey/helpers/JsonEditor.tsx
var import_react30 = require("react");

// src/utils/nodeUtils.ts
var import_uuid4 = require("uuid");
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
    uuid: node.uuid || (0, import_uuid4.v4)()
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
  const clonedNode = { ...node, uuid: (0, import_uuid4.v4)() };
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
var import_jsx_runtime56 = require("react/jsx-runtime");
var JsonEditor = () => {
  const { state, importSurvey, exportSurvey } = useSurveyBuilder();
  const [exportJson, setExportJson] = (0, import_react30.useState)("");
  const [importJson, setImportJson] = (0, import_react30.useState)("");
  const [error, setError] = (0, import_react30.useState)(null);
  const [success, setSuccess] = (0, import_react30.useState)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(Tabs, { defaultValue: "import", children: [
    /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(TabsList, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(TabsTrigger, { value: "import", children: "Import" }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(TabsTrigger, { value: "export", children: "Export" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(TabsContent, { value: "import", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("h3", { className: "text-sm font-medium mb-2", children: "Import Survey" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { className: "text-sm text-muted-foreground mb-2", children: "Paste a valid JSON survey definition below to import it." }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          Textarea,
          {
            value: importJson,
            onChange: (e) => setImportJson(e.target.value),
            placeholder: '{\n  "rootNode": { "type": "section", ... },\n  "localizations": { "en": { ... } }\n}',
            rows: 12,
            className: "font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Button, { type: "button", onClick: handleImport, children: "Import" }) }),
      error && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AlertTitle, { children: "Error" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AlertDescription, { children: error })
      ] }),
      success && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AlertTitle, { children: "Success" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AlertDescription, { children: success })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(TabsContent, { value: "export", children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("h3", { className: "text-sm font-medium mb-2", children: "Export Survey" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { className: "text-sm text-muted-foreground mb-2", children: "Export the current survey definition as JSON." }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          Textarea,
          {
            value: exportJson,
            rows: 12,
            className: "font-mono text-sm",
            readOnly: true
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex justify-end space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Button, { type: "button", onClick: handleExport, children: "Refresh" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          Button,
          {
            type: "button",
            onClick: () => {
              navigator.clipboard.writeText(exportJson);
              setSuccess("Copied to clipboard!");
              setTimeout(() => setSuccess(null), 3e3);
            },
            disabled: !exportJson,
            children: "Copy to Clipboard"
          }
        )
      ] }),
      success && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800", children: [
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AlertTitle, { children: "Success" }),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(AlertDescription, { children: success })
      ] })
    ] }) })
  ] }) });
};

// src/survey/SurveryGraph.tsx
var import_react32 = require("react");
var import_lucide_react20 = require("lucide-react");

// src/components/common/NavigationRulesEditorDialog.tsx
var import_react31 = __toESM(require("react"));

// src/components/ui/dialog.tsx
var React41 = __toESM(require("react"));
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_lucide_react19 = require("lucide-react");
var import_jsx_runtime57 = require("react/jsx-runtime");
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React41.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
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
var DialogContent = React41.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(DialogPortal, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(DialogOverlay, {}),
  /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime57.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(import_lucide_react19.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
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
}) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
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
var DialogTitle = React41.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
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
var DialogDescription = React41.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/common/NavigationRulesEditorDialog.tsx
var import_jsx_runtime58 = require("react/jsx-runtime");
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
  const collectFieldNames = import_react31.default.useCallback((node) => {
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
  const collectPages = import_react31.default.useCallback((node) => {
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
  const collectBlocks = import_react31.default.useCallback((node) => {
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
  const fieldOptions = import_react31.default.useMemo(() => collectFieldNames(state.rootNode), [state.rootNode]);
  const pageOptions = import_react31.default.useMemo(() => collectPages(state.rootNode), [state.rootNode]);
  const blockOptions = import_react31.default.useMemo(() => collectBlocks(state.rootNode), [state.rootNode]);
  const [rules, setRules] = import_react31.default.useState(() => {
    return (navigationRules || []).map(parseRule);
  });
  const update = (rules2) => {
    onSave == null ? void 0 : onSave(rules2);
    onClose();
  };
  import_react31.default.useEffect(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-scroll", children: [
    /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(DialogTitle, { children: [
      "Edit Navigation Rules ",
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Badge, { variant: "outline", children: nodeName })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "space-y-4 mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Label, { children: "Navigation Rules" }),
      rules.map((rule, idx) => /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "border rounded-md p-3 space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "grid grid-cols-4 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Label, { children: "Variable" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
              Select,
              {
                value: rule.field,
                onValueChange: (val) => handleRuleChange(idx, "field", val),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectValue, { placeholder: "Select field" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectContent, { children: fieldOptions.map((name) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectItem, { value: name, children: name }, name)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Label, { children: "Operator" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
              Select,
              {
                value: rule.operator,
                onValueChange: (val) => handleRuleChange(idx, "operator", val),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectValue, { placeholder: "Operator" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectContent, { children: [
                    "==",
                    "!=",
                    ">",
                    ">=",
                    "<",
                    "<=",
                    "contains"
                  ].map((op) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectItem, { value: op, children: op }, op)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Label, { children: "Value" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
              Input,
              {
                value: rule.value,
                onChange: (e) => handleRuleChange(idx, "value", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Label, { children: "Target" }),
            /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(
              Select,
              {
                value: rule.target === "submit" ? "submit" : rule.isPage ? `page:${rule.target}` : `block:${rule.target}`,
                onValueChange: (val) => handleTargetChange(idx, val),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectValue, { placeholder: "Choose" }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(SelectContent, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(SelectGroup, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectLabel, { children: "Pages" }),
                      pageOptions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectItem, { value: `page:${p.uuid}`, children: p.name }, `page-${p.uuid}`))
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(SelectGroup, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectLabel, { children: "Blocks" }),
                      blockOptions.map((b) => /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectItem, { value: `block:${b.uuid}`, children: b.name }, `block-${b.uuid}`))
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SelectItem, { value: "submit", children: "Submit" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
            Checkbox,
            {
              id: `default-${idx}`,
              checked: rule.isDefault || false,
              onCheckedChange: (checked) => handleRuleChange(idx, "isDefault", !!checked)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Label, { htmlFor: `default-${idx}`, children: "Default" }),
          /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => removeRule(idx),
              className: "ml-auto",
              children: "Remove"
            }
          )
        ] })
      ] }, idx)),
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Button, { type: "button", variant: "outline", size: "sm", onClick: addRule, children: "Add Rule" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(DialogFooter, { className: "mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(Button, { type: "button", onClick: () => update(rules.map(buildRule)), children: "Save" })
    ] })
  ] }) });
};

// src/survey/SurveryGraph.tsx
var import_jsx_runtime59 = require("react/jsx-runtime");
var SurveyGraph = ({
  rootNode,
  zoomable = true,
  height = "600px"
}) => {
  const { state, updateNode } = useSurveyBuilder();
  const svgRef = (0, import_react32.useRef)(null);
  const containerRef = (0, import_react32.useRef)(null);
  const [nodes, setNodes] = (0, import_react32.useState)([]);
  const [edges, setEdges] = (0, import_react32.useState)([]);
  const [selectedNode, setSelectedNode] = (0, import_react32.useState)(null);
  const [hoveredEdge, setHoveredEdge] = (0, import_react32.useState)(null);
  const [editingRules, setEditingRules] = (0, import_react32.useState)(null);
  const [expandedPages, setExpandedPages] = (0, import_react32.useState)(/* @__PURE__ */ new Set());
  const [zoom, setZoom] = (0, import_react32.useState)(0.8);
  const [pan, setPan] = (0, import_react32.useState)({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = (0, import_react32.useState)(false);
  const [dragNode, setDragNode] = (0, import_react32.useState)(null);
  const [dragStart, setDragStart] = (0, import_react32.useState)({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = (0, import_react32.useState)(false);
  const [panStart, setPanStart] = (0, import_react32.useState)({ x: 0, y: 0 });
  const [mousePos, setMousePos] = (0, import_react32.useState)({ x: 0, y: 0 });
  const [cursorMode, setCursorMode] = (0, import_react32.useState)("select");
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
  const collectFieldNames = (0, import_react32.useCallback)((node) => {
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
  const collectTargets = (0, import_react32.useCallback)((node) => {
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
  const layoutNodes = (0, import_react32.useCallback)((rootNode2) => {
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
  (0, import_react32.useEffect)(() => {
    if (!rootNode) {
      setNodes([]);
      setEdges([]);
      return;
    }
    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutNodes(rootNode);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [rootNode, layoutNodes]);
  const handleWheel = (0, import_react32.useCallback)((e) => {
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
  (0, import_react32.useEffect)(() => {
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
  const saveNavigationRules = (0, import_react32.useCallback)((nodeId, rules) => {
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
  const fieldNames = (0, import_react32.useMemo)(() => collectFieldNames(rootNode), [rootNode, collectFieldNames]);
  const targets = (0, import_react32.useMemo)(() => collectTargets(rootNode), [rootNode, collectTargets]);
  if (!rootNode) {
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
      "div",
      {
        className: "flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md",
        style: { height },
        children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "No Survey Data" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "Create a survey to see the graph visualization." })
        ] })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
    "div",
    {
      className: "w-full bg-gray-50 dark:bg-gray-900 relative rounded-md",
      style: { height, overflow: "hidden" },
      ref: containerRef,
      onWheel: (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
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
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("defs", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                  "marker",
                  {
                    id: "arrowhead",
                    markerWidth: "10",
                    markerHeight: "7",
                    refX: "10",
                    refY: "3.5",
                    orient: "auto",
                    children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                      "polygon",
                      {
                        points: "0 0, 10 3.5, 0 7",
                        fill: isDarkMode ? "#9ca3af" : "#6b7280"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                  "marker",
                  {
                    id: "arrowhead-conditional",
                    markerWidth: "10",
                    markerHeight: "7",
                    refX: "10",
                    refY: "3.5",
                    orient: "auto",
                    children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                      "polygon",
                      {
                        points: "0 0, 10 3.5, 0 7",
                        fill: isDarkMode ? "#fb923c" : "#f97316"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                  "marker",
                  {
                    id: "arrowhead-highlighted",
                    markerWidth: "12",
                    markerHeight: "9",
                    refX: "12",
                    refY: "4.5",
                    orient: "auto",
                    children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                      "polygon",
                      {
                        points: "0 0, 12 4.5, 0 9",
                        fill: isDarkMode ? "#3b82f6" : "#2563eb"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("filter", { id: "shadow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feGaussianBlur", { in: "SourceAlpha", stdDeviation: "3" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feOffset", { dx: "0", dy: "2", result: "offsetblur" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feFlood", { floodColor: "#000000", floodOpacity: "0.1" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feComposite", { in2: "offsetblur", operator: "in" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("feMerge", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feMergeNode", {}),
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("filter", { id: "glow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("feMerge", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feMergeNode", { in: "coloredBlur" }),
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("g", { transform: `translate(${pan.x}, ${pan.y}) scale(${zoom})`, children: [
                edges.map((edge) => {
                  const path = generateEdgePath(edge);
                  const pathId = `path-${edge.id}`;
                  const isHighlighted = hoveredEdge === edge.id || selectedNode && (edge.source === selectedNode || edge.target === selectedNode);
                  return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("g", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("path", { id: pathId, d: path }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                      "path",
                      {
                        d: path,
                        fill: "none",
                        stroke: "white",
                        strokeWidth: isHighlighted ? "6" : "4",
                        opacity: "0.8"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
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
                    ),
                    edge.label && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("g", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
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
                          opacity: "0.95",
                          children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                            "animateTransform",
                            {
                              attributeName: "transform",
                              type: "translate",
                              values: "0,-8;0,-8",
                              dur: "1s"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                        "text",
                        {
                          className: "text-xs font-medium",
                          fill: isHighlighted ? isDarkMode ? "#60a5fa" : "#2563eb" : isDarkMode ? "#d1d5db" : "#6b7280",
                          dy: "4",
                          dx: "4",
                          children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("textPath", { href: `#${pathId}`, startOffset: "50%", textAnchor: "middle", children: edge.label.length > 20 ? edge.label.substring(0, 17) + "..." : edge.label })
                        }
                      )
                    ] })
                  ] }, edge.id);
                }),
                nodes.map((node) => {
                  const colors = getNodeColorByType(node.data.itemType, node.data.isPageNode, node.data.isNavigationNode);
                  const isSelected = selectedNode === node.id;
                  const isConnected = edges.some((e) => e.source === node.id || e.target === node.id);
                  return /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
                    "g",
                    {
                      transform: `translate(${node.x}, ${node.y})`,
                      className: cursorMode === "select" ? "cursor-pointer" : "",
                      onMouseDown: (e) => {
                        e.stopPropagation();
                        handleMouseDown(e, node.id);
                      },
                      children: [
                        isSelected && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
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
                        isConnected && !isSelected && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "circle",
                          {
                            cx: node.width + 15,
                            cy: "15",
                            r: "4",
                            fill: isDarkMode ? "#10b981" : "#059669",
                            opacity: "0.7"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
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
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("linearGradient", { id: `gradient-${node.id}`, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.1)" }),
                          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("stop", { offset: "100%", stopColor: "rgba(0,0,0,0.05)" })
                        ] }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "rect",
                          {
                            width: node.width,
                            height: node.height,
                            rx: "8",
                            fill: `url(#gradient-${node.id})`
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "rect",
                          {
                            width: node.width,
                            height: "32",
                            rx: "8",
                            fill: isDarkMode ? colors.darkStroke : colors.stroke,
                            opacity: "0.15"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
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
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "text",
                          {
                            x: "12",
                            y: "19",
                            className: "text-xs font-semibold",
                            fill: "white",
                            children: node.data.isNavigationNode ? "RULE" : node.data.isPageNode ? "PAGE" : node.data.itemType.toUpperCase()
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "text",
                          {
                            x: "12",
                            y: "50",
                            className: "text-sm font-bold",
                            fill: isDarkMode ? "#f8fafc" : "#1e293b",
                            children: node.data.label.length > 30 ? node.data.label.substring(0, 27) + "..." : node.data.label
                          }
                        ),
                        node.data.isPageNode && node.data.pageItems && node.data.pageItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("g", { children: [
                          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                            "line",
                            {
                              x1: "12",
                              y1: "68",
                              x2: node.width - 12,
                              y2: "68",
                              stroke: isDarkMode ? colors.darkStroke : colors.stroke,
                              strokeOpacity: "0.3"
                            }
                          ),
                          node.data.pageItems.slice(0, 4).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("g", { children: [
                            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                              "text",
                              {
                                x: "16",
                                y: 85 + index * 20,
                                className: "text-xs",
                                fill: isDarkMode ? "#cbd5e1" : "#64748b",
                                children: `${index + 1}. ${(item.label || item.fieldName || item.type || "Item").substring(0, 35)}${(item.label || item.fieldName || item.type || "Item").length > 35 ? "..." : ""}`
                              }
                            ),
                            item.navigationRules && item.navigationRules.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                              "circle",
                              {
                                cx: node.width - 20,
                                cy: 82 + index * 20,
                                r: "3",
                                fill: isDarkMode ? "#fb923c" : "#f97316"
                              }
                            )
                          ] }, item.uuid || index)),
                          node.data.pageItems.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
                            "text",
                            {
                              x: "16",
                              y: 85 + 4 * 20,
                              className: "text-xs font-medium",
                              fill: isDarkMode ? "#94a3b8" : "#6b7280",
                              children: [
                                "+",
                                node.data.pageItems.length - 4,
                                " more items..."
                              ]
                            }
                          )
                        ] }),
                        node.data.isNavigationNode && node.data.description && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "text",
                          {
                            x: "12",
                            y: "70",
                            className: "text-xs",
                            fill: isDarkMode ? "#cbd5e1" : "#64748b",
                            children: node.data.description.length > 35 ? node.data.description.substring(0, 32) + "..." : node.data.description
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("g", { transform: `translate(${node.width - 40}, 8)`, children: node.data.hasConditionalFlow && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("g", { children: [
                          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                            "circle",
                            {
                              cx: "12",
                              cy: "12",
                              r: "10",
                              fill: isDarkMode ? "#fb7185" : "#f43f5e",
                              opacity: "0.2"
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                            "path",
                            {
                              d: "M8 12l3 3 6-6",
                              stroke: isDarkMode ? "#fb7185" : "#f43f5e",
                              strokeWidth: "2",
                              fill: "none",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        ] }) }),
                        isSelected && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
                          "text",
                          {
                            x: node.width / 2,
                            y: node.height + 20,
                            textAnchor: "middle",
                            className: "text-xs",
                            fill: isDarkMode ? "#94a3b8" : "#64748b",
                            children: node.data.isNavigationNode ? "Click settings to edit rules" : "Page overview"
                          }
                        )
                      ]
                    },
                    node.id
                  );
                })
              ] })
            ]
          }
        ),
        zoomable && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "button",
              {
                onClick: () => handleZoom(0.1),
                className: "flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
                title: "Zoom In",
                children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_lucide_react20.ZoomIn, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "button",
              {
                onClick: () => handleZoom(-0.1),
                className: "flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
                title: "Zoom Out",
                children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_lucide_react20.ZoomOut, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "button",
              {
                onClick: handleFitView,
                className: "flex items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all",
                title: "Fit View",
                children: /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_lucide_react20.Maximize2, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
              "button",
              {
                onClick: () => setCursorMode(cursorMode === "select" ? "pan" : "select"),
                className: `flex items-center justify-center w-8 h-8 rounded-lg transition-all ${cursorMode === "pan" ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"}`,
                title: cursorMode === "select" ? "Switch to Pan Mode (or hold Space)" : "Switch to Select Mode",
                children: cursorMode === "select" ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_lucide_react20.Move, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_lucide_react20.MousePointer, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "text-center mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { className: "text-xs text-gray-500 dark:text-gray-400 font-mono", children: [
            Math.round(zoom * 100),
            "%"
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "absolute bottom-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h4", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2", children: "Legend" }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-3 h-3 bg-green-100 dark:bg-green-900 border border-green-500 rounded" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "text-gray-600 dark:text-gray-400", children: "Page" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-3 h-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-500 rounded" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "text-gray-600 dark:text-gray-400", children: "Navigation Rule" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-3 h-px bg-gray-400" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "text-gray-600 dark:text-gray-400", children: "Sequential Flow" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-3 h-px bg-orange-500 border-dashed border-b" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "text-gray-600 dark:text-gray-400", children: "Conditional Flow" })
            ] })
          ] })
        ] }),
        selectedNode && selectedNodeData && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "absolute top-4 right-4 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50", children: [
          /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-t-xl border-b border-gray-200/50 dark:border-gray-600/50", children: /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("h3", { className: "text-sm font-bold text-gray-900 dark:text-white", children: selectedNodeData.data.isNavigationNode ? "Navigation Rule" : selectedNodeData.data.isPageNode ? "Page Details" : "Item Details" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: selectedNodeData.data.isNavigationNode ? "Controls flow between pages" : "Survey content" })
            ] }),
            selectedNodeData.data.isNavigationNode && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)(
              "button",
              {
                onClick: () => setEditingRules(selectedNode),
                className: "flex items-center gap-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md transition-colors",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(import_lucide_react20.Settings, { className: "w-3 h-3" }),
                  "Edit"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "p-4 space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: "Name" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { className: "text-sm font-semibold text-gray-900 dark:text-white mt-1", children: selectedNodeData.data.label })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: "Type" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex gap-2 mt-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border", children: selectedNodeData.data.nodeType }),
                selectedNodeData.data.isPageNode && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800", children: "PAGE" }),
                selectedNodeData.data.isNavigationNode && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800", children: "NAVIGATION" })
              ] })
            ] }),
            selectedNodeData.data.isPageNode && selectedNodeData.data.pageItems && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: [
                "Items (",
                selectedNodeData.data.pageItems.length,
                ")"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "mt-2 space-y-1 max-h-32 overflow-y-auto", children: selectedNodeData.data.pageItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "text-gray-600 dark:text-gray-300", children: item.fieldName || item.label || item.type || "Item" }),
                item.navigationRules && item.navigationRules.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-2 h-2 bg-orange-500 rounded-full", title: "Has navigation rules" })
              ] }, item.uuid || index)) })
            ] }),
            selectedNodeData.data.description && /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: "Description" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("p", { className: "text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed", children: selectedNodeData.data.description.length > 120 ? selectedNodeData.data.description.substring(0, 117) + "..." : selectedNodeData.data.description })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: "Connections" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "mt-1 space-y-1", children: [
                edges.filter((e) => e.source === selectedNode || e.target === selectedNode).map((edge) => /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { className: "text-xs text-gray-600 dark:text-gray-300", children: [
                  edge.source === selectedNode ? "\u2192" : "\u2190",
                  " ",
                  edge.label || "Connection"
                ] }, edge.id)),
                edges.filter((e) => e.source === selectedNode || e.target === selectedNode).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("span", { className: "text-xs text-gray-400 dark:text-gray-500", children: "No connections" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("label", { className: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide", children: "Status" }),
              /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "flex items-center gap-2 mt-1", children: selectedNodeData.data.hasConditionalFlow ? /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800", children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-2 h-2 bg-orange-500 rounded-full" }),
                "Has Rules"
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime59.jsxs)("span", { className: "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800", children: [
                /* @__PURE__ */ (0, import_jsx_runtime59.jsx)("div", { className: "w-2 h-2 bg-green-500 rounded-full" }),
                "Sequential"
              ] }) })
            ] })
          ] })
        ] }),
        editingRules && selectedNodeData && /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(
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
      ]
    }
  );
};

// src/survey/panels/ThemeBuilder.tsx
var import_react33 = __toESM(require("react"));
var import_react34 = require("react");

// src/components/ui/toggle-group.tsx
var React45 = __toESM(require("react"));
var ToggleGroupPrimitive = __toESM(require("@radix-ui/react-toggle-group"));

// src/components/ui/toggle.tsx
var React44 = __toESM(require("react"));
var TogglePrimitive = __toESM(require("@radix-ui/react-toggle"));
var import_class_variance_authority6 = require("class-variance-authority");
var import_jsx_runtime60 = require("react/jsx-runtime");
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
var Toggle = React44.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(
  TogglePrimitive.Root,
  {
    ref,
    className: cn(toggleVariants({ variant, size, className })),
    ...props
  }
));
Toggle.displayName = TogglePrimitive.Root.displayName;

// src/components/ui/toggle-group.tsx
var import_jsx_runtime61 = require("react/jsx-runtime");
var ToggleGroupContext = React45.createContext({
  size: "default",
  variant: "default"
});
var ToggleGroup = React45.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
  ToggleGroupPrimitive.Root,
  {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(ToggleGroupContext.Provider, { value: { variant, size }, children })
  }
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
var ToggleGroupItem = React45.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React45.useContext(ToggleGroupContext);
  return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(
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
      ...props,
      children
    }
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// src/survey/panels/ThemeBuilder.tsx
var import_lucide_react21 = require("lucide-react");
var import_jsx_runtime62 = require("react/jsx-runtime");
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
  { name: "White", value: "#FFFFFF" },
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
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(PopoverRoot, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
          Button,
          {
            variant: "outline",
            className: "w-full justify-start gap-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                "div",
                {
                  className: "w-4 h-4 rounded border",
                  style: { backgroundColor: hexColor }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "text-sm", children: hexColor })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(PopoverContent, { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Quick Colors" }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-6 gap-2 mt-2", children: COLOR_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
              "button",
              {
                className: "w-10 h-10 rounded border-2 hover:scale-110 transition-transform",
                style: { backgroundColor: preset.value },
                onClick: () => handleColorChange(preset.value),
                title: preset.name
              },
              preset.value
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Custom Color" }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                "input",
                {
                  type: "color",
                  value: hexColor,
                  onChange: (e) => handleColorChange(e.target.value),
                  className: "w-20 h-10 rounded cursor-pointer"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                Input,
                {
                  value: hexColor,
                  onChange: (e) => handleColorChange(e.target.value),
                  placeholder: "#000000"
                }
              )
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
        Input,
        {
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder: `${prefix}-gray-900`,
          className: "flex-1"
        }
      )
    ] })
  ] });
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
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "capitalize", children: type }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Badge, { variant: "outline", children: [
        Object.keys(value).length,
        " rules"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-2 p-4 border rounded-lg bg-gray-50", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "w-16 text-xs", children: "All" }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Select, { value: allValue, onValueChange: (val) => updateSpacing("", val), children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { className: "h-8", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.spacing.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Separator2, {}),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-2 gap-2", children: [
        { side: "t", label: "Top" },
        { side: "r", label: "Right" },
        { side: "b", label: "Bottom" },
        { side: "l", label: "Left" }
      ].map(({ side, label }) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "w-12 text-xs", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
          Select,
          {
            value: value[`${prefix}${side}`] || "0",
            onValueChange: (val) => updateSpacing(side, val),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { className: "h-8", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, {}) }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.spacing.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
            ]
          }
        )
      ] }, side)) })
    ] })
  ] });
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
  const [showAdvanced, setShowAdvanced] = (0, import_react34.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Label, { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Sparkles, { className: "w-4 h-4" }),
        "Quick Presets"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-2 gap-2", children: FIELD_PRESETS[presetType].map((preset) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onChange(preset.value),
          className: "justify-start text-xs",
          children: preset.name
        },
        preset.name
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Separator2, {}),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("h4", { className: "font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Type, { className: "w-4 h-4" }),
          "Typography"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Select, { value: parsed.fontSize, onValueChange: (val) => updateClasses({ fontSize: val }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, { placeholder: "Font Size" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.fontSize.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Select, { value: parsed.fontWeight, onValueChange: (val) => updateClasses({ fontWeight: val }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, { placeholder: "Font Weight" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.fontWeight.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
          ToggleGroup,
          {
            type: "single",
            value: parsed.textAlign,
            onValueChange: (val) => updateClasses({ textAlign: val }),
            children: PRESET_OPTIONS.textAlign.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ToggleGroupItem, { value: opt.value, className: "data-[state=on]:bg-blue-100", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "text-xs", children: opt.icon }) }, opt.value))
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("h4", { className: "font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Paintbrush, { className: "w-4 h-4" }),
          "Appearance"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Select, { value: parsed.borderRadius, onValueChange: (val) => updateClasses({ borderRadius: val }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, { placeholder: "Border Radius" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.borderRadius.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { children: opt.preview }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { children: opt.label })
          ] }) }, opt.value)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Select, { value: parsed.shadow, onValueChange: (val) => updateClasses({ shadow: val }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, { placeholder: "Shadow" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.shadow.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
        ] }),
        parsed.borderWidth && /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Select, { value: parsed.borderWidth, onValueChange: (val) => updateClasses({ borderWidth: val }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, { placeholder: "Border Width" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.borderWidth.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
        ColorPicker,
        {
          value: parsed.textColor,
          onChange: (val) => updateClasses({ textColor: val }),
          label: "Text Color",
          prefix: "text"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
        ColorPicker,
        {
          value: parsed.bgColor,
          onChange: (val) => updateClasses({ bgColor: val }),
          label: "Background Color",
          prefix: "bg"
        }
      ),
      parsed.borderWidth && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
        ColorPicker,
        {
          value: parsed.borderColor,
          onChange: (val) => updateClasses({ borderColor: val }),
          label: "Border Color",
          prefix: "border"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setShowAdvanced(!showAdvanced),
          className: "w-full justify-between",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Sliders, { className: "w-4 h-4" }),
              "Advanced Spacing"
            ] }),
            showAdvanced ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.X, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Plus, { className: "w-4 h-4" })
          ]
        }
      ),
      showAdvanced && /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
          SpacingControl,
          {
            value: parsed.padding,
            onChange: (val) => updateClasses({ padding: val }),
            type: "padding"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
          SpacingControl,
          {
            value: parsed.margin,
            onChange: (val) => updateClasses({ margin: val }),
            type: "margin"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Custom Classes" }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
        Textarea,
        {
          value: parsed.custom.join(" "),
          onChange: (e) => updateClasses({ custom: e.target.value.split(" ").filter(Boolean) }),
          placeholder: "Add any additional Tailwind classes here...",
          rows: 2
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "p-3 bg-gray-100 rounded-lg", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("code", { className: "text-xs text-gray-700 break-all", children: value }) })
  ] });
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
var ResizeHandle = () => {
  const [isResizing, setIsResizing] = (0, import_react34.useState)(false);
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };
  (0, import_react34.useEffect)(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const containerWidth = window.innerWidth - 48;
      const leftWidth = Math.max(384, Math.min(containerWidth - 320, e.clientX - 24));
      const rightWidth = containerWidth - leftWidth;
      document.documentElement.style.setProperty("--left-panel-width", `${leftWidth}px`);
      document.documentElement.style.setProperty("--right-panel-width", `${rightWidth}px`);
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
    "div",
    {
      className: `hidden lg:flex items-center justify-center w-6 cursor-col-resize bg-gray-100 hover:bg-blue-100 transition-colors relative group ${isResizing ? "bg-blue-200 shadow-md" : ""}`,
      onMouseDown: handleMouseDown,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: `w-1 h-8 rounded-full transition-colors ${isResizing ? "bg-blue-600" : "bg-gray-400 group-hover:bg-blue-500"}` }),
        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 -mt-8", children: "Drag to resize panels" })
      ]
    }
  );
};
var ThemePreview = ({ theme, state }) => {
  const [previewWidth, setPreviewWidth] = (0, import_react34.useState)(400);
  const [previewScale, setPreviewScale] = (0, import_react34.useState)(1);
  const viewportPresets = [
    { name: "Mobile", width: 375, icon: "\u{1F4F1}" },
    { name: "Tablet", width: 768, icon: "\u{1F4F1}" },
    { name: "Desktop", width: 1024, icon: "\u{1F4BB}" },
    { name: "Large", width: 1440, icon: "\u{1F5A5}\uFE0F" }
  ];
  const handlePresetSelect = (width) => {
    setPreviewWidth(width);
  };
  const handleScaleChange = (newScale) => {
    setPreviewScale(newScale[0]);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { className: "text-lg", children: "Live Preview" }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { className: "p-0 relative", children: state.rootNode ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
      SurveyForm,
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
    ) : /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "p-8 text-center text-gray-500", children: [
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Package, { className: "w-12 h-12 mx-auto mb-4 text-gray-300" }),
      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("p", { children: "Add some blocks to see survey in action" })
    ] }) })
  ] });
};
var ThemeBuilder = ({ onDataChange }) => {
  var _a;
  const { state, updateTheme, exportSurvey } = useSurveyBuilder();
  const [currentTheme, setCurrentTheme] = (0, import_react34.useState)(state.theme);
  const [copySuccess, setCopySuccess] = (0, import_react34.useState)(null);
  const [selectedPreset, setSelectedPreset] = (0, import_react34.useState)(state.theme.name);
  const [showPreview, setShowPreview] = (0, import_react34.useState)(true);
  const [editMode, setEditMode] = (0, import_react34.useState)("visual");
  (0, import_react34.useEffect)(() => {
    if (typeof window !== "undefined") {
      const containerWidth = window.innerWidth - 48;
      const defaultLeftWidth = Math.max(384, containerWidth * 0.6);
      const defaultRightWidth = containerWidth - defaultLeftWidth;
      document.documentElement.style.setProperty("--left-panel-width", `${defaultLeftWidth}px`);
      document.documentElement.style.setProperty("--right-panel-width", `${defaultRightWidth}px`);
    }
  }, []);
  (0, import_react34.useEffect)(() => {
    setCurrentTheme(state.theme);
    setSelectedPreset(state.theme.name);
  }, [state.theme]);
  import_react33.default.useEffect(() => {
    onDataChange == null ? void 0 : onDataChange(exportSurvey());
  }, [state.rootNode, state.localizations, onDataChange, currentTheme]);
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
  return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex flex-col lg:flex-row lg:h-screen lg:p-2 min-h-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
      "div",
      {
        className: "flex-1 lg:min-w-96 space-y-6 p-4 lg:p-0 lg:pr-3 overflow-y-auto",
        style: {
          width: "var(--left-panel-width, auto)",
          maxWidth: "var(--left-panel-width, none)",
          flexShrink: 0
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleResetToPreset,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.RefreshCw, { className: "w-4 h-4" }),
                    "Reset"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleExportTheme,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Download, { className: "w-4 h-4" }),
                    "Export"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("label", { className: "cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    asChild: true,
                    className: "flex items-center gap-2",
                    children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("span", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Upload, { className: "w-4 h-4" }),
                      "Import"
                    ] })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                  "input",
                  {
                    type: "file",
                    accept: ".json",
                    onChange: handleImportTheme,
                    className: "hidden"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                ToggleGroup,
                {
                  type: "single",
                  value: editMode,
                  onValueChange: (val) => val && setEditMode(val),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(ToggleGroupItem, { value: "visual", className: "data-[state=on]:bg-blue-100", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Palette, { className: "w-4 h-4 mr-1" }),
                      "Visual"
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(ToggleGroupItem, { value: "code", className: "data-[state=on]:bg-blue-100", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Type, { className: "w-4 h-4 mr-1" }),
                      "Code"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowPreview(!showPreview),
                  className: "flex lg:hidden items-center gap-2",
                  children: [
                    showPreview ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Eye, { className: "w-4 h-4" }),
                    "Preview"
                  ]
                }
              )
            ] })
          ] }),
          copySuccess && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Alert, { variant: "default", className: "bg-green-50 border-green-300 text-green-800", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(AlertDescription, { children: copySuccess }) }),
          /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Sparkles, { className: "w-5 h-5" }),
                "Theme Presets"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Choose a preset theme or create your own custom design" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: Object.entries(themePresets).filter(([_, preset]) => preset !== void 0).map(([key, preset]) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
              "button",
              {
                onClick: () => handlePresetChange(key),
                className: `p-4 rounded-lg border-2 transition-all hover:scale-105 ${selectedPreset === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "text-sm font-medium text-start capitalize", children: preset.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "mt-2 flex gap-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                      "div",
                      {
                        className: "w-3 h-3 rounded-full border",
                        style: { backgroundColor: preset.colors.primary }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                      "div",
                      {
                        className: "w-3 h-3 rounded-full border",
                        style: { backgroundColor: preset.colors.secondary }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                      "div",
                      {
                        className: "w-3 h-3 rounded-full border",
                        style: { backgroundColor: preset.colors.accent }
                      }
                    )
                  ] })
                ]
              },
              key
            )) }) })
          ] }),
          editMode === "visual" ? /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Tabs, { defaultValue: "colors", className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsList, { className: "grid w-full grid-cols-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "colors", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Palette, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden sm:inline", children: "Colors" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "layout", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Layout, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden sm:inline", children: "Layout" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "typography", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Type, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden sm:inline", children: "Typography" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "fields", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Package, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden sm:inline", children: "Fields" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "buttons", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.MousePointer, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden sm:inline", children: "Buttons" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "progress", className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.BarChart3, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden sm:inline", children: "Progress" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: "colors", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Color Palette" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Click on any color to customize it with the visual picker" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: Object.entries(currentTheme.colors).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Label, { className: "capitalize flex items-center gap-2", children: [
                  key,
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(PopoverRoot, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Info, { className: "w-3 h-3 text-gray-400" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(PopoverContent, { className: "text-sm", children: [
                      key === "primary" && "Main brand color used for primary actions",
                      key === "secondary" && "Supporting color for secondary elements",
                      key === "accent" && "Highlight color for special elements",
                      key === "background" && "Main background color",
                      key === "text" && "Primary text color",
                      key === "border" && "Default border color",
                      key === "error" && "Color for error messages",
                      key === "success" && "Color for success messages"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(PopoverRoot, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full h-12 justify-between",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "text-sm font-mono", children: value }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          "div",
                          {
                            className: "w-8 h-8 rounded border",
                            style: { backgroundColor: value }
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(PopoverContent, { className: "w-80", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Quick Colors" }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-6 gap-2 mt-2", children: COLOR_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                        "button",
                        {
                          className: "w-10 h-10 rounded border-2 hover:scale-110 transition-transform",
                          style: { backgroundColor: preset.value },
                          onClick: () => updateNestedProperty("colors", key, preset.value),
                          title: preset.name
                        },
                        preset.value
                      )) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Custom Color" }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex gap-2 mt-2", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          "input",
                          {
                            type: "color",
                            value,
                            onChange: (e) => updateNestedProperty("colors", key, e.target.value),
                            className: "w-20 h-10 rounded cursor-pointer"
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          Input,
                          {
                            value,
                            onChange: (e) => updateNestedProperty("colors", key, e.target.value),
                            placeholder: "#000000"
                          }
                        )
                      ] })
                    ] })
                  ] }) })
                ] })
              ] }, key)) }) })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: "layout", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Container & Layout" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Configure the overall structure and spacing" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { className: "space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Label, { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Grid3X3, { className: "w-4 h-4" }),
                    "Container Width"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                    Select,
                    {
                      value: ((_a = currentTheme.containerLayout.match(/max-w-\w+/)) == null ? void 0 : _a[0]) || "max-w-2xl",
                      onValueChange: (val) => {
                        const newLayout = currentTheme.containerLayout.replace(/max-w-\w+/, val);
                        handleThemeUpdate({ containerLayout: newLayout });
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectValue, {}) }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectContent, { children: PRESET_OPTIONS.containerWidth.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Background Style" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                    VisualStyleBuilder,
                    {
                      value: currentTheme.background,
                      onChange: (val) => handleThemeUpdate({ background: val }),
                      presetType: "card"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { children: "Card Style" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                    VisualStyleBuilder,
                    {
                      value: currentTheme.card,
                      onChange: (val) => handleThemeUpdate({ card: val }),
                      presetType: "card"
                    }
                  )
                ] })
              ] }) })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: "typography", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Typography Settings" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Customize text styles for headers and descriptions" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardContent, { className: "space-y-6", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "mb-2", children: "Title Style" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                    VisualStyleBuilder,
                    {
                      value: currentTheme.title,
                      onChange: (val) => handleThemeUpdate({ title: val }),
                      presetType: "label"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Separator2, {}),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "mb-2", children: "Description Style" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                    VisualStyleBuilder,
                    {
                      value: currentTheme.description,
                      onChange: (val) => handleThemeUpdate({ description: val }),
                      presetType: "label"
                    }
                  )
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: "fields", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Form Field Styles" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Customize each form element type with visual tools" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Tabs, { defaultValue: "label", className: "space-y-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsList, { className: "grid grid-cols-3 lg:grid-cols-7 gap-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "label", children: "Label" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "input", children: "Input" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "select", children: "Select" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "checkbox", children: "Checkbox" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "radio", children: "Radio" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "textarea", children: "Textarea" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsTrigger, { value: "selectableBox", className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.CheckSquare, { className: "w-3 h-3" }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("span", { className: "hidden lg:inline", children: "Box" })
                  ] })
                ] }),
                Object.entries({
                  label: "label",
                  input: "input",
                  select: "select",
                  checkbox: "checkbox",
                  radio: "radio",
                  textarea: "textarea",
                  selectableBox: "selectableBox"
                }).map(([key, presetKey]) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: key, children: key === "selectableBox" ? /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Alert, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.CheckSquare, { className: "w-4 h-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(AlertDescription, { children: "Customize the appearance of selectable box questions. These settings affect the overall container, selected state, hover effects, and more." })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid grid-cols-1 gap-6", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-base font-semibold mb-3 block", children: "Base Box Style" }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                        VisualStyleBuilder,
                        {
                          value: currentTheme.field.selectableBox || "",
                          onChange: (val) => updateNestedProperty("field", "selectableBox", val),
                          presetType: "selectableBox"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Separator2, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Default State" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxDefault || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxDefault", val),
                            presetType: "selectableBox"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Selected State" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxSelected || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxSelected", val),
                            presetType: "selectableBox"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Hover Style" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxHover || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxHover", val),
                            presetType: "selectableBox"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Focus Style" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxFocus || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxFocus", val),
                            presetType: "selectableBox"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Separator2, {}),
                    /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Text Style" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxText || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxText", val),
                            presetType: "label"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Selected Text Style" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxTextSelected || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxTextSelected", val),
                            presetType: "label"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Selection Indicator" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxIndicator || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxIndicator", val),
                            presetType: "button"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "text-sm font-medium mb-2 block", children: "Indicator Icon" }),
                        /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                          VisualStyleBuilder,
                          {
                            value: currentTheme.field.selectableBoxIndicatorIcon || "",
                            onChange: (val) => updateNestedProperty("field", "selectableBoxIndicatorIcon", val),
                            presetType: "label"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                  VisualStyleBuilder,
                  {
                    value: currentTheme.field[key],
                    onChange: (val) => updateNestedProperty("field", key, val),
                    presetType: presetKey
                  }
                ) }, key))
              ] }) })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: "buttons", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Button Styles" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Design your buttons with visual customization tools" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Tabs, { defaultValue: "primary", className: "space-y-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(TabsList, { className: "grid grid-cols-4", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "primary", children: "Primary" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "secondary", children: "Secondary" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "text", children: "Text" }),
                  /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsTrigger, { value: "navigation", children: "Navigation" })
                ] }),
                Object.entries(currentTheme.button).map(([key]) => /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: key, children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                  VisualStyleBuilder,
                  {
                    value: currentTheme.button[key],
                    onChange: (val) => updateNestedProperty("button", key, val),
                    presetType: "button"
                  }
                ) }, key))
              ] }) })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(TabsContent, { value: "progress", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Progress Indicators" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Style progress bars and navigation elements" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "grid grid-cols-1 gap-6", children: Object.entries(currentTheme.progress).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(Label, { className: "capitalize mb-2", children: key.replace(/([A-Z])/g, " $1").trim() }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
                  VisualStyleBuilder,
                  {
                    value,
                    onChange: (val) => updateNestedProperty("progress", key, val),
                    presetType: "label"
                  }
                )
              ] }, key)) }) })
            ] }) })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(CardHeader, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardTitle, { children: "Advanced Code Editor" }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardDescription, { children: "Edit the theme JSON directly for full control" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(Alert, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.Info, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(AlertDescription, { children: "Changes made here will be applied immediately. Make sure your JSON is valid!" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
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
              ),
              /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleCopyToClipboard,
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(import_lucide_react21.ClipboardCopy, { className: "w-4 h-4" }),
                      "Copy JSON"
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)("div", { className: "text-sm text-gray-500", children: [
                  Object.keys(currentTheme).length,
                  " properties"
                ] })
              ] })
            ] }) })
          ] }),
          showPreview && /* @__PURE__ */ (0, import_jsx_runtime62.jsx)("div", { className: "lg:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ThemePreview, { theme: currentTheme, state }) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ResizeHandle, {}),
    /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(
      "div",
      {
        className: "hidden lg:block lg:min-w-80 lg:max-w-3xl overflow-hidden",
        style: {
          width: "var(--right-panel-width, auto)",
          maxWidth: "var(--right-panel-width, none)",
          flexShrink: 0
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ThemePreview, { theme: currentTheme, state })
      }
    )
  ] }) });
};

// src/survey/panels/PreviewSurvey.tsx
var import_jsx_runtime63 = require("react/jsx-runtime");
var PreviewSurvey = () => {
  const { state } = useSurveyBuilder();
  return /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("div", { className: "container-fluid min-h-screen", children: state.rootNode ? /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(
    SurveyForm,
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
  ) : /* @__PURE__ */ (0, import_jsx_runtime63.jsx)("p", { children: "Add some blocks to see survey in action" }) });
};

// src/survey/SurveyBuilder.tsx
var import_jsx_runtime64 = require("react/jsx-runtime");
var SurveyBuilder = ({
  initialData,
  onDataChange,
  blockDefinitions = [],
  nodeDefinitions = []
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SurveyBuilderProvider, { initialData, children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
    SurveyBuilderContent,
    {
      onDataChange,
      blockDefinitions,
      nodeDefinitions
    }
  ) });
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
  const [isPanelOpen, setIsPanelOpen] = (0, import_react35.useState)(false);
  const [isThemeBuilderOpen, setIsThemeBuilderOpen] = (0, import_react35.useState)(false);
  const [isPreviewOpen, setIsPreviewOpen] = (0, import_react35.useState)(false);
  import_react35.default.useEffect(() => {
    const existing = new Set(Object.keys(state.definitions.blocks));
    blockDefinitions.forEach((def) => {
      if (!existing.has(def.type)) {
        addBlockDefinition(def.type, def);
      }
    });
  }, [blockDefinitions, state.definitions.blocks, addBlockDefinition]);
  import_react35.default.useEffect(() => {
    const existing = new Set(Object.keys(state.definitions.nodes));
    nodeDefinitions.forEach((def) => {
      if (!existing.has(def.type)) {
        addNodeDefinition(def.type, def);
      }
    });
  }, [nodeDefinitions, state.definitions.nodes, addNodeDefinition]);
  import_react35.default.useEffect(() => {
    onDataChange == null ? void 0 : onDataChange(exportSurvey());
  }, [state.rootNode, state.localizations, onDataChange]);
  const handleCreateRootNode = import_react35.default.useCallback(() => {
    if (!state.rootNode && Object.keys(state.definitions.nodes).length > 0) {
      initSurvey();
    }
  }, [state.rootNode, state.definitions.nodes, createNode]);
  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "survey-builder h-full flex flex-col pb-5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "survey-builder-header flex items-center justify-between p-4 bg-card border-b", children: [
      /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("h2", { className: "text-xl font-bold", children: "Form Builder" }),
      /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(
          Tabs,
          {
            value: state.displayMode,
            onValueChange: (v) => handleDisplayModeChange(v),
            className: "mr-4",
            children: /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(TabsList, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsTrigger, { value: "list", children: "List View" }),
              /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsTrigger, { value: "graph", children: "Graph View" }),
              /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsTrigger, { value: "lang", children: "Localizations" })
            ] })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(Sheet, { open: isThemeBuilderOpen, onOpenChange: setIsThemeBuilderOpen, children: [
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { type: "button", variant: "outline", children: "Theme Builder" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(SheetContent, { side: "right", className: "w-full", children: [
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetTitle, { children: "Theme Builder" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(ThemeBuilder, { onDataChange })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(Sheet, { open: isPanelOpen, onOpenChange: setIsPanelOpen, children: [
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { type: "button", variant: "outline", children: "Tools" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(SheetContent, { side: "right", className: "w-[540px] sm:w-[540px]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetTitle, { children: "Tools" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(Tabs, { defaultValue: "blocks", className: "mt-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(TabsList, { className: "mb-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsTrigger, { value: "blocks", children: "Block Library" }),
                /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsTrigger, { value: "json", children: "JSON" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsContent, { value: "blocks", className: "overflow-y-scroll", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(BlockLibrary, {}) }),
              /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(TabsContent, { value: "json", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(JsonEditor, {}) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(Sheet, { open: isPreviewOpen, onOpenChange: setIsPreviewOpen, children: [
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { type: "button", variant: "outline", children: "Preview" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)(SheetContent, { side: "right", className: "w-full", children: [
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SheetTitle, { className: "sr-only", children: "Preview" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(PreviewSurvey, {})
          ] })
        ] }),
        !state.rootNode && /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { type: "button", onClick: handleCreateRootNode, children: "Create Form" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "survey-builder-content flex-grow p-4 overflow-auto", children: [
      state.displayMode === "list" && /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "survey-list space-y-4", children: state.rootNode ? /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SurveyNode, { data: state.rootNode }) : /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "text-center p-12 bg-muted rounded-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "No Form Created" }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("p", { className: "text-muted-foreground mb-6", children: 'Click "Create Form" to start building your Form.' }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { type: "button", onClick: handleCreateRootNode, children: "Create Form" })
      ] }) }),
      state.displayMode === "graph" && /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "survey-graph", children: state.rootNode ? /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "h-full flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "text-sm text-muted-foreground mb-4 bg-muted rounded-md p-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("p", { children: "This graph view shows the structure of your survey, including sections, pages, and blocks. Conditional paths are shown with dashed lines." }),
          /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("p", { className: "mt-1", children: "You can zoom and pan to explore the graph. Hover over nodes to see more details." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "flex-grow", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(SurveyGraph, { rootNode: state.rootNode }) })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime64.jsxs)("div", { className: "text-center p-12 bg-muted rounded-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("h3", { className: "text-lg font-semibold mb-4", children: "No Survey Created" }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("p", { className: "text-muted-foreground mb-6", children: "Create a survey first to see the graph visualization." }),
        /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(Button, { type: "button", onClick: handleCreateRootNode, children: "Create Survey" })
      ] }) }),
      state.displayMode === "lang" && /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("div", { className: "survey-lang", children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(LocalizationEditor, {}) })
    ] })
  ] });
};

// src/components/blocks/TextInputBlock.tsx
var import_lucide_react22 = require("lucide-react");
var import_uuid5 = require("uuid");
var import_jsx_runtime65 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "question1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Label, { htmlFor: "label", children: "Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Label, { htmlFor: "placeholder", children: "Placeholder" }),
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
          Input,
          {
            id: "placeholder",
            value: data.placeholder || "",
            onChange: (e) => handleChange("placeholder", e.target.value),
            placeholder: "Type your answer here..."
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Label, { htmlFor: "defaultValue", children: "Default Value" }),
        /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
          Input,
          {
            id: "defaultValue",
            value: data.defaultValue || "",
            onChange: (e) => handleChange("defaultValue", e.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] })
  ] });
};
var TextInputBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)("div", { className: "space-y-2", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(Label, { htmlFor: data.fieldName, children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
      Input,
      {
        id: data.fieldName,
        name: data.fieldName,
        placeholder: data.placeholder,
        defaultValue: data.defaultValue
      }
    )
  ] });
};
var TextInputBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(
    Input,
    {
      placeholder: "Text input field",
      className: "w-4/5 max-w-full",
      disabled: true
    }
  ) });
};
var TextInputBlock2 = {
  type: "textfield",
  name: "Text Input",
  description: "Single line text field for short answers",
  icon: /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(import_lucide_react22.LucideTextCursor, { className: "w-4 h-4" }),
  defaultData: {
    type: "textfield",
    fieldName: `textInput${(0, import_uuid5.v4)().substring(0, 4)}`,
    label: "Text Input Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: ""
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(TextInputBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(TextInputBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(TextInputBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/TextareaBlock.tsx
var import_lucide_react23 = require("lucide-react");
var import_uuid6 = require("uuid");
var import_jsx_runtime66 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "textArea1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: "label", children: "Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: "placeholder", children: "Placeholder" }),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
          Input,
          {
            id: "placeholder",
            value: data.placeholder || "",
            onChange: (e) => handleChange("placeholder", e.target.value),
            placeholder: "Type your answer here..."
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: "rows", children: "Rows" }),
        /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
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
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: "defaultValue", children: "Default Value" }),
      /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
        Textarea,
        {
          id: "defaultValue",
          value: data.defaultValue || "",
          onChange: (e) => handleChange("defaultValue", e.target.value),
          placeholder: "Default response text",
          rows: 3
        }
      )
    ] })
  ] });
};
var TextareaBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)("div", { className: "space-y-2", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Label, { htmlFor: data.fieldName, children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
      Textarea,
      {
        id: data.fieldName,
        name: data.fieldName,
        placeholder: data.placeholder,
        defaultValue: data.defaultValue,
        rows: data.rows ? parseInt(data.rows, 10) : 3
      }
    )
  ] });
};
var TextareaBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(
    Textarea,
    {
      placeholder: "Multi-line text input",
      className: "w-4/5 max-w-full",
      rows: 2,
      disabled: true
    }
  ) });
};
var TextareaBlock2 = {
  type: "textarea",
  name: "Text Area",
  description: "Multi-line text field for longer answers",
  icon: /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(import_lucide_react23.AlignLeft, { className: "w-4 h-4" }),
  defaultData: {
    type: "textarea",
    fieldName: `textArea${(0, import_uuid6.v4)().substring(0, 4)}`,
    label: "Text Area Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: "",
    rows: "3"
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(TextareaBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(TextareaBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(TextareaBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/RadioBlock.tsx
var import_react36 = require("react");
var import_lucide_react24 = require("lucide-react");
var import_lucide_react25 = require("lucide-react");
var import_uuid7 = require("uuid");
var import_jsx_runtime67 = require("react/jsx-runtime");
var RadioBlockForm = ({
  data,
  onUpdate
}) => {
  const [newLabel, setNewLabel] = (0, import_react36.useState)("");
  const [newValue, setNewValue] = (0, import_react36.useState)("");
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
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "radioOption1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: "label", children: "Question Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { children: "Options" }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "border rounded-md p-4 space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "space-y-4", children: (data.labels || []).map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react25.Circle, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
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
            ),
            /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
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
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => handleRemoveOption(index),
              className: "text-destructive",
              children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react24.CircleX, { className: "h-4 w-4" })
            }
          )
        ] }, index)) }),
        /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "pt-2 border-t mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex items-center gap-2 mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react24.CirclePlus, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
              Input,
              {
                value: newLabel,
                onChange: (e) => setNewLabel(e.target.value),
                placeholder: "New option label"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
              Input,
              {
                value: newValue,
                onChange: (e) => setNewValue(e.target.value),
                placeholder: "New option value (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: handleAddOption,
              children: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react24.CirclePlus, { className: "h-4 w-4 text-primary" })
            }
          )
        ] }) })
      ] })
    ] })
  ] });
};
var RadioBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "space-y-4", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(RadioGroup, { defaultValue: data.defaultValue, className: "grid gap-2", children: (data.labels || []).map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(
        RadioGroupItem,
        {
          value: (data.values || [])[index],
          id: `${data.fieldName}-${index}`
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: `${data.fieldName}-${index}`, children: label })
    ] }, index)) })
  ] });
};
var RadioBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime67.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)(RadioGroup, { defaultValue: "1", className: "w-4/5 max-w-full space-y-1 grid gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(RadioGroupItem, { value: "1", id: "preview-1" }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: "preview-1", children: "Option 1" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime67.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(RadioGroupItem, { value: "2", id: "preview-2" }),
      /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(Label, { htmlFor: "preview-2", children: "Option 2" })
    ] })
  ] }) });
};
var RadioBlock2 = {
  type: "radio",
  name: "Radio Buttons",
  description: "Single selection from multiple options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(import_lucide_react24.CircleCheck, { className: "w-4 h-4" }),
  defaultData: {
    type: "radio",
    fieldName: `radioOption${(0, import_uuid7.v4)().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: "1"
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(RadioBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(RadioBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(RadioBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/CheckboxBlock.tsx
var import_lucide_react26 = require("lucide-react");
var import_uuid8 = require("uuid");
var import_jsx_runtime68 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "checkboxField1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "label", children: "Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Checkbox option"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("p", { className: "text-xs text-muted-foreground", children: "Text displayed next to the checkbox" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "value", children: "Value (when checked)" }),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
          Input,
          {
            id: "value",
            value: data.value || "",
            onChange: (e) => handleChange("value", e.target.value),
            placeholder: "true"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "flex items-center space-x-2 pt-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
          Checkbox,
          {
            id: "defaultChecked",
            checked: !!data.defaultValue,
            onCheckedChange: (checked) => {
              handleChange("defaultValue", !!checked);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "defaultChecked", children: "Default to checked" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this option"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
          Checkbox,
          {
            id: "showYesNo",
            checked: !!data.showYesNo,
            onCheckedChange: (checked) => {
              handleChange("showYesNo", !!checked);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "showYesNo", children: "Show Yes/No labels" })
      ] }),
      data.showYesNo && /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "grid grid-cols-2 gap-4 mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "trueLabel", children: "Yes Label" }),
          /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
            Input,
            {
              id: "trueLabel",
              value: data.trueLabel || "Yes",
              onChange: (e) => handleChange("trueLabel", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "falseLabel", children: "No Label" }),
          /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
            Input,
            {
              id: "falseLabel",
              value: data.falseLabel || "No",
              onChange: (e) => handleChange("falseLabel", e.target.value)
            }
          )
        ] })
      ] })
    ] })
  ] });
};
var CheckboxBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(
        Checkbox,
        {
          id: data.fieldName,
          name: data.fieldName,
          defaultChecked: !!data.defaultValue,
          value: data.value || "true"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: data.fieldName, children: data.label })
    ] }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("p", { className: "text-sm text-muted-foreground ml-6", children: data.description }),
    data.showYesNo && /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "flex space-x-4 ml-6 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("span", { children: [
        "Checked: ",
        data.trueLabel || "Yes"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("span", { children: [
        "Unchecked: ",
        data.falseLabel || "No"
      ] })
    ] })
  ] });
};
var CheckboxBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime68.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)("div", { className: "flex items-center space-x-2 w-4/5 max-w-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Checkbox, { id: "preview-checkbox", disabled: true }),
    /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(Label, { htmlFor: "preview-checkbox", children: "Checkbox option" })
  ] }) });
};
var CheckboxBlock2 = {
  type: "checkbox",
  name: "Checkbox",
  description: "Single checkbox for binary/boolean options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(import_lucide_react26.CheckSquare, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkbox",
    fieldName: `checkbox${(0, import_uuid8.v4)().substring(0, 4)}`,
    label: "Check this option",
    description: "",
    value: "true",
    defaultValue: false,
    showYesNo: false,
    trueLabel: "Yes",
    falseLabel: "No"
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(CheckboxBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(CheckboxBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(CheckboxBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/MarkdownBlock.tsx
var import_react37 = require("react");
var import_lucide_react27 = require("lucide-react");
var import_jsx_runtime69 = require("react/jsx-runtime");
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
  const [preview, setPreview] = (0, import_react37.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(Label, { htmlFor: "variableName", children: "Variable Name (Optional)" }),
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
          Input,
          {
            id: "variableName",
            value: data.variableName || "",
            onChange: (e) => handleChange("variableName", e.target.value),
            placeholder: "markdownVar"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)("p", { className: "text-xs text-muted-foreground", children: "Optional variable to use in templates" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(Label, { htmlFor: "className", children: "CSS Class Names" }),
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
          Input,
          {
            id: "className",
            value: data.className || "",
            onChange: (e) => handleChange("className", e.target.value),
            placeholder: "markdown-content"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "flex items-center space-x-2 mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
        Checkbox,
        {
          id: "updateContent",
          checked: !!data.updateContent,
          onCheckedChange: (checked) => {
            handleChange("updateContent", !!checked);
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(Label, { htmlFor: "updateContent", children: "Auto-update content from variables" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(Label, { htmlFor: "text", children: "Markdown Content" }),
        /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
          "button",
          {
            type: "button",
            className: "text-xs text-primary hover:underline",
            onClick: () => setPreview(!preview),
            children: preview ? "Edit Markdown" : "Preview"
          }
        )
      ] }),
      preview ? /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
        "div",
        {
          className: "border rounded-md p-4 min-h-[200px] prose prose-sm max-w-none",
          dangerouslySetInnerHTML: { __html: renderMarkdown(data.text || "") }
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
        Textarea,
        {
          id: "text",
          value: data.text || "",
          onChange: (e) => handleChange("text", e.target.value),
          placeholder: "# Markdown content\\n\\nYou can use **bold** and *italic* text",
          rows: 10,
          className: "font-mono text-sm"
        }
      )
    ] })
  ] });
};
var MarkdownBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(
    "div",
    {
      className: `prose prose-sm max-w-none ${data.className || ""}`,
      dangerouslySetInnerHTML: { __html: renderMarkdown(data.text || "") }
    }
  );
};
var MarkdownBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime69.jsxs)("div", { className: "text-center w-4/5 max-w-full text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime69.jsx)("span", { className: "text-muted-foreground", children: "Markdown" }),
    /* @__PURE__ */ (0, import_jsx_runtime69.jsx)("code", { className: "px-2 py-1 bg-muted rounded-md text-xs", children: "## Heading" })
  ] }) });
};
var MarkdownBlock2 = {
  type: "markdown",
  name: "Markdown",
  description: "Formatted text content using Markdown syntax",
  icon: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(import_lucide_react27.FileText, { className: "w-4 h-4" }),
  defaultData: {
    type: "markdown",
    text: "## Markdown Heading\n\nThis is a paragraph with **bold** and *italic* text.\n\n* List item 1\n* List item 2",
    variableName: "",
    className: "",
    updateContent: false
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(MarkdownBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(MarkdownBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(MarkdownBlockPreview, {}),
  validate: (data) => {
    if (!data.text) return "Content is required";
    return null;
  }
};

// src/components/blocks/HtmlBlock.tsx
var import_react38 = require("react");
var import_lucide_react28 = require("lucide-react");
var import_jsx_runtime70 = require("react/jsx-runtime");
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
  const [preview, setPreview] = (0, import_react38.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(Label, { htmlFor: "variableName", children: "Variable Name (Optional)" }),
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
          Input,
          {
            id: "variableName",
            value: data.variableName || "",
            onChange: (e) => handleChange("variableName", e.target.value),
            placeholder: "htmlVar"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("p", { className: "text-xs text-muted-foreground", children: "Optional variable to use in templates" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(Label, { htmlFor: "className", children: "CSS Class Names" }),
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
          Input,
          {
            id: "className",
            value: data.className || "",
            onChange: (e) => handleChange("className", e.target.value),
            placeholder: "html-content custom-styles"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(Label, { htmlFor: "html", children: "HTML Content" }),
        /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
          "button",
          {
            type: "button",
            className: "text-xs text-primary hover:underline",
            onClick: () => setPreview(!preview),
            children: preview ? "Edit HTML" : "Preview"
          }
        )
      ] }),
      preview ? /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
        "div",
        {
          className: "border rounded-md p-4 min-h-[200px] overflow-auto",
          dangerouslySetInnerHTML: { __html: data.html || "" }
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
        Textarea,
        {
          id: "html",
          value: data.html || "",
          onChange: (e) => handleChange("html", e.target.value),
          placeholder: "<h2>HTML Content</h2>\\n<p>You can add any HTML here</p>",
          rows: 10,
          className: "font-mono text-sm"
        }
      )
    ] })
  ] });
};
var HtmlBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(
    "div",
    {
      className: data.className || "",
      dangerouslySetInnerHTML: { __html: data.html || "" }
    }
  );
};
var HtmlBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)("div", { className: "text-center w-4/5 max-w-full text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("span", { className: "text-muted-foreground", children: "HTML" }),
    /* @__PURE__ */ (0, import_jsx_runtime70.jsx)("code", { className: "px-2 py-1 bg-muted rounded-md text-xs", children: "<div></div>" })
  ] }) });
};
var HtmlBlock2 = {
  type: "html",
  name: "HTML",
  description: "Custom HTML content",
  icon: /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(import_lucide_react28.Code, { className: "w-4 h-4" }),
  defaultData: {
    type: "html",
    html: "<h2>HTML Content</h2>\n<p>This is a <strong>custom</strong> HTML block.</p>",
    variableName: "",
    className: ""
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(HtmlBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(HtmlBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime70.jsx)(HtmlBlockPreview, {}),
  validate: (data) => {
    if (!data.html) return "HTML content is required";
    return null;
  }
};

// src/components/blocks/ScriptBlock.tsx
var import_lucide_react29 = require("lucide-react");
var import_jsx_runtime71 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("div", { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(Label, { htmlFor: "script", children: "JavaScript Code" }),
    /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
      "This script will be executed when the page is rendered. The script has access to ",
      /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("code", { children: "formData" }),
      ", ",
      /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("code", { children: "pageData" }),
      ", and ",
      /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("code", { children: "renderer" }),
      " objects."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(
      Textarea,
      {
        id: "script",
        value: data.script || "",
        onChange: (e) => handleChange("script", e.target.value),
        placeholder: "// Example: validate or transform form data\\nconsole.log('Running script...');\\nformData.calculatedValue = formData.input1 + formData.input2;",
        rows: 12,
        className: "font-mono text-sm"
      }
    )
  ] }) });
};
var ScriptBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)("div", { className: "p-2 border rounded bg-muted/20", children: [
    /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_lucide_react29.Terminal, { className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("span", { className: "text-sm", children: "Script Block (runs on page load)" })
    ] }),
    data.script && /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("pre", { className: "mt-2 text-xs font-mono whitespace-pre-wrap p-2 bg-muted rounded", children: data.script.length > 100 ? `${data.script.substring(0, 100)}...` : data.script })
  ] });
};
var ScriptBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime71.jsxs)("div", { className: "text-center w-4/5 max-w-full text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("span", { className: "text-muted-foreground", children: "JavaScript" }),
    /* @__PURE__ */ (0, import_jsx_runtime71.jsx)("code", { className: "px-2 py-1 bg-muted rounded-md text-xs", children: "console.log()" })
  ] }) });
};
var ScriptBlock2 = {
  type: "script",
  name: "Script",
  description: "Custom JavaScript code for form logic",
  icon: /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(import_lucide_react29.Terminal, { className: "w-4 h-4" }),
  defaultData: {
    type: "script",
    script: "// This script runs when the page loads\nconsole.log('Script block executed');\n\n// You can access and modify form data\n// formData.calculated = formData.input1 + formData.input2;"
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ScriptBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ScriptBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ScriptBlockPreview, {}),
  validate: (data) => {
    if (!data.script) return "Script content is required";
    return null;
  }
};

// src/components/blocks/AuthBlock.tsx
var import_react39 = __toESM(require("react"));
var import_lucide_react30 = require("lucide-react");
var import_jsx_runtime72 = require("react/jsx-runtime");
var AuthBlockForm = ({ data, onUpdate, onRemove }) => {
  const [testResults, setTestResults] = import_react39.default.useState([]);
  const [testData, setTestData] = import_react39.default.useState({
    name: "Test User",
    email: "test@example.com",
    mobile: "+1234567890",
    otp: "123456"
  });
  const [isTestingFlow, setIsTestingFlow] = import_react39.default.useState(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Settings, { className: "w-4 h-4" }),
      "Authentication Block Configuration"
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-4", children: [
      validationErrors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.AlertTriangle, { className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(AlertDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "space-y-1", children: validationErrors.map((error, index) => /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { children: [
          "\u2022 ",
          error
        ] }, index)) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Tabs, { defaultValue: "config", className: "w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(TabsList, { className: "grid w-full grid-cols-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsTrigger, { value: "config", children: "Configuration" }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsTrigger, { value: "parameters", children: "Parameters" }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsTrigger, { value: "mapping", children: "Data Mapping" }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsTrigger, { value: "testing", children: "Testing" }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsTrigger, { value: "docs", children: "API Docs" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(TabsContent, { value: "config", className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Settings, { className: "w-4 h-4" }),
              "Basic Settings"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "fieldName", children: "Field Name (for data storage)" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    id: "fieldName",
                    value: data.fieldName || "authResults",
                    onChange: (e) => handleChange("fieldName", e.target.value),
                    placeholder: "authResults"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-xs text-muted-foreground", children: "This is where the authentication data will be stored in the form results" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { className: "p-4 border-blue-200", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "flex items-center space-x-2 mb-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Checkbox,
                    {
                      id: "skipIfLoggedIn",
                      checked: !!data.skipIfLoggedIn,
                      onCheckedChange: (checked) => handleChange("skipIfLoggedIn", !!checked)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Label, { htmlFor: "skipIfLoggedIn", className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.SkipForward, { className: "w-4 h-4" }),
                    "Skip if Already Logged In"
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-sm text-blue-800", children: "When enabled, this authentication block will be automatically skipped if a valid authentication token is found in storage. This is useful for multi-step forms where users might navigate back and forth." }),
                data.skipIfLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "mt-2 p-2 bg-blue-100 rounded text-xs text-blue-700", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Note:" }),
                  " The block will only be skipped if both a valid token exists and",
                  data.validateTokenUrl ? " the token validation passes." : " no token validation URL is configured."
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "loginUrl", children: "Login URL" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "loginUrl",
                      value: data.loginUrl || "",
                      onChange: (e) => handleChange("loginUrl", e.target.value),
                      placeholder: "https://api.example.com/login"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "signupUrl", children: "Signup URL (Optional)" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "signupUrl",
                      value: data.signupUrl || "",
                      onChange: (e) => handleChange("signupUrl", e.target.value),
                      placeholder: "https://api.example.com/signup"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "tokenField", children: "Token Field Name" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "tokenField",
                      value: data.tokenField || "token",
                      onChange: (e) => handleChange("tokenField", e.target.value),
                      placeholder: "token"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "tokenStorageKey", children: "Token Storage Key" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "tokenStorageKey",
                      value: data.tokenStorageKey || "authToken",
                      onChange: (e) => handleChange("tokenStorageKey", e.target.value),
                      placeholder: "authToken"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "validateTokenUrl", children: "Token Validation URL (Optional)" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    id: "validateTokenUrl",
                    value: data.validateTokenUrl || "",
                    onChange: (e) => handleChange("validateTokenUrl", e.target.value),
                    placeholder: "https://api.example.com/validate-token"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
                  "Used to validate existing tokens when users return",
                  data.skipIfLoggedIn ? " and when skip if logged in is enabled" : ""
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { className: "p-4 bg-muted/50", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { className: "font-medium mb-3", children: "Required Fields" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Checkbox,
                      {
                        id: "requireName",
                        checked: !!data.requireName,
                        onCheckedChange: (checked) => handleChange("requireName", !!checked)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "requireName", children: "Require Name" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Checkbox,
                      {
                        id: "requireEmail",
                        checked: !!data.requireEmail,
                        onCheckedChange: (checked) => handleChange("requireEmail", !!checked)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "requireEmail", children: "Require Email" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Checkbox,
                      {
                        id: "requireMobile",
                        checked: !!data.requireMobile,
                        onCheckedChange: (checked) => handleChange("requireMobile", !!checked)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "requireMobile", children: "Require Mobile" })
                  ] })
                ] }),
                !data.requireEmail && !data.requireMobile && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Alert, { className: "mt-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.AlertTriangle, { className: "h-4 w-4" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(AlertDescription, { children: "At least one of Email or Mobile must be enabled for authentication to work" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "nameLabel", children: "Name Field Label" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "nameLabel",
                      value: data.nameLabel || "Name",
                      onChange: (e) => handleChange("nameLabel", e.target.value),
                      placeholder: "Name"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "emailLabel", children: "Email Field Label" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "emailLabel",
                      value: data.emailLabel || "Email",
                      onChange: (e) => handleChange("emailLabel", e.target.value),
                      placeholder: "Email"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "mobileLabel", children: "Mobile Field Label" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      id: "mobileLabel",
                      value: data.mobileLabel || "Mobile Number",
                      onChange: (e) => handleChange("mobileLabel", e.target.value),
                      placeholder: "Mobile Number"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Shield, { className: "w-4 h-4" }),
              "OTP Configuration"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Checkbox,
                  {
                    id: "useOtp",
                    checked: !!data.useOtp,
                    onCheckedChange: (checked) => handleChange("useOtp", !!checked)
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "useOtp", children: "Enable OTP Authentication" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-sm text-muted-foreground", children: "When enabled, users will receive verification codes instead of direct login" }),
              data.useOtp && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-4 p-4 rounded-lg", children: [
                data.requireEmail && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "sendEmailOtpUrl", children: "Send Email OTP URL" }),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Input,
                      {
                        id: "sendEmailOtpUrl",
                        value: data.sendEmailOtpUrl || "",
                        onChange: (e) => handleChange("sendEmailOtpUrl", e.target.value),
                        placeholder: "https://api.example.com/send-email-otp"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "verifyEmailOtpUrl", children: "Verify Email OTP URL" }),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Input,
                      {
                        id: "verifyEmailOtpUrl",
                        value: data.verifyEmailOtpUrl || "",
                        onChange: (e) => handleChange("verifyEmailOtpUrl", e.target.value),
                        placeholder: "https://api.example.com/verify-email-otp"
                      }
                    )
                  ] })
                ] }),
                data.requireMobile && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "sendMobileOtpUrl", children: "Send Mobile OTP URL" }),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Input,
                      {
                        id: "sendMobileOtpUrl",
                        value: data.sendMobileOtpUrl || "",
                        onChange: (e) => handleChange("sendMobileOtpUrl", e.target.value),
                        placeholder: "https://api.example.com/send-mobile-otp"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "verifyMobileOtpUrl", children: "Verify Mobile OTP URL" }),
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                      Input,
                      {
                        id: "verifyMobileOtpUrl",
                        value: data.verifyMobileOtpUrl || "",
                        onChange: (e) => handleChange("verifyMobileOtpUrl", e.target.value),
                        placeholder: "https://api.example.com/verify-mobile-otp"
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(TabsContent, { value: "parameters", className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardHeader, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Settings, { className: "w-4 h-4" }),
                "Custom Headers"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-sm text-muted-foreground", children: "Add custom headers to all API requests (e.g., X-Merchant-ID, Authorization, API-Key)." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-4", children: [
              Object.entries(data.customHeaders || {}).map(([headerKey, headerValue], index) => /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-5 gap-2 items-end", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "col-span-2 space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { className: "text-xs", children: "Header Name" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      value: headerKey,
                      onChange: (e) => handleHeaderChange(headerKey, e.target.value, headerValue),
                      placeholder: "X-Merchant-ID",
                      className: "text-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "text-center text-muted-foreground", children: ":" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { className: "text-xs", children: "Header Value" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      value: headerValue,
                      onChange: (e) => handleHeaderChange(headerKey, headerKey, e.target.value),
                      placeholder: "123",
                      className: "text-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => removeHeader(headerKey),
                    children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }, index)),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Button, { type: "button", variant: "outline", onClick: addHeader, children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Plus, { className: "w-4 h-4 mr-2" }),
                "Add Header"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Common headers:" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("ul", { className: "mt-1 space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "X-Merchant-ID" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "123" }),
                    " (for merchant identification)"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "Authorization" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "Bearer your-api-key" }),
                    " (for API authentication)"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "X-API-Key" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "your-api-key" }),
                    " (for API key authentication)"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "X-Client-Version" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "1.0.0" }),
                    " (for client version tracking)"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardHeader, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Settings, { className: "w-4 h-4" }),
                "Additional Body Parameters"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-sm text-muted-foreground", children: "Add additional parameters to the request body for all API calls." })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-4", children: [
              Object.entries(data.additionalBodyParams || {}).map(([paramKey, paramValue], index) => /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-5 gap-2 items-end", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "col-span-2 space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { className: "text-xs", children: "Parameter Name" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      value: paramKey,
                      onChange: (e) => handleBodyParamChange(paramKey, e.target.value, paramValue),
                      placeholder: "merchant_id",
                      className: "text-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "text-center text-muted-foreground", children: ":" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { className: "text-xs", children: "Parameter Value" }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                    Input,
                    {
                      value: paramValue,
                      onChange: (e) => handleBodyParamChange(paramKey, paramKey, e.target.value),
                      placeholder: "123",
                      className: "text-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => removeBodyParam(paramKey),
                    children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }, index)),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Button, { type: "button", variant: "outline", onClick: addBodyParam, children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Plus, { className: "w-4 h-4 mr-2" }),
                "Add Parameter"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Common parameters:" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("ul", { className: "mt-1 space-y-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "merchant_id" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "123" }),
                    " (for merchant identification)"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "source" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "web" }),
                    " (for request source tracking)"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "app_version" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "1.0.0" }),
                    " (for app version tracking)"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                    "\u2022 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "locale" }),
                    " \u2192 ",
                    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "en_US" }),
                    " (for localization)"
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsContent, { value: "mapping", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardHeader, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.MapPin, { className: "w-4 h-4" }),
              "API Response Data Mapping"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-sm text-muted-foreground", children: 'Map fields from your API response to form values. Use dot notation for nested values (e.g., "user.department").' })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-4", children: [
            Object.entries(data.fieldMappings || {}).map(([apiPath, formField], index) => /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-5 gap-2 items-end", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "col-span-2 space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { className: "text-xs", children: "API Response Path" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    value: apiPath,
                    onChange: (e) => handleMappingChange(apiPath, e.target.value, formField),
                    placeholder: "user.department",
                    className: "text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "text-center text-muted-foreground", children: "\u2192" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { className: "text-xs", children: "Form Field" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    value: formField,
                    onChange: (e) => handleMappingChange(apiPath, apiPath, e.target.value),
                    placeholder: "department",
                    className: "text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => removeMapping(apiPath),
                  children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Trash2, { className: "w-4 h-4" })
                }
              )
            ] }, index)),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Button, { type: "button", variant: "outline", onClick: addMapping, children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.Plus, { className: "w-4 h-4 mr-2" }),
              "Add Mapping"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Example mappings:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("ul", { className: "mt-1 space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                  "\u2022 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "user.id" }),
                  " \u2192 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "userId" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                  "\u2022 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "user.department" }),
                  " \u2192 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "department" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                  "\u2022 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "subscription.tier" }),
                  " \u2192 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "userTier" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("li", { children: [
                  "\u2022 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "metadata.role" }),
                  " \u2192 ",
                  /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("code", { children: "userRole" })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsContent, { value: "testing", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { className: "max-w-2xl", children: [
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.TestTube, { className: "w-4 h-4" }),
            "API Testing"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "grid grid-cols-4 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "testName", children: "Test Name" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    id: "testName",
                    value: testData.name,
                    onChange: (e) => setTestData((prev) => ({ ...prev, name: e.target.value })),
                    placeholder: "Test User"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "testEmail", children: "Test Email" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    id: "testEmail",
                    value: testData.email,
                    onChange: (e) => setTestData((prev) => ({ ...prev, email: e.target.value })),
                    placeholder: "test@example.com"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "testMobile", children: "Test Mobile" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    id: "testMobile",
                    value: testData.mobile,
                    onChange: (e) => setTestData((prev) => ({ ...prev, mobile: e.target.value })),
                    placeholder: "+1234567890"
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Label, { htmlFor: "testOtp", children: "Test OTP" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                  Input,
                  {
                    id: "testOtp",
                    value: testData.otp,
                    onChange: (e) => setTestData((prev) => ({ ...prev, otp: e.target.value })),
                    placeholder: "123456"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(Button, { type: "button", variant: "outline", onClick: testEndpoints, children: "Test Endpoint Reachability" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(
                Button,
                {
                  type: "button",
                  variant: "default",
                  onClick: testAuthFlow,
                  disabled: isTestingFlow || validationErrors.length > 0,
                  children: isTestingFlow ? "Testing..." : "Test Complete Auth Flow"
                }
              )
            ] }),
            validationErrors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Alert, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.AlertTriangle, { className: "h-4 w-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(AlertDescription, { children: "Please fix the configuration errors above before testing." })
            ] }),
            testResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-4 ounded", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { className: "font-medium mb-2", children: "Test Results:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "text-sm whitespace-pre-wrap font-mono max-h-96 overflow-y-auto", children: testResults.join("\n") })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(TabsContent, { value: "docs", className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(Card, { className: "max-w-2xl", children: [
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.BookOpen, { className: "w-4 h-4" }),
            "API Documentation"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(CardContent, { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "prose prose-sm max-w-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h3", { children: "Authentication Flow Overview" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-4 rounded-lg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { className: "text-blue-800 font-medium", children: "Step-by-Step User Experience:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("ol", { className: "text-blue-700 mt-2 space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "1. User enters name (if required)" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "2. User enters email (if required)" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "3. User enters mobile (if required)" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "4a. If OTP enabled: User receives and enters verification code" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "4b. If OTP disabled: Direct authentication occurs" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "5. User is authenticated and can continue" })
              ] })
            ] }),
            data.skipIfLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-4 rounded-lg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { className: "text-green-800 font-medium", children: "Skip if Logged In Behavior:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("ul", { className: "text-green-700 mt-2 space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "\u2022 If a valid token exists in storage, this block will be automatically skipped" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "\u2022 If a validation URL is configured, the token will be validated before skipping" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "\u2022 Users can still manually navigate back to this block to sign in as a different user" }),
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("li", { children: "\u2022 Forward navigation from this block will skip it again if still logged in" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { children: "1. Direct Authentication (OTP Disabled)" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Login/Signup Request:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto", children: `POST /api/login
Content-Type: application/json

{
  "email": "user@example.com", // if requireEmail is true
  "mobile": "+1234567890", // if requireMobile is true
  "name": "John Doe" // if requireName is true
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Success Response:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto", children: `{
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "mobile": "+1234567890", 
    "name": "John Doe",
    // ... other user data
  },
  "success": true
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { children: "2. OTP Authentication Flow" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Send OTP Request:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto", children: `POST /api/send-email-otp  // or /api/send-mobile-otp
Content-Type: application/json
X-Merchant-ID: 123

{
  "email": "user@example.com",     // for email OTP
  "mobile": "+1234567890",         // for mobile OTP  
  "name": "John Doe",              // optional
  "merchant_id": "123",            // additional body param (if configured)
  "source": "web"                  // additional body param (if configured)
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Verify OTP Request:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto", children: `POST /api/verify-email-otp  // or /api/verify-mobile-otp
Content-Type: application/json
X-Merchant-ID: 123

{
  "email": "user@example.com",     // for email OTP
  "mobile": "+1234567890",         // for mobile OTP
  "otp": "123456",
  "merchant_id": "123",            // additional body param (if configured)
  "source": "web"                  // additional body param (if configured)
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "OTP Verification Success Response:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto", children: `{
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "mobile": "+1234567890",
    "name": "John Doe",
    // ... other user data
  },
  "success": true
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { children: "3. Token Validation (Optional)" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Request:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto", children: `POST /api/validate-token
Content-Type: application/json
X-Merchant-ID: 123

{
  "token": "jwt_token_here",
  "merchant_id": "123",            // additional body param (if configured)
  "source": "web"                  // additional body param (if configured)
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { children: "4. Error Response Format" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "All endpoints should return errors in this format:" }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("pre", { className: "mt-2 bg-gray-800 text-red-400 p-2 rounded overflow-x-auto", children: `{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_FAILED"
}` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { children: "5. Data Storage" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "p-3 rounded text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("p", { className: "text-green-800", children: "The authentication data will be stored in the form results under the field name you specified. The stored data includes all user information, token, and mapped fields from your API response." }) }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("h4", { children: "6. Custom Headers & Body Parameters" }),
            /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-3 rounded text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("p", { className: "text-purple-800 mb-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Custom Headers:" }),
                " All configured custom headers are sent with every API request. Common use cases include merchant identification, API keys, and version tracking."
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("p", { className: "text-purple-800", children: [
                /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("strong", { children: "Additional Body Parameters:" }),
                " These parameters are automatically added to the request body of all API calls, allowing you to send additional context like merchant_id, source tracking, etc."
              ] })
            ] })
          ] }) })
        ] }) })
      ] })
    ] })
  ] }) });
};
var AuthBlockItem = ({ data }) => {
  const validationErrors = [];
  if (!data.requireEmail && !data.requireMobile) {
    validationErrors.push("Either email or mobile must be enabled");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "p-4 border rounded-md text-center text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.UserCheck, { className: "w-6 h-6 mx-auto mb-2 text-muted-foreground" }),
    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)("div", { className: "font-medium", children: "Authentication Required" }),
    /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "text-xs text-muted-foreground mt-1 space-y-1", children: [
      data.useOtp && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { children: [
        "OTP: ",
        data.requireEmail && data.requireMobile ? "Email & Mobile" : data.requireEmail ? "Email" : "Mobile"
      ] }),
      data.skipIfLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "text-blue-600 flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.SkipForward, { className: "w-3 h-3" }),
        "Skip if logged in"
      ] }),
      validationErrors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "text-red-500 flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.AlertTriangle, { className: "w-3 h-3" }),
        "Configuration needed"
      ] })
    ] })
  ] });
};
var AuthBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime72.jsxs)("div", { className: "w-full flex items-center justify-center py-1 text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.UserCheck, { className: "w-4 h-4 mr-2" }),
    " Auth"
  ] });
};
var AuthBlock2 = {
  type: "auth",
  name: "Authentication",
  description: "Step-by-step user authentication with optional OTP",
  icon: /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(import_lucide_react30.UserCheck, { className: "w-4 h-4" }),
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
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(AuthBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(AuthBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime72.jsx)(AuthBlockPreview, {}),
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
var import_react40 = require("react");
var import_lucide_react31 = require("lucide-react");
var import_uuid9 = require("uuid");
var import_jsx_runtime73 = require("react/jsx-runtime");
var SelectBlockForm = ({
  data,
  onUpdate
}) => {
  const [newLabel, setNewLabel] = (0, import_react40.useState)("");
  const [newValue, setNewValue] = (0, import_react40.useState)("");
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
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "selectField1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { htmlFor: "label", children: "Question Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { htmlFor: "placeholder", children: "Placeholder" }),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
          Input,
          {
            id: "placeholder",
            value: data.placeholder || "",
            onChange: (e) => handleChange("placeholder", e.target.value),
            placeholder: "Select an option..."
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { htmlFor: "defaultValue", children: "Default Value" }),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(
          Select,
          {
            value: data.defaultValue || "",
            onValueChange: (value) => handleChange("defaultValue", value),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectValue, { placeholder: "Select a default option" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectContent, { children: (data.labels || []).map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectItem, { value: (data.values || [])[index], children: label }, index)) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { children: "Options" }),
      /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "border rounded-md p-4 space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "space-y-4", children: (data.labels || []).map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_lucide_react31.ListFilter, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
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
            ),
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
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
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => handleRemoveOption(index),
              className: "text-destructive",
              children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_lucide_react31.CircleX, { className: "h-4 w-4" })
            }
          )
        ] }, index)) }),
        /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "pt-2 border-t mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "flex items-center gap-2 mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_lucide_react31.CirclePlus, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
              Input,
              {
                value: newLabel,
                onChange: (e) => setNewLabel(e.target.value),
                placeholder: "New option label"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
              Input,
              {
                value: newValue,
                onChange: (e) => setNewValue(e.target.value),
                placeholder: "New option value (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: handleAddOption,
              children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_lucide_react31.CirclePlus, { className: "h-4 w-4 text-primary" })
            }
          )
        ] }) })
      ] })
    ] })
  ] });
};
var SelectBlockItem = ({
  data
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)("div", { className: "space-y-2", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Label, { htmlFor: data.fieldName, children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime73.jsxs)(Select, { defaultValue: data.defaultValue, children: [
      /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectTrigger, { id: data.fieldName, children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectValue, { placeholder: data.placeholder || "Select an option..." }) }),
      /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectContent, { children: (data.labels || []).map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectItem, { value: (data.values || [])[index], children: label }, index)) })
    ] })
  ] });
};
var SelectBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime73.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(Select, { disabled: true, children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectTrigger, { className: "w-4/5 max-w-full", children: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectValue, { placeholder: "Dropdown select" }) }) }) });
};
var SelectBlock2 = {
  type: "select",
  name: "Dropdown Select",
  description: "Single selection from a dropdown list",
  icon: /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(import_lucide_react31.ListFilter, { className: "w-4 h-4" }),
  defaultData: {
    type: "select",
    fieldName: `select${(0, import_uuid9.v4)().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    placeholder: "Choose from the list...",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: ""
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime73.jsx)(SelectBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/RangeBlock.tsx
var import_react41 = __toESM(require("react"));
var import_lucide_react32 = require("lucide-react");
var import_uuid10 = require("uuid");
var import_jsx_runtime74 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "rangeField1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "label", children: "Question Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "min", children: "Minimum Value" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "min",
            type: "number",
            value: data.min || "0",
            onChange: (e) => handleChange("min", parseInt(e.target.value, 10))
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "max", children: "Maximum Value" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "max",
            type: "number",
            value: data.max || "100",
            onChange: (e) => handleChange("max", parseInt(e.target.value, 10))
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "step", children: "Step" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "step",
            type: "number",
            value: data.step || "1",
            onChange: (e) => handleChange("step", parseInt(e.target.value, 10))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "defaultValue", children: "Default Value" }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("div", { className: "pt-4", children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
        Slider,
        {
          id: "defaultValue",
          min: parseInt(String(data.min || "0"), 10),
          max: parseInt(String(data.max || "100"), 10),
          step: parseInt(String(data.step || "1"), 10),
          value: [data.defaultValue !== void 0 ? Number(data.defaultValue) : parseInt(String(data.min || "0"), 10)],
          onValueChange: (values) => handleChange("defaultValue", values[0])
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "flex justify-between mt-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("span", { children: data.min || 0 }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("span", { children: [
          "Current: ",
          data.defaultValue !== void 0 ? data.defaultValue : data.min || 0
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("span", { children: data.max || 100 })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "showValue", children: "Value Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "showValue",
            value: data.showValue || "Selected: {value}",
            onChange: (e) => handleChange("showValue", e.target.value),
            placeholder: "Value: {value}"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
          "Use ",
          "{value}",
          " to show the selected value"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: "markStep", children: "Show Marks Every" }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
          Input,
          {
            id: "markStep",
            type: "number",
            value: data.markStep || "0",
            onChange: (e) => handleChange("markStep", parseInt(e.target.value, 10)),
            placeholder: "0"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("p", { className: "text-xs text-muted-foreground", children: "Set to 0 to hide marks, or specify an interval" })
      ] })
    ] })
  ] });
};
var RangeBlockItem = ({
  data
}) => {
  const [value, setValue] = import_react41.default.useState(
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
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("div", { className: "absolute text-xs -translate-x-1/2", style: { left: `${(i - min) / (max - min) * 100}%`, top: "20px" }, children: i }, i)
      );
    }
  }
  const valueDisplay = data.showValue ? data.showValue.replace("{value}", String(value)) : `Value: ${value}`;
  return /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "space-y-4", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(Label, { htmlFor: data.fieldName, children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "pt-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
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
      ),
      marks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("div", { className: "relative h-6 mt-1", children: marks }),
      /* @__PURE__ */ (0, import_jsx_runtime74.jsxs)("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("span", { children: min }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("span", { className: "font-medium text-primary", children: valueDisplay }),
        /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("span", { children: max })
      ] })
    ] })
  ] });
};
var RangeBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(
    Slider,
    {
      value: [50],
      max: 100,
      step: 1,
      disabled: true,
      className: "w-4/5 max-w-full"
    }
  ) });
};
var RangeBlock2 = {
  type: "range",
  name: "Range Slider",
  description: "Slider for selecting numeric values within a range",
  icon: /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(import_lucide_react32.ArrowRightToLine, { className: "w-4 h-4" }),
  defaultData: {
    type: "range",
    fieldName: `range${(0, import_uuid10.v4)().substring(0, 4)}`,
    label: "Select a value",
    description: "",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    showValue: "Selected: {value}",
    markStep: 25
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(RangeBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(RangeBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime74.jsx)(RangeBlockPreview, {}),
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
var import_react42 = __toESM(require("react"));
var import_lucide_react33 = require("lucide-react");
var import_uuid11 = require("uuid");

// src/components/ui/switch.tsx
var import_jsx_runtime75 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime75.jsxs)("div", { className: cn("relative inline-flex h-5 w-9 flex-shrink-0 items-center", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
      "input",
      {
        type: "checkbox",
        id,
        checked,
        onChange: handleChange,
        className: "peer sr-only",
        ...props
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(
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
    )
  ] });
};

// src/components/blocks/DatePickerBlock.tsx
var import_jsx_runtime76 = require("react/jsx-runtime");
var formatDate2 = (date, format2 = "PPP") => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  if (format2 === "PP") {
    options.month = "short";
  } else if (format2 === "P") {
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
  const formattedDate = defaultDate ? formatDate2(defaultDate, "PPP") : "No default date";
  return /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "dateField1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "label", children: "Question Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "placeholder", children: "Placeholder" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "placeholder",
            value: data.placeholder || "",
            onChange: (e) => handleChange("placeholder", e.target.value),
            placeholder: "Select a date..."
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "dateFormat", children: "Date Format" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "dateFormat",
            value: data.dateFormat || "",
            onChange: (e) => handleChange("dateFormat", e.target.value),
            placeholder: "PPP (e.g., April 29, 2025)"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("p", { className: "text-xs text-muted-foreground", children: "Format pattern: PPP, PP, or P" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "defaultValue", children: "Default Value" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(PopoverRoot, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(
            Button,
            {
              type: "button",
              variant: "outline",
              className: cn(
                "w-full justify-start text-left font-normal",
                !defaultDate && "text-muted-foreground"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_lucide_react33.CalendarIcon, { className: "mr-2 h-4 w-4" }),
                formattedDate
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(PopoverContent, { children: /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
            Calendar,
            {
              selected: defaultDate,
              onSelect: handleDateChange
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("div", { className: "space-y-2 pt-6", children: /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Switch,
          {
            id: "showCalendarOnFocus",
            checked: data.showCalendarOnFocus === true,
            onCheckedChange: (checked) => handleChange("showCalendarOnFocus", checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "showCalendarOnFocus", children: "Show calendar on input focus" })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "minDate", children: "Minimum Date" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "minDate",
            type: "date",
            value: data.minDate || "",
            onChange: (e) => handleChange("minDate", e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "maxDate", children: "Maximum Date" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "maxDate",
            type: "date",
            value: data.maxDate || "",
            onChange: (e) => handleChange("maxDate", e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: "disabledDays", children: "Disabled Days" }),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
          Input,
          {
            id: "disabledDays",
            placeholder: "0,6 (Sun,Sat)",
            value: data.disabledDays || "",
            onChange: (e) => handleChange("disabledDays", e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("p", { className: "text-xs text-muted-foreground", children: "Comma-separated days (0=Sun, 6=Sat)" })
      ] })
    ] })
  ] });
};
var DatePickerBlockItem = ({
  data
}) => {
  const [date, setDate] = import_react42.default.useState(
    data.defaultValue ? new Date(data.defaultValue) : void 0
  );
  const [isOpen, setIsOpen] = import_react42.default.useState(false);
  const formatSelectedDate = (date2) => {
    try {
      return formatDate2(date2, data.dateFormat || "PPP");
    } catch (e) {
      return formatDate2(date2, "PPP");
    }
  };
  const disabledDays = import_react42.default.useMemo(() => {
    if (!data.disabledDays) return void 0;
    try {
      return data.disabledDays.split(",").map((d) => parseInt(d.trim(), 10));
    } catch (e) {
      return void 0;
    }
  }, [data.disabledDays]);
  const dateConstraints = import_react42.default.useMemo(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)("div", { className: "space-y-2", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(Label, { htmlFor: data.fieldName, children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(PopoverRoot, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(
        Button,
        {
          type: "button",
          id: data.fieldName,
          variant: "outline",
          className: cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_lucide_react33.CalendarIcon, { className: "mr-2 h-4 w-4" }),
            date ? formatSelectedDate(date) : data.placeholder || "Select a date"
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(PopoverContent, { children: /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(
        Calendar,
        {
          selected: date,
          onSelect: setDate,
          disabled: dateConstraints,
          disableWeekdays: disabledDays
        }
      ) })
    ] })
  ] });
};
var DatePickerBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime76.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(
    Button,
    {
      type: "button",
      variant: "outline",
      className: "w-4/5 max-w-full justify-start text-left font-normal text-muted-foreground",
      disabled: true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_lucide_react33.CalendarIcon, { className: "mr-2 h-4 w-4" }),
        "Date picker"
      ]
    }
  ) });
};
var DatePickerBlock2 = {
  type: "datepicker",
  name: "Date Picker",
  description: "Calendar component for selecting a date",
  icon: /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(import_lucide_react33.Calendar, { className: "w-4 h-4" }),
  defaultData: {
    type: "datepicker",
    fieldName: `date${(0, import_uuid11.v4)().substring(0, 4)}`,
    label: "Select a date",
    description: "",
    placeholder: "Pick a date",
    dateFormat: "PPP",
    showCalendarOnFocus: true,
    minDate: "",
    maxDate: "",
    disabledDays: ""
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(DatePickerBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(DatePickerBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(DatePickerBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/FileUploadBlock.tsx
var import_react43 = __toESM(require("react"));
var import_lucide_react34 = require("lucide-react");
var import_uuid12 = require("uuid");
var import_jsx_runtime77 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "fileUpload1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "label", children: "Question Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Your question here?"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("p", { className: "text-xs text-muted-foreground", children: "Question or prompt shown to the respondent" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "acceptedFileTypes", children: "Accepted File Types" }),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          Input,
          {
            id: "acceptedFileTypes",
            value: (data.acceptedFileTypes || []).join(", "),
            onChange: (e) => handleFileExtensions(e.target.value),
            placeholder: ".jpg, .png, .pdf"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("p", { className: "text-xs text-muted-foreground", children: "Comma-separated file extensions" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "maxFileSize", children: "Maximum File Size (MB)" }),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          Input,
          {
            id: "maxFileSize",
            type: "number",
            value: data.maxFileSize || "5",
            onChange: (e) => handleChange("maxFileSize", e.target.value),
            min: "0.1",
            step: "0.1"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "maxFiles", children: "Maximum Files" }),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          Input,
          {
            id: "maxFiles",
            type: "number",
            value: data.maxFiles || "1",
            onChange: (e) => handleChange("maxFiles", e.target.value),
            min: "1",
            step: "1"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { className: "space-y-2 pt-6", children: /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
          Checkbox,
          {
            id: "showPreview",
            checked: data.showPreview === true,
            onCheckedChange: (checked) => handleChange("showPreview", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "showPreview", children: "Show previews for images" })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "helpText", children: "Upload Instructions" }),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
        Input,
        {
          id: "helpText",
          value: data.helpText || "",
          onChange: (e) => handleChange("helpText", e.target.value),
          placeholder: "Drag and drop files here or click to browse"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { className: "space-y-2 pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
        Checkbox,
        {
          id: "required",
          checked: data.required === true,
          onCheckedChange: (checked) => handleChange("required", !!checked)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: "required", children: "Required" })
    ] }) })
  ] });
};
var FileUploadBlockItem = ({
  data
}) => {
  var _a;
  const fileInputRef = import_react43.default.useRef(null);
  const [files, setFiles] = import_react43.default.useState([]);
  const [isDragging, setIsDragging] = import_react43.default.useState(false);
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
      return /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(
        "div",
        {
          className: "flex items-center gap-2 p-2 rounded-md border bg-card mt-2",
          children: [
            showPreview && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { className: "w-10 h-10 flex-shrink-0 rounded overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
              "img",
              {
                src: URL.createObjectURL(file),
                alt: file.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "flex-grow truncate", children: [
              /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("p", { className: "text-sm font-medium truncate", children: file.name }),
              /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
                (file.size / 1024).toFixed(1),
                " KB"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => handleRemoveFile(index),
                className: "flex-shrink-0",
                children: /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_lucide_react34.X, { className: "h-4 w-4" })
              }
            )
          ]
        },
        index
      );
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "space-y-2", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(Label, { htmlFor: data.fieldName, children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(
      "div",
      {
        className: `border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"}`,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onClick: () => {
          var _a2;
          return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_lucide_react34.FileUp, { className: "mx-auto h-10 w-10 text-muted-foreground mb-2" }),
          /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("p", { className: "text-sm font-medium mb-1", children: data.helpText || "Drag and drop files here or click to browse" }),
          /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("p", { className: "text-xs text-muted-foreground", children: [
            data.acceptedFileTypes && data.acceptedFileTypes.length > 0 ? `Accepted formats: ${data.acceptedFileTypes.join(", ")}` : "All file formats accepted",
            data.maxFileSize && ` \u2022 Max size: ${data.maxFileSize} MB`,
            data.maxFiles && parseInt(String(data.maxFiles), 10) > 1 && ` \u2022 Max files: ${data.maxFiles}`
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(
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
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { className: "mt-4 space-y-1", children: renderFilePreviews() })
  ] });
};
var FileUploadBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)("div", { className: "flex items-center border rounded px-3 py-2 w-4/5 max-w-full text-muted-foreground", children: [
    /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_lucide_react34.Upload, { className: "w-4 h-4 mr-2" }),
    /* @__PURE__ */ (0, import_jsx_runtime77.jsx)("span", { className: "text-sm", children: "File upload" })
  ] }) });
};
var FileUploadBlock2 = {
  type: "fileupload",
  name: "File Upload",
  description: "Component for uploading files",
  icon: /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(import_lucide_react34.Upload, { className: "w-4 h-4" }),
  defaultData: {
    type: "fileupload",
    fieldName: `file${(0, import_uuid12.v4)().substring(0, 4)}`,
    label: "Upload files",
    description: "",
    acceptedFileTypes: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: "5",
    maxFiles: "1",
    helpText: "Drag and drop files here or click to browse",
    showPreview: true,
    required: false
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(FileUploadBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(FileUploadBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(FileUploadBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  }
};

// src/components/blocks/MatrixBlock.tsx
var import_react44 = __toESM(require("react"));
var import_lucide_react35 = require("lucide-react");
var import_uuid13 = require("uuid");
var import_jsx_runtime78 = require("react/jsx-runtime");
var MatrixBlockForm = ({
  data,
  onUpdate
}) => {
  const [newQuestionText, setNewQuestionText] = (0, import_react44.useState)("");
  const [newOptionText, setNewOptionText] = (0, import_react44.useState)("");
  const [newOptionValue, setNewOptionValue] = (0, import_react44.useState)("");
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
        id: (0, import_uuid13.v4)(),
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
        id: (0, import_uuid13.v4)(),
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
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "matrixField1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Label, { htmlFor: "label", children: "Matrix Title" }),
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Rate the following items"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Label, { htmlFor: "description", children: "Description/Help Text" }),
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-2 border rounded-md p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Label, { children: "Rows (Questions)" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-3", children: [
        questions.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("span", { className: "text-xs text-muted-foreground", children: index + 1 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "flex-grow", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
            Input,
            {
              value: question.text,
              onChange: (e) => handleUpdateQuestion(index, e.target.value),
              placeholder: "Question text"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => handleRemoveQuestion(index),
              className: "text-destructive",
              children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.CircleX, { className: "h-4 w-4" })
            }
          )
        ] }, question.id)),
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "pt-2 border-t", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.CirclePlus, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "flex-grow", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
            Input,
            {
              value: newQuestionText,
              onChange: (e) => setNewQuestionText(e.target.value),
              placeholder: "Add new question",
              onKeyDown: (e) => e.key === "Enter" && handleAddQuestion()
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: handleAddQuestion,
              children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.CirclePlus, { className: "h-4 w-4 text-primary" })
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-2 border rounded-md p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Label, { children: "Columns (Answer Options)" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-3", children: [
        options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("span", { className: "text-xs text-muted-foreground", children: index + 1 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
              Input,
              {
                value: option.text,
                onChange: (e) => handleUpdateOption(index, "text", e.target.value),
                placeholder: "Option label"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
              Input,
              {
                value: option.value,
                onChange: (e) => handleUpdateOption(index, "value", e.target.value),
                placeholder: "Option value"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => handleRemoveOption(index),
              className: "text-destructive",
              children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.CircleX, { className: "h-4 w-4" })
            }
          )
        ] }, option.id)),
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "pt-2 border-t", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.CirclePlus, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
              Input,
              {
                value: newOptionText,
                onChange: (e) => setNewOptionText(e.target.value),
                placeholder: "New option label"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
              Input,
              {
                value: newOptionValue,
                onChange: (e) => setNewOptionValue(e.target.value),
                placeholder: "New option value (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: handleAddOption,
              children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.CirclePlus, { className: "h-4 w-4 text-primary" })
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(Label, { htmlFor: "columnHeader", children: "Column Header (Optional)" }),
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
        Input,
        {
          id: "columnHeader",
          value: data.columnHeader || "",
          onChange: (e) => handleChange("columnHeader", e.target.value),
          placeholder: "Rating"
        }
      )
    ] })
  ] });
};
var MatrixBlockItem = ({
  data
}) => {
  const [responses, setResponses] = import_react44.default.useState({});
  const questions = data.questions || [];
  const options = data.options || [];
  const handleSelect = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "space-y-4", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("h3", { className: "text-lg font-medium", children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "border rounded-md overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(TableHead, { className: "w-[250px]" }),
        options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(TableHead, { className: "text-center whitespace-nowrap", children: option.text }, option.id))
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(TableBody, { children: questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
        RadioGroup,
        {
          asChild: true,
          value: responses[question.id] || "",
          onValueChange: (value) => handleSelect(question.id, value),
          children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)(TableRow, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(TableCell, { className: "font-medium", children: question.text }),
            options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(TableCell, { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(
              RadioGroupItem,
              {
                value: option.value,
                id: `${data.fieldName}-${question.id}-${option.id}`,
                className: "mx-auto"
              }
            ) }, option.id))
          ] })
        },
        question.id
      )) })
    ] }) })
  ] });
};
var MatrixBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime78.jsxs)("div", { className: "w-4/5 max-w-full h-10 border rounded-md flex items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.Grid3X3, { className: "w-4 h-4 mr-2 text-muted-foreground" }),
    /* @__PURE__ */ (0, import_jsx_runtime78.jsx)("span", { className: "text-sm text-muted-foreground", children: "Matrix grid" })
  ] }) });
};
var MatrixBlock2 = {
  type: "matrix",
  name: "Matrix / Grid",
  description: "Grid of questions with the same response options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(import_lucide_react35.Grid3X3, { className: "w-4 h-4" }),
  defaultData: {
    type: "matrix",
    fieldName: `matrix${(0, import_uuid13.v4)().substring(0, 4)}`,
    label: "Please rate the following items",
    description: "Select one option for each row",
    columnHeader: "Rating",
    questions: [
      { id: (0, import_uuid13.v4)(), text: "Item 1" },
      { id: (0, import_uuid13.v4)(), text: "Item 2" },
      { id: (0, import_uuid13.v4)(), text: "Item 3" }
    ],
    options: [
      { id: (0, import_uuid13.v4)(), text: "Poor", value: "1" },
      { id: (0, import_uuid13.v4)(), text: "Fair", value: "2" },
      { id: (0, import_uuid13.v4)(), text: "Good", value: "3" },
      { id: (0, import_uuid13.v4)(), text: "Excellent", value: "4" }
    ]
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(MatrixBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(MatrixBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime78.jsx)(MatrixBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Matrix title is required";
    if (!data.questions || data.questions.length === 0) return "At least one question is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/SelectableBoxQuestionBlock.tsx
var import_react45 = __toESM(require("react"));
var import_lucide_react36 = require("lucide-react");
var import_uuid14 = require("uuid");
var import_jsx_runtime79 = require("react/jsx-runtime");
var SelectableBoxQuestionForm = ({
  data,
  onUpdate
}) => {
  const [newOptionLabel, setNewOptionLabel] = (0, import_react45.useState)("");
  const [newOptionValue, setNewOptionValue] = (0, import_react45.useState)("");
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
        id: (0, import_uuid14.v4)(),
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
  return /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "selectBox1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing responses" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { htmlFor: "label", children: "Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "What's your goal?"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { htmlFor: "description", children: "Description/Help Text (Optional)" }),
      /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Additional information about this question"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2 border rounded-md p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { children: "Selectable Options" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-3", children: [
        options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("span", { className: "text-xs text-muted-foreground", children: index + 1 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
              Input,
              {
                value: option.label,
                onChange: (e) => handleUpdateOption(index, "label", e.target.value),
                placeholder: "Option label"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
              Input,
              {
                value: option.value,
                onChange: (e) => handleUpdateOption(index, "value", e.target.value),
                placeholder: "Option value"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => handleRemoveOption(index),
              className: "text-destructive",
              children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react36.CircleX, { className: "h-4 w-4" })
            }
          )
        ] }, option.id)),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "pt-2 border-t", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "w-6 h-6 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react36.CirclePlus, { className: "h-4 w-4 text-muted-foreground" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex-grow grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
              Input,
              {
                value: newOptionLabel,
                onChange: (e) => setNewOptionLabel(e.target.value),
                placeholder: "New option label",
                onKeyDown: (e) => e.key === "Enter" && handleAddOption()
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
              Input,
              {
                value: newOptionValue,
                onChange: (e) => setNewOptionValue(e.target.value),
                placeholder: "New option value (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: handleAddOption,
              children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react36.CirclePlus, { className: "h-4 w-4 text-primary" })
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2 pt-2 border-t", children: [
      /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { children: "Visual Settings" }),
      /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { htmlFor: "boxSpacing", children: "Spacing Between Boxes" }),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
            Input,
            {
              id: "boxSpacing",
              type: "number",
              min: "0",
              max: "8",
              value: data.boxSpacing || "4",
              onChange: (e) => handleChange("boxSpacing", e.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("p", { className: "text-xs text-muted-foreground", children: "Space between selectable boxes (0-8)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { htmlFor: "defaultValue", children: "Default Selected Value (Optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
            Input,
            {
              id: "defaultValue",
              value: data.defaultValue || "",
              onChange: (e) => handleChange("defaultValue", e.target.value),
              placeholder: "Leave blank for no default selection"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(Label, { htmlFor: "showSelectionIndicator", children: "Selection Style" }),
        /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
            "input",
            {
              type: "checkbox",
              id: "showSelectionIndicator",
              checked: data.showSelectionIndicator !== false,
              onChange: (e) => handleChange("showSelectionIndicator", e.target.checked),
              className: "rounded border-gray-300 text-primary focus:ring-primary"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("label", { htmlFor: "showSelectionIndicator", className: "text-sm", children: "Show selection indicator icon" })
        ] })
      ] })
    ] })
  ] });
};
var SelectableBoxQuestionItem = ({
  data
}) => {
  const [selectedValue, setSelectedValue] = import_react45.default.useState(data.defaultValue || "");
  const idPrefix = (0, import_react45.useId)();
  const options = data.options || [];
  const boxSpacing = data.boxSpacing || "4";
  const showSelectionIndicator = data.showSelectionIndicator !== false;
  return /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "space-y-4", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("h3", { className: "text-2xl font-bold", children: data.label }),
    data.description && /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description }),
    /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
      RadioGroup,
      {
        value: selectedValue,
        onValueChange: setSelectedValue,
        className: `space-y-${boxSpacing}`,
        children: options.map((option) => {
          const isSelected = selectedValue === option.value;
          return /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
              RadioGroupItem,
              {
                value: option.value,
                id: `${idPrefix}-${data.fieldName}-${option.id}`,
                className: "sr-only"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
              Label,
              {
                htmlFor: `${idPrefix}-${data.fieldName}-${option.id}`,
                className: "block w-full cursor-pointer",
                children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(
                  Card,
                  {
                    className: `p-4 transition-colors ${isSelected ? "border-primary bg-primary/5 dark:bg-primary/20" : "hover:bg-accent dark:hover:bg-accent/50"}`,
                    children: /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("span", { className: "text-foreground", children: option.label }),
                      isSelected && showSelectionIndicator && /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react36.CheckSquare, { className: "h-3 w-3" }) })
                    ] })
                  }
                )
              }
            )
          ] }, option.id);
        })
      }
    )
  ] });
};
var SelectableBoxQuestionPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("div", { className: "w-full flex items-center justify-center py-1", children: /* @__PURE__ */ (0, import_jsx_runtime79.jsxs)("div", { className: "w-4/5 max-w-full h-10 border rounded-md flex items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react36.CheckSquare, { className: "w-4 h-4 mr-2 text-muted-foreground" }),
    /* @__PURE__ */ (0, import_jsx_runtime79.jsx)("span", { className: "text-sm text-muted-foreground", children: "Selectable Box Question" })
  ] }) });
};
var SelectableBoxQuestionBlock2 = {
  type: "selectablebox",
  name: "Selectable Box Question",
  description: "Question with selectable box options",
  icon: /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(import_lucide_react36.CheckSquare, { className: "w-4 h-4" }),
  defaultData: {
    type: "selectablebox",
    fieldName: `boxq${(0, import_uuid14.v4)().substring(0, 4)}`,
    label: "What's your goal?",
    description: "",
    boxSpacing: "4",
    defaultValue: "",
    showSelectionIndicator: true,
    options: [
      { id: (0, import_uuid14.v4)(), label: "Lose 5 to 20 lbs", value: "5-20" },
      { id: (0, import_uuid14.v4)(), label: "Lose 21 to 50 lbs", value: "21-50" },
      { id: (0, import_uuid14.v4)(), label: "Lose 51+ lbs", value: "51+" },
      { id: (0, import_uuid14.v4)(), label: "I'm not sure yet", value: "unsure" }
    ]
  },
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(SelectableBoxQuestionItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(SelectableBoxQuestionForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime79.jsx)(SelectableBoxQuestionPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  }
};

// src/components/blocks/BMICalculatorBlock.tsx
var import_react46 = __toESM(require("react"));
var import_lucide_react37 = require("lucide-react");
var import_jsx_runtime80 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "label", children: "Label" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
        Input,
        {
          id: "label",
          value: data.label || "",
          onChange: (e) => handleChange("label", e.target.value),
          placeholder: "BMI Calculator"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "description", children: "Description" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
        Textarea,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Calculate your Body Mass Index",
          rows: 3
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
        Input,
        {
          id: "fieldName",
          value: data.fieldName || "",
          onChange: (e) => handleChange("fieldName", e.target.value),
          placeholder: "bmiResult"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("p", { className: "text-xs text-muted-foreground", children: "The name of the field to store the BMI results" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "defaultUnit", children: "Default Unit System" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Select, { value: data.defaultUnit || "metric", onValueChange: (value) => handleChange("defaultUnit", value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectValue, { placeholder: "Select default unit system" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectItem, { value: "metric", children: "Metric (cm, kg)" }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectItem, { value: "imperial", children: "Imperial (ft/in, lbs)" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "theme", children: "Theme" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Select, { value: data.theme || "default", onValueChange: (value) => handleChange("theme", value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectValue, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectItem, { value: "default", children: "Default" }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectItem, { value: "minimal", children: "Minimal" }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectItem, { value: "gradient", children: "Gradient" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "className", children: "CSS Class Names" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
        Input,
        {
          id: "className",
          value: data.className || "",
          onChange: (e) => handleChange("className", e.target.value),
          placeholder: "custom-bmi-calculator"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
        Checkbox,
        {
          id: "showResults",
          checked: !!data.showResults,
          onCheckedChange: (checked) => {
            handleChange("showResults", !!checked);
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Label, { htmlFor: "showResults", children: "Show results?" })
    ] })
  ] });
};
var BMICalculatorItem = ({
  data,
  onUpdate
}) => {
  const [unitSystem, setUnitSystem] = (0, import_react46.useState)(data.defaultUnit || "metric");
  const [height, setHeight] = (0, import_react46.useState)(unitSystem === "metric" ? 170 : 70);
  const [weight, setWeight] = (0, import_react46.useState)(unitSystem === "metric" ? 70 : 150);
  const getImperialHeight = () => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return { feet, inches };
  };
  const setImperialHeight = (feet, inches) => {
    setHeight(feet * 12 + inches);
  };
  const calculateBMI2 = () => {
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
  const bmi = calculateBMI2();
  const bmiData = getBMIData(bmi);
  const imperialHeight = getImperialHeight();
  import_react46.default.useEffect(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Card, { className: getCardClassName(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(CardHeader, { className: "text-center pb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(CardTitle, { className: "flex items-center justify-center gap-3 text-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: `p-2 rounded-full bg-gradient-to-r ${bmiData.color}`, children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Activity, { className: "w-6 h-6 text-white" }) }),
        data.label || "BMI Calculator"
      ] }),
      data.description && /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("p", { className: "text-muted-foreground max-w-md mx-auto", children: data.description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(CardContent, { className: "space-y-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Tabs, { value: unitSystem, onValueChange: (value) => {
        setUnitSystem(value);
        if (value === "metric") {
          setHeight(170);
          setWeight(70);
        } else {
          setHeight(70);
          setWeight(150);
        }
      }, className: "w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(TabsList, { className: "grid w-full grid-cols-2 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(TabsTrigger, { value: "metric", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Ruler, { className: "w-4 h-4" }),
            "Metric"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(TabsTrigger, { value: "imperial", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Weight, { className: "w-4 h-4" }),
            "Imperial"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(TabsContent, { value: "metric", className: "space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Ruler, { className: "w-4 h-4 text-muted-foreground" }),
              "Height (cm)"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
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
              ),
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "cm" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Weight, { className: "w-4 h-4 text-muted-foreground" }),
              "Weight (kg)"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
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
              ),
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "kg" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(TabsContent, { value: "imperial", className: "space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Ruler, { className: "w-4 h-4 text-muted-foreground" }),
              "Height"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(
                Select,
                {
                  value: imperialHeight.feet.toString(),
                  onValueChange: (value) => setImperialHeight(parseInt(value), imperialHeight.inches),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectTrigger, { className: "h-14", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectValue, {}) }),
                    /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectContent, { children: [3, 4, 5, 6, 7, 8].map((ft) => /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(SelectItem, { value: ft.toString(), children: [
                      ft,
                      "'"
                    ] }, ft)) })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(
                Select,
                {
                  value: imperialHeight.inches.toString(),
                  onValueChange: (value) => setImperialHeight(imperialHeight.feet, parseInt(value)),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectTrigger, { className: "h-14", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectValue, {}) }),
                    /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(SelectContent, { children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(SelectItem, { value: i.toString(), children: [
                      i,
                      '"'
                    ] }, i)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)(Label, { className: "text-base font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Weight, { className: "w-4 h-4 text-muted-foreground" }),
              "Weight (lbs)"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(
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
              ),
              /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: "lbs" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Separator2, {}),
      data.showResults ? /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: `space-y-6 p-6 rounded-xl border-2 ${bmiData.bgColor}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.TrendingUp, { className: "w-5 h-5 text-muted-foreground" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide", children: "Your BMI Score" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: `text-5xl font-bold bg-gradient-to-r ${bmiData.color} bg-clip-text text-transparent`, children: bmi.toFixed(1) }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Badge, { variant: "secondary", className: `px-4 py-1 text-sm font-medium ${bmiData.textColor} bg-white/80`, children: bmiData.category })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "flex justify-between text-xs font-medium text-muted-foreground px-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "Underweight" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "Normal" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "Overweight" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "Obese" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Progress, { value: bmiData.progress, className: "h-3 bg-white/50" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "absolute top-0 left-0 h-3 w-full bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-400 rounded-full opacity-20" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "flex justify-between text-xs text-muted-foreground px-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "<18.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "18.5-24.9" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "25-29.9" }),
            /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "\u226530" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("p", { className: `text-sm font-medium ${bmiData.textColor}`, children: bmiData.advice }) })
      ] }) : null
    ] })
  ] });
};
var BMICalculatorPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "w-full flex items-center justify-center py-4", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "text-center space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "p-2 rounded-full bg-gradient-to-r from-green-500 to-green-600", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Activity, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { className: "font-semibold", children: "BMI Calculator" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsxs)("div", { className: "space-y-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent", children: "23.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(Badge, { variant: "secondary", className: "text-xs", children: "Normal Weight" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("div", { className: "flex gap-2 justify-center text-xs text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("span", { children: "Height \u2022 Weight \u2022 BMI" }) })
  ] }) });
};
var BMICalculatorBlock = {
  type: "bmiCalculator",
  name: "BMI Calculator",
  description: "Modern BMI calculator with sleek design and intuitive controls",
  icon: /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(import_lucide_react37.Activity, { className: "w-4 h-4" }),
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
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(BMICalculatorItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(BMICalculatorForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime80.jsx)(BMICalculatorPreview, {}),
  validate: (data) => {
    if (!data.label) return "Label is required";
    if (!data.fieldName) return "Field name is required";
    return null;
  }
};

// src/components/blocks/CalculatedFieldBlock.tsx
var import_react47 = require("react");
var import_lucide_react38 = require("lucide-react");
var import_jsx_runtime81 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "label", children: "Label" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "label",
          value: data.label || "",
          onChange: (e) => handleChange("label", e.target.value),
          placeholder: "Calculated Result"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "description", children: "Description" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Textarea,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "This field is automatically calculated",
          rows: 3
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "fieldName",
          value: data.fieldName || "",
          onChange: (e) => handleChange("fieldName", e.target.value),
          placeholder: "calculatedResult"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "The name of the field to store the calculated value" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "formula", children: "Formula" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
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
      ),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "Full JavaScript code block. Can return numbers, strings, or complex objects. Use field names as variables." }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "text-xs text-muted-foreground bg-muted p-3 rounded space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("strong", { children: "Examples:" }),
        /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("strong", { children: "Simple calculation:" }),
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("code", { className: "block mt-1 p-2 bg-background rounded", children: "return height * weight / 10000;" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("strong", { children: "Conditional logic:" }),
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("code", { className: "block mt-1 p-2 bg-background rounded text-xs whitespace-pre", children: `if (!income) return "No data";
if (income > 100000) return "High earner";
return "Standard";` })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("strong", { children: "Complex object access:" }),
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("code", { className: "block mt-1 p-2 bg-background rounded text-xs whitespace-pre", children: `if (!bmiCalculator?.bmi) return "Incomplete";
const bmi = bmiCalculator.bmi;
return bmi > 25 ? "Overweight" : "Normal";` })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "dependencies", children: "Dependencies" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "dependencies",
          value: ((_a = data.dependencies) == null ? void 0 : _a.join(", ")) || "",
          onChange: (e) => handleDependenciesChange(e.target.value),
          placeholder: "fieldA, fieldB, fieldC"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "Comma-separated list of field names that this calculation depends on" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "note", children: "Note" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "note",
          value: data.note || "",
          onChange: (e) => handleChange("note", e.target.value),
          placeholder: "Based on your previous inputs"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "Optional note to display below the calculated value" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "displayFormat", children: "Display Format" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "displayFormat",
          value: data.displayFormat || "",
          onChange: (e) => handleChange("displayFormat", e.target.value),
          placeholder: "currency, percentage, decimal:2, or leave empty"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "Optional formatting for numeric results: currency, percentage, decimal:X, or leave empty for raw output" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "resultType", children: "Expected Result Type" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "resultType",
          value: data.resultType || "",
          onChange: (e) => handleChange("resultType", e.target.value),
          placeholder: "number, string, object"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "Expected return type from the formula (for documentation purposes)" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { htmlFor: "className", children: "CSS Class Names" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(
        Input,
        {
          id: "className",
          value: data.className || "",
          onChange: (e) => handleChange("className", e.target.value),
          placeholder: "calculated-field custom-styles"
        }
      )
    ] })
  ] });
};
var CalculatedFieldItem = ({
  data,
  onUpdate
}) => {
  const [displayValue, setDisplayValue] = (0, import_react47.useState)(data.calculatedValue || null);
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
  (0, import_react47.useEffect)(() => {
    if (displayValue !== null && data.fieldName && onUpdate) {
      onUpdate({
        ...data,
        calculatedValue: displayValue,
        [data.fieldName]: displayValue
      });
    }
  }, [displayValue, data.fieldName]);
  const getStatusIcon = () => {
    if (displayValue !== null) return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_lucide_react38.CheckCircle, { className: "w-4 h-4 text-green-500" });
    return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_lucide_react38.Info, { className: "w-4 h-4 text-muted-foreground" });
  };
  const getStatusColor = () => {
    if (displayValue !== null) return "border-green-200 bg-green-50";
    return "border-blue-200 bg-blue-50";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)(Card, { className: `w-full ${data.className || ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_lucide_react38.Calculator, { className: "w-5 h-5 text-primary" }),
        data.label || "Calculated Field"
      ] }),
      data.description && /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-sm text-muted-foreground", children: data.description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)(CardContent, { className: "space-y-4", children: [
      data.formula && /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { className: "text-sm font-medium", children: "Formula:" }),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "bg-muted rounded-lg p-3 border", children: /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("pre", { className: "text-xs font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto", children: data.formula }) })
        ] }),
        data.dependencies && data.dependencies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { className: "text-sm font-medium", children: "Depends on:" }),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "flex flex-wrap gap-1", children: data.dependencies.map((dep) => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Badge, { variant: "secondary", className: "text-xs", children: dep }, dep)) })
        ] }),
        data.resultType && /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Label, { className: "text-sm font-medium", children: "Returns:" }),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Badge, { variant: "outline", className: "text-xs font-mono", children: data.resultType })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Separator2, {}),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: `p-4 rounded-lg border-2 ${getStatusColor()}`, children: /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-sm font-medium text-muted-foreground", children: "Result" }),
          displayValue !== null ? /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-2xl font-bold text-green-700", children: formatValue(displayValue) }),
            typeof displayValue === "object" && /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-muted-foreground", children: "Object result - check console for full value" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-lg text-muted-foreground", children: "Will be calculated automatically" }),
            /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "bg-blue-50 border border-blue-200 rounded p-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-xs text-blue-800 font-medium mb-1", children: "Preview Formula:" }),
              /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("pre", { className: "text-xs text-blue-700 font-mono whitespace-pre-wrap", children: data.formula ? data.formula.substring(0, 100) + (data.formula.length > 100 ? "..." : "") : "Not configured" })
            ] })
          ] })
        ] }),
        getStatusIcon()
      ] }) }),
      data.note && /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "pt-2", children: /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("p", { className: "text-sm text-muted-foreground", children: data.note }) }),
      !displayValue && data.dependencies && data.dependencies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)(Alert, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_lucide_react38.Info, { className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)(AlertDescription, { className: "text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("strong", { children: "This field will be calculated from:" }),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("br", {}),
          data.dependencies.map((dep) => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(Badge, { variant: "outline", className: "mr-1 mt-1 text-xs", children: dep }, dep)),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("span", { className: "text-muted-foreground", children: "The calculation will happen automatically when the survey is filled out." })
        ] })
      ] })
    ] })
  ] });
};
var CalculatedFieldPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "w-full flex items-center justify-center py-3", children: /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "text-center space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_lucide_react38.Calculator, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("span", { className: "font-medium", children: "Calculated Field" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("div", { className: "space-y-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "bg-muted rounded px-2 py-1", children: /* @__PURE__ */ (0, import_jsx_runtime81.jsxs)("code", { className: "text-xs", children: [
        "if (bmi ",
        ">",
        ' 25) return "High Risk"'
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "text-lg font-bold text-orange-600", children: "High Risk" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime81.jsx)("div", { className: "text-xs text-muted-foreground", children: "Complex formula results" })
  ] }) });
};
var CalculatedFieldBlock = {
  type: "calculatedField",
  name: "Calculated Field",
  description: "Display a value calculated from a formula based on other fields",
  icon: /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(import_lucide_react38.Calculator, { className: "w-4 h-4" }),
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
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(CalculatedFieldItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(CalculatedFieldForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime81.jsx)(CalculatedFieldPreview, {}),
  validate: (data) => {
    if (!data.label) return "Label is required";
    if (!data.fieldName) return "Field name is required";
    if (!data.formula) return "Formula is required";
    if (!data.dependencies || data.dependencies.length === 0) return "At least one dependency is required";
    return null;
  }
};

// src/components/blocks/ConditionalBlock.tsx
var import_react48 = require("react");
var import_lucide_react39 = require("lucide-react");
var import_jsx_runtime82 = require("react/jsx-runtime");
var ConditionalBlockForm = ({
  data,
  onUpdate
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const [showChildConfig, setShowChildConfig] = (0, import_react48.useState)(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.GitBranch, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { className: "text-base font-medium", children: "Conditional Logic" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "condition", children: "Condition" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
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
        ),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-xs text-muted-foreground", children: "JavaScript expression that returns true/false. Use field names as variables." }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "text-xs text-muted-foreground bg-muted p-3 rounded space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("strong", { children: "Examples:" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("code", { className: "block", children: [
              "return age ",
              ">",
              "= 18;"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("code", { className: "block", children: [
              "return income ",
              ">",
              " 50000 && hasInsurance === true;"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("code", { className: "block", children: 'return bmiCalculator?.category === "Overweight";' }),
            /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("code", { className: "block", children: 'return answers.includes("Option A");' })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "dependencies", children: "Dependencies" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
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
        ),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-xs text-muted-foreground", children: "Comma-separated list of field names this condition depends on" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Separator2, {}),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.Code, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { className: "text-base font-medium", children: "Child Block" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setShowChildConfig(!showChildConfig),
            children: [
              showChildConfig ? /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.Eye, { className: "w-4 h-4" }),
              showChildConfig ? "Hide" : "Show",
              " Config"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childBlockType", children: "Block Type" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(
          Select,
          {
            value: ((_b = data.childBlock) == null ? void 0 : _b.type) || "text",
            onValueChange: (value) => handleChildBlockChange("type", value),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectValue, { placeholder: "Select block type" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(SelectContent, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "text", children: "Text Input" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "textarea", children: "Text Area" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "select", children: "Select Dropdown" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "checkbox", children: "Checkbox" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "radio", children: "Radio Buttons" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "number", children: "Number Input" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "date", children: "Date Input" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "file", children: "File Upload" }),
                /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: "html", children: "HTML Content" })
              ] })
            ]
          }
        )
      ] }),
      showChildConfig && /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-4 p-4 border rounded-lg bg-muted/20", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childLabel", children: "Label" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
            Input,
            {
              id: "childLabel",
              value: ((_c = data.childBlock) == null ? void 0 : _c.label) || "",
              onChange: (e) => handleChildBlockChange("label", e.target.value),
              placeholder: "Enter label for the child block"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childFieldName", children: "Field Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
            Input,
            {
              id: "childFieldName",
              value: ((_d = data.childBlock) == null ? void 0 : _d.fieldName) || "",
              onChange: (e) => handleChildBlockChange("fieldName", e.target.value),
              placeholder: "conditionalField"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childDescription", children: "Description" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
            Textarea,
            {
              id: "childDescription",
              value: ((_e = data.childBlock) == null ? void 0 : _e.description) || "",
              onChange: (e) => handleChildBlockChange("description", e.target.value),
              placeholder: "Optional description for the child block",
              rows: 2
            }
          )
        ] }),
        (((_f = data.childBlock) == null ? void 0 : _f.type) === "text" || ((_g = data.childBlock) == null ? void 0 : _g.type) === "textarea" || ((_h = data.childBlock) == null ? void 0 : _h.type) === "number") && /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childPlaceholder", children: "Placeholder" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
            Input,
            {
              id: "childPlaceholder",
              value: ((_i = data.childBlock) == null ? void 0 : _i.placeholder) || "",
              onChange: (e) => handleChildBlockChange("placeholder", e.target.value),
              placeholder: "Enter placeholder text"
            }
          )
        ] }),
        (((_j = data.childBlock) == null ? void 0 : _j.type) === "select" || ((_k = data.childBlock) == null ? void 0 : _k.type) === "radio" || ((_l = data.childBlock) == null ? void 0 : _l.type) === "checkbox") && /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childOptions", children: "Options" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
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
          ),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-xs text-muted-foreground", children: "One option per line" })
        ] }),
        ((_o = data.childBlock) == null ? void 0 : _o.type) === "html" && /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "childHtml", children: "HTML Content" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
            Textarea,
            {
              id: "childHtml",
              value: ((_p = data.childBlock) == null ? void 0 : _p.html) || "",
              onChange: (e) => handleChildBlockChange("html", e.target.value),
              placeholder: "<p>Your HTML content here</p>",
              className: "font-mono text-sm",
              rows: 4
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { htmlFor: "className", children: "CSS Class Names" }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
        Input,
        {
          id: "className",
          value: data.className || "",
          onChange: (e) => handleChange("className", e.target.value),
          placeholder: "conditional-block custom-styles"
        }
      )
    ] })
  ] });
};
var ConditionalBlockItem = ({
  data,
  onUpdate
}) => {
  const [isVisible] = (0, import_react48.useState)(true);
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
        return /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          childBlock.label && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { children: childBlock.label }),
          childBlock.description && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-sm text-muted-foreground", children: childBlock.description }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
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
          )
        ] });
      case "textarea":
        return /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          childBlock.label && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { children: childBlock.label }),
          childBlock.description && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-sm text-muted-foreground", children: childBlock.description }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
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
          )
        ] });
      case "select":
        return /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          childBlock.label && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Label, { children: childBlock.label }),
          childBlock.description && /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-sm text-muted-foreground", children: childBlock.description }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(Select, { onValueChange: (value) => {
            if (onUpdate && childBlock.fieldName) {
              onUpdate({
                ...data,
                [childBlock.fieldName]: value
              });
            }
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectValue, { placeholder: "Select an option" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectContent, { children: (_a = childBlock.options) == null ? void 0 : _a.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(SelectItem, { value: option, children: option }, index)) })
          ] })
        ] });
      case "html":
        return /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(
          "div",
          {
            className: "prose prose-sm max-w-none",
            dangerouslySetInnerHTML: { __html: childBlock.html || "" }
          }
        );
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("div", { className: "p-4 border border-dashed rounded-lg text-center text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("p", { className: "text-sm", children: [
          'Child block type "',
          childBlock.type,
          '" will render here'
        ] }) });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(Card, { className: `w-full ${data.className || ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(CardHeader, { className: "pb-3", children: /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.GitBranch, { className: "w-5 h-5 text-primary" }),
        "Conditional Content"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Badge, { variant: "secondary", className: "text-xs", children: "Condition Met" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)(Alert, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.Info, { className: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(AlertDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("p", { className: "text-sm font-medium", children: "This content is shown when:" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("div", { className: "bg-muted rounded p-2", children: /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("pre", { className: "text-xs font-mono whitespace-pre-wrap", children: data.condition || "No condition specified" }) }),
          data.dependencies && data.dependencies.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("span", { className: "text-xs font-medium", children: "Depends on:" }),
            data.dependencies.map((dep) => /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Badge, { variant: "outline", className: "text-xs", children: dep }, dep))
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Separator2, {}),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.ChevronRight, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("span", { className: "text-sm font-medium text-muted-foreground", children: "Conditional Content:" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("div", { className: "pl-6 border-l-2 border-primary/20", children: renderChildBlock() })
      ] })
    ] })
  ] });
};
var ConditionalBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("div", { className: "w-full flex items-center justify-center py-3", children: /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "text-center space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.GitBranch, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("span", { className: "font-medium", children: "Conditional Block" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "space-y-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime82.jsxs)("div", { className: "flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Badge, { variant: "outline", className: "text-xs", children: "if (condition)" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.ChevronRight, { className: "w-3 h-3 text-muted-foreground" }),
        /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(Badge, { variant: "secondary", className: "text-xs", children: "show content" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime82.jsx)("div", { className: "text-xs text-muted-foreground", children: "Shows content conditionally" })
    ] })
  ] }) });
};
var ConditionalBlock = {
  type: "conditional",
  name: "Conditional Block",
  description: "Display content only when specific conditions are met",
  icon: /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(import_lucide_react39.GitBranch, { className: "w-4 h-4" }),
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
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(ConditionalBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(ConditionalBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime82.jsx)(ConditionalBlockPreview, {}),
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
var import_react49 = __toESM(require("react"));
var import_lucide_react40 = require("lucide-react");
var import_uuid15 = require("uuid");
var import_jsx_runtime83 = require("react/jsx-runtime");
var CheckoutBlockForm = ({ data, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate == null ? void 0 : onUpdate({
      ...data,
      [field]: value
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "fieldName", children: "Field Name" }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Input,
          {
            id: "fieldName",
            value: data.fieldName || "",
            onChange: (e) => handleChange("fieldName", e.target.value),
            placeholder: "checkout"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("p", { className: "text-xs text-muted-foreground", children: "Unique identifier for storing checkout data" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "label", children: "Label" }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Input,
          {
            id: "label",
            value: data.label || "",
            onChange: (e) => handleChange("label", e.target.value),
            placeholder: "Checkout Information"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "description", children: "Description" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
        Input,
        {
          id: "description",
          value: data.description || "",
          onChange: (e) => handleChange("description", e.target.value),
          placeholder: "Please provide your contact and shipping details"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "showContactInfo",
            checked: !!data.showContactInfo,
            onCheckedChange: (checked) => handleChange("showContactInfo", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "showContactInfo", children: "Show Contact Information" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "showShippingAddress",
            checked: !!data.showShippingAddress,
            onCheckedChange: (checked) => handleChange("showShippingAddress", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "showShippingAddress", children: "Show Shipping Address" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "showBillingAddress",
            checked: !!data.showBillingAddress,
            onCheckedChange: (checked) => handleChange("showBillingAddress", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "showBillingAddress", children: "Show Billing Address" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "sameAsBilling",
            checked: !!data.sameAsBilling,
            onCheckedChange: (checked) => handleChange("sameAsBilling", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "sameAsBilling", children: "Same as Shipping (Default)" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "requireEmail",
            checked: !!data.requireEmail,
            onCheckedChange: (checked) => handleChange("requireEmail", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "requireEmail", children: "Require Email" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "requirePhone",
            checked: !!data.requirePhone,
            onCheckedChange: (checked) => handleChange("requirePhone", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "requirePhone", children: "Require Phone" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "collectFullName",
            checked: !!data.collectFullName,
            onCheckedChange: (checked) => handleChange("collectFullName", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "collectFullName", children: "Collect Full Name" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
          Checkbox,
          {
            id: "allowCompany",
            checked: !!data.allowCompany,
            onCheckedChange: (checked) => handleChange("allowCompany", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "allowCompany", children: "Allow Company Field" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "defaultCountry", children: "Default Country" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)(Select, { value: data.defaultCountry || "US", onValueChange: (value) => handleChange("defaultCountry", value), children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectValue, { placeholder: "Select country" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)(SelectContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectItem, { value: "US", children: "United States" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectItem, { value: "CA", children: "Canada" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectItem, { value: "GB", children: "United Kingdom" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectItem, { value: "AU", children: "Australia" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectItem, { value: "FR", children: "France" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(SelectItem, { value: "DE", children: "Germany" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { htmlFor: "className", children: "CSS Class Names" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(
        Input,
        {
          id: "className",
          value: data.className || "",
          onChange: (e) => handleChange("className", e.target.value),
          placeholder: "checkout-form"
        }
      )
    ] })
  ] });
};
var CheckoutBlockItem = ({ data }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-6 p-4 border rounded-lg bg-gray-50", children: [
    data.label && /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { className: "text-lg font-semibold", children: data.label }),
    data.showContactInfo && /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("h3", { className: "font-medium text-sm text-gray-700", children: "Contact Information" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        data.requireEmail && /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Email address", className: "text-sm" }),
        data.requirePhone && /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Phone number", className: "text-sm" })
      ] })
    ] }),
    data.showShippingAddress && /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("h3", { className: "font-medium text-sm text-gray-700", children: "Shipping Address" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2", children: [
        data.collectFullName && /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "First name", className: "text-sm" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Last name", className: "text-sm" })
        ] }),
        data.allowCompany && /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Company (optional)", className: "text-sm" }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Address line 1", className: "text-sm" }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Address line 2 (optional)", className: "text-sm" }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "City", className: "text-sm" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "State", className: "text-sm" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "ZIP code", className: "text-sm" })
        ] })
      ] })
    ] }),
    data.showBillingAddress && /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("h3", { className: "font-medium text-sm text-gray-700", children: "Billing Address" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "flex items-center space-x-2 mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Checkbox, { disabled: true, checked: data.sameAsBilling }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Label, { className: "text-sm", children: "Same as shipping address" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2 opacity-50", children: [
        /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Address line 1", className: "text-sm" }),
        /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "City", className: "text-sm" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "State", className: "text-sm" }),
          /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "ZIP code", className: "text-sm" })
        ] })
      ] })
    ] })
  ] });
};
var CheckoutBlockPreview = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("div", { className: "w-full flex items-center justify-center py-2", children: /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "space-y-2 w-4/5 max-w-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime83.jsx)("div", { className: "text-xs font-medium text-gray-600", children: "Contact & Shipping" }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Email", className: "text-xs h-8" }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "Address", className: "text-xs h-8" }),
    /* @__PURE__ */ (0, import_jsx_runtime83.jsxs)("div", { className: "grid grid-cols-3 gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "City", className: "text-xs h-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "State", className: "text-xs h-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(Input, { disabled: true, placeholder: "ZIP", className: "text-xs h-8" })
    ] })
  ] }) });
};
console.log("CheckoutBlock imports debug:", {
  React: typeof import_react49.default,
  Input: typeof Input,
  Checkbox: typeof Checkbox,
  Label: typeof Label,
  Select: typeof Select,
  SelectContent: typeof SelectContent,
  SelectItem: typeof SelectItem,
  SelectTrigger: typeof SelectTrigger,
  SelectValue: typeof SelectValue,
  ShoppingCart: typeof import_lucide_react40.ShoppingCart,
  uuidv4: typeof import_uuid15.v4
});
var CheckoutBlock3 = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details with Shopify-like experience",
  icon: import_react49.default.createElement(import_lucide_react40.ShoppingCart, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkout",
    fieldName: `checkout${(0, import_uuid15.v4)().substring(0, 4)}`,
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
  renderItem: (props) => /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(CheckoutBlockItem, { ...props }),
  renderFormFields: (props) => /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(CheckoutBlockForm, { ...props }),
  renderPreview: () => /* @__PURE__ */ (0, import_jsx_runtime83.jsx)(CheckoutBlockPreview, {}),
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    return null;
  }
};

// src/components/blocks/index.ts
var StandardBlocks = [
  // Basic input blocks
  TextInputBlock2,
  TextareaBlock2,
  SelectBlock2,
  RadioBlock2,
  CheckboxBlock2,
  // Advanced input blocks
  RangeBlock2,
  DatePickerBlock2,
  FileUploadBlock2,
  MatrixBlock2,
  SelectableBoxQuestionBlock2,
  // Content blocks
  MarkdownBlock2,
  HtmlBlock2,
  // Logic blocks
  AuthBlock2,
  ScriptBlock2,
  // Advanced calculation and conditional blocks
  BMICalculatorBlock,
  CalculatedFieldBlock,
  ConditionalBlock,
  CheckoutBlock3
];

// src/components/nodes/SectionNodeDefinition.tsx
var import_lucide_react43 = require("lucide-react");
var import_uuid18 = require("uuid");

// src/survey/nodes/SectionNode.tsx
var import_react54 = require("react");

// src/survey/blocks/ContentBlockPage.tsx
var import_react53 = require("react");

// src/components/ui/sortable.tsx
var import_core = require("@dnd-kit/core");
var import_modifiers = require("@dnd-kit/modifiers");
var import_sortable = require("@dnd-kit/sortable");
var import_utilities = require("@dnd-kit/utilities");
var import_react_slot2 = require("@radix-ui/react-slot");
var React63 = __toESM(require("react"));

// src/lib/composition.ts
var React62 = __toESM(require("react"));
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
  return React62.useCallback(composeRefs(...refs), refs);
}

// src/components/ui/sortable.tsx
var ReactDOM = __toESM(require("react-dom"));
var import_jsx_runtime84 = require("react/jsx-runtime");
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
var SortableRootContext = React63.createContext(null);
SortableRootContext.displayName = ROOT_NAME;
function useSortableContext(name) {
  const context = React63.useContext(SortableRootContext);
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
  const id = React63.useId();
  const [activeId, setActiveId] = React63.useState(null);
  const sensors = (0, import_core.useSensors)(
    (0, import_core.useSensor)(import_core.MouseSensor),
    (0, import_core.useSensor)(import_core.TouchSensor),
    (0, import_core.useSensor)(import_core.KeyboardSensor, {
      coordinateGetter: import_sortable.sortableKeyboardCoordinates
    })
  );
  const config = React63.useMemo(
    () => orientationConfig[orientation],
    [orientation]
  );
  const getItemValue = React63.useCallback(
    (item) => {
      if (typeof item === "object" && !getItemValueProp) {
        throw new Error("getItemValue is required when using array of objects");
      }
      return getItemValueProp ? getItemValueProp(item) : item;
    },
    [getItemValueProp]
  );
  const items = React63.useMemo(() => {
    return value.map((item) => getItemValue(item));
  }, [value, getItemValue]);
  const onDragStart = React63.useCallback(
    (event) => {
      var _a;
      (_a = sortableProps.onDragStart) == null ? void 0 : _a.call(sortableProps, event);
      if (event.activatorEvent.defaultPrevented) return;
      setActiveId(event.active.id);
    },
    [sortableProps.onDragStart]
  );
  const onDragEnd = React63.useCallback(
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
  const onDragCancel = React63.useCallback(
    (event) => {
      var _a;
      (_a = sortableProps.onDragCancel) == null ? void 0 : _a.call(sortableProps, event);
      if (event.activatorEvent.defaultPrevented) return;
      setActiveId(null);
    },
    [sortableProps.onDragCancel]
  );
  const announcements = React63.useMemo(
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
  const screenReaderInstructions = React63.useMemo(
    () => ({
      draggable: `
        To pick up a sortable item, press space or enter.
        While dragging, use the ${orientation === "vertical" ? "up and down" : orientation === "horizontal" ? "left and right" : "arrow"} keys to move the item.
        Press space or enter again to drop the item in its new position, or press escape to cancel.
      `
    }),
    [orientation]
  );
  const contextValue = React63.useMemo(
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
  return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
    SortableRootContext.Provider,
    {
      value: contextValue,
      children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
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
    }
  );
}
var SortableContentContext = React63.createContext(false);
SortableContentContext.displayName = CONTENT_NAME;
var SortableContent = React63.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(SortableContentContext.Provider, { value: true, children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
      import_sortable.SortableContext,
      {
        items: context.items,
        strategy: strategyProp != null ? strategyProp : context.strategy,
        children: withoutSlot ? children : /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
          ContentPrimitive,
          {
            "data-slot": "sortable-content",
            ...contentProps,
            ref: forwardedRef,
            children
          }
        )
      }
    ) });
  }
);
SortableContent.displayName = CONTENT_NAME;
var SortableItemContext = React63.createContext(null);
SortableItemContext.displayName = ITEM_NAME;
var SortableItem = React63.forwardRef(
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
    const inSortableContent = React63.useContext(SortableContentContext);
    const inSortableOverlay = React63.useContext(SortableOverlayContext);
    if (!inSortableContent && !inSortableOverlay) {
      throw new Error(SORTABLE_ERRORS[ITEM_NAME]);
    }
    if (value === "") {
      throw new Error(`\`${ITEM_NAME}\` value cannot be an empty string`);
    }
    const context = useSortableContext(ITEM_NAME);
    const id = React63.useId();
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
    const composedStyle = React63.useMemo(() => {
      return {
        transform: import_utilities.CSS.Translate.toString(transform),
        transition,
        ...style
      };
    }, [transform, transition, style]);
    const itemContext = React63.useMemo(
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
    return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(SortableItemContext.Provider, { value: itemContext, children: /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
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
    ) });
  }
);
SortableItem.displayName = ITEM_NAME;
var SortableItemHandle = React63.forwardRef((props, forwardedRef) => {
  const { asChild, disabled, className, ...itemHandleProps } = props;
  const itemContext = React63.useContext(SortableItemContext);
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
  return /* @__PURE__ */ (0, import_jsx_runtime84.jsx)(
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
var SortableOverlayContext = React63.createContext(false);
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
var Root13 = Sortable;
var Content5 = SortableContent;
var Item4 = SortableItem;
var ItemHandle = SortableItemHandle;

// src/survey/blocks/ContentBlockPage.tsx
var import_sortable3 = require("@dnd-kit/sortable");
var import_lucide_react41 = require("lucide-react");

// src/survey/blocks/ContentBlockItem.tsx
var import_react52 = require("react");

// src/components/common/NavigationRulesEditor.tsx
var import_react50 = __toESM(require("react"));
var import_jsx_runtime85 = require("react/jsx-runtime");
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
  const collectFieldNames = import_react50.default.useCallback((node) => {
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
  const collectPages = import_react50.default.useCallback((node) => {
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
  const collectBlocks = import_react50.default.useCallback((node) => {
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
  const fieldOptions = import_react50.default.useMemo(() => collectFieldNames(state.rootNode), [state.rootNode]);
  const pageOptions = import_react50.default.useMemo(() => collectPages(state.rootNode), [state.rootNode]);
  const blockOptions = import_react50.default.useMemo(() => collectBlocks(state.rootNode), [state.rootNode]);
  const [rules, setRules] = import_react50.default.useState(() => {
    return (data.navigationRules || []).map(parseRule2);
  });
  import_react50.default.useEffect(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Label, { children: "Navigation Rules" }),
    rules.map((rule, idx) => /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "border rounded-md p-3 space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "grid grid-cols-4 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Label, { children: "Variable" }),
          /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(
            Select,
            {
              value: rule.field,
              onValueChange: (val) => handleRuleChange(idx, "field", val),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectValue, { placeholder: "Select field" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectContent, { children: fieldOptions.map((name) => /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectItem, { value: name, children: name }, name)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Label, { children: "Operator" }),
          /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(
            Select,
            {
              value: rule.operator,
              onValueChange: (val) => handleRuleChange(idx, "operator", val),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectValue, { placeholder: "Operator" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectContent, { children: [
                  "==",
                  "!=",
                  ">",
                  ">=",
                  "<",
                  "<=",
                  "contains"
                ].map((op) => /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectItem, { value: op, children: op }, op)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Label, { children: "Value" }),
          /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
            Input,
            {
              value: rule.value,
              onChange: (e) => handleRuleChange(idx, "value", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Label, { children: "Target" }),
          /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(
            Select,
            {
              value: rule.target === "submit" ? "submit" : rule.isPage ? `page:${rule.target}` : `block:${rule.target}`,
              onValueChange: (val) => handleTargetChange(idx, val),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectValue, { placeholder: "Choose" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(SelectContent, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(SelectGroup, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectLabel, { children: "Pages" }),
                    pageOptions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectItem, { value: `page:${p.uuid}`, children: p.name }, `page-${p.uuid}`))
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)(SelectGroup, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectLabel, { children: "Blocks" }),
                    blockOptions.map((b) => /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectItem, { value: `block:${b.uuid}`, children: b.name }, `block-${b.uuid}`))
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(SelectItem, { value: "submit", children: "Submit" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime85.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
          Checkbox,
          {
            id: `default-${idx}`,
            checked: rule.isDefault || false,
            onCheckedChange: (checked) => handleRuleChange(idx, "isDefault", !!checked)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Label, { htmlFor: `default-${idx}`, children: "Default" }),
        /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => removeRule(idx),
            className: "ml-auto",
            children: "Remove"
          }
        )
      ] })
    ] }, idx)),
    /* @__PURE__ */ (0, import_jsx_runtime85.jsx)(Button, { type: "button", variant: "outline", size: "sm", onClick: addRule, children: "Add Rule" })
  ] });
};

// src/components/common/CommonBlockRules.tsx
var import_react51 = __toESM(require("react"));
var import_jsx_runtime86 = require("react/jsx-runtime");
var CommonBlockRules = ({ data, onUpdate }) => {
  var _a;
  const [isEndBlock, setIsEndBlock] = import_react51.default.useState(!!data.isEndBlock);
  const [autoContinueOnSelect, setAutoContinueOnSelect] = import_react51.default.useState(!!data.autoContinueOnSelect);
  const [showContinueButton, setShowContinueButton] = import_react51.default.useState((_a = data.showContinueButton) != null ? _a : true);
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
  import_react51.default.useEffect(() => {
    setIsEndBlock(!!data.isEndBlock);
  }, [data.isEndBlock]);
  return /* @__PURE__ */ (0, import_jsx_runtime86.jsxs)("div", { className: "space-y-4 mt-4 mb-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(Label, { children: "Base Settings" }),
    /* @__PURE__ */ (0, import_jsx_runtime86.jsxs)("div", { className: "flex items-center gap-2 mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
        Checkbox,
        {
          id: "is-end-block",
          checked: isEndBlock,
          onCheckedChange: handleEndBlockChange
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(Label, { htmlFor: "is-end-block", children: "Mark as end block?" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime86.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
        Checkbox,
        {
          id: "is-auto-block",
          checked: autoContinueOnSelect,
          onCheckedChange: handleAutoContinueChange
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(Label, { htmlFor: "is-auto-block", children: "Auto Continue To next?" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime86.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(
        Checkbox,
        {
          id: "is-show-block",
          checked: showContinueButton,
          onCheckedChange: handleShowContinueChange
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime86.jsx)(Label, { htmlFor: "is-show-block", children: "Show Next Button?" })
    ] })
  ] });
};

// src/survey/blocks/ContentBlockItem.tsx
var import_jsx_runtime87 = require("react/jsx-runtime");
var ContentBlockItem = ({
  data,
  onUpdate,
  onRemove
}) => {
  const { state } = useSurveyBuilder();
  const [isEditing, setIsEditing] = (0, import_react52.useState)(false);
  const blockDefinition = state.definitions.blocks[data.type];
  if (!blockDefinition) {
    return /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(Card, { className: "mb-4 content-block-item border-destructive", children: /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("div", { className: "flex gap-2 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)("span", { className: "text-destructive", children: [
        "Unknown block type: ",
        data.type
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("div", { className: "flex gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(
        Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          onClick: onRemove,
          children: "Remove"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(Card, { className: "mb-4 content-block-item", children: [
    /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)("div", { className: "flex gap-2 items-center", children: [
        blockDefinition.icon && /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("span", { children: blockDefinition.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("span", { className: "font-medium", children: data.name || blockDefinition.name }),
        data.fieldName && /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("span", { className: "text-xs bg-muted px-2 py-1 rounded-md", children: data.fieldName })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(Dialog, { open: isEditing, onOpenChange: setIsEditing, children: [
          /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(DialogTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              children: "Edit"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(DialogContent, { className: "max-w-3xl overflow-y-scroll max-h-screen", children: [
            /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)(DialogTitle, { children: [
              "Edit ",
              blockDefinition.name
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime87.jsxs)("div", { className: "py-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(CommonBlockRules, { data, onUpdate }),
              blockDefinition.renderFormFields({
                data,
                onUpdate,
                onRemove: () => {
                  setIsEditing(false);
                  onRemove();
                }
              }),
              /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(NavigationRulesEditor, { data, onUpdate })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: onRemove,
            children: "Remove"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(CardContent, { children: blockDefinition.renderItem({
      data,
      onUpdate,
      onRemove
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime87.jsx)(CardFooter, { className: "bg-muted/50 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime87.jsx)("div", { className: "text-xs text-muted-foreground", children: data.uuid ? `ID: ${data.uuid.substring(0, 8)}` : "New Item" }) })
  ] });
};

// src/survey/blocks/ContentBlockPage.tsx
var import_uuid16 = require("uuid");
var import_jsx_runtime88 = require("react/jsx-runtime");
var ContentBlockPage = ({
  data,
  onUpdate,
  onRemove
}) => {
  var _a;
  const { state } = useSurveyBuilder();
  const [collapsed, setCollapsed] = (0, import_react53.useState)(false);
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
          uuid: (0, import_uuid16.v4)()
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
  return /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(Card, { className: "mb-4 content-block-page", children: [
    /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("div", { className: "flex gap-2 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
        Input,
        {
          value: data.name || "",
          onChange: handleNameChange,
          placeholder: "Page Name",
          className: "w-[300px]"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setCollapsed(!collapsed),
            children: collapsed ? "Expand" : "Collapse"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: onRemove,
            children: "Remove"
          }
        )
      ] })
    ] }),
    !collapsed && /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
        Root13,
        {
          value: data.items || [],
          onMove: ({ activeIndex, overIndex }) => handleBlockMove(activeIndex, overIndex),
          getItemValue: (item) => item.uuid,
          children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
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
              },
              children: (data.items || []).map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(Item4, { value: block.uuid, children: /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)("div", { className: "relative", children: [
                /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(ItemHandle, { className: "absolute -left-5 top-2 cursor-grab text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(import_lucide_react41.GripVertical, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime88.jsx)(
                  ContentBlockItem,
                  {
                    data: block,
                    onUpdate: (updatedBlock) => handleBlockUpdate(index, updatedBlock),
                    onRemove: () => handleBlockRemove(index)
                  }
                )
              ] }) }, block.uuid || index))
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)("div", { className: "mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("h4", { className: "text-sm font-medium mb-2", children: "Add Item" }),
        /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2", children: Object.entries(state.definitions.blocks).map(([type, definition]) => /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => handleAddBlockItem(type),
            draggable: true,
            onDragStart: (e) => {
              e.dataTransfer.setData("application/x-block-type", type);
            },
            className: "justify-start",
            children: [
              definition.icon && /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("span", { className: "mr-2", children: definition.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("span", { className: "truncate", children: definition.name })
            ]
          },
          type
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime88.jsxs)(CardFooter, { className: "bg-muted/50 flex justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("div", { className: "text-xs text-muted-foreground", children: `Items: ${((_a = data.items) == null ? void 0 : _a.length) || 0}` }),
      /* @__PURE__ */ (0, import_jsx_runtime88.jsx)("div", { className: "text-xs text-muted-foreground", children: data.uuid ? `ID: ${data.uuid}` : "New Page" })
    ] })
  ] });
};

// src/survey/nodes/SectionNode.tsx
var import_uuid17 = require("uuid");
var import_sortable5 = require("@dnd-kit/sortable");
var import_lucide_react42 = require("lucide-react");
var import_jsx_runtime89 = require("react/jsx-runtime");
var SectionNode = ({
  data,
  onUpdate,
  onRemove
}) => {
  const { createNode } = useSurveyBuilder();
  const [collapsed, setCollapsed] = (0, import_react54.useState)(false);
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
          uuid: (0, import_uuid17.v4)(),
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
  return /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(Card, { className: "mb-4 section-node", children: [
    /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("div", { className: "flex gap-2 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
        Input,
        {
          value: data.name || "",
          onChange: handleNameChange,
          placeholder: "Section Name",
          className: "w-[300px]"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setCollapsed(!collapsed),
            children: collapsed ? "Expand" : "Collapse"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
          Button,
          {
            variant: "outline",
            size: "sm",
            type: "button",
            onClick: onRemove,
            children: "Remove"
          }
        )
      ] })
    ] }),
    "      ",
    !collapsed && /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(Tabs, { defaultValue: "pages", children: [
      /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)(TabsList, { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(TabsTrigger, { value: "pages", children: "Pages" }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(TabsTrigger, { value: "scripts", children: "Scripts" }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(TabsTrigger, { value: "children", children: "Child Nodes" })
      ] }),
      "            ",
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(TabsContent, { value: "pages", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
          Root13,
          {
            value: data.items || [],
            onMove: ({ activeIndex, overIndex }) => handlePageMove(activeIndex, overIndex),
            getItemValue: (item) => item.uuid,
            children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Content5, { className: "space-y-4", children: (data.items || []).map((page, index) => /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Item4, { value: page.uuid, children: /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(ItemHandle, { className: "absolute -left-5 top-2 cursor-grab text-muted-foreground", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(import_lucide_react42.GripVertical, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
                ContentBlockPage,
                {
                  data: page,
                  onUpdate: (updatedPage) => handleUpdatePage(index, updatedPage),
                  onRemove: () => handleRemovePage(index)
                },
                page.uuid || index
              )
            ] }) }, page.uuid || index)) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Button, { type: "button", onClick: handleAddPage, children: "Add Page" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(TabsContent, { value: "scripts", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Label, { htmlFor: "entryLogic", children: "On Entry Script" }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            Textarea,
            {
              id: "entryLogic",
              value: data.entryLogic || "",
              onChange: (e) => handleScriptChange("entryLogic", e.target.value),
              placeholder: "(formData, pageData, renderer, navigation) => { /* Initialize section */ }",
              className: "font-mono text-sm h-24"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Label, { htmlFor: "exitLogic", children: "On Exit Script" }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            Textarea,
            {
              id: "exitLogic",
              value: data.exitLogic || "",
              onChange: (e) => handleScriptChange("exitLogic", e.target.value),
              placeholder: "(formData, pageData, renderer, navigation) => { /* Cleanup section */ }",
              className: "font-mono text-sm h-24"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Label, { htmlFor: "backLogic", children: "On Back Navigation Script" }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            Textarea,
            {
              id: "backLogic",
              value: data.backLogic || "",
              onChange: (e) => handleScriptChange("backLogic", e.target.value),
              placeholder: "(formData, pageData, renderer, stack) => { /* Handle back navigation logic */ }",
              className: "font-mono text-sm h-24"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Label, { htmlFor: "navigationLogic", children: "Navigation Script" }),
          /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(
            Textarea,
            {
              id: "navigationLogic",
              value: data.navigationLogic || "",
              onChange: (e) => handleScriptChange("navigationLogic", e.target.value),
              placeholder: "(formData, pageData, renderer) => { return 0; }",
              className: "font-mono text-sm h-24"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(TabsContent, { value: "children", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsxs)("div", { className: "space-y-4", children: [
        (data.nodes || []).map((nodeRef, index) => {
          return /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("div", { className: "p-2 border rounded-md", children: typeof nodeRef === "string" ? `Child Node Reference: ${nodeRef}` : `Child Node: ${nodeRef.name || "Unnamed Node"}` }, typeof nodeRef === "string" ? nodeRef : nodeRef.uuid || index);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(Button, { type: "button", onClick: handleAddChildSection, children: "Add Child Section" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime89.jsx)(CardFooter, { className: "bg-muted/50 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime89.jsx)("div", { className: "text-xs text-muted-foreground", children: data.uuid ? `ID: ${data.uuid}` : "New Section" }) })
  ] });
};

// src/components/nodes/SectionNodeDefinition.tsx
var import_jsx_runtime90 = require("react/jsx-runtime");
var SectionNodeDefinition = {
  type: "section",
  name: "Section",
  uuid: (0, import_uuid18.v4)(),
  description: "A section containing multiple pages",
  icon: /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(import_lucide_react43.LayoutGrid, { className: "w-4 h-4" }),
  defaultData: {
    type: "section",
    name: "New Section",
    uuid: (0, import_uuid18.v4)(),
    items: [
      {
        type: "set",
        name: "Page 1",
        uuid: (0, import_uuid18.v4)(),
        items: []
      }
    ],
    navigationLogic: "return 0;",
    entryLogic: "",
    exitLogic: "",
    backLogic: ""
  },
  // GOOD: returns JSX, so React treats it as its own component
  renderNode: (props) => /* @__PURE__ */ (0, import_jsx_runtime90.jsx)(SectionNode, { ...props })
};

// src/components/nodes/index.ts
var StandardNodes = [
  SectionNodeDefinition
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionTypes,
  AuthBlock,
  AuthRenderer,
  BMICalculatorBlock,
  BMICalculatorRenderer,
  BlockRenderer,
  CalculatedFieldBlock,
  CalculatedFieldRenderer,
  CheckboxBlock,
  CheckboxRenderer,
  CheckoutBlock,
  CheckoutRenderer,
  ConditionalBlock,
  ConditionalBlockRenderer,
  DatePickerBlock,
  DatePickerRenderer,
  DebugInfo,
  FileUploadBlock,
  FileUploadRenderer,
  HtmlBlock,
  HtmlRenderer,
  MarkdownBlock,
  MarkdownRenderer,
  MatrixBlock,
  MatrixRenderer,
  RadioBlock,
  RadioRenderer,
  RangeBlock,
  RangeRenderer,
  ScriptBlock,
  ScriptRenderer,
  SectionNodeDefinition,
  SelectBlock,
  SelectRenderer,
  SelectableBoxQuestionBlock,
  SelectableBoxRenderer,
  SetRenderer,
  StandardBlocks,
  StandardNodes,
  SurveyBuilder,
  SurveyBuilderProvider,
  SurveyForm,
  SurveyFormProvider,
  TextInputBlock,
  TextInputRenderer,
  TextareaBlock,
  TextareaRenderer,
  ValidationSummary,
  applyDynamicColors,
  blockTypeMap,
  calculateBMI,
  cloneNode,
  colorfulTheme,
  corporateTheme,
  darkTheme,
  defaultTheme,
  ensureNodeUuids,
  evaluateCondition,
  evaluateLogic,
  evaluateSimpleCondition,
  executeCalculation,
  findNodeById,
  formatFieldName,
  getAllNodes,
  getAllParentNodes,
  getLeafNodePaths,
  getLocalized,
  getParentNode,
  getSurveyPageIds,
  getSurveyPages,
  getThemeClass,
  isBlockVisible,
  isContentBlock,
  isInputBlock,
  linkNodes,
  minimalTheme,
  modernTheme,
  supportsBranchingLogic,
  supportsConditionalRendering,
  themes,
  useSurveyBuilder,
  useSurveyForm,
  validateBlock
});
//# sourceMappingURL=index.js.map