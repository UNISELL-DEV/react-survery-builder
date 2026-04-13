// ============================================================================
// Unified Class Wrapper
// ============================================================================

import { AnalyticsManager } from '@/lib/analytics';
import {
  Address as AddressType,
  ApplicableCoupon,
  CheckoutData as CheckoutDataType,
  CheckoutPatientInfo as CheckoutPatientInfoType,
  CheckoutSelectionState as CheckoutSelectionStateType,
  CheckoutValidationErrors,
  CouponsResponse as CouponsResponseType,
  DEFAULT_PATIENT_AUTH_CONFIG,
  DEFAULT_PATIENT_AUTH_STORAGE_KEY,
  EnrollmentState as EnrollmentStateType,
  EnrollmentUtils,
  EnrollmentUtilsConfig,
  FULL_PROFILE_PATIENT_AUTH_CONFIG,
  Merchant as MerchantType,
  MINIMAL_PATIENT_AUTH_CONFIG,
  PASSWORD_PATIENT_AUTH_CONFIG,
  PATIENT_AUTH_STORAGE_PREFIX,
  PatientAuthConfig as PatientAuthConfigType,
  PatientAuthData as PatientAuthDataType,
  PatientAuthFormData as PatientAuthFormDataType,
  PatientAuthResult as PatientAuthResultType,
  PatientAuthStorageData,
  PatientAuthValidationErrors,
  PatientInfo as PatientInfoType,
  PendingPatientUpdate,
  PendingUpdatesData,
  PENDING_UPDATES_STORAGE_PREFIX,
  PHONE_OTP_PATIENT_AUTH_CONFIG,
  PricingOption as PricingOptionType,
  STRIPE_CARD_ELEMENT_OPTIONS,
  StripeInitializationResult,
  StripePaymentMethod,
  SUPPORTED_COUNTRIES,
  Treatment as TreatmentType,
  TreatmentProduct as TreatmentProductType,
  TreatmentVariation as TreatmentVariationType,
  US_STATES,
  EnrollmentForm as EnrollmentFormType,
  AnalyticsEventData as AnalyticsEventDataType,
  AnalyticsTrackingState as AnalyticsTrackingStateType,
  SurveyFormAnalyticsProp as SurveyFormAnalyticsPropType,
  AbandonEventContext as AbandonEventContextType,
  EnrollmentProviderType,
  EmrTreatmentPlan as EmrTreatmentPlanType,
  EmrTreatmentPlanDrug as EmrTreatmentPlanDrugType,
  EmrTreatmentPlanDrugGroup as EmrTreatmentPlanDrugGroupType,
  EmrRefillVariant as EmrRefillVariantType,
  EmrRegionScope as EmrRegionScopeType,
  EmrEnrollmentUtils,
  EmrCheckoutSelectionState as EmrCheckoutSelectionStateType,
  EmrDrugSelectionState as EmrDrugSelectionStateType,
  AnalyticsTarget as AnalyticsTargetType,
} from './enrollment-types';
import {
  buildPatientAuthResults,
  calculateTotalWithPricingOption,
  clearPatientAuth,
  clearPendingUpdates,
  createEmptyAddress,
  createEmptyPatientAuthFormData,
  createEmptyPatientInfo,
  createEnrollmentUtils,
  createStripePaymentHandlers,
  deletePaymentMethod,
  enrichEventWithPatientData,
  extractPatientInfo,
  feetInchesToInches,
  fetchApplicableCoupons,
  validateCoupon,
  fetchPatientAddresses,
  fetchPatientInfo,
  flushPendingUpdates,
  formatPhoneNumber,
  getAllStatesForCountry,
  getCommonAvailableStates,
  getCommonPricingOptions,
  getDefaultPaymentMethod,
  getDefaultPricingOption,
  getDefaultVariation,
  getPatientAuthStorageKey,
  getPatientAuthToken,
  getPatientMissingFields,
  getPendingUpdates,
  getPricingOptionLabel,
  getRawPhoneDigits,
  getReferencePatient,
  getSelectedAddress,
  getSelectedVariation,
  getStoredPatient,
  getStoredPatientAuth,
  getStripePaymentFormProps,
  getTreatmentAvailableStates,
  getTreatmentProducts,
  getVariationAvailableStates,
  getVariationPrice,
  getVariationProducts,
  getVariations,
  inchesToFeetInches,
  initializePatientInfo,
  isSetupIntentProcessing,
  isSetupIntentSucceeded,
  isStateAvailableForTreatment,
  isStateAvailableForVariation,
  isValidEmail,
  isValidOtp,
  isValidPatientEmail,
  isValidPatientPhone,
  logoutPatient,
  savePatientAuth,
  savePendingUpdate,
  sendPatientOtp,
  StripePaymentForm,
  toSlug,
  updatePatientProfile,
  validateAddress,
  validateAddressStateForTreatment,
  validateCheckoutForm,
  validatePatientAuth,
  validatePatientAuthForm,
  validatePatientInfo,
  validatePatientToken,
  variationHasPricingOptions,
  // Analytics functions
  initializeEnrollmentAnalytics,
  createAnalyticsTrackingState,
  shouldTrackEvent,
  buildAbandonEventData,
  buildTabSwitchEventData,
  buildSurveyCompleteEventData,
  sendEnrichedAbandonBeacon,
  trackCheckoutView,
  trackPaymentAuthorized,
  trackUserAuthenticated,
  trackFormPageView,
  createSurveyFormAnalyticsProp,
  handlePatientAuthAnalytics,
  createAnalyticsEvent,
  trackAnalyticsEvent,
  EcommerceEventType,
  // Checkout data type
  StoredCheckoutData,
  // EMR functions
  createEmrEnrollmentUtils,
  getEmrPlanAvailableStates,
  isStateAvailableForEmrPlan,
  validateAddressStateForEmrPlan,
} from './enrollment-utils';
import { AnalyticsConfig } from '@/lib/analytics';

export interface EnrollmentModuleConfig extends EnrollmentUtilsConfig {
  /**
   * Optional patient auth config.
   * If not provided, DEFAULT_PATIENT_AUTH_CONFIG is used.
   */
  patientAuthConfig?: PatientAuthConfigType;
  /**
   * Optional storage key for patient auth.
   * If not provided, DEFAULT_PATIENT_AUTH_STORAGE_KEY is used.
   */
  patientAuthStorageKey?: string;
  /** Provider type: 'treatment' (default) or 'emr' */
  providerType?: EnrollmentProviderType;
  /** EMR treatment plan (required when providerType is 'emr') */
  plan?: EmrTreatmentPlanType;
}

/**
 * A single class that exposes all the existing functionalities
 * via instance methods, while keeping all existing functions intact.
 *
 * Example:
 *   const service = new EnrollmentModule({
 *     treatment,
 *     merchant,
 *     slug,
 *     analyticsManager,
 *     patientAuthConfig: DEFAULT_PATIENT_AUTH_CONFIG,
 *   });
 *
 *   const patient = await service.fetchPatientInfo(authToken);
 *   const authResult = await service.sendPatientOtp({ email }, service.patientAuthConfig);
 */
export class EnrollmentModule {
  readonly providerType: EnrollmentProviderType;
  readonly enrollment: EnrollmentUtils | null;
  readonly emrEnrollment: EmrEnrollmentUtils | null;
  readonly patientAuthConfig: PatientAuthConfigType;
  readonly patientAuthStorageKey: string;

  // Private checkout data storage (in-memory, passed via ref)
  private _checkoutData: StoredCheckoutData | null = null;

