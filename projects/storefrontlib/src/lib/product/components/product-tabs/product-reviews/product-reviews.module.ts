import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { ProductReviewService } from '@spartacus/core';

import { ProductReviewsComponent } from './product-reviews.component';
import { FormComponentsModule } from './../../../../ui/components/form-components/form-components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormComponentsModule,
  ],
  declarations: [ProductReviewsComponent],
  exports: [ProductReviewsComponent]
})
export class ProductReviewsModule {}
