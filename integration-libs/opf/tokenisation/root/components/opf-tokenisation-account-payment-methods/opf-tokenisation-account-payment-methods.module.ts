/*
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
import { OpfTokenisationAccountPaymentMethodsComponent } from './opf-tokenisation-account-payment-methods.component';
import {
  CardModule,
  FormRequiredLegendComponent,
  SpinnerModule,
} from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    FeaturesConfigModule,
    FormRequiredLegendComponent,
    OpfTokenisationAccountPaymentMethodsComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountPaymentDetailsComponent: {
          component: OpfTokenisationAccountPaymentMethodsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [OpfTokenisationAccountPaymentMethodsComponent],
})
export class OpfTokenisationAccountPaymentMethodsModule {}
