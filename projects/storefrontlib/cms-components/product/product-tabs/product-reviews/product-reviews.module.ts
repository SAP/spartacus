import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ProductReviewsComponent } from './product-reviews.component';
import { StarRatingModule, FormErrorsModule } from '../../../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    I18nModule,
    StarRatingModule,
    FormErrorsModule,
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
  exports: [ProductReviewsComponent],
})
export class ProductReviewsModule {}
