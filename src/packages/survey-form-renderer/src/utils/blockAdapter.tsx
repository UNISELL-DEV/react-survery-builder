import { BlockData, BlockDefinition } from "../types";
import { Activity, ShoppingCart } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { TextInputBlock, TextareaBlock, SelectBlock, RadioBlock, CheckboxBlock, RangeBlock, DatePickerBlock, FileUploadBlock, MatrixBlock, SelectableBoxQuestionBlock, MarkdownBlock, HtmlBlock, ScriptBlock, AuthBlock, CheckoutBlock } from "./blockdefinations";

// Export the block definition
export const BMICalculatorBlock: BlockDefinition = {
  type: "bmiCalculator",
  name: "BMI Calculator",
  description: "Modern BMI calculator with sleek design and intuitive controls",
  icon: <Activity className="w-4 h-4" />,
  defaultData: {
    type: "bmiCalculator",
    label: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    fieldName: "bmiResult",
    defaultUnit: "metric",
    showResults: false,
    theme: "default",
    className: "",
  },
  validate: (data) => {
    if (!data.label) return "Label is required";
    if (!data.fieldName) return "Field name is required";
    return null;
  },
};

export const CheckoutBlockDefinition: BlockDefinition = {
  type: 'checkout',
  name: 'Checkout Form',
  description: 'Collect shipping, billing and contact details',
  icon: <ShoppingCart className="w-4 h-4" />,
  defaultData: {
    type: 'checkout',
    fieldName: `checkout${uuidv4().substring(0,4)}`,
    label: 'Checkout',
    description: '',
    showShippingAddress: true,
    showBillingAddress: false,
    requireEmail: true,
    requirePhone: false,
    className: '',
  },
  validate: (data) => {
    if (!data.fieldName) return 'Field name is required';
    return null;
  },
};



/**
 * Maps survey builder block types to the appropriate renderer components
 * This allows us to re-use the validation and properties from the original blocks
 */
export const blockTypeMap: Record<string, any> = {
  // Basic input blocks
  textfield: TextInputBlock,
  textarea: TextareaBlock,
  select: SelectBlock,
  radio: RadioBlock,
  checkbox: CheckboxBlock,

  // Advanced input blocks
  range: RangeBlock,
  datepicker: DatePickerBlock,
  fileupload: FileUploadBlock,
  matrix: MatrixBlock,
  selectablebox: SelectableBoxQuestionBlock,

  // Content blocks
  markdown: MarkdownBlock,
  html: HtmlBlock,
  auth: AuthBlock,

  // Logic blocks
  script: ScriptBlock,

  // Container blocks
  set: { type: 'set' }, // Simple definition for set type

  // Conditional blocks
  conditional: {
    type: 'conditional',
    validate: (block: BlockData) => {
      if (!block.condition) return 'Condition is required';
      if (!block.childBlock) return 'Child block is required';
      return null;
    }
  },

  // Calculated blocks
  calculated: {
    type: 'calculated',
    validate: (block: BlockData) => {
      if (!block.formula) return 'Formula is required';
      if (!block.dependencies || !Array.isArray(block.dependencies))
        return 'Dependencies array is required';
      return null;
    }
  },

  // BMI Calculator block
  bmiCalculator: {
    type: 'bmiCalculator',
    validate: (block: BlockData) => {
      // BMI Calculator has no specific validation
      return null;
    }
  },

  // Checkout block
  checkout: CheckoutBlockDefinition
};

/**
 * Validates a block using its original validation function from the survey builder
 */
export function validateBlock(block: BlockData): string | null {
  const blockDefinition = blockTypeMap[block.type];
  if (blockDefinition && typeof blockDefinition.validate === 'function') {
    return blockDefinition.validate(block);
  }
  return null;
}

/**
 * Gets the default properties for a block type
 */
export function getDefaultBlockProperties(blockType: string): Partial<BlockData> {
  const blockDefinition = blockTypeMap[blockType];
  if (blockDefinition) {
    return blockDefinition.defaultData || {};
  }
  return {};
}

/**
 * Checks if a block is a content block (doesn't collect data)
 */
export function isContentBlock(blockType: string): boolean {
  return ['markdown', 'html', 'script', 'calculated'].includes(blockType);
}

/**
 * Checks if a block is an input block (collects data)
 */
export function isInputBlock(blockType: string): boolean {
  return !isContentBlock(blockType);
}

/**
 * Checks if a block supports conditional rendering
 */
export function supportsConditionalRendering(blockType: string): boolean {
  // All block types can be conditionally rendered
  return true;
}

/**
 * Checks if a block supports branching logic
 */
export function supportsBranchingLogic(blockType: string): boolean {
  // Only certain blocks can have branching logic
  return ['radio', 'select', 'checkbox', 'range', 'textfield', 'bmiCalculator', 'checkout'].includes(blockType);
}
