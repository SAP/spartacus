import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CardModule } from '../../../../shared/components/card/card.module';
import { CartNotEmptyGuard } from '../../../cart/cart-not-empty.guard';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { DeliveryModeSetGuard } from '../../guards/delivery-mode-set.guard';
import { PaymentDetailsSetGuard } from '../../guards/payment-details-set.guard';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
import { ReviewSubmitComponent } from './review-submit.component';

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
          guards: [
            AuthGuard,
            CartNotEmptyGuard,
            ShippingAddressSetGuard,
            DeliveryModeSetGuard,
            PaymentDetailsSetGuard,
          ],
        },
      },
    }),
  ],
  declarations: [ReviewSubmitComponent],
  entryComponents: [ReviewSubmitComponent],
  exports: [ReviewSubmitComponent],
})
export class ReviewSubmitModule {}