  // Private vital ID storage (in-memory only, resets on page reload)
  private _vitalId: number | null = null;

  // Whether token has been validated (gates updatePatientField flush behavior)
  private _tokenValidated: boolean = false;

  // Pending vital data for deferred creation (in-memory, flushed after token validation)
  private _pendingVitalData: Record<string, any> | null = null;

  // Analytics manager reference (stored from config for auto-fire from selection methods)
  private _analyticsManager: AnalyticsManager | null = null;

  // expose some core constants via instance
  readonly US_STATES = US_STATES;
  readonly SUPPORTED_COUNTRIES = SUPPORTED_COUNTRIES;
  readonly STRIPE_CARD_ELEMENT_OPTIONS = STRIPE_CARD_ELEMENT_OPTIONS;
  readonly DEFAULT_PATIENT_AUTH_CONFIG = DEFAULT_PATIENT_AUTH_CONFIG;
  readonly MINIMAL_PATIENT_AUTH_CONFIG = MINIMAL_PATIENT_AUTH_CONFIG;
  readonly FULL_PROFILE_PATIENT_AUTH_CONFIG = FULL_PROFILE_PATIENT_AUTH_CONFIG;
  readonly PHONE_OTP_PATIENT_AUTH_CONFIG = PHONE_OTP_PATIENT_AUTH_CONFIG;
  readonly PASSWORD_PATIENT_AUTH_CONFIG = PASSWORD_PATIENT_AUTH_CONFIG;
  readonly PATIENT_AUTH_STORAGE_PREFIX = PATIENT_AUTH_STORAGE_PREFIX;
  readonly DEFAULT_PATIENT_AUTH_STORAGE_KEY = DEFAULT_PATIENT_AUTH_STORAGE_KEY;
  readonly PENDING_UPDATES_STORAGE_PREFIX = PENDING_UPDATES_STORAGE_PREFIX;

  // expose Stripe payment form component
  readonly StripePaymentForm = StripePaymentForm;

  constructor(config: EnrollmentModuleConfig) {
    this.providerType = config.providerType ?? 'treatment';
    this.patientAuthConfig =
      config.patientAuthConfig ?? DEFAULT_PATIENT_AUTH_CONFIG;
    this.patientAuthStorageKey =
      config.patientAuthStorageKey ?? DEFAULT_PATIENT_AUTH_STORAGE_KEY;
    this._analyticsManager = config.analyticsManager ?? null;

    if (this.providerType === 'emr' && config.plan) {
      this.enrollment = null;
      this.emrEnrollment = createEmrEnrollmentUtils({
        plan: config.plan,
        merchant: config.merchant,
        slug: config.slug,
        analyticsManager: config.analyticsManager,
      });
    } else {
      this.enrollment = createEnrollmentUtils(config);
      this.emrEnrollment = null;
    }
  }

  // ------------------------------------------------------------------------
  // Provider-aware getters
  // ------------------------------------------------------------------------

  get isEmr(): boolean {
    return this.providerType === 'emr';
  }

  get isTreatment(): boolean {
    return this.providerType === 'treatment';
  }

  get plan(): EmrTreatmentPlanType | null {
    return this.emrEnrollment?.plan ?? null;
  }

  /**
   * Get the analytics target for the current provider.
   * Works for both Treatment and EmrTreatmentPlan.
   */
  private get analyticsTarget(): AnalyticsTargetType | null {
    if (this.providerType === 'emr' && this.plan) {
      return { id: this.plan.id, name: this.plan.name };
    }
    if (this.enrollment?.treatment) {
      const t = this.enrollment.treatment;
      return { id: t.id, name: t.name, currency: t.currency };
    }
    return null;
  }

  /**
   * Update the analytics manager reference.
   * Called when analytics initializes after module construction.
   */
  setAnalyticsManager(manager: AnalyticsManager | null): void {
    this._analyticsManager = manager;
  }

  /**
   * Convenience method to track an analytics event.
   * Uses the stored analytics manager and analytics target internally.
   */
  track(
    eventType: EcommerceEventType | string,
    data?: Record<string, any>,
  ): void {
    if (!this._analyticsManager || !this.analyticsTarget) return;
    trackAnalyticsEvent(
      this._analyticsManager,
      eventType,
      this.analyticsTarget,
      data,
    );
  }

  // ------------------------------------------------------------------------
  // EMR Variant methods
  // ------------------------------------------------------------------------

  getDefaultVariant(): EmrRefillVariantType | null {
    return this.emrEnrollment?.getDefaultVariant() ?? null;
  }

  getSelectedVariant(variantId?: string): EmrRefillVariantType | null {
    return this.emrEnrollment?.getSelectedVariant(variantId) ?? null;
  }

  getVariants(): EmrRefillVariantType[] {
    return this.emrEnrollment?.getVariants() ?? [];
  }

  getVariantPrice(variant: EmrRefillVariantType): number {
    return this.emrEnrollment?.getVariantPrice(variant) ?? 0;
  }

  getVariantLabel(variant: EmrRefillVariantType): string {
    return this.emrEnrollment?.getVariantLabel(variant) ?? '';
  }

  // ------------------------------------------------------------------------
  // EMR Drug methods
  // ------------------------------------------------------------------------

  getStandaloneDrugs(): EmrTreatmentPlanDrugType[] {
    return this.emrEnrollment?.getStandaloneDrugs() ?? [];
  }

  getOptionalDrugs(): EmrTreatmentPlanDrugType[] {
    return this.emrEnrollment?.getOptionalDrugs() ?? [];
  }

  getDrugGroups(): EmrTreatmentPlanDrugGroupType[] {
    return this.emrEnrollment?.getDrugGroups() ?? [];
  }

  getDrugPrice(drug: EmrTreatmentPlanDrugType): number {
    return this.emrEnrollment?.getDrugPrice(drug) ?? 0;
  }

  getDrugAddOnPrice(
    drug: EmrTreatmentPlanDrugType,
    selectedPhaseId: string | null,
  ): number {
    return this.emrEnrollment?.getDrugAddOnPrice(drug, selectedPhaseId) ?? 0;
  }

  getGroupDefaultDrug(
    group: EmrTreatmentPlanDrugGroupType,
  ): EmrTreatmentPlanDrugType | null {
    return this.emrEnrollment?.getGroupDefaultDrug(group) ?? null;
  }

  // ------------------------------------------------------------------------
  // EMR Selection state
  // ------------------------------------------------------------------------

  setSelectedEmrVariantId(variantId: string | null): void {
    this.emrEnrollment?.setSelectedVariantId(variantId);
    if (variantId) {
      const variant = this.getSelectedVariant(variantId);
      this.track('emr_variant_selected', {
        variant_id: variantId,
        variant_name: variant?.name,
        variant_price: variant ? this.getVariantPrice(variant) : undefined,
      });
    }
  }

  getSelectedEmrVariantId(): string | null {
    return this.emrEnrollment?.getSelectedVariantId() ?? null;
  }

  setDrugGroupSelection(groupId: number, drugIds: number[]): void {
    this.emrEnrollment?.setDrugGroupSelection(groupId, drugIds);
    const group = this.getDrugGroups().find((g) => g.id === groupId);
    drugIds.forEach((drugId) => {
      const drug = group?.drugs.find((d) => d.id === drugId);
      this.track('emr_drug_selected', {
        drug_id: drugId,
        drug_name: drug?.drug_name,
        is_selected: true,
        drug_type: 'group',
      });
    });
  }

