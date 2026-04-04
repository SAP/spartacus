/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule, AppRoutingModuleV2 } from '@spartacus/storefront';
import { privateProviders } from './private/private.providers';
import {
  SpartacusModule,
  SpartacusModuleV2,
} from './spartacus/spartacus.module';

/**
 * Default AppModule.
 *
 * Uses `AppRoutingModule` (`initialNavigation: 'enabledBlocking'`) paired with
 * `SpartacusModule` (`BaseStorefrontModule`).
 * Identical to the baseline `develop` branch behavior.
 */
@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
  providers: [privateProviders],
})
export class AppModule {}

/**
 * New hydration-compatible AppModule.
 *
 * Uses `AppRoutingModuleV2` (`initialNavigation: 'disabled'`) paired with
 * `SpartacusModuleV2` (`BaseStorefrontModuleV2`).
 * Compatible with Angular hydration (avoids NG05001).
 */
@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModuleV2,
  ],
  providers: [privateProviders],
})
export class AppModuleV2 {}
