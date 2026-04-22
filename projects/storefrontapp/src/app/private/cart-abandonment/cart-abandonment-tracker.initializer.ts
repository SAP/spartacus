/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { WindowRef } from '@spartacus/core';
import { CartAbandonmentTrackerService } from './cart-abandonment-tracker.service';

/**
 * Factory function for APP_INITIALIZER to initialize cart abandonment tracking
 * during application bootstrap.
 *
 * @param service - The cart abandonment tracker service
 * @param windowRef - Window reference service for SSR safety
 * @returns Factory function that initializes the tracker
 */
export function initializeCartAbandonmentTracker(
  service: CartAbandonmentTrackerService,
  windowRef: WindowRef
): () => void {
  return () => {
    // Only initialize in browser environment
    if (windowRef.isBrowser()) {
      // Delay initialization to ensure the global script has loaded
      setTimeout(() => {
        service.initialize();
      }, 0);
    }
  };
}
