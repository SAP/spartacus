import { NgModule } from '@angular/core';
import { VariantsCoreModule } from '@spartacus/product/variants/core';
import { VariantsOccModule } from '@spartacus/product/variants/occ';
import { VariantsComponentsModule } from '@spartacus/product/variants/components';

@NgModule({
  imports: [
    VariantsCoreModule,
    VariantsOccModule,
    VariantsComponentsModule,
  ],
})
export class VariantsModule {}
