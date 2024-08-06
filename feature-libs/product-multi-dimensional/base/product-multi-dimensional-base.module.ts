import { NgModule } from '@angular/core';
import { ProductMultiDimensionalBaseOccModule } from './occ/product-multi-dimensional-base-occ.module';
import { ProductMultiDimensionalBaseRootModule } from './root/product-multi-dimensional-base-root.module';

@NgModule({
  imports: [
    ProductMultiDimensionalBaseOccModule,
    ProductMultiDimensionalBaseRootModule,
  ],
})
export class ProductMultiDimensionalBaseModule {}
