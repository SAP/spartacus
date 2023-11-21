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
  provideDefaultConfig
} from '@spartacus/core';
import { CardModule } from '../../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { MyAccountV2PaymentMethodsComponent } from './my-account-v2-payment-methods.component';

// const myAccountV2CmsMapping: CmsConfig = {
//   cmsComponents: {
//     AccountOrderHistoryComponent: {
//       component: MyAccountV2PaymentMethodsComponent,
//       //guards: inherited from standard config,
//     },
//   },
// };

@NgModule({
  imports: [CommonModule, CardModule, SpinnerModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        NewAccountPaymentDetailsComponent: {
          component: MyAccountV2PaymentMethodsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    // {
    //   provide: USE_MY_ACCOUNT_V2_PAYMENT,
    //   useValue: environment.myAccountV2,
    // },
    // provideDefaultConfigFactory(() =>
    //   inject(USE_MY_ACCOUNT_V2_PAYMENT) ? myAccountV2CmsMapping : {}
    // ),
  ],
  declarations: [MyAccountV2PaymentMethodsComponent],
  exports: [MyAccountV2PaymentMethodsComponent],
})
export class MyAccountV2PaymentMethodsModule {}

