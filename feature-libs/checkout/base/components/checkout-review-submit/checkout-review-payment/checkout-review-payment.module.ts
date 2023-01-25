import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutReviewPaymentComponent } from './checkout-review-payment.component';
import { CardModule, IconModule } from '@spartacus/storefront';
import { I18nModule, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CheckoutReviewPaymentComponent],
  exports: [CheckoutReviewPaymentComponent],
  imports: [
    CommonModule,
    CardModule,
    I18nModule,
    UrlModule,
    RouterModule,
    IconModule,
  ],
})
export class CheckoutReviewPaymentModule {}
