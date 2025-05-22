import type { ConditionRule, ConditionOperator, BranchingLogic, CalculationRule } from '../types';

/**
 * Evaluates a simple condition between two values using the specified operator
 */
export function evaluateSimpleCondition(
  fieldValue: any,
  operator: ConditionOperator,
  comparisonValue: any,
  valueType: 'string' | 'number' | 'boolean' | 'date' = 'string'
): boolean {
  // Handle null/undefined field values specially
  if (fieldValue === null || fieldValue === undefined) {
    if (operator === 'empty') return true;
    if (operator === 'notEmpty') return false;
    // For equality operators when checking against null/undefined
    if (operator === '==') return comparisonValue === null || comparisonValue === undefined;
    if (operator === '!=') return comparisonValue !== null && comparisonValue !== undefined;
    return false; // Most other operations on null/undefined should return false
  }

  // Type conversions based on the specified type
  let typedFieldValue = fieldValue;
  let typedComparisonValue = comparisonValue;

  if (valueType === 'number') {
    typedFieldValue = Number(fieldValue);
    typedComparisonValue = Number(comparisonValue);
  } else if (valueType === 'boolean') {
    typedFieldValue = Boolean(fieldValue);
    typedComparisonValue = Boolean(comparisonValue);
  } else if (valueType === 'date') {
    typedFieldValue = new Date(fieldValue);
    typedComparisonValue = new Date(comparisonValue);
  } else if (valueType === 'string') {
    typedFieldValue = String(fieldValue);
    typedComparisonValue = String(comparisonValue);
  }

  // Evaluate based on operator
  switch (operator) {
    case '==':
      return typedFieldValue == typedComparisonValue;
    case '!=':
      return typedFieldValue != typedComparisonValue;
    case '>':
      return typedFieldValue > typedComparisonValue;
    case '>=':
      return typedFieldValue >= typedComparisonValue;
    case '<':
      return typedFieldValue < typedComparisonValue;
    case '<=':
      return typedFieldValue <= typedComparisonValue;
    case 'contains':
      return String(typedFieldValue).includes(String(typedComparisonValue));
    case 'startsWith':
      return String(typedFieldValue).startsWith(String(typedComparisonValue));
    case 'endsWith':
      return String(typedFieldValue).endsWith(String(typedComparisonValue));
    case 'empty':
      return typedFieldValue === '' ||
             typedFieldValue === null ||
             typedFieldValue === undefined ||
             (Array.isArray(typedFieldValue) && typedFieldValue.length === 0);
    case 'notEmpty':
      return typedFieldValue !== '' &&
             typedFieldValue !== null &&
             typedFieldValue !== undefined &&
             (!Array.isArray(typedFieldValue) || typedFieldValue.length > 0);
    case 'between':
      if (Array.isArray(typedComparisonValue) && typedComparisonValue.length === 2) {
        return typedFieldValue >= typedComparisonValue[0] && typedFieldValue <= typedComparisonValue[1];
      }
      return false;
    case 'in':
      return Array.isArray(typedComparisonValue) && typedComparisonValue.includes(typedFieldValue);
    case 'notIn':
      return Array.isArray(typedComparisonValue) && !typedComparisonValue.includes(typedFieldValue);
    default:
      console.warn(`Unknown operator: ${operator}`);
      return false;
  }
}

/**
 * Evaluates a complex condition rule against field values
 */
export function evaluateConditionRule(
  rule: ConditionRule,
  fieldValues: Record<string, any>
): boolean {
  const fieldValue = fieldValues[rule.field];
  return evaluateSimpleCondition(
    fieldValue,
    rule.operator,
    rule.value,
    rule.type
  );
}

/**
 * Evaluates a condition expression or rule against field values
 */
