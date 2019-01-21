import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { ProductPageComponent } from './product-page.component';

import { ProductDetailsModule } from '../../../product';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
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
    PageLayoutModule,
    ProductDetailsModule
  ],
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent]
})
export class ProductPageModule {}
