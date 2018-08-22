import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../../../product/product.module';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';
import { CmsLibModule } from '../../../cms-lib/cms-lib.module';

@NgModule({
  imports: [CommonModule, ProductModule, CmsLibModule],
  declarations: [ProductListPageLayoutComponent],
  exports: [ProductListPageLayoutComponent]
})
export class ProductListPageLayoutModule {}
