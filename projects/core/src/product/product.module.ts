import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import {
  ProductReferenceService,
  ProductReviewService,
  ProductSearchService,
  ProductService,
} from './facade/index';
import { CategoryPageMetaResolver } from './services/category-page-meta.resolver';
import { ProductPageMetaResolver } from './services/product-page-meta.resolver';
import { SearchPageMetaResolver } from './services/search-page-meta.resolver';
import { ProductStoreModule } from './store/product-store.module';

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
    useExisting: SearchPageMetaResolver,
    multi: true,
  },
];

@NgModule({
  imports: [ProductStoreModule],
})
export class ProductModule {
  static forRoot(): ModuleWithProviders<ProductModule> {
    return {
      ngModule: ProductModule,
      providers: [
        ProductService,
        ProductSearchService,
        ProductReviewService,
        ProductReferenceService,
        ...pageTitleResolvers,
      ],
    };
  }
}
