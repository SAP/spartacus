/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  MODULE_INITIALIZER,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import {
  MYACCOUNT_ORDER_ENHANCED_UI,
  OrderOutlets,
} from '@spartacus/order/root';
import {
  CardModule,
  IconModule,
  KeyboardFocusModule,
  OutletModule,
  OutletPosition,
  OutletService,
  PromotionsModule,
  ProvideOutletOptions,
  SpinnerModule,
} from '@spartacus/storefront';
import {
  ConsignmentTrackingLinkComponent,
  DownloadOrderInvoicesDialogModule,
  OrderDetailsEnhancedUIActionsComponent,
} from './enhanced-ui';
import { OrderDetailActionsComponent } from './order-detail-actions/order-detail-actions.component';
import { OrderDetailBillingComponent } from './order-detail-billing/order-detail-billing.component';
import { ConsignmentTrackingComponent } from './order-detail-items/consignment-tracking/consignment-tracking.component';
import { TrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { defaultConsignmentTrackingLayoutConfig } from './order-detail-items/default-consignment-tracking-layout.config';
import { OrderConsignedEntriesComponent } from './order-detail-items/order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailReorderComponent } from './order-detail-reorder/order-detail-reorder.component';
import { ReorderDialogComponent } from './order-detail-reorder/reorder-dialog/reorder-dialog.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { defaultReorderLayoutConfig } from './reoder-layout.config';

function registerOrderOutletFactory(
  token: boolean,
  outletService: OutletService,
  componentFactoryResolver: ComponentFactoryResolver
): () => void {
  const result = () => {
    let config: ProvideOutletOptions = {
      component: ConsignmentTrackingLinkComponent,
      id: OrderOutlets.ORDER_CONSIGNMENT,
      position: OutletPosition.REPLACE,
    };
    if (token) {
      const template = componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      outletService.add(config.id, template, config.position);
    }
  };
  return result;
}

const enhancedUICmsMapping: CmsConfig = {
  cmsComponents: {
    AccountOrderDetailsActionsComponent: {
      component: OrderDetailsEnhancedUIActionsComponent,
      guards: [AuthGuard],
    },
  },
};

const moduleComponents = [
  OrderOverviewComponent,
  OrderDetailActionsComponent,
  OrderDetailItemsComponent,
  OrderDetailTotalsComponent,
  OrderDetailBillingComponent,
  TrackingEventsComponent,
  ConsignmentTrackingComponent,
  OrderConsignedEntriesComponent,
  OrderDetailReorderComponent,
  ReorderDialogComponent,
  OrderDetailsEnhancedUIActionsComponent,
  ConsignmentTrackingLinkComponent,
];

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    PromotionsModule,
    UrlModule,
    SpinnerModule,
    RouterModule,
    OutletModule,
    AddToCartModule,
    KeyboardFocusModule,
    IconModule,
    DownloadOrderInvoicesDialogModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        AccountOrderDetailsActionsComponent: {
          component: OrderDetailActionsComponent,
          guards: [AuthGuard],
        },
        AccountOrderDetailsItemsComponent: {
          component: OrderDetailItemsComponent,
          guards: [AuthGuard],
          data: {
            enableAddToCart: true,
          },
        },
        AccountOrderDetailsGroupedItemsComponent: {
          component: OrderDetailItemsComponent,
          guards: [AuthGuard],
          data: {
            enableAddToCart: true,
            groupCartItems: true,
          },
        },
        AccountOrderDetailsTotalsComponent: {
          component: OrderDetailTotalsComponent,
          guards: [AuthGuard],
        },
        AccountOrderDetailsOverviewComponent: {
          component: OrderOverviewComponent,
          guards: [AuthGuard],
        },
        AccountOrderDetailsSimpleOverviewComponent: {
          component: OrderOverviewComponent,
          guards: [AuthGuard],
          data: {
            simple: true,
          },
        },
        AccountOrderDetailsReorderComponent: {
          component: OrderDetailReorderComponent,
          guards: [AuthGuard],
        },
      },
      features: {
        consignmentTracking: '1.2',
      },
    }),
    provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
    provideDefaultConfig(defaultReorderLayoutConfig),
    provideDefaultConfigFactory(() =>
      inject(MYACCOUNT_ORDER_ENHANCED_UI) ? enhancedUICmsMapping : {}
    ),
    {
      provide: MODULE_INITIALIZER,
      useFactory: registerOrderOutletFactory,
      deps: [
        MYACCOUNT_ORDER_ENHANCED_UI,
        OutletService,
        ComponentFactoryResolver,
      ],
      multi: true,
    },
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class OrderDetailsModule {}
