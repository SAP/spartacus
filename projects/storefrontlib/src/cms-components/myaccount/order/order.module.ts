import { NgModule } from '@angular/core';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrderCancelOrReturnModule } from './cancellations-returns/cancel-or-return.module';

@NgModule({
  imports: [OrderHistoryModule, OrderDetailsModule, OrderCancelOrReturnModule],
})
export class OrderModule {}
