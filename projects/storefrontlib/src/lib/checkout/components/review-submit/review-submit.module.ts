import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { CardModule } from '../../../../shared/components/card/card.module';
import { ReviewSubmitComponent } from './review-submit.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { DeliveryModeSetGuard } from '../../guards/delivery-mode-set.guard';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    CartSharedModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutReviewOrder: {
          selector: 'cx-review-submit',
          guards: [DeliveryModeSetGuard],
        },
      },
    }),
  ],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent],
})
export class ReviewSubmitModule {}
