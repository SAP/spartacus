/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigModule, RoutingModule, UrlModule } from '@spartacus/core';
import { I18nModule } from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
//import { OrderHistoryModule } from '@spartacus/order/components';
import { OrderComponent } from './cdp-order.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    I18nModule,
    UrlModule,
    RoutingModule,
    SpinnerModule,
    ListNavigationModule,
    ConfigModule.withConfig({
      cmsComponents: {
        AccountOrderHistoryComponent: {
          component: OrderComponent,
        },
      },
    }),
  ],
  declarations: [OrderComponent],
})
export class OrderModule {}
