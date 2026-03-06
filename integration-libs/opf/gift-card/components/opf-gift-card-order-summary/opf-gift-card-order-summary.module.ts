/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CmsConfig, I18nModule, provideConfig } from '@spartacus/core';
import { NgModule } from '@angular/core';
import { OpfGiftCardOrderSummaryComponent } from './opf-gift-card-order-summary.component';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    I18nModule,
    ReactiveFormsModule,
    OpfGiftCardOrderSummaryComponent,
  ],
  providers: [
    //     provideConfig(<CmsConfig>{
    //   cmsComponents: {
    //     CartTotalsComponent: {
    //       component: GiftCardOrderSummaryComponent,
    //     },
    //   },
    // }),
      provideConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOrderSummary: {
          component: OpfGiftCardOrderSummaryComponent,
        },
      },
    }),
  ],

  exports: [OpfGiftCardOrderSummaryComponent],
})
export class OpfGiftCardOrderSummaryModule {}
