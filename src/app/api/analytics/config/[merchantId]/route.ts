import { NextResponse } from 'next/server';
import { DEMO_ANALYTICS_CONFIG } from '@/lib/demo-data';

/**
 * DEMO: Get analytics configuration for a merchant
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    config: DEMO_ANALYTICS_CONFIG,
    active_providers: ['gtm', 'ga4', 'meta'],
  });
}
