/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  IconModule,
  SpinnerModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { CheckoutPaymentFormComponent } from './checkout-payment-form.component';

@NgModule({
  imports: [
    NgSelectA11yModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CardModule,
    I18nModule,
    IconModule,
    SpinnerModule,
    FormErrorsModule,
  ],
  declarations: [CheckoutPaymentFormComponent],
  exports: [CheckoutPaymentFormComponent],
})
export class CheckoutPaymentFormModule {}
