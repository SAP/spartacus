/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { defaultReplenishmentOrderCancellationLayoutConfig } from '../replenishment-order-details/default-replenishment-order-cancellation-layout.config';
import { ReplenishmentOrderHistoryComponent } from './replenishment-order-history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountReplenishmentHistoryComponent: {
          component: ReplenishmentOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [ReplenishmentOrderHistoryComponent],
  exports: [ReplenishmentOrderHistoryComponent],
})
export class ReplenishmentOrderHistoryModule {}
