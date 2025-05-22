import React, { useState, useEffect, useRef } from 'react';
import { useSurveyForm } from '../../context/SurveyFormContext';
import { themes } from '../../themes';
import { calculateBMI } from '../../utils/conditionalUtils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface BMICalculatorRendererProps {
  block: {
    fieldName?: string;
    label?: string;
    description?: string;
    className?: string;
    heightUnit?: 'cm' | 'inches';
    weightUnit?: 'kg' | 'lbs';
  };
  value?: {
    height?: number;
    weight?: number;
    bmi?: number;
    category?: string;
  };
  onChange?: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: string;
}

/**
 * A specialized block for calculating BMI
 */
export const BMICalculatorRenderer: React.FC<BMICalculatorRendererProps> = ({
  block,
  value = {},
  onChange,
  onBlur,
  error,
  disabled = false,
  theme = 'default',
}) => {
  const { setValue } = useSurveyForm();
  const themeConfig = themes[theme] || themes.default;
  const initialRenderRef = useRef(true);
  const prevHeightRef = useRef(value.height || 170);
  const prevWeightRef = useRef(value.weight || 70);

  // Extract field name from block
  const fieldName = block.fieldName || 'bmiCalculator';

  // Local state for height and weight
  const [height, setHeight] = useState(value.height || 170);
  const [weight, setWeight] = useState(value.weight || 70);
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string } | null>(
    value.bmi && value.category
      ? { bmi: value.bmi, category: value.category }
      : null
  );

  // Calculate BMI on mount or when height/weight change significantly
  useEffect(() => {
    // Skip first render since we're just initializing
    if (initialRenderRef.current) {
      initialRenderRef.current = false;

      // If we don't have a result yet but have height and weight, calculate it
      if (!bmiResult && height > 0 && weight > 0) {
        const result = calculateBMI(weight, height);
        setBmiResult(result);
      }
      return;
    }

    // Check if height or weight changed significantly (to avoid minor adjustments causing loops)
    const heightChanged = Math.abs(prevHeightRef.current - height) >= 1;
    const weightChanged = Math.abs(prevWeightRef.current - weight) >= 1;

    if ((heightChanged || weightChanged) && height > 0 && weight > 0) {
      // Update previous values
      prevHeightRef.current = height;
      prevWeightRef.current = weight;

      // Calculate the BMI
      const result = calculateBMI(weight, height);
      setBmiResult(result);

      // Update the form value
      if (onChange) {
        const newValue = {
          height,
          weight,
          bmi: result.bmi,
          category: result.category
        };
        onChange(newValue);
      }
    }
  }, [height, weight, onChange, bmiResult]);

  // Handle height change
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
  };

  // Handle weight change
  const handleWeightChange = (newWeight: number) => {
    setWeight(newWeight);
  };

  // Get color based on BMI category
  const getBmiColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-500';
      case 'Normal weight':
        return 'text-green-500';
      case 'Overweight':
        return 'text-yellow-500';
      case 'Obese':
        return 'text-red-500';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className={cn("w-full", block.className)}>
      <CardHeader>
        {block.label && (
          <CardTitle className={themeConfig.field.label}>{block.label}</CardTitle>
        )}
        {block.description && (
          <p className={cn("text-sm text-muted-foreground", themeConfig.field.description)}>
            {block.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Height input */}
        <div className="space-y-2">
          <Label htmlFor={`${fieldName}-height`} className="text-sm font-medium">
            Height ({block.heightUnit || 'cm'})
          </Label>
          <div className="flex gap-4 items-center">
            <Slider
              id={`${fieldName}-height-slider`}
              min={120}
              max={220}
              step={1}
              value={[height]}
              onValueChange={(vals) => handleHeightChange(vals[0])}
              disabled={disabled}
              className="flex-1"
            />
            <Input
              id={`${fieldName}-height`}
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              onBlur={onBlur}
              disabled={disabled}
              className="w-20"
              min={120}
              max={220}
            />
          </div>
        </div>

        {/* Weight input */}
        <div className="space-y-2">
          <Label htmlFor={`${fieldName}-weight`} className="text-sm font-medium">
            Weight ({block.weightUnit || 'kg'})
          </Label>
          <div className="flex gap-4 items-center">
            <Slider
              id={`${fieldName}-weight-slider`}
              min={30}
              max={150}
              step={1}
              value={[weight]}
              onValueChange={(vals) => handleWeightChange(vals[0])}
              disabled={disabled}
              className="flex-1"
            />
            <Input
              id={`${fieldName}-weight`}
              type="number"
              value={weight}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
              onBlur={onBlur}
              disabled={disabled}
              className="w-20"
              min={30}
              max={150}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start bg-accent/50 p-4 rounded-b-lg">
        {bmiResult ? (
          <>
            <p className="text-sm font-medium">Your BMI Result:</p>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-xl font-bold">{bmiResult.bmi}</p>
              <p className={cn("font-medium", getBmiColor(bmiResult.category))}>
                {bmiResult.category}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Enter height and weight to calculate BMI</p>
        )}

        {error && (
          <p className={cn("text-sm text-destructive mt-2", themeConfig.field.error)}>
            {error}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default BMICalculatorRenderer;
