import { NgModule } from '@angular/core';
import { OrderComponentsModule } from '@spartacus/cart/order/components';
import { OrderCoreModule } from '@spartacus/cart/order/core';
import { OrderOccModule } from '@spartacus/cart/order/occ';

@NgModule({
  imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule],
})
export class OrderModule {}
