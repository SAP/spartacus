import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccProductVariantsMultidimensionalConfig } from './config/default-occ-variants-multidimensional-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccProductVariantsMultidimensionalConfig),
  ],
})
export class VariantsMultiDimensionalOccModule {}
