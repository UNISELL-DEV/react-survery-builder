import React, { forwardRef, useEffect, useState } from "react"
import { ShieldCheck, Gauge, Feather, Layers, Brain, Hand } from "lucide-react"

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
import { Checkbox } from "@/packages/survey-form-package/src/components/ui/checkbox"
import { cn } from "@/packages/survey-form-package/src/lib/utils"

// ============================================================================
// ICON CHOICE FUNCTION (instead of component)
// ============================================================================

const options = [
  {
    value: "low-libido",
    label: "Low libido",
    icon: Gauge,
  },
  {
    value: "hair-loss",
    label: "Hair loss",
    icon: Feather,
  },
  {
    value: "skin-issues",
    label: "Skin issues",
    icon: Layers,
  },
  {
    value: "cognition-issues",
    label: "Cognition issues",
    icon: Brain,
  },
  {
    value: "none",
    label: "None of these",
    icon: Hand,
  },
]

// ============================================================================
// BLOCK IMPLEMENTATION (prefix all symbols with "UniqueEffects__")
// ============================================================================

// Builder Form Component (for customizing block properties)
const UniqueEffects__BlockForm: React.FC<ContentBlockItemProps> = ({
  data,
  onUpdate,
}) => {
  const handle = (field: string, value: any) =>
    onUpdate?.({ ...data, [field]: value })

  const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const optionsText = e.target.value
    // Parse JSON format or fallback to simple text

    const options = optionsText.split("\n").map((opt) => opt.trim())
    handle("options", options)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fieldName">Field Name</Label>
        <Input
          id="fieldName"
          value={data.fieldName || ""}
          onChange={(e) => handle("fieldName", e.target.value)}
          placeholder="uniqueEffects"
        />
        <p className="text-xs text-muted-foreground">
          Unique identifier for storing responses
        </p>
      </div>
    </div>
  )
}

