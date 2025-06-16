// Enhanced FullPageSurveyLayout with fixed alignment and improved UX
import React, { useEffect, useRef } from "react";
import { useSurveyForm } from "../../context/SurveyFormContext";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { themes } from "../../themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@survey-form-renderer/components/ui/button";
import { ChevronLeft, ArrowRight, History } from "lucide-react";
import { cn } from "@survey-form-renderer/lib/utils";
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
  showNavigationHistory?: boolean;
  logo?: any;
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
  logo = null
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

  const themeConfig = themes[theme as keyof typeof themes] || themes.default;
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
    const currentBlock = currentPageBlocks[currentBlockIndex];
    if (currentBlock?.isEndBlock) {
      submit();
    } else if (isLastPage && currentBlockIndex === currentPageBlocks.length - 1) {
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
  const showNextButton =
    navigationButtons?.showNext !== false &&
    currentPageBlocks[currentBlockIndex]?.showContinueButton !== false;

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
      className="survey-fullpage-layout min-h-[90vh] flex flex-col"
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

      {/* Fixed Header Section */}
      <div className="w-full bg-background/95 backdrop-blur-sm border-b border-border/10">
        <div className="w-full max-w-2xl mx-auto px-4 py-4">
          
          {/* Progress Bar Section - Just the bar */}
          {progressBar && typeof progressBar === "object" && progressBar.position !== "bottom" && (
            <div className="mb-3">
              <div
                className={cn(
                  "h-2 w-full rounded-full overflow-hidden",
                  "bg-muted/60",
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

              {/* Progress bar type variations */}
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
            </div>
          )}

          {/* Default progress bar for boolean true */}
          {progressBar === true && (
            <div className="mb-3">
              <div
                className={cn(
                  "h-2 w-full rounded-full overflow-hidden",
                  "bg-muted/60",
                )}
              >
                <motion.div
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Navigation Row - Back button and Percentage on same line */}
          <div className="flex items-center justify-between h-8">
            
            {/* Left: Back Button Section - Fixed width container */}
            <div className="flex items-center w-24">
              {navigationButtons?.showPrevious !== false && canGoBack && (
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    className={cn(
                      "opacity-70 hover:opacity-100 transition-all duration-200",
                      "w-8 h-8 p-0 rounded-full",
                      "border-2 border-solid",
                      "hover:bg-muted hover:scale-105",
                      "focus:ring-2 focus:ring-primary/20"
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="sr-only">
                      {navigationButtons?.previousText || "Previous"}
                    </span>
                  </Button>

                  {/* Navigation history indicator */}
                  {showNavigationHistory && (
                    <div className="text-xs text-muted-foreground flex items-center opacity-70">
                      <History className="w-3 h-3 mr-1" />
                      <span className="tabular-nums">{navigationHistory.length - 1}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Center: Debug info only when enabled */}
            {enableDebug && (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-xs text-muted-foreground tabular-nums">
                  Step {currentStepPosition + 1} of {totalVisibleSteps}
                </div>
              </div>
            )}

            {/* Right: Percentage - Fixed width container for symmetry */}
            <div className="flex justify-end w-24">
              {progressBar && (
                <div className="text-sm font-medium text-foreground tabular-nums">
                  {Math.round(progressPercentage)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      {logo && (
        <header className="w-full flex justify-center py-6 px-4">
          <div className="text-center">
            {logo}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${currentBlockIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {/* Question Content */}
            <div className="flex-1 flex flex-col justify-start">
              <div className="w-full max-w-2xl mx-auto px-4 py-8">
                <div className="space-y-6">
                  {currentPageBlocks[currentBlockIndex] && (
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
                        const currentBlock =
                          currentPageBlocks[currentBlockIndex];
                        const field = currentBlock.fieldName;
                        if (field) setValue(field, value);
                        if (currentBlock.autoContinueOnSelect) {
                          goToNextBlock(field ? { [field]: value } : undefined);
                        }
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
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons - Fixed at bottom */}
            <div className="w-full bg-background/95 backdrop-blur-sm border-t border-border/10">
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
                    {/* Previous Button (if split layout) */}
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
                    {showNextButton && (
                      <Button
                        type="submit"
                        disabled={!isValid}
                        size="lg"
                        className={cn(
                          "px-8 py-4 text-lg font-medium transition-all duration-200",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          "min-w-[160px] rounded-xl shadow-sm",
                          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar (if positioned at bottom) */}
      {progressBar &&
        typeof progressBar === "object" &&
        progressBar.position === "bottom" && (
          <div className="w-full border-t bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl mx-auto px-4 py-2">
              <div
                className={cn(
                  "h-1 w-full rounded-full overflow-hidden",
                  "bg-muted/60",
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