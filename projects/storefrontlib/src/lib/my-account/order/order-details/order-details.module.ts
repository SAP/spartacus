import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineComponent } from './headline/headline.component';
import { ItemsComponent } from './items/items.component';
import { TotalsComponent } from './totals/totals.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import { CmsConfig, ConfigModule } from '@spartacus/core';

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
  declarations: [
    HeadlineComponent,
    ItemsComponent,
    TotalsComponent,
    ShippingComponent
  ],
  exports: [
    HeadlineComponent,
    ItemsComponent,
    TotalsComponent,
    ShippingComponent
  ],
  entryComponents: [
    HeadlineComponent,
    ItemsComponent,
    TotalsComponent,
    ShippingComponent
  ]
})
export class OrderDetailsModule {}