// Builder Item Preview (shown in the builder canvas)
const UniqueEffects__BlockItem: React.FC<ContentBlockItemProps> = ({
  data,
}) => {
  return (
    <Card className="p-4 text-center">
      <h2 className="text-md font-semibold">
        Women experience unique effects from weight gain.
      </h2>
      <h3 className="text-lg mt-2">Do you experience any of the following?</h3>
      <div className="grid grid-cols-3 gap-2 text-left pt-4">
        {options.slice(0, 3).map((opt, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center p-2 border rounded-lg bg-gray-50"
            >
              <span className="text-xs text-gray-700 mt-1">{opt.label}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// Builder Palette Preview (shown in the blocks palette)
const UniqueEffects__BlockPreview: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-1">
      <div className="w-4/5 border rounded-md p-2 text-xs text-muted-foreground bg-muted/30">
        Unique Effects
      </div>
    </div>
  )
}

// Renderer Component (shown to end users filling the form)
const UniqueEffects__Renderer = forwardRef<HTMLDivElement, BlockRendererProps>(
  ({ block, value, onChange, onBlur, error, disabled, theme }, ref) => {
    const [currentValue, setCurrentValue] = useState([])
    const themeConfig = theme ?? themes.default
    const { goToNextBlock } = useSurveyForm()

    useEffect(() => {
      if (Array.isArray(value)) {
        setCurrentValue(value)
      }
    }, [value])

    const handleCheckedChange = (optionValue: string) => {
      const isNoneOption = optionValue === "none"

      console.log("handleCheckChange run.")

      if (isNoneOption) {
        onChange?.([optionValue])
        let none = ["none"]
        goToNextBlock({ [block.fieldName]: none })
      } else {
        console.log("!isNoneOption (else) run.")
        let newValue = currentValue.filter((item) => item !== "none")

        if (newValue.includes(optionValue)) {
          newValue = newValue.filter((item) => item !== optionValue)
        } else {
          newValue.push(optionValue)
        }

        onChange?.(newValue)
      }
    }

    // Reusable card component for unique effects options
    const SelectionCard = ({
      optionValue,
      label,
      icon: Icon,
    }: {
      optionValue: string
      label: string
      icon?: React.ComponentType<{
        className: string
        style?: React.CSSProperties
      }>
    }) => {
      const isSelected = currentValue.includes(optionValue)
      const hasIcon = !!Icon
      return (
        <Label
          htmlFor={`${block.fieldName}-${optionValue}`}
          className={cn(
            "relative",
            hasIcon
              ? "flex flex-col items-center justify-center gap-6 sm:gap-10"
              : "flex justify-between gap-6 items-center",
            themeConfig.field.input,
            "sm:w-[200px] sm:h-[240px]"
          )}
        >
          <Checkbox
            id={`${block.fieldName}-${optionValue}`}
            checked={isSelected}
            onCheckedChange={() => handleCheckedChange(optionValue)}
            onBlur={onBlur}
            className="sr-only"
            disabled={disabled}
          />

          {hasIcon && Icon && (
            <div
              className="relative"
              style={{ color: themeConfig.colors.primary }}
            >
              <Icon
                className="w-16 h-16 sm:w-24 sm:h-24"
                style={{ color: themeConfig.colors.primary }}
              />
            </div>
          )}
          <p
            className={cn(
              themeConfig.field.label,
              hasIcon ? "w-fit" : "max-w-2/3",
              "text-center"
            )}
            style={{ color: isSelected ? themeConfig.colors.primary : "" }}
          >
            {label}
          </p>

          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border bg-white",
              hasIcon ? "absolute right-4 top-6" : "relative"
            )}
            style={{
              borderColor: isSelected
                ? themeConfig.colors.primary
                : "[#28282826]",
            }}
          >
            {isSelected && (
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: themeConfig.colors.primary }}
              />
            )}
          </div>
        </Label>
      )
    }

    return (
      <div className="w-full relative" ref={ref}>
        <h2 className={cn("mb-8 sm:mb-10 text-center", themeConfig.title)}>
          Women experience{" "}
          <span style={{ color: themeConfig.colors.primary }}>
            unique effects
          </span>
          <br />
          from weight gain.
        </h2>

        <h3 className={cn("mb-6 sm:mb-8 text-center", themeConfig.title)}>
          Do you experience any of the following?
        </h3>

        {/* Map options using SelectionCard */}
        <div className="relative w-full grid grid-cols-2 sm:flex sm:flex-wrap gap-4">
          {options.map((option: any, index: number) => {
            return (
              <SelectionCard
                key={index}
                optionValue={option.value}
                label={option.label}
                icon={option.icon}
              />
            )
          })}
        </div>

        {error && (
          <div
            className={cn(
              "text-sm font-medium mt-4 text-center",
              themeConfig.field.error
            )}
          >
            {error}
          </div>
        )}
      </div>
    )
  }
)

UniqueEffects__Renderer.displayName = "UniqueEffectsRenderer"

// Export the Block Definition
export const UniqueEffectsBlock: BlockDefinition = {
  type: "uniqueEffects",
  name: "Unique Effects",
  description: "A multiple-choice card selection with icons.",
  icon: <ShieldCheck className="w-4 h-4" />,
  defaultData: {
    type: "uniqueEffects",
    fieldName: "uniqueEffects",
    isCustom: true,
  },
  renderItem: (props) => <UniqueEffects__BlockItem {...props} />,
  renderFormFields: (props) => <UniqueEffects__BlockForm {...props} />,
  renderPreview: () => <UniqueEffects__BlockPreview />,
  renderBlock: (props) => <UniqueEffects__Renderer {...props} />,
  validate: (data: BlockData) => {
    if (!data.fieldName) return "Field name is required"
    return null
  },
  validateValue: (value: any, data: BlockData) => {
    console.log("data", data)
    console.log("value", value)
    if(value && value == "none") {
      return null;
    }
    if (!value || !Array.isArray(value) || value.length === 0) {
      return `Please select at least one option`
    }
    return null
  },
}
