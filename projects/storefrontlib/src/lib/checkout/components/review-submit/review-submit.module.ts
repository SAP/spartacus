import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, AuthGuard } from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../../shared/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { PaymentDetailsSetGuard } from '../../guards/payment-details-set.guard';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    CartSharedModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOrder: {
          selector: 'cx-review-submit',
          guards: [AuthGuard, PaymentDetailsSetGuard],
        },
      },
    }),
  ],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent],
})
export class ReviewSubmitModule {}
