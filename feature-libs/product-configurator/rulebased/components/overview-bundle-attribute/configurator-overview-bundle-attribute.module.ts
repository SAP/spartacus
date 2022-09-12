/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { MediaModule } from '@commerce-storefront-toolset/storefront';
import { ConfiguratorPriceModule } from '../price/configurator-price.module';
import { ConfiguratorOverviewBundleAttributeComponent } from './configurator-overview-bundle-attribute.component';

@NgModule({
  imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule],
  declarations: [ConfiguratorOverviewBundleAttributeComponent],
  exports: [ConfiguratorOverviewBundleAttributeComponent],
})
export class ConfiguratorOverviewBundleAttributeModule {}
