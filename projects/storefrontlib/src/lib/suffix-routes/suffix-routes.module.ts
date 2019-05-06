import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../cms-structure/page/index';
import { CmsPageGuard } from '../cms/guards/cms-page.guard';
import { ProductPageComponent } from '../ui/pages/product-page/product-page.component';
import { suffixUrlMatcher } from './suffix-url-matcher';

@NgModule({
  imports: [
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
