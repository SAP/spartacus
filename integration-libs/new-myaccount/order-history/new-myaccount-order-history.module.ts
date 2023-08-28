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
import { NewMyaccountOrderHistoryAdapter } from './new-myaccount-order-history.adapter';
import { NewMyaccountOrderHistoryComponent } from './new-myaccount-order-history.component';
import { NewMyaccountOrderHistoryService } from './new-myaccount-order-history.service';
import { NewMyAccountConsignmentTrackingComponent } from './consignment-tracking/new-myaccount-consignment-tracking.component';
import { NewMyAccountConsolidatedInformationComponent } from './consolidated-information/new-myaccount-consolidated-information.component';
import { NewMyaccountOrderConsignedEntriesComponent } from './order-consigned-entries/new-myaccount-order-consigned-entries.component';

const moduleComponents = [
  NewMyaccountOrderHistoryComponent,
  NewMyAccountConsolidatedInformationComponent,
  NewMyAccountConsignmentTrackingComponent,
  NewMyaccountOrderConsignedEntriesComponent,
];
@NgModule({
  providers: [
    NewMyaccountOrderHistoryService,
    { provide: OrderHistoryAdapter, useClass: NewMyaccountOrderHistoryAdapter },
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
          component: NewMyaccountOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
})
export class NewMyAccountOrderHistoryModule {}
