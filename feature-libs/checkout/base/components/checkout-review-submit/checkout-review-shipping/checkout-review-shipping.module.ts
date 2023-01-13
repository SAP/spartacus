import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';



@NgModule({
  declarations: [
    CheckoutReviewShippingComponent
  ],
  exports: [CheckoutReviewShippingComponent],
  imports: [
    CommonModule
  ]
})
export class CheckoutReviewShippingModule { }
