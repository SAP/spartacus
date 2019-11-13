import { NgModule } from '@angular/core';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ReturnOrderModule } from './cancellations-returns/return-order/return-order.module';

@NgModule({
  imports: [OrderHistoryModule, OrderDetailsModule, ReturnOrderModule],
})
export class OrderModule {}
