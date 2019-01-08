import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductGuard } from '../../../product/guards/product.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ProductDetailsPageLayoutModule } from '../../layout/product-details-page-layout/product-details-page-layout.module';
import { ProductPageComponent } from './product-page.component';
import { ConfigurableRoutes } from '@spartacus/core';

const routes: ConfigurableRoutes = [
  {
    path: null,
    canActivate: [ProductGuard, CmsPageGuards],
    component: ProductPageComponent,
    data: { cxPath: 'product', breadcrumb: '/ Product' }
  },
  {
    path:
      'Open-Catalogue/:category1/:category2/:category3/:category4/p/:productCode',
    redirectTo: null,
    data: { cxRedirectTo: 'product' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductDetailsPageLayoutModule
  ],
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent]
})
export class ProductPageModule {}
