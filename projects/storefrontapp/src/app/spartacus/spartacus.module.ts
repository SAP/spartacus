/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  BaseStorefrontModule,
  BaseStorefrontModuleV2,
} from '@spartacus/storefront';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';

/**
 * Default Spartacus module.
 *
 * Uses `BaseStorefrontModule` with `initialNavigation: 'enabledBlocking'`.
 * Use together with `AppRoutingModule` in `AppModule`.
 */
@NgModule({
  imports: [
    BaseStorefrontModule,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
  ],
  exports: [BaseStorefrontModule],
})
export class SpartacusModule {}

/**
 * Hydration-compatible Spartacus module.
 *
 * Uses `BaseStorefrontModuleV2` which internally uses `RoutingModuleV2.forRoot()`.
 * That provides an `APP_INITIALIZER` that manually runs all prerequisite
 * initializers, triggers `router.initialNavigation()`, and awaits its
 * completion — avoiding the NG05001 error caused by `enabledBlocking`
 * when Angular hydration is enabled.
 *
 * Use together with `AppRoutingModuleV2` in `AppModule`.
 */
@NgModule({
  imports: [
    BaseStorefrontModuleV2,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
  ],
  exports: [BaseStorefrontModuleV2],
})
export class SpartacusModuleV2 {}
