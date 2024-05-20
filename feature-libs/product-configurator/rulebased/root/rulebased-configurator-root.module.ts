/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { CommonConfiguratorModule } from '@spartacus/product-configurator/common';
import { RulebasedConfiguratorRootFeatureModule } from './rulebased-configurator-root-feature.module';
import { RulebasedConfiguratorRoutingModule } from './rulebased-configurator-routing.module';
import { VariantConfiguratorInteractiveModule } from './variant/variant-configurator-interactive.module';
import { VariantConfiguratorOverviewModule } from './variant/variant-configurator-overview.module';
import { ConfiguratorBadRequestHandler } from './http-interceptors/configurator-bad-request.handler';

/**
 * Exposes the root modules that we need to load statically. Contains page mappings, route configurations
 * and feature configuration
 */
@NgModule({
  imports: [
    CommonModule,
    CommonConfiguratorModule,
    RulebasedConfiguratorRootFeatureModule,
    VariantConfiguratorInteractiveModule,
    VariantConfiguratorOverviewModule,
    RulebasedConfiguratorRoutingModule.forRoot(),
  ],
  providers: [
    {
      provide: HttpErrorHandler,
      useExisting: ConfiguratorBadRequestHandler,
      multi: true,
    },
  ],
})
export class RulebasedConfiguratorRootModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorRootModule> {
    return {
      ngModule: RulebasedConfiguratorRootModule,
    };
  }
}
