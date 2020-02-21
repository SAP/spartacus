import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ConfigModule,
  DEFAULT_URL_MATCHER_FACTORY,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { PDP_SUFFIX_URL_MATCHER_FACTORY } from '../../cms-structure/routing/suffix-routes/suffix-url-matchers';

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
            matchers: [
              DEFAULT_URL_MATCHER_FACTORY,
              PDP_SUFFIX_URL_MATCHER_FACTORY,
            ],
          },
        },
      },
    }),
  ],
})
export class ProductDetailsPageModule {}
