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
import { OpfTokenisationPaymentMethodsComponent } from './opf-tokenisation-payment-methods.component';
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
    OpfTokenisationPaymentMethodsComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountPaymentDetailsComponent: {
          component: OpfTokenisationPaymentMethodsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [OpfTokenisationPaymentMethodsComponent],
})
export class OpfTokenisationPaymentMethodsModule {}
