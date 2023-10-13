/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { OrderHistoryComponent } from './order-history.component';
import {
  ConsignmentEntriesComponent,
  OrderConsolidatedInformationComponent,
  OrderHistoryExtendedComponent,
} from './order-history-extended';
import { MYACCOUNT_ENHANCED_UI_ORDER } from '@spartacus/order/root';

const enhancedUICmsMapping: CmsConfig = {
  cmsComponents: {
    AccountOrderHistoryComponent: {
      component: OrderHistoryExtendedComponent,
      //guards: inherited from standard config,
    },
  },
};

const moduleComponents = [
  OrderHistoryExtendedComponent,
  OrderConsolidatedInformationComponent,
  ConsignmentEntriesComponent,
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
      inject(MYACCOUNT_ENHANCED_UI_ORDER) ? enhancedUICmsMapping : {}
    ),
  ],
})
export class OrderHistoryModule {}
