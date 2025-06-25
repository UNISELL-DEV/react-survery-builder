import { BlockData, BlockDefinition } from "../types";
import { Activity, AlignLeft, ArrowRightToLine, Calculator, Calendar, CheckSquare, CircleCheck, Code, FileText, GitBranch, Grid3X3, ListFilter, LucideTextCursor, Terminal, Upload, UserCheck, ShoppingCart } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

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

export const CheckoutBlock: BlockDefinition = {
  type: "checkout",
  name: "Checkout Form",
  description: "Collect shipping, billing and contact details",
  icon: <ShoppingCart className="w-4 h-4" />,
  defaultData: {
    type: "checkout",
    fieldName: `checkout${uuidv4().substring(0,4)}`,
    label: "Checkout",
    description: "",
    showShippingAddress: true,
    showBillingAddress: false,
    requireEmail: true,
    requirePhone: false,
    className: "",
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    return null;
  },
};


// Export the block definition
export const CalculatedFieldBlock: BlockDefinition = {
    type: "calculatedField",
    name: "Calculated Field",
    description: "Display a value calculated from a formula based on other fields",
    icon: <Calculator className="w-4 h-4" />,
    defaultData: {
      type: "calculatedField",
      label: "Calculated Result",
      description: "This field is automatically calculated using custom logic",
      fieldName: "calculatedResult",
      formula: `// Example: BMI risk assessment
  if (!bmiCalculator) return "Please complete BMI calculation";
  const bmi = Number(bmiCalculator.bmi);
  if (isNaN(bmi)) return "Invalid BMI value";
  if (bmi >= 30) return "High Risk";
  if (bmi >= 25) return "Moderate Risk";
  return "Low Risk";`,
      dependencies: ["bmiCalculator"],
      note: "Based on your BMI calculation",
      displayFormat: "",
      resultType: "string",
      className: "",
    },
    validate: (data) => {
      if (!data.label) return "Label is required";
      if (!data.fieldName) return "Field name is required";
      if (!data.formula) return "Formula is required";
      if (!data.dependencies || data.dependencies.length === 0) return "At least one dependency is required";
      return null;
    },
};

// Export the block definition
export const CheckboxBlock: BlockDefinition = {
  type: "checkbox",
  name: "Checkbox",
  description: "Single checkbox for binary/boolean options",
  icon: <CheckSquare className="w-4 h-4" />,
  defaultData: {
    type: "checkbox",
    fieldName: `checkbox${uuidv4().substring(0, 4)}`,
    label: "Check this option",
    description: "",
    value: "true",
    defaultValue: false,
    showYesNo: false,
    trueLabel: "Yes",
    falseLabel: "No",
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  },
};



// Export the block definition
export const ConditionalBlock: BlockDefinition = {
  type: "conditional",
  name: "Conditional Block",
  description: "Display content only when specific conditions are met",
  icon: <GitBranch className="w-4 h-4" />,
  defaultData: {
    type: "conditional",
    condition: `// Show when age is 18 or older
return age >= 18;`,
    dependencies: ["age"],
    childBlock: {
      type: "text",
      label: "Additional Information",
      fieldName: "additionalInfo",
      placeholder: "Enter additional information",
      description: "This field appears when you're 18 or older"
    },
    className: "",
  },
  validate: (data) => {
    if (!data.condition) return "Condition is required";
    if (!data.childBlock) return "Child block configuration is required";
    if (!data.childBlock.type) return "Child block type is required";
    if (!data.dependencies || data.dependencies.length === 0) {
      return "At least one dependency field is required";
    }
    return null;
  },
};

// Export the block definition
export const DatePickerBlock: BlockDefinition = {
    type: "datepicker",
    name: "Date Picker",
    description: "Calendar component for selecting a date",
    icon: <Calendar className="w-4 h-4" />,
    defaultData: {
      type: "datepicker",
      fieldName: `date${uuidv4().substring(0, 4)}`,
      label: "Select a date",
      description: "",
      placeholder: "Pick a date",
      dateFormat: "PPP",
      showCalendarOnFocus: true,
      minDate: "",
      maxDate: "",
      disabledDays: "",
    },
    validate: (data) => {
      if (!data.fieldName) return "Field name is required";
      if (!data.label) return "Label is required";
      return null;
    },
};

