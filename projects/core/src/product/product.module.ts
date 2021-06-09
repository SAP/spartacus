import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/page/page-meta.resolver';
import { ProductEventModule } from './event/product-event.module';
import { CategoryPageMetaResolver } from './services/category-page-meta.resolver';
import { CouponSearchPageResolver } from './services/coupon-search-page-meta.resolver';
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
  {
    provide: PageMetaResolver,
    useExisting: CouponSearchPageResolver,
    multi: true,
  },
];

@NgModule({
  imports: [ProductStoreModule, ProductEventModule],
})
export class ProductModule {
  static forRoot(): ModuleWithProviders<ProductModule> {
    return {
      ngModule: ProductModule,
      providers: [...pageTitleResolvers],
    };
  }
}