  getDrugGroupSelection(groupId: number): number[] {
    return this.emrEnrollment?.getDrugGroupSelection(groupId) ?? [];
  }

  toggleOptionalDrug(drugId: number): void {
    this.emrEnrollment?.toggleOptionalDrug(drugId);
    const isSelected = this.isOptionalDrugSelected(drugId);
    const drug = this.getOptionalDrugs().find((d) => d.id === drugId);
    this.track('emr_drug_selected', {
      drug_id: drugId,
      drug_name: drug?.drug_name,
      is_selected: isSelected,
      drug_type: 'optional',
    });
  }

  isOptionalDrugSelected(drugId: number): boolean {
    return this.emrEnrollment?.isOptionalDrugSelected(drugId) ?? false;
  }

  getEmrCheckoutSelectionState(): EmrCheckoutSelectionStateType | null {
    return this.emrEnrollment?.getEmrCheckoutSelectionState() ?? null;
  }

  // ------------------------------------------------------------------------
  // EMR Phase Selection
  // ------------------------------------------------------------------------

  setStandaloneDrugPhase(drugId: number, phaseId: string | null): void {
    this.emrEnrollment?.setStandaloneDrugPhase(drugId, phaseId);
    const drug = this.getStandaloneDrugs().find((d) => d.id === drugId);
    const phase = phaseId ? drug?.phases?.find((p) => p.id === phaseId) : null;
    this.track('emr_drug_phase_selected', {
      drug_id: drugId,
      drug_name: phase?.drug_name || drug?.drug_name,
      phase_id: phaseId,
      phase_strength: phase?.strength,
      phase_dosage: phase?.dosage,
      phase_range: phase
        ? `${phase.phase_from}${phase.phase_to ? `-${phase.phase_to}` : '+'}`
        : null,
    });
  }

  getStandaloneDrugPhase(drugId: number): string | null {
    return this.emrEnrollment?.getStandaloneDrugPhase(drugId) ?? null;
  }

  setOptionalDrugPhase(drugId: number, phaseId: string | null): void {
    this.emrEnrollment?.setOptionalDrugPhase(drugId, phaseId);
    const drug = this.getOptionalDrugs().find((d) => d.id === drugId);
    const phase = phaseId ? drug?.phases?.find((p) => p.id === phaseId) : null;
    this.track('emr_drug_phase_selected', {
      drug_id: drugId,
      drug_name: phase?.drug_name || drug?.drug_name,
      phase_id: phaseId,
      phase_strength: phase?.strength,
      phase_dosage: phase?.dosage,
      phase_range: phase
        ? `${phase.phase_from}${phase.phase_to ? `-${phase.phase_to}` : '+'}`
        : null,
    });
  }

  getOptionalDrugPhase(drugId: number): string | null {
    return this.emrEnrollment?.getOptionalDrugPhase(drugId) ?? null;
  }

  setGroupDrugPhase(
    groupId: number,
    drugId: number,
    phaseId: string | null,
  ): void {
    this.emrEnrollment?.setGroupDrugPhase(groupId, drugId, phaseId);
    const group = this.getDrugGroups().find((g) => g.id === groupId);
    const drug = group?.drugs.find((d) => d.id === drugId);
    const phase = phaseId ? drug?.phases?.find((p) => p.id === phaseId) : null;
    this.track('emr_drug_phase_selected', {
      drug_id: drugId,
      drug_name: phase?.drug_name || drug?.drug_name,
      phase_id: phaseId,
      phase_strength: phase?.strength,
      phase_dosage: phase?.dosage,
      phase_range: phase
        ? `${phase.phase_from}${phase.phase_to ? `-${phase.phase_to}` : '+'}`
        : null,
    });
  }

  getGroupDrugPhase(groupId: number, drugId: number): string | null {
    return this.emrEnrollment?.getGroupDrugPhase(groupId, drugId) ?? null;
  }

  getAllDrugChoices(): Array<{ drugId: number; phaseId: string | null }> {
    return this.emrEnrollment?.getAllDrugChoices() ?? [];
  }

  // ------------------------------------------------------------------------
  // EMR Pricing
  // ------------------------------------------------------------------------

  calculateEmrTotal(): number {
    return this.emrEnrollment?.calculateEmrTotal() ?? 0;
  }

  calculateEmrVariantTotal(): number {
    return this.emrEnrollment?.calculateEmrVariantTotal() ?? 0;
  }

  // ------------------------------------------------------------------------
  // EMR Submission
  // ------------------------------------------------------------------------

  submitEmrEnrollment(
    formResponses: Record<number, any>,
    checkoutData: CheckoutDataType | null,
  ): Promise<{ success: boolean; errors?: Record<string, string> }> | null {
    return (
      this.emrEnrollment?.submitEmrEnrollment(formResponses, checkoutData) ??
      null
    );
  }

  // ------------------------------------------------------------------------
  // EMR State Availability
  // ------------------------------------------------------------------------

  getEmrPlanAvailableStates(country: string = 'US'): string[] {
    if (!this.emrEnrollment?.plan) return [];
    return getEmrPlanAvailableStates(this.emrEnrollment.plan, country);
  }

  isStateAvailableForEmrPlan(state: string, country: string = 'US'): boolean {
    if (!this.emrEnrollment?.plan) return false;
    return isStateAvailableForEmrPlan(state, this.emrEnrollment.plan, country);
  }

  validateAddressStateForEmrPlan(address: AddressType): {
    valid: boolean;
    error?: string;
  } {
    if (!this.emrEnrollment?.plan)
      return { valid: false, error: 'No EMR plan loaded' };
    return validateAddressStateForEmrPlan(address, this.emrEnrollment.plan);
  }

  // ------------------------------------------------------------------------
  // Provider-aware storage key
  // ------------------------------------------------------------------------

  get emrStorageKey(): string | null {
    return this.emrEnrollment?.storageKey ?? null;
  }

  // ------------------------------------------------------------------------
  // Basic config getters
  // ------------------------------------------------------------------------

  get treatment(): TreatmentType | null {
    return this.enrollment?.treatment ?? null;
  }

  get merchant(): MerchantType | null {
    return this.enrollment?.merchant ?? this.emrEnrollment?.merchant ?? null;
  }

  get slug(): string | null {
    return this.enrollment?.slug ?? null;
  }

  get storageKey(): string | null {
    return this.enrollment?.storageKey ?? null;
  }

  // ------------------------------------------------------------------------
  // Patient data functions
  // ------------------------------------------------------------------------

  fetchPatientInfo(authToken: string): Promise<PatientInfoType | null> {
    return fetchPatientInfo(authToken);
  }

  fetchPatientAddresses(authToken: string): Promise<AddressType[]> {
    return fetchPatientAddresses(authToken);
  }

  extractPatientInfo(formResponses: Record<number, any>): PatientInfoType {
    return extractPatientInfo(formResponses);
  }

  // ------------------------------------------------------------------------
  // Checkout validation / address helpers
  // ------------------------------------------------------------------------

  isValidEmail(email: string): boolean {
    return isValidEmail(email);
  }

  validatePatientInfo(
    patientInfo: CheckoutPatientInfoType,
  ): CheckoutValidationErrors {
    return validatePatientInfo(patientInfo);
  }

  validateAddress(
    address: AddressType,
    useExistingAddress: boolean,
    existingAddresses: AddressType[],
    selectedAddressId?: string,
  ): CheckoutValidationErrors {
    return validateAddress(
      address,
      useExistingAddress,
      existingAddresses,
      selectedAddressId,
    );
  }

