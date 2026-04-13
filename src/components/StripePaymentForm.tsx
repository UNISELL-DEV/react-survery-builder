import React, { useState, useEffect } from 'react';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions, Appearance, StripePaymentElementOptions } from '@stripe/stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, Trash2, AlertCircle, Plus, Building2, Wallet, Link } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
    fetchPaymentMethods,
    getDefaultPaymentMethod,
    createSetupIntent,
    deletePaymentMethod as deletePaymentMethodApi,
    savePaymentMethod,
    isSetupIntentProcessing,
    isSetupIntentSucceeded,
} from '@/lib/enrollment-utils';
import { StripePaymentMethod, StripeSetupIntent } from '@/lib/enrollment-types';

export interface SubmitButtonAppearance {
    className?: string;
    style?: React.CSSProperties;
    text?: string;
    loadingText?: string;
    processingText?: string;
}

interface StripePaymentFormProps {
    amount: number;
    currency?: string;
    merchantId: number;
    authToken: string;
    onSuccess: (paymentMethodId: string) => void;
    onError: (error: string) => void;
    saveOnly?: boolean;
    processing?: boolean;
    // Internal prop - setup intent passed from wrapper to avoid duplicate API calls
    initialSetupIntent?: StripeSetupIntent;
    // PaymentElement layout configuration
    paymentElementLayout?: StripePaymentElementOptions['layout'];
    // Submit button customization
    submitButtonAppearance?: SubmitButtonAppearance;
}

// Helper to get icon for payment method type
const PaymentMethodIcon = ({ type, className }: { type: string; className?: string }) => {
    switch (type) {
        case 'card':
            return <CreditCard className={className} />;
        case 'us_bank_account':
        case 'bank_account':
            return <Building2 className={className} />;
        case 'link':
            return <Link className={className} />;
        case 'amazon_pay':
        case 'klarna':
        case 'afterpay_clearpay':
        case 'cashapp':
            return <Wallet className={className} />;
        default:
            return <CreditCard className={className} />;
    }
};

