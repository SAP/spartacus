import { NgModule } from '@angular/core';
import { ProductVariantsOccModule } from '@spartacus/product/variants/occ';
import { ProductVariantsComponentsModule } from '@spartacus/product/variants/components';

@NgModule({
  imports: [ProductVariantsOccModule, ProductVariantsComponentsModule],
})
export class ProductVariantsModule {}
