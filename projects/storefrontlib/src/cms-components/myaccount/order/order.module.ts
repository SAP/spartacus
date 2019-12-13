import { NgModule } from '@angular/core';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ReturnRequestListModule } from './return-request-list/order-return-request-list.module';
import { ReturnRequestDetailModule } from './return-request-detail/return-request-detail.module';
import { OrderCancelOrReturnModule } from './cancellations-returns/cancel-or-return.module';

@NgModule({
  imports: [
    OrderHistoryModule,
    OrderDetailsModule,
    OrderCancelOrReturnModule,
    ReturnRequestListModule,
    ReturnRequestDetailModule,
  ],
})
export class OrderModule {}
