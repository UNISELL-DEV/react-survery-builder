import { v4 as uuidv4 } from "uuid";
import type { BlockData, NodeData } from "../survey/types";

// Helper to create unique IDs
const createId = () => uuidv4();

// Basic Survey Example
const createBasicSurvey = (): { rootNode: NodeData; localizations: Record<string, Record<string, string>> } => {
  const pageId = createId();
  const textInputId = createId();
  const radioId = createId();
  const checkboxId = createId();

  return {
    rootNode: {
      type: "section",
      name: "Basic Survey",
      uuid: createId(),
      items: [
        {
          type: "set",
          name: "Introduction Page",
          uuid: pageId,
          items: [
            {
              type: "markdown",
              uuid: createId(),
              text: "# Welcome to the Survey\nThis is a basic survey example showcasing the core features."
            },
            {
              type: "textfield",
              uuid: textInputId,
              fieldName: "name",
              label: "What is your name?",
              placeholder: "Type your name here",
              description: "Please enter your full name"
            },
            {
              type: "radio",
              uuid: radioId,
              fieldName: "experience",
              label: "How experienced are you with surveys?",
              description: "Select one option",
              labels: ["Beginner", "Intermediate", "Advanced", "Expert"],
              values: ["beginner", "intermediate", "advanced", "expert"]
            },
            {
              type: "checkbox",
              uuid: checkboxId,
              fieldName: "interests",
              label: "What topics are you interested in?",
              description: "Select all that apply",
              labels: ["Technology", "Science", "Arts", "Sports", "Health"],
              values: ["tech", "science", "arts", "sports", "health"]
            }
          ]
        }
      ],
      navigationLogic: "return 0;",
      entryLogic: "",
      exitLogic: "",
      backLogic: ""
    },
    localizations: {
      en: {}
    }
  };
};

// Complex Survey Example with all block types
const createComplexSurvey = (): { rootNode: NodeData; localizations: Record<string, Record<string, string>> } => {
  const section1Id = createId();
  const page1Id = createId();
  const page2Id = createId();
  const page3Id = createId();

  return {
    rootNode: {
      type: "section",
      name: "Comprehensive Survey",
      uuid: section1Id,
      items: [
        // Page 1 - Basic Inputs
        {
          type: "set",
          name: "Basic Information",
          uuid: page1Id,
          items: [
            {
              type: "markdown",
              uuid: createId(),
              text: "# User Information\nPlease provide your basic details."
            },
            {
              type: "textfield",
              uuid: createId(),
              fieldName: "fullName",
              label: "Full Name",
              placeholder: "John Doe",
              description: "Enter your full name as it appears on official documents"
            },
            {
              type: "textfield",
              uuid: createId(),
              fieldName: "email",
              label: "Email Address",
              placeholder: "johndoe@example.com",
              description: "We'll never share your email with anyone else"
            },
            {
              type: "radio",
              uuid: createId(),
              fieldName: "gender",
              label: "Gender",
              description: "Select your gender",
              labels: ["Male", "Female", "Non-binary", "Prefer not to say"],
              values: ["male", "female", "non-binary", "no-answer"]
            }
          ]
        },
        // Page 2 - Advanced Inputs
        {
          type: "set",
          name: "Preferences",
          uuid: page2Id,
          items: [
            {
              type: "markdown",
              uuid: createId(),
              text: "# Your Preferences\nTell us about your preferences and interests."
            },
            {
              type: "select",
              uuid: createId(),
              fieldName: "country",
              label: "Country of Residence",
              placeholder: "Select your country",
              labels: ["United States", "Canada", "United Kingdom", "Australia", "Other"],
              values: ["us", "ca", "uk", "au", "other"]
            },
            {
              type: "range",
              uuid: createId(),
              fieldName: "satisfaction",
              label: "How satisfied are you with our service?",
              description: "Drag the slider to indicate your level of satisfaction",
              min: 0,
              max: 10,
              step: 1,
              defaultValue: 5
            },
            {
              type: "datepicker",
              uuid: createId(),
              fieldName: "birthdate",
              label: "Date of Birth",
              description: "Select your date of birth"
            },
            {
              type: "checkbox",
              uuid: createId(),
              fieldName: "interests",
              label: "What are your interests?",
              description: "Select all that apply",
              labels: ["Technology", "Science", "Arts & Culture", "Travel", "Food & Cooking", "Sports & Fitness"],
              values: ["tech", "science", "arts", "travel", "food", "sports"]
            }
          ]
        },
        // Page 3 - Special Inputs
        {
          type: "set",
          name: "Additional Information",
          uuid: page3Id,
          items: [
            {
              type: "markdown",
              uuid: createId(),
              text: "# Additional Information\nJust a few more questions to complete the survey."
            },
            {
              type: "textarea",
              uuid: createId(),
              fieldName: "feedback",
              label: "Please provide any additional feedback",
              placeholder: "Type your thoughts here...",
              rows: 5
            },
            {
              type: "html",
              uuid: createId(),
              html: "<div class='p-3 bg-blue-50 border border-blue-200 rounded-md'><p class='text-blue-600 font-medium'>Important Notice</p><p>Your responses will be processed according to our privacy policy.</p></div>"
            },
            {
              type: "matrix",
              uuid: createId(),
              fieldName: "satisfaction_matrix",
              label: "How would you rate the following aspects of our service?",
              description: "Select one option for each row",
              rows: ["Customer Support", "Product Quality", "Website Usability", "Value for Money"],
              columns: ["Poor", "Fair", "Good", "Excellent"],
              values: ["poor", "fair", "good", "excellent"]
            },
            {
              type: "fileupload",
              uuid: createId(),
              fieldName: "document",
              label: "Upload a profile photo (optional)",
              description: "Accepted formats: JPG, PNG (max 5MB)",
              accept: "image/jpeg,image/png",
              maxSize: 5 * 1024 * 1024
            }
          ]
        }
      ],
      navigationLogic: "return 0;",
      entryLogic: "",
      exitLogic: "console.log('Survey completed!')",
      backLogic: ""
    },
    localizations: {
      en: {}
    }
  };
};

