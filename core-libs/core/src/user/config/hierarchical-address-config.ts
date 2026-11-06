/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class HierarchicalAddressConfig {
  hierarchicalAddress?: {
    /**
     * Country isocodes whose addresses use a hierarchical (multi-level)
     * format: country → region → city → district. For these countries the
     * address form shows chained dropdowns and skips OCC address verification.
     */
    countriesUsingHierarchicalAddressFormat?: string[];
  };
}

declare module '../../config/config-tokens' {
  interface Config extends HierarchicalAddressConfig {}
}
