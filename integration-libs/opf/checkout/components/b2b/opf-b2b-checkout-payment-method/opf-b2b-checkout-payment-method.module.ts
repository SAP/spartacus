/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CardModule, IconModule } from '@spartacus/storefront';
import { OpfB2bCheckoutPaymentMethodComponent } from './opf-b2b-checkout-payment-method.component';

@NgModule({
  declarations: [OpfB2bCheckoutPaymentMethodComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    IconModule,
    I18nModule,
    UrlModule,
  ],
  exports: [OpfB2bCheckoutPaymentMethodComponent],
})
export class OpfB2bCheckoutPaymentMethodModule {}
