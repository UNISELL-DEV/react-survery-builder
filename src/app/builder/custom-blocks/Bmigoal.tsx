import React, { forwardRef, useEffect, useState } from "react"
import { Target } from "lucide-react"

import type {
  BlockDefinition,
  ContentBlockItemProps,
  BlockRendererProps,
  BlockData,
} from "@/packages/survey-form-package/src/types"

import { themes } from "@/packages/survey-form-package/src/themes"
import { useSurveyForm } from "@/packages/survey-form-package/src/context/SurveyFormContext"
import { Input } from "@/packages/survey-form-package/src/components/ui/input"
import { Label } from "@/packages/survey-form-package/src/components/ui/label"
import { Card } from "@/packages/survey-form-package/src/components/ui/card"
import { cn } from "@/packages/survey-form-package/src/lib/utils"
import { useSurveyBuilder } from "@/packages/survey-form-package/src/context/SurveyBuilderContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/packages/survey-form-package/src/components/ui/select"

// ============================================================================
// BLOCK IMPLEMENTATION
// ============================================================================

// Helper function to safely access nested object properties using dot notation
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// Builder Form Component (for customizing block properties)
const GoalWeightBlockForm: React.FC<ContentBlockItemProps> = ({
  data,
  onUpdate,
}) => {
  const handle = (field: string, value: any) =>
    onUpdate?.({ ...data, [field]: value })
  
  const { getAvailableFieldsBefore} = useSurveyBuilder();

  const intakeFields = React.useMemo(() => {
    const currentBlockId = data.uuid || data.fieldName;
    return getAvailableFieldsBefore(currentBlockId)
  }, [data.uuid, data.fieldName, getAvailableFieldsBefore]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fieldName">Field Name</Label>
        <Input
          id="fieldName"
          value={data.fieldName || ""}
          onChange={(e) => handle("fieldName", e.target.value)}
          placeholder="goalWeight"
        />
        <p className="text-xs text-muted-foreground">
          Unique identifier for storing responses
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bmiKey">BMI Value Key</Label>
          <Select
            value={data.bmiKey || ""}
            onValueChange={(val) => handle("bmiKey", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="BMI Key" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto z-50" side="bottom" align="start" sideOffset={5}>
              {intakeFields.map((name) => (
                <SelectItem key={name} value={name} className="pl-2">
                  <span className="text-sm">{name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        <p className="text-xs text-muted-foreground">
          Path to BMI value in survey context (e.g., "bmi.bmi")
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="label">Input Label</Label>
        <Input
          id="label"
          value={data.label || ""}
          onChange={(e) => handle("label", e.target.value)}
          placeholder="Your goal weight (lbs)"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="placeholder">Input Placeholder</Label>
        <Input
          id="placeholder"
          value={data.placeholder || ""}
          onChange={(e) => handle("placeholder", e.target.value)}
          placeholder="150"
        />
      </div>
    </div>
  )
}

// Builder Item Preview (shown in the builder canvas)
const GoalWeightBlockItem: React.FC<ContentBlockItemProps> = ({ data }) => {
  return (
    <Card className="space-y-3 p-4 text-center">
      <p className="text-sm text-gray-600">
        Perfect! With a BMI of 32.92, we can continue.
      </p>
      <h2 className="text-lg font-bold">We're in this together.</h2>
      <h3 className="text-md font-semibold text-purple-600">
        Your goal is our goal.
      </h3>
      <h4 className="text-lg font-bold">What is your goal weight?</h4>
      <div className="text-left pt-4">
        <Label>{data.label || "Your goal weight (lbs)"}</Label>
        <Input
          disabled
          placeholder={data.placeholder || "150"}
          className="mt-1"
        />
      </div>
    </Card>
  )
}

// Builder Palette Preview (shown in the blocks palette)
const GoalWeightBlockPreview: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-1">
      <div className="w-4/5 border rounded-md p-2 text-xs text-muted-foreground bg-muted/30">
        Goal Weight
      </div>
    </div>
  )
}

// Renderer Component (shown to end users filling the form)
const GoalWeightRenderer = forwardRef<HTMLInputElement, BlockRendererProps>(
  ({ block, value, onChange, onBlur, error, disabled, theme }, ref) => {
    const themeConfig = theme ?? themes.default
    const { values, customData } = useSurveyForm()

    console.log(customData)

    // Use the configured BMI key or default to "bmi.bmi"
    const bmiKey = block.bmiKey || "bmi.bmi"
    const bmiValue = getNestedValue(values, bmiKey)

    const [bmi, setBMI] = useState<number>(
      bmiValue
        ? parseFloat(parseFloat(bmiValue).toFixed(2))
        : 32.92
    )

    useEffect(() => {
      const currentBmiValue = getNestedValue(values, bmiKey) ?? 32.92

      if (currentBmiValue) {
        setBMI(parseFloat(parseFloat(currentBmiValue).toFixed(2)))
      }
    }, [values, bmiKey])

    return (
      <div className="w-full max-w-lg relative mx-auto">
        <p className={cn("mb-4", themeConfig.description)}>
          Perfect! With a BMI of {bmi}, we can continue.
        </p>

        <h2 className={cn("mb-2", themeConfig.title)}>
          We're in this together.
        </h2>

        <h3
          className={cn("mb-6 sm:mb-10", themeConfig.title)}
          style={{
            background: `linear-gradient(to right, ${themeConfig.colors.secondary}, ${themeConfig.colors.primary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Your goal is our goal.
        </h3>

        <h4 className={cn("mb-4 sm:mb-8", themeConfig.title)}>
          What is your goal weight?
        </h4>

        <div className="relative w-full max-w-lg mx-auto">
          <Label
            htmlFor={block.fieldName}
            className={cn(themeConfig.field.label, "mb-2")}
          >
            {block.label}
          </Label>
          <Input
            id={block.fieldName}
            ref={ref}
            type="number"
            inputMode="numeric"
            name={block.fieldName}
            placeholder={block.placeholder}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            min="80"
            max="500"
            className={cn(
              "transition-colors",
              error && "border-destructive",
              themeConfig.field.input
            )}
            aria-invalid={!!error}
          />
          {error && (
            <div
              className={cn(
                "text-sm font-medium mt-2",
                themeConfig.field.error
              )}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }
)

GoalWeightRenderer.displayName = "GoalWeightRenderer"

// Export the Block Definition
export const GoalWeightBlock: BlockDefinition = {
  type: "goalWeight",
  name: "Goal Weight",
  description: "A goal weight input field with dynamic BMI display.",
  icon: <Target className="w-4 h-4" />,
  defaultData: {
    type: "goalWeight",
    fieldName: "goalWeight",
    bmiKey: "bmi.bmi",
    label: "Your goal weight (lbs)",
    placeholder: "150",
    required: true,
    isCustom: true,
  },
  renderItem: (props) => <GoalWeightBlockItem {...props} />,
  renderFormFields: (props) => <GoalWeightBlockForm {...props} />,
  renderPreview: () => <GoalWeightBlockPreview />,
  renderBlock: (props) => <GoalWeightRenderer {...props} />,
  validate: (data: BlockData) => {
    if (!data.fieldName) return "Field name is required"
    return null
  },
  validateValue: (value: any, data: BlockData) => {
    if (data.required && !value) return "Goal weight is required"
    // if (value) {
    //   const weight = parseInt(value, 10)
    //   if (isNaN(weight) || weight < 80 || weight > 500) {
    //     return "Please enter a valid weight between 80 and 500 lbs"
    //   }
    // }
    return null
  },
  // Output schema - this block returns a simple number value
  outputSchema: {
    type: 'number'
  },
}