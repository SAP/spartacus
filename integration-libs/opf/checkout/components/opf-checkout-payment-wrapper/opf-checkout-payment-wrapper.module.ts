/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { OpfCheckoutPaymentWrapperComponent } from './opf-checkout-payment-wrapper.component';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

@NgModule({
  declarations: [OpfCheckoutPaymentWrapperComponent],
  providers: [OpfCheckoutPaymentWrapperService],
  exports: [OpfCheckoutPaymentWrapperComponent],
  imports: [CommonModule, I18nModule, SpinnerModule],
})
export class OpfCheckoutPaymentWrapperModule {}
