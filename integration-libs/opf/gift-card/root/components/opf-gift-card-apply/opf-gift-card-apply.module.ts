/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OutletPosition, provideOutlet } from '@spartacus/storefront';

import { NgModule } from '@angular/core';
import { OpfCheckoutOutlets } from '@spartacus/opf/checkout/root';
import { OpfGiftCardApplyComponent } from './opf-gift-card-apply.component';
 
@NgModule({
  imports: [OpfGiftCardApplyComponent],
providers: [
        provideOutlet({
      id: OpfCheckoutOutlets.OPF_CHECKOUT_BEFORE_PAYMENT_OPTIONS,
      position: OutletPosition.BEFORE,
      component: OpfGiftCardApplyComponent,
    }),
    
],
  exports: [OpfGiftCardApplyComponent],
})
export class OpfGiftCardApplyModule {}
