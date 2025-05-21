import React, { useState, useEffect } from 'react';
import { BlockData } from '@/lib/survey/types';
import { themes } from '../../themes';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RangeRendererProps {
  block: BlockData;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: string;
}

export const RangeRenderer: React.FC<RangeRendererProps> = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = 'default'
}) => {
  const themeConfig = themes[theme] || themes.default;

  // Parse block configuration
  const min = parseInt(String(block.min || "0"), 10);
  const max = parseInt(String(block.max || "100"), 10);
  const step = parseInt(String(block.step || "1"), 10);
  const markStep = parseInt(String(block.markStep || "0"), 10);

  // Set initial value from props or use default
  const [currentValue, setCurrentValue] = useState<number>(
    value !== undefined
      ? Number(value)
      : block.defaultValue !== undefined
        ? Number(block.defaultValue)
        : min
  );

  // Update internal state when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(Number(value));
    }
  }, [value]);

  // Handle slider change
  const handleChange = (values: number[]) => {
    if (values.length > 0) {
      const newValue = values[0];
      setCurrentValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    }
  };

  // Handle blur event for validation
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  // Format the value display if specified in the block
  const valueDisplay = block.showValue
    ? block.showValue.replace("{value}", String(currentValue))
    : `Value: ${currentValue}`;

  // Generate marks if specified
  const marks: React.ReactNode[] = [];
  if (markStep > 0) {
    for (let i = min; i <= max; i += markStep) {
      const percentage = ((i - min) / (max - min)) * 100;
      marks.push(
        <div
          key={i}
          className="absolute text-xs -translate-x-1/2"
          style={{ left: `${percentage}%`, top: "20px" }}
        >
          {i}
        </div>
      );
    }
  }

  return (
    <div className="survey-range space-y-4">
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

      {/* Range slider */}
      <div className="pt-4 px-2">
        <Slider
          id={block.fieldName}
          min={min}
          max={max}
          step={step}
          value={[currentValue]}
          onValueChange={handleChange}
          onValueCommit={() => { if (onBlur) onBlur(); }}
          disabled={disabled}
          className={cn(error && "border-destructive", themeConfig.field.range)}
          aria-invalid={!!error}
        />

        {/* Marks */}
        {marks.length > 0 && (
          <div className="relative h-6 mt-1">
            {marks}
          </div>
        )}

        {/* Value display */}
        <div className="flex justify-between mt-3 text-sm">
          <span className={cn("text-muted-foreground", themeConfig.field.text)}>{min}</span>
          <span className={cn("font-medium", themeConfig.field.activeText)}>
            {valueDisplay}
          </span>
          <span className={cn("text-muted-foreground", themeConfig.field.text)}>{max}</span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className={cn("text-sm font-medium text-destructive", themeConfig.field.error)}>
          {error}
        </div>
      )}
    </div>
  );
};
