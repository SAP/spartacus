import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '../../../cms/cms.module';
import { ProductModule } from '../../../product/product.module';

import { ProductDetailsPageLayoutComponent } from './product-details-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule, ProductModule],
  declarations: [ProductDetailsPageLayoutComponent],
  exports: [ProductDetailsPageLayoutComponent]
})
export class ProductDetailsPageLayoutModule {}