  validateCheckoutForm(
    patientInfo: CheckoutPatientInfoType,
    address: AddressType,
    useExistingAddress: boolean,
    existingAddresses: AddressType[],
    selectedAddressId?: string,
  ): { isValid: boolean; errors: CheckoutValidationErrors } {
    return validateCheckoutForm(
      patientInfo,
      address,
      useExistingAddress,
      existingAddresses,
      selectedAddressId,
    );
  }

  getSelectedAddress(
    existingAddresses: AddressType[],
    selectedAddressId: string | undefined,
    fallbackAddress: AddressType,
  ): AddressType {
    return getSelectedAddress(
      existingAddresses,
      selectedAddressId,
      fallbackAddress,
    );
  }

  createEmptyAddress(country: string = 'US'): AddressType {
    return createEmptyAddress(country);
  }

  createEmptyPatientInfo(): CheckoutPatientInfoType {
    return createEmptyPatientInfo();
  }

  initializePatientInfo(
    initialData: CheckoutPatientInfoType | null,
  ): CheckoutPatientInfoType {
    return initializePatientInfo(initialData);
  }

  // ------------------------------------------------------------------------
  // State availability helpers
  // ------------------------------------------------------------------------

  getAllStatesForCountry(country: string = 'US'): string[] {
    return getAllStatesForCountry(country);
  }

  getTreatmentAvailableStates(
    treatment: TreatmentType,
    country: string = 'US',
  ): string[] {
    return getTreatmentAvailableStates(treatment, country);
  }

  getVariationAvailableStates(
    variation: TreatmentVariationType,
    treatment: TreatmentType,
    country: string = 'US',
  ): string[] {
    return getVariationAvailableStates(variation, treatment, country);
  }

  isStateAvailableForTreatment(
    state: string,
    treatment: TreatmentType,
    country: string = 'US',
  ): boolean {
    return isStateAvailableForTreatment(state, treatment, country);
  }

  isStateAvailableForVariation(
    state: string,
    variation: TreatmentVariationType,
    treatment: TreatmentType,
    country: string = 'US',
  ): boolean {
    return isStateAvailableForVariation(state, variation, treatment, country);
  }

  getCommonAvailableStates(
    variations: TreatmentVariationType[],
    treatment: TreatmentType,
    country: string = 'US',
  ): string[] {
    return getCommonAvailableStates(variations, treatment, country);
  }

  validateAddressStateForTreatment(
    address: AddressType,
    treatment: TreatmentType,
    selectedVariation?: TreatmentVariationType,
  ): { valid: boolean; error?: string } {
    return validateAddressStateForTreatment(
      address,
      treatment,
      selectedVariation,
    );
  }

  // ------------------------------------------------------------------------
  // Treatment variation functions
  // ------------------------------------------------------------------------

  getDefaultVariation(): TreatmentVariationType | null {
    return this.enrollment?.getDefaultVariation() ?? null;
  }

  getSelectedVariation(variationId?: number): TreatmentVariationType | null {
    return this.enrollment?.getSelectedVariation(variationId) ?? null;
  }

  getVariationProducts(
    variation: TreatmentVariationType,
  ): TreatmentProductType[] {
    return this.enrollment?.getVariationProducts(variation) ?? [];
  }

  getVariationPrice(variation: TreatmentVariationType): number {
    return this.enrollment?.getVariationPrice(variation) ?? 0;
  }

  getTreatmentProducts(): TreatmentProductType[] {
    return this.enrollment?.getTreatmentProducts() ?? [];
  }

  getVariations(): TreatmentVariationType[] {
    return this.enrollment?.getVariations() ?? [];
  }

  // ------------------------------------------------------------------------
  // Pricing option functions
  // ------------------------------------------------------------------------

  /**
   * Get common pricing options across all products in a variation
   * Returns only pricing options that exist in ALL products (intersection)
   */
  getCommonPricingOptions(
    variation: TreatmentVariationType,
  ): PricingOptionType[] {
    return this.enrollment?.getCommonPricingOptions(variation) ?? [];
  }

  /**
   * Get the default pricing option from a list
   */
  getDefaultPricingOption(
    pricingOptions: PricingOptionType[],
  ): PricingOptionType | null {
    return getDefaultPricingOption(pricingOptions);
  }

  /**
   * Calculate total price based on selected pricing option
   */
  calculateTotalWithPricingOption(
    variation: TreatmentVariationType,
    pricingOptionId: string,
  ): number {
    return calculateTotalWithPricingOption(variation, pricingOptionId);
  }

  /**
   * Get a user-friendly label for a pricing option
   */
  getPricingOptionLabel(option: PricingOptionType): string {
    return getPricingOptionLabel(option);
  }

  /**
   * Check if a variation has pricing options available
   */
  variationHasPricingOptions(variation: TreatmentVariationType): boolean {
    return variationHasPricingOptions(variation);
  }

  // ------------------------------------------------------------------------
  // Selection state management
  // ------------------------------------------------------------------------

  /**
   * Set the selected variation ID
   * Note: This also resets the selected pricing option
   */
  setSelectedVariationId(variationId: number | null): void {
    this.enrollment?.setSelectedVariationId(variationId);
  }

  /**
   * Get the currently selected variation ID
   */
  getSelectedVariationId(): number | null {
    return this.enrollment?.getSelectedVariationId() ?? null;
  }

  /**
   * Set the selected pricing option ID
   */
  setSelectedPricingOptionId(pricingOptionId: string | null): void {
    this.enrollment?.setSelectedPricingOptionId(pricingOptionId);
  }

  /**
   * Get the currently selected pricing option ID
   */
  getSelectedPricingOptionId(): string | null {
    return this.enrollment?.getSelectedPricingOptionId() ?? null;
  }

  /**
   * Get the full checkout selection state with all computed values
   * Includes: variation, pricing option, products, total, billing info
   */
  getCheckoutSelectionState(
    paymentMethod?: 'upfront' | 'per_schedule' | null,
  ): CheckoutSelectionStateType | null {
    return this.enrollment?.getCheckoutSelectionState(paymentMethod) ?? null;
  }

  /**
   * Check if a variation is selected (either explicitly or default)
   */
  hasVariationSelected(): boolean {
    return this.enrollment?.hasVariationSelected() ?? false;
  }

  /**
   * Check if a pricing option is selected
   */
  hasPricingOptionSelected(): boolean {
    return this.enrollment?.hasPricingOptionSelected() ?? false;
  }

  /**
   * Reset all selections (variation and pricing option)
   */
  resetSelections(): void {
    this.enrollment?.resetSelections();
  }

  // ------------------------------------------------------------------------
  // Coupon functions
  // ------------------------------------------------------------------------

  getCoupons(
    patientEmail: string,
    variationId?: number,
    subtotal?: number,
  ): Promise<CouponsResponseType> | null {
    return (
      this.enrollment?.getCoupons(patientEmail, variationId, subtotal) ?? null
    );
  }

  fetchApplicableCoupons(
    email: string,
    treatmentId: number,
    variationId?: number,
    productVariationIds?: number[],
    subtotal?: number,
  ): Promise<CouponsResponseType> {
    return fetchApplicableCoupons(
      email,
      treatmentId,
      variationId,
      productVariationIds,
      subtotal,
    );
  }

  validateCoupon(
    email: string,
    couponCode: string,
    treatmentId: number,
    variationId?: number,
    productVariationIds?: number[],
    subtotal?: number,
  ): Promise<{ valid: boolean; coupon?: ApplicableCoupon; error?: string }> {
    return validateCoupon(
      email,
      couponCode,
      treatmentId,
      variationId,
      productVariationIds,
      subtotal,
    );
  }

