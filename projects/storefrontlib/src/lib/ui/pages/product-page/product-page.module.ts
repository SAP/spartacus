import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsModule } from '../../../../cms-components/product/index';
import { PageLayoutModule } from '../../../../cms-structure/page/index';
import { CmsPageGuard } from '../../../cms/guards/cms-page.guard';
import { ProductPageComponent } from './product-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: ProductPageComponent,
    data: { cxRoute: 'product' },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductDetailsModule,
    PageLayoutModule,
  ],
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent],
})
export class ProductPageModule {}
