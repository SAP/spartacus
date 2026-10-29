/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { configuratorRulebasedMockComponents } from './rulebased-configurator-mock-component-list';

/** Shared mock components for product-configurator rulebased unit tests. */
@NgModule({
  imports: [...configuratorRulebasedMockComponents],
  exports: [...configuratorRulebasedMockComponents],
})
export class ConfiguratorRulebasedTestingComponentsModule {}
