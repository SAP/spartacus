/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BEFORE_CMS_PAGE_GUARD, AppRoutingModule } from '@spartacus/storefront';
import { privateProviders } from './private/private.providers';
import { SpartacusModule } from './spartacus/spartacus.module';
import { IsrRevalidateGuard } from './isr-revalidate.guard';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
  providers: [
    privateProviders,
    { provide: BEFORE_CMS_PAGE_GUARD, useExisting: IsrRevalidateGuard, multi: true },
  ],
})
export class AppModule {}
