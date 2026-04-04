/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';

/**
 * Default Spartacus module.
 *
 * Uses `BaseStorefrontModule` with `initialNavigation: 'enabledBlocking'`.
 * Identical to the baseline `develop` branch behavior.
 *
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
 * New hydration-compatible Spartacus module.
 *
 * Uses `BaseStorefrontModuleV2` which provides an `APP_INITIALIZER` that
 * manually triggers and awaits navigation instead of using `enabledBlocking`.
 * Compatible with Angular hydration (avoids NG05001).
 *
 * Use together with `AppRoutingModuleV2` in `AppModule`.
 */
@NgModule({
  imports: [
    BaseStorefrontModule,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
  ],
  exports: [BaseStorefrontModule],
})
export class SpartacusModuleV2 {}
