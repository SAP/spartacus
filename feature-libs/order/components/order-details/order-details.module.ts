import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  CartSharedModule,
  OrderDetailsServiceTransitionalToken,
  OrderOverviewModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { OrderDetailActionsComponent } from './order-detail-actions/order-detail-actions.component';
import { ConsignmentTrackingComponent } from './order-detail-items/consignment-tracking/consignment-tracking.component';
import { TrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { OrderConsignedEntriesComponent } from './order-detail-items/order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from './order-details.service';

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
    CartSharedModule,
    CardModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    PromotionsModule,
    OrderOverviewModule,
    UrlModule,
    SpinnerModule,
    RouterModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        AccountOrderDetailsActionsComponent: {
          component: OrderDetailActionsComponent,
        },
        AccountOrderDetailsItemsComponent: {
          component: OrderDetailItemsComponent,
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
    {
      provide: OrderDetailsServiceTransitionalToken,
      useExisting: OrderDetailsService,
    },
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class OrderDetailsModule {}
