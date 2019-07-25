import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { suffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/suffix-url-matcher';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'product' },
      },
      {
        matcher: suffixUrlMatcher,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxSuffixUrlMatcher: {
            marker: 'p',
            paramName: 'productCode',
          },
        },
      },
    ]),
  ],
})
export class ProductDetailsPageModule {}
