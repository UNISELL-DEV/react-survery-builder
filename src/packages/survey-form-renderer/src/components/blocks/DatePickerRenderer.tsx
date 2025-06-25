import React, { useState, useEffect } from 'react';
import { themes } from '../../themes';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { format, formatDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { BlockData } from '../../types';

interface DatePickerRendererProps {
  block: BlockData;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: string;
}

// Map our format strings to date-fns format strings
const getDateFormat = (formatStr: string = 'PPP'): string => {
  // Map our format strings to date-fns format strings
  switch (formatStr) {
    case 'P': return 'MM/dd/yyyy';
    case 'PP': return 'MMM d, yyyy';
    case 'PPP':
    default: return 'MMMM d, yyyy';
  }
};

export const DatePickerRenderer: React.FC<DatePickerRendererProps> = ({
  block,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  theme = 'default'
}) => {
  const themeConfig = themes[theme as keyof typeof themes] || themes.default;

  // State for the selected date
  const [date, setDate] = useState<Date | null>(
    value ? new Date(value) : block.defaultValue ? new Date(block.defaultValue as string) : null
  );

  // State for the calendar open/closed status
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Update internal state when prop value changes
  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  // Handle date selection
  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);

    if (onChange) {
      onChange(selectedDate.toISOString());
    }

    if (onBlur) {
      onBlur();
    }

    setIsCalendarOpen(false);
  };

  // Handle input click to open calendar
  const handleInputClick = () => {
    if (!disabled && block.showCalendarOnFocus) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  // Parse disabled days from comma-separated string
  const disabledDays = React.useMemo(() => {
    if (!block.disabledDays) return undefined;

    try {
      return block.disabledDays.split(",").map((d: string) => parseInt(d.trim(), 10));
    } catch {
      return undefined;
    }
  }, [block.disabledDays]);

  // Create date range constraints
  const dateConstraints = React.useMemo(() => {
    const constraints: { min?: string; max?: string } = {};

    if (block.minDate) {
      constraints.min = block.minDate as string;
    }

    if (block.maxDate) {
      constraints.max = block.maxDate as string;
    }

    return constraints;
  }, [block.minDate, block.maxDate]);

  // Format date according to specified format
  const formattedDate = date
    ? formatDate(date, block.dateFormat as string || 'PPP')
    : '';

  return (
    <div className="survey-datepicker space-y-2">
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

      {/* Date picker using shadcn components */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={block.fieldName}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive",
              themeConfig.field.input
            )}
            disabled={disabled}
            onClick={() => setIsCalendarOpen(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, getDateFormat(block.dateFormat as string))
            ) : (
              <span>{block.placeholder || "Select a date"}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(newDate) => {
              if (newDate) {
                handleDateSelect(newDate);
              }
            }}
            disabled={(date: Date) => {
              // Check if date is within the min/max constraints
              if (dateConstraints.min && date < new Date(dateConstraints.min)) {
                return true;
              }
              if (dateConstraints.max && date > new Date(dateConstraints.max)) {
                return true;
              }

              // Check if day is in disabled days list
              if (disabledDays && disabledDays.includes(date.getDay())) {
                return true;
              }

              return false;
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Error message */}
      {error && (
        <div className={cn("text-sm font-medium text-destructive", themeConfig.field.error)}>
          {error}
        </div>
      )}
    </div>
  );
};
