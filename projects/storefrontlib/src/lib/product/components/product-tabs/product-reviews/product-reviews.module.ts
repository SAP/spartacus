import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductReviewsComponent } from './product-reviews.component';
import { FormComponentsModule } from './../../../../ui/components/form-components/form-components.module';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormComponentsModule,
    I18nModule
  ],
  declarations: [ProductReviewsComponent],
  exports: [ProductReviewsComponent]
})
export class ProductReviewsModule {}
