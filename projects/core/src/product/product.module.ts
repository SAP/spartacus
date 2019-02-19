import { NgModule } from '@angular/core';

import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from './facade/index';
import { ProductStoreModule } from './store/product-store.module';
import { ProductOccModule } from './occ/product-occ.module';
import { pageTitleResolvers } from './services';

@NgModule({
  imports: [ProductOccModule, ProductStoreModule],
  providers: [
    ProductService,
    ProductSearchService,
    ProductReviewService,
    ...pageTitleResolvers
  ]
})
export class ProductModule {}
