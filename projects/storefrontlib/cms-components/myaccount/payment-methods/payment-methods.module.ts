/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { FormRequiredLegendComponent } from '../../../shared/components/form/form-required-legend';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { PaymentMethodsComponent } from './payment-methods.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    FeaturesConfigModule,

    FormRequiredLegendComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountPaymentDetailsComponent: {
          component: PaymentMethodsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent],
})
export class PaymentMethodsModule {}
