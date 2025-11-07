/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WindowRef } from '../../window/window-ref';

@Injectable({ providedIn: 'root' })
export class ExternalRoutesGuard {
  protected winRef = inject(WindowRef);
  protected platformId = inject<Object>(PLATFORM_ID);


  /**
   * Redirects to different storefront system for anticipated URL
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.redirect(route, state);
    }
    return false;
  }

  /**
   * Redirects to anticipated URL using full page reload, not Angular routing
   */
  protected redirect(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const window = this.winRef.nativeWindow;

    if (window && window.location) {
      window.location.href = state.url;
    }
  }
}
