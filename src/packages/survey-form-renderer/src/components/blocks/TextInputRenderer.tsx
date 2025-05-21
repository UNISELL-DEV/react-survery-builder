import React, { forwardRef } from 'react';
import { BlockData } from '@/lib/survey/types';
import { themes } from '../../themes';
import { getLocalized } from '../../utils/surveyUtils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextInputRendererProps {
  block: BlockData;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: string;
}

export const TextInputRenderer = forwardRef<HTMLInputElement, TextInputRendererProps>(
  ({ block, value, onChange, onBlur, error, disabled, theme = 'default' }, ref) => {
    const themeConfig = themes[theme] || themes.default;

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="survey-text-input space-y-2">
        {/* Label */}
        {block.label && (
          <Label
            htmlFor={block.fieldName}
            className={cn("text-base", themeConfig.field.label)}
          >
            {block.label}
          </Label>
        )}

        {/* Description */}
        {block.description && (
          <div className={cn("text-sm text-muted-foreground", themeConfig.field.description)}>
            {block.description}
          </div>
        )}

        {/* Input field */}
        <Input
          id={block.fieldName}
          name={block.fieldName}
          type="text"
          value={value || ''}
          placeholder={block.placeholder}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          ref={ref}
          className={cn(error && "border-destructive", themeConfig.field.input)}
          aria-invalid={!!error}
        />

        {/* Error message */}
        {error && (
          <div className={cn("text-sm font-medium text-destructive", themeConfig.field.error)}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

TextInputRenderer.displayName = 'TextInputRenderer';
