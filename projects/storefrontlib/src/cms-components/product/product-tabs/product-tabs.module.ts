import { NgModule } from '@angular/core';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductDetailsTabModule } from './product-details-tab/product-details-tab.module';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';

@NgModule({
  imports: [
    ProductAttributesModule,
    ProductDetailsTabModule,
    ProductReviewsModule,
  ],
})
export class ProductTabsModule {}
