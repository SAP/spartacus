import { NgModule } from '@angular/core';
import { ReturnOrderModule } from './return-order/return-order.module';
import { ReturnOrderConfirmationModule } from './return-order-confirmation/return-order-confirmation.module';
import { OrderCancelOrReturnService } from './cancel-or-returns.service';

@NgModule({
  imports: [ReturnOrderModule, ReturnOrderConfirmationModule],
  providers: [OrderCancelOrReturnService],
})
export class OrderCancelOrReturnModule {}
