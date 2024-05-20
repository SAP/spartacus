/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractOrderContextModule } from '@spartacus/cart/base/components';
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
import { OrderOutlets, USE_MY_ACCOUNT_V2_ORDER } from '@spartacus/order/root';
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
  MyAccountV2ConsignmentTrackingComponent,
  MyAccountV2DownloadInvoicesModule,
  MyAccountV2OrderDetailsActionsComponent,
} from './my-account-v2';
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

function registerOrderOutletFactory(): () => void {
  const isMyAccountV2 = inject(USE_MY_ACCOUNT_V2_ORDER);
  const outletService = inject(OutletService);
  const componentFactoryResolver = inject(ComponentFactoryResolver);
  return () => {
    const config: ProvideOutletOptions = {
      component: MyAccountV2ConsignmentTrackingComponent,
      id: OrderOutlets.ORDER_CONSIGNMENT,
      position: OutletPosition.REPLACE,
    };
    if (isMyAccountV2) {
      const template = componentFactoryResolver.resolveComponentFactory(
        config.component
      );
      outletService.add(config.id, template, config.position);
    }
  };
}

const myAccountV2CmsMapping: CmsConfig = {
  cmsComponents: {
    AccountOrderDetailsActionsComponent: {
      component: MyAccountV2OrderDetailsActionsComponent,
      //guards: inherited from standard config,
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
  MyAccountV2OrderDetailsActionsComponent,
  MyAccountV2ConsignmentTrackingComponent,
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
    MyAccountV2DownloadInvoicesModule,
    AbstractOrderContextModule,
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
      inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}
    ),
    {
      provide: MODULE_INITIALIZER,
      useFactory: registerOrderOutletFactory,
      multi: true,
    },
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class OrderDetailsModule {}
