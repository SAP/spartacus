/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { WindowRef } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  CartAbandonmentEvent,
  CartAbandonmentTrackerInstance,
  CartAbandonmentTrackerState,
} from './cart-abandonment-tracker.model';

/**
 * Service that integrates the cart abandonment tracker into Angular/Spartacus.
 * This service wraps the global CartAbandonmentTracker JavaScript library and provides
 * Angular-compatible lifecycle management and router integration.
 */
@Injectable({
  providedIn: 'root',
})
export class CartAbandonmentTrackerService implements OnDestroy {
  private tracker?: CartAbandonmentTrackerInstance;
  private subscription = new Subscription();
  private isInitialized = false;

  constructor(
    protected windowRef: WindowRef,
    protected router: Router
  ) {}

  /**
   * Initialize the cart abandonment tracker.
   * This method should be called during app initialization (via APP_INITIALIZER).
   */
  initialize(): void {
    // Only run in browser environment
    if (!this.windowRef.isBrowser() || this.isInitialized) {
      return;
    }

    const window = this.windowRef.nativeWindow;
    if (!window || !window.CartAbandonmentTracker) {
      console.warn(
        '[CartAbandonmentTracker] Script not loaded. Please check project.json scripts configuration.'
      );
      return;
    }

    try {
      this.initializeTracker(window);
      this.setupRouteListener();
      this.setupEventListener(window);
      this.isInitialized = true;

      console.log('[CartAbandonmentTracker] Service initialized successfully');
    } catch (error) {
      console.error('[CartAbandonmentTracker] Initialization failed:', error);
    }
  }

  /**
   * Create and start the tracker instance
   */
  private initializeTracker(window: Window): void {
    if (!window.CartAbandonmentTracker) {
      return;
    }

    // Create tracker instance with configuration
    this.tracker = new window.CartAbandonmentTracker({
      cartUrlPattern: /\/cart(\?.*)?$/, // Match cart URLs with optional query params
      checkoutUrlPattern: /\/checkout/, // Match checkout URLs
      inactivityTimeout: 15000, // 15 seconds
      debug: true, // Enable debug logging in development
      eventName: 'cart:abandoned',
    });

    // Start tracking
    this.tracker.start();

    // Check current page immediately
    this.tracker.checkCurrentPage();

    console.log('[CartAbandonmentTracker] Tracker started', {
      cartUrlPattern: '/cart (regex match)',
      checkoutUrlPattern: '/checkout (regex match)',
      timeout: '15s',
      currentUrl: window.location.href,
    });
  }

  /**
   * Set up Angular Router listener for SPA navigation detection
   */
  private setupRouteListener(): void {
    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          console.log('[CartAbandonmentTracker] Route changed:', event.url);

          // Check current page after route change
          setTimeout(() => {
            if (this.tracker) {
              this.tracker.checkCurrentPage();
              const state = this.getTrackerState();
              console.log('[CartAbandonmentTracker] Page state:', {
                url: this.windowRef.nativeWindow?.location.href,
                isOnCartPage: state?.isOnCartPage,
                isActive: state?.isActive,
              });
            }
          }, 100);
        })
    );
  }

  /**
   * Set up event listener for cart abandonment events
   */
  private setupEventListener(window: Window): void {
    window.addEventListener('cart:abandoned', ((event: CustomEvent<CartAbandonmentEvent>) => {
      this.handleAbandonmentEvent(event.detail);
    }) as EventListener);
  }

  /**
   * Handle cart abandonment events
   */
  private handleAbandonmentEvent(data: CartAbandonmentEvent): void {
    const typeLabel = data.type === 'navigation' ? 'Navigation away' : 'Timeout (no interaction)';

    console.log('[CartAbandonmentTracker] Cart abandonment detected:', {
      type: typeLabel,
      duration: `${(data.duration / 1000).toFixed(1)}s`,
      interactionCount: data.interactionCount,
      fromUrl: data.fromUrl,
      toUrl: data.toUrl || 'N/A',
      timestamp: new Date(data.timestamp).toLocaleString(),
    });

    console.log('[CartAbandonmentTracker] Full event data:', data);

    // Future enhancements:
    // - Send to analytics (Google Analytics, Adobe Analytics, etc.)
    // - Integrate with Spartacus EventService
    // - Send to backend API for marketing analysis
    // - Trigger personalized offers or customer service intervention
  }

  /**
   * Get current tracker state (for debugging)
   */
  getTrackerState(): CartAbandonmentTrackerState | null {
    if (this.tracker && 'getState' in this.tracker) {
      return this.tracker.getState();
    }
    return null;
  }

  /**
   * Stop the tracker
   */
  stop(): void {
    if (this.tracker) {
      this.tracker.stop();
      console.log('[CartAbandonmentTracker] Tracker stopped');
    }
  }

  /**
   * Restart the tracker
   */
  restart(): void {
    if (this.tracker) {
      this.tracker.start();
      console.log('[CartAbandonmentTracker] Tracker restarted');
    }
  }

  /**
   * Clean up subscriptions and stop tracker on service destruction
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stop();
  }
}
