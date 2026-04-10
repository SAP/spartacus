/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModuleV2 } from '@spartacus/storefront';
import { privateProviders } from './private/private.providers';
import { SpartacusModuleV2 } from './spartacus/spartacus.module';

/**
 * Default AppModule.
 *
 * Uses `AppRoutingModule` (`initialNavigation: 'enabledBlocking'`) paired with
 * `SpartacusModule` (`BaseStorefrontModule`).
 *
 * Angular handles the initial navigation itself via `enabledBlocking`:
 * it blocks bootstrap until the navigation completes, using `LOCATION_INITIALIZED`
 * to await all Spartacus prerequisite initializers first.
 *
 * Use this when Angular hydration is NOT enabled.
 */
@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModuleV2,
    EffectsModule.forRoot([]),
    SpartacusModuleV2,
  ],
  providers: [privateProviders],
})
export class AppModule {}
