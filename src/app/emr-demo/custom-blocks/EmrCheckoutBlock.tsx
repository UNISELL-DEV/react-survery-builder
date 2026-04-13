import React, { useState, useEffect, forwardRef, useRef } from "react";
import type {
    BlockDefinition,
    ContentBlockItemProps,
    BlockRendererProps,
} from "@/packages/survey-form-package/src/types";
import { Input } from "@/packages/survey-form-package/src/components/ui/input";
import { Label } from "@/packages/survey-form-package/src/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/packages/survey-form-package/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/packages/survey-form-package/src/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/packages/survey-form-package/src/components/ui/select";
import { Alert, AlertDescription } from "@/packages/survey-form-package/src/components/ui/alert";
import { Badge } from "@/packages/survey-form-package/src/components/ui/badge";
import { Checkbox } from "@/packages/survey-form-package/src/components/ui/checkbox";
import { cn } from "@/packages/survey-form-package/src/lib/utils";
import { useSurveyForm } from "@/packages/survey-form-package/src/context/SurveyFormContext";
import {
    CreditCard,
    User,
    Mail,
    Phone,
    Shield,
    Lock,
    AlertCircle,
    Package,
    Heart,
    Check,
    MapPin,
    Pill,
    Loader2,
} from "lucide-react";

type EnrollmentModule = any;

const fmt = (amount: number | string | null | undefined): string =>
    `$${(Number(amount) || 0).toFixed(2)}`;

const getDrugImage = (drug: any): string | null => {
    const photos = drug?.merchant_drug?.photos;
    if (!photos?.length) return null;
    const primary = photos.find((p: any) => p.is_primary);
    return (primary ?? photos[0])?.url ?? null;
};

