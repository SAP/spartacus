import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiStepCheckoutModule } from './components/multi-step-checkout/multi-step-checkout.module';
import { CartComponentModule } from './../cart/cart.module';

import { guards } from './guards/index';
import { CheckoutModule } from '@spartacus/core';
@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutModule,
    CartComponentModule,
    CheckoutModule
  ],
  providers: [...guards]
})
export class CheckoutComponentModule {}
