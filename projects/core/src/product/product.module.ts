import { NgModule } from '@angular/core';
import { CmsModule } from '../cms/cms.module';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import {
  ProductReferenceService,
  ProductReviewService,
  ProductSearchService,
  ProductService,
} from './facade/index';
import { CategoryPageMetaResolver } from './services/category-page-meta.resolver';
import { ProductPageMetaResolver } from './services/product-page-meta.resolver';
import { ProductStoreModule } from './store/product-store.module';
import { FindProductsPageMetaResolver } from './services/coupon-search-page-meta.resolver';

const pageTitleResolvers = [
  {
    provide: PageMetaResolver,
    useExisting: ProductPageMetaResolver,
    multi: true,
  },
  {
    provide: PageMetaResolver,
    useExisting: CategoryPageMetaResolver,
    multi: true,
  },
  {
    provide: PageMetaResolver,
    useExisting: FindProductsPageMetaResolver,
    multi: true,
  },
];

@NgModule({
  imports: [ProductStoreModule, CmsModule],
  providers: [
    ProductService,
    ProductSearchService,
    ProductReviewService,
    ProductReferenceService,
    ...pageTitleResolvers,
  ],
})
export class ProductModule {}
