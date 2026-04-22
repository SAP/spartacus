/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Configuration options for the cart abandonment tracker
 */
export interface CartAbandonmentTrackerConfig {
  cartUrlPattern: string | RegExp;
  checkoutUrlPattern: string | RegExp;
  inactivityTimeout: number;
  debug: boolean;
  eventName: string;
}

/**
 * Event data emitted when cart abandonment is detected
 */
export interface CartAbandonmentEvent {
  type: 'navigation' | 'timeout';
  timestamp: number;
  fromUrl: string;
  toUrl: string | null;
  duration: number;
  interactionCount: number;
  lastInteractionTime: number;
  userAgent: string;
  timestamp_iso: string;
}

/**
 * Current state of the cart abandonment tracker
 */
export interface CartAbandonmentTrackerState {
  isActive: boolean;
  isOnCartPage: boolean;
  interactionCount: number;
  lastInteractionTime: number;
}

/**
 * Global CartAbandonmentTracker interface
 */
export interface CartAbandonmentTrackerClass {
  new (config: Partial<CartAbandonmentTrackerConfig>): CartAbandonmentTrackerInstance;
}

/**
 * Instance interface for the tracker
 */
export interface CartAbandonmentTrackerInstance {
  start(): void;
  stop(): void;
  checkCurrentPage(): void;
  getState(): CartAbandonmentTrackerState;
}

/**
 * Extend Window interface to include CartAbandonmentTracker
 */
declare global {
  interface Window {
    CartAbandonmentTracker?: CartAbandonmentTrackerClass;
  }
}
