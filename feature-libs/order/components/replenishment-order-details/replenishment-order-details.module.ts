import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  CartSharedModule,
  ListNavigationModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { OrderDetailItemsComponent } from '../order-details/order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from '../order-details/order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from '../order-details/order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { ReplenishmentOrderCancellationDialogModule } from '../replenishment-order-cancellation-dialog/replenishment-order-cancellation-dialog.module';
import { defaultReplenishmentOrderCancellationLayoutConfig } from './default-replenishment-order-cancellation-layout.config';
import { ReplenishmentOrderCancellationComponent } from './replenishment-order-cancellation/replenishment-order-cancellation.component';
import { ReplenishmentOrderDetailsService } from './replenishment-order-details.service';

const moduleComponents = [ReplenishmentOrderCancellationComponent];

@NgModule({
  imports: [
    CartSharedModule,
    CardModule,
    CommonModule,
    I18nModule,
    PromotionsModule,
    UrlModule,
    ReplenishmentOrderCancellationDialogModule,
    SpinnerModule,
    ListNavigationModule,
    RouterModule,
  ],
  providers: [
    provideConfig(defaultReplenishmentOrderCancellationLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReplenishmentDetailItemsComponent: {
          component: OrderDetailItemsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: ReplenishmentOrderDetailsService,
            },
          ],
        },
        ReplenishmentDetailTotalsComponent: {
          component: OrderDetailTotalsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: ReplenishmentOrderDetailsService,
            },
          ],
        },
        ReplenishmentDetailShippingComponent: {
          component: OrderDetailShippingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: ReplenishmentOrderDetailsService,
            },
          ],
        },
        ReplenishmentDetailActionsComponent: {
          component: ReplenishmentOrderCancellationComponent,
        },
        ReplenishmentDetailOrderHistoryComponent: {
          component: OrderHistoryComponent,
        },
      },
    }),
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class ReplenishmentOrderDetailsModule {}
