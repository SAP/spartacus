/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OpfCheckoutPaymentLinkComponent } from './opf-checkout-payment-link.component';

@NgModule({
  declarations: [OpfCheckoutPaymentLinkComponent],
  exports: [OpfCheckoutPaymentLinkComponent],
  imports: [CommonModule, I18nModule],
  providers: [],
})
export class OpfCheckoutPaymentLinkModule {}
