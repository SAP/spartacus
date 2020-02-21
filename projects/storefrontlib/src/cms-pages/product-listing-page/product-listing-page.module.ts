import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ConfigModule,
  defaultUrlMatcherFactory,
  RoutingConfig,
  UrlMatcherFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '../../cms-structure/index';
import { createSuffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/create-suffix-url-matcher';

export const plpSuffixUrlMatcherFactory: UrlMatcherFactory = {
  factory: () => () =>
    createSuffixUrlMatcher({ marker: 'c', paramName: 'categoryCode' }),
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'search', cxRoute: 'search' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'brand' },
      },
      {
        // The 'category' route  may include a greedy suffix url matcher '**/c/:categoryCode'
        // So not to shadow the specific 'brand' route, the 'category' is the last route in the sequence.
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'category' },
      },
    ]),
    ConfigModule.withConfig(<RoutingConfig>{
      routing: {
        routes: {
          product: {
            matchers: [defaultUrlMatcherFactory, plpSuffixUrlMatcherFactory],
          },
        },
      },
    }),
  ],
})
export class ProductListingPageModule {}
