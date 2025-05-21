import React, { forwardRef } from 'react';
import type { BlockRendererProps } from '../../types';
import { TextInputRenderer } from './TextInputRenderer';
import { TextareaRenderer } from './TextareaRenderer';
import { RadioRenderer } from './RadioRenderer';
import { CheckboxRenderer } from './CheckboxRenderer';
import { SelectRenderer } from './SelectRenderer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { HtmlRenderer } from './HtmlRenderer';
import { RangeRenderer } from './RangeRenderer';
import { DatePickerRenderer } from './DatePickerRenderer';
import { FileUploadRenderer } from './FileUploadRenderer';
import { MatrixRenderer } from './MatrixRenderer';
import { SelectableBoxRenderer } from './SelectableBoxRenderer'
import { ScriptRenderer } from './ScriptRenderer';
import { SetRenderer } from './SetRenderer';
import { themes } from '../../themes';
import { blockTypeMap, validateBlock } from '../../utils/blockAdapter';

/**
 * A component that renders different types of blocks based on their type
 */
export const BlockRenderer = forwardRef<HTMLInputElement, BlockRendererProps>((props, ref) => {
  const { block, value, onChange, onBlur, error, disabled, customComponents, theme = 'default' } = props;
  const themeConfig = themes[theme] || themes.default;

  // Common props for all renderers
  const commonProps = {
    value,
    onChange,
    onBlur,
    error: error || validateBlock(block), // Use the validation from the original block
    disabled,
    ref,
    theme
  };

  // If there's a custom component for this block type, use it
  if (customComponents && customComponents[block.type]) {
    const CustomComponent = customComponents[block.type];
    return <CustomComponent {...props} />;
  }

  // Check if we have a built-in renderer for this block type
  // We're now using the blockTypeMap to check if the block type exists
  if (!blockTypeMap[block.type]) {
    // For any unhandled types, render a placeholder
    return (
      <div className="p-4 border border-gray-300 rounded">
        <p className="text-sm text-gray-500">
          Unknown block type: {block.type}
        </p>
      </div>
    );
  }

  // Render the appropriate component based on block type
  switch (block.type) {
    case 'textfield':
      return <TextInputRenderer block={block} {...commonProps} />;
    case 'textarea':
      return <TextareaRenderer block={block} {...commonProps} />;
    case 'radio':
      return <RadioRenderer block={block} {...commonProps} />;
    case 'checkbox':
      return <CheckboxRenderer block={block} {...commonProps} />;
    case 'select':
      return <SelectRenderer block={block} {...commonProps} />;
    case 'range':
      return <RangeRenderer block={block} {...commonProps} />;
    case 'datepicker':
      return <DatePickerRenderer block={block} {...commonProps} />;
    case 'fileupload':
      return <FileUploadRenderer block={block} {...commonProps} />;
    case 'matrix':
      return <MatrixRenderer block={block} {...commonProps} />;
    case 'selectablebox':
      return <SelectableBoxRenderer block={block} {...commonProps} />;      
    case 'markdown':
      return <MarkdownRenderer block={block} {...commonProps} />;
    case 'html':
      return <HtmlRenderer block={block} {...commonProps} />;
    case 'script':
      return <ScriptRenderer block={block} theme={theme} />;
    case 'set':
      return <SetRenderer block={block} {...commonProps} />;
    default:
      // For any unhandled types with a definition, render a generic component
      return (
        <div className="p-4 border border-gray-300 rounded">
          <p className="font-medium mb-1">{block.label || block.name || block.type}</p>
          {block.description && <p className="text-sm text-gray-500 mb-2">{block.description}</p>}
          <p className="text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
            Renderer not implemented for block type: {block.type}
          </p>
        </div>
      );
  }
});

BlockRenderer.displayName = 'BlockRenderer';
