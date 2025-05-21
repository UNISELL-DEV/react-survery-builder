import React, { useState, useEffect } from 'react';
import { BlockData } from '@/lib/survey/types';
import { themes } from '../../themes';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BoxOption {
  id: string;
  label: string;
  value: string;
}

interface SelectableBoxRendererProps {
  block: BlockData;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: string;
}

export const SelectableBoxRenderer: React.FC<SelectableBoxRendererProps> = ({
  block,
  value = '',
  onChange,
  onBlur,
  error,
  disabled,
  theme = 'default'
}) => {
  const themeConfig = themes[theme] || themes.default;
  
  // Parse options from block
  const options: BoxOption[] = block.options || [];
  const boxSpacing = block.boxSpacing || "4";
  const showSelectionIndicator = block.showSelectionIndicator !== false;
  
  // Track selected value
  const [selectedValue, setSelectedValue] = useState<string>(value || '');
  
  // Update local state when props change
  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);
  
  // Handle option selection
  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    
    if (onChange) {
      onChange(optionValue);
    }
    
    if (onBlur) {
      onBlur();
    }
  };
  
  return (
    <div className="survey-box-question space-y-4">
      {/* Question Title */}
      {block.questionTitle && (
        <Label
          className={cn("text-lg font-bold block", themeConfig.field.label)}
        >
          {block.questionTitle}
        </Label>
      )}
      
      {/* Description */}
      {block.description && (
        <div className={cn("text-sm text-muted-foreground", themeConfig.field.description)}>
          {block.description}
        </div>
      )}
      
      {/* Selectable Boxes */}
      <RadioGroup 
        value={selectedValue} 
        onValueChange={handleSelect}
        disabled={disabled}
        className={`space-y-${boxSpacing}`}
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const id = `${block.fieldName}-${option.id}`;
          
          return (
            <div key={option.id} className="relative">
              <RadioGroupItem 
                value={option.value} 
                id={id}
                className="sr-only"
                aria-invalid={!!error}
              />
              <Label 
                htmlFor={id} 
                className={cn(
                  "block w-full cursor-pointer",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <Card 
                  className={`p-4 transition-colors ${
                    isSelected 
                      ? "border-primary bg-primary/5 dark:bg-primary/20" 
                      : "hover:bg-accent dark:hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("text-foreground", themeConfig.field.text)}>
                      {option.label}
                    </span>
                    {isSelected && showSelectionIndicator && (
                      <div className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
                        themeConfig.container.activeIndicator
                      )}>
                        <CheckSquare className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </Card>
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