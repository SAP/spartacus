/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { NewPaymentMethodsComponent } from './new-payment-methods.component';

@NgModule({
  imports: [CommonModule, CardModule, SpinnerModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NewAccountPaymentDetailsComponent: {
          component: NewPaymentMethodsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [NewPaymentMethodsComponent],
  exports: [NewPaymentMethodsComponent],
})
export class NewPaymentMethodsModule {}
