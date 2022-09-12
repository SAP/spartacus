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
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@commerce-storefront-toolset/core';
import { ListNavigationModule } from '@commerce-storefront-toolset/storefront';
import { OrderReturnRequestListComponent } from './order-return-request-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OrderReturnRequestListComponent: {
          component: OrderReturnRequestListComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [OrderReturnRequestListComponent],
  exports: [OrderReturnRequestListComponent],
})
export class ReturnRequestListModule {}
