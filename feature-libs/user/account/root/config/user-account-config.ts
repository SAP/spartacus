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
export abstract class UserAccountConfig {
  userAccount?: {
    /**
     * When enabled, applies the user's preferred currency (from OCC GET /users/{userId})
     * on login, and reverts to the pre-login currency stored in localStorage on logout.
     * Affects: UserLoginCurrencyService
     */
    applyUserCurrencyOnLogin?: boolean;
  };
}

declare module '@spartacus/core' {
  interface Config extends UserAccountConfig {}
}
