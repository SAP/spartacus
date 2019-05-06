import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import {
  FormComponentsModule,
  StarRatingModule,
} from '../../../../shared/index';
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
