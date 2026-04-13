/**
 * DEMO/FAKE BACKEND DATA
 * All data in this file is for demo purposes only.
 * In production, these endpoints are handled by the real Laravel backend.
 */

import { NextRequest } from 'next/server';

// ============================================================================
// Constants
// ============================================================================

export const DEMO_OTP = '123456';
export const DEMO_TOKEN = 'demo-token-abc123xyz';

export const DEMO_PATIENT = {
  id: 1001,
  email: 'demo@example.com',
  first_name: 'Jane',
  last_name: 'Doe',
  firstName: 'Jane',
  lastName: 'Doe',
  phone: '+15551234567',
  gender: 'female',
  genderBiological: 'female',
  dateOfBirth: '1990-05-15',
  height: 165,
  weight: 62,
};

export const DEMO_ADDRESSES = [
  {
    id: 1,
    line1: '123 Main Street',
    line2: 'Apt 4B',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    country: 'US',
    full_address: '123 Main Street, Apt 4B, Los Angeles, CA 90001',
  },
  {
    id: 2,
    line1: '456 Oak Avenue',
    line2: null,
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'US',
    full_address: '456 Oak Avenue, San Francisco, CA 94102',
  },
];

export const DEMO_ANALYTICS_CONFIG = {
  gtm_id: 'GTM-DEMO123',
  ga4_id: 'G-DEMO456',
  meta_pixel_id: '1234567890',
};

export const DEMO_COUPONS = [
  {
    id: 1,
    code: 'SAVE10',
    description: '10% off your order',
    type: 'percentage' as const,
    value: 10,
    minimum_amount: null,
    maximum_discount: 5000, // $50.00 in cents
    valid_until: '2027-12-31',
    applicable_to: ['all'],
    savings_percentage: 10,
  },
  {
    id: 2,
    code: 'FLAT20',
    description: '$20 off your order',
    type: 'fixed_amount' as const,
    value: 2000, // $20.00 in cents
    minimum_amount: 5000, // minimum $50.00
    maximum_discount: null,
    valid_until: '2027-12-31',
    applicable_to: ['all'],
    savings_percentage: 0,
  },
];

type DemoCoupon = (typeof DEMO_COUPONS)[number];

export function calculateDiscount(coupon: DemoCoupon, subtotal: number) {
  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = Math.round((subtotal * coupon.value) / 100);
    if (coupon.maximum_discount) {
      discountAmount = Math.min(discountAmount, coupon.maximum_discount);
    }
  } else {
    discountAmount = coupon.value;
  }

  const formattedDiscount =
    coupon.type === 'percentage'
      ? `${coupon.value}% off`
      : `$${(coupon.value / 100).toFixed(2)} off`;

  return { discount_amount: discountAmount, formatted_discount: formattedDiscount };
}

interface DemoPaymentMethod {
  id: number;
  type: string;
  brand?: string;
  last4: string;
  exp_month?: string;
  exp_year?: string;
  bank_name?: string;
  is_default: boolean;
  is_expired: boolean;
  display_name: string;
}

const INITIAL_PAYMENT_METHODS: DemoPaymentMethod[] = [
  {
    id: 1,
    type: 'card',
    brand: 'visa',
    last4: '4242',
    exp_month: '12',
    exp_year: '2027',
    is_default: true,
    is_expired: false,
    display_name: 'Visa ending in 4242',
  },
];

// ============================================================================
// DemoStore Singleton
// ============================================================================

class DemoStore {
  private static instance: DemoStore;

  private vitals: Map<number, Record<string, any>> = new Map();
  private nextVitalId = 1;

  private paymentMethods: DemoPaymentMethod[] = [...INITIAL_PAYMENT_METHODS];
  private nextPaymentMethodId = 2;

  private stripeCustomerId: string | null = null;

  // Mutable patient data (updated via /api/v2/patient/update)
  private patientOverrides: Record<string, any> = {};

  static getInstance(): DemoStore {
    if (!DemoStore.instance) {
      DemoStore.instance = new DemoStore();
    }
    return DemoStore.instance;
  }

  // -- Patient --

  getPatient(): typeof DEMO_PATIENT & Record<string, any> {
    return { ...DEMO_PATIENT, ...this.patientOverrides };
  }

  updatePatient(fields: Record<string, any>): typeof DEMO_PATIENT & Record<string, any> {
    this.patientOverrides = { ...this.patientOverrides, ...fields };
    return this.getPatient();
  }

  // -- Vitals --

  createVital(data: Record<string, any>): { id: number } {
    const id = this.nextVitalId++;
    this.vitals.set(id, { ...data, id });
    return { id };
  }

  updateVital(id: number, data: Record<string, any>): boolean {
    const existing = this.vitals.get(id);
    if (!existing) return false;
    this.vitals.set(id, { ...existing, ...data });
    return true;
  }

  // -- Payment Methods --

  getPaymentMethods(): DemoPaymentMethod[] {
    return [...this.paymentMethods];
  }

  addPaymentMethod(pm: Partial<DemoPaymentMethod>): DemoPaymentMethod {
    const newMethod: DemoPaymentMethod = {
      id: this.nextPaymentMethodId++,
      type: pm.type || 'card',
      brand: pm.brand || 'visa',
      last4: pm.last4 || '0000',
      exp_month: pm.exp_month || '12',
      exp_year: pm.exp_year || '2028',
      is_default: pm.is_default ?? false,
      is_expired: false,
      display_name: pm.display_name || `Card ending in ${pm.last4 || '0000'}`,
    };

    // If setting as default, unset others
    if (newMethod.is_default) {
      this.paymentMethods.forEach((m) => (m.is_default = false));
    }

    this.paymentMethods.push(newMethod);
    return newMethod;
  }

  deletePaymentMethod(id: number): boolean {
    const idx = this.paymentMethods.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.paymentMethods.splice(idx, 1);
    return true;
  }

  // -- Stripe Customer --

  getStripeCustomerId(): string | null {
    return this.stripeCustomerId;
  }

  setStripeCustomerId(id: string): void {
    this.stripeCustomerId = id;
  }
}

export const demoStore = DemoStore.getInstance();

// ============================================================================
// Auth Helper
// ============================================================================

export function validateDemoAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === DEMO_TOKEN;
}

