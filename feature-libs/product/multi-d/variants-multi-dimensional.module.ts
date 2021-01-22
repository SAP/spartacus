import { NgModule } from '@angular/core';
import { VariantGenericCoreModule } from '@spartacus/product/variants/core';
import { VariantGenericOccModule } from '@spartacus/product/variants/occ';
import { VariantGenericComponentsModule } from '@spartacus/product/variants/components';

@NgModule({
  imports: [
    VariantGenericCoreModule.forRoot(),
    VariantGenericOccModule,
    VariantGenericComponentsModule,
  ],
})
export class VariantsMultiDimensionalModule {}
