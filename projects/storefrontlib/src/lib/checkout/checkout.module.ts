import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiStepCheckoutModule } from './components/multi-step-checkout/multi-step-checkout.module';

import { guards } from './guards/index';

@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutModule
  ],
  providers: [...guards]
})
export class CheckoutModule {}
