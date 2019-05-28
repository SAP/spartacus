import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsModule } from '../../cms-components/product/product-details/index';
import {
  CmsPageGuard,
  OutletRefModule,
  PageLayoutModule,
  suffixUrlMatcher,
} from '../../cms-structure/index';
import { ProductDetailPageComponent } from './product-detail-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: ProductDetailPageComponent,
    data: { cxRoute: 'product' },
  },
  {
    matcher: suffixUrlMatcher,
    canActivate: [CmsPageGuard],
    component: ProductDetailPageComponent,
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
  declarations: [ProductDetailPageComponent],
})
export class ProductDetailPageModule {}
