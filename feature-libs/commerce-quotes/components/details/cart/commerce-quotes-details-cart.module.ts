/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { IconModule, OutletModule } from '@spartacus/storefront';
import { CommerceQuotesDetailsCartComponent } from './commerce-quotes-details-cart.component';
import { QuoteDetailsCartSummaryComponent } from './summary/quote-details-cart-summary.component';

@NgModule({
  imports: [CommonModule, OutletModule, IconModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesCartComponent: {
          component: CommerceQuotesDetailsCartComponent,
          guards: [AuthGuard],
        },
        CommerceQuotesCartSummaryComponent: {
          component: QuoteDetailsCartSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CommerceQuotesDetailsCartComponent,
    QuoteDetailsCartSummaryComponent,
  ],
  exports: [
    CommerceQuotesDetailsCartComponent,
    QuoteDetailsCartSummaryComponent,
  ],
})
export class CommerceQuotesDetailsCartModule {}
