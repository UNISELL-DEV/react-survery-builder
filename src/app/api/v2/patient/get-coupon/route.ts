import { NextRequest, NextResponse } from 'next/server';
import { DEMO_COUPONS, calculateDiscount } from '@/lib/demo-data';

/**
 * DEMO: Get applicable coupons for a patient/treatment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const subtotal = body.subtotal || 10000; // default $100

    const coupons = DEMO_COUPONS.map((coupon) => ({
      ...coupon,
      ...calculateDiscount(coupon, subtotal),
    }));

    return NextResponse.json({
      success: true,
      coupons,
      subtotal,
      count: coupons.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request', coupons: [], subtotal: 0, count: 0 },
      { status: 400 },
    );
  }
}
