import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../../../product/product.module';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';

@NgModule({
  imports: [CommonModule, ProductModule],
  declarations: [ProductListPageLayoutComponent],
  exports: [ProductListPageLayoutComponent]
})
export class ProductListPageLayoutModule {}
