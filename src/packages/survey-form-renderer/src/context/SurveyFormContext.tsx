// Enhanced SurveyFormContext with Navigation History
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { NodeData, BlockData } from "../../../survey-form-builder/src/types";
import type {
  SurveyFormContextProps,
  SurveyTheme,
  ComputedFieldsConfig,
  CustomValidator,
  BranchingLogic
} from "../types";
import { getSurveyPages, getSurveyPageIds, evaluateLogic } from "../utils/surveyUtils";
import {
  evaluateCondition,
  isBlockVisible,
  executeCalculation,
  getNextPageIndex as calculateNextPageIndex,
  getNextPageFromNavigationRules,
  getNextStepFromNavigationRules
} from "../utils/conditionalUtils";

// Navigation history entry
interface NavigationHistoryEntry {
  pageIndex: number;
  blockIndex: number;
  timestamp: number;
  trigger: 'forward' | 'back' | 'jump' | 'initial';
}

// Enhanced context interface
interface EnhancedSurveyFormContextProps extends SurveyFormContextProps {
  navigationHistory: NavigationHistoryEntry[];
  canGoBack: boolean;
  getActualProgress: () => number; // Returns percentage of actual progress
  getTotalVisibleSteps: () => number;
  getCurrentStepPosition: () => number;
}

// Create context with default values
export const SurveyFormContext = createContext<EnhancedSurveyFormContextProps>({
  values: {},
  setValue: () => {},
  errors: {},
  setError: () => {},
  currentPage: 0,
  currentBlockIndex: 0,
  totalPages: 0,
  goToPage: () => {},
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  goToNextBlock: () => {},
  goToPreviousBlock: () => {},
  isFirstPage: true,
  isLastPage: true,
  isSubmitting: false,
  isValid: true,
  submit: () => {},
  language: "en",
  setLanguage: () => {},
  theme: "default",
  surveyData: { rootNode: { type: "" } },
  conditionalErrors: {},
  computedValues: {},
  updateComputedValues: () => {},
  evaluateCondition: () => false,
  getNextPageIndex: () => null,
  getVisibleBlocks: () => [],
  validateField: () => null,
  // Enhanced navigation props
  navigationHistory: [],
  canGoBack: false,
  getActualProgress: () => 0,
  getTotalVisibleSteps: () => 0,
  getCurrentStepPosition: () => 0,
});

// Props for the provider
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
  theme?: SurveyTheme;
  computedFields?: ComputedFieldsConfig;
  customValidators?: Record<string, CustomValidator>;
  debug?: boolean;
  enableDebug?: boolean;
  logo?: any;
}

