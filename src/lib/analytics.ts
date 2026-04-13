/**
 * Analytics Manager for tracking patient enrollment lifecycle
 *
 * Sends events to backend which distributes to GTM, GA4, and Meta
 * with automatic HIPAA filtering based on merchant settings.
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
  session_id?: string;
  user_id?: string;
  timestamp?: number;
}

export interface AnalyticsConfig {
  gtm_id?: string | null;
  ga4_id?: string | null;
  meta_pixel_id?: string | null;
}

/**
 * Cookie utility functions for session management
 */
const ANALYTICS_SESSION_COOKIE = 'analytics_session_id';
const ANALYTICS_USER_COOKIE_PREFIX = 'analytics_user_id_';
const COOKIE_EXPIRY_DAYS = 30;

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }

  return null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export class AnalyticsManager {
  private merchantId: number;
  private sessionId: string;
  private userId: string | undefined;
  private treatmentId: number | undefined;
  private isEnabled: boolean = true; // Always enabled for internal tracking
  private startTime: number;

  constructor(merchantId: number, treatmentId?: number) {
    this.merchantId = merchantId;
    this.treatmentId = treatmentId;
    this.sessionId = this.getOrCreateSessionId();
    this.userId = this.getStoredUserId();
    this.startTime = Date.now();
  }

  /**
   * Initialize analytics manager - checks if merchant has analytics configured
   * Note: Analytics is already enabled by default for internal tracking
   */
  async initialize(): Promise<AnalyticsConfig | null> {
    try {
      const response = await fetch(`/api/analytics/config/${this.merchantId}`);

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          const config = data.config || {};
          const hasExternalProviders = !!(config.gtm_id || config.ga4_id || config.meta_pixel_id);

          // if (hasExternalProviders) {
          //   // console.log('[Analytics] Initialized with external providers:', data.active_providers);
          // } else {
          //   // console.log('[Analytics] Initialized for internal tracking only');
          // }

          return config;
        }
      }

      console.log('[Analytics] No config found, using internal tracking only');
      return null;
    } catch (error) {
      console.error('[Analytics] Failed to initialize:', error);
      return null;
    }
  }

  /**
   * Track a custom event
   */
  async trackEvent(event: AnalyticsEvent): Promise<void> {
    if (!this.isEnabled) {
      console.warn('[Analytics] Analytics not enabled, skipping event:', event);
      return;
    }

    // Update cookie expiration on every event (sliding expiration)
    this.extendSessionCookie();

    const fullEvent = {
      ...event,
      session_id: event.session_id || this.sessionId,
      user_id: event.user_id || this.userId,
      timestamp: event.timestamp || Date.now(),
    };

    // Push to GTM dataLayer if available
    this.pushToDataLayer(fullEvent);

    try {
      const payload = {
        merchant_id: this.merchantId,
        event: fullEvent,
      };

      // console.log('[Analytics] Tracking event:', payload);

      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('[Analytics] Failed to track event:', error);
      } else {
        const result = await response.json();
        // console.log('[Analytics] Event tracked successfully:', result);
      }
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error);
    }
  }

  /**
   * Track a page view
   */
  async trackPageView(url: string, title?: string, additionalData?: Record<string, any>): Promise<void> {
    if (!this.isEnabled) {
      console.warn('[Analytics] Analytics not enabled, skipping page view');
      return;
    }

    // Update cookie expiration on every event (sliding expiration)
    this.extendSessionCookie();

    try {
      const payload = {
        merchant_id: this.merchantId,
        url,
        title,
        additional_data: {
          ...additionalData,
          session_id: this.sessionId,
        },
      };

      // console.log('[Analytics] Tracking page view:', payload);

      const response = await fetch('/api/analytics/page-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('[Analytics] Failed to track page view:', error);
      } else {
        // console.log('[Analytics] Page view tracked successfully');
      }
    } catch (error) {
      console.error('[Analytics] Error tracking page view:', error);
    }
  }

  /**
   * Track survey lifecycle events
   */
  async trackSurveyStart(treatmentId: number, treatmentName: string, formCount: number): Promise<void> {
    await this.trackEvent({
      category: 'survey',
      action: 'survey_start',
      label: treatmentName,
      metadata: {
        treatment_id: treatmentId,
        form_count: formCount,
      },
    });
  }

  async trackSurveyComplete(treatmentId: number, treatmentName: string, completedPages: number): Promise<void> {
    const completionTime = Date.now() - this.startTime;

    await this.trackEvent({
      category: 'survey',
      action: 'survey_complete',
      label: treatmentName,
      value: completionTime,
      metadata: {
        treatment_id: treatmentId,
        completed_pages: completedPages,
        completion_time_ms: completionTime,
      },
    });
  }

  async trackSurveyAbandon(treatmentId: number, treatmentName: string, currentPage: number, totalPages: number): Promise<void> {
    const timeSpent = Date.now() - this.startTime;

    await this.trackEvent({
      category: 'survey',
      action: 'survey_abandon',
      label: treatmentName,
      value: timeSpent,
      metadata: {
        treatment_id: treatmentId,
        current_page: currentPage,
        total_pages: totalPages,
        time_spent_ms: timeSpent,
      },
    });
  }

  async trackFormPageView(treatmentId: number, pageIndex: number, totalPages: number, formName?: string): Promise<void> {
    await this.trackEvent({
      category: 'survey',
      action: 'page_view',
      label: formName || `Form Page ${pageIndex + 1}`,
      metadata: {
        treatment_id: treatmentId,
        page_index: pageIndex,
        total_pages: totalPages,
        form_name: formName,
      },
    });
  }

  async trackUserAuthenticated(treatmentId: number, patientId?: string): Promise<void> {
    await this.trackEvent({
      category: 'survey',
      action: 'user_authenticated',
      metadata: {
        treatment_id: treatmentId,
      },
      user_id: patientId,
    });
  }

  async trackCheckoutView(treatmentId: number, totalAmount: number, currency: string): Promise<void> {
    await this.trackEvent({
      category: 'checkout',
      action: 'checkout_view',
      value: totalAmount,
      metadata: {
        treatment_id: treatmentId,
        currency,
        amount: totalAmount,
      },
    });
  }

  async trackPaymentAuthorized(treatmentId: number, totalAmount: number, currency: string, paymentMethod?: string): Promise<void> {
    await this.trackEvent({
      category: 'checkout',
      action: 'payment_authorized',
      value: totalAmount,
      metadata: {
        treatment_id: treatmentId,
        currency,
        amount: totalAmount,
        payment_method: paymentMethod,
      },
    });
  }

  async trackEnrollmentComplete(treatmentId: number, enrollmentId: number, totalAmount: number): Promise<void> {
    await this.trackEvent({
      category: 'enrollment',
      action: 'enrollment_complete',
      value: totalAmount,
      metadata: {
        treatment_id: treatmentId,
        enrollment_id: enrollmentId,
        amount: totalAmount,
      },
    });
  }

  /**
   * Track timing/performance metrics
   */
  async trackTiming(category: string, variable: string, value: number, label?: string): Promise<void> {
    await this.trackEvent({
      category: category,
      action: 'timing',
      label: label || variable,
      value: value,
      metadata: {
        variable,
        timing_ms: value,
      },
    });
  }

  /**
   * Set user properties
   */
  async setUserProperties(properties: Record<string, any>): Promise<void> {
    await this.trackEvent({
      category: 'user',
      action: 'set_properties',
      metadata: {
        properties,
      },
    });
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Get the current user ID
   */
  getUserId(): string | undefined {
    return this.userId;
  }

  /**
   * Get Meta Pixel fbp cookie (_fbp)
   * This cookie is critical for Meta Conversion API attribution
   */
  getMetaFbp(): string | null {
    return getCookie('_fbp');
  }

  /**
   * Get Meta Pixel fbc cookie (_fbc)
   * This cookie contains the Facebook Click ID for ad attribution
   */
  getMetaFbc(): string | null {
    return getCookie('_fbc');
  }

  /**
   * Get all tracking identifiers for backend submission
   * Includes session_id and Meta Pixel cookies
   */
  getTrackingData(): { session_id: string; fbp?: string; fbc?: string } {
    const trackingData: { session_id: string; fbp?: string; fbc?: string } = {
      session_id: this.sessionId,
    };

    const fbp = this.getMetaFbp();
    if (fbp) {
      trackingData.fbp = fbp;
    }

    const fbc = this.getMetaFbc();
    if (fbc) {
      trackingData.fbc = fbc;
    }

    return trackingData;
  }

  /**
   * Set the user ID for this analytics instance
   * Persists in cookie for this merchant (and treatment if specified)
   */
  setUserId(userId: string | undefined): void {
    this.userId = userId;

    if (userId) {
      const cookieName = this.getUserCookieName();
      setCookie(cookieName, userId, COOKIE_EXPIRY_DAYS);
      // console.log('[Analytics] User ID set and persisted:', userId);
    } else {
      this.clearUserId();
    }
  }

  /**
   * Clear the stored user ID
   */
  clearUserId(): void {
    const cookieName = this.getUserCookieName();
    deleteCookie(cookieName);
    this.userId = undefined;
    console.log('[Analytics] User ID cleared');
  }

  /**
   * Get time elapsed since start
   */
  getElapsedTime(): number {
    return Date.now() - this.startTime;
  }

  /**
   * Clear the current session - useful when patient auth changes
   * Also clears user ID to start fresh with new authenticated user
   */
  clearSession(): void {
    console.log('[Analytics] Clearing session:', this.sessionId);
    deleteCookie(ANALYTICS_SESSION_COOKIE);
    this.clearUserId();
    this.sessionId = this.generateSessionId();
    this.setSessionCookie(this.sessionId);
    console.log('[Analytics] New session created:', this.sessionId);
  }

  /**
   * Get or create session ID from cookie
   */
  private getOrCreateSessionId(): string {
    const existingSessionId = getCookie(ANALYTICS_SESSION_COOKIE);

    if (existingSessionId) {
      // console.log('[Analytics] Using existing session from cookie:', existingSessionId);
      return existingSessionId;
    }

    const newSessionId = this.generateSessionId();
    this.setSessionCookie(newSessionId);
    console.log('[Analytics] Created new session:', newSessionId);
    return newSessionId;
  }

  /**
   * Get stored user ID from cookie for this merchant/treatment
   */
  private getStoredUserId(): string | undefined {
    const cookieName = this.getUserCookieName();
    const userId = getCookie(cookieName);

    if (userId) {
      // console.log('[Analytics] Loaded stored user ID from cookie:', userId);
      return userId;
    }

    return undefined;
  }

  /**
   * Get the cookie name for storing user ID
   * Format: analytics_user_id_{merchantId} or analytics_user_id_{merchantId}_{treatmentId}
   */
  private getUserCookieName(): string {
    if (this.treatmentId) {
      return `${ANALYTICS_USER_COOKIE_PREFIX}${this.merchantId}_${this.treatmentId}`;
    }
    return `${ANALYTICS_USER_COOKIE_PREFIX}${this.merchantId}`;
  }

  /**
   * Set session ID cookie with expiration
   */
  private setSessionCookie(sessionId: string): void {
    setCookie(ANALYTICS_SESSION_COOKIE, sessionId, COOKIE_EXPIRY_DAYS);
  }

  /**
   * Extend session cookie expiration (sliding expiration)
   */
  private extendSessionCookie(): void {
    setCookie(ANALYTICS_SESSION_COOKIE, this.sessionId, COOKIE_EXPIRY_DAYS);
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Push event to GTM dataLayer
   * Maps internal event actions to GTM custom events that trigger tags
   */
  private pushToDataLayer(event: AnalyticsEvent): void {
    // Check if dataLayer is available (GTM loaded)
    if (typeof window === 'undefined' || !(window as any).dataLayer) {
      // console.log('[Analytics] GTM dataLayer not available, skipping dataLayer push');
      return;
    }

    const dataLayer = (window as any).dataLayer;

    // Map event actions to GTM events
    const eventData: any = {
      session_id: event.session_id || this.sessionId,
      metadata: event.metadata || {},
    };

    // Add user_id if available
    if (event.user_id || this.userId) {
      eventData.user_id = event.user_id || this.userId;
    }

    // Push the custom event to dataLayer
    // GTM triggers are configured to listen for these event names
    dataLayer.push({
      event: event.action, // e.g., 'survey_start', 'checkout_view', etc.
      ...eventData,
    });

    // console.log('[Analytics] Pushed to GTM dataLayer:', {
    //   event: event.action,
    //   ...eventData,
    // });
  }
}
