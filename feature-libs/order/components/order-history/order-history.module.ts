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
  ConsignmentEntriesEnhancedUIComponent,
  OrderConsolidatedInformationComponent,
  OrderHistoryEnhancedUIComponent,
} from './enhanced-ui';
import { MYACCOUNT_ENHANCED_UI } from '../../order.module';
import { DownloadOrderInvoicesDialogModule } from '../order-details/enhanced-ui';

const enhancedUICmsMapping: CmsConfig = {
  cmsComponents: {
    AccountOrderHistoryComponent: {
      component: OrderHistoryEnhancedUIComponent,
      guards: [AuthGuard],
    },
  },
};

const moduleComponents = [
  OrderHistoryEnhancedUIComponent,
  OrderConsolidatedInformationComponent,
  ConsignmentEntriesEnhancedUIComponent,
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
    DownloadOrderInvoicesDialogModule,
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
    provideDefaultConfigFactory(() => {
      const enhancedUI = inject(MYACCOUNT_ENHANCED_UI);
      if (enhancedUI) {
        return enhancedUICmsMapping;
      }
      return {};
    }),
  ],
})
export class OrderHistoryModule {}
