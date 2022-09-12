/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  RoutingModule as CoreRoutingModule,
} from '@commerce-storefront-toolset/core';
import { CmsRouteModule } from '@commerce-storefront-toolset/storefront';
import { defaultRulebasedRoutingConfig } from './default-rulebased-routing-config';

/**
 * Provides the default cx routing configuration for the rulebased configurator
 */
@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
})
export class RulebasedConfiguratorRoutingModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorRoutingModule> {
    return {
      ngModule: RulebasedConfiguratorRoutingModule,
      providers: [provideDefaultConfig(defaultRulebasedRoutingConfig)],
    };
  }
}
