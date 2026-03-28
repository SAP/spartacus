/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import { OpfGiftCardOrderDetailBillingComponent } from './opf-gift-card-order-detail-billing/opf-gift-card-order-detail-billing.component';
import { OpfGiftCardOrderDetailTotalsComponent } from './opf-gift-card-order-detail-totals/opf-gift-card-order-detail-totals.component';
import { OpfGiftCardPaymentMethodDetailComponent } from './opf-gift-card-payment-method-detail/opf-gift-card-payment-method-detail.component';
import { provideOutlet } from '@spartacus/storefront';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';

@NgModule({
  imports: [
    OpfGiftCardOrderDetailBillingComponent,
    OpfGiftCardOrderDetailTotalsComponent,
    OpfGiftCardPaymentMethodDetailComponent,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsTotalsComponent: {
          component: OpfGiftCardOrderDetailTotalsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  providers: [
    provideOutlet({
      id: CartOutlets.ORDER_DETAILS_PAYMENT_METHOD_DETAILS,
      component: OpfGiftCardOrderDetailBillingComponent,
    }),
    provideOutlet({
      id: OpfCheckoutOutlets.ORDER_DETAILS_AFTER_PAYMENT_METHOD,
      component: OpfGiftCardPaymentMethodDetailComponent,
    }),
  ],
  exports: [
    OpfGiftCardOrderDetailBillingComponent,
    OpfGiftCardOrderDetailTotalsComponent,
    OpfGiftCardPaymentMethodDetailComponent,
  ],
})
export class OpfGiftCardOrderDetailsModule {}
