import { NgModule } from '@angular/core';
import { CancelOrderConfirmationModule } from './cancel-order-confirmation/cancel-order-confirmation.module';
import { CancelOrderModule } from './cancel-order/cancel-order.module';

@NgModule({
  imports: [CancelOrderModule, CancelOrderConfirmationModule],
})
export class OrderCancellationModule {}
