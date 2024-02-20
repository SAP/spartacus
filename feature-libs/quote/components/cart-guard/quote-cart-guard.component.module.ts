/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { QuoteCartGuardComponent } from './quote-cart-guard.component';
import { QuoteCartGuard } from './quote-cart.guard';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        QuoteCartGuardComponent: {
          component: QuoteCartGuardComponent,
          guards: [AuthGuard, QuoteCartGuard],
        },
      },
    }),
  ],
  declarations: [QuoteCartGuardComponent],
  exports: [QuoteCartGuardComponent],
})
export class QuoteCartGuardComponentModule {}
