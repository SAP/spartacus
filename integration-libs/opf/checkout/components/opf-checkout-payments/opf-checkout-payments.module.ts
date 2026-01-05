/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import {
  IconModule,
  PaginationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { OpfCheckoutPaymentWrapperModule } from '../opf-checkout-payment-wrapper';
import { OpfCheckoutTermsAndConditionsAlertModule } from '../opf-checkout-terms-and-conditions-alert';
import { OpfCheckoutPaymentsComponent } from './opf-checkout-payments.component';

@NgModule({
  declarations: [OpfCheckoutPaymentsComponent],
  exports: [OpfCheckoutPaymentsComponent],
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    PaginationModule,
    IconModule,
    OpfCheckoutPaymentWrapperModule,
    OpfCheckoutTermsAndConditionsAlertModule,
  ],
})
export class OpfCheckoutPaymentsModule {}
