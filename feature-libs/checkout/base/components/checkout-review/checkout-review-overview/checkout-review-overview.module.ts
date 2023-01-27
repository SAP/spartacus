import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutReviewOverviewComponent } from './checkout-review-overview.component';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';

@NgModule({
  declarations: [CheckoutReviewOverviewComponent],
  imports: [CommonModule, PromotionsModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOverview: {
          component: CheckoutReviewOverviewComponent,
          //guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
})
export class CheckoutReviewOverviewModule {}
