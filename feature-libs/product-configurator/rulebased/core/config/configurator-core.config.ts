/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';

export interface ProductConfiguratorCoreConfig {
  enableVariantSearch?: boolean;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorCoreConfig {
  productConfigurator?: ProductConfiguratorCoreConfig;
}
