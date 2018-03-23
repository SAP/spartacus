import { NgModule } from '@angular/core';
import { AddNewAddressModule } from './multi-step-checkout-summary/add-new-address/add-new-address.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, AddNewAddressModule],
  exports: [AddNewAddressModule]
})
export class CheckoutModule {}
