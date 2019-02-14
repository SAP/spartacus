import { NgModule } from '@angular/core';

import {
  ContentPageTitleResolver,
  CategoryPageTitleResolver,
  ProductPageTitleResolver,
  SearchPageTitleResolver
} from './facade/index';

import { PageTitleService } from './facade/page-title.service';
import { PageTitleResolver } from './facade/resolvers/page-title.resolver';

@NgModule({
  imports: [],
  providers: [
    PageTitleService,
    ProductPageTitleResolver,
    CategoryPageTitleResolver,
    ContentPageTitleResolver,
    SearchPageTitleResolver,
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
    }
  ]
})
export class PageTitleModule {}
