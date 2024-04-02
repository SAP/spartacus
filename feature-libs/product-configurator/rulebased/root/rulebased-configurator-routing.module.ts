/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultRulebasedRoutingConfig } from './default-rulebased-routing-config';

/**
 * Provides the default cx routing configuration for the rulebased configurator
 */
@NgModule({})
export class RulebasedConfiguratorRoutingModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorRoutingModule> {
    return {
      ngModule: RulebasedConfiguratorRoutingModule,
      providers: [provideDefaultConfig(defaultRulebasedRoutingConfig)],
    };
  }
}
