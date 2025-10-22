import React from "react";
import { Calculator } from "lucide-react";

import type {
  BlockDefinition,
  ContentBlockItemProps,
  BlockRendererProps,
  BlockData,
} from "@/packages/survey-form-package/src/types";

import { Input } from "@/packages/survey-form-package/src/components/ui/input";
import { Label } from "@/packages/survey-form-package/src/components/ui/label";
import { Card } from "@/packages/survey-form-package/src/components/ui/card";
import { cn } from "@/packages/survey-form-package/src/lib/utils";
import { themes } from "@/packages/survey-form-package/src/themes";
import { useSurveyForm } from "@/packages/survey-form-package/src/context/SurveyFormContext";

// ============================================================================
// HELPER UTILITIES
// ============================================================================

const bmiCategories = {
  Underweight: {
    description: "Your BMI is in the underweight range. This may indicate potential health risks. We recommend consulting with a healthcare provider.",
  },
  Healthy: {
    description: "Your BMI is in the healthy range. Keep up the great work with your lifestyle habits!",
  },
  Overweight: {
    description: "Your BMI is in the overweight range. This may increase the risk of certain health conditions. Our program can help you reach a healthier weight.",
  },
  Obese: {
    description: "Your BMI is in the obese range, which can significantly increase health risks. Our medical team can create a personalized plan for you.",
  },
};

const calculateBMI = (feet: number, inches: number, weight: number) => {
  const totalInches = (feet * 12) + inches;
  const heightMeters = totalInches * 0.0254;
  const weightKg = weight * 0.453592;
  
  if (heightMeters === 0) return null;

  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  let category: keyof typeof bmiCategories;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Healthy";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi, category, description: bmiCategories[category].description };
};

