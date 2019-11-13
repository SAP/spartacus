import { NgModule } from '@angular/core';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ReturnOrderModule } from './cancellations-returns/return-order/return-order.module';
import { ReturnOrderConfirmationModule } from './cancellations-returns/return-order-confirmation/return-order-confirmation.module';

@NgModule({
  imports: [
    OrderHistoryModule,
    OrderDetailsModule,
    ReturnOrderModule,
    ReturnOrderConfirmationModule,
  ],
})
export class OrderModule {}
