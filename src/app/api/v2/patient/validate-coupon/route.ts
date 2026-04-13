import { NextRequest, NextResponse } from 'next/server';
import { DEMO_COUPONS, calculateDiscount } from '@/lib/demo-data';

/**
 * DEMO: Validate a specific coupon code
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coupon_code, subtotal = 10000 } = body;

    if (!coupon_code) {
      return NextResponse.json(
        { success: false, valid: false, error: 'Coupon code is required' },
        { status: 400 },
      );
    }

    const coupon = DEMO_COUPONS.find(
      (c) => c.code.toLowerCase() === coupon_code.toLowerCase(),
    );

    if (!coupon) {
      return NextResponse.json({
        success: true,
        valid: false,
        error: 'Invalid coupon code',
      });
    }

    // Check minimum amount
    if (coupon.minimum_amount && subtotal < coupon.minimum_amount) {
      return NextResponse.json({
        success: true,
        valid: false,
        error: `Minimum order of $${(coupon.minimum_amount / 100).toFixed(2)} required`,
      });
    }

    return NextResponse.json({
      success: true,
      valid: true,
      coupon: {
        ...coupon,
        ...calculateDiscount(coupon, subtotal),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, valid: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
