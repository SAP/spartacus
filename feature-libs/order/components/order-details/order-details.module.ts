/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import {
  CmsConfig,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  KeyboardFocusModule,
  OutletModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { OrderDetailActionsComponent } from './order-detail-actions/order-detail-actions.component';
import { ConsignmentTrackingComponent } from './order-detail-items/consignment-tracking/consignment-tracking.component';
import { TrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { defaultConsignmentTrackingLayoutConfig } from './order-detail-items/default-consignment-tracking-layout.config';
import { OrderConsignedEntriesComponent } from './order-detail-items/order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderOverviewModule } from './order-overview/order-overview.module';

const moduleComponents = [
  OrderDetailActionsComponent,
  OrderDetailItemsComponent,
  OrderDetailTotalsComponent,
  OrderDetailShippingComponent,
  TrackingEventsComponent,
  ConsignmentTrackingComponent,
  OrderConsignedEntriesComponent,
];

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    PromotionsModule,
    OrderOverviewModule,
    UrlModule,
    SpinnerModule,
    RouterModule,
    OutletModule,
    AddToCartModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        AccountOrderDetailsActionsComponent: {
          component: OrderDetailActionsComponent,
        },
        AccountOrderDetailsItemsComponent: {
          component: OrderDetailItemsComponent,
          data: {
            enableAddToCart: true,
          },
        },
        AccountOrderDetailsTotalsComponent: {
          component: OrderDetailTotalsComponent,
        },
        AccountOrderDetailsShippingComponent: {
          component: OrderDetailShippingComponent,
        },
      },
      features: {
        consignmentTracking: '1.2',
      },
    }),

    provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class OrderDetailsModule {}