// Export the block definition
export const FileUploadBlock: BlockDefinition = {
  type: "fileupload",
  name: "File Upload",
  description: "Component for uploading files",
  icon: <Upload className="w-4 h-4" />,
  defaultData: {
    type: "fileupload",
    fieldName: `file${uuidv4().substring(0, 4)}`,
    label: "Upload files",
    description: "",
    acceptedFileTypes: [".jpg", ".jpeg", ".png", ".pdf"],
    maxFileSize: "5",
    maxFiles: "1",
    helpText: "Drag and drop files here or click to browse",
    showPreview: true,
    required: false,
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  },
};

// Export the block definition
export const HtmlBlock: BlockDefinition = {
  type: "html",
  name: "HTML",
  description: "Custom HTML content",
  icon: <Code className="w-4 h-4" />,
  defaultData: {
    type: "html",
    html: "<h2>HTML Content</h2>\n<p>This is a <strong>custom</strong> HTML block.</p>",
    variableName: "",
    className: "",
  },
  validate: (data) => {
    if (!data.html) return "HTML content is required";
    return null;
  },
};

export const AuthBlock: BlockDefinition = {
  type: "auth",
  name: "Authentication",
  description: "Authenticate user before continuing",
  icon: <UserCheck className="w-4 h-4" />,
  defaultData: {
    type: "auth",
    loginUrl: "",
    signupUrl: "",
    useOtp: false,
    sendOtpUrl: "",
    verifyOtpUrl: "",
    tokenField: "token",
    tokenStorageKey: "authToken",
    validateTokenUrl: "",
    requireName: false,
    requireEmail: true,
    nameLabel: "Name",
    emailLabel: "Email",
  },
  validate: () => null,
};

// Export the block definition
export const MarkdownBlock: BlockDefinition = {
    type: "markdown",
    name: "Markdown",
    description: "Formatted text content using Markdown syntax",
    icon: <FileText className="w-4 h-4" />,
    defaultData: {
      type: "markdown",
      text: "## Markdown Heading\n\nThis is a paragraph with **bold** and *italic* text.\n\n* List item 1\n* List item 2",
      variableName: "",
      className: "",
      updateContent: false,
    },
    validate: (data) => {
      if (!data.text) return "Content is required";
      return null;
    },
};