const DrugThumb: React.FC<{ drug: any; primaryColor: string }> = ({ drug, primaryColor }) => {
    const url = getDrugImage(drug);
    if (url) {
        return <img src={url} alt={drug.drug_name} className="w-8 h-8 rounded-md object-cover shrink-0" />;
    }
    return (
        <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}10` }}>
            <Pill className="w-4 h-4" style={{ color: primaryColor }} />
        </div>
    );
};

// ============================================================
// Builder Components
// ============================================================

const EmrCheckoutBlockForm: React.FC<ContentBlockItemProps> = ({ data, onUpdate }) => {
    const handle = (field: string, value: any) => onUpdate?.({ ...data, [field]: value });
    return (
        <div className="space-y-4 text-sm">
            <div className="space-y-2">
                <Label>Field Name</Label>
                <Input value={data.fieldName ?? ""} onChange={(e) => handle("fieldName", e.target.value)} placeholder="emrCheckout" />
            </div>
            <div className="space-y-2">
                <Label>Title</Label>
                <Input value={data.title ?? ""} onChange={(e) => handle("title", e.target.value)} placeholder="Complete Your Order" />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={data.showOrderSummary ?? true} onCheckedChange={(v) => handle("showOrderSummary", v)} />
                <Label>Show Order Summary</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={data.showContactInfo ?? true} onCheckedChange={(v) => handle("showContactInfo", v)} />
                <Label>Show Contact Information</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={data.collectPhone ?? true} onCheckedChange={(v) => handle("collectPhone", v)} />
                <Label>Collect Phone Number</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={data.showAddress ?? true} onCheckedChange={(v) => handle("showAddress", v)} />
                <Label>Show Shipping Address</Label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={data.allowSavedAddresses ?? true} onCheckedChange={(v) => handle("allowSavedAddresses", v)} />
                <Label>Allow Saved Addresses</Label>
            </div>
        </div>
    );
};

const EmrCheckoutBlockItem: React.FC<ContentBlockItemProps> = ({ data }) => (
    <div className="flex items-center gap-2 text-sm text-slate-600">
        <CreditCard className="w-4 h-4" />
        <span>{data.fieldName || "emrCheckout"}</span>
        <Badge variant="secondary" className="text-[10px]">EMR Checkout</Badge>
    </div>
);

const EmrCheckoutBlockPreview: React.FC = () => (
    <div className="text-xs text-slate-400 italic">EMR Checkout (requires enrollment module)</div>
);

// ============================================================
// Runtime Renderer
// ============================================================

const EmrCheckoutRenderer = forwardRef<HTMLDivElement, BlockRendererProps>(
    ({ block, onChange, theme, disabled }, ref) => {
        const { customData, values, goToNextBlock } = useSurveyForm();
        const enrollmentModule = customData?.enrollmentModule as EnrollmentModule;

        const themeConfig = theme ?? null;
        const primaryColor = themeConfig?.colors?.primary || "#10b981";

        const fieldName = (block as any)?.fieldName || "emrCheckout";
        const showOrderSummary = (block as any)?.showOrderSummary !== false;
        const showContactInfo = (block as any)?.showContactInfo !== false;
        const collectPhone = (block as any)?.collectPhone !== false;
        const showAddress = (block as any)?.showAddress !== false;
        const allowSavedAddresses = (block as any)?.allowSavedAddresses !== false;

        // State
        const [patientInfo, setPatientInfo] = useState({ first_name: "", last_name: "", email: "", phone: "" });
        const [address, setAddress] = useState<Record<string, any>>({ line1: "", line2: "", city: "", state: "", zip: "", country: "US" });
        const [useExistingAddress, setUseExistingAddress] = useState(false);
        const [selectedAddressId, setSelectedAddressId] = useState("");
        const [existingAddresses, setExistingAddresses] = useState<any[]>([]);
        const [authToken, setAuthToken] = useState<string | null>(null);
        const [processing, setProcessing] = useState(false);
        const [errors, setErrors] = useState<Record<string, string>>({});

        // Dedup refs
        const lastSavedRef = useRef("");
        const lastAddressSavedRef = useRef("");

        // EMR state from selection block
        const emrState = enrollmentModule?.isEmr ? enrollmentModule.getEmrCheckoutSelectionState() : null;
        const total = emrState?.total ?? 0;
        const finalTotal = total; // Coupons can be added later

        // ── Extract patient info & auth token from form values ──
        useEffect(() => {
            if (!enrollmentModule || !values) return;

            const storedPatient = enrollmentModule.getStoredPatient?.();
            if (storedPatient) {
                const phone = storedPatient.phone ? enrollmentModule.formatPhoneNumber(storedPatient.phone) : "";
                setPatientInfo({
                    first_name: storedPatient.first_name || storedPatient.firstName || "",
                    last_name: storedPatient.last_name || storedPatient.lastName || "",
                    email: storedPatient.email || "",
                    phone,
                });
            } else {
                const extracted = enrollmentModule.extractPatientInfo?.(values);
                if (extracted?.email || extracted?.first_name) {
                    const phone = extracted.phone ? enrollmentModule.formatPhoneNumber(extracted.phone) : "";
                    setPatientInfo({ ...extracted, phone });
                }
            }

            let token = enrollmentModule.getPatientAuthToken?.();
            if (!token) {
                Object.values(values).forEach((v: any) => {
                    if (v?.authResults?.token) token = v.authResults.token;
                    else if (v?.token) token = v.token;
                });
            }
            if (token) setAuthToken(token);
        }, [values, enrollmentModule]);

        // ── Fetch patient data from API ──
        useEffect(() => {
            if (!authToken || !enrollmentModule) return;
            const fetch = async () => {
                const patient = await enrollmentModule.fetchPatientInfo?.(authToken);
                if (patient) {
                    const phone = patient.phone ? enrollmentModule.formatPhoneNumber(patient.phone) : "";
                    setPatientInfo({ first_name: patient.first_name || "", last_name: patient.last_name || "", email: patient.email || "", phone });
                }
            };
            fetch();
        }, [authToken, enrollmentModule]);

        // ── Auto-save patient info ──
        useEffect(() => {
            if (!enrollmentModule || !patientInfo.first_name || !patientInfo.last_name || !patientInfo.email) return;
            if (!enrollmentModule.isValidEmail?.(patientInfo.email)) return;
            const key = JSON.stringify(patientInfo);
            if (lastSavedRef.current === key) return;
            lastSavedRef.current = key;
            enrollmentModule.setCheckoutPatientInfo?.({ ...patientInfo, phone: enrollmentModule.getRawPhoneDigits?.(patientInfo.phone) || patientInfo.phone });
        }, [patientInfo, enrollmentModule]);

        // ── Fetch existing addresses ──
        useEffect(() => {
            if (!authToken || !enrollmentModule) return;
            const fetch = async () => {
                const addrs = await enrollmentModule.fetchPatientAddresses?.(authToken);
                if (addrs?.length > 0) {
                    setExistingAddresses(addrs);
                    if (allowSavedAddresses) {
                        setUseExistingAddress(true);
                        setSelectedAddressId(String(addrs[0].id));
                    }
                }
            };
            fetch();
        }, [authToken, enrollmentModule]);

        // ── Sync selected address ──
        useEffect(() => {
            if (useExistingAddress && selectedAddressId && existingAddresses.length > 0) {
                const selected = existingAddresses.find((a: any) => a.id === Number(selectedAddressId));
                if (selected) setAddress(selected);
            }
        }, [selectedAddressId, useExistingAddress, existingAddresses]);

        // ── Auto-save address ──
        useEffect(() => {
            if (!enrollmentModule) return;
            const valid = useExistingAddress ? (selectedAddressId && existingAddresses.length > 0) : (address.line1 && address.city && address.state && address.zip);
            if (!valid) return;
            const key = JSON.stringify({ id: address.id, line1: address.line1, city: address.city, state: address.state, zip: address.zip, useExistingAddress, selectedAddressId });
            if (lastAddressSavedRef.current === key) return;
            lastAddressSavedRef.current = key;
            enrollmentModule.setCheckoutAddress?.(address, useExistingAddress, useExistingAddress ? selectedAddressId : undefined);
        }, [address, useExistingAddress, selectedAddressId, existingAddresses, enrollmentModule]);

        // ── Validate ──
        const validateForm = (): boolean => {
            const errs: Record<string, string> = {};
            if (!patientInfo.first_name?.trim()) errs.first_name = "First name is required";
            if (!patientInfo.last_name?.trim()) errs.last_name = "Last name is required";
            if (!patientInfo.email?.trim()) errs.email = "Email is required";
            else if (!enrollmentModule?.isValidEmail?.(patientInfo.email)) errs.email = "Please enter a valid email";
            if (showAddress && !useExistingAddress) {
                if (!address.line1?.trim()) errs.line1 = "Street address is required";
                if (!address.city?.trim()) errs.city = "City is required";
                if (!address.state) errs.state = "State is required";
                if (!address.zip?.trim()) errs.zip = "ZIP code is required";
            }
            setErrors(errs);
            return Object.keys(errs).length === 0;
        };

        // ── Stripe success ──
        const handleStripeSuccess = async (paymentMethodId: string) => {
            if (!enrollmentModule) return;
            setProcessing(true);
            try {
                const patientInfoRaw = { ...patientInfo, phone: enrollmentModule.getRawPhoneDigits?.(patientInfo.phone) || patientInfo.phone };

                enrollmentModule.setCheckoutPaymentData?.({
                    stripePaymentMethodId: paymentMethodId,
                    total: finalTotal,
                });

                enrollmentModule.setCheckoutData?.({
                    patientInfo: patientInfoRaw,
                    address,
                    useExistingAddress,
                    selectedAddressId: useExistingAddress ? selectedAddressId : undefined,
                    stripePaymentMethodId: paymentMethodId,
                    emrVariantId: emrState?.variantId ?? undefined,
                    emrDrugSelection: emrState?.drugSelection ?? undefined,
                    patientVitalId: enrollmentModule.getVitalId?.() ?? undefined,
                    total: finalTotal,
                });

                const result = {
                    success: true,
                    patientInfo: patientInfoRaw,
                    address,
                    useExistingAddress,
                    selectedAddressId: useExistingAddress ? selectedAddressId : undefined,
                    paymentMethodId,
                    variantId: emrState?.variantId,
                    total: finalTotal,
                    timestamp: new Date().toISOString(),
                };

                onChange?.(result as any);
                setProcessing(false);
                goToNextBlock?.({ [fieldName]: result });
            } catch {
                setErrors({ general: "An error occurred during checkout" });
                setProcessing(false);
            }
        };

        const handleStripeError = (msg: string) => {
            setErrors({ payment: msg });
            setProcessing(false);
        };

        // ── Guards ──
        if (!enrollmentModule) {
            return (<div ref={ref}><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>Checkout system not initialized.</AlertDescription></Alert></div>);
        }

        if (!enrollmentModule.isEmr) {
            return (<div ref={ref}><Alert><AlertCircle className="h-4 w-4" /><AlertDescription>This checkout block requires an EMR enrollment module.</AlertDescription></Alert></div>);
        }

        const isDisabled = disabled || processing;

        // ── Stripe component ──
        const StripeForm = enrollmentModule.StripePaymentForm;
        const stripeHandlers = enrollmentModule.createStripePaymentHandlers?.({
            onPaymentSuccess: (data: any) => handleStripeSuccess(data.paymentMethodId),
            onPaymentError: (error: string) => handleStripeError(error),
            validateForm: () => validateForm(),
            getFormData: () => ({ patientInfo }),
        });

        // ── Drugs for order summary ──
        const checkoutBundleSize = Math.max(1, emrState?.variant?.default_dispense_bundle_size ?? 1);
        const standaloneDrugs = enrollmentModule.getStandaloneDrugs?.() ?? [];
        const drugGroups = enrollmentModule.getDrugGroups?.() ?? [];
        const selectedOptionalDrugs = (enrollmentModule.getOptionalDrugs?.() ?? []).filter((d: any) => enrollmentModule.isOptionalDrugSelected(d.id));

        // Resolve the selected phase for a drug to show the correct name/strength
        const resolvePhaseDisplay = (drug: any, phaseId: string | null) => {
            if (!phaseId || !drug?.has_phases || !drug?.phases?.length) {
                return { name: drug?.drug_name || 'Medication', strength: drug?.strength };
            }
            const phase = drug.phases.find((p: any) => p.id === phaseId);
            if (!phase) {
                return { name: drug?.drug_name || 'Medication', strength: drug?.strength };
            }
            return {
                name: phase.local_merchant_drug?.display_name || phase.drug_name || drug?.drug_name || 'Medication',
                strength: phase.strength ?? drug?.strength,
            };
        };

        // Resolve selected drugs from each group
        const selectedGroupDrugs: Array<{ groupName: string; drug: any; phaseId: string | null }> = [];
        for (const group of drugGroups) {
            const selectedIds = enrollmentModule.getDrugGroupSelection?.(group.id) ?? [];
            for (const drug of group.drugs) {
                if (selectedIds.includes(drug.id)) {
                    const phaseId = emrState?.drugSelection?.groupSelections?.[group.id]?.selectedPhases?.[drug.id] ?? null;
                    selectedGroupDrugs.push({ groupName: group.name, drug, phaseId });
                }
            }
        }

        return (
            <div className="emr-checkout-block w-full min-w-0 space-y-6" ref={ref}>

                {/* ─── Order Summary ─── */}
                {showOrderSummary && emrState && (
                    <Card className={cn("overflow-hidden rounded-xl", themeConfig?.card)}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 w-full">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${primaryColor}15` }}>
                                    <Package className="w-6 h-6" style={{ color: primaryColor }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div>
                                            <h3 className={cn("font-semibold text-lg", themeConfig?.title)}>
                                                {enrollmentModule.plan?.name ?? "Treatment Plan"}
                                            </h3>
                                            {emrState.scheduleLabel && (
                                                <Badge className="text-xs mt-1 border-0" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                                                    {emrState.scheduleLabel}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-2xl font-bold" style={{ color: primaryColor }}>{fmt(finalTotal)}</p>
                                            {emrState.scheduleLabel && <p className="text-xs text-muted-foreground">/{emrState.scheduleLabel.toLowerCase()}</p>}
                                        </div>
                                    </div>

                                    {/* Included medications */}
                                    {(standaloneDrugs.length > 0 || selectedGroupDrugs.length > 0) && (
                                        <div className="mt-3 space-y-2">
                                            {standaloneDrugs.map((drug: any) => {
                                                const phaseId = emrState?.drugSelection?.standaloneDrugPhases?.[drug.id] ?? null;
                                                const phaseDisplay = resolvePhaseDisplay(drug, phaseId);
                                                return (
                                                    <div key={drug.id} className="flex items-center gap-2.5 text-sm">
                                                        <DrugThumb drug={drug} primaryColor={primaryColor} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">{phaseDisplay.name}</p>
                                                            {phaseDisplay.strength && <p className="text-xs text-muted-foreground">{phaseDisplay.strength}</p>}
                                                        </div>
                                                        <Check className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
                                                    </div>
                                                );
                                            })}
                                            {selectedGroupDrugs.map(({ groupName, drug, phaseId }) => {
                                                const phaseDisplay = resolvePhaseDisplay(drug, phaseId);
                                                return (
                                                    <div key={`group-${drug.id}`} className="flex items-center gap-2.5 text-sm">
                                                        <DrugThumb drug={drug} primaryColor={primaryColor} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">{phaseDisplay.name}</p>
                                                            <p className="text-xs text-muted-foreground">{groupName}</p>
                                                        </div>
                                                        <Check className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Drug selection add-ons (custom pricing) */}
                                    {emrState.addOnTotal > 0 && (
                                        <div className="mt-2 pt-2 border-t space-y-1" style={{ borderColor: `${primaryColor}10` }}>
                                            <div className="flex items-center justify-between text-sm">
                                                <p className="text-muted-foreground">Drug selection add-ons</p>
                                                <span className="text-xs font-semibold" style={{ color: primaryColor }}>+{fmt(emrState.addOnTotal)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Optional add-ons */}
                                    {selectedOptionalDrugs.length > 0 && (
                                        <div className="mt-2 pt-2 border-t space-y-2" style={{ borderColor: `${primaryColor}10` }}>
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Add-ons</p>
                                            {selectedOptionalDrugs.map((drug: any) => {
                                                const phaseId = emrState?.drugSelection?.optionalDrugPhases?.[drug.id] ?? null;
                                                const phaseDisplay = resolvePhaseDisplay(drug, phaseId);
                                                return (
                                                    <div key={drug.id} className="flex items-center gap-2.5 text-sm">
                                                        <DrugThumb drug={drug} primaryColor={primaryColor} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">{phaseDisplay.name}</p>
                                                            {phaseDisplay.strength && <p className="text-xs text-muted-foreground">{phaseDisplay.strength}</p>}
                                                        </div>
                                                        <span className="text-xs font-semibold shrink-0" style={{ color: primaryColor }}>+{fmt(enrollmentModule.getDrugPrice(drug) * checkoutBundleSize)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 pt-5 border-t" style={{ borderColor: `${primaryColor}15` }}>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Shield className="w-4 h-4" style={{ color: primaryColor }} /> HIPAA Compliant
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Lock className="w-4 h-4" style={{ color: primaryColor }} /> 256-bit Encryption
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Heart className="w-4 h-4" style={{ color: primaryColor }} /> Licensed Providers
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ─── Contact Information ─── */}
                {showContactInfo && (
                    <Card className={cn("overflow-hidden rounded-xl", themeConfig?.card)}>
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                                    <User className="w-5 h-5" style={{ color: primaryColor }} />
                                </div>
                                <div>
                                    <CardTitle className={cn("text-lg", themeConfig?.title)}>Your Information</CardTitle>
                                    <CardDescription className="text-sm">How we'll contact you about your treatment</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="emr_first_name" className="text-sm font-medium">First Name</Label>
                                    <Input id="emr_first_name" value={patientInfo.first_name} onChange={(e) => setPatientInfo({ ...patientInfo, first_name: e.target.value })} className={cn(themeConfig?.field?.input, errors.first_name && "border-red-500")} placeholder="John" disabled={isDisabled} />
                                    {errors.first_name && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.first_name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="emr_last_name" className="text-sm font-medium">Last Name</Label>
                                    <Input id="emr_last_name" value={patientInfo.last_name} onChange={(e) => setPatientInfo({ ...patientInfo, last_name: e.target.value })} className={cn(themeConfig?.field?.input, errors.last_name && "border-red-500")} placeholder="Doe" disabled={isDisabled} />
                                    {errors.last_name && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.last_name}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emr_email" className="text-sm font-medium flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-muted-foreground" />Email Address</Label>
                                <Input id="emr_email" type="email" value={patientInfo.email} onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })} className={cn(themeConfig?.field?.input, errors.email && "border-red-500")} placeholder="john.doe@example.com" disabled={isDisabled} />
                                {errors.email && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                            </div>
                            {collectPhone && (
                                <div className="space-y-2">
                                    <Label htmlFor="emr_phone" className="text-sm font-medium flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-muted-foreground" />Phone Number <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
                                    <Input id="emr_phone" type="tel" value={patientInfo.phone} onChange={(e) => { const formatted = enrollmentModule.formatPhoneNumber?.(e.target.value) ?? e.target.value; setPatientInfo({ ...patientInfo, phone: formatted }); }} className={cn(themeConfig?.field?.input)} placeholder="(555) 123-4567" disabled={isDisabled} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* ─── Shipping Address ─── */}
                {showAddress && (
                    <Card className={cn("overflow-hidden rounded-xl", themeConfig?.card)}>
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                                    <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                                </div>
                                <div>
                                    <CardTitle className={cn("text-lg", themeConfig?.title)}>Shipping Address</CardTitle>
                                    <CardDescription className="text-sm">Where should we deliver your medication?</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Saved addresses */}
                            {allowSavedAddresses && existingAddresses.length > 0 && (
                                <RadioGroup
                                    value={useExistingAddress ? selectedAddressId : "new"}
                                    onValueChange={(v) => {
                                        if (v === "new") { setUseExistingAddress(false); setSelectedAddressId(""); setAddress(enrollmentModule.createEmptyAddress?.()); }
                                        else { setUseExistingAddress(true); setSelectedAddressId(v); }
                                    }}
                                    className="space-y-2"
                                >
                                    {existingAddresses.map((addr: any) => {
                                        const isSelected = useExistingAddress && selectedAddressId === String(addr.id);
                                        return (
                                            <label key={addr.id} className={cn("flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2", isSelected ? "shadow-sm" : "border-transparent bg-slate-50/50 hover:bg-slate-100/50")} style={{ borderColor: isSelected ? primaryColor : "transparent", backgroundColor: isSelected ? `${primaryColor}08` : undefined }}>
                                                <RadioGroupItem value={String(addr.id)} className="sr-only" />
                                                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all" style={{ borderColor: isSelected ? primaryColor : "#cbd5e1", backgroundColor: isSelected ? primaryColor : "transparent" }}>
                                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm">{addr.line1}</p>
                                                    {addr.line2 && <p className="text-xs text-muted-foreground">{addr.line2}</p>}
                                                    <p className="text-xs text-muted-foreground">{addr.city}, {addr.state} {addr.zip}</p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                    <label className={cn("flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2", !useExistingAddress ? "shadow-sm" : "border-transparent bg-slate-50/50 hover:bg-slate-100/50")} style={{ borderColor: !useExistingAddress ? primaryColor : "transparent", backgroundColor: !useExistingAddress ? `${primaryColor}08` : undefined }}>
                                        <RadioGroupItem value="new" className="sr-only" />
                                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all" style={{ borderColor: !useExistingAddress ? primaryColor : "#cbd5e1", backgroundColor: !useExistingAddress ? primaryColor : "transparent" }}>
                                            {!useExistingAddress && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="font-medium text-sm">Use a different address</span>
                                    </label>
                                </RadioGroup>
                            )}

                            {/* New address form */}
                            {(!useExistingAddress || existingAddresses.length === 0) && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Street Address</Label>
                                        <Input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className={cn(themeConfig?.field?.input, errors.line1 && "border-red-500")} placeholder="123 Main Street" disabled={isDisabled} />
                                        {errors.line1 && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.line1}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">Apartment, Suite, etc. <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
                                        <Input value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} className={cn(themeConfig?.field?.input)} placeholder="Apt 4B" disabled={isDisabled} />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">City</Label>
                                            <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className={cn(themeConfig?.field?.input, errors.city && "border-red-500")} placeholder="New York" disabled={isDisabled} />
                                            {errors.city && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">State</Label>
                                            <Select value={address.state} onValueChange={(v) => setAddress({ ...address, state: v })} disabled={isDisabled}>
                                                <SelectTrigger className={cn(themeConfig?.field?.select, errors.state && "border-red-500")}><SelectValue placeholder="Select state" /></SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    {enrollmentModule?.US_STATES?.map((s: string) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                                                </SelectContent>
                                            </Select>
                                            {errors.state && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.state}</p>}
                                        </div>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">ZIP Code</Label>
                                            <Input value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className={cn(themeConfig?.field?.input, errors.zip && "border-red-500")} placeholder="10001" disabled={isDisabled} />
                                            {errors.zip && <p className={cn("text-xs flex items-center gap-1", themeConfig?.field?.error || "text-red-500")}><AlertCircle className="w-3 h-3" />{errors.zip}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Country</Label>
                                            <Select value={address.country} onValueChange={(v) => setAddress({ ...address, country: v })} disabled={isDisabled}>
                                                <SelectTrigger className={cn(themeConfig?.field?.select)}><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    {(enrollmentModule?.SUPPORTED_COUNTRIES ?? [{ code: "US", name: "United States" }]).map((c: any) => (<SelectItem key={c.code ?? c} value={c.code ?? c}>{c.name ?? c}</SelectItem>))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* ─── Payment ─── */}
                <Card className={cn("overflow-hidden rounded-xl", themeConfig?.card)}>
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${primaryColor}15` }}>
                                <CreditCard className="w-5 h-5" style={{ color: primaryColor }} />
                            </div>
                            <div>
                                <CardTitle className={cn("text-lg", themeConfig?.title)}>Payment</CardTitle>
                                <CardDescription className="text-sm">Secure payment powered by Stripe</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {errors.payment && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.payment}</AlertDescription>
                            </Alert>
                        )}
                        {errors.general && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.general}</AlertDescription>
                            </Alert>
                        )}

                        {processing && (
                            <div className="flex items-center justify-center gap-3 py-8">
                                <Loader2 className="w-6 h-6 animate-spin" style={{ color: primaryColor }} />
                                <span className="text-sm text-muted-foreground">Processing your payment...</span>
                            </div>
                        )}

                        {!processing && StripeForm && stripeHandlers && authToken && (
                            <StripeForm
                                amount={Math.round(finalTotal * 100)}
                                currency="USD"
                                merchantId={enrollmentModule.merchant?.id}
                                authToken={authToken}
                                onSuccess={stripeHandlers.handleStripePaymentSuccess}
                                onError={stripeHandlers.handleStripePaymentError}
                                paymentElementLayout="tabs"
                                appearance={{
                                    theme: "stripe" as const,
                                    variables: {
                                        colorPrimary: primaryColor,
                                        colorBackground: themeConfig?.colors?.background || "#ffffff",
                                        colorText: themeConfig?.colors?.text || "#30313d",
                                        colorDanger: themeConfig?.colors?.error || "#df1b41",
                                        fontFamily: themeConfig?.fonts?.primary || "system-ui, sans-serif",
                                        spacingUnit: "2px",
                                        borderRadius: "4px",
                                    },
                                }}
                                submitButtonAppearance={{
                                    className: themeConfig?.button?.primary || "w-full bg-green-600 hover:bg-green-700",
                                    text: `Pay ${fmt(finalTotal)}`,
                                    loadingText: "Processing...",
                                    processingText: "Please wait...",
                                }}
                            />
                        )}

                        {!processing && (!StripeForm || !authToken) && (
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {!authToken ? "Please complete authentication first to enable payment." : "Payment system is loading. Please wait..."}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }
);

EmrCheckoutRenderer.displayName = "EmrCheckoutRenderer";

// ============================================================
// Block Definition
// ============================================================

export const EmrCheckoutBlock: BlockDefinition = {
    type: "unifiedCheckout",
    name: "Unified Checkout",
    description: "Complete checkout for EMR treatment plans with order summary, contact info, address, and payment",
    icon: <CreditCard className="w-4 h-4" />,
    defaultData: {
        type: "unifiedCheckout",
        fieldName: "unifiedCheckout",
        title: "Complete Your Order",
        showOrderSummary: true,
        showContactInfo: true,
        collectPhone: true,
        showAddress: true,
        allowSavedAddresses: true,
    },
    generateDefaultData: () => ({
        type: "unifiedCheckout",
        fieldName: "unifiedCheckout",
        title: "Complete Your Order",
        showOrderSummary: true,
        showContactInfo: true,
        collectPhone: true,
        showAddress: true,
        allowSavedAddresses: true,
    }),
    renderItem: (props) => <EmrCheckoutBlockItem {...props} />,
    renderFormFields: (props) => <EmrCheckoutBlockForm {...props} />,
    renderPreview: () => <EmrCheckoutBlockPreview />,
    renderBlock: (props) => <EmrCheckoutRenderer {...props} />,
    validate: (data) => {
        if (!data.fieldName) return "Field name is required";
        return null;
    },
    validateValue: (value) => {
        if (!value) return "Checkout is required";
        const v = typeof value === "string" ? JSON.parse(value) : value;
        if (!v.success) return "Please complete checkout";
        return null;
    },
    outputSchema: {
        type: "object",
        properties: {
            success: { type: "boolean", description: "Payment completed successfully" },
            patientInfo: { type: "object", description: "Patient contact information" },
            address: { type: "object", description: "Shipping address" },
            useExistingAddress: { type: "boolean", description: "Whether a saved address was used" },
            paymentMethodId: { type: "string", description: "Stripe payment method ID" },
            variantId: { type: "string", description: "Selected EMR refill variant ID" },
            total: { type: "number", description: "Total amount charged" },
            timestamp: { type: "string", description: "Checkout completion time" },
        },
    },
};

export default EmrCheckoutBlock;
