/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import { USE_MY_ACCOUNT_V2_ORDER } from '@spartacus/order/root';
import {
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
} from '@spartacus/storefront';
import {
  MyAccountV2ConsignmentEntriesComponent,
  MyAccountV2OrderConsolidatedInformationComponent,
  MyAccountV2OrderHistoryComponent,
} from './my-account-v2';
import { OrderHistoryComponent } from './order-history.component';

const myAccountV2CmsMapping: CmsConfig = {
  cmsComponents: {
    AccountOrderHistoryComponent: {
      component: MyAccountV2OrderHistoryComponent,
      //guards: inherited from standard config,
    },
  },
};

const moduleComponents = [
  MyAccountV2OrderHistoryComponent,
  MyAccountV2OrderConsolidatedInformationComponent,
  MyAccountV2ConsignmentEntriesComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    MediaModule,
  ],
  declarations: [OrderHistoryComponent, ...moduleComponents],
  exports: [OrderHistoryComponent, ...moduleComponents],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
    provideDefaultConfigFactory(() =>
      inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}
    ),
  ],
})
export class OrderHistoryModule {}
