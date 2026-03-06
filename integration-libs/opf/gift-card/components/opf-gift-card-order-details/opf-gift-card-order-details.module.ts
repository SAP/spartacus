/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfGiftCardOrderDetailBillingComponent } from './opf-gift-card-order-detail-billing/opf-gift-card-order-detail-billing.component';
import { OpfGiftCardOrderDetailTotalsComponent } from './opf-gift-card-order-detail-totals/opf-gift-card-order-detail-totals.component';
import { OpfGiftCardPaymentMethodDetailComponent } from './opf-gift-card-payment-method-detail';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule,
    I18nModule,
    ReactiveFormsModule,
    OpfGiftCardOrderDetailBillingComponent,
    OpfGiftCardOrderDetailTotalsComponent,
    OpfGiftCardPaymentMethodDetailComponent,
  ],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsTotalsComponent: {
          component: OpfGiftCardOrderDetailTotalsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [
    OpfGiftCardOrderDetailBillingComponent,
    OpfGiftCardOrderDetailTotalsComponent,
    OpfGiftCardPaymentMethodDetailComponent,
  ],
})
export class OpfGiftCardOrderDetailsModule {}
