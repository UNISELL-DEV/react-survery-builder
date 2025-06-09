import React, { useEffect, useRef } from 'react';
import { useSurveyForm } from '../../context/SurveyFormContext';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { themes } from '../../themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSurveyPages } from '../../utils/surveyUtils';

interface FullPageSurveyLayoutProps {
  progressBar?: boolean | {
    type?: 'bar' | 'dots' | 'numbers' | 'percentage';
    showPercentage?: boolean;
    showStepInfo?: boolean;
    showStepTitles?: boolean;
    showStepNumbers?: boolean;
    position?: 'top' | 'bottom';
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
    position?: 'bottom' | 'split';
    align?: 'left' | 'center' | 'right';
    style?: 'default' | 'outlined' | 'text';
  };
  autoScroll?: boolean;
  autoFocus?: boolean;
  showSummary?: boolean;
  submitText?: string;
  enableDebug?: boolean;
}

export const FullPageSurveyLayout: React.FC<FullPageSurveyLayoutProps> = ({
  progressBar = true,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: 'Previous',
    nextText: 'Continue',
    submitText: 'Complete Survey',
    position: 'bottom',
    align: 'center',
    style: 'default',
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = 'Complete Survey',
  enableDebug = false,
}) => {
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
    surveyData
  } = useSurveyForm();

  const themeConfig = themes[theme] || themes.default;
  const containerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Get the current page blocks from the surveyData in context
  const pages = getSurveyPages(surveyData.rootNode);
  const currentPageBlocks = currentPage < pages.length ? pages[currentPage] : [];

  // Auto-focus first input when page changes
  useEffect(() => {
    if (autoFocus && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
    }
  }, [currentPage, autoFocus]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastPage) {
      submit();
    } else {
      goToNextPage();
    }
  };

  // Handle previous navigation
  const handlePrevious = () => {
    if (!isFirstPage) {
      goToPreviousPage();
    }
  };

  // Apply dark mode styling
  const isDarkMode = theme === 'dark';

  // Calculate progress percentage
  const progressPercentage = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;
  
  // Get button text from navigationButtons or fallback
  const continueText = navigationButtons?.nextText || 'Continue';
  const completeText = navigationButtons?.submitText || submitText;

  return (
    <div 
      className="survey-fullpage-layout min-h-[80vh] flex flex-col"
      ref={containerRef}
    >
      {/* Header with back button and progress bar */}
      <div className="w-full py-4">
        <div className="w-full max-w-2xl mx-auto px-4">
          {/* Back Button Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Subtle Previous Button */}
            {!isFirstPage && navigationButtons?.showPrevious !== false ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className={cn(
                  "opacity-50 hover:opacity-100 transition-opacity",
                  "w-8 h-8 p-0 rounded-full",
                  "hover:bg-muted"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="sr-only">{navigationButtons?.previousText || 'Previous'}</span>
              </Button>
            ) : (
              <div className="w-8" /> // Placeholder to maintain layout
            )}
            
            {/* Page indicator */}
            <div className="text-sm text-muted-foreground">
              {currentPage + 1} of {totalPages}
            </div>
          </div>

          {/* Progress Bar */}
          {progressBar && (
            <div className="w-full">
              {typeof progressBar === 'object' && progressBar.position === 'bottom' ? null : (
                <div className={cn(
                  "h-2 w-full rounded-full overflow-hidden",
                  "bg-muted"
                )}>
                  <motion.div
                    className={cn(
                      "h-full transition-all duration-500 ease-out rounded-full",
                      typeof progressBar === 'object' && progressBar.color 
                        ? progressBar.color 
                        : "bg-primary"
                    )}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercentage}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area - Blocks at the top with margin */}
      <div className="flex flex-col mt-8">
        <div className="w-full max-w-2xl mx-auto px-4 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {/* Question Content - positioned at top */}
              <div className="space-y-8 mb-16">
                {currentPageBlocks.map((block, index) => (
                  <div key={block.uuid || `block-${index}`} className="space-y-4">
                    <BlockRenderer
                      block={block}
                      value={block.fieldName ? values[block.fieldName] : undefined}
                      onChange={(value) => block.fieldName && setValue(block.fieldName, value)}
                      error={block.fieldName ? errors[block.fieldName] : undefined}
                      ref={index === 0 ? firstInputRef : undefined}
                      theme={theme}
                    />
                  </div>
                ))}
              </div>

              {/* Spacer to push navigation buttons down */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons - Fixed at the bottom with more separation */}
      <div className="w-full mt-8">
        <div className="w-full max-w-2xl mx-auto px-4 py-6">
          <form onSubmit={handleSubmit}>
            <div className={cn(
              "flex items-center",
              navigationButtons?.align === 'left' ? "justify-start" :
              navigationButtons?.align === 'right' ? "justify-end" :
              "justify-center"
            )}>
              {/* Previous Button (if split layout and not first page) */}
              {navigationButtons?.position === 'split' && !isFirstPage && navigationButtons?.showPrevious !== false && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="mr-auto"
                >
                  <ChevronLeft className="mr-2 w-4 h-4" />
                  {navigationButtons?.previousText || 'Previous'}
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
                  "min-w-[160px] rounded-xl"
                )}
              >
                {isLastPage ? completeText : continueText}
                {!isLastPage && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};