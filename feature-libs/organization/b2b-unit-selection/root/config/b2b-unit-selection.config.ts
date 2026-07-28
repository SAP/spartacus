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
export abstract class B2bUnitSelectionConfig {
  b2bUnitSelection?: {
    /**
     * Whether to enable the B2B Unit selection feature
     * (post-login dialog + header Company selector).
     * Defaults to false; consumers opt in via provideConfig().
     */
    enabled?: boolean;
  };
}

declare module '@spartacus/core' {
  interface Config extends B2bUnitSelectionConfig {}
}
