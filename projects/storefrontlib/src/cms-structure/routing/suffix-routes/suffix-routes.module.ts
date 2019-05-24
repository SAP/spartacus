import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductPageComponent } from '../../../lib/ui/pages/product-page/product-page.component';
import { ProductPageModule } from '../../../lib/ui/pages/product-page/product-page.module';
import { CmsPageGuard } from '../../guards/cms-page.guard';
import { PageLayoutComponent } from '../../page/index';
import { suffixUrlMatcher } from './suffix-url-matcher';

@NgModule({
  imports: [
    ProductPageModule,
    RouterModule.forChild([
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
