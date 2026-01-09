import React, { useState, useEffect } from "react"
import { Activity, Calculator, Ruler, Weight } from "lucide-react"

import type {
  BlockDefinition,
  ContentBlockItemProps,
  BlockRendererProps,
  BlockData,
  ChatRendererProps,
} from "@/packages/survey-form-package/src/types"

import { Input } from "@/packages/survey-form-package/src/components/ui/input"
import { Label } from "@/packages/survey-form-package/src/components/ui/label"
import { Card } from "@/packages/survey-form-package/src/components/ui/card"
import { cn } from "@/packages/survey-form-package/src/lib/utils"
import { themes } from "@/packages/survey-form-package/src/themes"
import { useSurveyForm } from "@/packages/survey-form-package/src/context/SurveyFormContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/packages/survey-form-package/src/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/packages/survey-form-package/src/components/ui/select"

// ============================================================================
// HELPER UTILITIES
// ============================================================================

const calculateBMI = (feet: number, inches: number, weight: number) => {
  const totalInches = feet * 12 + (inches || 0)
  const heightMeters = totalInches * 0.0254
  const weightKg = weight * 0.453592

  if (heightMeters === 0 || weightKg === 0) return null

  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1))

  return bmi
}

const R = 170 // Radius from the SVG path 'A 170 170...'
const circumference = Math.PI * R // Half circle circumference
const maxBMI = 50

const BMIChart = ({
  bmi,
  primaryColor,
  secondaryColor,
}: {
  bmi?: number
  primaryColor: string
  secondaryColor: string
}) => {
  // We only need one state: the final offset.
  // Initialize it to the full circumference (which means 0% progress).
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference)

  // This single effect runs whenever 'bmi' changes.
  useEffect(() => {
    // 1. Calculate the progress percentage (0-100)
    const progressPercent = Math.min((bmi || 0) / maxBMI, 1)

    // 2. Calculate the new offset based on the progress
    // We subtract the progress from the total circumference
    const newOffset = circumference - circumference * progressPercent

    // 3. Set the new offset. The CSS transition will handle the animation.
    setStrokeDashoffset(newOffset)
  }, [bmi]) // <-- The dependency is [bmi]

  return (
    <div className="relative w-[200px] h-[100px] sm:w-[400px] sm:h-[200px] flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 420 210"
        fill="none"
        className="block"
      >
        {/* Background Path */}
        <path
          d="M 30 190
          A 170 170 0 0 1 370 190"
          stroke="#FFFFFF"
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
          style={{
            WebkitFilter: "drop-shadow(0px 4px 15.7px rgba(28, 28, 28, 0.05))",
            filter: "drop-shadow(0px 4px 15.7px rgba(28, 28, 28, 0.05))",
          }}
        />
        <defs>
          <linearGradient
            id="bmi-gradient"
            x1="30"
            y1="190"
            x2="370"
            y2="190"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={primaryColor} />
            <stop offset="1" stopColor={secondaryColor} />
          </linearGradient>
        </defs>

        {/* Foreground (Animated) Path */}
        <path
          d="M 30 190
          A 170 170 0 0 1 370 190"
          stroke="url(#bmi-gradient)"
          strokeWidth={22}
          strokeLinecap="round"
          fill="none"
          className="shadow-[0_4px_16px_rgba(28,28,28,0.05)]"
          // strokeDasharray is constant, no need for state
          strokeDasharray={circumference}
          // strokeDashoffset is updated from our state
          strokeDashoffset={strokeDashoffset}
          style={{
            // This transition will animate the change in strokeDashoffset
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            transformOrigin: "center",
            WebkitFilter: "drop-shadow(0px 4px 15.7px rgba(28, 28, 28, 0.05))",
            filter: "drop-shadow(0px 4px 15.7px rgba(28, 28, 28, 0.05))",
          }}
        />
      </svg>

      {/* Centered BMI Info */}
      <div className="absolute left-0 bottom-0 w-full h-full flex flex-col items-center justify-end pointer-events-none">
        <h4 className="title sm:mb-2 text-[1rem] sm:text-[1.5rem] leading-[28px] sm:leading-[32px] -tracking-[1%] text-center text-foreground font-normal">
          Your BMI
        </h4>
        <div
          className="text-3xl sm:text-5xl font-medium text-foreground"
          style={{ fontFamily: '"DM Sans", "Manrope", sans-serif' }}
        >
          {bmi?.toFixed(1) || 0}
        </div>
      </div>
    </div>
  )
}

export default BMIChart

// ============================================================================
// BLOCK IMPLEMENTATION
// ============================================================================

