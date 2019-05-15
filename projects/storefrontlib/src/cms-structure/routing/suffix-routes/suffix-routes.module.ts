import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../lib/cms/guards/cms-page.guard';
import { ProductPageComponent } from '../../../lib/ui/pages/product-page/product-page.component';
import { PageLayoutComponent } from '../../page/index';
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
