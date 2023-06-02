/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfCheckoutPaymentWrapperModule } from '../opf-checkout-payment-wrapper';
import { OpfCheckoutPaymentsComponent } from './opf-checkout-payments.component';

@NgModule({
  declarations: [OpfCheckoutPaymentsComponent],
  exports: [OpfCheckoutPaymentsComponent],
  imports: [
    CommonModule,
    I18nModule,
    OpfCheckoutPaymentWrapperModule,
    SpinnerModule,
  ],
})
export class OpfCheckoutPaymentsModule {}
