/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutPaymentMethodModule as CorePaymentMethodModule } from '@spartacus/checkout/base/components';
import {
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { defaultDigitalPaymentsConfig } from '../../adapters/config/default-digital-payments-endpoint.config';
import { DpPaymentCallbackModule } from './dp-payment-callback/dp-payment-callback.module';
import { DpPaymentFormModule } from './dp-payment-form/dp-payment-form.module';
import { DpPaymentMethodComponent } from './dp-payment-method.component';

@NgModule({
  imports: [
    CommonModule,
    DpPaymentFormModule,
    RouterModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    DpPaymentCallbackModule,

    ConfigModule.withConfig({
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: DpPaymentMethodComponent,
        },
      },
    }),
    FeaturesConfigModule,
  ],
  declarations: [DpPaymentMethodComponent],
  exports: [DpPaymentMethodComponent],
  providers: [provideDefaultConfig(defaultDigitalPaymentsConfig)],
})
export class DpPaymentMethodModule extends CorePaymentMethodModule {}
