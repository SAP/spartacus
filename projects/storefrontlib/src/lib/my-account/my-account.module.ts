import { NgModule } from '@angular/core';
import { OrderModule } from './order/order.module';
import { AddressBookModule } from './address-book/address-book.module';

@NgModule({
  imports: [OrderModule, AddressBookModule],
  declarations: [],
  exports: [OrderModule, AddressBookModule]
})
export class MyAccountModule {}
