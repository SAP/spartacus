/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';

import { OrderHistoryAdapter } from '@spartacus/order/core';
import {
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ConsignmentEntriesEnhancedUIComponent } from './consignment-entries/consignment-entries-enhanced-ui.component';
import { OrderConsolidatedInformationComponent } from './consolidated-information/order-consolidated-information.component';
import { OrderHistoryEnhancedUIAdapter } from './order-history-enhanced-ui.adapter';
import { OrderHistoryEnhancedUIComponent } from './order-history-enhanced-ui.component';

const moduleComponents = [
  OrderHistoryEnhancedUIComponent,
  OrderConsolidatedInformationComponent,
  ConsignmentEntriesEnhancedUIComponent,
];
@NgModule({
  providers: [
    { provide: OrderHistoryAdapter, useClass: OrderHistoryEnhancedUIAdapter },
  ],
  exports: [...moduleComponents],
  declarations: [...moduleComponents],
  imports: [
    CommonModule,
    RouterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrderHistoryEnhancedUIComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class OrderHistoryEnhancedUIModule {}
