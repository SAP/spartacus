import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductPageComponent } from '../../../cms-components/product/product-page/product-page.component';
import { ProductPageModule } from '../../../cms-components/product/product-page/product-page.module';
import { CmsPageGuard } from '../../guards/cms-page.guard';
import { PageLayoutComponent } from '../../page/index';
import { suffixUrlMatcher } from './suffix-url-matcher';

@NgModule({
  imports: [
    ProductPageModule,
    RouterModule.forChild([
      // TODO: consider moving to product page module
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: ProductPageComponent,
        data: {
          cxSuffixUrlMatcher: {
            marker: 'p',
            paramName: 'productCode',
          },
        },
      },
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxSuffixUrlMatcher: {
            marker: 'c',
            paramName: 'categoryCode',
          },
        },
      },
    ]),
  ],
})
export class SuffixRoutesModule {}
