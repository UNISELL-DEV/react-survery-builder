// Enhanced FullPageSurveyLayout with percentage-based progress and navigation history
import React, { useEffect, useRef } from "react";
import { useSurveyForm } from "../../context/SurveyFormContext";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { themes } from "../../themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSurveyPages } from "../../utils/surveyUtils";

interface FullPageSurveyLayoutProps {
  progressBar?:
    | boolean
    | {
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
      };
  navigationButtons?: {
    showPrevious?: boolean;
    showNext?: boolean;
    showSubmit?: boolean;
    previousText?: string;
    nextText?: string;
    submitText?: string;
    position?: "bottom" | "split";
    align?: "left" | "center" | "right";
    style?: "default" | "outlined" | "text";
  };
  autoScroll?: boolean;
  autoFocus?: boolean;
  showSummary?: boolean;
  submitText?: string;
  enableDebug?: boolean;
  showNavigationHistory?: boolean; // New prop to show/hide navigation history info
}

export const FullPageSurveyLayout: React.FC<FullPageSurveyLayoutProps> = ({
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
    style: "default",
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = "Complete Survey",
  enableDebug = false,
  showNavigationHistory = false,
}) => {
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
    getVisibleBlocks,
  } = useSurveyForm();

  const themeConfig = themes[theme] || themes.default;
  const containerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Get the current page blocks from the surveyData in context
  const pages = getSurveyPages(surveyData.rootNode);
  const currentPageBlocks = currentPage < pages.length ? pages[currentPage] : [];
  const visibleCurrentPageBlocks = getVisibleBlocks(currentPageBlocks);

  // Auto-focus first input when step changes
  useEffect(() => {
    if (autoFocus && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
    }
  }, [currentPage, currentBlockIndex, autoFocus]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastPage && currentBlockIndex === currentPageBlocks.length - 1) {
      submit();
    } else {
      goToNextBlock();
    }
  };

  // Handle previous navigation using history
  const handlePrevious = () => {
    if (canGoBack) {
      goToPreviousBlock();
    }
  };

  // Calculate progress percentage based on actual visible steps completed
  const progressPercentage = getActualProgress();
  const currentStepPosition = getCurrentStepPosition();
  const totalVisibleSteps = getTotalVisibleSteps();

  // Get button text from navigationButtons or fallback
  const continueText = navigationButtons?.nextText || "Continue";
  const completeText = navigationButtons?.submitText || submitText;

  // Debug info (only shown when enableDebug is true)
  const debugInfo = enableDebug ? {
    currentPage,
    currentBlockIndex,
    totalPages,
    totalVisibleSteps,
    currentStepPosition,
    progressPercentage: Math.round(progressPercentage),
    navigationHistoryLength: navigationHistory.length,
    canGoBack,
    visibleBlocksInCurrentPage: visibleCurrentPageBlocks.length,
  } : null;

  return (
    <div
      className="survey-fullpage-layout min-h-[80vh] flex flex-col"
      ref={containerRef}
    >
      {/* Debug Panel (only visible when enableDebug is true) */}
      {enableDebug && (
        <div className="w-full bg-yellow-50 border-b border-yellow-200 p-2 text-xs">
          <div className="max-w-2xl mx-auto">
            <details className="cursor-pointer">
              <summary className="font-medium text-yellow-800">Debug Info</summary>
              <pre className="mt-2 text-yellow-700 whitespace-pre-wrap">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}

      {/* Header with back button and progress bar */}
      <div className="w-full py-4">
        <div className="w-full max-w-2xl mx-auto px-4">
          {/* Back Button Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Enhanced Previous Button with history indicator */}
            {navigationButtons?.showPrevious !== false && canGoBack ? (
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className={cn(
                    "opacity-50 hover:opacity-100 transition-opacity",
                    "w-8 h-8 p-0 rounded-full",
                    "hover:bg-muted",
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">
                    {navigationButtons?.previousText || "Previous"}
                  </span>
                </Button>
                
                {/* Navigation history indicator */}
                {showNavigationHistory && (
                  <div className="text-xs text-muted-foreground flex items-center">
                    <History className="w-3 h-3 mr-1" />
                    {navigationHistory.length - 1}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-8" /> // Placeholder to maintain layout
            )}

            {/* Enhanced step indicator with percentage */}
            <div className="text-sm text-muted-foreground flex flex-col items-center">
              <div>{Math.round(progressPercentage)}% </div>
              {enableDebug && (
                <div className="text-xs opacity-75">
                  Step {currentStepPosition + 1} of {totalVisibleSteps}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Progress Bar with percentage */}
          {progressBar && (
            <div className="w-full">
              {typeof progressBar === "object" &&
              progressBar.position === "bottom" ? null : (
                <div className="space-y-1">
                  <div
                    className={cn(
                      "h-2 w-full rounded-full overflow-hidden",
                      "bg-muted",
                    )}
                  >
                    <motion.div
                      className={cn(
                        "h-full transition-all duration-500 ease-out rounded-full",
                        typeof progressBar === "object" && progressBar.color
                          ? progressBar.color
                          : "bg-primary",
                      )}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  
                  {/* Progress bar type variations */}
                  {typeof progressBar === "object" && (
                    <>
                      {progressBar.type === "dots" && (
                        <div className="flex justify-center space-x-1 mt-2">
                          {Array.from({ length: totalVisibleSteps }, (_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-2 h-2 rounded-full transition-colors",
                                i <= currentStepPosition
                                  ? "bg-primary"
                                  : "bg-muted"
                              )}
                            />
                          ))}
                        </div>
                      )}
                      
                      {progressBar.type === "numbers" && (
                        <div className="text-center text-xs text-muted-foreground mt-1">
                          {currentStepPosition + 1} / {totalVisibleSteps}
                        </div>
                      )}
                                          </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area - Blocks at the top with margin */}
      <div className="flex flex-col mt-8">
        <div className="w-full max-w-2xl mx-auto px-4 flex-1 flex flex-col mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${currentBlockIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {/* Question Content - positioned at top */}
              <div className="space-y-8 mb-16">
                {currentPageBlocks[currentBlockIndex] && (
                  <div className="space-y-4">
                    <BlockRenderer
                      block={currentPageBlocks[currentBlockIndex]}
                      value={
                        currentPageBlocks[currentBlockIndex].fieldName
                          ? values[
                              currentPageBlocks[currentBlockIndex]
                                .fieldName as string
                            ]
                          : undefined
                      }
                      onChange={(value) => {
                        const field =
                          currentPageBlocks[currentBlockIndex].fieldName;
                        if (field) setValue(field, value);
                      }}
                      error={
                        currentPageBlocks[currentBlockIndex].fieldName
                          ? errors[
                              currentPageBlocks[currentBlockIndex]
                                .fieldName as string
                            ]
                          : undefined
                      }
                      ref={firstInputRef}
                      theme={theme}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons - Fixed at the bottom with more separation */}
      <div className="w-full mt-8">
        <div className="w-full max-w-2xl mx-auto px-4 py-6">
          <form onSubmit={handleSubmit}>
            <div
              className={cn(
                "flex items-center",
                navigationButtons?.align === "left"
                  ? "justify-start"
                  : navigationButtons?.align === "right"
                    ? "justify-end"
                    : "justify-center",
              )}
            >
              {/* Previous Button (if split layout and can go back) */}
              {navigationButtons?.position === "split" &&
                canGoBack &&
                navigationButtons?.showPrevious !== false && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="mr-auto"
                  >
                    <ChevronLeft className="mr-2 w-4 h-4" />
                    {navigationButtons?.previousText || "Previous"}
                  </Button>
                )}

              {/* Main Action Button */}
              <Button
                type="submit"
                disabled={!isValid}
                size="lg"
                className={cn(
                  "px-8 py-4 text-lg font-medium transition-all duration-200",
                  "hover:scale-105 active:scale-95",
                  "min-w-[160px] rounded-xl",
                )}
              >
                {isLastPage &&
                currentBlockIndex === currentPageBlocks.length - 1
                  ? completeText
                  : continueText}
                {!(
                  isLastPage &&
                  currentBlockIndex === currentPageBlocks.length - 1
                ) && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom progress bar (if positioned at bottom) */}
      {progressBar && 
       typeof progressBar === "object" && 
       progressBar.position === "bottom" && (
        <div className="w-full border-t bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-auto px-4 py-2">
            <div
              className={cn(
                "h-1 w-full rounded-full overflow-hidden",
                "bg-muted",
              )}
            >
              <motion.div
                className={cn(
                  "h-full transition-all duration-500 ease-out rounded-full",
                  progressBar.color || "bg-primary",
                )}
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};