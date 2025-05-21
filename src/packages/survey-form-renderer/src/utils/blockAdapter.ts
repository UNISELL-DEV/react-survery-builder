import type { BlockData } from "../../../../lib/survey/types";
import {
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
  // Import all block types from the survey builder
} from "../../../../lib/survey/blocks";

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

  // Logic blocks
  script: ScriptBlock,

  // Container blocks
  set: { type: 'set' }, // Simple definition for set type
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
  return ['markdown', 'html', 'script'].includes(blockType);
}

/**
 * Checks if a block is an input block (collects data)
 */
export function isInputBlock(blockType: string): boolean {
  return !isContentBlock(blockType);
}
