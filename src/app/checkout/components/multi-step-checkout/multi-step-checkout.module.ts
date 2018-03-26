import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { AddressFormComponent } from './address-form/address-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MultiStepCheckoutComponent, AddressFormComponent],
  exports: [MultiStepCheckoutComponent]
})
export class MultiStepCheckoutModule {}
