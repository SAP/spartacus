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
 * @returns Factory function that initializes the tracker (returns Promise for async init)
 */
export function initializeCartAbandonmentTracker(
  service: CartAbandonmentTrackerService,
  windowRef: WindowRef
): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      // Only initialize in browser environment
      if (!windowRef.isBrowser()) {
        resolve();
        return;
      }

      console.log('[CartAbandonmentTracker] APP_INITIALIZER executing');

      // Check if script is already loaded
      if (windowRef.nativeWindow?.CartAbandonmentTracker) {
        console.log('[CartAbandonmentTracker] Script already loaded, initializing immediately');
        service.initialize();
        resolve();
        return;
      }

      // Wait for script to load with polling
      console.log('[CartAbandonmentTracker] Waiting for script to load...');
      let attempts = 0;
      const maxAttempts = 100; // 5 seconds max (100 * 50ms)

      const checkInterval = setInterval(() => {
        attempts++;

        if (windowRef.nativeWindow?.CartAbandonmentTracker) {
          clearInterval(checkInterval);
          console.log(`[CartAbandonmentTracker] Script loaded after ${attempts * 50}ms`);
          service.initialize();
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          console.warn(
            '[CartAbandonmentTracker] Script load timeout after 5s. ' +
            'Please check that cart-abandonment-tracker.js is in index.html'
          );
          resolve();
        }
      }, 50);
    });
  };
}
