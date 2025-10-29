"use client";

import React from 'react';
import type { LayoutProps } from '@/packages/survey-form-package/src/types';
import {
  CurrentBlock,
  NavigationButtons,
  ProgressIndicator
} from '@/packages/survey-form-package/src';

/**
 * Example Custom Layout (Simplified Version)
 *
 * This is a simple example showing how easy it is to create a custom layout
 * using the new helper components. Notice how much simpler this is compared
 * to manually managing all the survey state!
 *
 * The helpers automatically handle:
 * - Block rendering with proper value/error wiring
 * - Submit vs next button logic
 * - Form submission handling
 * - Progress calculation
 * - Analytics tracking (automatic!)
 */
export const CustomSimpleLayout: React.FC<LayoutProps> = ({ logo }) => {
  return (
    <div className="custom-simple-layout min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        {logo && (
          <div className="text-center mb-6">
            {logo}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Custom Progress Bar - Using ProgressIndicator helper */}
          <ProgressIndicator
            render={({ progress, currentStep, totalSteps }) => (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-purple-600">
                    Question {currentStep} of {totalSteps}
                  </span>
                  <span className="text-sm font-semibold text-purple-600">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="h-3 bg-purple-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          />

          {/* Question Content - Using CurrentBlock helper */}
          {/* Automatically handles: BlockRenderer, value/error wiring, onChange */}
          <CurrentBlock className="space-y-4 mb-8" autoFocus />

          {/* Navigation Buttons - Using NavigationButtons helper */}
          {/* Automatically handles: form submission, submit vs next logic, validation */}
          <NavigationButtons
            className="pt-6 border-t border-gray-100"
            variant="custom"
            previousText="Back"
            nextText="Continue"
            submitText="Complete Survey"
            renderPreviousButton={({ onClick, disabled, text }) => (
              <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className="px-6 py-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{text}</span>
              </button>
            )}
            renderNextButton={({ disabled, text, isSubmit }) => (
              <button
                type="submit"
                disabled={disabled}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center space-x-2 ${
                  disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <span>{text}</span>
                {!isSubmit && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            )}
          />

          {/* Custom Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Custom layout created with helper components
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
