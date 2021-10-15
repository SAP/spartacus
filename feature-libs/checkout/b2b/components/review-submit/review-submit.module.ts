import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/components';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  CartSharedModule,
  IconModule,
  PromotionsModule,
} from '@spartacus/storefront';
import { B2BReviewSubmitComponent } from './review-submit.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    CartSharedModule,
    I18nModule,
    UrlModule,
    RouterModule,
    PromotionsModule,
    IconModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOrder: {
          component: B2BReviewSubmitComponent,
          // TODO(#8880): Shouldn't we keep ShippingAddressSetGuard and others here?
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [B2BReviewSubmitComponent],
  exports: [B2BReviewSubmitComponent],
})
export class B2BReviewSubmitModule {}
