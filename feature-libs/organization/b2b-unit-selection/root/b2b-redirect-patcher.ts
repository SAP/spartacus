/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { B2bRedirectCoordinator } from './b2b-redirect-coordinator.service';

/**
 * APP_INITIALIZER factory that patches the Angular Router's internal
 * scheduleNavigation() method — the single entry point for every navigation,
 * including Guard UrlTree redirects.
 *
 * Call chain (all paths converge here):
 *   router.navigate()     → router.navigateByUrl() → scheduleNavigation()
 *   router.navigateByUrl()                         → scheduleNavigation()
 *   Guard returns UrlTree → RedirectRequest event  → scheduleNavigation()
 *   Browser history navigation                     → scheduleNavigation()
 *
 * Intercept conditions (both must be true):
 *   1. coordinator.isBlocked() — set synchronously by the MetaReducer on LOGIN.
 *   2. appRef.components.length > 0 — AppComponent is mounted, indicating an
 *      interactive login rather than a token restore on page refresh.
 *
 * Two LOGIN scenarios distinguished:
 *   - Page refresh (token restore): LOGIN dispatched in APP_INITIALIZER phase
 *     while components.length === 0; navigation is not intercepted and the page
 *     loads normally. The dialog opens later via requestAnimationFrame polling.
 *   - Manual login (user submits form): LOGIN dispatched after user interaction
 *     while components.length > 0; navigation is intercepted and the user stays
 *     on the login page until B2B unit selection completes.
 */
export function createB2bRedirectPatcher(
  router: Router,
  coordinator: B2bRedirectCoordinator,
  appRef: ApplicationRef
): () => void {
  return (): void => {
    const originalScheduleNavigation: (...args: any[]) => Promise<boolean> = (
      router as any
    ).scheduleNavigation.bind(router);

    (router as any).scheduleNavigation = (
      rawUrl: any,
      source: any,
      restoredState: any,
      extras: any,
      priorPromise?: any
    ): Promise<boolean> => {
      // Only intercept during interactive login (AppComponent already mounted).
      // Token restore on page refresh (components.length === 0) passes through.
      if (!coordinator.isBlocked() || appRef.components.length === 0) {
        return originalScheduleNavigation(
          rawUrl,
          source,
          restoredState,
          extras,
          priorPromise
        );
      }
      // B2B unit selection in progress: defer navigation until allowRedirect().
      coordinator.whenAllowed$().subscribe(() => {
        originalScheduleNavigation(
          rawUrl,
          source,
          restoredState,
          extras,
          priorPromise
        );
      });
      return Promise.resolve(false);
    };
  };
}