// Simple progress bar component (no SVG)
const BMIProgressBars: React.FC<{ bmi: number, category: string }> = ({ bmi, category }) => {
  const categories = ["Underweight", "Healthy", "Overweight", "Obese"];
  
  const getRange = (cat: string) => {
    switch (cat) {
      case "Underweight": return "< 18.5";
      case "Healthy": return "18.5 - 24.9";
      case "Overweight": return "25.0 - 29.9";
      case "Obese": return "> 30.0";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-4 gap-1.5">
        {categories.map((cat) => (
          <div
            key={cat}
            className={cn(
              "h-2 rounded-full",
              category === cat ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-xs">
        {categories.map((cat) => (
          <span key={cat} className={cn(
            "text-center",
             category === cat ? "font-bold text-white" : "text-white/70"
          )}>
            {getRange(cat)}
          </span>
        ))}
      </div>
    </div>
  );
};


// ============================================================================
// BLOCK IMPLEMENTATION
// ============================================================================

// Builder Form Component
const BMI2CalculatorBlockForm: React.FC<ContentBlockItemProps> = ({ data, onUpdate }) => {
  const handle = (field: string, value: any) => onUpdate?.({ ...data, [field]: value });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fieldName">Field Name</Label>
        <Input
          id="fieldName"
          value={data.fieldName || ""}
          onChange={(e) => handle("fieldName", e.target.value)}
          placeholder="BMI2Calculator"
        />
        <p className="text-xs text-muted-foreground">Unique identifier for this block.</p>
      </div>
       <div className="space-y-2">
        <Label htmlFor="title">Title (h2)</Label>
        <Input
          id="title"
          value={data.title || ""}
          onChange={(e) => handle("title", e.target.value)}
          placeholder="Let's calculate your BMI."
        />
      </div>
       <div className="space-y-2">
        <Label htmlFor="description">Description (p)</Label>
        <Input
          id="description"
          value={data.description || ""}
          onChange={(e) => handle("description", e.target.value)}
          placeholder="Body Mass Index (BMI) helps determine..."
        />
      </div>
       <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="feetLabel">Feet Label</Label>
            <Input id="feetLabel" value={data.feetLabel || ""} onChange={(e) => handle("feetLabel", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inchesLabel">Inches Label</Label>
            <Input id="inchesLabel" value={data.inchesLabel || ""} onChange={(e) => handle("inchesLabel", e.target.value)} />
          </div>
       </div>
       <div className="space-y-2">
        <Label htmlFor="weightLabel">Weight Label</Label>
        <Input id="weightLabel" value={data.weightLabel || ""} onChange={(e) => handle("weightLabel", e.target.value)} />
      </div>
    </div>
  );
};

// Builder Item Preview
const BMI2CalculatorBlockItem: React.FC<ContentBlockItemProps> = ({ data }) => {
  return (
    <Card className="p-4 space-y-3">
      <h2 className="text-center text-lg font-semibold">{data.title || "Let's calculate your BMI."}</h2>
      <p className="text-center text-sm text-muted-foreground">{data.description || "Body Mass Index (BMI) helps determine..."}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-1">
            <Label>{data.feetLabel || "Height (feet)"}</Label>
            <Input disabled placeholder="5" />
        </div>
        <div className="space-y-1">
            <Label>{data.inchesLabel || "Height (inches)"}</Label>
            <Input disabled placeholder="4" />
        </div>
        <div className="space-y-1 col-span-2">
            <Label>{data.weightLabel || "Weight (lbs)"}</Label>
            <Input disabled placeholder="200" />
        </div>
      </div>
      <div className="p-4 bg-primary/10 rounded-lg">
        <p className="text-sm text-center text-primary">BMI Result will be shown here</p>
      </div>
    </Card>
  );
};

// Builder Palette Preview
const BMI2CalculatorBlockPreview: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-1">
      <div className="w-4/5 border rounded-md p-2 text-xs text-muted-foreground bg-muted/30">
        BMI Calculator
      </div>
    </div>
  );
};

// Renderer Component
const BMI2CalculatorRenderer = React.forwardRef<HTMLDivElement, BlockRendererProps>(
  ({ block, theme, error }, ref) => {
  
  const themeConfig = theme ?? themes.default;
  const { values, setValue } = useSurveyForm();

  const feet = values.feet;
  const inches = values.inches;
  const weight = values.weight;

  const bmiResult = React.useMemo(() => {
    const hf = Number(feet);
    const hi = Number(inches);
    const w = Number(weight);
    return hf > 0 && w > 0 ? calculateBMI(hf, hi, w) : null;
  }, [feet, inches, weight]);
  
  // Helper to handle input changes
  const handleInputChange = (field: 'feet' | 'inches' | 'weight', value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setValue(field, numericValue);
  };

    return (
      <div className="w-full min-w-0 max-w-2xl mx-auto" ref={ref}>
        <h2 className="mb-2 text-center text-[2rem] -tracking-[4%] leading-[32px]">
            {block.title}
        </h2>
        <p className={cn("mb-4 sm:mb-8 text-center", themeConfig.field.description)}>
            {block.description}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8">
            <div className="space-y-1.5">
                <Label htmlFor="feet" className={cn(themeConfig.field.label)}>
                    {block.feetLabel}
                </Label>
                <Input
                  id="feet"
                  name="feet"
                  placeholder="5"
                  type="number"
                  value={values.feet || ""}
                  onChange={(e) => handleInputChange('feet', e.target.value)}
                  className={cn(themeConfig.field.input)}
                />
            </div>

            <div className="space-y-1.5">
                 <Label htmlFor="inches" className={cn(themeConfig.field.label)}>
                    {block.inchesLabel}
                </Label>
                <Input
                  id="inches"
                  name="inches"
                  placeholder="4"
                  type="number"
                  value={values.inches || ""}
                  onChange={(e) => handleInputChange('inches', e.target.value)}
                  className={cn(themeConfig.field.input)}
                />
            </div>

            <div className="space-y-1.5 col-span-2">
                 <Label htmlFor="weight" className={cn(themeConfig.field.label)}>
                    {block.weightLabel}
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  placeholder="200"
                  type="number"
                  value={values.weight || ""}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={cn(themeConfig.field.input)}
                />
            </div>
        </div>

        {/* Display Error from validation */}
        {error && (
            <div className={cn("text-sm font-medium mt-2 text-center", themeConfig.field.error)}>
                {error}
            </div>
        )}

        {/* Display BMI Result */}
        {bmiResult && (
            <div className="mt-8 bg-white rounded-lg w-full border border-gray-200 shadow-sm">
                <div className="flex flex-col gap-4 p-5 rounded-t-lg text-white" style={{backgroundColor: themeConfig.colors.primary}}>
                    <div className="flex items-center justify-between">
                    <span className="font-medium">Your BMI</span>
                    <span className="text-xl font-bold">{bmiResult.bmi}</span>
                    </div>
                    <BMIProgressBars
                        bmi={bmiResult.bmi}
                        category={bmiResult.category}
                    />
                </div>

                <div className="p-5 flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                    <span className="font-semibold">{bmiResult.category}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                    {bmiResult.description}
                    </p>
                </div>
            </div>
        )}
      </div>
    );
  }
);

BMI2CalculatorRenderer.displayName = "BMI2CalculatorRenderer";

// Export the Block Definition
export const BMI2CalculatorBlock: BlockDefinition = {
  type: "BMI2Calculator",
  name: "BMI2 Calculator",
  description: "Calculates BMI from height and weight inputs.",
  icon: <Calculator className="w-4 h-4" />,
  defaultData: {
    type: "BMI2Calculator",
    fieldName: "BMI2Calculator",
    title: "Let's calculate your BMI.",
    description: "Body Mass Index (BMI) helps determine eligibility for weight loss medication and assess weight-related health risks.",
    feetLabel: "Height (feet)",
    inchesLabel: "Height (inches)",
    weightLabel: "Weight (lbs)",
    required: true,
  },
  renderItem: (props) => <BMI2CalculatorBlockItem {...props} />,
  renderFormFields: (props) => <BMI2CalculatorBlockForm {...props} />,
  renderPreview: () => <BMI2CalculatorBlockPreview />,
  renderBlock: (props) => <BMI2CalculatorRenderer {...props} />,
  validate: (data: BlockData) => {
    if (!data.fieldName) return "Field name is required";
    return null;
  },
  validateValue: (value: any, data: BlockData) => {
    // This block's value is composite, so we validate the dependent fields
    if (data.required) {
        if (!data.feet) return `${data.feetLabel || 'Feet'} is required.`;
        if (!data.weight) return `${data.weightLabel || 'Weight'} is required.`;
        
        const hf = Number(data.feet);
        const w = Number(data.weight);
        if (hf <= 0) return `Please enter a valid height.`;
        if (w <= 0) return `Please enter a valid weight.`;
    }
    return null;
  },
};