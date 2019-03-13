import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { OrderDetailHeadlineComponent } from './order-detail-headline/order-detail-headline.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import { OrderDetailsService } from './order-details.service';

@NgModule({
  imports: [
    CartSharedModule,
    CardModule,
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsHeadlineComponent: {
          selector: 'cx-order-details-headline'
        },
        AccountOrderDetailsItemsComponent: {
          selector: 'cx-order-details-items'
        },
        AccountOrderDetailsTotalsComponent: {
          selector: 'cx-order-details-totals'
        },
        AccountOrderDetailsShippingComponent: {
          selector: 'cx-order-details-shipping'
        }
      }
    })
  ],
  providers: [OrderDetailsService],
  declarations: [
    OrderDetailHeadlineComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailShippingComponent
  ],
  exports: [
    OrderDetailHeadlineComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailShippingComponent
  ],
  entryComponents: [
    OrderDetailHeadlineComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailShippingComponent
  ]
})
export class OrderDetailsModule {}
