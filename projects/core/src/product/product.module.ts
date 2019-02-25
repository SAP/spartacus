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
import { ProductPageTitleResolver } from './services/product-page-title.resolver';
import { SearchPageTitleResolver } from './services/search-page-title.resolver';
import { CategoryPageTitleResolver } from './services/category-page-title.resolver';

const pageTitleResolvers = [
  {
    provide: PageMetaResolver,
    useExisting: ProductPageTitleResolver,
    multi: true
  },
  {
    provide: PageMetaResolver,
    useExisting: CategoryPageTitleResolver,
    multi: true
  },
  {
    provide: PageMetaResolver,
    useExisting: SearchPageTitleResolver,
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
