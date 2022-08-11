import { NgModule } from '@angular/core';
import { OrderComponentsModule } from '@spartacus/order/components';
import { OrderCoreModule } from '@spartacus/order/core';
import { OrderOccModule } from '@spartacus/order/occ';

@NgModule({
  imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule],
})
export class OrderModule {}