  // ------------------------------------------------------------------------
  // Payment / checkout functions (bound to treatment via enrollment)
  // ------------------------------------------------------------------------

  calculateTotal(
    paymentMethod: 'upfront' | 'per_schedule' | null = 'upfront',
    variationId?: number,
    pricingOptionId?: string,
  ): number | null {
    return (
      this.enrollment?.calculateTotal(
        paymentMethod,
        variationId,
        pricingOptionId,
      ) ?? null
    );
  }

  submitEnrollment(
    formResponses: Record<number, any>,
    checkoutData: CheckoutDataType | null,
    paymentMethod: 'upfront' | 'per_schedule' | null,
  ): Promise<{ success: boolean; errors?: Record<string, string> }> | null {
    return (
      this.enrollment?.submitEnrollment(
        formResponses,
        checkoutData,
        paymentMethod,
      ) ?? null
    );
  }

  // ------------------------------------------------------------------------
  // Stripe payment helpers (bound to merchant via enrollment)
  // ------------------------------------------------------------------------

  fetchPaymentMethods(
    authToken: string,
  ): Promise<StripePaymentMethod[]> | null {
    return this.enrollment?.fetchPaymentMethods(authToken) ?? null;
  }

  getDefaultPaymentMethod(
    paymentMethods: StripePaymentMethod[],
  ): StripePaymentMethod | undefined {
    return getDefaultPaymentMethod(paymentMethods);
  }

  createSetupIntent(
    authToken: string,
    forceNew: boolean = false,
  ): Promise<StripeInitializationResult> | null {
    return this.enrollment?.createSetupIntent(authToken, forceNew) ?? null;
  }

  deletePaymentMethod(
    authToken: string,
    methodId: number,
  ): Promise<{ success: boolean; error?: string }> {
    return deletePaymentMethod(authToken, methodId);
  }

  savePaymentMethod(
    authToken: string,
    paymentMethodId: string,
    customerId: string,
    setupIntentId: string,
    setAsDefault: boolean = true,
  ): Promise<{ success: boolean; error?: string }> | null {
    return (
      this.enrollment?.savePaymentMethod(
        authToken,
        paymentMethodId,
        customerId,
        setupIntentId,
        setAsDefault,
      ) ?? null
    );
  }

  isSetupIntentProcessing(status: string): boolean {
    return isSetupIntentProcessing(status);
  }

  isSetupIntentSucceeded(status: string): boolean {
    return isSetupIntentSucceeded(status);
  }

  // ------------------------------------------------------------------------
  // State persistence (bound via enrollment)
  // ------------------------------------------------------------------------

  loadState(): Partial<EnrollmentStateType> | null {
    return this.enrollment?.loadState() ?? null;
  }

  saveState(state: Partial<EnrollmentStateType>): void | null {
    this.enrollment?.saveState(state) ?? null;
  }

  clearState(): void | null {
    this.enrollment?.clearState() ?? null;
  }

  // ------------------------------------------------------------------------
  // Analytics helpers (basic)
  // ------------------------------------------------------------------------

  enrichEventWithPatientData(
    eventData: any,
    patientInfo: PatientInfoType | null,
  ): any {
    return enrichEventWithPatientData(eventData, patientInfo);
  }

  toSlug(text: string): string {
    return toSlug(text);
  }

  sendAbandonBeacon(
    eventData: any,
    analyticsManager: AnalyticsManager,
  ): boolean | null {
    return (
      this.enrollment?.sendAbandonBeacon(eventData, analyticsManager) ?? null
    );
  }

  // ------------------------------------------------------------------------
  // Analytics - Enrollment Analytics Manager
  // ------------------------------------------------------------------------

  /**
   * Initialize analytics manager for enrollment
   * Returns the analytics manager and any loaded config (for external scripts like GA4, Meta Pixel)
   */
  async initializeAnalytics(): Promise<{
    analyticsManager: AnalyticsManager;
    config: AnalyticsConfig | null;
  }> {
    const target = this.treatment ?? this.plan;
    if (!target || !this.merchant) {
      throw new Error(
        'Treatment/plan and merchant are required to initialize analytics',
      );
    }
    return initializeEnrollmentAnalytics(this.merchant.id, target.id);
  }

  /**
   * Create initial analytics tracking state for deduplication
   */
  createAnalyticsTrackingState(): AnalyticsTrackingStateType {
    return createAnalyticsTrackingState();
  }

  /**
   * Check if an event should be tracked or if it's a duplicate
   * Returns whether to track and the updated state
   */
  shouldTrackEvent(
    eventAction: string,
    eventData: any,
    trackingState: AnalyticsTrackingStateType,
  ): { shouldTrack: boolean; updatedState: AnalyticsTrackingStateType } {
    return shouldTrackEvent(eventAction, eventData, trackingState);
  }

  /**
   * Build abandon event data based on current enrollment context
   */
  buildAbandonEventData(
    context: AbandonEventContextType,
    sortedForms: EnrollmentFormType[],
    abandonReason: 'browser_close' | 'tab_hidden' = 'browser_close',
  ): AnalyticsEventDataType | null {
    if (!this.analyticsTarget) return null;
    return buildAbandonEventData(
      context,
      this.analyticsTarget,
      sortedForms,
      abandonReason,
    );
  }

  /**
   * Build tab switch event data
   */
  buildTabSwitchEventData(
    context: AbandonEventContextType,
    sortedForms: EnrollmentFormType[],
    eventType: 'tab_switch' | 'survey_resume' | 'checkout_resume',
  ): AnalyticsEventDataType | null {
    if (!this.analyticsTarget) return null;
    return buildTabSwitchEventData(
      context,
      this.analyticsTarget,
      sortedForms,
      eventType,
    );
  }

  /**
   * Build survey complete event data (fired when all forms are completed)
   */
  buildSurveyCompleteEventData(
    sortedForms: EnrollmentFormType[],
  ): AnalyticsEventDataType | null {
    if (!this.analyticsTarget || !this.merchant) return null;
    return buildSurveyCompleteEventData(
      this.analyticsTarget,
      this.merchant,
      sortedForms,
    );
  }

  /**
   * Send abandon beacon with enriched patient data
   */
  sendEnrichedAbandonBeacon(
    eventData: AnalyticsEventDataType,
    patientInfo: PatientInfoType | null,
    analyticsManager: AnalyticsManager,
  ): boolean {
    if (!this.analyticsTarget || !this.merchant) return false;
    return sendEnrichedAbandonBeacon(
      eventData,
      patientInfo,
      analyticsManager,
      this.merchant.id,
      this.analyticsTarget.id,
    );
  }

  /**
   * Track checkout view event
   */
  trackCheckoutView(analyticsManager: AnalyticsManager, total: number): void {
    if (!this.analyticsTarget) return;
    trackCheckoutView(
      analyticsManager,
      this.analyticsTarget.id,
      total,
      this.analyticsTarget.currency ?? 'USD',
    );
  }

  /**
   * Track payment authorized event
   */
  trackPaymentAuthorized(
    analyticsManager: AnalyticsManager,
    total: number,
    paymentMethod: string,
  ): void {
    if (!this.analyticsTarget) return;
    trackPaymentAuthorized(
      analyticsManager,
      this.analyticsTarget.id,
      total,
      this.analyticsTarget.currency ?? 'USD',
      paymentMethod,
    );
  }

