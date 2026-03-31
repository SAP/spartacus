/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TEMP FIX for pipeline
// baseUrl: environment.occBaseUrl

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from '@spartacus/storefront';
import { privateProviders } from './private/private.providers';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    provideConfig(<CmsConfig>{
            cmsComponents: {
                ProductAddToCartComponent: {
                    data: {
                        inventoryDisplay: true,
                    },
                },
            },
        }),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
  providers: [privateProviders],
})
export class AppModule {}
