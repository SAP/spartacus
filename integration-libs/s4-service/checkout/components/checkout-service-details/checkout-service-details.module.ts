/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/base/components';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  DatePickerModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
} from '@spartacus/storefront';
import { CheckoutServiceDetailsComponent } from './checkout-service-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    DatePickerModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    CheckoutServiceDetailsComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutServiceDetails: {
          component: CheckoutServiceDetailsComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  exports: [CheckoutServiceDetailsComponent],
})
export class CheckoutServiceDetailsModule {}
