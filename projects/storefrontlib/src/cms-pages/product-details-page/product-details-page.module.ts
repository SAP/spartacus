import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsModule } from '../../cms-components/product/product-details/index';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { OutletRefModule } from '../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { PageLayoutModule } from '../../cms-structure/page/page-layout/page-layout.module';
import { suffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/suffix-url-matcher';
import { ProductDetailsPageComponent } from './product-details-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: ProductDetailsPageComponent,
    data: { cxRoute: 'product' },
  },
  {
    matcher: suffixUrlMatcher,
    canActivate: [CmsPageGuard],
    component: ProductDetailsPageComponent,
    data: {
      cxSuffixUrlMatcher: {
        marker: 'p',
        paramName: 'productCode',
      },
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductDetailsModule,
    PageLayoutModule,
    OutletRefModule,
  ],
  declarations: [ProductDetailsPageComponent],
  exports: [ProductDetailsPageComponent],
})
export class ProductDetailsPageModule {}
