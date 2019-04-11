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
        matcher: suffixUrlMatcher('p', 'productCode'),
        canActivate: [CmsPageGuard],
        component: ProductPageComponent,
      },
      {
        matcher: suffixUrlMatcher('c', 'categoryCode'),
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
      },
    ]),
  ],
})
export class SuffixRoutesModule {}
