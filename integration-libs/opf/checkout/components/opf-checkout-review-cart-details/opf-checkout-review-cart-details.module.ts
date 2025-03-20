import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PromotionsModule, OutletModule } from '@spartacus/storefront';
import { OpfCheckoutReviewCartDetailsComponent } from './opf-checkout-review-cart-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    PromotionsModule,
    OutletModule,
  ],
  declarations: [OpfCheckoutReviewCartDetailsComponent],
  exports: [OpfCheckoutReviewCartDetailsComponent],
})
export class OpfCheckoutReviewCartDetailsModule {}
