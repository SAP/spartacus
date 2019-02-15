import { NgModule } from '@angular/core';

import {
  ContentPageTitleResolver,
  CategoryPageTitleResolver,
  ProductPageTitleResolver,
  SearchPageTitleResolver,
  CheckoutPageTitleResolver
} from './facade/index';

import { PageTitleResolver } from './facade/page-title.resolver';

@NgModule({
  imports: [],
  providers: [
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
      useExisting: ContentPageTitleResolver,
      multi: true
    },
    {
      provide: PageTitleResolver,
      useExisting: SearchPageTitleResolver,
      multi: true
    },
    {
      provide: PageTitleResolver,
      useExisting: CheckoutPageTitleResolver,
      multi: true
    }
  ]
})
export class PageTitleModule {}
