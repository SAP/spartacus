import { NgModule } from '@angular/core';
import { OrderModule } from './order/order.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';

@NgModule({
  imports: [OrderModule, PaymentMethodsModule],
  declarations: []
})
export class MyAccountModule {}
