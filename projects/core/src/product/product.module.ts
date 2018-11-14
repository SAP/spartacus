import { NgModule } from '@angular/core';
import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from './facade';

@NgModule({
  providers: [ProductService, ProductSearchService, ProductReviewService]
})
export class ProductModule {}
