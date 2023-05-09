/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  exports: [OpfCheckoutPaymentWrapperComponent],
  imports: [CommonModule, I18nModule, SpinnerModule],
  providers: [OpfCheckoutPaymentWrapperService],
})
export class OpfCheckoutPaymentWrapperModule {}
