/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AtMessageModule,
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { CheckoutPlaceOrderModule } from '@spartacus/checkout/base/components';
import { OpfB2bCheckoutPlaceOrderComponent } from './opf-b2b-checkout-place-order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
    I18nModule,
    UrlModule,
    FeaturesConfigModule,
    AtMessageModule,
    ReactiveFormsModule,
    FormErrorsModule,
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    CheckoutPlaceOrderModule,
  ],
  declarations: [OpfB2bCheckoutPlaceOrderComponent],
  exports: [OpfB2bCheckoutPlaceOrderComponent],
})
export class OpfB2bCheckoutPlaceOrderModule {}
