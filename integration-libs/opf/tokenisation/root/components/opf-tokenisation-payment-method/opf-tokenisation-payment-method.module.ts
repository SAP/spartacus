/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { OpfTokenisationPaymentMethodComponent } from './opf-tokenisation-payment-method.component';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
  CheckoutPaymentFormModule,
} from '@spartacus/checkout/base/components';
import { OpfTokenisationPaymentMethodService } from './opf-tokenisation-payment-method.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CheckoutPaymentFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    FeaturesConfigModule,
    OpfTokenisationPaymentMethodComponent,
  ],
  providers: [
    OpfTokenisationPaymentMethodService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: OpfTokenisationPaymentMethodComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  exports: [OpfTokenisationPaymentMethodComponent],
})
export class OpfTokenisationPaymentMethodModule {}