const PaymentFormContent: React.FC<StripePaymentFormProps> = ({
    amount,
    currency = 'usd',
    merchantId,
    authToken,
    onSuccess,
    onError,
    saveOnly = false,
    processing = false,
    initialSetupIntent,
    paymentElementLayout = 'tabs',
    submitButtonAppearance,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethod[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('new');
    // Always save the card - required for processing payment after prescription approval
    const saveCard = true;
    const [error, setError] = useState<string | null>(null);
    // Use initialSetupIntent if provided (from wrapper) to avoid duplicate API calls
    const [setupIntent, setSetupIntent] = useState<StripeSetupIntent | null>(initialSetupIntent || null);
    const [loadingMethods, setLoadingMethods] = useState(true);
    const [deletingMethod, setDeletingMethod] = useState<number | null>(null);

    // Load payment methods on mount (setup intent already provided by wrapper)
    useEffect(() => {
        loadPaymentMethods();
    }, []);

    // Only create a NEW setup intent if switching to 'new' AND we don't have one
    // This handles the case where the initial setup intent was used/expired
    useEffect(() => {
        if (selectedPaymentMethod === 'new' && !setupIntent && !initialSetupIntent) {
            initializeSetupIntent();
        }
    }, [selectedPaymentMethod]);

    // Use utility function to fetch payment methods
    const loadPaymentMethods = async () => {
        try {
            setLoadingMethods(true);
            const methods = await fetchPaymentMethods(authToken, merchantId);
            setPaymentMethods(methods);

            // Select default payment method if exists
            const defaultMethod = getDefaultPaymentMethod(methods);
            if (defaultMethod) {
                setSelectedPaymentMethod(defaultMethod.id.toString());
            }
        } catch (error) {
            console.error('Failed to fetch payment methods:', error);
        } finally {
            setLoadingMethods(false);
        }
    };

    // Use utility function to create setup intent
    const initializeSetupIntent = async (forceNew = false) => {
        const result = await createSetupIntent(authToken, merchantId, forceNew);
        if (result.success && result.setupIntent) {
            setSetupIntent(result.setupIntent);
            return result.setupIntent;
        } else {
            setError(result.error || 'Failed to initialize payment setup');
        }
        return null;
    };

    // Use utility function to delete payment method
    const handleDeletePaymentMethod = async (methodId: number) => {
        if (!confirm('Are you sure you want to remove this payment method?')) {
            return;
        }

        try {
            setDeletingMethod(methodId);
            const result = await deletePaymentMethodApi(authToken, methodId);

            if (result.success) {
                // Refresh payment methods
                await loadPaymentMethods();
                // If deleted method was selected, switch to new
                if (selectedPaymentMethod === methodId.toString()) {
                    setSelectedPaymentMethod('new');
                }
            }
        } catch (error) {
            console.error('Failed to delete payment method:', error);
        } finally {
            setDeletingMethod(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (selectedPaymentMethod === 'new') {
                // Process new payment method
                if (!setupIntent || !setupIntent.client_secret) {
                    setError('Payment setup not initialized');
                    setLoading(false);
                    return;
                }

                // First, check if the setup intent has already been confirmed
                const { setupIntent: retrievedIntent } = await stripe.retrieveSetupIntent(setupIntent.client_secret);

                let confirmedIntent = retrievedIntent;

                // Check the status of the retrieved intent using utility function
                if (retrievedIntent && isSetupIntentProcessing(retrievedIntent.status)) {
                    // Wait a bit and check again
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const { setupIntent: recheckedIntent } = await stripe.retrieveSetupIntent(setupIntent.client_secret);
                    confirmedIntent = recheckedIntent;
                }

                // Only confirm if not already succeeded (using utility function)
                if (confirmedIntent && !isSetupIntentSucceeded(confirmedIntent.status)) {
                    // Confirm the setup intent using PaymentElement (supports all payment methods)
                    const { error: confirmError, setupIntent: newlyConfirmedIntent } = await stripe.confirmSetup({
                        elements,
                        confirmParams: {
                            return_url: window.location.href, // Required but won't be used for non-redirect methods
                        },
                        redirect: 'if_required', // Only redirect if the payment method requires it
                    });

                    if (confirmError) {
                        // Check if the error is about already succeeded intent
                        if (confirmError.message?.includes('already succeeded')) {
                            // Try to retrieve the already confirmed intent
                            const { setupIntent: alreadyConfirmedIntent } = await stripe.retrieveSetupIntent(setupIntent.client_secret);
                            if (alreadyConfirmedIntent && alreadyConfirmedIntent.payment_method) {
                                confirmedIntent = alreadyConfirmedIntent;
                            } else {
                                // If we still can't get the payment method, create a new setup intent
                                await initializeSetupIntent(true);
                                setError('Payment setup expired. Please try again.');
                                setLoading(false);
                                return;
                            }
                        } else {
                            setError(confirmError.message || 'Failed to confirm payment method');
                            setLoading(false);
                            return;
                        }
                    } else {
                        confirmedIntent = newlyConfirmedIntent;
                    }
                }

                if (confirmedIntent && confirmedIntent.payment_method) {
                    // Save the payment method if requested using utility function
                    if (saveCard) {
                        const saveResult = await savePaymentMethod(
                            authToken,
                            merchantId,
                            confirmedIntent.payment_method as string,
                            setupIntent.customer_id,
                            setupIntent.id,
                            true
                        );

                        if (!saveResult.success) {
                            console.error('Failed to save payment method:', saveResult.error);
                        }
                    }

                    onSuccess(confirmedIntent.payment_method as string);
                } else {
                    setError('Unable to retrieve payment method. Please try again.');
                    setLoading(false);
                }
            } else {
                // Use existing payment method
                onSuccess(selectedPaymentMethod);
            }
        } catch (err: any) {
            setError(err.message || 'Payment processing failed');
            onError(err.message || 'Payment processing failed');
        } finally {
            setLoading(false);
        }
    };

    if (loadingMethods) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Methods Selection */}
            <div className="space-y-4">
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    {/* Existing payment methods */}
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="relative">
                            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem value={method.id.toString()} id={`method-${method.id}`} />
                                <Label
                                    htmlFor={`method-${method.id}`}
                                    className="flex-1 flex items-center justify-between cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <PaymentMethodIcon type={method.type} className="h-5 w-5" />
                                        <div>
                                            <div className="font-medium">{method.display_name}</div>
                                            {method.exp_month && method.exp_year && (
                                                <div className="text-sm text-gray-500">
                                                    Expires {method.exp_month}/{method.exp_year}
                                                </div>
                                            )}
                                            {method.is_expired && (
                                                <div className="text-sm text-red-500">Expired</div>
                                            )}
                                        </div>
                                    </div>
                                    {method.is_default && (
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            Default
                                        </span>
                                    )}
                                </Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeletePaymentMethod(method.id)}
                                    disabled={deletingMethod === method.id}
                                >
                                    {deletingMethod === method.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Add new card option */}
                    {paymentMethods.length > 0 &&
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="new" id="method-new" />
                        <Label htmlFor="method-new" className="flex-1 cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <Plus className="h-5 w-5" />
                                <span className="font-medium">Add new payment method</span>
                            </div>
                        </Label>
                    </div> }
                </RadioGroup>
            </div>

            {/* New Payment Method Form */}
            {selectedPaymentMethod === 'new' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <PaymentElement
                            options={{
                                layout: paymentElementLayout,
                            }}
                        />

                        <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Your payment method will be securely saved to process the payment once your prescription is approved.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Error Message */}
            {error && (
                <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className='text-gray-900 dark:text-gray-300'>{error}</AlertDescription>
                </Alert>
            )}

            {/* Amount Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Amount to authorize:</span>
                    <span className="text-xl font-bold">{formatCurrency(amount/100, currency)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Your payment method will be saved and charged after your order is approved.
                </p>
            </div>

            {/* Submit Button */}
            <div className='w-full'>
            <Button
                type="submit"
                className={submitButtonAppearance?.className ?? 'w-full'}
                style={submitButtonAppearance?.style}
                disabled={!stripe || loading || processing}
                size="lg"
            >
                {loading || processing ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {processing
                            ? (submitButtonAppearance?.processingText ?? 'Submitting Enrollment...')
                            : (submitButtonAppearance?.loadingText ?? 'Processing Payment...')}
                    </>
                ) : (
                    submitButtonAppearance?.text ?? 'Complete Enrollment'
                )}
            </Button>
            </div>
        </form>
    );
};

