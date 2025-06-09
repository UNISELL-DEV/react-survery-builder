import React, { useState, useEffect } from 'react';
import type { SurveyFormRendererProps } from '../types';
import { SurveyFormProvider } from '../context/SurveyFormContext';
import { PageByPageLayout } from './layouts/PageByPageLayout';
import { FullPageSurveyLayout } from './layouts/FullPageSurveyLayout';
import { ContinuousLayout } from './layouts/ContinuousLayout';
import { AccordionLayout } from './layouts/AccordionLayout';
import { TabsLayout } from './layouts/TabsLayout';
import { StepperLayout } from './layouts/StepperLayout';
import { themes } from '../themes';
import { getThemeClass } from '../utils/surveyUtils';

export const SurveyForm: React.FC<SurveyFormRendererProps> = ({
  survey,
  onSubmit,
  onChange,
  onPageChange,
  defaultValues = {},
  language = 'en',
  theme = 'default',
  layout = 'stepper',
  progressBar = true,
  navigationButtons = {
    showPrevious: true,
    showNext: true,
    showSubmit: true,
    previousText: 'Previous',
    nextText: 'Next',
    submitText: 'Submit',
    position: 'bottom',
    align: 'center',
    style: 'default',
  },
  autoScroll = true,
  autoFocus = true,
  showSummary = false,
  submitText = 'Submit',
  enableDebug = false,
  className = '',
}) => {
  // Debug log - helps diagnose issues with the survey data
  console.log('SurveyForm rendering with survey data:', survey?.rootNode?.type || 'No survey data');

  // Get the selected theme
  const themeConfig = themes[theme] || themes.default;

  // Container class based on theme
  const containerClass = getThemeClass(
    theme,
    `survey-form-container ${themeConfig.containerLayout}`,
    className
  );

  // Choose the correct layout based on the layout prop
  const renderLayout = (enableDebug: boolean) => {
    const layoutProps = {
      enableDebug,
      progressBar,
      navigationButtons,
      autoScroll,
      autoFocus,
      showSummary,
      submitText,
    };

    switch (layout) {
      case 'continuous':
        return <ContinuousLayout {...layoutProps} />;
      case 'accordion':
        return <AccordionLayout {...layoutProps} />;
      case 'tabs':
        return <TabsLayout {...layoutProps} />;
      case 'stepper':
        return <StepperLayout {...layoutProps} />;
      case 'fullpage':
        return <FullPageSurveyLayout {...layoutProps} />;
      case 'page-by-page':
      default:
        return <PageByPageLayout {...layoutProps} />;
    }
  };

  return (
    <div className={`${containerClass} ${themeConfig.background}`}>
      <SurveyFormProvider
        surveyData={survey}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onChange={onChange}
        onPageChange={onPageChange}
        enableDebug={enableDebug}
        language={language}
        theme={theme}
      >
        {renderLayout(enableDebug)}
      </SurveyFormProvider>
    </div>
  );
};

export default SurveyForm;
