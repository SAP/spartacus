/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class LogoutConfig {
  logout?: {
    /**
     * Route to redirect to after a successful logout.
     * Accepts a semantic route name registered in the routing config (e.g. `'home'`, `'login'`),
     * or a raw URL path (e.g. `'product/1377492/micro-webcam'`).
     * Semantic names are resolved via SemanticPathService; unknown values are used as-is.
     * When `undefined`, falls back to the homepage, or login for protected storefronts.
     */
    redirectRoute?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends LogoutConfig {}
}
