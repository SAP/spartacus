import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../cms/page-layout/page-layout.component';
import { suffixUrlMatcher } from './suffix-url-matcher';
import { ProductPageComponent } from '../ui/pages/product-page/product-page.component';

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
