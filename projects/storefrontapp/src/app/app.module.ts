/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ROUTES } from '@angular/router';
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
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
  providers: [
    privateProviders,
    {
      provide: ROUTES,
      multi: true,
      useValue: [
        {
          path: 'bff-say-hello',
          loadComponent: () =>
            import('./bff/examples/say-hello.component').then(
              (m) => m.SayHelloComponent
            ),
        },
      ],
    },
  ],
})
export class AppModule {}
