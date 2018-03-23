import { NgModule } from '@angular/core';
import { AddressFormModule } from './multi-step-checkout-summary/address-form/address-form.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, AddressFormModule],
  exports: [AddressFormModule]
})
export class CheckoutModule {}
