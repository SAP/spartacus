import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { DeliveryModeFormComponent } from './delivery-mode-form/delivery-mode-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { AddressFormModule } from './address-form/address-form.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AddressFormModule],
  declarations: [
    MultiStepCheckoutComponent,
    OrderSummaryComponent,
    DeliveryModeFormComponent,
    PaymentFormComponent,
    ReviewSubmitComponent
  ],
  exports: [MultiStepCheckoutComponent, OrderSummaryComponent]
})
export class MultiStepCheckoutModule {}
