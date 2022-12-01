import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPFCheckoutPaymentReviewComponent } from './opf-checkout-payment-review.component';
import { provideDefaultConfig, CmsConfig } from '@spartacus/core';

@NgModule({
  declarations: [OPFCheckoutPaymentReviewComponent],
  imports: [CommonModule],

  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutOPF: {
          component: OPFCheckoutPaymentReviewComponent,
        },
      },
    }),
  ],
})
export class OPFCheckoutPaymentsModule {}
