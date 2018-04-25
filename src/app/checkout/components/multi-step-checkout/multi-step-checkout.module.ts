import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CartModule } from '../../../cart/cart.module';

import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { DeliveryModeFormComponent } from './delivery-mode-form/delivery-mode-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { AddressFormModule } from './address-form/address-form.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AddressFormModule, CartModule],
  declarations: [
    MultiStepCheckoutComponent,
    DeliveryModeFormComponent,
    PaymentFormComponent,
    ReviewSubmitComponent
  ],
  exports: [MultiStepCheckoutComponent]
})
export class MultiStepCheckoutModule {}
