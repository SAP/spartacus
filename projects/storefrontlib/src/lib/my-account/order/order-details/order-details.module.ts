import { NgModule } from '@angular/core';
import { OrderDetailsComponent } from './order-details.component';
import { CartSharedModule } from '../../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';

@NgModule({
  imports: [CartSharedModule, CardModule],
  declarations: [OrderDetailsComponent],
  exports: [OrderDetailsComponent]
})
export class OrderDetailsModule {}
