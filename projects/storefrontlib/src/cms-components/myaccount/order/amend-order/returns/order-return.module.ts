import { NgModule } from '@angular/core';
import { ReturnOrderConfirmationModule } from './return-order-confirmation/return-order-confirmation.module';
import { ReturnOrderModule } from './return-order/return-order.module';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@NgModule({
  imports: [ReturnOrderModule, ReturnOrderConfirmationModule],
})
export class OrderReturnModule {}
