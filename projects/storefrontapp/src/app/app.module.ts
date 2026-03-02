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
import { environment } from '../environments/environment';
import { privateProviders } from './private/private.providers';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
  providers: [
    provideConfig({
      backend: {
        occ: {
          // Note: The next line is edited by our internal script in the `ec-automate-pipelines` repo. Don't move it to other file.
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
        },
      },
    }),
    provideConfig(<CmsConfig>{
             ProductAddToCartComponent: {
          data: {
            inventoryDisplay: true,
          },
        },
      },
    }),

    privateProviders,
  ],
})
export class AppModule {}
