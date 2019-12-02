import { NgModule } from '@angular/core';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderReturnRequestListModule } from './order-return-request-list/order-return-requests.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ReturnOrderModule } from './cancellations-returns/return-order/return-order.module';
import { ReturnOrderConfirmationModule } from './cancellations-returns/return-order-confirmation/return-order-confirmation.module';

@NgModule({
  imports: [
    OrderHistoryModule,
    OrderReturnRequestListModule,
    OrderDetailsModule,
    ReturnOrderModule,
    ReturnOrderConfirmationModule,
  ],
})
export class OrderModule {}