export function evaluateCondition(
  condition: string | ConditionRule | ConditionRule[],
  fieldValues: Record<string, any>
): boolean {
  // If condition is a string, evaluate it as a JavaScript expression
  if (typeof condition === 'string') {
    try {
      // Basic sanitization
      const sanitizedCondition = condition
        .replace(/import\s*\{/g, '')
        .replace(/require\s*\(/g, '')
        .replace(/process/g, '')
        .replace(/global/g, '')
        .replace(/window/g, '')
        .replace(/document/g, '')
        .replace(/eval\s*\(/g, '');

      // Create a function that references values by using a parameter object instead of 'with'
      const conditionFn = new Function('values', `
        "use strict";
        try {
          // Access values directly from the values object
          // Example: If condition is "age > 18", we'll reference values.age
          const result = (${translateConditionToExplicitReferences(sanitizedCondition)});
          return result;
        } catch (e) {
          console.error("Error evaluating condition:", e);
          return false;
        }
      `);

      // Execute the function with the field values
      return Boolean(conditionFn(fieldValues));
    } catch (error) {
      console.error('Error parsing condition expression:', error);
      return false;
    }
  }

  // If condition is a single rule object, evaluate it
  if (!Array.isArray(condition)) {
    return evaluateConditionRule(condition as ConditionRule, fieldValues);
  }

  // If condition is an array of rules, evaluate each rule and return true if all are true
  return (condition as ConditionRule[]).every(rule =>
    evaluateConditionRule(rule, fieldValues)
  );
}

/**
 * Translates a condition string to use explicit references to the values object
 * For example, converts "age > 18" to "values.age > 18"
 */
function translateConditionToExplicitReferences(condition: string): string {
  // Replace variable names with values object references
  // This regex looks for identifiers that aren't part of a property access
  return condition.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b(?!\s*:|\s*\(|\[|\.])/g, (match, name) => {
    // Don't replace JavaScript keywords and common values
    const keywords = [
      'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
      'if', 'else', 'return', 'function', 'var', 'let', 'const',
      'new', 'this', 'typeof', 'instanceof', 'in'
    ];

    if (keywords.includes(name)) {
      return name;
    }

    return `values.${name}`;
  });
}

/**
 * Determines the next page index based on branching logic
 */
export function getNextPageIndex(
  currentPage: number,
  branchingLogic: BranchingLogic | undefined,
  fieldValues: Record<string, any>,
  totalPages: number
): number {
  // If no branching logic is defined, go to the next page
  if (!branchingLogic || !branchingLogic.condition) {
    return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  }

  // Evaluate the condition for this branching logic
  const conditionMet = evaluateCondition(branchingLogic.condition, fieldValues);

  // If condition is not met, proceed to the next page
  if (!conditionMet) {
    return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  }

  // If condition is met, determine the target page
  const { targetPage } = branchingLogic;

  if (typeof targetPage === 'number') {
    // Validate the page index
    if (targetPage >= 0 && targetPage < totalPages) {
      return targetPage;
    }
  } else if (targetPage === 'next') {
    return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
  } else if (targetPage === 'prev') {
    return currentPage - 1 >= 0 ? currentPage - 1 : currentPage;
  } else if (targetPage === 'submit') {
    // Return a special value to indicate submission
    return -1;
  }

  // Default to next page
  return currentPage + 1 < totalPages ? currentPage + 1 : currentPage;
}

/**
 * Executes a calculation rule to compute a field value
 */
export function executeCalculation(
  calculationRule: CalculationRule,
  fieldValues: Record<string, any>
): any {
  try {
    // Basic sanitization
    const sanitizedFormula = calculationRule.formula
      .replace(/import\s*\{/g, '')
      .replace(/require\s*\(/g, '')
      .replace(/process/g, '')
      .replace(/global/g, '')
      .replace(/window/g, '')
      .replace(/document/g, '')
      .replace(/eval\s*\(/g, '');

    // Simple direct execution approach
    const functionBody = `
      "use strict";

      try {
        // Make all fields directly available
        ${Object.keys(fieldValues).map(key =>
          `const ${key} = ${JSON.stringify(fieldValues[key])};`
        ).join('\n')}

        // Execute formula
        ${sanitizedFormula}
      } catch (error) {
        console.error("Error in formula execution:", error);
        return null;
      }
    `;

    // Create and execute the function
    const fn = new Function(functionBody);
    return fn();
  } catch (error) {
    console.error('Error executing calculation:', error);
    return null;
  }
}

/**
 * Evaluates if a block should be visible based on its visibility condition
 */
export function isBlockVisible(
  block: { visibleIf?: string | ConditionRule | ConditionRule[] },
  fieldValues: Record<string, any>
): boolean {
  // If no visibility condition, the block is always visible
  if (!block.visibleIf) {
    return true;
  }

  // Evaluate the visibility condition
  return evaluateCondition(block.visibleIf, fieldValues);
}

/**
 * Simple BMI calculator example
 */
export function calculateBMI(
  weightInKg: number,
  heightInCm: number
): { bmi: number; category: string } {
  // Convert height to meters
  const heightInM = heightInCm / 100;

  // Calculate BMI
  const bmi = weightInKg / (heightInM * heightInM);

  // Determine BMI category
  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return { bmi: parseFloat(bmi.toFixed(1)), category };
}
