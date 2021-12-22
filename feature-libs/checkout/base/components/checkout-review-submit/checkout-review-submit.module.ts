import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutAuthGuard } from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  OutletModule,
  PromotionsModule,
} from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutReviewSubmitComponent } from './checkout-review-submit.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    I18nModule,
    UrlModule,
    RouterModule,
    PromotionsModule,
    IconModule,
    OutletModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOrder: {
          component: CheckoutReviewSubmitComponent,
          // TODO(#8880): Shouldn't we keep ShippingAddressSetGuard and others here?
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutReviewSubmitComponent],
  exports: [CheckoutReviewSubmitComponent],
})
export class CheckoutReviewSubmitModule {}
