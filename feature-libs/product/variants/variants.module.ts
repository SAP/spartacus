import { NgModule } from '@angular/core';
import { VariantsOccModule } from '@spartacus/product/variants/occ';
import { VariantsComponentsModule } from '@spartacus/product/variants/components';

@NgModule({
  imports: [VariantsOccModule, VariantsComponentsModule],
})
export class VariantsModule {}
