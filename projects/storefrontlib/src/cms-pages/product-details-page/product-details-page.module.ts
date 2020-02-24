import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, RoutingConfig } from '@spartacus/core';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { PRODUCT_DETAILS_URL_MATCHER_FACTORY } from './product-details-url-matcher-factory';

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
            matchers: [PRODUCT_DETAILS_URL_MATCHER_FACTORY],
          },
        },
      },
    }),
  ],
})
export class ProductDetailsPageModule {}
