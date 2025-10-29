"use client";

import React, { useState, useEffect } from 'react';
import type { LayoutProps } from '@/packages/survey-form-package/src/types';
import { useSurveyForm } from '@/packages/survey-form-package/src/context/SurveyFormContext';
import { CurrentBlock, NavigationButtons } from '@/packages/survey-form-package/src';
import { motion, AnimatePresence } from "framer-motion";

export const RefillsLayout: React.FC<LayoutProps> = () => {
  const {
    getActualProgress,
    canGoBack,
    goToPreviousBlock,
    currentPage,
    currentBlockIndex,
  } = useSurveyForm();

  const progress = getActualProgress();

  // Track when content is ready to animate
  const [isReady, setIsReady] = useState(false);
  const contentKey = `page-${currentPage}-block-${currentBlockIndex}`;

  // Reset and set ready state when content changes
  useEffect(() => {
    setIsReady(false);
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, [contentKey]);

  return (
    <div className="refills-layout min-h-screen w-full flex flex-col bg-[#F5F3ED]">
      {/* Header - Dark Teal */}
      <header className="bg-[#1F5156] text-white">
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
          {/* Back Button */}
          <button
            type="button"
            onClick={canGoBack ? goToPreviousBlock : undefined}
            disabled={!canGoBack}
            className={`flex items-center gap-2 text-sm font-medium transition-opacity ${
              canGoBack ? 'hover:opacity-80' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Title */}
          <h1 className="text-lg text-white font-semibold">Refills</h1>

          {/* Help Icon */}
          <button
            type="button"
            className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Help"
          >
            <span className="text-sm font-semibold">?</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-6 pb-4">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          {isReady && (
            <AnimatePresence mode="wait">
              <motion.div
                key={contentKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Question Content */}
                <div className="mb-8">
                  <CurrentBlock className="space-y-4" />
                </div>

                {/* Navigation Button */}
                <NavigationButtons
                  variant="custom"
                  showPrevious={false}
                  nextText="Continue"
                  submitText="Complete"
                  renderNextButton={({ disabled, text }) => (
                    <button
                      type="submit"
                      disabled={disabled}
                      className={`w-full py-4 rounded-xl px-4 text-white font-semibold text-lg transition-all duration-200 ${
                        disabled
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#1F5156] hover:bg-[#2A6A71] active:scale-[0.98]'
                      }`}
                    >
                      {text}
                    </button>
                  )}
                />

              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Footer - Dark Teal */}
      <footer className="bg-[#1F5156] text-white">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Contact Info */}
            <div className="text-sm">
              <a href="tel:888-458-5061" className="hover:underline">
                (888) 458-5061
              </a>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
              <button
                type="button"
                className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Copyright"
              >
                <span className="text-xs">©</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
