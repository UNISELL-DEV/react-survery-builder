export const sampleIntake = {
  rootNode: {
    type: 'section',
    name: 'EMR Treatment Enrollment',
    uuid: 'emr-demo-root',
    items: [
      {
        type: 'AuthInformation',
        fieldName: 'AuthInformation',
        required: true,
        title: 'How can you be reached if necessary?',
        description:
          'Our medical teams and pharmacy use email and text for patient communication.',
        emailLabel: 'Email',
        phoneLabel: 'Phone Number',
        privacyText:
          'I understand that my information is never shared, is protected by HIPAA and agree to the terms and privacy policies and to be contacted as necessary by our platform and its medical partners and can opt-out at anytime.',
        emailRequiredError: 'Email is required',
        emailInvalidError: 'Please enter a valid email address',
        phoneRequiredError: 'Phone number is required',
        phoneInvalidError: 'Please enter a valid 10-digit phone number',
        privacyRequiredError: 'You must agree to continue',
        uuid: '5b33c080-fa1a-4b00-b903-5e3acf88bd3f',
      },
      {
        type: 'verificationInformation',
        fieldName: 'verification',
        authMethod: 'otp',
        emailKey: 'AuthInformation.email',
        phoneKey: 'AuthInformation.phone',
        authField: 'email',
        storageKeyIdentifier: '',
        skipIfLoggedIn: false,
        required: true,
        uuid: 'b82a6af7-a48f-40da-a15c-1666095c589b',
        navigationRules: [],
        showContinueButton: false,
      },
      {
        type: 'bmiInformation',
        title: "Let's record",
        titleHighlight: 'your vitals.',
        fieldName: 'vitals',
        description:
          'Your vital signs help us provide personalized care recommendations.',
        vitals: ['height', 'weight'],
        showBmiChart: true,
        heightLabel: 'Height',
        weightLabel: 'Weight (lbs)',
        systolicLabel: 'Systolic (mmHg)',
        diastolicLabel: 'Diastolic (mmHg)',
        pulseLabel: 'Heart Rate (bpm)',
        temperatureLabel: 'Temperature (°F)',
        oxygenSaturationLabel: 'O₂ Saturation (%)',
        uuid: 'aee67a86-37b9-4dab-9413-076cc3dd0d20',
      },
      {
        type: 'variant-selection',
        fieldName: 'selectedVariation',
        showPricing: true,
        showTitrationPhases: true,
        showDrugDetails: true,
        showImages: true,
        required: true,
        uuid: '4c06518d-adea-4285-8ca6-416c794bdda0',
      },
      {
        type: 'unifiedCheckout',
        fieldName: 'unifiedCheckout',
        title: 'Complete Your Order',
        showOrderSummary: true,
        showContactInfo: true,
        collectPhone: true,
        showAddress: true,
        allowSavedAddresses: true,
        uuid: 'afa590e8-b039-4624-8884-12280701b815',
        navigationRules: [],
        showContinueButton: false,
      },
    ],
  },
  localizations: {
    en: {},
  },
  theme: {
    card: 'bg-white rounded-none border-0 border-slate-100 shadow-none p-0 mb-6',
    name: 'uniloop',
    field: {
      file: 'w-full text-base text-gray-700 border border-gray-300 rounded-3xl cursor-pointer bg-white px-5 py-4 hover:border-[#948EC47F] transition-colors',
      text: 'text-gray-900',
      error: 'mt-2 text-sm text-red-600 text-start',
      input:
        'text-base text-[#1C1C1C] bg-white rounded-3xl border border-[#1C1C1C1F] px-5 py-4 w-full focus:border-[#948EC4] focus:ring-0 focus:outline-none hover:border-[#948EC47F] transition-colors placeholder:font-medium placeholder:-tracking-[1%] min-h-[64px] shadow-none placeholder:text-[#1C1C1CB2] ring-0',
      label: 'text-base font-semibold text-[#1C1C1C] mb-0 block relative',
      radio:
        'text-[#1C1C1C] border-[#1C1C1C1F] px-5 py-4 mb-4 transition-colors focus:border-[#948EC4] focus:ring-0 hover:border-[#948EC4] h-4 w-4 shadow-none',
      range: 'accent-[#E67E4D]',
      matrix: 'border-collapse w-full text-base rounded-3xl overflow-hidden',
      select:
        'text-base text-[#1C1C1C] bg-white rounded-3xl border border-[#1C1C1C1F] min-h-[64px] px-5 py-4 w-full focus:border-[#948EC4] focus:ring-0 hover:border-[#948EC47F] transition-colors shadow-none placeholder:text-[#1C1C1CB2] ring-0 data-[placeholder]:text-base data-[placeholder]:sm:text-sm data-[placeholder]:text-[#1C1C1CB2]',
      checkbox:
        'text-[#1C1C1C] rounded border border-[#1C1C1C1F] focus:ring-0 h-[1.75rem] w-[1.75rem] !bg-white rounded-full shadow-none',
      textarea:
        'h-[120px] w-full text-base bg-white rounded-3xl border border-[#1C1C1C1F] px-5 py-4 focus:border-[#948EC4] focus:ring-0 hover:border-[#948EC47F] focus:outline-none transition-colors placeholder:font-medium placeholder:-tracking-[1%] shadow-none placeholder:text-[#1C1C1CB2] ring-0',
      boxBorder: 'border-gray-300',
      activeText: 'text-[#E67E4D]',
      description: 'mt-2 text-sm text-gray-600 text-start',
      placeholder: 'text-gray-500',
      selectableBox:
        'px-5 py-4 n-all duration-200 cursor-pointer rounded-3xl text-left',
      agreementPanel:
        'rounded-3xl border border-gray-300 px-5 py-4 text-base whitespace-pre-wrap bg-white hover:border-[#948EC47F] transition-colors',
      signatureColor: '#E67E4D',
      signatureCanvas:
        'w-full h-40 border border-gray-300 rounded-3xl overflow-hidden bg-white hover:border-[#948EC47F] transition-colors',
      selectableBoxText: 'text-gray-900 text-base font-normal',
      agreementContainer: 'px-5 py-4 space-y-4',
      selectableBoxFocus: 'focus-within:ring-0 focus-within:border-[#948EC4]',
      selectableBoxHover: 'hover:border-[#948EC47F]',
      selectableBoxDefault:
        'border border-gray-300 bg-white hover:border-[#948EC47F]',
      selectableBoxDisabled: 'opacity-50 cursor-not-allowed',
      selectableBoxSelected: 'border-2 border-[#948EC4] bg-white',
      selectableBoxContainer: 'space-y-4 max-w-full w-full mx-auto',
      selectableBoxIndicator: 'bg-[#E67E4D] text-white',
      selectableBoxTextSelected: 'text-gray-900 font-normal',
      selectableBoxIndicatorIcon: 'text-white',
    },
    fonts: {
      body: 'Manrope, sans-serif',
      urls: [
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap',
        'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap',
      ],
      heading: 'DM Sans, sans-serif',
      primary: 'Manrope, sans-serif',
    },
    title:
      'font-normal text-[1.25rem] text-center text-[#1C1C1C] -tracking-[4%] sm:text-[2rem]',
    button: {
      text: 'text-base font-medium text-[#948EC4] hover:text-[#948EC4]',
      primary:
        'w-full bg-[#1C1C1C] hover:bg-[#1E1E1E] justify-center rounded-full px-8 py-4 sm:px-10 sm:py-5 text-white font-semibold text-sm sm:text-base transition-all duration-200 focus:outline-none',
      secondary:
        'inline-flex justify-center py-3 px-8 border border-[#1C1C1C1F] text-base font-medium rounded-full bg-white hover:bg-neutral-200 text-[#1C1C1C] focus:outline-none focus:ring-0 transition-colors',
      navigation:
        'text-base font-normal bg-[#000000] rounded-full hover:bg-[#000000] py-3 px-8 inline-flex justify-center text-white fixed bottom-1 sm:bottom-4 3xl:bottom-12 sm:left-0 sm:right-0',
    },
    colors: {
      text: '#1C1C1C',
      error: '#FF0000',
      accent: '#00B67A',
      border: '#1C1C1C1F',
      primary: '#948EC4',
      success: '#10B981',
      secondary: '#DC9EA8',
      background: '#FAFAFA',
    },
    header: 'mb-8 text-start',
    progress: {
      bar: '',
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
      activeBorder: 'border-[#948EC4]',
    },
    background: 'bg-white',
    description:
      'text-base font-medium text-center text-[#1C1C1C] sm:text-lg -tracking-[1%]',
    containerLayout: 'w-full max-w-4xl flex-1 mx-auto h-full min-h-screen',
  },
};
