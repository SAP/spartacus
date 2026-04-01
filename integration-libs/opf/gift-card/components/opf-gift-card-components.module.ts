/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OutletPosition, provideOutlet } from '@spartacus/storefront';

import { NgModule } from '@angular/core';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';
import { OpfGiftCardAppliedModule } from './opf-gift-card-applied';
import { OpfGiftCardApplyComponent } from './opf-gift-card-apply/opf-gift-card-apply.component';
import { OpfGiftCardApplyModule } from './opf-gift-card-apply';
import { OpfGiftCardCheckoutModule } from './opf-gift-card-checkout';
import { OpfGiftCardOrderConfirmationModule } from './opf-gift-card-order-confirmation';
import { OpfGiftCardOrderDetailsModule } from './opf-gift-card-order-details';
import { OpfGiftCardOrderSummaryModule } from './opf-gift-card-order-summary';

@NgModule({
  imports: [
    OpfGiftCardApplyModule,
    OpfGiftCardAppliedModule,
    OpfGiftCardOrderSummaryModule,
    OpfGiftCardOrderConfirmationModule,
    OpfGiftCardOrderDetailsModule,
    OpfGiftCardCheckoutModule,
  ],
  providers: [
    provideOutlet({
      id: OpfCheckoutOutlets.OPF_CHECKOUT_BEFORE_PAYMENT_OPTIONS,
      position: OutletPosition.BEFORE,
      component: OpfGiftCardApplyComponent,
    }),
  ],
})
export class OpfGiftCardComponentsModule {}
