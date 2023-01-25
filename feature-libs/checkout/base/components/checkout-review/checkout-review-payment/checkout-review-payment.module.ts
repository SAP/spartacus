import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutReviewPaymentComponent } from './checkout-review-payment.component';
import { CardModule, IconModule } from '@spartacus/storefront';
import { CmsConfig, I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';

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
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewPayment: {
          component: CheckoutReviewPaymentComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ]
})
export class CheckoutReviewPaymentModule {}