// Branching Logic Survey Example
const createBranchingSurvey = (): { rootNode: NodeData; localizations: Record<string, Record<string, string>> } => {
  const mainSectionId = createId();
  const introPageId = createId();
  const userTypeQuestionId = createId();

  const businessSectionId = createId();
  const businessInfoPageId = createId();
  const businessSizeQuestionId = createId();

  const personalSectionId = createId();
  const personalInfoPageId = createId();

  const finalPageId = createId();

  return {
    rootNode: {
      type: "section",
      name: "Survey with Branching Logic",
      uuid: mainSectionId,
      items: [
        // Introduction page
        {
          type: "set",
          name: "Introduction",
          uuid: introPageId,
          items: [
            {
              type: "markdown",
              uuid: createId(),
              text: "# Welcome to our Branching Survey\nThis survey will adapt based on your responses."
            },
            {
              type: "radio",
              uuid: userTypeQuestionId,
              fieldName: "userType",
              label: "Are you using our product for:",
              description: "Select one option",
              labels: ["Business purposes", "Personal use"],
              values: ["business", "personal"]
            }
          ]
        },
        // Final thank you page
        {
          type: "set",
          name: "Thank You",
          uuid: finalPageId,
          items: [
            {
              type: "markdown",
              uuid: createId(),
              text: "# Thank You!\nWe appreciate you taking the time to complete this survey."
            },
            {
              type: "html",
              uuid: createId(),
              html: "<div class='p-4 bg-green-50 border border-green-200 rounded-md'><p class='text-green-600 font-medium'>Survey Completed</p><p>Your responses have been recorded.</p></div>"
            }
          ]
        }
      ],
      nodes: [
        // Business branch
        {
          type: "section",
          name: "Business Questions",
          uuid: businessSectionId,
          items: [
            {
              type: "set",
              name: "Business Information",
              uuid: businessInfoPageId,
              items: [
                {
                  type: "markdown",
                  uuid: createId(),
                  text: "# Business Information\nPlease provide details about your business."
                },
                {
                  type: "textfield",
                  uuid: createId(),
                  fieldName: "companyName",
                  label: "Company Name",
                  placeholder: "Acme Inc."
                },
                {
                  type: "select",
                  uuid: createId(),
                  fieldName: "industry",
                  label: "Industry",
                  labels: ["Technology", "Healthcare", "Education", "Finance", "Retail", "Manufacturing", "Other"],
                  values: ["tech", "healthcare", "education", "finance", "retail", "manufacturing", "other"]
                },
                {
                  type: "radio",
                  uuid: businessSizeQuestionId,
                  fieldName: "companySize",
                  label: "Company Size",
                  labels: ["1-10 employees", "11-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees"],
                  values: ["tiny", "small", "medium", "large", "enterprise"]
                }
              ]
            }
          ],
          navigationLogic: "return 0;",
          entryLogic: "console.log('Entered business section');",
          exitLogic: ""
        },
        // Personal branch
        {
          type: "section",
          name: "Personal Questions",
          uuid: personalSectionId,
          items: [
            {
              type: "set",
              name: "Personal Information",
              uuid: personalInfoPageId,
              items: [
                {
                  type: "markdown",
                  uuid: createId(),
                  text: "# Personal Information\nPlease provide some details about your personal use."
                },
                {
                  type: "textfield",
                  uuid: createId(),
                  fieldName: "name",
                  label: "Your Name",
                  placeholder: "John Doe"
                },
                {
                  type: "checkbox",
                  uuid: createId(),
                  fieldName: "usageGoals",
                  label: "What do you use our product for?",
                  description: "Select all that apply",
                  labels: ["Learning", "Productivity", "Entertainment", "Organization", "Communication"],
                  values: ["learning", "productivity", "entertainment", "organization", "communication"]
                },
                {
                  type: "range",
                  uuid: createId(),
                  fieldName: "usageFrequency",
                  label: "How often do you use our product?",
                  description: "1 = Rarely, 10 = Daily",
                  min: 1,
                  max: 10,
                  step: 1,
                  defaultValue: 5
                }
              ]
            }
          ],
          navigationLogic: "return 0;",
          entryLogic: "console.log('Entered personal section');",
          exitLogic: ""
        }
      ],
      // Main section navigation logic
      navigationLogic: `// Check the user type response to determine which section to show
const userType = formData.userType;

if (userType === 'business') {
  // Navigate to business section
  return 1;
} else if (userType === 'personal') {
  // Navigate to personal section
  return 2;
} else {
  // Stay on the introduction page if no selection made
  return 0;
}`,
      entryLogic: "",
      exitLogic: "console.log('Main section completed')",
      backLogic: ""
    },
    localizations: {
      en: {}
    }
  };
};

