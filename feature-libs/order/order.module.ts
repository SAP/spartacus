import { NgModule } from '@angular/core';
import { OrderComponentsModule } from 'feature-libs/order/components/public_api';
import { OrderCoreModule } from 'feature-libs/order/order/core/public_api';
import { OrderOccModule } from 'feature-libs/order/order/occ/public_api';

@NgModule({
  imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule],
})
export class OrderModule {}
