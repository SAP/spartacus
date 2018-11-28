import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../../../product/product.module';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';
import { ProductListModule } from '../../../product/components/product-list/product-list.module';

@NgModule({
  imports: [CommonModule, ProductModule, ProductListModule],
  declarations: [ProductListPageLayoutComponent],
  exports: [ProductListPageLayoutComponent]
})
export class ProductListPageLayoutModule {}
