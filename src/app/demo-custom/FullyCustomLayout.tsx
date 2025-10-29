"use client";

import React from 'react';
import type { LayoutProps } from '@/packages/survey-form-package/src/types';
import { useSurveyForm } from '@/packages/survey-form-package/src/context/SurveyFormContext';
import { BlockRenderer } from '@/packages/survey-form-package/src/renderer/renderers/BlockRenderer';
import { getSurveyPages } from '@/packages/survey-form-package/src/utils/surveyUtils';

/**
 * Fully Custom Layout Example (No Helpers)
 *
 * This example shows how to create a completely custom layout
 * WITHOUT using any of the helper components.
 *
 * You have full control over:
 * - Custom progress bar design
 * - Custom navigation button styling
 * - Custom animations and transitions
 * - Custom form submission logic
 *
 * This gives you maximum flexibility while still getting:
 * - Automatic analytics tracking (via createLayout wrapper)
 * - Access to survey context via useSurveyForm()
 * - All survey state management handled
 */
export const FullyCustomLayout: React.FC<LayoutProps> = ({ logo }) => {
  const {
    currentPage,
    currentBlockIndex,
    totalPages,
    values,
    setValue,
    errors,
    goToNextBlock,
    goToPreviousBlock,
    isLastPage,
    submit,
    isValid,
    theme,
    surveyData,
    canGoBack,
    getActualProgress,
  } = useSurveyForm();

  // Get current page blocks
  const pages = getSurveyPages(surveyData.rootNode);
  const currentPageBlocks = currentPage < pages.length ? pages[currentPage] : [];
  const currentBlock = currentPageBlocks[currentBlockIndex];

  // Calculate custom progress
  const progress = getActualProgress();
  const isFinalStep = isLastPage && currentBlockIndex === currentPageBlocks.length - 1;

  // Custom form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFinalStep) {
      submit();
    } else {
      goToNextBlock();
    }
  };

  // Custom previous handler
  const handlePrevious = () => {
    goToPreviousBlock();
  };

  return (
    <div className="fully-custom-layout min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Custom Logo Section */}
        {logo && (
          <div className="text-center mb-8 transform hover:scale-105 transition-transform">
            {logo}
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Custom Progress Bar - Completely Custom Design */}
          <div className="relative h-3 bg-gradient-to-r from-gray-200 to-gray-300">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>

            {/* Progress indicator bubble */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-blue-500 transition-all duration-700"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="absolute inset-1 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Custom Header */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Question {currentPage + 1}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  of {totalPages} total
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(progress)}%
                </div>
                <p className="text-xs text-gray-500">complete</p>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            {currentBlock && (
              <div className="mb-8 transform transition-all duration-300 hover:scale-[1.01]">
                <BlockRenderer
                  block={currentBlock}
                  value={currentBlock.fieldName ? values[currentBlock.fieldName] : undefined}
                  onChange={(value) => {
                    const field = currentBlock.fieldName;
                    if (field) setValue(field, value);
                    if (currentBlock.autoContinueOnSelect) {
                      goToNextBlock(field ? { [field]: value } : undefined);
                    }
                  }}
                  error={currentBlock.fieldName ? errors[currentBlock.fieldName] : undefined}
                  theme={theme}
                />
              </div>
            )}

            {/* Custom Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              {/* Custom Back Button with Icon */}
              {canGoBack ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="group px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 flex items-center gap-2 hover:gap-3"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>
              ) : (
                <div /> // Spacer
              )}

              {/* Custom Next/Submit Button with Gradient */}
              <button
                type="submit"
                disabled={!isValid}
                className={`group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 ${
                  isValid
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl hover:scale-105'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {/* Animated background on hover */}
                {isValid && (
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <span className="relative flex items-center gap-2">
                  {isFinalStep ? (
                    <>
                      <span>Complete Survey</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Custom Footer with Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Fully custom layout - no helpers used</span>
              </div>
              <div className="hidden sm:block">
                Press Enter to continue
              </div>
            </div>
          </div>
        </div>

        {/* Custom Progress Steps Visualization */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i < currentPage
                  ? 'w-8 bg-green-500' // Completed
                  : i === currentPage
                  ? 'w-12 bg-blue-500' // Current
                  : 'w-6 bg-gray-300' // Upcoming
              }`}
            />
          ))}
        </div>
      </div>

      {/* Add custom shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};
