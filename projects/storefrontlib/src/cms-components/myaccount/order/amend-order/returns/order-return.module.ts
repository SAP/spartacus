import { NgModule } from '@angular/core';
import { ReturnOrderConfirmationModule } from './return-order-confirmation/return-order-confirmation.module';
import { ReturnOrderModule } from './return-order/return-order.module';

@NgModule({
  imports: [ReturnOrderModule, ReturnOrderConfirmationModule],
})
export class OrderReturnModule {}