  /**
   * Track user authenticated event
   */
  trackUserAuthenticated(
    analyticsManager: AnalyticsManager,
    userId?: string,
  ): void {
    if (!this.analyticsTarget) return;
    trackUserAuthenticated(analyticsManager, this.analyticsTarget.id, userId);
  }

  /**
   * Track form page view for navigation between forms
   */
  trackFormPageView(
    analyticsManager: AnalyticsManager,
    stepIndex: number,
    totalSteps: number,
    formName: string,
  ): void {
    if (!this.analyticsTarget) return;
    trackFormPageView(
      analyticsManager,
      this.analyticsTarget.id,
      stepIndex,
      totalSteps,
      formName,
    );
  }

  /**
   * Create SurveyForm analytics prop object
   * This provides the analytics interface expected by the SurveyForm component
   */
  createSurveyFormAnalyticsProp(
    analyticsManager: AnalyticsManager | null,
    form: EnrollmentFormType,
    patientInfo: PatientInfoType | null,
    trackingState: AnalyticsTrackingStateType,
    onTrackingStateUpdate: (newState: AnalyticsTrackingStateType) => void,
  ): SurveyFormAnalyticsPropType | null {
    if (!this.analyticsTarget || !this.merchant) return null;
    return createSurveyFormAnalyticsProp(
      analyticsManager,
      this.analyticsTarget,
      this.merchant,
      form,
      patientInfo,
      trackingState,
      onTrackingStateUpdate,
    );
  }

  /**
   * Handle patient authentication analytics update
   * Called when patient authenticates to update analytics user ID
   */
  handlePatientAuthAnalytics(
    analyticsManager: AnalyticsManager,
    patientId: number,
  ): void {
    const existingUserId = analyticsManager.getUserId() ?? null;
    handlePatientAuthAnalytics(analyticsManager, patientId, existingUserId);
  }

  /**
   * Create a standardized analytics event
   * Handles known e-commerce events with standard formatting
   * Can be used by SurveyForm blocks to create events for any type
   *
   * @param eventType - The event type (e.g., 'checkout_started', 'bmi_set', or custom)
   * @param data - Optional data to include in the event
   * @returns The formatted analytics event data, or null if target not available
   */
  createEvent(
    eventType: EcommerceEventType | string,
    data?: Record<string, any>,
  ): AnalyticsEventDataType | null {
    if (!this.analyticsTarget) return null;
    return createAnalyticsEvent(eventType, this.analyticsTarget, data);
  }

  /**
   * Track a custom analytics event
   * Creates and tracks an event in one call - convenience method for SurveyForm blocks
   *
   * @param analyticsManager - The analytics manager instance
   * @param eventType - The event type (e.g., 'checkout_started', 'bmi_set', or custom)
   * @param data - Optional data to include in the event
   * @param patientInfo - Optional patient info to enrich the event
   */
  trackEvent(
    analyticsManager: AnalyticsManager,
    eventType: EcommerceEventType | string,
    data?: Record<string, any>,
    patientInfo?: PatientInfoType | null,
  ): void {
    if (!this.analyticsTarget) return;
    trackAnalyticsEvent(
      analyticsManager,
      eventType,
      this.analyticsTarget,
      data,
      patientInfo,
    );
  }

  // ------------------------------------------------------------------------
  // Stripe component utilities
  // ------------------------------------------------------------------------

  createStripePaymentHandlers(callbacks: {
    onPaymentSuccess: (data: {
      paymentMethodId: string;
      patientInfo: any;
      address: AddressType;
      useExistingAddress: boolean;
    }) => void;
    onPaymentError: (error: string) => void;
    validateForm: () => boolean;
    getFormData: () => {
      patientInfo: any;
      address: AddressType;
      useExistingAddress: boolean;
      existingAddresses: AddressType[];
      selectedAddressId?: string;
    };
  }) {
    return createStripePaymentHandlers(callbacks);
  }

  getStripePaymentFormProps(config: {
    authToken: string;
    merchantId: number;
    amount: number;
    currency?: string;
    onSuccess: (paymentMethodId: string) => void;
    onError: (error: string) => void;
  }) {
    return getStripePaymentFormProps(config);
  }

  // ------------------------------------------------------------------------
  // Patient auth storage helpers
  // ------------------------------------------------------------------------

  getPatientAuthStorageKey(identifier?: string): string {
    return getPatientAuthStorageKey(identifier);
  }

  getStoredPatientAuth(
    storageKey: string = this.patientAuthStorageKey,
  ): PatientAuthStorageData | null {
    return getStoredPatientAuth(storageKey);
  }

  savePatientAuth(
    token: string,
    patient: PatientAuthDataType,
    storageKey: string = this.patientAuthStorageKey,
  ): void {
    return savePatientAuth(token, patient, storageKey);
  }

  clearPatientAuth(storageKey: string = this.patientAuthStorageKey): void {
    return clearPatientAuth(storageKey);
  }

  getPatientAuthToken(
    storageKey: string = this.patientAuthStorageKey,
  ): string | null {
    return getPatientAuthToken(storageKey);
  }

  getStoredPatient(
    storageKey: string = this.patientAuthStorageKey,
  ): PatientAuthDataType | null {
    return getStoredPatient(storageKey);
  }

  // ------------------------------------------------------------------------
  // Patient validation & formatting
  // ------------------------------------------------------------------------

  formatPhoneNumber(value: string): string {
    return formatPhoneNumber(value);
  }

  getRawPhoneDigits(formattedPhone: string): string {
    return getRawPhoneDigits(formattedPhone);
  }

  isValidPatientEmail(email: string): boolean {
    return isValidPatientEmail(email);
  }

  isValidPatientPhone(phone: string): boolean {
    return isValidPatientPhone(phone);
  }

  isValidOtp(otp: string): boolean {
    return isValidOtp(otp);
  }

  getPatientMissingFields(
    patient: PatientAuthDataType,
    config: PatientAuthConfigType = this.patientAuthConfig,
  ): string[] {
    return getPatientMissingFields(patient, config);
  }

  validatePatientAuthForm(
    formData: Partial<PatientAuthFormDataType>,
    config: PatientAuthConfigType = this.patientAuthConfig,
    step: 'auth' | 'verify' | 'collect',
  ): { isValid: boolean; errors: PatientAuthValidationErrors } {
    return validatePatientAuthForm(formData, config, step);
  }

  createEmptyPatientAuthFormData(): PatientAuthFormDataType {
    return createEmptyPatientAuthFormData();
  }

  // ------------------------------------------------------------------------
  // Patient auth API functions
  // ------------------------------------------------------------------------

  sendPatientOtp(
    formData: Pick<PatientAuthFormDataType, 'email' | 'phone'>,
    config: PatientAuthConfigType = this.patientAuthConfig,
    storageKey: string = this.patientAuthStorageKey,
  ): Promise<PatientAuthResultType> {
    return sendPatientOtp(formData, config, storageKey);
  }

  async validatePatientAuth(
    formData: Pick<
      PatientAuthFormDataType,
      'email' | 'phone' | 'otp' | 'password'
    >,
    config: PatientAuthConfigType = this.patientAuthConfig,
    storageKey: string = this.patientAuthStorageKey,
  ): Promise<PatientAuthResultType> {
    const result = await validatePatientAuth(formData, config, storageKey);
    if (result.success && result.token) {
      this._tokenValidated = true;
      await this.flushPendingVitals();
    }
    return result;
  }

