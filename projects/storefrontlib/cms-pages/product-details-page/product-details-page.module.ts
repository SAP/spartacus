import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig, RoutingConfig } from '@spartacus/core';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { PRODUCT_DETAILS_URL_MATCHER } from './product-details-url-matcher';

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
  ],
  providers: [
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          product: {
            matchers: [PRODUCT_DETAILS_URL_MATCHER],
          },
        },
      },
    }),
  ],
})
export class ProductDetailsPageModule {}
