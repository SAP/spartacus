import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CardModule } from '../../../../shared/components/card/card.module';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { OrderDetailHeadlineComponent } from './order-detail-headline/order-detail-headline.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from './order-details.service';

const moduleComponents = [
  OrderDetailHeadlineComponent,
  OrderDetailItemsComponent,
  OrderDetailTotalsComponent,
  OrderDetailShippingComponent,
];

@NgModule({
  imports: [
    CartSharedModule,
    CardModule,
    CommonModule,
    I18nModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsHeadlineComponent: {
          component: OrderDetailHeadlineComponent,
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
    }),
  ],
  providers: [OrderDetailsService],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  entryComponents: [...moduleComponents],
})
export class OrderDetailsModule {}
