/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import {
  CardModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { OpfPaymentMethodDetailsComponent } from './opf-payment-method-details.component';

@NgModule({
  declarations: [OpfPaymentMethodDetailsComponent],
  imports: [CommonModule, CardModule],
  exports: [OpfPaymentMethodDetailsComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ORDER_OVERVIEW,
      position: OutletPosition.BEFORE,
      component: OpfPaymentMethodDetailsComponent,
    }),
  ],
})
export class OpfPaymentMethodDetailsModule {}
