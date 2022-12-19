/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_CONFIGURATOR_RULEBASED_FEATURE } from './feature-name';

const cmsComponents: string[] = [
  'ConfiguratorForm',
  'ConfiguratorOverviewForm',
  'ConfiguratorOverviewMenu',
  'ConfiguratorUpdateMessage',
  'ConfiguratorAddToCartButton',
  'ConfiguratorMenu',
  'ConfiguratorGroupTitle',
  'ConfiguratorOverviewBanner',
  'ConfiguratorPrevNext',
  'ConfiguratorPriceSummary',
  'ConfiguratorProductTitle',
  'ConfiguratorTabBar',
  'ConfiguratorExitButton',
  'ConfiguratorVariantCarousel',
  'CpqConfiguratorConflictAndErrorMessagesComponent',
  'ConfiguratorOverviewFilterButton',
  'ConfiguratorOverviewFilter',
  'ConfiguratorOverviewSidebar',
];

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductConfiguratorRulebasedComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
        cmsComponents,
      },
    },
  };

  return config;
}

/**
 * Contains feature module configuration
 */
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(
      defaultProductConfiguratorRulebasedComponentsConfig
    ),
  ],
})
export class RulebasedConfiguratorRootFeatureModule {}