// Builder Form Component
const BMI3CalculatorBlockForm: React.FC<ContentBlockItemProps> = ({
  data,
  onUpdate,
}) => {
  const handle = (field: string, value: any) =>
    onUpdate?.({ ...data, [field]: value })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title (h2)</Label>
        <Input
          id="title"
          value={data.title || ""}
          onChange={(e) => handle("title", e.target.value)}
          placeholder="Let's calculate"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title Highlight (h2)</Label>
        <Input
          id="title"
          value={data.titleHighlight || ""}
          onChange={(e) => handle("titleHighlight", e.target.value)}
          placeholder="your BMI."
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
          <Input
            id="feetLabel"
            value={data.feetLabel || ""}
            onChange={(e) => handle("feetLabel", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inchesLabel">Inches Label</Label>
          <Input
            id="inchesLabel"
            value={data.inchesLabel || ""}
            onChange={(e) => handle("inchesLabel", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="weightLabel">Weight Label</Label>
        <Input
          id="weightLabel"
          value={data.weightLabel || ""}
          onChange={(e) => handle("weightLabel", e.target.value)}
        />
      </div>
    </div>
  )
}

// Builder Item Preview
const BMI3CalculatorBlockItem: React.FC<ContentBlockItemProps> = ({ data }) => {
  return (
    <Card className="p-4 space-y-3">
      <h2 className="text-center text-lg font-semibold">
        {data.title || "Let's calculate your BMI."}
      </h2>
      <p className="text-center text-sm text-muted-foreground">
        {data.description || "Body Mass Index (BMI) helps determine..."}
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div className="space-y-1">
          <Label>{data.feetLabel || "Feet"}</Label>
          <Input disabled placeholder="5" />
        </div>
        <div className="space-y-1">
          <Label>{data.inchesLabel || "Inches"}</Label>
          <Input disabled placeholder="4" />
        </div>
        <div className="space-y-1 col-span-2">
          <Label>{data.weightLabel || "Weight (lbs)"}</Label>
          <Input disabled placeholder="200" />
        </div>
      </div>
      <div className="p-4 bg-primary/10 rounded-lg">
        <p className="text-sm text-center text-primary">
          BMI Result will be shown here
        </p>
      </div>
    </Card>
  )
}

// Builder Palette Preview
const BMI3CalculatorBlockPreview: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-1">
      <div className="w-4/5 border rounded-md p-2 text-xs text-muted-foreground bg-muted/30">
        BMI Calculator (Speedometer style)
      </div>
    </div>
  )
}

// Renderer Component
const BMI3CalculatorRenderer = React.forwardRef<
  HTMLDivElement,
  BlockRendererProps
>(({ block, theme, onChange, error }, ref) => {
  const themeConfig = theme ?? themes.default
  const { values } = useSurveyForm()

  const [hasInteracted, setHasInteracted] = useState(false)

  const [bmiValues, setBMIValues] = useState({
    feet: values?.bmi?.feet ? values?.bmi?.feet : 5,
    inches: values?.bmi?.inches ? values?.bmi?.inches : null,
    weight: values?.bmi?.weight ? values?.bmi?.weight : null,
    bmi: values?.bmi?.bmi ? values?.bmi?.bmi : null,
  })

  const bmiResult = React.useMemo(() => {
    const hf = Number(bmiValues.feet) || 0
    const hi = Number(bmiValues.inches) || 0
    const w = Number(bmiValues.weight) || 0
    return hf > 0 && w > 0 ? calculateBMI(hf, hi, w) : null
  }, [bmiValues])

  const updateBMIValues = (key: any, value: any) => {
    setHasInteracted(true)

    let data = { ...bmiValues, [key]: value }

    setBMIValues(data)
    onChange(data)
  }

  // Update BMI result when BMI change
  useEffect(() => {
    if (bmiResult) {
      let data = { ...bmiValues, bmi: bmiResult }
      onChange(data)
    }
  }, [bmiResult])

  return (
    <div
      className="relative w-full max-w-2xl flex flex-col gap-8 sm:gap-10 items-center min-h-[70svh] mx-auto"
      ref={ref}
    >
      <div>
        <h2 className={cn("mb-2", themeConfig.title)}>
          {block.title}{" "}
          <span
            style={{
              background: `linear-gradient(to right, ${themeConfig.colors.secondary}, ${themeConfig.colors.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {block.titleHighlight}
          </span>
        </h2>
        <p className={cn(themeConfig.description)}>{block.description}</p>
      </div>

      <BMIChart
        bmi={bmiResult}
        primaryColor={themeConfig.colors.primary}
        secondaryColor={themeConfig.colors.secondary}
      />

      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`bmi.feet`} className={cn(themeConfig.field.label)}>
            {block.feetLabel}
          </Label>
          <Input
            id="bmi.feet"
            name="bmi.feet"
            placeholder="5"
            type="number"
            value={bmiValues.feet}
            onChange={(e) => updateBMIValues("feet", e.target.value)}
            className={cn(themeConfig.field.input)}
            required={true}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`bmi.inches`} className={cn(themeConfig.field.label)}>
            {block.inchesLabel}
          </Label>
          <Input
            id="bmi.inches"
            name="bmi.inches"
            placeholder="4"
            type="number"
            value={bmiValues.inches}
            onChange={(e) => updateBMIValues("inches", e.target.value)}
            className={cn(themeConfig.field.input)}
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2 mt-4">
          <Label htmlFor={`bmi.weight`} className={cn(themeConfig.field.label)}>
            {block.weightLabel}
          </Label>
          <Input
            id="bmi.weight"
            name="bmi.weight"
            placeholder="200"
            type="number"
            value={bmiValues.weight}
            onChange={(e) => updateBMIValues("weight", e.target.value)}
            className={cn(themeConfig.field.input)}
            required={true}
          />
        </div>
      </div>

      {/* Display Error from validation - only show after user interaction */}
      {error && hasInteracted && (
        <div
          className={cn(
            "text-sm font-medium mt-2 text-center",
            themeConfig.field.error
          )}
        >
          {error}
        </div>
      )}
    </div>
  )
})

BMI3CalculatorRenderer.displayName = "BMI3CalculatorRenderer"

/**
 * Chat renderer for BMI Calculator - streamlined chat experience
 * Imperial-only (ft/in + lbs)
 */
const BMIChatRenderer: React.FC<ChatRendererProps> = ({
  block,
  value,
  onChange,
  onSubmit,
  theme,
  disabled = false,
  error,
}) => {
  // Imperial-only flow
  const [step, setStep] = useState<'height' | 'weight' | 'result'>('height');
  const unitSystem: 'imperial' = 'imperial';

  // If a previous value exists, assume height is stored as TOTAL INCHES (to match your prior "finalHeight")
  const initialTotalInches =
    typeof value?.height === 'number' && !Number.isNaN(value.height) ? value.height : 70; // 5'10"

  const [heightFeet, setHeightFeet] = useState<number>(Math.floor(initialTotalInches / 12) || 5);
  const [heightInches, setHeightInches] = useState<number>(initialTotalInches % 12 || 10);

  const [weight, setWeight] = useState<number>(typeof value?.weight === 'number' ? value.weight : 150);

  // Calculate BMI (imperial formula)
  const calculateBMIValue = () => {
    const totalInches = heightFeet * 12 + heightInches;
    if (!totalInches || totalInches <= 0) return 0;
    // BMI = 703 * weight(lbs) / height(in)^2
    return (703 * weight) / (totalInches * totalInches);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (bmi < 25) return { category: 'Normal Weight', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { category: 'Obese', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const handleHeightSubmit = () => {
    setStep('weight');
  };

  const handleWeightSubmit = () => {
    setStep('result');
  };

  const handleFinalSubmit = () => {
    const bmi = calculateBMIValue();
    const bmiData = getBMICategory(bmi);
    const finalHeight = heightFeet * 12 + heightInches; // store as total inches for consistency

    const result = {
      bmi: parseFloat(bmi.toFixed(1)),
      category: bmiData.category,
      height: finalHeight, // total inches
      weight, // lbs
      unitSystem, // always 'imperial'
    };

    onChange(result);
    onSubmit(result);
  };

  // Height input step (imperial only)
  if (step === 'height') {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Ruler className="w-4 h-4" />
          <span className="text-sm">Enter your height</span>
        </div>

        <div className="flex gap-2 items-center">
          <Select value={heightFeet.toString()} onValueChange={(v) => setHeightFeet(parseInt(v))}>
            <SelectTrigger className="w-20 h-14 text-center text-lg font-semibold rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[3, 4, 5, 6, 7, 8].map((ft) => (
                <SelectItem key={ft} value={ft.toString()}>
                  {ft}'
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={heightInches.toString()} onValueChange={(v) => setHeightInches(parseInt(v))}>
            <SelectTrigger className="w-20 h-14 text-center text-lg font-semibold rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {i}"
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            onClick={handleHeightSubmit}
            disabled={disabled}
            className="h-14 px-6 rounded-xl flex-1"
            style={theme?.colors?.primary ? { backgroundColor: theme.colors.primary } : undefined}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  // Weight input step (lbs only)
  if (step === 'weight') {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Weight className="w-4 h-4" />
          <span className="text-sm">Enter your weight</span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value) || 150)}
              disabled={disabled}
              min={70}
              max={660}
              className="text-center text-xl font-semibold h-14 pr-12 rounded-xl"
              placeholder="150"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              lbs
            </span>
          </div>

          <Button
            type="button"
            onClick={handleWeightSubmit}
            disabled={disabled || !weight}
            className="h-14 px-6 rounded-xl"
            style={theme?.colors?.primary ? { backgroundColor: theme.colors.primary } : undefined}
          >
            Calculate
          </Button>
        </div>
      </div>
    );
  }

  // Result step
  if (step === 'result') {
    const bmi = calculateBMIValue();
    const bmiData = getBMICategory(bmi);

    return (
      <div className="flex flex-col gap-4 w-full">
        <div
          className={cn("p-6 rounded-2xl text-center", bmiData.bgColor, "dark:bg-opacity-20")}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Your BMI
            </span>
          </div>

          <div className={cn("text-5xl font-bold mb-2", bmiData.color)}>{bmi.toFixed(1)}</div>

          <Badge variant="secondary" className={cn("text-sm px-4 py-1", bmiData.color)}>
            {bmiData.category}
          </Badge>

          <div className="mt-4 pt-4 border-t border-current/10">
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>Height: {heightFeet}'{heightInches}"</span>
              <span>Weight: {weight} lbs</span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleFinalSubmit}
          disabled={disabled}
          className="h-12 rounded-xl w-full"
          style={theme?.colors?.primary ? { backgroundColor: theme.colors.primary } : undefined}
        >
          Continue
        </Button>
      </div>
    );
  }

  return null;
};


// Export the Block Definition
export const BMI3CalculatorBlock: BlockDefinition = {
  type: "BMI3Calculator",
  name: "BMI3 Calculator (Speedometer Style)",
  description: "Calculates BMI from height and weight inputs.",
  icon: <Calculator className="w-4 h-4" />,
  defaultData: {
    type: "BMI3Calculator",
    title: "Let's calculate",
    titleHighlight: "your BMI.",
    fieldName: "bmi",
    description:
      "Body Mass Index (BMI) helps determine eligibility for weight loss medication and assess weight-related health risks.",
    feetLabel: "Feet",
    inchesLabel: "Inches",
    weightLabel: "Weight (lbs)",
    isCustom: true,
  },
  renderItem: (props) => <BMI3CalculatorBlockItem {...props} />,
  renderFormFields: (props) => <BMI3CalculatorBlockForm {...props} />,
  renderPreview: () => <BMI3CalculatorBlockPreview />,
  renderBlock: (props) => <BMI3CalculatorRenderer {...props} />,
  chatRenderer: (props) => <BMIChatRenderer {...props} />,
  validateValue: (value: any, data: BlockData) => {
    // FIX: Validate the 'value' object, not 'data'
    if (!value?.feet) return `${data.feetLabel || "Feet"} is required.`
    if (!value?.weight) return `${data.weightLabel || "Weight"} is required.`

    const hf = Number(value?.feet)
    const w = Number(value?.weight)
    if (hf <= 0) return `Please enter a valid height.`
    if (w <= 0) return `Please enter a valid weight.`
    return null
  },
  blockFunctions: [
    {
      name: "calculate bmi",
      parameters: {
        feet: { type: 'number', optional: true, description: 'Feet of the user' },
        inches: { type: 'number', optional: true, description: 'Inches of the user' },
        weight: { type: 'number', optional: true, description: 'weight of the user' },
      },
      callfunction: (feet: number, inches: number, weight: number) => calculateBMI(feet, inches, weight)
    }
  ],
  inputSchema: {
    type: 'object',
    properties: {
      feet: { type: 'number', optional: true, description: 'Feet of the user' },
      inches: { type: 'number', optional: true, description: 'Inches of the user' },
      weight: { type: 'number', optional: true, description: 'weight of the user' },
    }
  },
  outputSchema: {
    type: 'object',
    properties: {
      feet: { type: 'number', optional: true, description: 'Feet of the user' },
      inches: { type: 'number', optional: true, description: 'Inches of the user' },
      weight: { type: 'number', optional: true, description: 'weight of the user' },
      bmi: { type: 'number', optional: true, description: 'bmi of the user' }
    }
  },
}