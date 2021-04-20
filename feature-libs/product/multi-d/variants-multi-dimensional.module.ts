import { NgModule } from '@angular/core';
import { VariantsMultiDimensionalCoreModule } from '@spartacus/product/multi-d/core';
import { VariantsMultiDimensionalOccModule } from '@spartacus/product/multi-d/occ';
import { VariantsMultiDimensionalComponentsModule } from '@spartacus/product/multi-d/components';

@NgModule({
  imports: [
    VariantsMultiDimensionalCoreModule,
    VariantsMultiDimensionalOccModule,
    VariantsMultiDimensionalComponentsModule,
  ],
})
export class VariantsMultiDimensionalModule {}
