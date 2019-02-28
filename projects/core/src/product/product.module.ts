import { NgModule } from '@angular/core';

import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from './facade/index';
import { ProductStoreModule } from './store/product-store.module';
import { ProductOccModule } from './occ/product-occ.module';

import { CmsModule } from '../cms/cms.module';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { ProductPageMetaResolver } from './services/product-page-meta.resolver';
import { SearchPageMetaResolver } from './services/search-page-meta.resolver';
import { CategoryPageMetaResolver } from './services/category-page-meta.resolver';

const pageTitleResolvers = [
  {
    provide: PageMetaResolver,
    useExisting: ProductPageMetaResolver,
    multi: true
  },
  {
    provide: PageMetaResolver,
    useExisting: CategoryPageMetaResolver,
    multi: true
  },
  {
    provide: PageMetaResolver,
    useExisting: SearchPageMetaResolver,
    multi: true
  }
];

@NgModule({
  imports: [ProductOccModule, ProductStoreModule, CmsModule],
  providers: [
    ProductService,
    ProductSearchService,
    ProductReviewService,
    ...pageTitleResolvers
  ]
})
export class ProductModule {}