// Provider component
export const SurveyFormProvider: React.FC<SurveyFormProviderProps> = ({
  children,
  surveyData,
  defaultValues = {},
  onSubmit,
  onChange,
  onPageChange,
  language = "en",
  theme = "default",
  computedFields = {},
  customValidators = {},
  enableDebug = false,
  debug = false,
  logo = null,
}) => {
  // State for form values and errors
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [conditionalErrors, setConditionalErrors] = useState<Record<string, string>>({});
  const [computedValues, setComputedValues] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // Navigation history state
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistoryEntry[]>([
    {
      pageIndex: 0,
      blockIndex: 0,
      timestamp: Date.now(),
      trigger: 'initial'
    }
  ]);

  // Get all pages from the survey
  const pages = getSurveyPages(surveyData.rootNode);
  const pageIds = getSurveyPageIds(surveyData.rootNode);
  const totalPages = Math.max(1, pages.length);

  // Navigation states
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const canGoBack = navigationHistory.length > 1;

  // Handle browser back/forward for mobile
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      
      // Check if we have navigation history to go back to
      if (canGoBack) {
        goToPreviousBlock();
      } else {
        // If no history, allow normal browser behavior
        // This will exit the app on mobile or go back in browser
        window.history.back();
      }
    };

    // Add state to browser history to intercept back button
    window.history.pushState({ surveyPage: currentPage, surveyBlock: currentBlockIndex }, '');
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage, currentBlockIndex, canGoBack]);

  // Add navigation entry to history
  const addToNavigationHistory = useCallback((
    pageIndex: number, 
    blockIndex: number, 
    trigger: NavigationHistoryEntry['trigger']
  ) => {
    const newEntry: NavigationHistoryEntry = {
      pageIndex,
      blockIndex,
      timestamp: Date.now(),
      trigger
    };
    
    setNavigationHistory(prev => {
      // Avoid duplicate consecutive entries
      const lastEntry = prev[prev.length - 1];
      if (lastEntry && 
          lastEntry.pageIndex === pageIndex && 
          lastEntry.blockIndex === blockIndex) {
        return prev;
      }
      
      // Keep max 50 entries to prevent memory issues
      const newHistory = [...prev, newEntry];
      return newHistory.slice(-50);
    });
  }, []);

  // Get visible blocks for current state
  const getVisibleBlocks = useCallback((blocks: BlockData[]): BlockData[] => {
    return blocks.filter(block => {
      if (!block.visibleIf) return true;
      return isBlockVisible(block, { ...values, ...computedValues });
    });
  }, [values, computedValues]);

  // Calculate total visible steps across all pages
  const getTotalVisibleSteps = useCallback((): number => {
    return pages.reduce((total, pageBlocks) => {
      const visibleBlocks = getVisibleBlocks(pageBlocks);
      return total + visibleBlocks.length;
    }, 0);
  }, [pages, getVisibleBlocks]);

  // Get current step position (0-based index of current step across all visible steps)
  const getCurrentStepPosition = useCallback((): number => {
    let position = 0;
    
    // Count visible steps in previous pages
    for (let i = 0; i < currentPage; i++) {
      const visibleBlocks = getVisibleBlocks(pages[i] || []);
      position += visibleBlocks.length;
    }
    
    // Add current block index within current page (only counting visible blocks)
    const currentPageBlocks = pages[currentPage] || [];
    const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);
    const currentBlockInVisibleBlocks = visibleCurrentPageBlocks.findIndex(
      (block, index) => {
        // Find the actual index of current block in visible blocks
        const actualIndex = currentPageBlocks.findIndex(b => b.uuid === block.uuid);
        return actualIndex === currentBlockIndex;
      }
    );
    
    if (currentBlockInVisibleBlocks >= 0) {
      position += currentBlockInVisibleBlocks;
    }
    
    return position;
  }, [currentPage, currentBlockIndex, pages, getVisibleBlocks]);

  // Get actual progress percentage based on visible steps completed
  const getActualProgress = useCallback((): number => {
    const totalSteps = getTotalVisibleSteps();
    const currentPosition = getCurrentStepPosition();
    
    if (totalSteps === 0) return 0;
    
    // Add 1 to current position because we're calculating completion of current step
    return Math.min(100, ((currentPosition + 1) / totalSteps) * 100);
  }, [getTotalVisibleSteps, getCurrentStepPosition]);

  // Rest of the existing context logic (setValue, setError, etc.)
  const updateComputedValues = useCallback(() => {
    if (Object.keys(computedFields).length === 0) return;

    const newComputedValues: Record<string, any> = {};

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

    setComputedValues(prev => ({ ...prev, ...newComputedValues }));
  }, [values, computedValues, computedFields]);

  useEffect(() => {
    updateComputedValues();
  }, [values, updateComputedValues]);

  const evaluateConditionWithContext = useCallback((condition: string, contextData?: Record<string, any>) => {
    const contextValues = {
      ...values,
      ...computedValues,
      ...(contextData || {})
    };

    return evaluateCondition(condition, contextValues);
  }, [values, computedValues]);

  const getNextPageIndex = useCallback((): number | null => {
    const currentPageBlocks = pages[currentPage] || [];
    let branchingLogic: BranchingLogic | undefined;

    if (currentPageBlocks.length > 0) {
      const firstBlock = currentPageBlocks[0];
      if (typeof firstBlock === 'object' && firstBlock.branchingLogic) {
        branchingLogic = firstBlock.branchingLogic;
      }
    }

    if (!branchingLogic) {
      const page = pages[currentPage];
      if (Array.isArray(page) && page.length > 0) {
        const setParent = page[0];
        if (typeof setParent === 'object' && setParent.branchingLogic) {
          branchingLogic = setParent.branchingLogic;
        }
      }
    }

    if (branchingLogic) {
      const nextIndex = calculateNextPageIndex(
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
      currentPageBlocks,
      pages,
      pageIds,
      { ...values, ...computedValues }
    );
    if (navIndex !== null) {
      return navIndex === -1 ? null : navIndex;
    }

    return currentPage + 1 < totalPages ? currentPage + 1 : null;
  }, [currentPage, pages, totalPages, values, computedValues]);

  const validateField = useCallback((fieldName: string, value: any): string | null => {
    const validator = customValidators[fieldName];
    if (!validator) return null;

    try {
      const error = validator.validate(value, { ...values, ...computedValues });
      return error;
    } catch (error) {
      console.error(`Error validating field ${fieldName}:`, error);
      return `Validation error: ${(error as Error).message}`;
    }
  }, [customValidators, values, computedValues]);

  // Calculate if the current page is valid
  const currentPageBlocks = pages[currentPage] || [];
  const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);
  const currentPageFields = visibleCurrentPageBlocks
    .filter(block => block.fieldName)
    .map(block => block.fieldName as string);

  const isValid = currentPageFields.every(field => !errors[field] && !conditionalErrors[field]);

  // Enhanced setValue with navigation history
  const setValue = (field: string, value: any) => {
    setValues(prev => {
      const updatedValues = { ...prev, [field]: value };

      // Existing validation logic...
      const currentPageItem = pages[currentPage];
      if (Array.isArray(currentPageItem) && currentPageItem.length > 0) {
        const setParent = currentPageItem[0];
        if (typeof setParent === 'object' && setParent.exitLogic) {
          try {
            const result = evaluateLogic(setParent.exitLogic, {
              fieldValues: updatedValues,
              getFieldValue: (name) => updatedValues[name] || computedValues[name]
            });
            if (result && typeof result === 'object' && isValid === false) {
              setError(field, result.errorMessage || 'Invalid value');
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
        setConditionalErrors(prev => ({ ...prev, [field]: validationError }));
      } else {
        setConditionalErrors(prev => {
          const newErrors = { ...prev };
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

  const setError = (field: string, error: string | null) => {
    setErrors(prev => {
      if (error === null) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return { ...prev, [field]: error };
    });
  };

  // Enhanced navigation functions
  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      // Add to navigation history
      addToNavigationHistory(pageIndex, 0, 'jump');
      
      setCurrentPage(pageIndex);
      setCurrentBlockIndex(0);

      // Update browser history
      window.history.pushState({ surveyPage: pageIndex, surveyBlock: 0 }, '');

      if (onPageChange) {
        onPageChange(pageIndex, totalPages);
      }
    }
  };

  const goToNextBlock = (fValue? : Record<string, any>) => {
    const pageBlocks = pages[currentPage] || [];
    const currentBlock = pageBlocks[currentBlockIndex];

    if (currentBlock?.isEndBlock) {
      submit();
      return;
    }

    const currentValues = fValue ?? values;

    const target = getNextStepFromNavigationRules(
      currentBlock,
      pages,
      pageIds,
      { ...currentValues, ...computedValues }
    );

    if (target === 'submit') {
      submit();
      return;
    }

    if (target) {
      // Add to navigation history
      addToNavigationHistory(target.pageIndex, target.blockIndex, 'forward');
      
      setCurrentPage(target.pageIndex);
      setCurrentBlockIndex(target.blockIndex);
      
      // Update browser history
      window.history.pushState({ surveyPage: target.pageIndex, surveyBlock: target.blockIndex }, '');
      
      if (onPageChange) {
        onPageChange(target.pageIndex, totalPages);
      }
      return;
    }

    if (currentBlockIndex < pageBlocks.length - 1) {
      const newBlockIndex = currentBlockIndex + 1;
      addToNavigationHistory(currentPage, newBlockIndex, 'forward');
      setCurrentBlockIndex(newBlockIndex);
      
      // Update browser history
      window.history.pushState({ surveyPage: currentPage, surveyBlock: newBlockIndex }, '');
      return;
    }

    const nextIndex = getNextPageIndex();
    if (nextIndex === null) {
      submit();
    } else {
      addToNavigationHistory(nextIndex, 0, 'forward');
      goToPage(nextIndex);
    }
  };

  // Enhanced goToPreviousBlock using navigation history
  const goToPreviousBlock = () => {
    if (navigationHistory.length <= 1) {
      return; // No history to go back to
    }

    // Remove current entry and get previous entry
    const newHistory = [...navigationHistory];
    newHistory.pop(); // Remove current position
    const previousEntry = newHistory[newHistory.length - 1];

    if (previousEntry) {
      setNavigationHistory(newHistory);
      setCurrentPage(previousEntry.pageIndex);
      setCurrentBlockIndex(previousEntry.blockIndex);

      // Update browser history
      window.history.pushState({ 
        surveyPage: previousEntry.pageIndex, 
        surveyBlock: previousEntry.blockIndex 
      }, '');

      if (onPageChange) {
        onPageChange(previousEntry.pageIndex, totalPages);
      }
    }
  };

  const goToNextPage = () => {
    goToNextBlock();
  };

  const goToPreviousPage = () => {
    goToPreviousBlock();
  };

  // Enhanced submit function
  const submit = async () => {
    setIsSubmitting(true);

    updateComputedValues();

    let hasErrors = false;
    const allFields = pages.flat()
      .filter(block => block.fieldName)
      .map(block => block.fieldName as string);

    const newErrors: Record<string, string> = {};
    const newConditionalErrors: Record<string, string> = {};

    allFields.forEach(field => {
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

  return (
    <SurveyFormContext.Provider
      value={{
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
        getNextPageIndex,
        getVisibleBlocks,
        validateField,
        // Enhanced navigation properties
        navigationHistory,
        canGoBack,
        getActualProgress,
        getTotalVisibleSteps,
        getCurrentStepPosition,
        logo
      }}
    >
      {children}
    </SurveyFormContext.Provider>
  );
};

// Hook to use the survey form context
export const useSurveyForm = () => useContext(SurveyFormContext);