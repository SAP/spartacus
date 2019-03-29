import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CartSharedModule,
    CardModule,
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsHeadlineComponent: { selector: 'cx-order-details' },
      },
    }),
    I18nModule,
  ],
  declarations: [OrderDetailsComponent],
  exports: [OrderDetailsComponent],
  entryComponents: [OrderDetailsComponent],
})
export class OrderDetailsModule {}