// Export the block definition
export const MatrixBlock: BlockDefinition = {
  type: "matrix",
  name: "Matrix / Grid",
  description: "Grid of questions with the same response options",
  icon: <Grid3X3 className="w-4 h-4" />,
  defaultData: {
    type: "matrix",
    fieldName: `matrix${uuidv4().substring(0, 4)}`,
    label: "Please rate the following items",
    description: "Select one option for each row",
    columnHeader: "Rating",
    questions: [
      { id: uuidv4(), text: "Item 1" },
      { id: uuidv4(), text: "Item 2" },
      { id: uuidv4(), text: "Item 3" },
    ],
    options: [
      { id: uuidv4(), text: "Poor", value: "1" },
      { id: uuidv4(), text: "Fair", value: "2" },
      { id: uuidv4(), text: "Good", value: "3" },
      { id: uuidv4(), text: "Excellent", value: "4" },
    ],
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Matrix title is required";
    if (!data.questions || data.questions.length === 0) return "At least one question is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  },
};


// Export the block definition
export const RadioBlock: BlockDefinition = {
  type: "radio",
  name: "Radio Buttons",
  description: "Single selection from multiple options",
  icon: <CircleCheck className="w-4 h-4" />,
  defaultData: {
    type: "radio",
    fieldName: `radioOption${uuidv4().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: "1",
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  },
};

// Export the block definition
export const RangeBlock: BlockDefinition = {
  type: "range",
  name: "Range Slider",
  description: "Slider for selecting numeric values within a range",
  icon: <ArrowRightToLine className="w-4 h-4" />,
  defaultData: {
    type: "range",
    fieldName: `range${uuidv4().substring(0, 4)}`,
    label: "Select a value",
    description: "",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: "Selected: {value}",
    markStep: 25,
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";

    const min = parseInt(String(data.min || "0"), 10);
    const max = parseInt(String(data.max || "100"), 10);

    if (min >= max) return "Minimum value must be less than maximum value";
    return null;
  },
};


// Export the block definition
export const ScriptBlock: BlockDefinition = {
  type: "script",
  name: "Script",
  description: "Custom JavaScript code for form logic",
  icon: <Terminal className="w-4 h-4" />,
  defaultData: {
    type: "script",
    script: "// This script runs when the page loads\nconsole.log('Script block executed');\n\n// You can access and modify form data\n// formData.calculated = formData.input1 + formData.input2;",
  },
  validate: (data) => {
    if (!data.script) return "Script content is required";
    return null;
  },
};

// Export the block definition
export const SelectableBoxQuestionBlock: BlockDefinition = {
  type: "selectablebox",
  name: "Selectable Box Question",
  description: "Question with selectable box options",
  icon: <CheckSquare className="w-4 h-4" />,
  defaultData: {
    type: "selectablebox",
    fieldName: `boxq${uuidv4().substring(0, 4)}`,
    label: "What's your goal?",
    description: "",
    boxSpacing: "4",
    defaultValue: "",
    showSelectionIndicator: true,
    options: [
      { id: uuidv4(), label: "Lose 5 to 20 lbs", value: "5-20" },
      { id: uuidv4(), label: "Lose 21 to 50 lbs", value: "21-50" },
      { id: uuidv4(), label: "Lose 51+ lbs", value: "51+" },
      { id: uuidv4(), label: "I'm not sure yet", value: "unsure" },
    ],
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.options || data.options.length === 0) return "At least one option is required";
    return null;
  },
};

// Export the block definition
export const SelectBlock: BlockDefinition = {
  type: "select",
  name: "Dropdown Select",
  description: "Single selection from a dropdown list",
  icon: <ListFilter className="w-4 h-4" />,
  defaultData: {
    type: "select",
    fieldName: `select${uuidv4().substring(0, 4)}`,
    label: "Select an option",
    description: "",
    placeholder: "Choose from the list...",
    labels: ["Option 1", "Option 2", "Option 3"],
    values: ["1", "2", "3"],
    defaultValue: "",
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    if (!data.labels || !data.labels.length) return "At least one option is required";
    return null;
  },
};

// Export the block definition
export const TextareaBlock: BlockDefinition = {
  type: "textarea",
  name: "Text Area",
  description: "Multi-line text field for longer answers",
  icon: <AlignLeft className="w-4 h-4" />,
  defaultData: {
    type: "textarea",
    fieldName: `textArea${uuidv4().substring(0, 4)}`,
    label: "Text Area Question",
    placeholder: "Type your answer here",
    description: "",
    defaultValue: "",
    rows: "3",
  },
  validate: (data) => {
    if (!data.fieldName) return "Field name is required";
    if (!data.label) return "Label is required";
    return null;
  },
};

// Export the block definition
export const TextInputBlock: BlockDefinition = {
    type: "textfield",
    name: "Text Input",
    description: "Single line text field for short answers",
    icon: <LucideTextCursor className="w-4 h-4" />,
    defaultData: {
      type: "textfield",
      fieldName: `textInput${uuidv4().substring(0, 4)}`,
      label: "Text Input Question",
      placeholder: "Type your answer here",
      description: "",
      defaultValue: "",
    },
    validate: (data) => {
      if (!data.fieldName) return "Field name is required";
      if (!data.label) return "Label is required";
      return null;
    },
  };
  