// Default appearance configuration for Stripe Elements
const defaultAppearance: Appearance = {
    theme: 'stripe',
    variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
    },
};

interface StripePaymentFormWrapperProps extends StripePaymentFormProps {
    stripeAccount?: string;
    publishableKey?: string;
    // Custom appearance configuration for Stripe Elements (merged with defaults)
    appearance?: Appearance;
}

const StripePaymentForm: React.FC<StripePaymentFormWrapperProps> = (props) => {
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [elementsOptions, setElementsOptions] = useState<StripeElementsOptions | null>(null);
    // Store setup intent to pass to PaymentFormContent (avoids duplicate API calls)
    const [cachedSetupIntent, setCachedSetupIntent] = useState<StripeSetupIntent | null>(null);
    // Track if we've already initialized to prevent duplicate calls
    const hasInitializedRef = React.useRef(false);

    useEffect(() => {
        // Prevent duplicate initialization (React StrictMode, re-renders)
        if (hasInitializedRef.current) {
            return;
        }
        hasInitializedRef.current = true;

        // Use utility function to fetch setup intent and initialize Stripe
        const initializeStripe = async () => {
            const result = await createSetupIntent(props.authToken, props.merchantId);

            if (result.success && result.setupIntent) {
                // Cache the setup intent to pass to PaymentFormContent
                setCachedSetupIntent(result.setupIntent);

                // Initialize Stripe with the merchant's publishable key and connected account
                const stripe = loadStripe(result.setupIntent.publishable_key, {
                    stripeAccount: result.setupIntent.stripe_account,
                });

                // Merge custom appearance with defaults
                const mergedAppearance: Appearance = {
                    ...defaultAppearance,
                    ...props.appearance,
                    variables: {
                        ...defaultAppearance.variables,
                        ...props.appearance?.variables,
                    },
                    rules: {
                        ...defaultAppearance.rules,
                        ...props.appearance?.rules,
                    },
                };

                setStripePromise(stripe);
                setElementsOptions({
                    clientSecret: result.setupIntent.client_secret,
                    appearance: mergedAppearance,
                });
            } else {
                console.error('Failed to initialize Stripe:', result.error);
                props.onError('Failed to initialize payment system');
            }
        };

        initializeStripe();
    }, [props.merchantId, props.authToken]);

    if (!stripePromise || !elementsOptions) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Initializing payment system...</span>
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise} options={elementsOptions}>
            <PaymentFormContent {...props} initialSetupIntent={cachedSetupIntent || undefined} />
        </Elements>
    );
};

export default StripePaymentForm;