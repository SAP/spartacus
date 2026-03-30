/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { AppRoutingModule } from '@spartacus/storefront';
import { privateProviders } from './private/private.providers';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    provideConfig(<CmsConfig>{
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
