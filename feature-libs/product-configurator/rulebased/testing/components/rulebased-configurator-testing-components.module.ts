/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MockConfiguratorAttributeProductCardComponent } from './mock-configurator-attribute-product-card.component';
import { MockConfiguratorAttributeQuantityComponent } from './mock-configurator-attribute-quantity.component';
import { MockConfiguratorGroupComponent } from './mock-configurator-group.component';
import { MockConfiguratorItemCounterComponent } from './mock-configurator-item-counter.component';
import { MockConfiguratorOverviewFilterBarComponent } from './mock-configurator-overview-filter-bar.component';
import { MockConfiguratorOverviewFilterComponent } from './mock-configurator-overview-filter.component';
import { MockConfiguratorPriceComponent } from './mock-configurator-price.component';
import { MockConfiguratorShowMoreComponent } from './mock-configurator-show-more.component';

export const configuratorRulebasedMockComponents = [
  MockConfiguratorPriceComponent,
  MockConfiguratorAttributeQuantityComponent,
  MockConfiguratorAttributeProductCardComponent,
  MockConfiguratorShowMoreComponent,
  MockConfiguratorOverviewFilterBarComponent,
  MockConfiguratorOverviewFilterComponent,
  MockConfiguratorGroupComponent,
  MockConfiguratorItemCounterComponent,
];

/** Shared mock components for product-configurator rulebased unit tests. */
@NgModule({
  imports: [...configuratorRulebasedMockComponents],
  exports: [...configuratorRulebasedMockComponents],
})
export class ConfiguratorRulebasedTestingComponentsModule {}
