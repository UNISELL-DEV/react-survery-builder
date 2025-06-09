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

// Create context with default values
export const SurveyFormContext = createContext<SurveyFormContextProps>({
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
  surveyData: { rootNode: {} },
  // Default values for new conditional props
  conditionalErrors: {},
  computedValues: {},
  updateComputedValues: () => {},
  evaluateCondition: () => false,
  getNextPageIndex: () => null,
  getVisibleBlocks: () => [],
  validateField: () => null,
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
  // New properties for conditional features
  computedFields?: ComputedFieldsConfig;
  customValidators?: Record<string, CustomValidator>;
  debug?: boolean;
  enableDebug? : boolean;
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

  // Get all pages from the survey
  const pages = getSurveyPages(surveyData.rootNode);
  const pageIds = getSurveyPageIds(surveyData.rootNode);
  const totalPages = Math.max(1, pages.length); // Ensure we always have at least 1 page

  // Log pages for debugging
  useEffect(() => {
    if (debug) {
      console.log(`Survey has ${totalPages} pages:`, pages);
    }
  }, [surveyData, totalPages, debug]);

  // Navigation states
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    setCurrentBlockIndex(0);
  }, [currentPage]);

  // Update computed values whenever form values change
  const updateComputedValues = useCallback(() => {
    if (Object.keys(computedFields).length === 0) return;

    const newComputedValues: Record<string, any> = {};

    // Execute each calculation rule
    Object.entries(computedFields).forEach(([fieldName, config]) => {
      const result = executeCalculation(
        {
          formula: config.formula,
          targetField: fieldName,
          dependencies: config.dependencies
        },
        { ...values, ...computedValues }
      );

      // Apply formatting if specified
      newComputedValues[fieldName] = config.format ? config.format(result) : result;
    });

    setComputedValues(prev => ({ ...prev, ...newComputedValues }));
  }, [values, computedValues, computedFields]);

  // Update computed values when dependencies change
  useEffect(() => {
    updateComputedValues();
  }, [values, updateComputedValues]);

  // Evaluate a condition with current values
  const evaluateConditionWithContext = useCallback((condition: string, contextData?: Record<string, any>) => {
    // Combine form values, computed values, and any additional context data
    const contextValues = {
      ...values,
      ...computedValues,
      ...(contextData || {})
    };

    return evaluateCondition(condition, contextValues);
  }, [values, computedValues]);

  // Get visible blocks based on visibility conditions
  const getVisibleBlocks = useCallback((blocks: BlockData[]): BlockData[] => {
    return blocks.filter(block => {
      // Check if the block has a visibility condition
      if (!block.visibleIf) return true;

      // Evaluate the visibility condition
      return isBlockVisible(block, { ...values, ...computedValues });
    });
  }, [values, computedValues]);

  // Get the next page index based on branching logic
  const getNextPageIndex = useCallback((): number | null => {
    const currentPageBlocks = pages[currentPage] || [];

    // Check if there's a branching logic defined for the current page
    let branchingLogic: BranchingLogic | undefined;

    // Look for branching logic in the first set block if this is a set page
    if (currentPageBlocks.length > 0) {
      const firstBlock = currentPageBlocks[0];
      if (typeof firstBlock === 'object' && firstBlock.branchingLogic) {
        branchingLogic = firstBlock.branchingLogic;
      }
    }

    if (!branchingLogic) {
      // Check if there's a branching logic at the page level
      const page = pages[currentPage];
      if (Array.isArray(page) && page.length > 0) {
        const setParent = page[0];
        if (typeof setParent === 'object' && setParent.branchingLogic) {
          branchingLogic = setParent.branchingLogic;
        }
      }
    }

    // If we found branching logic, use it to determine the next page
    if (branchingLogic) {
      const nextIndex = calculateNextPageIndex(
        currentPage,
        branchingLogic,
        { ...values, ...computedValues },
        totalPages
      );

      // Special case: -1 indicates submission
      if (nextIndex === -1) {
        return null; // Signal submission
      }

      return nextIndex;
    }

    // Check navigation rules on blocks
    const navIndex = getNextPageFromNavigationRules(
      currentPageBlocks,
      pages,
      pageIds,
      { ...values, ...computedValues }
    );
    if (navIndex !== null) {
      return navIndex === -1 ? null : navIndex;
    }

    // Default to next page
    return currentPage + 1 < totalPages ? currentPage + 1 : null;
  }, [currentPage, pages, totalPages, values, computedValues]);

  // Validate a field with custom validators
  const validateField = useCallback((fieldName: string, value: any): string | null => {
    // Check if we have a custom validator for this field
    const validator = customValidators[fieldName];
    if (!validator) return null;

    try {
      // Run the synchronous validation
      const error = validator.validate(value, { ...values, ...computedValues });
      return error;
    } catch (error) {
      console.error(`Error validating field ${fieldName}:`, error);
      return `Validation error: ${(error as Error).message}`;
    }
  }, [customValidators, values, computedValues]);

  // Calculate if the current page is valid (no errors)
  const currentPageBlocks = pages[currentPage] || [];
  const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);
  const currentPageFields = visibleCurrentPageBlocks
    .filter(block => block.fieldName)
    .map(block => block.fieldName as string);

  const isValid = currentPageFields.every(field => !errors[field] && !conditionalErrors[field]);

  // Handle value change for a field
  const setValue = (field: string, value: any) => {
    setValues(prev => {
      const updatedValues = { ...prev, [field]: value };

      // Run exit logic validation if it exists
      const currentPageItem = pages[currentPage];
      if (Array.isArray(currentPageItem) && currentPageItem.length > 0) {
        // Assuming the first item could be a set with exitLogic
        const setParent = currentPageItem[0];
        if (typeof setParent === 'object' && setParent.exitLogic) {
          try {
            const result = evaluateLogic(setParent.exitLogic, {
              fieldValues: updatedValues,
              getFieldValue: (name) => updatedValues[name] || computedValues[name]
            });
            if (result && typeof result === 'object' && 'isValid' === false) {
              setError(field, result.errorMessage || 'Invalid value');
            } else {
              setError(field, null);
            }
          } catch (error) {
            console.error("Error evaluating exit logic:", error);
          }
        }
      }

      // Run custom validator if exists
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

      // Notify parent of change
      if (onChange) {
        onChange(updatedValues);
      }

      return updatedValues;
    });
  };

  // Handle setting an error for a field
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

  // Navigation functions
  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
      setCurrentBlockIndex(0);

      // Notify parent of page change
      if (onPageChange) {
        onPageChange(pageIndex, totalPages);
      }
    }
  };

  const goToNextBlock = () => {
    const pageBlocks = pages[currentPage] || [];
    const currentBlock = pageBlocks[currentBlockIndex];

    const target = getNextStepFromNavigationRules(
      currentBlock,
      pages,
      pageIds,
      { ...values, ...computedValues }
    );

    if (target === 'submit') {
      submit();
      return;
    }

    if (target) {
      setCurrentPage(target.pageIndex);
      setCurrentBlockIndex(target.blockIndex);
      if (onPageChange) {
        onPageChange(target.pageIndex, totalPages);
      }
      return;
    }

    if (currentBlockIndex < pageBlocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
      return;
    }

    const nextIndex = getNextPageIndex();
    if (nextIndex === null) {
      submit();
    } else {
      goToPage(nextIndex);
    }
  };

  const goToPreviousBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
      return;
    }
    if (!isFirstPage) {
      const prevPage = currentPage - 1;
      const prevBlocks = pages[prevPage] || [];
      setCurrentPage(prevPage);
      setCurrentBlockIndex(prevBlocks.length > 0 ? prevBlocks.length - 1 : 0);
      if (onPageChange) {
        onPageChange(prevPage, totalPages);
      }
    }
  };

  const goToNextPage = () => {
    goToNextBlock();
  };

  const goToPreviousPage = () => {
    goToPreviousBlock();
  };

  // Handle form submission
  const submit = async () => {
    setIsSubmitting(true);

    // Update computed values one last time before submission
    updateComputedValues();

    // Validate all fields one last time
    let hasErrors = false;
    const allFields = pages.flat()
      .filter(block => block.fieldName)
      .map(block => block.fieldName as string);

    const newErrors: Record<string, string> = {};
    const newConditionalErrors: Record<string, string> = {};

    // Run validators for all fields
    allFields.forEach(field => {
      const value = values[field];
      const validationError = validateField(field, value);
      if (validationError) {
        newConditionalErrors[field] = validationError;
        hasErrors = true;
      }
    });

    setConditionalErrors(newConditionalErrors);

    // Check if there are any errors
    if (!hasErrors && Object.keys(errors).length === 0) {
      if (onSubmit) {
        try {
          // Combine form values and computed values for submission
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
        // New conditional features
        conditionalErrors,
        computedValues,
        updateComputedValues,
        evaluateCondition: evaluateConditionWithContext,
        getNextPageIndex,
        getVisibleBlocks,
        validateField,
      }}
    >
      {children}
    </SurveyFormContext.Provider>
  );
};

// Hook to use the survey form context
export const useSurveyForm = () => useContext(SurveyFormContext);
