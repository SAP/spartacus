import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '../../cms-structure/index';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'search', cxRoute: 'search' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'brand' },
      },
      {
        //it's after the brand route, as it may include suffix matcher
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'category' },
      },
    ]),
  ],
})
export class ProductListingPageModule {}
