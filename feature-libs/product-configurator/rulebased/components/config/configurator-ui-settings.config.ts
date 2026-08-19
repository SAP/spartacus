/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export interface ProductConfiguratorUISettingsConfig {
  updateDebounceTime?: {
    quantity?: number;
    input?: number;
    date?: number;
  };
  addRetractOption?: boolean;
  descriptions?: {
    attributeDescriptionLength?: number;
    valueDescriptionLength?: number;
  };
  /**
   * Maximum number of available products shown as a list in a CPQ container.
   * If the number of available products is larger than this value, they are
   * shown as a searchable drop-down list.
   */
  cpqContainerDropDownListThreshold?: number;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorUISettingsConfig {
  productConfigurator?: ProductConfiguratorUISettingsConfig;
}
