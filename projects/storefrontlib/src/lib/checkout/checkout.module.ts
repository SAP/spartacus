import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutModule } from '@spartacus/core';
import { CartComponentModule } from '../../cms-components/checkout/cart/cart.module';
import { MultiStepCheckoutModule } from './components/multi-step-checkout/multi-step-checkout.module';
import { guards } from './guards/index';
import { CheckoutConfigService } from './checkout-config.service';

@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutModule,
    CartComponentModule,
    CheckoutModule,
  ],
  providers: [...guards, CheckoutConfigService],
})
export class CheckoutComponentModule {}