  async validatePatientToken(
    config: PatientAuthConfigType = this.patientAuthConfig,
    storageKey: string = this.patientAuthStorageKey,
  ): Promise<PatientAuthResultType> {
    const result = await validatePatientToken(config, storageKey);
    if (result.success && result.token) {
      this._tokenValidated = true;
      await this.flushPendingVitals();
    }
    return result;
  }

  updatePatientProfile(
    formData: Partial<PatientAuthFormDataType>,
    missingFields: string[],
    config: PatientAuthConfigType = this.patientAuthConfig,
    storageKey: string = this.patientAuthStorageKey,
  ): Promise<PatientAuthResultType> {
    return updatePatientProfile(formData, missingFields, config, storageKey);
  }

  /**
   * Update specific patient fields (simplified version of updatePatientProfile)
   * Useful for updating individual fields like dateOfBirth, gender, etc.
   * If no patient token exists, updates are queued locally until a token is available.
   */
  async updatePatientField(
    fieldName: string,
    value: any,
    storageKey: string = this.patientAuthStorageKey,
  ): Promise<PatientAuthResultType> {
    // If token has not been validated yet, always queue to pending updates
    // This prevents writing to a stale token's patient before identity is confirmed
    if (!this._tokenValidated) {
      savePendingUpdate(fieldName, value, storageKey);
      const referencePatient = getReferencePatient(storageKey);
      return {
        success: true,
        patient: referencePatient || {},
        token: undefined,
        missingFields: [],
      };
    }

    // Token validated - check if token exists for immediate flush
    const token = getPatientAuthToken(storageKey);

    if (!token) {
      savePendingUpdate(fieldName, value, storageKey);
      const referencePatient = getReferencePatient(storageKey);
      return {
        success: true,
        patient: referencePatient || {},
        token: undefined,
        missingFields: [],
      };
    }

    // Token validated and exists - proceed with immediate update
    const formData: Partial<PatientAuthFormDataType> = {};

    if (fieldName === 'dateOfBirth') {
      formData.dateOfBirth = value;
    } else if (fieldName === 'gender') {
      formData.gender = value;
      formData.genderBiological = value;
    } else if (fieldName === 'genderBiological') {
      formData.genderBiological = value;
    } else if (fieldName === 'height') {
      formData.height = value;
    } else if (fieldName === 'weight') {
      formData.weight = value;
    } else if (fieldName === 'firstName') {
      formData.firstName = value;
    } else if (fieldName === 'lastName') {
      formData.lastName = value;
    } else if (fieldName === 'middleName') {
      formData.middleName = value;
    } else if (fieldName === 'email') {
      formData.email = value;
    } else if (fieldName === 'phone') {
      formData.phone = value;
    }

    return updatePatientProfile(
      formData,
      [fieldName],
      this.patientAuthConfig,
      storageKey,
    );
  }

  logoutPatient(storageKey: string = this.patientAuthStorageKey): void {
    return logoutPatient(storageKey);
  }

  /**
   * Flush all pending patient updates to the server
   * Call this after a patient token becomes available to sync locally queued updates
   */
  flushPendingUpdates(
    config: PatientAuthConfigType = this.patientAuthConfig,
    storageKey: string = this.patientAuthStorageKey,
  ): Promise<PatientAuthResultType> {
    return flushPendingUpdates(config, storageKey);
  }

  /**
   * Get all pending patient updates that haven't been synced to the server
   */
  getPendingUpdates(
    storageKey: string = this.patientAuthStorageKey,
  ): PendingUpdatesData | null {
    return getPendingUpdates(storageKey);
  }

  /**
   * Get the reference patient (locally accumulated patient data before token exists)
   */
  getReferencePatient(
    storageKey: string = this.patientAuthStorageKey,
  ): PatientAuthDataType | null {
    return getReferencePatient(storageKey);
  }

  /**
   * Clear all pending updates from local storage
   */
  clearPendingUpdates(storageKey: string = this.patientAuthStorageKey): void {
    return clearPendingUpdates(storageKey);
  }

  // ------------------------------------------------------------------------
  // Patient auth result builder
  // ------------------------------------------------------------------------

  buildPatientAuthResults(
    patient: PatientAuthDataType,
    token: string,
  ): Record<string, any> {
    return buildPatientAuthResults(patient, token);
  }

  // ------------------------------------------------------------------------
  // Height / weight conversion helpers
  // ------------------------------------------------------------------------

  inchesToFeetInches(totalInches: number | string): {
    feet: number;
    inches: number;
  } {
    return inchesToFeetInches(totalInches);
  }

  feetInchesToInches(feet: number, inches: number): number {
    return feetInchesToInches(feet, inches);
  }

  // ------------------------------------------------------------------------
  // Checkout Data Management (in-memory state)
  // ------------------------------------------------------------------------

  /**
   * Store checkout data
   * Should be called by checkout blocks when payment is successfully authorized
   */
  setCheckoutData(data: Omit<StoredCheckoutData, 'timestamp'>): void {
    this._checkoutData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    this.track('checkout_started', {
      total: data.total,
      currency: this.analyticsTarget?.currency || 'USD',
      has_address: data.useExistingAddress || !!data.address?.line1,
      has_patient_info: !!data.patientInfo?.email,
    });
  }

  /**
   * Get stored checkout data
   * Returns null if no checkout data exists
   */
  getCheckoutData(): StoredCheckoutData | null {
    return this._checkoutData;
  }

  /**
   * Check if checkout data exists
   */
  hasCheckoutData(): boolean {
    return this._checkoutData !== null;
  }

  /**
   * Clear checkout data
   */
  clearCheckoutData(): void {
    this._checkoutData = null;
  }

  // ------------------------------------------------------------------------
  // Partial Checkout Data Setters (for modular blocks)
  // ------------------------------------------------------------------------

