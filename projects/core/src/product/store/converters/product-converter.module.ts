import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductImageConverterService } from './product-image-converter.service';
import { ProductReferenceConverterService } from './product-reference-converter.service';
@NgModule({
  imports: [CommonModule],
  providers: [ProductImageConverterService, ProductReferenceConverterService]
})
export class ProductConverterModule {}