// Localization Survey Example
const createLocalizationSurvey = (): { rootNode: NodeData; localizations: Record<string, Record<string, string>> } => {
  const sectionId = createId();
  const pageId = createId();
  const titleId = createId();
  const nameFieldId = createId();
  const feedbackFieldId = createId();

  return {
    rootNode: {
      type: "section",
      name: "Multilingual Survey",
      uuid: sectionId,
      items: [
        {
          type: "set",
          name: "Feedback Form",
          uuid: pageId,
          items: [
            {
              type: "markdown",
              uuid: titleId,
              text: "# Customer Feedback Form\nPlease share your thoughts with us."
            },
            {
              type: "textfield",
              uuid: nameFieldId,
              fieldName: "name",
              label: "Your Name",
              placeholder: "Enter your name",
              description: "Your name will be kept confidential"
            },
            {
              type: "textarea",
              uuid: feedbackFieldId,
              fieldName: "feedback",
              label: "Your Feedback",
              placeholder: "Please share your experience with our service",
              rows: 5
            }
          ]
        }
      ],
      navigationLogic: "return 0;",
      entryLogic: "",
      exitLogic: "",
      backLogic: ""
    },
    localizations: {
      en: {
        // English (default)
        [titleId]: "# Customer Feedback Form\nPlease share your thoughts with us.",
        [nameFieldId + ".label"]: "Your Name",
        [nameFieldId + ".placeholder"]: "Enter your name",
        [nameFieldId + ".description"]: "Your name will be kept confidential",
        [feedbackFieldId + ".label"]: "Your Feedback",
        [feedbackFieldId + ".placeholder"]: "Please share your experience with our service"
      },
      es: {
        // Spanish
        [titleId]: "# Formulario de Comentarios del Cliente\nPor favor comparta sus opiniones con nosotros.",
        [nameFieldId + ".label"]: "Su Nombre",
        [nameFieldId + ".placeholder"]: "Ingrese su nombre",
        [nameFieldId + ".description"]: "Su nombre se mantendrá confidencial",
        [feedbackFieldId + ".label"]: "Sus Comentarios",
        [feedbackFieldId + ".placeholder"]: "Por favor comparta su experiencia con nuestro servicio"
      },
      fr: {
        // French
        [titleId]: "# Formulaire de Commentaires Client\nVeuillez partager vos impressions avec nous.",
        [nameFieldId + ".label"]: "Votre Nom",
        [nameFieldId + ".placeholder"]: "Entrez votre nom",
        [nameFieldId + ".description"]: "Votre nom restera confidentiel",
        [feedbackFieldId + ".label"]: "Vos Commentaires",
        [feedbackFieldId + ".placeholder"]: "Veuillez partager votre expérience avec notre service"
      },
      de: {
        // German
        [titleId]: "# Kundenfeedback-Formular\nBitte teilen Sie uns Ihre Gedanken mit.",
        [nameFieldId + ".label"]: "Ihr Name",
        [nameFieldId + ".placeholder"]: "Geben Sie Ihren Namen ein",
        [nameFieldId + ".description"]: "Ihr Name wird vertraulich behandelt",
        [feedbackFieldId + ".label"]: "Ihr Feedback",
        [feedbackFieldId + ".placeholder"]: "Bitte teilen Sie Ihre Erfahrung mit unserem Service"
      }
    }
  };
};

// Export all demo surveys
export const DemoSurveys: Record<string, { rootNode: NodeData; localizations: Record<string, Record<string, string>> }> = {
  basic: createBasicSurvey(),
  complex: createComplexSurvey(),
  branching: createBranchingSurvey(),
  localization: createLocalizationSurvey()
};
