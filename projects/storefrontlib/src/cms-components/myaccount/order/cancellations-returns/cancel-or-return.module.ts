import { NgModule } from '@angular/core';
import { CancelOrderConfirmationModule } from './cancel-order-confirmation/cancel-order-confirmation.module';
import { CancelOrderModule } from './cancel-order/cancel-order.module';
import { ReturnOrderConfirmationModule } from './return-order-confirmation/return-order-confirmation.module';
import { ReturnOrderModule } from './return-order/return-order.module';

@NgModule({
  imports: [
    CancelOrderModule,
    CancelOrderConfirmationModule,
    ReturnOrderModule,
    ReturnOrderConfirmationModule,
  ],
})
export class OrderCancelOrReturnModule {}
