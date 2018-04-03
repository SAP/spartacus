import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { DeliveryModeFormComponent } from './delivery-mode-form/delivery-mode-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { OrderReviewComponent } from './order-review/order-review.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    MultiStepCheckoutComponent,
    AddressFormComponent,
    OrderSummaryComponent,
    DeliveryModeFormComponent,
    PaymentFormComponent,
    OrderReviewComponent
  ],
  exports: [MultiStepCheckoutComponent]
})
export class MultiStepCheckoutModule {}
