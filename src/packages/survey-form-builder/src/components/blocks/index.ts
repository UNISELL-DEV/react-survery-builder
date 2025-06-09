import { TextInputBlock } from "./TextInputBlock";
import { TextareaBlock } from "./TextareaBlock";
import { RadioBlock } from "./RadioBlock";
import { CheckboxBlock } from "./CheckboxBlock";
import { MarkdownBlock } from "./MarkdownBlock";
import { HtmlBlock } from "./HtmlBlock";
import { ScriptBlock } from "./ScriptBlock";
import { SelectBlock } from "./SelectBlock";
import { RangeBlock } from "./RangeBlock";
import { DatePickerBlock } from "./DatePickerBlock";
import { FileUploadBlock } from "./FileUploadBlock";
import { MatrixBlock } from "./MatrixBlock";
import { SelectableBoxQuestionBlock } from "./SelectableBoxQuestionBlock"
import { BMICalculatorBlock } from "./BMICalculatorBlock";
import { CalculatedFieldBlock } from "./CalculatedFieldBlock";
import { ConditionalBlock } from "./ConditionalBlock";
import type { BlockDefinition } from "../../types";

// Export all standard block definitions
export const StandardBlocks: BlockDefinition[] = [
  // Basic input blocks
  TextInputBlock,
  TextareaBlock,
  SelectBlock,
  RadioBlock,
  CheckboxBlock,

  // Advanced input blocks
  RangeBlock,
  DatePickerBlock,
  FileUploadBlock,
  MatrixBlock,
  SelectableBoxQuestionBlock,
  // Content blocks
  MarkdownBlock,
  HtmlBlock,

  // Logic blocks
  ScriptBlock,

  // Advanced calculation and conditional blocks
  BMICalculatorBlock,
  CalculatedFieldBlock,
  ConditionalBlock,
];

// Export individual blocks for direct imports
export {
  TextInputBlock,
  TextareaBlock,
  RadioBlock,
  CheckboxBlock,
  MarkdownBlock,
  HtmlBlock,
  ScriptBlock,
  SelectBlock,
  RangeBlock,
  DatePickerBlock,
  FileUploadBlock,
  MatrixBlock,
  SelectableBoxQuestionBlock,
  BMICalculatorBlock,
  CalculatedFieldBlock,
  ConditionalBlock,
};
