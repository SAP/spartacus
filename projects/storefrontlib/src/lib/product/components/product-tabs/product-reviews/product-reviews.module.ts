import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { StarRatingModule } from '../../../../../common-components/star-rating/star-rating.module';
import { FormComponentsModule } from './../../../../ui/components/form-components/form-components.module';
import { ProductReviewsComponent } from './product-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormComponentsModule,
    I18nModule,
    StarRatingModule,
  ],
  declarations: [ProductReviewsComponent],
  exports: [ProductReviewsComponent],
})
export class ProductReviewsModule {}
