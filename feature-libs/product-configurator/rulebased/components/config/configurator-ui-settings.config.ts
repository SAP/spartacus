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
  /**
   * CSS selectors of the configuration overview header page slots.
   * The height of the matching header is subtracted from the viewport height when
   * the overview menu calculates how much space it can occupy. Only the slot of the
   * active configurator is rendered, so at most one selector matches.
   */
  overviewHeaderSelectors?: string[];
  /**
   * Maps commerce configurator type (route postfix) to whether the overview
   * menu shows a Filter tab. The tab is visible only when the entry is `true`.
   */
  overviewMenuFilterTabVisible?: Record<string, boolean>;
  /**
   * CPQ configurator flavour only (`CLOUDCPQCONFIGURATOR`). When `true`, hides
   * the base price and selected options rows in the price summary; the total
   * price row remains visible. Defaults to `false` when omitted.
   *
   * For the variant configurator (VC), the same behaviour is controlled by the
   * commerce backend via OCC field `hideBasePriceAndSelectedOptions` on the
   * configuration payload—not by this storefront setting.
   */
  cpqHideBasePriceAndSelectedOptions?: boolean;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ConfiguratorUISettingsConfig {
  productConfigurator?: ProductConfiguratorUISettingsConfig;
}
