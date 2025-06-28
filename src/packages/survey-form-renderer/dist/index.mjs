var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/components/SurveyForm.tsx
import React50, { useEffect as useEffect20 } from "react";

// src/context/SurveyFormContext.tsx
init_surveyUtils();
import React2, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

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
var SurveyFormContext = createContext({
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
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [conditionalErrors, setConditionalErrors] = useState({});
  const [computedValues, setComputedValues] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [navigationHistory, setNavigationHistory] = useState([
    {
      pageIndex: 0,
      blockIndex: 0,
      timestamp: Date.now(),
      trigger: "initial"
    }
  ]);
  const navigationHistoryRef = useRef(navigationHistory);
  const currentPageRef = useRef(currentPage);
  const currentBlockIndexRef = useRef(currentBlockIndex);
  const isHandlingPopStateRef = useRef(false);
  useEffect(() => {
    navigationHistoryRef.current = navigationHistory;
  }, [navigationHistory]);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);
  useEffect(() => {
    currentBlockIndexRef.current = currentBlockIndex;
  }, [currentBlockIndex]);
  const pages = getSurveyPages(surveyData.rootNode);
  const pageIds = getSurveyPageIds(surveyData.rootNode);
  const totalPages = Math.max(1, pages.length);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const canGoBack = navigationHistory.length > 1;
  const shouldSkipBlockOnBack = useCallback((pageIndex, blockIndex) => {
    if (pageIndex < 0 || pageIndex >= pages.length) return false;
    const pageBlocks = pages[pageIndex] || [];
    const block = pageBlocks[blockIndex];
    if (!block || block.type !== "auth") return false;
    const skipIfLoggedIn = block.skipIfLoggedIn;
    if (!skipIfLoggedIn) return false;
    return false;
  }, [pages]);
  const findPreviousNonSkippableBlock = useCallback((currentNavigationHistory) => {
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
  useEffect(() => {
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
  const addToNavigationHistory = useCallback((pageIndex, blockIndex, trigger) => {
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
  const getVisibleBlocks = useCallback((blocks) => {
    return blocks.filter((block) => {
      if (!block.visibleIf) return true;
      return isBlockVisible(block, { ...values, ...computedValues });
    });
  }, [values, computedValues]);
  const getTotalVisibleSteps = useCallback(() => {
    return pages.reduce((total, pageBlocks) => {
      const visibleBlocks = getVisibleBlocks(pageBlocks);
      return total + visibleBlocks.length;
    }, 0);
  }, [pages, getVisibleBlocks]);
  const getCurrentStepPosition = useCallback(() => {
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
  const getActualProgress = useCallback(() => {
    const totalSteps = getTotalVisibleSteps();
    const currentPosition = getCurrentStepPosition();
    if (totalSteps === 0) return 0;
    return Math.min(100, (currentPosition + 1) / totalSteps * 100);
  }, [getTotalVisibleSteps, getCurrentStepPosition]);
  const updateComputedValues = useCallback(() => {
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
  useEffect(() => {
    updateComputedValues();
  }, [values, updateComputedValues]);
  const evaluateConditionWithContext = useCallback((condition, contextData) => {
    const contextValues = {
      ...values,
      ...computedValues,
      ...contextData || {}
    };
    return evaluateCondition(condition, contextValues);
  }, [values, computedValues]);
  const getNextPageIndex2 = useCallback(() => {
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
  const validateField = useCallback((fieldName, value) => {
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
  return /* @__PURE__ */ React2.createElement(
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
      }
    },
    children
  );
};
var useSurveyForm = () => useContext(SurveyFormContext);

// src/components/layouts/PageByPageLayout.tsx
import React44, { useEffect as useEffect15, useRef as useRef9 } from "react";

// src/components/ui/ProgressBar.tsx
import React3 from "react";

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
        return /* @__PURE__ */ React3.createElement("div", { className: themeConfig.progress.dots }, Array.from({ length: totalPages }).map((_, index) => /* @__PURE__ */ React3.createElement(
          "div",
          {
            key: index,
            className: `h-3 w-3 rounded-full ${index <= currentPage ? "bg-primary-600" : "bg-gray-200"}`,
            style: {
              backgroundColor: index <= currentPage ? color : backgroundColor,
              transition: animation ? "background-color 0.3s ease" : "none"
            }
          }
        )));
      case "numbers":
        return /* @__PURE__ */ React3.createElement("div", { className: themeConfig.progress.numbers }, Array.from({ length: totalPages }).map((_, index) => /* @__PURE__ */ React3.createElement(
          "div",
          {
            key: index,
            className: `flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${index <= currentPage ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"}`,
            style: {
              backgroundColor: index <= currentPage ? color : backgroundColor,
              transition: animation ? "background-color 0.3s ease" : "none"
            }
          },
          index + 1
        )));
      case "percentage":
        return /* @__PURE__ */ React3.createElement("div", { className: "text-center text-lg font-bold" }, Math.round(progress), "%");
      case "bar":
      default:
        return /* @__PURE__ */ React3.createElement(
          "div",
          {
            className: themeConfig.progress.bar,
            style: { height }
          },
          /* @__PURE__ */ React3.createElement(
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
        );
    }
  };
  return /* @__PURE__ */ React3.createElement("div", { className: wrapperClass }, showStepInfo && /* @__PURE__ */ React3.createElement("div", { className: "flex justify-between mb-1" }, /* @__PURE__ */ React3.createElement("span", { className: themeConfig.progress.label }, showStepNumbers && /* @__PURE__ */ React3.createElement(React3.Fragment, null, "Page ", currentPage + 1, " of ", totalPages)), showPercentage && type !== "percentage" && /* @__PURE__ */ React3.createElement("span", { className: themeConfig.progress.percentage }, Math.round(progress), "%")), renderProgressIndicator());
};

// src/components/ui/NavigationButtons.tsx
import React5 from "react";

// src/components/ui/button.tsx
import * as React4 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
var buttonVariants = cva(
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
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ React4.createElement(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/NavigationButtons.tsx
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
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
  return /* @__PURE__ */ React5.createElement("div", { className: containerClass }, showPrevious && onPrevious && /* @__PURE__ */ React5.createElement(
    Button,
    {
      type: "button",
      variant: getSecondaryVariant(),
      onClick: onPrevious,
      className: "gap-1"
    },
    /* @__PURE__ */ React5.createElement(ArrowLeft, { className: "h-4 w-4 mr-1" }),
    previousText
  ), position === "split" && /* @__PURE__ */ React5.createElement("div", { className: "flex-grow" }), showNext && onNext && /* @__PURE__ */ React5.createElement(
    Button,
    {
      type: "button",
      variant: getPrimaryVariant(),
      onClick: onNext,
      disabled: !isValid,
      className: "gap-1"
    },
    nextText,
    /* @__PURE__ */ React5.createElement(ArrowRight, { className: "h-4 w-4 ml-1" })
  ), showSubmit && onSubmit && /* @__PURE__ */ React5.createElement(
    Button,
    {
      type: "submit",
      variant: getPrimaryVariant(),
      onClick: onSubmit,
      disabled: !isValid,
      className: "gap-1"
    },
    options.submitText || submitText,
    /* @__PURE__ */ React5.createElement(Send, { className: "h-4 w-4 ml-1" })
  ));
};

// src/components/blocks/BlockRenderer.tsx
import React42, { forwardRef as forwardRef17 } from "react";

// src/components/blocks/TextInputRenderer.tsx
import React8, { forwardRef as forwardRef3 } from "react";

// src/components/ui/input.tsx
import * as React6 from "react";
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

// src/components/ui/label.tsx
import * as React7 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva as cva2 } from "class-variance-authority";
var labelVariants = cva2(
  "text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[color:var(--x)]"
);
var Label = React7.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React7.createElement(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

// src/components/blocks/TextInputRenderer.tsx
var TextInputRenderer = forwardRef3(
  ({ block, value, onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.target.value);
    };
    return /* @__PURE__ */ React8.createElement("div", { className: "survey-text-input space-y-2" }, block.label && /* @__PURE__ */ React8.createElement(
      Label,
      {
        htmlFor: block.fieldName,
        className: cn("text-base", themeConfig.field.label)
      },
      block.label
    ), block.description && /* @__PURE__ */ React8.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React8.createElement(
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
    ), error && /* @__PURE__ */ React8.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
  }
);
TextInputRenderer.displayName = "TextInputRenderer";

// src/components/blocks/TextareaRenderer.tsx
import React10, { forwardRef as forwardRef5 } from "react";

// src/components/ui/textarea.tsx
import * as React9 from "react";
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

// src/components/blocks/TextareaRenderer.tsx
var TextareaRenderer = forwardRef5(
  ({ block, value, onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.target.value);
    };
    return /* @__PURE__ */ React10.createElement("div", { className: "survey-textarea space-y-2" }, block.label && /* @__PURE__ */ React10.createElement(
      Label,
      {
        htmlFor: block.fieldName,
        className: cn("text-base", themeConfig.field.label)
      },
      block.label
    ), block.description && /* @__PURE__ */ React10.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React10.createElement(
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
    ), error && /* @__PURE__ */ React10.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
  }
);
TextareaRenderer.displayName = "TextareaRenderer";

// src/components/blocks/RadioRenderer.tsx
import React12 from "react";

// src/components/ui/radio-group.tsx
import * as React11 from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
var RadioGroup = React11.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React11.createElement(
    RadioGroupPrimitive.Root,
    {
      className: cn("", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React11.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React11.createElement(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    },
    /* @__PURE__ */ React11.createElement(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center" }, /* @__PURE__ */ React11.createElement(Circle, { className: "h-3.5 w-3.5 fill-primary" }))
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// src/components/blocks/RadioRenderer.tsx
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
  return /* @__PURE__ */ React12.createElement("div", { className: "survey-radio space-y-3" }, block.label && /* @__PURE__ */ React12.createElement(Label, { className: cn("text-base block", themeConfig.field.label) }, block.label), block.description && /* @__PURE__ */ React12.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React12.createElement(
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
      disabled
    },
    labels.map((label, index) => {
      const optionValue = values[index];
      const id = `${block.fieldName}-${index}`;
      const stringValue = typeof optionValue === "string" ? optionValue : optionValue.toString();
      return /* @__PURE__ */ React12.createElement("div", { key: id, className: "flex items-center space-x-2" }, /* @__PURE__ */ React12.createElement(
        RadioGroupItem,
        {
          id,
          value: stringValue,
          disabled,
          "aria-invalid": !!error
        }
      ), /* @__PURE__ */ React12.createElement(
        Label,
        {
          htmlFor: id,
          className: "text-sm font-normal cursor-pointer"
        },
        label
      ));
    })
  ), error && /* @__PURE__ */ React12.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
};

// src/components/blocks/CheckboxRenderer.tsx
import React14, { forwardRef as forwardRef8 } from "react";

// src/components/ui/checkbox.tsx
import * as React13 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
var Checkbox = React13.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React13.createElement(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React13.createElement(
    CheckboxPrimitive.Indicator,
    {
      className: cn("flex items-center justify-center text-current")
    },
    /* @__PURE__ */ React13.createElement(Check, { className: "h-4 w-4" })
  )
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/blocks/CheckboxRenderer.tsx
var CheckboxRenderer = forwardRef8(
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
    return /* @__PURE__ */ React14.createElement("div", { className: "survey-checkbox space-y-3" }, block.label && /* @__PURE__ */ React14.createElement(Label, { className: cn("text-base block", themeConfig.field.label) }, block.label), block.description && /* @__PURE__ */ React14.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React14.createElement("div", { className: "space-y-2 mt-2" }, labels.map((label, index) => {
      const optionValue = values[index];
      const id = `${block.fieldName}-${index}`;
      const isChecked = typeof optionValue === "string" || typeof optionValue === "number" ? (value == null ? void 0 : value.includes(optionValue)) || false : false;
      return /* @__PURE__ */ React14.createElement("div", { key: id, className: "flex items-center space-x-2 py-1" }, /* @__PURE__ */ React14.createElement(
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
      ), /* @__PURE__ */ React14.createElement(
        Label,
        {
          htmlFor: id,
          className: "text-sm font-normal cursor-pointer"
        },
        label
      ));
    })), error && /* @__PURE__ */ React14.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
  }
);
CheckboxRenderer.displayName = "CheckboxRenderer";

// src/components/blocks/SelectRenderer.tsx
import React16, { forwardRef as forwardRef10 } from "react";

// src/components/ui/select.tsx
import * as React15 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check2, ChevronDown, ChevronUp } from "lucide-react";
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React15.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React15.createElement(
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
  /* @__PURE__ */ React15.createElement(SelectPrimitive.Icon, { asChild: true }, /* @__PURE__ */ React15.createElement(ChevronDown, { className: "h-4 w-4 opacity-50" }))
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React15.createElement(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React15.createElement(ChevronUp, { className: "h-4 w-4" })
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React15.createElement(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React15.createElement(ChevronDown, { className: "h-4 w-4" })
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React15.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ React15.createElement(SelectPrimitive.Portal, null, /* @__PURE__ */ React15.createElement(
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
  /* @__PURE__ */ React15.createElement(SelectScrollUpButton, null),
  /* @__PURE__ */ React15.createElement(
    SelectPrimitive.Viewport,
    {
      className: cn(
        "p-1",
        position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
      )
    },
    children
  ),
  /* @__PURE__ */ React15.createElement(SelectScrollDownButton, null)
)));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React15.createElement(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React15.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React15.createElement(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React15.createElement("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React15.createElement(SelectPrimitive.ItemIndicator, null, /* @__PURE__ */ React15.createElement(Check2, { className: "h-4 w-4" }))),
  /* @__PURE__ */ React15.createElement(SelectPrimitive.ItemText, null, children)
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React15.createElement(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// src/components/blocks/SelectRenderer.tsx
var SelectRenderer = forwardRef10(
  ({ block, value, onChange, onBlur, error, disabled, theme = null }, ref) => {
    const themeConfig = theme != null ? theme : themes.default;
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.target.value);
    };
    const labels = block.labels || [];
    const values = block.values || labels.map((_, i) => i);
    return /* @__PURE__ */ React16.createElement("div", { className: "survey-select space-y-2" }, block.label && /* @__PURE__ */ React16.createElement(
      Label,
      {
        htmlFor: block.fieldName,
        className: cn("text-base", themeConfig.field.label)
      },
      block.label
    ), block.description && /* @__PURE__ */ React16.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React16.createElement(
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
        disabled
      },
      /* @__PURE__ */ React16.createElement(
        SelectTrigger,
        {
          id: block.fieldName,
          className: cn(error && "border-destructive", themeConfig.field.select),
          "aria-invalid": !!error,
          ref
        },
        /* @__PURE__ */ React16.createElement(SelectValue, { placeholder: block.placeholder || "Select an option" })
      ),
      /* @__PURE__ */ React16.createElement(SelectContent, null, labels.map((label, index) => {
        const optionValue = values[index];
        const stringValue = optionValue !== void 0 ? optionValue.toString() : "";
        return /* @__PURE__ */ React16.createElement(SelectItem, { key: index, value: stringValue }, label);
      }))
    ), error && /* @__PURE__ */ React16.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
  }
);
SelectRenderer.displayName = "SelectRenderer";

// src/components/blocks/MarkdownRenderer.tsx
import React17 from "react";
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
  return /* @__PURE__ */ React17.createElement(
    "div",
    {
      className: "survey-markdown",
      dangerouslySetInnerHTML: { __html: html }
    }
  );
};

// src/components/blocks/HtmlRenderer.tsx
import React18 from "react";
var HtmlRenderer = ({
  block,
  theme = null
}) => {
  const themeConfig = theme != null ? theme : themes.default;
  return /* @__PURE__ */ React18.createElement(
    "div",
    {
      className: "survey-html",
      dangerouslySetInnerHTML: { __html: block.html || "" }
    }
  );
};

// src/components/blocks/RangeRenderer.tsx
import React20, { useState as useState3, useEffect as useEffect3 } from "react";

// src/components/ui/slider.tsx
import React19, { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
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
  const trackRef = useRef2(null);
  const thumbRefs = useRef2([]);
  const [dragging, setDragging] = useState2(null);
  const [internalValues, setInternalValues] = useState2(value);
  useEffect2(() => {
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
  return /* @__PURE__ */ React19.createElement(
    "div",
    {
      className: cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )
    },
    /* @__PURE__ */ React19.createElement(
      "div",
      {
        ref: trackRef,
        className: "relative h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800",
        onClick: handleTrackClick
      },
      /* @__PURE__ */ React19.createElement(
        "div",
        {
          className: "absolute h-full rounded-full bg-primary",
          style: {
            left: "0%",
            width: `${getPercentage(internalValues[0])}%`
          }
        }
      ),
      internalValues.map((val, index) => /* @__PURE__ */ React19.createElement(
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

// src/components/blocks/RangeRenderer.tsx
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
  const [currentValue, setCurrentValue] = useState3(
    value !== void 0 ? Number(value) : block.defaultValue !== void 0 ? Number(block.defaultValue) : min
  );
  useEffect3(() => {
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
        /* @__PURE__ */ React20.createElement(
          "div",
          {
            key: i,
            className: "absolute text-xs -translate-x-1/2",
            style: { left: `${percentage}%`, top: "20px" }
          },
          i
        )
      );
    }
  }
  return /* @__PURE__ */ React20.createElement("div", { className: "survey-range space-y-4" }, block.label && /* @__PURE__ */ React20.createElement(
    Label,
    {
      htmlFor: block.fieldName,
      className: cn("text-base", themeConfig.field.label)
    },
    block.label
  ), block.description && /* @__PURE__ */ React20.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React20.createElement("div", { className: "pt-4 px-2" }, /* @__PURE__ */ React20.createElement(
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
  ), marks.length > 0 && /* @__PURE__ */ React20.createElement("div", { className: "relative h-6 mt-1" }, marks), valueDisplay && /* @__PURE__ */ React20.createElement("div", { className: "flex justify-between mt-3 text-sm" }, /* @__PURE__ */ React20.createElement("span", { className: cn("text-muted-foreground", themeConfig.field.text) }, min), /* @__PURE__ */ React20.createElement("span", { className: cn("font-medium", themeConfig.field.activeText) }, valueDisplay), /* @__PURE__ */ React20.createElement("span", { className: cn("text-muted-foreground", themeConfig.field.text) }, max))), error && /* @__PURE__ */ React20.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
};

// src/components/blocks/DatePickerRenderer.tsx
import React23, { useState as useState5, useEffect as useEffect6 } from "react";

// src/components/ui/calendar.tsx
import * as React21 from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ React21.createElement(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, children, ...restProps }) => {
          const {
            // Remove button-specific props
            defaultChecked,
            defaultValue,
            suppressContentEditableWarning,
            suppressHydrationWarning,
            // Remove any other potentially problematic props
            role,
            tabIndex,
            ...divProps
          } = restProps;
          return /* @__PURE__ */ React21.createElement(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...divProps
            },
            children
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ React21.createElement(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ React21.createElement(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ React21.createElement(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ week, ...props2 }) => {
          return /* @__PURE__ */ React21.createElement("td", { ...props2 }, /* @__PURE__ */ React21.createElement("div", { className: "flex size-(--cell-size) items-center justify-center text-center" }, week.weekNumber));
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React21.useRef(null);
  React21.useEffect(() => {
    var _a;
    if (modifiers.focused) (_a = ref.current) == null ? void 0 : _a.focus();
  }, [modifiers.focused]);
  const {
    formAction,
    formEncType,
    formMethod,
    formNoValidate,
    formTarget,
    ...buttonProps
  } = props;
  return /* @__PURE__ */ React21.createElement(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...buttonProps
    }
  );
}

// src/components/ui/popover.tsx
import React22, { useState as useState4, useRef as useRef4, useEffect as useEffect5 } from "react";
var PopoverTrigger = ({
  children,
  className,
  onClick
}) => {
  return /* @__PURE__ */ React22.createElement(
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
  const ref = useRef4(null);
  useEffect5(() => {
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
  return /* @__PURE__ */ React22.createElement(
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
  const [open, setOpen] = useState4(false);
  const childrenWithProps = React22.Children.map(children, (child) => {
    if (React22.isValidElement(child)) {
      if (child.type === PopoverTrigger) {
        return React22.cloneElement(child, {
          onClick: () => setOpen(!open)
        });
      }
      if (child.type === PopoverContent) {
        return React22.cloneElement(child, {
          open,
          onClose: () => setOpen(false)
        });
      }
    }
    return child;
  });
  return /* @__PURE__ */ React22.createElement(React22.Fragment, null, childrenWithProps);
};

// src/components/blocks/DatePickerRenderer.tsx
import { format, formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  const [date, setDate] = useState5(
    value ? new Date(value) : block.defaultValue ? new Date(block.defaultValue) : null
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState5(false);
  useEffect6(() => {
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
  const disabledDays = React23.useMemo(() => {
    if (!block.disabledDays) return void 0;
    try {
      return block.disabledDays.split(",").map((d) => parseInt(d.trim(), 10));
    } catch (e) {
      return void 0;
    }
  }, [block.disabledDays]);
  const dateConstraints = React23.useMemo(() => {
    const constraints = {};
    if (block.minDate) {
      constraints.min = block.minDate;
    }
    if (block.maxDate) {
      constraints.max = block.maxDate;
    }
    return constraints;
  }, [block.minDate, block.maxDate]);
  const formattedDate = date ? formatDate(date, block.dateFormat || "PPP") : "";
  return /* @__PURE__ */ React23.createElement("div", { className: "survey-datepicker space-y-2" }, block.label && /* @__PURE__ */ React23.createElement(
    Label,
    {
      htmlFor: block.fieldName,
      className: cn("text-base", themeConfig.field.label)
    },
    block.label
  ), block.description && /* @__PURE__ */ React23.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React23.createElement(PopoverRoot, null, /* @__PURE__ */ React23.createElement(PopoverTrigger, { asChild: true }, /* @__PURE__ */ React23.createElement(
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
      onClick: () => setIsCalendarOpen(true)
    },
    /* @__PURE__ */ React23.createElement(CalendarIcon, { className: "mr-2 h-4 w-4" }),
    date ? format(date, getDateFormat(block.dateFormat)) : /* @__PURE__ */ React23.createElement("span", null, block.placeholder || "Select a date")
  )), /* @__PURE__ */ React23.createElement(PopoverContent, { className: "w-auto p-0", align: "start" }, /* @__PURE__ */ React23.createElement(
    Calendar,
    {
      mode: "single",
      selected: date || void 0,
      onSelect: (newDate) => {
        if (newDate) {
          handleDateSelect(newDate);
        }
      },
      disabled: (date2) => {
        if (dateConstraints.min && date2 < new Date(dateConstraints.min)) {
          return true;
        }
        if (dateConstraints.max && date2 > new Date(dateConstraints.max)) {
          return true;
        }
        if (disabledDays && disabledDays.includes(date2.getDay())) {
          return true;
        }
        return false;
      },
      initialFocus: true
    }
  ))), error && /* @__PURE__ */ React23.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
};

// src/components/blocks/FileUploadRenderer.tsx
import React24, { useState as useState6, useRef as useRef5 } from "react";
import { UploadCloud, X } from "lucide-react";
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
  const fileInputRef = useRef5(null);
  const [files, setFiles] = useState6(() => {
    if (Array.isArray(value)) {
      return value;
    }
    return [];
  });
  const [isDragging, setIsDragging] = useState6(false);
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
      return /* @__PURE__ */ React24.createElement(
        "div",
        {
          key: index,
          className: `flex items-center gap-2 p-2 rounded-md mt-2 ${themeConfig.container.card}`
        },
        showPreview && /* @__PURE__ */ React24.createElement("div", { className: "w-10 h-10 flex-shrink-0 rounded overflow-hidden" }, /* @__PURE__ */ React24.createElement(
          "img",
          {
            src: URL.createObjectURL(file),
            alt: file.name,
            className: "w-full h-full object-cover"
          }
        )),
        /* @__PURE__ */ React24.createElement("div", { className: "flex-grow truncate" }, /* @__PURE__ */ React24.createElement("p", { className: `text-sm font-medium truncate ${themeConfig.field.label}` }, file.name), /* @__PURE__ */ React24.createElement("p", { className: `text-xs ${themeConfig.field.description}` }, (file.size / 1024).toFixed(1), " KB")),
        !disabled && /* @__PURE__ */ React24.createElement(
          "button",
          {
            type: "button",
            onClick: () => handleRemoveFile(index),
            className: `flex-shrink-0 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`,
            "aria-label": "Remove file"
          },
          /* @__PURE__ */ React24.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ React24.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }))
        )
      );
    });
  };
  return /* @__PURE__ */ React24.createElement("div", { className: "survey-file-upload space-y-3" }, block.label && /* @__PURE__ */ React24.createElement(
    Label,
    {
      htmlFor: block.fieldName,
      className: cn("text-base", themeConfig.field.label)
    },
    block.label
  ), block.description && /* @__PURE__ */ React24.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React24.createElement(
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
      }
    },
    /* @__PURE__ */ React24.createElement(
      UploadCloud,
      {
        className: cn("mx-auto h-10 w-10 mb-2 text-muted-foreground", themeConfig.field.description)
      }
    ),
    /* @__PURE__ */ React24.createElement("p", { className: cn("text-sm font-medium mb-1", themeConfig.field.text) }, block.helpText || "Drag and drop files here or click to browse"),
    /* @__PURE__ */ React24.createElement("p", { className: cn("text-xs text-muted-foreground", themeConfig.field.description) }, acceptedTypes && acceptedTypes.length > 0 ? `Accepted formats: ${acceptedTypes.join(", ")}` : "All file formats accepted", block.maxFileSize && ` \u2022 Max size: ${block.maxFileSize} MB`, maxFiles > 1 && ` \u2022 Max files: ${maxFiles}`),
    /* @__PURE__ */ React24.createElement(
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
  ), files.length > 0 && /* @__PURE__ */ React24.createElement("div", { className: "mt-4 space-y-2" }, files.map((file, index) => {
    const isImage = file.type.startsWith("image/");
    const showPreview = block.showPreview && isImage;
    return /* @__PURE__ */ React24.createElement(
      "div",
      {
        key: index,
        className: cn(
          "flex items-center gap-2 p-2 rounded-md border",
          themeConfig.container.card
        )
      },
      showPreview && /* @__PURE__ */ React24.createElement("div", { className: "w-10 h-10 flex-shrink-0 rounded overflow-hidden" }, /* @__PURE__ */ React24.createElement(
        "img",
        {
          src: URL.createObjectURL(file),
          alt: file.name,
          className: "w-full h-full object-cover"
        }
      )),
      /* @__PURE__ */ React24.createElement("div", { className: "flex-grow truncate" }, /* @__PURE__ */ React24.createElement("p", { className: cn("text-sm font-medium truncate", themeConfig.field.label) }, file.name), /* @__PURE__ */ React24.createElement("p", { className: cn("text-xs text-muted-foreground", themeConfig.field.description) }, (file.size / 1024).toFixed(1), " KB")),
      !disabled && /* @__PURE__ */ React24.createElement(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          onClick: () => handleRemoveFile(index),
          className: "h-7 w-7",
          "aria-label": "Remove file"
        },
        /* @__PURE__ */ React24.createElement(X, { className: "h-4 w-4" })
      )
    );
  })), error && /* @__PURE__ */ React24.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
};

// src/components/blocks/MatrixRenderer.tsx
import React26, { useState as useState7, useEffect as useEffect8 } from "react";

// src/components/ui/table.tsx
import * as React25 from "react";
var Table = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement("div", { className: "relative w-full overflow-auto" }, /* @__PURE__ */ React25.createElement(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
)));
Table.displayName = "Table";
var TableHeader = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
var TableBody = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement(
  "tfoot",
  {
    ref,
    className: cn("bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement(
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
var TableHead = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement(
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
var TableCell = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement(
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
var TableCaption = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React25.createElement(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

// src/components/blocks/MatrixRenderer.tsx
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
  const [responses, setResponses] = useState7(value || {});
  useEffect8(() => {
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
  return /* @__PURE__ */ React26.createElement("div", { className: "survey-matrix space-y-4" }, block.label && /* @__PURE__ */ React26.createElement(
    Label,
    {
      className: cn("text-base block", themeConfig.field.label)
    },
    block.label
  ), block.description && /* @__PURE__ */ React26.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React26.createElement("div", { className: cn("rounded-md border", themeConfig.container.card) }, /* @__PURE__ */ React26.createElement(Table, null, /* @__PURE__ */ React26.createElement(TableHeader, { className: themeConfig.container.header }, /* @__PURE__ */ React26.createElement(TableRow, null, /* @__PURE__ */ React26.createElement(TableHead, { className: "w-[250px]" }, block.columnHeader || ""), options.map((option) => /* @__PURE__ */ React26.createElement(TableHead, { key: option.id, className: "text-center whitespace-nowrap" }, option.text)))), /* @__PURE__ */ React26.createElement(TableBody, null, questions.map((question) => /* @__PURE__ */ React26.createElement(
    TableRow,
    {
      key: question.id,
      className: cn(responses[question.id] && themeConfig.container.activeBg)
    },
    /* @__PURE__ */ React26.createElement(TableCell, { className: cn("font-medium", themeConfig.field.text) }, question.text),
    options.map((option) => {
      const id = `${block.fieldName}-${question.id}-${option.id}`;
      const isSelected = responses[question.id] === option.value;
      return /* @__PURE__ */ React26.createElement(TableCell, { key: option.id, className: "text-center" }, /* @__PURE__ */ React26.createElement("div", { className: "flex items-center justify-center" }, /* @__PURE__ */ React26.createElement(
        RadioGroup,
        {
          name: `${block.fieldName}-${question.id}`,
          value: responses[question.id],
          onValueChange: (value2) => handleSelect(question.id, value2),
          disabled,
          className: "flex"
        },
        /* @__PURE__ */ React26.createElement(
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
      )));
    })
  ))))), error && /* @__PURE__ */ React26.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
};

// src/components/blocks/SelectableBoxRenderer.tsx
import React28, { useState as useState8, useEffect as useEffect9, useId } from "react";

// src/components/ui/card.tsx
import * as React27 from "react";
var Card = React27.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React27.createElement(
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
var CardHeader = React27.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React27.createElement(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React27.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React27.createElement(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React27.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React27.createElement(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React27.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React27.createElement("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React27.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React27.createElement(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// src/components/blocks/SelectableBoxRenderer.tsx
import { CheckSquare } from "lucide-react";
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
  const idPrefix = useId();
  const options = block.options || [];
  const boxSpacing = block.boxSpacing || "4";
  const showSelectionIndicator = block.showSelectionIndicator !== false;
  const [selectedValue, setSelectedValue] = useState8(value || "");
  useEffect9(() => {
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
  return /* @__PURE__ */ React28.createElement("div", { className: "survey-box-question space-y-4" }, block.label && /* @__PURE__ */ React28.createElement(
    Label,
    {
      className: cn("text-lg font-bold block", themeConfig.field.label)
    },
    block.label
  ), block.description && /* @__PURE__ */ React28.createElement("div", { className: cn("text-sm text-muted-foreground", themeConfig.field.description) }, block.description), /* @__PURE__ */ React28.createElement(
    RadioGroup,
    {
      value: selectedValue,
      onValueChange: handleSelect,
      disabled,
      className: `space-y-${boxSpacing} my-8`
    },
    options.map((option) => {
      const isSelected = selectedValue === option.value;
      const id = `${idPrefix}-${block.fieldName}-${option.id}`;
      return /* @__PURE__ */ React28.createElement("div", { key: option.id, className: "relative" }, /* @__PURE__ */ React28.createElement(
        RadioGroupItem,
        {
          value: option.value,
          id,
          className: "sr-only",
          "aria-invalid": !!error
        }
      ), /* @__PURE__ */ React28.createElement(
        Label,
        {
          htmlFor: id,
          className: cn(
            "block w-full cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )
        },
        /* @__PURE__ */ React28.createElement(
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
            )
          },
          /* @__PURE__ */ React28.createElement("div", { className: cn(
            "flex items-center justify-between",
            themeConfig.field.selectableBoxContainer || ""
          ) }, /* @__PURE__ */ React28.createElement("span", { className: cn(
            "text-foreground",
            themeConfig.field.selectableBoxText || themeConfig.field.text,
            isSelected && (themeConfig.field.selectableBoxTextSelected || themeConfig.field.activeText)
          ) }, option.label), isSelected && showSelectionIndicator && /* @__PURE__ */ React28.createElement("div", { className: cn(
            "flex h-5 w-5 items-center justify-center rounded-full",
            themeConfig.field.selectableBoxIndicator || "bg-primary text-primary-foreground"
          ) }, /* @__PURE__ */ React28.createElement(CheckSquare, { className: cn(
            "h-3 w-3",
            themeConfig.field.selectableBoxIndicatorIcon || ""
          ) })))
        )
      ));
    })
  ), error && /* @__PURE__ */ React28.createElement("div", { className: cn("text-sm font-medium text-destructive", themeConfig.field.error) }, error));
};

// src/components/blocks/ScriptRenderer.tsx
import { useEffect as useEffect10, useContext as useContext2 } from "react";
init_surveyUtils();
var ScriptRenderer = ({ block }) => {
  const { values, setValue, currentPage, setError } = useContext2(SurveyFormContext);
  useEffect10(() => {
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

// src/components/blocks/SetRenderer.tsx
import React32 from "react";

// src/components/ui/ValidationSummary.tsx
import React31 from "react";

// src/components/ui/alert.tsx
import * as React30 from "react";
import { cva as cva3 } from "class-variance-authority";
var alertVariants = cva3(
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
var Alert = React30.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ React30.createElement(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
var AlertTitle = React30.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React30.createElement(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React30.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React30.createElement(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

// src/components/ui/ValidationSummary.tsx
import { AlertCircle } from "lucide-react";
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
  return /* @__PURE__ */ React31.createElement(Alert, { variant: "destructive", className: `mb-4 ${className}` }, showIcon && /* @__PURE__ */ React31.createElement(AlertCircle, { className: "h-4 w-4" }), /* @__PURE__ */ React31.createElement(AlertTitle, null, "Validation Errors"), /* @__PURE__ */ React31.createElement(AlertDescription, null, /* @__PURE__ */ React31.createElement("ul", { className: "mt-2 list-disc pl-5" }, filteredErrors.map(([field, error]) => /* @__PURE__ */ React31.createElement("li", { key: field, className: "text-sm" }, /* @__PURE__ */ React31.createElement("strong", null, field, ":"), " ", error)))));
};

// src/components/blocks/SetRenderer.tsx
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
  return /* @__PURE__ */ React32.createElement(Card, { className: cn("border bg-card", block.className) }, (block.label || block.description) && /* @__PURE__ */ React32.createElement(CardHeader, null, block.label && /* @__PURE__ */ React32.createElement(CardTitle, { className: themeConfig.field.label }, block.label), block.description && /* @__PURE__ */ React32.createElement(CardDescription, { className: themeConfig.field.description }, block.description)), /* @__PURE__ */ React32.createElement(CardContent, { className: "space-y-4 p-4" }, fieldNames.length > 0 && /* @__PURE__ */ React32.createElement(ValidationSummary, { fieldNames }), /* @__PURE__ */ React32.createElement("div", { className: "set-items space-y-4" }, visibleItems.map((childBlock, index) => {
    const isChildVisible = childBlock.visibleIf ? evaluateCondition2(childBlock.visibleIf) : true;
    if (!isChildVisible) return null;
    return /* @__PURE__ */ React32.createElement(
      BlockRenderer,
      {
        key: childBlock.uuid || `${block.uuid}-child-${index}`,
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
      }
    );
  }))));
};

// src/components/blocks/ConditionalBlock.tsx
import React33 from "react";
var ConditionalBlock = ({
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
  return /* @__PURE__ */ React33.createElement(
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

// src/components/blocks/CalculatedFieldRenderer.tsx
import React34, { useEffect as useEffect11, useState as useState9, useRef as useRef6 } from "react";
import { AlertCircle as AlertCircle2 } from "lucide-react";
var CalculatedFieldRenderer = ({
  block,
  formula,
  dependencies,
  format: format2,
  theme = null
}) => {
  const { values, computedValues, updateComputedValues } = useSurveyForm();
  const themeConfig = theme != null ? theme : themes.default;
  const [error, setError] = useState9(null);
  const [displayValue, setDisplayValue] = useState9("Waiting for inputs...");
  const prevDependencyValues = useRef6([]);
  useEffect11(() => {
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
  return /* @__PURE__ */ React34.createElement(Card, { className: cn("w-full border bg-card", block.className) }, /* @__PURE__ */ React34.createElement(CardContent, { className: "p-4" }, block.label && /* @__PURE__ */ React34.createElement(Label, { className: cn("text-base block font-medium mb-2", themeConfig.field.label) }, block.label), block.description && /* @__PURE__ */ React34.createElement("div", { className: cn("text-sm text-muted-foreground mb-3", themeConfig.field.description) }, block.description), /* @__PURE__ */ React34.createElement("div", { className: cn(
    "p-3 rounded-md",
    error ? "bg-destructive/10" : "bg-accent/50"
  ) }, /* @__PURE__ */ React34.createElement("div", { className: "flex items-center gap-2" }, error && /* @__PURE__ */ React34.createElement(AlertCircle2, { className: "h-4 w-4 text-destructive" }), /* @__PURE__ */ React34.createElement("p", { className: cn(
    "text-lg font-semibold",
    error ? "text-destructive" : ""
  ) }, displayValue)), error && /* @__PURE__ */ React34.createElement("p", { className: "text-sm text-destructive mt-1" }, error)), block.note && /* @__PURE__ */ React34.createElement("p", { className: "text-sm text-muted-foreground mt-2" }, block.note)));
};

// src/components/blocks/BMICalculatorRenderer.tsx
import React39, { useState as useState10, useEffect as useEffect12, useRef as useRef7 } from "react";

// src/components/ui/badge.tsx
import * as React35 from "react";
import { cva as cva4 } from "class-variance-authority";
var badgeVariants = cva4(
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
  return /* @__PURE__ */ React35.createElement("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// src/components/ui/progress.tsx
import * as React36 from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
var Progress = React36.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ React36.createElement(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React36.createElement(
    ProgressPrimitive.Indicator,
    {
      className: "h-full w-full flex-1 bg-primary transition-all",
      style: { transform: `translateX(-${100 - (value || 0)}%)` }
    }
  )
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// src/components/ui/tabs.tsx
import * as React37 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
var Tabs = TabsPrimitive.Root;
var TabsList = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
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
var TabsTrigger = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
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
var TabsContent = React37.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React37.createElement(
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
import * as React38 from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
var Separator2 = React38.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ React38.createElement(
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

// src/components/blocks/BMICalculatorRenderer.tsx
import { Activity, Ruler, Weight, TrendingUp } from "lucide-react";
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
  const initialRenderRef = useRef7(true);
  const fieldName = block.fieldName || "bmiCalculator";
  const [unitSystem, setUnitSystem] = useState10(
    value.unitSystem || block.defaultUnit || "metric"
  );
  const [height, setHeight] = useState10(
    value.height || (unitSystem === "metric" ? 170 : 70)
  );
  const [weight, setWeight] = useState10(
    value.weight || (unitSystem === "metric" ? 70 : 150)
  );
  const prevValuesRef = useRef7({
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
  useEffect12(() => {
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
  return /* @__PURE__ */ React39.createElement(Card, { className: getCardClassName() }, /* @__PURE__ */ React39.createElement(CardHeader, { className: "text-center pb-6" }, /* @__PURE__ */ React39.createElement(CardTitle, { className: "flex items-center justify-center gap-3 text-2xl" }, /* @__PURE__ */ React39.createElement("div", { className: `p-2 rounded-full bg-gradient-to-r ${bmiData.color}` }, /* @__PURE__ */ React39.createElement(Activity, { className: "w-6 h-6 text-white" })), block.label || "BMI Calculator"), block.description && /* @__PURE__ */ React39.createElement("p", { className: "text-muted-foreground max-w-md mx-auto" }, block.description)), /* @__PURE__ */ React39.createElement(CardContent, { className: "space-y-8" }, /* @__PURE__ */ React39.createElement(
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
      className: "w-full"
    },
    /* @__PURE__ */ React39.createElement(TabsList, { className: "grid w-full grid-cols-2 mb-6" }, /* @__PURE__ */ React39.createElement(TabsTrigger, { value: "metric", className: "flex items-center gap-2", disabled }, /* @__PURE__ */ React39.createElement(Ruler, { className: "w-4 h-4" }), "Metric"), /* @__PURE__ */ React39.createElement(TabsTrigger, { value: "imperial", className: "flex items-center gap-2", disabled }, /* @__PURE__ */ React39.createElement(Weight, { className: "w-4 h-4" }), "Imperial")),
    /* @__PURE__ */ React39.createElement(TabsContent, { value: "metric", className: "space-y-6" }, /* @__PURE__ */ React39.createElement("div", { className: "grid grid-cols-2 gap-6" }, /* @__PURE__ */ React39.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React39.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ React39.createElement(Ruler, { className: "w-4 h-4 text-muted-foreground" }), "Height (cm)"), /* @__PURE__ */ React39.createElement("div", { className: "relative" }, /* @__PURE__ */ React39.createElement(
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
    ), /* @__PURE__ */ React39.createElement("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "cm"))), /* @__PURE__ */ React39.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React39.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ React39.createElement(Weight, { className: "w-4 h-4 text-muted-foreground" }), "Weight (kg)"), /* @__PURE__ */ React39.createElement("div", { className: "relative" }, /* @__PURE__ */ React39.createElement(
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
    ), /* @__PURE__ */ React39.createElement("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "kg"))))),
    /* @__PURE__ */ React39.createElement(TabsContent, { value: "imperial", className: "space-y-6" }, /* @__PURE__ */ React39.createElement("div", { className: "grid grid-cols-2 gap-6" }, /* @__PURE__ */ React39.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React39.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ React39.createElement(Ruler, { className: "w-4 h-4 text-muted-foreground" }), "Height"), /* @__PURE__ */ React39.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React39.createElement(
      Select,
      {
        value: imperialHeight.feet.toString(),
        onValueChange: (value2) => setImperialHeight(parseInt(value2), imperialHeight.inches),
        disabled
      },
      /* @__PURE__ */ React39.createElement(SelectTrigger, { className: "h-14" }, /* @__PURE__ */ React39.createElement(SelectValue, null)),
      /* @__PURE__ */ React39.createElement(SelectContent, null, [3, 4, 5, 6, 7, 8].map((ft) => /* @__PURE__ */ React39.createElement(SelectItem, { key: ft, value: ft.toString() }, ft, "'")))
    ), /* @__PURE__ */ React39.createElement(
      Select,
      {
        value: imperialHeight.inches.toString(),
        onValueChange: (value2) => setImperialHeight(imperialHeight.feet, parseInt(value2)),
        disabled
      },
      /* @__PURE__ */ React39.createElement(SelectTrigger, { className: "h-14" }, /* @__PURE__ */ React39.createElement(SelectValue, null)),
      /* @__PURE__ */ React39.createElement(SelectContent, null, Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ React39.createElement(SelectItem, { key: i, value: i.toString() }, i, '"')))
    ))), /* @__PURE__ */ React39.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React39.createElement(Label, { className: "text-base font-medium flex items-center gap-2" }, /* @__PURE__ */ React39.createElement(Weight, { className: "w-4 h-4 text-muted-foreground" }), "Weight (lbs)"), /* @__PURE__ */ React39.createElement("div", { className: "relative" }, /* @__PURE__ */ React39.createElement(
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
    ), /* @__PURE__ */ React39.createElement("div", { className: "absolute right-3 pl-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" }, "lbs")))))
  ), block.showResults ? /* @__PURE__ */ React39.createElement(Separator2, null) : null, block.showResults ? /* @__PURE__ */ React39.createElement("div", { className: `space-y-6 p-6 rounded-xl border-2 ${bmiData.bgColor}` }, /* @__PURE__ */ React39.createElement("div", { className: "text-center space-y-3" }, /* @__PURE__ */ React39.createElement("div", { className: "flex items-center justify-center gap-2 mb-2" }, /* @__PURE__ */ React39.createElement(TrendingUp, { className: "w-5 h-5 text-muted-foreground" }), /* @__PURE__ */ React39.createElement("span", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide" }, "Your BMI Score")), /* @__PURE__ */ React39.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React39.createElement("div", { className: `text-5xl font-bold bg-gradient-to-r ${bmiData.color} bg-clip-text text-transparent` }, bmi.toFixed(1)), /* @__PURE__ */ React39.createElement(Badge, { variant: "secondary", className: `px-4 py-1 text-sm font-medium ${bmiData.textColor} bg-white/80` }, bmiData.category))), /* @__PURE__ */ React39.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React39.createElement("div", { className: "flex justify-between text-xs font-medium text-muted-foreground px-1" }, /* @__PURE__ */ React39.createElement("span", null, "Underweight"), /* @__PURE__ */ React39.createElement("span", null, "Normal"), /* @__PURE__ */ React39.createElement("span", null, "Overweight"), /* @__PURE__ */ React39.createElement("span", null, "Obese")), /* @__PURE__ */ React39.createElement("div", { className: "relative" }, /* @__PURE__ */ React39.createElement(Progress, { value: bmiData.progress, className: "h-3 bg-white/50" }), /* @__PURE__ */ React39.createElement("div", { className: "absolute top-0 left-0 h-3 w-full bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-red-400 rounded-full opacity-20" })), /* @__PURE__ */ React39.createElement("div", { className: "flex justify-between text-xs text-muted-foreground px-1" }, /* @__PURE__ */ React39.createElement("span", null, "<18.5"), /* @__PURE__ */ React39.createElement("span", null, "18.5-24.9"), /* @__PURE__ */ React39.createElement("span", null, "25-29.9"), /* @__PURE__ */ React39.createElement("span", null, "\u226530"))), /* @__PURE__ */ React39.createElement("div", { className: "text-center" }, /* @__PURE__ */ React39.createElement("p", { className: `text-sm font-medium ${bmiData.textColor}` }, bmiData.advice))) : null, error && /* @__PURE__ */ React39.createElement("div", { className: cn("text-sm text-destructive mt-2 p-3 bg-destructive/10 rounded-md", themeConfig.field.error) }, error)));
};

// src/components/blocks/CheckoutRenderer.tsx
import React40, { useEffect as useEffect13, useState as useState11 } from "react";
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
  const [formState, setFormState] = useState11({
    email: value.email || "",
    phone: value.phone || "",
    shippingAddress: value.shippingAddress || emptyAddress(),
    billingAddress: value.billingAddress || emptyAddress(),
    billingIsSame: (_b = value.billingIsSame) != null ? _b : (_a = block.sameAsBilling) != null ? _a : true
  });
  useEffect13(() => {
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
  return /* @__PURE__ */ React40.createElement("div", { className: cn("survey-checkout space-y-6 max-w-2xl mx-auto", block.className) }, block.label && /* @__PURE__ */ React40.createElement("div", { className: "text-center space-y-2 pb-4" }, /* @__PURE__ */ React40.createElement("h2", { className: "text-2xl font-semibold text-gray-900" }, block.label), block.description && /* @__PURE__ */ React40.createElement("p", { className: "text-gray-600 text-base" }, block.description)), block.showContactInfo && /* @__PURE__ */ React40.createElement("div", { className: sectionClassName }, /* @__PURE__ */ React40.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center" }, /* @__PURE__ */ React40.createElement("span", { className: "w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3" }, "*"), "Contact Information"), /* @__PURE__ */ React40.createElement("div", { className: "space-y-4" }, block.requireEmail && /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { htmlFor: `${fieldName}-email`, className: labelClassName }, "Email address ", block.requireEmail && /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
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
  )), block.requirePhone && /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { htmlFor: `${fieldName}-phone`, className: labelClassName }, "Phone number ", block.requirePhone && /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
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
  )))), block.showShippingAddress && /* @__PURE__ */ React40.createElement("div", { className: sectionClassName }, /* @__PURE__ */ React40.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center" }, /* @__PURE__ */ React40.createElement("span", { className: "w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3" }, "*"), "Shipping Address"), /* @__PURE__ */ React40.createElement("div", { className: "space-y-4" }, block.collectFullName && /* @__PURE__ */ React40.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "First name ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.firstName,
      onChange: (e) => handleAddressChange("shippingAddress", "firstName", e.target.value),
      placeholder: "John",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Last name ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.lastName,
      onChange: (e) => handleAddressChange("shippingAddress", "lastName", e.target.value),
      placeholder: "Doe",
      className: inputClassName,
      disabled
    }
  ))), block.allowCompany && /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Company (optional)"), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.company,
      onChange: (e) => handleAddressChange("shippingAddress", "company", e.target.value),
      placeholder: "Acme Inc.",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Address ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.address1,
      onChange: (e) => handleAddressChange("shippingAddress", "address1", e.target.value),
      placeholder: "123 Main Street",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.address2,
      onChange: (e) => handleAddressChange("shippingAddress", "address2", e.target.value),
      placeholder: "Apartment, suite, etc. (optional)",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "City ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.city,
      onChange: (e) => handleAddressChange("shippingAddress", "city", e.target.value),
      placeholder: "New York",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "State ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Select,
    {
      value: formState.shippingAddress.state,
      onValueChange: (value2) => handleAddressChange("shippingAddress", "state", value2),
      disabled
    },
    /* @__PURE__ */ React40.createElement(SelectTrigger, { className: cn(inputClassName, "h-12") }, /* @__PURE__ */ React40.createElement(SelectValue, { placeholder: "State" })),
    /* @__PURE__ */ React40.createElement(SelectContent, { className: "max-h-60" }, usStates.map((state) => /* @__PURE__ */ React40.createElement(SelectItem, { key: state.code, value: state.code }, state.name)))
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "ZIP code ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.shippingAddress.zip,
      onChange: (e) => handleAddressChange("shippingAddress", "zip", e.target.value),
      placeholder: "10001",
      className: inputClassName,
      disabled
    }
  ))), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Country ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Select,
    {
      value: formState.shippingAddress.country,
      onValueChange: (value2) => handleAddressChange("shippingAddress", "country", value2),
      disabled
    },
    /* @__PURE__ */ React40.createElement(SelectTrigger, { className: cn(inputClassName, "h-12") }, /* @__PURE__ */ React40.createElement(SelectValue, { placeholder: "Country" })),
    /* @__PURE__ */ React40.createElement(SelectContent, null, countries.map((country) => /* @__PURE__ */ React40.createElement(SelectItem, { key: country.code, value: country.code }, country.name)))
  )))), block.showBillingAddress && /* @__PURE__ */ React40.createElement("div", { className: sectionClassName }, /* @__PURE__ */ React40.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React40.createElement("h3", { className: "text-lg font-semibold text-gray-900 flex items-center" }, /* @__PURE__ */ React40.createElement("span", { className: "w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3" }, "*"), "Billing Address"), /* @__PURE__ */ React40.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React40.createElement(
    Checkbox,
    {
      id: "billingIsSame",
      checked: formState.billingIsSame,
      onCheckedChange: handleBillingToggle,
      disabled,
      className: "w-5 h-5"
    }
  ), /* @__PURE__ */ React40.createElement(Label, { htmlFor: "billingIsSame", className: "text-sm text-gray-700 font-medium cursor-pointer" }, "Same as shipping address"))), !formState.billingIsSame && /* @__PURE__ */ React40.createElement("div", { className: "space-y-4" }, block.collectFullName && /* @__PURE__ */ React40.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "First name ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.firstName,
      onChange: (e) => handleAddressChange("billingAddress", "firstName", e.target.value),
      placeholder: "John",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Last name ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.lastName,
      onChange: (e) => handleAddressChange("billingAddress", "lastName", e.target.value),
      placeholder: "Doe",
      className: inputClassName,
      disabled
    }
  ))), block.allowCompany && /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Company (optional)"), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.company,
      onChange: (e) => handleAddressChange("billingAddress", "company", e.target.value),
      placeholder: "Acme Inc.",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Address ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.address1,
      onChange: (e) => handleAddressChange("billingAddress", "address1", e.target.value),
      placeholder: "123 Main Street",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.address2,
      onChange: (e) => handleAddressChange("billingAddress", "address2", e.target.value),
      placeholder: "Apartment, suite, etc. (optional)",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "City ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.city,
      onChange: (e) => handleAddressChange("billingAddress", "city", e.target.value),
      placeholder: "New York",
      className: inputClassName,
      disabled
    }
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "State ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Select,
    {
      value: formState.billingAddress.state,
      onValueChange: (value2) => handleAddressChange("billingAddress", "state", value2),
      disabled
    },
    /* @__PURE__ */ React40.createElement(SelectTrigger, { className: cn(inputClassName, "h-12") }, /* @__PURE__ */ React40.createElement(SelectValue, { placeholder: "State" })),
    /* @__PURE__ */ React40.createElement(SelectContent, { className: "max-h-60" }, usStates.map((state) => /* @__PURE__ */ React40.createElement(SelectItem, { key: state.code, value: state.code }, state.name)))
  )), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "ZIP code ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Input,
    {
      value: formState.billingAddress.zip,
      onChange: (e) => handleAddressChange("billingAddress", "zip", e.target.value),
      placeholder: "10001",
      className: inputClassName,
      disabled
    }
  ))), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement(Label, { className: labelClassName }, "Country ", /* @__PURE__ */ React40.createElement("span", { className: "text-red-500" }, "*")), /* @__PURE__ */ React40.createElement(
    Select,
    {
      value: formState.billingAddress.country,
      onValueChange: (value2) => handleAddressChange("billingAddress", "country", value2),
      disabled
    },
    /* @__PURE__ */ React40.createElement(SelectTrigger, { className: cn(inputClassName, "h-12") }, /* @__PURE__ */ React40.createElement(SelectValue, { placeholder: "Country" })),
    /* @__PURE__ */ React40.createElement(SelectContent, null, countries.map((country) => /* @__PURE__ */ React40.createElement(SelectItem, { key: country.code, value: country.code }, country.name)))
  ))), formState.billingIsSame && /* @__PURE__ */ React40.createElement("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-4" }, /* @__PURE__ */ React40.createElement("p", { className: "text-sm text-gray-600 flex items-center" }, /* @__PURE__ */ React40.createElement("svg", { className: "w-4 h-4 text-green-500 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React40.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })), "Your billing address is the same as your shipping address."))), error && /* @__PURE__ */ React40.createElement("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4" }, /* @__PURE__ */ React40.createElement("div", { className: "flex items-start" }, /* @__PURE__ */ React40.createElement("svg", { className: "w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ React40.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ React40.createElement("div", null, /* @__PURE__ */ React40.createElement("h3", { className: "text-sm font-medium text-red-800" }, "Please fix the following errors:"), /* @__PURE__ */ React40.createElement("p", { className: "text-sm text-red-700 mt-1" }, error)))));
};

// src/components/blocks/AuthRenderer.tsx
import React41, { useEffect as useEffect14, useState as useState12, useRef as useRef8 } from "react";
import { AlertCircle as AlertCircle3, CheckCircle2, Loader2, Mail, Phone, User, ArrowRight as ArrowRight2, KeyRound, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentStep, setCurrentStep] = useState12("name");
  const [name, setName] = useState12("");
  const [email, setEmail] = useState12("");
  const [mobile, setMobile] = useState12("");
  const [emailOtp, setEmailOtp] = useState12("");
  const [mobileOtp, setMobileOtp] = useState12("");
  const [loading, setLoading] = useState12(false);
  const [error, setError] = useState12(null);
  const [success, setSuccess] = useState12(null);
  const [otpSent, setOtpSent] = useState12({});
  const [isManualNavigation, setIsManualNavigation] = useState12(false);
  const hasInitialized = useRef8(false);
  const checkIfBackNavigation = () => {
    if (navigationHistory.length < 2) return false;
    const currentEntry = navigationHistory[navigationHistory.length - 1];
    const previousEntry = navigationHistory[navigationHistory.length - 2];
    return currentEntry && previousEntry && (previousEntry.pageIndex > currentEntry.pageIndex || previousEntry.pageIndex === currentEntry.pageIndex && previousEntry.blockIndex > currentEntry.blockIndex) && previousEntry.trigger === "back";
  };
  useEffect14(() => {
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
  useEffect14(() => {
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
        return /* @__PURE__ */ React41.createElement(User, { className: "w-6 h-6" });
      case "email":
        return /* @__PURE__ */ React41.createElement(Mail, { className: "w-6 h-6" });
      case "phone":
        return /* @__PURE__ */ React41.createElement(Phone, { className: "w-6 h-6" });
      case "email-otp":
      case "phone-otp":
        return /* @__PURE__ */ React41.createElement(KeyRound, { className: "w-6 h-6" });
      case "welcome":
        return /* @__PURE__ */ React41.createElement(CheckCircle2, { className: "w-6 h-6" });
      default:
        return /* @__PURE__ */ React41.createElement(User, { className: "w-6 h-6" });
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
        return /* @__PURE__ */ React41.createElement(
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
        return /* @__PURE__ */ React41.createElement(
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
        return /* @__PURE__ */ React41.createElement(
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
        return /* @__PURE__ */ React41.createElement(
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
        return /* @__PURE__ */ React41.createElement(
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
    return /* @__PURE__ */ React41.createElement(Card, { className: "w-full max-w-md mx-auto" }, /* @__PURE__ */ React41.createElement(CardContent, { className: "pt-6" }, /* @__PURE__ */ React41.createElement("div", { className: "flex items-center justify-center space-x-2" }, /* @__PURE__ */ React41.createElement(Loader2, { className: "w-4 h-4 animate-spin" }), /* @__PURE__ */ React41.createElement("span", { className: "text-sm text-muted-foreground" }, skipIfLoggedIn ? "Checking authentication..." : "Checking authentication...")), skipIfLoggedIn && /* @__PURE__ */ React41.createElement("div", { className: "flex items-center justify-center space-x-2 mt-2" }, /* @__PURE__ */ React41.createElement(SkipForward, { className: "w-3 h-3 text-blue-500" }), /* @__PURE__ */ React41.createElement("span", { className: "text-xs text-blue-600" }, "Skip if logged in enabled"))));
  }
  if (currentStep === "welcome") {
    return /* @__PURE__ */ React41.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      },
      /* @__PURE__ */ React41.createElement(Card, { className: "w-full max-w-md mx-auto" }, /* @__PURE__ */ React41.createElement(CardHeader, { className: "text-center" }, /* @__PURE__ */ React41.createElement(
        motion.div,
        {
          className: "w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center",
          initial: { scale: 0 },
          animate: { scale: 1 },
          transition: { delay: 0.2, type: "spring", stiffness: 200 }
        },
        /* @__PURE__ */ React41.createElement(CheckCircle2, { className: "w-6 h-6 text-green-600" })
      ), /* @__PURE__ */ React41.createElement(CardTitle, { className: "text-xl" }, getStepTitle()), /* @__PURE__ */ React41.createElement(CardDescription, null, getStepDescription()), skipIfLoggedIn && isManualNavigation && /* @__PURE__ */ React41.createElement("div", { className: "mt-2 p-2 bg-blue-50 rounded-md" }, /* @__PURE__ */ React41.createElement("div", { className: "flex items-center justify-center space-x-2 text-sm text-blue-700" }, /* @__PURE__ */ React41.createElement(SkipForward, { className: "w-4 h-4" }), /* @__PURE__ */ React41.createElement("span", null, "Auto-skip is enabled, but you manually navigated here")))), /* @__PURE__ */ React41.createElement(CardContent, { className: "space-y-4" }, /* @__PURE__ */ React41.createElement(
        Button,
        {
          onClick: handleWelcomeContinue,
          className: "w-full",
          size: "lg"
        },
        "Continue",
        /* @__PURE__ */ React41.createElement(ArrowRight2, { className: "ml-2 w-4 h-4" })
      ), /* @__PURE__ */ React41.createElement(
        Button,
        {
          variant: "outline",
          onClick: handleSignInAsDifferent,
          className: "w-full"
        },
        "Sign in as different user"
      )))
    );
  }
  return /* @__PURE__ */ React41.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    },
    /* @__PURE__ */ React41.createElement(Card, { className: "w-full max-w-md mx-auto" }, /* @__PURE__ */ React41.createElement(CardHeader, { className: "text-center" }, /* @__PURE__ */ React41.createElement(
      motion.div,
      {
        className: "w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center",
        key: currentStep,
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 200, damping: 15 }
      },
      getStepIcon()
    ), /* @__PURE__ */ React41.createElement(CardTitle, { className: "text-xl" }, getStepTitle()), /* @__PURE__ */ React41.createElement(CardDescription, null, getStepDescription()), skipIfLoggedIn && /* @__PURE__ */ React41.createElement("div", { className: "mt-2 p-2 bg-blue-50 rounded-md" }, /* @__PURE__ */ React41.createElement("div", { className: "flex items-center justify-center space-x-2 text-xs text-blue-600" }, /* @__PURE__ */ React41.createElement(SkipForward, { className: "w-3 h-3" }), /* @__PURE__ */ React41.createElement("span", null, "Will skip if already logged in")))), /* @__PURE__ */ React41.createElement(CardContent, { className: "space-y-6" }, /* @__PURE__ */ React41.createElement(AnimatePresence, { mode: "wait" }, error && /* @__PURE__ */ React41.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
      },
      /* @__PURE__ */ React41.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React41.createElement(AlertCircle3, { className: "h-4 w-4" }), /* @__PURE__ */ React41.createElement(AlertDescription, null, error))
    ), success && /* @__PURE__ */ React41.createElement(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
      },
      /* @__PURE__ */ React41.createElement(Alert, null, /* @__PURE__ */ React41.createElement(CheckCircle2, { className: "h-4 w-4" }), /* @__PURE__ */ React41.createElement(AlertDescription, null, success))
    )), /* @__PURE__ */ React41.createElement(
      motion.div,
      {
        key: currentStep,
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: 0.1 }
      },
      renderInput()
    ), (currentStep === "email-otp" || currentStep === "phone-otp") && otpSent && /* @__PURE__ */ React41.createElement(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center"
      },
      /* @__PURE__ */ React41.createElement(Badge, { variant: "secondary", className: "text-xs" }, "Code sent successfully")
    ), /* @__PURE__ */ React41.createElement(
      Button,
      {
        onClick: handleStepSubmit,
        disabled: !canSubmit() || loading,
        className: "w-full",
        size: "lg"
      },
      loading ? /* @__PURE__ */ React41.createElement(React41.Fragment, null, /* @__PURE__ */ React41.createElement(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), currentStep.includes("otp") ? "Verifying..." : "Processing...") : /* @__PURE__ */ React41.createElement(React41.Fragment, null, currentStep.includes("otp") ? "Verify Code" : "Continue", /* @__PURE__ */ React41.createElement(ArrowRight2, { className: "ml-2 w-4 h-4" }))
    ), currentStep.includes("otp") && /* @__PURE__ */ React41.createElement(
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
        className: "w-full"
      },
      "Back to previous step"
    )))
  );
};

// src/utils/blockAdapter.tsx
import { Activity as Activity3, ShoppingCart as ShoppingCart2 } from "lucide-react";
import { v4 as uuidv42 } from "uuid";

// src/utils/blockdefinations.tsx
import { Activity as Activity2, AlignLeft, ArrowRightToLine, Calculator, Calendar as Calendar2, CheckSquare as CheckSquare2, CircleCheck, Code, FileText, GitBranch, Grid3X3, ListFilter, LucideTextCursor, Terminal, Upload, UserCheck, ShoppingCart } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
var CheckoutBlock = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details",
  icon: /* @__PURE__ */ React.createElement(ShoppingCart, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkout",
    fieldName: `checkout${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(CheckSquare2, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkbox",
    fieldName: `checkbox${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(Calendar2, { className: "w-4 h-4" }),
  defaultData: {
    type: "datepicker",
    fieldName: `date${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(Upload, { className: "w-4 h-4" }),
  defaultData: {
    type: "fileupload",
    fieldName: `file${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(Code, { className: "w-4 h-4" }),
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
  icon: /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4" }),
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
  icon: /* @__PURE__ */ React.createElement(FileText, { className: "w-4 h-4" }),
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
  icon: /* @__PURE__ */ React.createElement(Grid3X3, { className: "w-4 h-4" }),
  defaultData: {
    type: "matrix",
    fieldName: `matrix${uuidv4().substring(0, 4)}`,
    label: "Please rate the following items",
    description: "Select one option for each row",
    columnHeader: "Rating",
    questions: [
      { id: uuidv4(), text: "Item 1" },
      { id: uuidv4(), text: "Item 2" },
      { id: uuidv4(), text: "Item 3" }
    ],
    options: [
      { id: uuidv4(), text: "Poor", value: "1" },
      { id: uuidv4(), text: "Fair", value: "2" },
      { id: uuidv4(), text: "Good", value: "3" },
      { id: uuidv4(), text: "Excellent", value: "4" }
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
  icon: /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-4 h-4" }),
  defaultData: {
    type: "radio",
    fieldName: `radioOption${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(ArrowRightToLine, { className: "w-4 h-4" }),
  defaultData: {
    type: "range",
    fieldName: `range${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(Terminal, { className: "w-4 h-4" }),
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
  icon: /* @__PURE__ */ React.createElement(CheckSquare2, { className: "w-4 h-4" }),
  defaultData: {
    type: "selectablebox",
    fieldName: `boxq${uuidv4().substring(0, 4)}`,
    label: "What's your goal?",
    description: "",
    boxSpacing: "4",
    defaultValue: "",
    showSelectionIndicator: true,
    options: [
      { id: uuidv4(), label: "Lose 5 to 20 lbs", value: "5-20" },
      { id: uuidv4(), label: "Lose 21 to 50 lbs", value: "21-50" },
      { id: uuidv4(), label: "Lose 51+ lbs", value: "51+" },
      { id: uuidv4(), label: "I'm not sure yet", value: "unsure" }
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
  icon: /* @__PURE__ */ React.createElement(ListFilter, { className: "w-4 h-4" }),
  defaultData: {
    type: "select",
    fieldName: `select${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(AlignLeft, { className: "w-4 h-4" }),
  defaultData: {
    type: "textarea",
    fieldName: `textArea${uuidv4().substring(0, 4)}`,
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
  icon: /* @__PURE__ */ React.createElement(LucideTextCursor, { className: "w-4 h-4" }),
  defaultData: {
    type: "textfield",
    fieldName: `textInput${uuidv4().substring(0, 4)}`,
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
var CheckoutBlockDefinition = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details",
  icon: /* @__PURE__ */ React.createElement(ShoppingCart2, { className: "w-4 h-4" }),
  defaultData: {
    type: "checkout",
    fieldName: `checkout${uuidv42().substring(0, 4)}`,
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

// src/components/blocks/BlockRenderer.tsx
var BlockRenderer = forwardRef17((props, ref) => {
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
    return /* @__PURE__ */ React42.createElement(CustomComponent, { ...props });
  }
  if (!blockTypeMap[block.type] && !["conditional", "calculated", "bmiCalculator", "checkout"].includes(block.type)) {
    return /* @__PURE__ */ React42.createElement("div", { className: "p-4 border border-gray-300 rounded" }, /* @__PURE__ */ React42.createElement("p", { className: "text-sm text-gray-500" }, "Unknown block type: ", block.type));
  }
  if (block.type === "conditional" && block.condition) {
    return /* @__PURE__ */ React42.createElement(
      ConditionalBlock,
      {
        ...props,
        condition: block.condition,
        block: block.childBlock || { type: "html", html: "No child block specified" }
      }
    );
  }
  if (block.type === "calculated" && block.formula) {
    return /* @__PURE__ */ React42.createElement(
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
    return /* @__PURE__ */ React42.createElement(BMICalculatorRenderer, { ...props });
  }
  if (block.type === "checkout") {
    return /* @__PURE__ */ React42.createElement(CheckoutRenderer, { ...props });
  }
  switch (block.type) {
    case "textfield":
      return /* @__PURE__ */ React42.createElement(TextInputRenderer, { block, ...commonProps, ref });
    case "textarea":
      return /* @__PURE__ */ React42.createElement(TextareaRenderer, { block, ...commonProps, ref });
    case "radio":
      return /* @__PURE__ */ React42.createElement(RadioRenderer, { block, ...commonProps });
    case "checkbox":
      return /* @__PURE__ */ React42.createElement(CheckboxRenderer, { block, ...commonProps });
    case "select":
      return /* @__PURE__ */ React42.createElement(SelectRenderer, { block, ...commonProps, ref });
    case "range":
      return /* @__PURE__ */ React42.createElement(RangeRenderer, { block, ...commonProps });
    case "datepicker":
      return /* @__PURE__ */ React42.createElement(DatePickerRenderer, { block, ...commonProps });
    case "fileupload":
      return /* @__PURE__ */ React42.createElement(FileUploadRenderer, { block, ...commonProps });
    case "matrix":
      return /* @__PURE__ */ React42.createElement(MatrixRenderer, { block, ...commonProps });
    case "selectablebox":
      return /* @__PURE__ */ React42.createElement(SelectableBoxRenderer, { block, ...commonProps });
    case "markdown":
      return /* @__PURE__ */ React42.createElement(MarkdownRenderer, { block, ...commonProps });
    case "html":
      return /* @__PURE__ */ React42.createElement(HtmlRenderer, { block, ...commonProps });
    case "auth":
      return /* @__PURE__ */ React42.createElement(AuthRenderer, { block, ...commonProps });
    case "script":
      return /* @__PURE__ */ React42.createElement(ScriptRenderer, { block, theme });
    case "set":
      if (block.items) {
        const visibleItems = getVisibleBlocks(block.items);
        const blockWithVisibleItems = { ...block, items: visibleItems };
        return /* @__PURE__ */ React42.createElement(SetRenderer, { block: blockWithVisibleItems, ...commonProps });
      }
      return /* @__PURE__ */ React42.createElement(SetRenderer, { block, ...commonProps });
    default:
      return /* @__PURE__ */ React42.createElement("div", { className: "p-4 border border-gray-300 rounded" }, /* @__PURE__ */ React42.createElement("p", { className: "font-medium mb-1" }, block.label || block.name || block.type), block.description && /* @__PURE__ */ React42.createElement("p", { className: "text-sm text-gray-500 mb-2" }, block.description), /* @__PURE__ */ React42.createElement("p", { className: "text-sm bg-yellow-50 p-2 rounded border border-yellow-200" }, "Renderer not implemented for block type: ", block.type));
  }
});
BlockRenderer.displayName = "BlockRenderer";

// src/components/ui/DebugInfo.tsx
import React43, { useState as useState13 } from "react";

// src/components/ui/collapsible.tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;

// src/components/ui/DebugInfo.tsx
import { ChevronDown as ChevronDown2, ChevronUp as ChevronUp2 } from "lucide-react";
var DebugInfo = ({ show = false }) => {
  const [isOpen, setIsOpen] = useState13(true);
  if (!show) return null;
  const {
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    values,
    errors
  } = useSurveyForm();
  return /* @__PURE__ */ React43.createElement(Card, { className: "mt-4 mb-2 font-mono text-xs border border-border dark:border-border" }, /* @__PURE__ */ React43.createElement(Collapsible, { open: isOpen, onOpenChange: setIsOpen, className: "w-full" }, /* @__PURE__ */ React43.createElement(CardHeader, { className: "p-2 pb-0" }, /* @__PURE__ */ React43.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React43.createElement(CardTitle, { className: "text-sm font-bold" }, "Survey Debug Info"), /* @__PURE__ */ React43.createElement(CollapsibleTrigger2, { asChild: true }, /* @__PURE__ */ React43.createElement(Button, { variant: "ghost", size: "sm", className: "p-0 h-7 w-7" }, isOpen ? /* @__PURE__ */ React43.createElement(ChevronUp2, { size: 16 }) : /* @__PURE__ */ React43.createElement(ChevronDown2, { size: 16 }))))), /* @__PURE__ */ React43.createElement(CollapsibleContent2, null, /* @__PURE__ */ React43.createElement(CardContent, { className: "p-2" }, /* @__PURE__ */ React43.createElement("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1" }, /* @__PURE__ */ React43.createElement("div", null, "Current Page:"), /* @__PURE__ */ React43.createElement("div", null, currentPage), /* @__PURE__ */ React43.createElement("div", null, "Total Pages:"), /* @__PURE__ */ React43.createElement("div", null, totalPages), /* @__PURE__ */ React43.createElement("div", null, "Is First Page:"), /* @__PURE__ */ React43.createElement("div", null, isFirstPage ? "Yes" : "No"), /* @__PURE__ */ React43.createElement("div", null, "Is Last Page:"), /* @__PURE__ */ React43.createElement("div", null, isLastPage ? "Yes" : "No")), /* @__PURE__ */ React43.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React43.createElement("div", { className: "font-bold mb-1" }, "Form Values:"), /* @__PURE__ */ React43.createElement("pre", { className: "p-1 text-xs rounded border border-border bg-muted dark:bg-muted" }, JSON.stringify(values, null, 2))), Object.keys(errors).length > 0 && /* @__PURE__ */ React43.createElement("div", { className: "mt-2" }, /* @__PURE__ */ React43.createElement("div", { className: "font-bold mb-1" }, "Errors:"), /* @__PURE__ */ React43.createElement("pre", { className: "p-1 text-xs rounded border border-border bg-muted dark:bg-muted text-destructive" }, JSON.stringify(errors, null, 2)))))));
};

// src/components/layouts/PageByPageLayout.tsx
import { motion as motion2, AnimatePresence as AnimatePresence2 } from "framer-motion";
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
  const containerRef = useRef9(null);
  const firstInputRef = useRef9(null);
  useEffect15(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [currentPage, autoScroll]);
  useEffect15(() => {
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
  return /* @__PURE__ */ React44.createElement("div", { className: "survey-page-by-page-layout", ref: containerRef }, progressBar && currentPage >= 0 && /* @__PURE__ */ React44.createElement(
    ProgressBar,
    {
      currentPage,
      totalPages,
      options: typeof progressBar === "object" ? progressBar : void 0
    }
  ), /* @__PURE__ */ React44.createElement("form", { onSubmit: handleSubmit, className: "survey-form" }, /* @__PURE__ */ React44.createElement(AnimatePresence2, { mode: "wait" }, /* @__PURE__ */ React44.createElement(
    motion2.div,
    {
      key: currentPage,
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
      transition: { duration: 0.3 },
      className: "w-full"
    },
    /* @__PURE__ */ React44.createElement(Card, { className: cn("border", isDarkMode && "bg-card text-card-foreground border-border") }, /* @__PURE__ */ React44.createElement(CardHeader, null, showPageLocationHeader && /* @__PURE__ */ React44.createElement(CardTitle, null, pageTitle)), /* @__PURE__ */ React44.createElement(CardContent, null, /* @__PURE__ */ React44.createElement("div", { className: "survey-page-content space-y-6" }, currentPageBlocks.map((block, index) => /* @__PURE__ */ React44.createElement(
      BlockRenderer,
      {
        key: block.uuid || `block-${index}`,
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
      }
    ))), /* @__PURE__ */ React44.createElement(DebugInfo, { show: enableDebug }), /* @__PURE__ */ React44.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React44.createElement(
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
    ))))
  ))));
};

// src/components/layouts/FullPageSurveyLayout.tsx
import React45, { useEffect as useEffect16, useRef as useRef10 } from "react";
import { motion as motion3, AnimatePresence as AnimatePresence3 } from "framer-motion";
import { ChevronLeft, ArrowRight as ArrowRight3, History } from "lucide-react";
init_surveyUtils();
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
  const containerRef = useRef10(null);
  const firstInputRef = useRef10(null);
  const pages = getSurveyPages(surveyData.rootNode);
  const currentPageBlocks = currentPage < pages.length ? pages[currentPage] : [];
  const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);
  useEffect16(() => {
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
  return /* @__PURE__ */ React45.createElement(
    "div",
    {
      className: "survey-fullpage-layout min-h-max flex flex-col",
      ref: containerRef
    },
    enableDebug && /* @__PURE__ */ React45.createElement("div", { className: "w-full bg-yellow-50 border-b border-yellow-200 p-2 text-xs" }, /* @__PURE__ */ React45.createElement("div", { className: "max-w-2xl mx-auto" }, /* @__PURE__ */ React45.createElement("details", { className: "cursor-pointer" }, /* @__PURE__ */ React45.createElement("summary", { className: "font-medium text-yellow-800" }, "Debug Info"), /* @__PURE__ */ React45.createElement("pre", { className: "mt-2 text-yellow-700 whitespace-pre-wrap" }, JSON.stringify(debugInfo, null, 2))))),
    logo && /* @__PURE__ */ React45.createElement("div", { className: "w-full flex py-2 px-4 border-gray-100 mb-4" }, /* @__PURE__ */ React45.createElement("div", { className: "w-full flex max-w-lg mx-auto" }, /* @__PURE__ */ React45.createElement("div", { className: "justify-start" }, logo))),
    /* @__PURE__ */ React45.createElement("div", { className: "w-full backdrop-blur-sm border-gray-100" }, /* @__PURE__ */ React45.createElement("div", { className: "w-full max-w-lg mx-auto py-4" }, progressBar && typeof progressBar === "object" && progressBar.position !== "bottom" && /* @__PURE__ */ React45.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React45.createElement("div", { className: "h-2 w-full rounded-full overflow-hidden bg-gray-200" }, /* @__PURE__ */ React45.createElement(
      motion3.div,
      {
        className: cn(
          "h-full transition-all duration-500 ease-out rounded-full",
          theme.progress.bar || "bg-[#a55a36]"
        ),
        initial: { width: "0%" },
        animate: { width: `${progressPercentage}%` }
      }
    )), progressBar.type === "dots" && /* @__PURE__ */ React45.createElement("div", { className: "flex justify-center space-x-1 mt-2" }, Array.from({ length: totalVisibleSteps }, (_, i) => /* @__PURE__ */ React45.createElement(
      "div",
      {
        key: i,
        className: cn(
          "w-2 h-2 rounded-full transition-colors",
          i <= currentStepPosition ? "bg-[#E67E4D]" : "bg-gray-200"
        )
      }
    ))), progressBar.type === "numbers" && /* @__PURE__ */ React45.createElement("div", { className: "text-center text-xs text-gray-500 mt-2" }, currentStepPosition + 1, " / ", totalVisibleSteps)), progressBar === true && /* @__PURE__ */ React45.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React45.createElement("div", { className: "h-2 w-full rounded-full overflow-hidden bg-gray-200" }, /* @__PURE__ */ React45.createElement(
      motion3.div,
      {
        className: "h-full bg-[#E67E4D] transition-all duration-500 ease-out rounded-full",
        initial: { width: "0%" },
        animate: { width: `${progressPercentage}%` }
      }
    ))), /* @__PURE__ */ React45.createElement("div", { className: "flex items-center justify-start h-8" }, /* @__PURE__ */ React45.createElement("div", { className: "flex items-center" }, (navigationButtons == null ? void 0 : navigationButtons.showPrevious) !== false && canGoBack && /* @__PURE__ */ React45.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ React45.createElement(
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
        )
      },
      /* @__PURE__ */ React45.createElement(ChevronLeft, { className: "w-4 h-4" }),
      /* @__PURE__ */ React45.createElement("span", { className: "sr-only" }, (navigationButtons == null ? void 0 : navigationButtons.previousText) || "Previous")
    ), showNavigationHistory && /* @__PURE__ */ React45.createElement("div", { className: "text-xs text-gray-500 flex items-center opacity-70" }, /* @__PURE__ */ React45.createElement(History, { className: "w-3 h-3 mr-1" }), /* @__PURE__ */ React45.createElement("span", { className: "tabular-nums" }, navigationHistory.length - 1))))))),
    /* @__PURE__ */ React45.createElement("div", { className: "flex-1 flex flex-col" }, /* @__PURE__ */ React45.createElement(AnimatePresence3, { mode: "wait" }, /* @__PURE__ */ React45.createElement(
      motion3.div,
      {
        key: `${currentPage}-${currentBlockIndex}`,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3, ease: "easeInOut" },
        className: "flex-1 flex flex-col"
      },
      /* @__PURE__ */ React45.createElement("div", { className: "flex-[0.8] flex flex-col justify-start items-center px-4 py-2" }, /* @__PURE__ */ React45.createElement("div", { className: "w-full max-w-lg space-y-6" }, currentPageBlocks[currentBlockIndex] && /* @__PURE__ */ React45.createElement("div", { className: "text-start" }, /* @__PURE__ */ React45.createElement(
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
      )))),
      /* @__PURE__ */ React45.createElement("div", { className: "w-full backdrop-blur-sm border-gray-100" }, /* @__PURE__ */ React45.createElement("div", { className: "w-full max-w-2xl mx-auto px-4 py-4" }, blockDisclaimer && /* @__PURE__ */ React45.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React45.createElement("p", { className: "text-xs text-gray-500 leading-relaxed max-w-md mx-auto text-center" }, blockDisclaimer)), /* @__PURE__ */ React45.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React45.createElement(
        "div",
        {
          className: cn(
            "flex items-center",
            (navigationButtons == null ? void 0 : navigationButtons.align) === "left" ? "justify-start" : (navigationButtons == null ? void 0 : navigationButtons.align) === "right" ? "justify-end" : "justify-center"
          )
        },
        (navigationButtons == null ? void 0 : navigationButtons.position) === "split" && canGoBack && (navigationButtons == null ? void 0 : navigationButtons.showPrevious) !== false && /* @__PURE__ */ React45.createElement(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handlePrevious,
            className: "mr-auto"
          },
          /* @__PURE__ */ React45.createElement(ChevronLeft, { className: "mr-2 w-4 h-4" }),
          (navigationButtons == null ? void 0 : navigationButtons.previousText) || "Previous"
        ),
        showNextButton && /* @__PURE__ */ React45.createElement(
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
            )
          },
          /* @__PURE__ */ React45.createElement("span", { className: "flex items-center" }, isLastPage && currentBlockIndex === currentPageBlocks.length - 1 ? completeText : continueText, !(isLastPage && currentBlockIndex === currentPageBlocks.length - 1) && /* @__PURE__ */ React45.createElement(ArrowRight3, { className: "ml-2 w-4 h-4" }))
        )
      ))))
    ))),
    progressBar && typeof progressBar === "object" && progressBar.position === "bottom" && /* @__PURE__ */ React45.createElement("div", { className: "w-full border-t bg-white/80 backdrop-blur-sm" }, /* @__PURE__ */ React45.createElement("div", { className: "w-full max-w-2xl mx-auto px-4 py-2" }, /* @__PURE__ */ React45.createElement("div", { className: "h-2 w-full rounded-full overflow-hidden bg-gray-200" }, /* @__PURE__ */ React45.createElement(
      motion3.div,
      {
        className: cn(
          "h-full transition-all duration-500 ease-out rounded-full",
          progressBar.color || "bg-[#E67E4D]"
        ),
        initial: { width: "0%" },
        animate: { width: `${progressPercentage}%` }
      }
    ))))
  );
};

// src/components/layouts/ContinuousLayout.tsx
import React46, { useRef as useRef11 } from "react";
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
  const containerRef = useRef11(null);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const { surveyData } = useSurveyForm();
  const pages = getSurveyPages2(surveyData.rootNode);
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  const isDarkMode = theme.name === "dark";
  return /* @__PURE__ */ React46.createElement("div", { className: "survey-continuous-layout", ref: containerRef }, progressBar && /* @__PURE__ */ React46.createElement(
    ProgressBar,
    {
      currentPage: 0,
      totalPages: 1,
      options: typeof progressBar === "object" ? progressBar : void 0
    }
  ), /* @__PURE__ */ React46.createElement("form", { onSubmit: handleSubmit, className: "survey-form" }, /* @__PURE__ */ React46.createElement(Card, { className: cn("border", isDarkMode && "bg-card text-card-foreground border-border") }, /* @__PURE__ */ React46.createElement(CardContent, { className: "pt-6" }, /* @__PURE__ */ React46.createElement("div", { className: "survey-continuous-content space-y-10" }, pages.map((pageBlocks, pageIndex) => {
    var _a, _b;
    return /* @__PURE__ */ React46.createElement("div", { key: `page-${pageIndex}`, className: "space-y-8" }, ((_a = pageBlocks[0]) == null ? void 0 : _a.name) && /* @__PURE__ */ React46.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React46.createElement(CardTitle, { className: "text-xl" }, pageBlocks[0].name), ((_b = pageBlocks[0]) == null ? void 0 : _b.description) && /* @__PURE__ */ React46.createElement(CardDescription, { className: "mt-1" }, pageBlocks[0].description)), /* @__PURE__ */ React46.createElement("div", { className: "space-y-6" }, pageBlocks.map((block, blockIndex) => /* @__PURE__ */ React46.createElement(
      BlockRenderer,
      {
        key: block.uuid || `block-${pageIndex}-${blockIndex}`,
        block,
        value: block.fieldName ? values[block.fieldName] : void 0,
        onChange: (value) => block.fieldName && setValue(block.fieldName, value),
        error: block.fieldName ? errors[block.fieldName] : void 0,
        theme
      }
    ))));
  })), /* @__PURE__ */ React46.createElement(DebugInfo, { show: enableDebug }), /* @__PURE__ */ React46.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React46.createElement(
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
  ))))));
};

// src/components/layouts/AccordionLayout.tsx
import React47, { useState as useState14 } from "react";
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
  const [expandedSections, setExpandedSections] = useState14([0]);
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
  return /* @__PURE__ */ React47.createElement("div", { className: "survey-accordion-layout" }, /* @__PURE__ */ React47.createElement("form", { onSubmit: handleSubmit, className: "survey-form" }, /* @__PURE__ */ React47.createElement("div", { className: "space-y-4" }, pages.map((pageBlocks, pageIndex) => {
    var _a, _b;
    const isExpanded = expandedSections.includes(pageIndex);
    const sectionName = ((_a = pageBlocks[0]) == null ? void 0 : _a.name) || `Section ${pageIndex + 1}`;
    return /* @__PURE__ */ React47.createElement("div", { key: `section-${pageIndex}`, className: `border rounded-md overflow-hidden ${themeConfig.background}` }, /* @__PURE__ */ React47.createElement(
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
        }
      },
      /* @__PURE__ */ React47.createElement("div", null, /* @__PURE__ */ React47.createElement("span", { className: "font-bold" }, sectionName), ((_b = pageBlocks[0]) == null ? void 0 : _b.description) && /* @__PURE__ */ React47.createElement("p", { className: "text-sm text-gray-500 mt-1" }, pageBlocks[0].description)),
      /* @__PURE__ */ React47.createElement("span", { className: "text-xl" }, isExpanded ? "\u2212" : "+")
    ), isExpanded && /* @__PURE__ */ React47.createElement("div", { className: "p-4 space-y-6" }, pageBlocks.map((block, blockIndex) => /* @__PURE__ */ React47.createElement(
      BlockRenderer,
      {
        key: block.uuid || `block-${pageIndex}-${blockIndex}`,
        block,
        value: block.fieldName ? values[block.fieldName] : void 0,
        onChange: (value) => block.fieldName && setValue(block.fieldName, value),
        error: block.fieldName ? errors[block.fieldName] : void 0,
        theme
      }
    ))));
  }), /* @__PURE__ */ React47.createElement("div", { className: themeConfig.card }, /* @__PURE__ */ React47.createElement(
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
  )))));
};

// src/components/layouts/TabsLayout.tsx
import React48, { useEffect as useEffect18, useRef as useRef12 } from "react";
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
  const containerRef = useRef12(null);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const pages = getSurveyPages2(useSurveyForm().surveyData.rootNode);
  useEffect18(() => {
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
  return /* @__PURE__ */ React48.createElement("div", { className: "survey-tabs-layout", ref: containerRef }, /* @__PURE__ */ React48.createElement("div", { className: "survey-tabs mb-6 flex items-center border-b overflow-x-auto" }, pages.map((pageBlocks, index) => {
    var _a2;
    const isActive = index === currentPage;
    const tabTitle = ((_a2 = pageBlocks[0]) == null ? void 0 : _a2.name) || `Page ${index + 1}`;
    return /* @__PURE__ */ React48.createElement(
      "button",
      {
        key: `tab-${index}`,
        className: `
                px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap
                ${isActive ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `,
        style: {
          borderBottomColor: isActive ? themeConfig.colors.primary : "transparent",
          color: isActive ? themeConfig.colors.primary : themeConfig.colors.secondary
        },
        onClick: () => goToPage(index)
      },
      tabTitle
    );
  })), /* @__PURE__ */ React48.createElement("form", { onSubmit: handleSubmit, className: "survey-form" }, /* @__PURE__ */ React48.createElement("div", { className: themeConfig.card }, pages[currentPage] && ((_a = pages[currentPage][0]) == null ? void 0 : _a.description) && /* @__PURE__ */ React48.createElement("div", { className: themeConfig.header }, /* @__PURE__ */ React48.createElement("p", { className: themeConfig.description }, pages[currentPage][0].description)), /* @__PURE__ */ React48.createElement("div", { className: "survey-page-content space-y-6" }, (_b = pages[currentPage]) == null ? void 0 : _b.map((block, index) => /* @__PURE__ */ React48.createElement(
    BlockRenderer,
    {
      key: block.uuid || `block-${index}`,
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
    }
  ))), /* @__PURE__ */ React48.createElement(
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
  ))));
};

// src/components/layouts/StepperLayout.tsx
import React49, { useRef as useRef13 } from "react";
import { CheckIcon } from "lucide-react";
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
  const containerRef = useRef13(null);
  const { getSurveyPages: getSurveyPages2 } = (init_surveyUtils(), __toCommonJS(surveyUtils_exports));
  const pages = getSurveyPages2(surveyData.rootNode);
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  const isDarkMode = theme.name === "dark";
  return /* @__PURE__ */ React49.createElement("div", { className: "survey-stepper-layout", ref: containerRef }, /* @__PURE__ */ React49.createElement("div", { className: "survey-stepper-tabs mb-6" }, /* @__PURE__ */ React49.createElement("div", { className: "flex items-center justify-center flex-wrap gap-2" }, pages.map((pageBlocks, index) => {
    var _a2, _b2;
    const isActive = index === currentPage;
    const isCompleted = index < currentPage;
    const stepTitle = ((_a2 = pageBlocks[0]) == null ? void 0 : _a2.name) || `Step ${index + 1}`;
    return /* @__PURE__ */ React49.createElement(
      "div",
      {
        key: `step-${index}`,
        className: "flex items-center"
      },
      /* @__PURE__ */ React49.createElement(
        Button,
        {
          variant: isActive ? "default" : isCompleted ? "outline" : "secondary",
          size: "sm",
          className: cn(
            "h-9 rounded-full flex items-center mr-1",
            isCompleted && "bg-primary/10 hover:bg-primary/20"
          ),
          onClick: () => goToPage(index)
        },
        isCompleted ? /* @__PURE__ */ React49.createElement(CheckIcon, { className: "h-4 w-4 mr-1" }) : /* @__PURE__ */ React49.createElement("span", { className: "h-5 w-5 rounded-full flex items-center justify-center text-xs mr-1" }, index + 1),
        ((_b2 = pageBlocks[0]) == null ? void 0 : _b2.name) && /* @__PURE__ */ React49.createElement("span", { className: "hidden sm:inline-block text-sm" }, stepTitle)
      ),
      index < pages.length - 1 && /* @__PURE__ */ React49.createElement(
        "div",
        {
          className: cn(
            "hidden sm:block w-8 h-0.5",
            index < currentPage ? "bg-primary" : "bg-muted"
          )
        }
      )
    );
  }))), /* @__PURE__ */ React49.createElement("form", { onSubmit: handleSubmit, className: "survey-form" }, /* @__PURE__ */ React49.createElement(Card, { className: cn("border", isDarkMode && "bg-card text-card-foreground border-border") }, pages[currentPage] && ((_a = pages[currentPage][0]) == null ? void 0 : _a.name) && /* @__PURE__ */ React49.createElement(CardHeader, null, /* @__PURE__ */ React49.createElement(CardTitle, null, pages[currentPage][0].name), ((_b = pages[currentPage][0]) == null ? void 0 : _b.description) && /* @__PURE__ */ React49.createElement(CardDescription, null, pages[currentPage][0].description)), /* @__PURE__ */ React49.createElement(CardContent, null, /* @__PURE__ */ React49.createElement("div", { className: "survey-page-content space-y-6" }, pages[currentPage] && pages[currentPage][currentBlockIndex] && /* @__PURE__ */ React49.createElement(
    BlockRenderer,
    {
      key: pages[currentPage][currentBlockIndex].uuid || `block-${currentBlockIndex}`,
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
    }
  )), /* @__PURE__ */ React49.createElement(DebugInfo, { show: enableDebug }), /* @__PURE__ */ React49.createElement("div", { className: "mt-6" }, /* @__PURE__ */ React49.createElement(
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
  ))))));
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
  useEffect20(() => {
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
        return /* @__PURE__ */ React50.createElement(ContinuousLayout, { ...layoutProps });
      case "accordion":
        return /* @__PURE__ */ React50.createElement(AccordionLayout, { ...layoutProps });
      case "tabs":
        return /* @__PURE__ */ React50.createElement(TabsLayout, { ...layoutProps });
      case "stepper":
        return /* @__PURE__ */ React50.createElement(StepperLayout, { ...layoutProps });
      case "fullpage":
        return /* @__PURE__ */ React50.createElement(FullPageSurveyLayout, { ...layoutProps });
      case "page-by-page":
      default:
        return /* @__PURE__ */ React50.createElement(PageByPageLayout, { ...layoutProps });
    }
  };
  return /* @__PURE__ */ React50.createElement("div", { className: `${containerClass} ${themeConfig.background} min-h-0` }, /* @__PURE__ */ React50.createElement(
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
      logo
    },
    renderLayout(enableDebug)
  ));
};

// src/index.tsx
init_surveyUtils();
var index_default = SurveyForm;
export {
  AuthRenderer,
  BMICalculatorRenderer,
  BlockRenderer,
  CalculatedFieldRenderer,
  CheckboxRenderer,
  CheckoutRenderer,
  ConditionalBlock,
  DatePickerRenderer,
  DebugInfo,
  FileUploadRenderer,
  HtmlRenderer,
  MarkdownRenderer,
  MatrixRenderer,
  RadioRenderer,
  RangeRenderer,
  ScriptRenderer,
  SelectRenderer,
  SelectableBoxRenderer,
  SetRenderer,
  SurveyForm,
  SurveyFormProvider,
  TextInputRenderer,
  TextareaRenderer,
  ValidationSummary,
  applyDynamicColors,
  blockTypeMap,
  calculateBMI,
  colorfulTheme,
  corporateTheme,
  darkTheme,
  index_default as default,
  defaultTheme,
  evaluateCondition,
  evaluateLogic,
  evaluateSimpleCondition,
  executeCalculation,
  formatFieldName,
  getLocalized,
  getSurveyPageIds,
  getSurveyPages,
  getThemeClass,
  isBlockVisible,
  isContentBlock,
  isInputBlock,
  minimalTheme,
  modernTheme,
  supportsBranchingLogic,
  supportsConditionalRendering,
  themes,
  useSurveyForm,
  validateBlock
};
