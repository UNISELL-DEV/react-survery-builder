import React from 'react';
import { BlockRenderer } from './BlockRenderer';
import type { BlockRendererProps } from '../../types';
import { useSurveyForm } from '../../context/SurveyFormContext';

/**
 * Renderer for "set" block type
 * Sets are containers for other blocks
 */
export const SetRenderer: React.FC<BlockRendererProps> = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme,
}) => {
  const { goToNextPage, goToPreviousPage, isFirstPage, isLastPage } = useSurveyForm();

  // A set typically just renders its child items
  const items = block.items || [];

  return (
    <div className="set-container">
      {block.label && <h3 className="text-lg font-medium mb-3">{block.label}</h3>}
      {block.description && <p className="text-sm text-gray-500 mb-4">{block.description}</p>}

      <div className="set-items space-y-4">
        {items.map((childBlock, index) => (
          <BlockRenderer
            key={childBlock.uuid || `${block.uuid}-child-${index}`}
            block={childBlock}
            value={childBlock.fieldName ? value?.[childBlock.fieldName] : undefined}
            onChange={(newValue) => {
              if (childBlock.fieldName && onChange) {
                // Create a new object with the updated field
                const newValues = { ...(value || {}) };
                newValues[childBlock.fieldName] = newValue;
                onChange(newValues);
              }
            }}
            onBlur={onBlur}
            error={childBlock.fieldName && error ? error[childBlock.fieldName] : undefined}
            disabled={disabled}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};
