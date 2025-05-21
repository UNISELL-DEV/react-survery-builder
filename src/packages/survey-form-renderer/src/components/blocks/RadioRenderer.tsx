import React from 'react';
import { BlockData } from '@/lib/survey/types';
import { themes } from '../../themes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RadioRendererProps {
  block: BlockData;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: string;
}

export const RadioRenderer: React.FC<RadioRendererProps> = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = 'default'
}) => {
  const themeConfig = themes[theme] || themes.default;

  // Get labels and values arrays from the block
  const labels = block.labels || [];
  const values = block.values || labels.map((_, i) => i);

  // Handle radio button change
  const handleChange = (selectedValue: string | number) => {
    if (onChange) {
      onChange(selectedValue);
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className="survey-radio space-y-3">
      {/* Label */}
      {block.label && (
        <Label className={cn("text-base block", themeConfig.field.label)}>
          {block.label}
        </Label>
      )}

      {/* Description */}
      {block.description && (
        <div className={cn("text-sm text-muted-foreground", themeConfig.field.description)}>
          {block.description}
        </div>
      )}

      {/* Radio options */}
      <RadioGroup
        value={value?.toString()}
        onValueChange={(val) => {
          // Convert back to original type if needed
          const originalValue = values[labels.findIndex(
            (_, i) => values[i].toString() === val
          )];
          handleChange(originalValue);
        }}
        className="space-y-1 mt-2"
        disabled={disabled}
      >
        {labels.map((label, index) => {
          const optionValue = values[index];
          const id = `${block.fieldName}-${index}`;
          const stringValue = typeof optionValue === 'string'
            ? optionValue
            : optionValue.toString();

          return (
            <div key={id} className="flex items-center space-x-2">
              <RadioGroupItem
                id={id}
                value={stringValue}
                disabled={disabled}
                aria-invalid={!!error}
              />
              <Label
                htmlFor={id}
                className="text-sm font-normal cursor-pointer"
              >
                {label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {/* Error message */}
      {error && (
        <div className={cn("text-sm font-medium text-destructive", themeConfig.field.error)}>
          {error}
        </div>
      )}
    </div>
  );
};
