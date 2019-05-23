import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { OutletRefModule } from '../../../cms-structure/outlet/index';
import { PageLayoutModule } from '../../../cms-structure/page/page-layout/page-layout.module';
import { ProductDetailsModule } from '../product-details/product-details.module';
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
    OutletRefModule,
  ],
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent],
})
export class ProductPageModule {}
