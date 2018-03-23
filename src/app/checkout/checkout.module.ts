import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiStepCheckoutModule } from './multi-step-checkout/multi-step-checkout.module';

@NgModule({
  imports: [CommonModule, MultiStepCheckoutModule],
  exports: [MultiStepCheckoutModule]
})
export class CheckoutModule {}
