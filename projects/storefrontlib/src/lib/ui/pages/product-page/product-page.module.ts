import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '../../../cms/guards/cms-page.guard';
import { ProductPageComponent } from './product-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { ProductDetailsModule } from '../../../product/components/product-details/product-details.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: ProductPageComponent,
    data: { cxPath: 'product' },
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
