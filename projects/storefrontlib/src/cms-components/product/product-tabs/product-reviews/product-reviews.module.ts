import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { StarRatingModule } from '../../../../shared/components/star-rating/star-rating.module';
import { ProductReviewsComponent } from './product-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    I18nModule,
    StarRatingModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductReviewsTabComponent: {
          component: ProductReviewsComponent,
        },
      },
    }),
  ],
  declarations: [ProductReviewsComponent],
  entryComponents: [ProductReviewsComponent],
  exports: [ProductReviewsComponent],
})
export class ProductReviewsModule {}
