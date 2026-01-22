// Example survey data from the builder
export const sampleSurvey = {
  rootNode: {
    name: 'Metabolic Enhancement Questionnaire',
    type: 'section',
    uuid: 'ee8c7a71-2916-428a-9ada-29bd783e595c',
    items: [
      {
        type: 'bmiCalculator',
        label: 'BMI Calculator',
        description: 'Calculate your Body Mass Index',
        fieldName: 'bmiResult',
        defaultUnit: 'metric',
        showResults: false,
        theme: 'default',
        className: '',
      },
      {
        type: 'selectablebox',
        uuid: '8c88c661-f4a7-4f4a-89ea-f01aff367163',
        label: 'Do you suffer from any of these medical conditions?',
        options: [
          {
            id: 'a53670c5-bb0a-4832-ac33-f97d3f2e66bd',
            label: 'Heart disease',
            value: '3db8d4d8',
          },
          {
            id: '02a06578-96ea-483a-8fbe-92265a66b06a',
            label: 'High blood pressure',
            value: '2995e42f',
          },
          {
            id: 'f29d0ebc-4a25-4dda-9b6d-d60040be2c9a',
            label: 'Diabetes',
            value: 'a230dd2c',
          },
          {
            id: 'fe0e68c9-e354-40a1-97d2-424383a1bff9',
            label: 'Thyroid disorders',
            value: '0d88b461',
          },
          {
            id: 'c2508d0c-7f97-4107-8c74-5e083f97f4b0',
            label: 'Kidney disease',
            value: '319bb779',
          },
          {
            id: '0b72185f-384b-473a-a311-27b74f769f42',
            label: 'Liver disease',
            value: 'bb5551a8',
          },
          {
            id: '00a8c46a-ae78-4235-82d5-bcc3c409f49b',
            label: 'Cancer',
            value: 'c6f94c86',
          },
          {
            id: 'ad458dab-9e68-41e8-b8a1-d533e134c241',
            label: 'Autoimmune disorders',
            value: '8da66551',
          },
          {
            id: 'f4168dc2-55c4-4f3b-81aa-309b0efe4169',
            label: 'Blood clotting disorders',
            value: 'f0c5b7ae',
          },
          {
            id: '0d9770ca-246f-44a5-8d06-16900f2818b6',
            label: 'none of the above',
            value: 'f0c5b7apo',
          },
        ],
        fieldName: 'selectablebox_f9c984',
        boxSpacing: '4',
        description: 'please select all that apply',
        multiSelect: true,
        telegraData: [
          {
            id: '17677262345286',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777428',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-1',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
          {
            value: 'c6f94c86',
            message: '(Cancer is a disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "c6f94c86"',
          },
        ],
        showContinueButton: true,
        autoContinueOnSelect: false,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: '7f3864c3-b386-4f45-b379-61966282d4ff',
        label: 'How often do you engage in physical activity or exercise?',
        options: [
          {
            id: '60e0f013-68df-4dfd-8bcc-128835f7f903',
            label: 'Rarely',
            value: '83aa5807',
          },
          {
            id: '510be8e8-cd1a-4bdb-9bde-31229cfb77f0',
            label: 'Occasionally',
            value: '9a79f2bd',
          },
          {
            id: '2b4c3ec3-0e9a-4d8b-8e36-bfc9821e1582',
            label: 'Regularly',
            value: '94f63637',
          },
        ],
        fieldName: 'selectablebox_190498',
        boxSpacing: '4',
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345286',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777428',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-2',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: 'fd579e56-a0f2-4c2d-ab21-d0462f2fd817',
        label: 'How would you rate your stress levels?',
        options: [
          {
            id: 'af10e7c7-7f94-40e1-bc90-6f4d4ced8e56',
            label: 'Low',
            value: 'c055298e',
          },
          {
            id: '936b3adc-67de-45bf-a094-0a8457e71388',
            label: 'Moderate',
            value: 'cba4c189',
          },
          {
            id: '19f3cb86-a2f6-45cc-968d-07dfb57873f6',
            label: 'High',
            value: 'ffeaaf5f',
          },
        ],
        fieldName: 'selectablebox_94f53d',
        boxSpacing: '4',
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345286',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777428',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-3',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: '496fcb25-7eee-43ac-b919-22d0348cafdc',
        label: 'How many hours of sleep do you typically get per night?',
        options: [
          {
            id: 'baf1ca60-268f-4203-9a3e-28dcb1d08c78',
            label: 'Less than 6 hours',
            value: '9bef07c9',
          },
          {
            id: '5d3576a5-b591-4f90-8a69-d2ae06f7a432',
            label: '6-8 hours',
            value: 'bdf12e98',
          },
          {
            id: '7cb50465-ce2f-4c1f-b259-41b1c0021255',
            label: 'More than 8 hours',
            value: 'e93e07ad',
          },
        ],
        fieldName: 'selectablebox_49b018',
        boxSpacing: '4',
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345287',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777429',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-4',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: '7878a067-c354-4c4a-85d3-dfc4502a370f',
        label:
          'Are you currently following any specific diet or nutritional plan?',
        options: [
          {
            id: '58260b10-2af4-48ea-8a49-2e32b33ba3a8',
            label: 'Yes',
            value: '98ff198b',
          },
          {
            id: 'ef58ed20-637e-4c1b-95b6-6f206f752da7',
            label: 'No',
            value: '3209326c',
          },
        ],
        fieldName: 'selectablebox_071af2',
        boxSpacing: '4',
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345287',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777429',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-5',
          },
        ],
        defaultValue: '',
        navigationRules: [
          {
            target: 'f62935d6-36b9-4b85-ac85-1123fc5005ad',
            condition: 'selectablebox_071af2 == "98ff198b"',
          },
          {
            target: 'd88d0afe-f87d-44ab-a7f0-fa96c1ef9ef9',
            condition: 'selectablebox_071af2 == "3209326c"',
          },
        ],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: 'f62935d6-36b9-4b85-ac85-1123fc5005ad',
        label: 'Select which of the plans you are following:',
        options: [
          {
            id: '5a7ab15f-d3b4-493d-bca7-32e47a9ebd57',
            label: 'Gluten free',
            value: '2a0899e1',
          },
          {
            id: 'b5c02aac-8d9e-46fa-838d-dd98ad01524e',
            label: 'Vegetarian',
            value: '9687cf25',
          },
          {
            id: '90f7bbb5-1b90-4211-a0a9-d1bb7df70893',
            label: 'Vegan',
            value: '3c385b34',
          },
          {
            id: '0ccaf986-a947-41eb-ae75-f6664757346a',
            label: 'Pescatarian',
            value: '1e4af57a',
          },
          {
            id: '758d1620-3170-4cec-b7fd-7f19fa43bc14',
            label: 'Halal',
            value: '2a2665c1',
          },
          {
            id: '193504fe-35e0-4d12-9c1d-de3c47f01929',
            label: 'Kosher',
            value: '489ad2b0',
          },
          {
            id: '4554efe8-eb8a-4a2a-a7a7-a15692d991eb',
            label: 'Low-sodium',
            value: '8a259377',
          },
          {
            id: '4982d417-a440-4fde-9179-f82cc418646f',
            label: 'Other',
            value: '3256820c',
          },
          {
            id: 'de0515f6-84ff-443a-b0d7-16fcc76d7643',
            label: 'None of the above',
            value: '59068d15',
          },
        ],
        fieldName: 'selectablebox_113932',
        boxSpacing: '4',
        description: '',
        multiSelect: true,
        telegraData: [
          {
            id: '17677262345287',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777429',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-5-1',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: true,
        autoContinueOnSelect: false,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: 'd88d0afe-f87d-44ab-a7f0-fa96c1ef9ef9',
        label:
          'Do you smoke or have a history of smoking including cigarettes, cigars, vapes, or any other tobacco products?',
        options: [
          {
            id: '7a2bc634-43b1-40b8-bae5-4f55f860e9a4',
            label: 'Yes',
            value: '6ae5cd7e',
          },
          {
            id: '00ede8cd-345f-4d8f-b4d2-9b4eb112251c',
            label: 'No',
            value: '06f51ffd',
          },
        ],
        fieldName: 'selectablebox_3dcf6d',
        boxSpacing: '4',
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345287',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777429',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-6',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: 'd977f8ee-3ba8-4bb9-ad2b-3ffcc0a63f7d',
        label: 'Do you use or have a history of using any illicit substances?',
        options: [
          {
            id: 'cc628ddb-6550-4731-9ce9-3bd1db4a160f',
            label: 'Marijuana',
            value: 'a2c8f256',
          },
          {
            id: 'c794d727-c117-4082-9a9c-143c01f02d54',
            label: 'Methamphetamine',
            value: 'd8f4b76c',
          },
          {
            id: '2891a141-879f-409f-95eb-5373512736c4',
            label: 'Cocaine',
            value: '0d91aee2',
          },
          {
            id: 'ac042f4b-48c8-46d5-8d38-5cf7d14b77fa',
            label: 'Heroin',
            value: 'e7dec91d',
          },
          {
            id: '24226e21-7a00-459b-beeb-d960ca4047ae',
            label: 'Other',
            value: '16784171',
          },
          {
            id: '4da023ab-fc11-4b0a-b61e-ff0eed306e93',
            label: 'None of the above',
            value: '3e16784171',
          },
        ],
        fieldName: 'selectablebox_81a3ba',
        boxSpacing: '4',
        description: '',
        multiSelect: true,
        telegraData: [
          {
            id: '17677262345287',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777429',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-7',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
          {
            value: 'd8f4b76c',
            message: '(Disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "d8f4b76c"',
          },
          {
            value: '0d91aee2',
            message: '(Disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "0d91aee2"',
          },
          {
            value: 'e7dec91d',
            message: '(Disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "e7dec91d"',
          },
        ],
        showContinueButton: true,
        autoContinueOnSelect: false,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: 'eedb90bb-043c-4754-831e-b5639c62b339',
        label: 'How much alcohol do you drink?',
        options: [
          {
            id: 'f5287862-6e84-4b84-9cb6-9ff93a8be2ad',
            label: '3+ drinks per day',
            value: 'bc3de5b0',
          },
          {
            id: '44769d71-83f3-44a2-b590-d7af8b713948',
            label: '1-2 drinks per day',
            value: '29a68f57',
          },
          {
            id: '84c61675-08cd-4a27-a46b-252d543779e2',
            label: '1-2 drinks per week',
            value: 'a78185fb',
          },
          {
            id: '7761b486-c7f2-4578-a477-074f5c048471',
            label: '3-5 drinks per week',
            value: 'c99588c8',
          },
          {
            id: '4157fa79-1476-482e-bd1e-b0704ea142ef',
            label: 'None',
            value: '1f530fff',
          },
        ],
        fieldName: 'selectablebox_4fd74b',
        boxSpacing: '4',
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345288',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777430',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-8',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
      {
        type: 'selectablebox',
        uuid: '61829097-cf43-4304-a97a-999274157027',
        label: 'Are you currently?',
        options: [
          {
            id: '742ef36e-bc5b-4878-a15c-dcec949dc801',
            label: 'Pregnant',
            value: '79566778',
          },
          {
            id: 'c2778417-26b7-4b16-9c6f-5bdbe64a9713',
            label: 'Planning to become pregnant',
            value: '82757da7',
          },
          {
            id: 'da1df430-70b1-4e35-ba96-786ce3cae7b0',
            label: 'None of the above',
            value: '4ad305b7',
          },
        ],
        fieldName: 'selectablebox_6baa17',
        boxSpacing: '4',
        isEndBlock: true,
        description: '',
        multiSelect: false,
        telegraData: [
          {
            id: '17677262345288',
            key: 'telegra-questionnaire-id',
            value: 'quest::5357d733-e746-49c8-9b38-505a103af512',
          },
          {
            id: '17677255777430',
            key: 'telegra-question-location',
            value: 'loc::metabolic-enhancement-9',
          },
        ],
        defaultValue: '',
        navigationRules: [],
        validationRules: [
          {
            message: 'This field is required',
            operator: 'isNotEmpty',
            severity: 'error',
          },
          {
            value: '79566778',
            message: '(Pregnancy is a disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "79566778"',
          },
          {
            value: '82757da7',
            message: '(Pregnancy is a disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "82757da7"',
          },
          {
            value: 'd24c914b',
            message: '(Breastfeeding is a disqualifier for treatment)',
            operator: '!=',
            severity: 'error',
            showWhen: 'value == "d24c914b"',
          },
        ],
        showContinueButton: false,
        autoContinueOnSelect: true,
        showSelectionIndicator: false,
      },
    ],
    backLogic: '',
    exitLogic: '',
    entryLogic: '',
    navigationLogic: 'return 0;',
  },
  localizations: {
    en: [],
  },
  theme: {
    card: 'bg-white rounded-none border-0 border-slate-100 shadow-none p-0 mb-6',
    name: 'Viv Rx Default',
    field: {
      file: 'w-full text-base text-gray-700 border border-gray-300 rounded-xl cursor-pointer bg-white py-4 px-5 hover:border-[#E67E4D]/50 transition-colors',
      text: 'text-gray-900',
      error: 'mt-2 text-sm text-red-600 text-start',
      input:
        'w-full rounded-xl border border-gray-300 focus:border-[#E67E4D] focus:ring-0 text-base py-4 px-5 bg-white hover:border-[#E67E4D]/50 transition-colors',
      label: 'block text-xl font-normal text-gray-900 mb-6 text-start',
      radio: 'focus:ring-0 h-4 w-4 text-[#E67E4D] border-gray-300',
      range: 'accent-[#E67E4D]',
      matrix: 'border-collapse w-full text-base rounded-xl overflow-hidden',
      select:
        'w-full rounded-xl border border-gray-300 focus:border-[#E67E4D] focus:ring-0 text-base py-4 px-5 bg-white hover:border-[#E67E4D]/50 transition-colors',
      checkbox: 'focus:ring-0 h-4 w-4 text-[#E67E4D] border-gray-300 rounded',
      textarea:
        'w-full rounded-xl border border-gray-300 focus:border-[#E67E4D] focus:ring-0 text-base py-4 px-5 bg-white hover:border-[#E67E4D]/50 transition-colors',
      boxBorder: 'border-gray-300',
      activeText: 'text-[#E67E4D]',
      description: 'mt-2 text-sm text-gray-600 text-start',
      placeholder: 'text-gray-500',
      selectableBox:
        'py-4 px-5 transition-all duration-200 cursor-pointer rounded-xl text-left',
      agreementPanel:
        'rounded-xl border border-gray-300 p-4 text-base whitespace-pre-wrap bg-white hover:border-[#E67E4D]/50 transition-colors',
      signatureColor: '#E67E4D',
      signatureCanvas:
        'w-full h-40 border border-gray-300 rounded-xl overflow-hidden bg-white hover:border-[#E67E4D]/50 transition-colors',
      selectableBoxText: 'text-gray-900 text-base font-normal',
      agreementContainer: 'p-5 space-y-4',
      selectableBoxFocus: 'focus-within:ring-0 focus-within:border-[#E67E4D]',
      selectableBoxHover: 'hover:border-[#E67E4D]/50',
      selectableBoxDefault:
        'border border-gray-300 bg-white hover:border-[#E67E4D]/50',
      selectableBoxDisabled: 'opacity-50 cursor-not-allowed',
      selectableBoxSelected: 'border-2 border-[#E67E4D] bg-white',
      selectableBoxContainer: 'space-y-4 max-w-xl mx-auto',
      selectableBoxIndicator: 'bg-[#E67E4D] text-white',
      selectableBoxTextSelected: 'text-gray-900 font-normal',
      selectableBoxIndicatorIcon: 'text-white',
    },
    title: 'text-2xl font-normal text-gray-900 mb-8 text-start',
    button: {
      text: 'text-base font-medium text-[#E67E4D] hover:text-[#D86B3C]',
      primary:
        'inline-flex justify-center py-3 px-8 text-base font-medium rounded-full text-white bg-[#E67E4D] hover:bg-[#D86B3C] focus:outline-none focus:ring-0 transition-colors',
      secondary:
        'inline-flex justify-center py-3 px-8 border border-gray-300 text-base font-medium rounded-full text-gray-900 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-[#E67E4D]/50 focus:outline-none focus:ring-0 transition-colors',
      navigation:
        'inline-flex items-center px-8 py-3 text-base font-medium rounded-full text-white bg-[#E67E4D] hover:bg-[#D86B3C] focus:outline-none focus:ring-0 transition-colors',
    },
    colors: {
      text: '#111827',
      error: '#EF4444',
      accent: '#D86B3C',
      border: '#D1D5DB',
      primary: '#E67E4D',
      success: '#10B981',
      secondary: '#6B7280',
      background: '#FFFFFF',
    },
    header: 'mb-8 text-start',
    progress: {
      bar: 'h-2 bg-[#E67E4D] rounded-full overflow-hidden',
      dots: 'flex space-x-2 justify-center',
      label: 'text-sm text-gray-600 mb-2',
      numbers: 'flex space-x-2 justify-center',
      percentage: 'text-right text-sm text-gray-600 mb-2',
    },
    container: {
      card: 'bg-white',
      border: 'border-gray-300',
      header: 'bg-white',
      activeBg: 'bg-white',
      activeBorder: 'border-[#E67E4D]',
    },
    background: 'bg-white',
    description: 'text-base text-gray-600 mb-6 text-start',
    containerLayout: 'max-w-2xl mx-auto',
  },
};
