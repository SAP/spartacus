/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { IconModule, OutletModule } from '@spartacus/storefront';
import { CommerceQuotesDetailsCartComponent } from './commerce-quotes-details-cart.component';
import { CommerceQuotesDetailsCartSummaryComponent } from './summary/commerce-quote-details-cart-summary.component';

@NgModule({
  imports: [CommonModule, OutletModule, IconModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CommerceQuotesCartComponent: {
          component: CommerceQuotesDetailsCartComponent,
          guards: [AuthGuard],
        },
        CommerceQuotesCartSummaryComponent: {
          component: CommerceQuotesDetailsCartSummaryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [
    CommerceQuotesDetailsCartComponent,
    CommerceQuotesDetailsCartSummaryComponent,
  ],
  exports: [
    CommerceQuotesDetailsCartComponent,
    CommerceQuotesDetailsCartSummaryComponent,
  ],
})
export class CommerceQuotesDetailsCartModule {}
