/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { OrderConfirmationGuard } from '@spartacus/order/components';
import { OpfGiftCardOrderConfirmationTotalsComponent } from './opf-gift-card-order-confirmation-totals/opf-gift-card-order-confirmation-totals.component';

@NgModule({
  imports: [OpfGiftCardOrderConfirmationTotalsComponent],

  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationTotalsComponent: {
          component: OpfGiftCardOrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],

  exports: [OpfGiftCardOrderConfirmationTotalsComponent],
})
export class OpfGiftCardOrderConfirmationModule {}
