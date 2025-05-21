import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { NodeData, BlockData } from "../../../../lib/survey/types";
import type { SurveyFormContextProps, SurveyTheme } from "../types";
import { getSurveyPages, evaluateLogic } from "../utils/surveyUtils";

// Create context with default values
export const SurveyFormContext = createContext<SurveyFormContextProps>({
  values: {},
  setValue: () => {},
  errors: {},
  setError: () => {},
  currentPage: 0,
  totalPages: 0,
  goToPage: () => {},
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  isFirstPage: true,
  isLastPage: true,
  isSubmitting: false,
  isValid: true,
  submit: () => {},
  language: "en",
  setLanguage: () => {},
  theme: "default",
  surveyData: { rootNode: {} },
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
  enableDebug? : boolean,
  theme?: SurveyTheme;
}

// Provider component
export const SurveyFormProvider: React.FC<SurveyFormProviderProps> = ({
  children,
  surveyData,
  defaultValues = {},
  onSubmit,
  onChange,
  onPageChange,
  enableDebug = false,
  language = "en",
  theme = "default",
}) => {
  // State for form values and errors
  const [values, setValues] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  // Get all pages from the survey
  const pages = getSurveyPages(surveyData.rootNode);
  const totalPages = Math.max(1, pages.length); // Ensure we always have at least 1 page

  // Log pages for debugging
  useEffect(() => {
    console.log(`Survey has ${totalPages} pages:`, pages);
  }, [surveyData, totalPages]);

  // Navigation states
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  // Calculate if the current page is valid (no errors)
  const currentPageBlocks = pages[currentPage] || [];
  const currentPageFields = currentPageBlocks
    .filter(block => block.fieldName)
    .map(block => block.fieldName as string);

  const isValid = currentPageFields.every(field => !errors[field]);

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
            const result = evaluateLogic(setParent.exitLogic, { fieldValues: updatedValues });
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

      // Notify parent of page change
      if (onPageChange) {
        onPageChange(pageIndex, totalPages);
      }
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      goToPage(currentPage - 1);
    }
  };

  // Handle form submission
  const submit = async () => {
    setIsSubmitting(true);

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      if (onSubmit) {
        try {
          await onSubmit(values);
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
        totalPages,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        isFirstPage,
        isLastPage,
        isSubmitting,
        isValid,
        submit,
        language: currentLanguage,
        setLanguage: setCurrentLanguage,
        theme,
        surveyData,
      }}
    >
      {children}
    </SurveyFormContext.Provider>
  );
};

// Hook to use the survey form context
export const useSurveyForm = () => useContext(SurveyFormContext);