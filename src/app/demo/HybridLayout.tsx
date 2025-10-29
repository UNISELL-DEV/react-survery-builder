"use client";

import React from 'react';
import type { LayoutProps } from '@/packages/survey-form-package/src/types';
import { useSurveyForm } from '@/packages/survey-form-package/src/context/SurveyFormContext';
import {
  CurrentBlock,
  NavigationButtons,
} from '@/packages/survey-form-package/src';

/**
 * Hybrid Layout Example (Mix of Helpers and Custom)
 *
 * This example shows the flexibility of the layout system:
 * - Use helper components where convenient (CurrentBlock, NavigationButtons)
 * - Create custom components where you need unique design (custom progress bar)
 * - Mix and match as needed
 *
 * Best of both worlds:
 * ✅ Helpers save time on common components
 * ✅ Custom code for unique branding/design
 * ✅ Full flexibility to choose what works for you
 */
export const HybridLayout: React.FC<LayoutProps> = ({ logo }) => {
  // Access survey context for custom components
  const {
    currentPage,
    totalPages,
    getActualProgress,
    surveyData,
  } = useSurveyForm();

  const progress = getActualProgress();
  const surveyTitle = surveyData?.rootNode?.name || 'Survey';

  return (
    <div className="hybrid-layout min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Custom Header Section */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            {logo && <div className="flex-shrink-0">{logo}</div>}
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-800">{surveyTitle}</h1>
              <p className="text-sm text-gray-500">Please complete all questions</p>
            </div>
          </div>

          {/* Custom Creative Progress Bar Design */}
          <div className="space-y-2">
            {/* Step indicators */}
            <div className="flex justify-between text-xs text-gray-600 font-medium">
              {Array.from({ length: totalPages }, (_, i) => (
                <span
                  key={i}
                  className={`${
                    i <= currentPage ? 'text-orange-600' : 'text-gray-400'
                  } transition-colors`}
                >
                  Step {i + 1}
                </span>
              ))}
            </div>

            {/* Multi-segment progress bar */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative"
                >
                  {/* Filled segment */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      i < currentPage
                        ? 'w-full bg-gradient-to-r from-orange-500 to-rose-500' // Completed
                        : i === currentPage
                        ? `bg-gradient-to-r from-orange-400 to-rose-400` // Current (partial)
                        : 'w-0 bg-gray-200' // Not started
                    }`}
                    style={
                      i === currentPage
                        ? {
                            width: `${
                              ((progress - currentPage * (100 / totalPages)) /
                                (100 / totalPages)) *
                              100
                            }%`,
                          }
                        : undefined
                    }
                  >
                    {/* Shimmer effect on current segment */}
                    {i === currentPage && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Percentage display */}
            <div className="text-right">
              <span className="text-sm font-semibold text-orange-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Main Content - Using CurrentBlock Helper */}
        <div className="bg-white shadow-lg p-8 border-t-4 border-orange-500">
          {/* Using the helper for simplicity! */}
          <CurrentBlock
            className="space-y-4"
            autoFocus
            onValueChange={(field, value) => {
              // Optional: Track changes for custom analytics
              console.log(`Field ${field} changed to:`, value);
            }}
          />
        </div>

        {/* Navigation - Using NavigationButtons Helper with Custom Rendering */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          <NavigationButtons
            variant="custom"
            previousText="← Go Back"
            nextText="Continue →"
            submitText="🎉 Complete Survey"
            align="space-between"
            renderPreviousButton={({ onClick, disabled, text }) => (
              <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={`px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium transition-all duration-200 hover:border-orange-500 hover:text-orange-600 hover:shadow-md ${
                  disabled ? 'opacity-0 pointer-events-none' : ''
                }`}
              >
                {text}
              </button>
            )}
            renderNextButton={({ disabled, text, isSubmit }) => (
              <button
                type="submit"
                disabled={disabled}
                className={`relative px-8 py-3 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 ${
                  disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                {/* Pulse animation for submit button */}
                {isSubmit && !disabled && (
                  <span className="absolute inset-0 bg-white/20 animate-pulse rounded-lg" />
                )}
                <span className="relative">{text}</span>
              </button>
            )}
            onNavigate={(direction) => {
              // Custom callback for navigation events
              console.log('Navigated:', direction);
            }}
          />

          {/* Custom Footer Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              💡 This layout combines helper components with custom design
            </p>
          </div>
        </div>

        {/* Custom Side Info Panel */}
        <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Hybrid Approach</p>
              <ul className="text-xs space-y-1 text-gray-600">
                <li>✓ Custom progress bar for unique branding</li>
                <li>✓ CurrentBlock helper for easy block rendering</li>
                <li>✓ NavigationButtons helper with custom styling</li>
                <li>✓ Custom header and footer sections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
