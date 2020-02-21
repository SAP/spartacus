import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ConfigModule,
  defaultUrlMatcherFactory,
  RoutingConfig,
  UrlMatcherFactory,
} from '@spartacus/core';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { createSuffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/create-suffix-url-matcher';

export const pdpSuffixUrlMatcherFactory: UrlMatcherFactory = {
  factory: () => () =>
    createSuffixUrlMatcher({ marker: 'p', paramName: 'productCode' }),
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'product' },
      },
    ]),
    ConfigModule.withConfig(<RoutingConfig>{
      routing: {
        routes: {
          product: {
            matchers: [defaultUrlMatcherFactory, pdpSuffixUrlMatcherFactory],
          },
        },
      },
    }),
  ],
})
export class ProductDetailsPageModule {}
