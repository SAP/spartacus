/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OnNavigateConfig {
  enableResetViewOnNavigate?: {
    active?: boolean;
    ignoreQueryString?: boolean;
    ignoreRoutes?: string[];
    /**
     * When set, finds the element with the tag name matching this string
     * to return focus to on navigation.
     *
     * Uses hostComponent when unset.
     */
    selectedHostElement?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends OnNavigateConfig {}
}
