import { NgModule } from '@angular/core';

import { PageTitleResolver } from './resolvers/page-title.resolver';
import {
  ProductPageTitleResolver,
  CategoryPageTitleResolver,
  ContentPageTitleResolver,
  SearchPageTitleResolver,
  CheckoutPageTitleResolver
} from './resolvers';

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
