import { NgModule } from '@angular/core';

import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from './facade/index';
import { ProductStoreModule } from './store/product-store.module';
import { ProductOccModule } from './occ/product-occ.module';

import { CmsModule } from '../cms/cms.module';
import { PageTitleResolver } from '../cms/page/page-title.resolver';
import { ProductPageTitleResolver } from './services/product-page-title.resolver';
import { SearchPageTitleResolver } from './services/search-page-title.resolver';
import { CategoryPageTitleResolver } from './services/category-page-title.resolver';

const pageTitleResolvers = [
  {
    provide: PageTitleResolver,
    useExisting: ProductPageTitleResolver,
    multi: true
  },
  {
    provide: PageTitleResolver,
    useExisting: CategoryPageTitleResolver,
    multi: true
  },
  {
    provide: PageTitleResolver,
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
