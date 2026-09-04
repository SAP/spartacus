/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export interface CommonProductConfiguratorUISettingsConfig {
  /**
   * Maximum number of CPQ bundle line items that are expanded inline on a cart entry.
   * If the entry has more items, the 'show' link navigates to the read-only
   * configuration overview instead.
   */
  cpqProductCartEntriesThreshold?: number;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CommonConfiguratorUISettingsConfig {
  productConfigurator?: CommonProductConfiguratorUISettingsConfig;
}

declare module '../../core/model/product-configurator.config' {
  interface ProductConfiguratorConfig
    extends CommonProductConfiguratorUISettingsConfig {}
}
