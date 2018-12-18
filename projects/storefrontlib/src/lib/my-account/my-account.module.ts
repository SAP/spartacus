import { NgModule } from '@angular/core';
import { OrderModule } from './order/order.module';
import { AddressBookModule } from './address-book/address-book.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';

@NgModule({
  imports: [OrderModule, AddressBookModule, PaymentMethodsModule],
  declarations: [],
  exports: [OrderModule, AddressBookModule, PaymentMethodsModule]
})
export class MyAccountModule {}
