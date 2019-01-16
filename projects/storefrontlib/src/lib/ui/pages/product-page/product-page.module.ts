import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductGuard } from '../../../product/guards/product.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ProductPageComponent } from './product-page.component';

import { ProductDetailsModule } from '../../../product';
import { PageTemplateModule } from '../../layout/page-template/page-template.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [ProductGuard, CmsPageGuards],
    component: ProductPageComponent,
    data: { cxPath: 'product' }
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
    PageTemplateModule,
    ProductDetailsModule
  ],
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent]
})
export class ProductPageModule {}