  /**
   * Set patient info portion of checkout data
   * Merges with existing checkout data
   */
  setCheckoutPatientInfo(patientInfo: CheckoutPatientInfoType): void {
    const existing = this._checkoutData;
    this._checkoutData = {
      ...existing,
      patientInfo: {
        email: patientInfo.email ?? '',
        first_name: patientInfo.first_name ?? '',
        last_name: patientInfo.last_name ?? '',
        phone: patientInfo.phone ?? '',
      },
      address: existing?.address ?? createEmptyAddress(),
      useExistingAddress: existing?.useExistingAddress ?? false,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get patient info from checkout data
   */
  getCheckoutPatientInfo(): StoredCheckoutData['patientInfo'] | null {
    return this._checkoutData?.patientInfo ?? null;
  }

  /**
   * Set address portion of checkout data
   * Merges with existing checkout data
   */
  setCheckoutAddress(
    address: AddressType,
    useExistingAddress: boolean = false,
    selectedAddressId?: string,
  ): void {
    const existing = this._checkoutData;
    this._checkoutData = {
      ...existing,
      patientInfo: existing?.patientInfo ?? {
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
      },
      address,
      useExistingAddress,
      selectedAddressId,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get address from checkout data
   */
  getCheckoutAddress(): {
    address: AddressType;
    useExistingAddress: boolean;
    selectedAddressId?: string;
  } | null {
    if (!this._checkoutData) return null;
    return {
      address: this._checkoutData.address,
      useExistingAddress: this._checkoutData.useExistingAddress,
      selectedAddressId: this._checkoutData.selectedAddressId,
    };
  }

  /**
   * Set payment data portion of checkout data
   * Merges with existing checkout data
   */
  setCheckoutPaymentData(data: {
    stripePaymentMethodId: string;
    paymentMethod?: 'upfront' | 'per_schedule';
    total?: number;
    couponCode?: string;
  }): void {
    const existing = this._checkoutData;
    this._checkoutData = {
      ...existing,
      patientInfo: existing?.patientInfo ?? {
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
      },
      address: existing?.address ?? createEmptyAddress(),
      useExistingAddress: existing?.useExistingAddress ?? false,
      stripePaymentMethodId: data.stripePaymentMethodId,
      paymentMethod: data.paymentMethod ?? existing?.paymentMethod,
      total: data.total ?? existing?.total,
      couponCode: data.couponCode ?? existing?.couponCode,
      variationId: existing?.variationId,
      pricingOptionId: existing?.pricingOptionId,
      timestamp: new Date().toISOString(),
    };
    this.track('payment_authorized', {
      total: data.total ?? existing?.total,
      currency: this.analyticsTarget?.currency || 'USD',
      payment_method: data.paymentMethod ?? existing?.paymentMethod ?? 'card',
    });
  }

  /**
   * Get payment data from checkout data
   */
  getCheckoutPaymentData(): {
    stripePaymentMethodId?: string;
    paymentMethod?: 'upfront' | 'per_schedule';
    total?: number;
    couponCode?: string;
  } | null {
    if (!this._checkoutData) return null;
    return {
      stripePaymentMethodId: this._checkoutData.stripePaymentMethodId,
      paymentMethod: this._checkoutData.paymentMethod,
      total: this._checkoutData.total,
      couponCode: this._checkoutData.couponCode,
    };
  }

  /**
   * Update checkout data with variation and pricing option
   * Called when selection changes
   */
  setCheckoutSelectionData(data: {
    variationId?: number;
    pricingOptionId?: string;
  }): void {
    const existing = this._checkoutData;
    if (existing) {
      this._checkoutData = {
        ...existing,
        variationId: data.variationId ?? existing.variationId,
        pricingOptionId: data.pricingOptionId ?? existing.pricingOptionId,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Check if checkout data is complete (has all required fields)
   */
  isCheckoutDataComplete(): boolean {
    if (!this._checkoutData) return false;
    const { patientInfo, address, stripePaymentMethodId } = this._checkoutData;
    return !!(
      patientInfo?.email &&
      patientInfo?.first_name &&
      patientInfo?.last_name &&
      address?.line1 &&
      address?.city &&
      address?.state &&
      address?.zip &&
      stripePaymentMethodId
    );
  }

  // ------------------------------------------------------------------------
  // Vitals lifecycle (in-memory only, resets on page reload)
  // ------------------------------------------------------------------------

  /**
   * Create or update a patient vital record.
   * First call (when _vitalId is null) creates a new vital via POST.
   * Subsequent calls update the existing vital via PATCH.
   * Requires authentication — does NOT queue to localStorage.
   */
  async updateVital(
    data: Record<string, any>,
  ): Promise<{ success: boolean; vitalId: number | null; error?: string }> {
    const token = this.getPatientAuthToken();
    if (!token) {
      return { success: false, vitalId: null, error: 'Not authenticated' };
    }

    try {
      const baseUrl = '/api/v2/patient';
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      if (this._vitalId === null) {
        // POST to create
        const response = await fetch(`${baseUrl}/vitals`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success && result.data?.id) {
          this._vitalId = result.data.id;
          return { success: true, vitalId: this._vitalId };
        }
        return {
          success: false,
          vitalId: null,
          error: result.message || 'Failed to create vital',
        };
      } else {
        // PATCH to update
        const response = await fetch(`${baseUrl}/vitals/${this._vitalId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
          return { success: true, vitalId: this._vitalId };
        }
        return {
          success: false,
          vitalId: this._vitalId,
          error: result.message || 'Failed to update vital',
        };
      }
    } catch (error) {
      console.error('[EnrollmentModule] Error updating vital:', error);
      return { success: false, vitalId: this._vitalId, error: 'Network error' };
    }
  }

  /**
   * Get the current in-memory vital ID (null if no vital created yet)
   */
  getVitalId(): number | null {
    return this._vitalId;
  }

  /**
   * Clear the in-memory vital ID (forces next updateVital to create a new record)
   */
  clearVitalId(): void {
    this._vitalId = null;
  }

  // ------------------------------------------------------------------------
  // Token validation gate
  // ------------------------------------------------------------------------

  isTokenValidated(): boolean {
    return this._tokenValidated;
  }

  setTokenValidated(validated: boolean): void {
    this._tokenValidated = validated;
  }

  // ------------------------------------------------------------------------
  // Pending vital data (deferred creation until token is validated)
  // ------------------------------------------------------------------------

  setPendingVitalData(data: Record<string, any>): void {
    this._pendingVitalData = { ...(this._pendingVitalData || {}), ...data };
  }

  getPendingVitalData(): Record<string, any> | null {
    return this._pendingVitalData;
  }

  clearPendingVitalData(): void {
    this._pendingVitalData = null;
  }

  /**
   * Flush pending vital data by creating/updating a vital record.
   * Should only be called after token validation succeeds.
   */
  async flushPendingVitals(): Promise<{
    success: boolean;
    vitalId: number | null;
    error?: string;
  }> {
    if (!this._pendingVitalData) {
      return { success: true, vitalId: this._vitalId };
    }

    const result = await this.updateVital(this._pendingVitalData);
    if (result.success) {
      this._pendingVitalData = null;
    }
    return result;
  }
}

// ============================================================================
// Type utilities to extract types from EnrollmentModule
// Use these to infer types from the module instance without separate imports
// ============================================================================

/**
 * Extract types from EnrollmentModule methods
 * Usage: const config: EnrollmentModuleTypes['PatientAuthConfig'] = {...}
 */
export namespace EnrollmentModuleTypes {
  export type PatientAuthConfig = PatientAuthConfigType;
  export type PatientAuthFormData = PatientAuthFormDataType;
  export type PatientAuthData = PatientAuthDataType;
  export type PatientAuthResult = PatientAuthResultType;
  export type PatientInfo = PatientInfoType;
  export type Address = AddressType;
  export type Treatment = TreatmentType;
  export type Merchant = MerchantType;
  export type TreatmentVariation = TreatmentVariationType;
  export type TreatmentProduct = TreatmentProductType;
  export type PricingOption = PricingOptionType;
  export type CheckoutPatientInfo = CheckoutPatientInfoType;
  export type CheckoutData = CheckoutDataType;
  export type CheckoutSelectionState = CheckoutSelectionStateType;
  export type EnrollmentState = EnrollmentStateType;
  export type Coupon = ApplicableCoupon;
  export type CouponsResponse = CouponsResponseType;
  export type StoredCheckout = StoredCheckoutData;
  // Analytics types
  export type EnrollmentForm = EnrollmentFormType;
  export type AnalyticsEventData = AnalyticsEventDataType;
  export type AnalyticsTrackingState = AnalyticsTrackingStateType;
  export type SurveyFormAnalyticsProp = SurveyFormAnalyticsPropType;
  export type AbandonEventContext = AbandonEventContextType;
  export type EcommerceEvent = EcommerceEventType;
  // EMR types
  export type ProviderType = EnrollmentProviderType;
  export type EmrPlan = EmrTreatmentPlanType;
  export type EmrDrug = EmrTreatmentPlanDrugType;
  export type EmrDrugGroup = EmrTreatmentPlanDrugGroupType;
  export type EmrVariant = EmrRefillVariantType;
  export type EmrRegion = EmrRegionScopeType;
  export type EmrDrugSelection = EmrDrugSelectionStateType;
  export type EmrSelectionState = EmrCheckoutSelectionStateType;
}
