/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { OrderHistoryAdapter } from '@spartacus/order/core';
import {
  CarouselModule,
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CdpOrderHistoryAdapter } from './cdp-order-history.adapter';
import { CdpOrderHistoryComponent } from './cdp-order-history.component';
import { CdpOrderHistoryService } from './cdp-order-history.service';
import { CdpConsignmentTrackingComponent } from './consignment-tracking/cdp-consignment-tracking.component';
import { CdpConsolidatedInformationComponent } from './consolidated-information/cdp-consolidated-information.component';
import { CdpOrderConsignedEntriesComponent } from './order-consigned-entries/cdp-order-consigned-entries.component';

const moduleComponents = [
  CdpOrderHistoryComponent,
  CdpConsolidatedInformationComponent,
  CdpConsignmentTrackingComponent,
  CdpOrderConsignedEntriesComponent,
];
@NgModule({
  providers: [
    CdpOrderHistoryService,
    { provide: OrderHistoryAdapter, useClass: CdpOrderHistoryAdapter },
  ],
  exports: [...moduleComponents],
  declarations: [...moduleComponents],
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
    CarouselModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: CdpOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class CdpOrderHistoryModule {}
