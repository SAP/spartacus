import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import {
  CardModule,
  ListNavigationModule,
  ReplenishmentOrderCancellationDialogModule,
  SpinnerModule,
} from '../../../../shared/index';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { PromotionsModule } from '../../../checkout/components/promotions/promotions.module';
import { OrderDetailItemsComponent } from '../order-details/order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from '../order-details/order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from '../order-details/order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderHistoryComponent } from '../order-history/order-history.component';
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
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'replenishmentDetails' },
      },
    ]),
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
