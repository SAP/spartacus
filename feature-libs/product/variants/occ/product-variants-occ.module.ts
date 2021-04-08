import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccProductVariantsConfig } from './config/default-occ-product-variants-config';

@NgModule({
  imports: [CommonModule],
  providers: [provideDefaultConfig(defaultOccProductVariantsConfig)],
})
export class ProductVariantsOccModule {}
