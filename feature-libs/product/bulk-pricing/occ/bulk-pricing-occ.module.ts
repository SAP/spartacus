import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccBulkPricingConfig } from './config/default-occ-bulk-pricing-config';

@NgModule({
  imports: [CommonModule],
  providers: [provideDefaultConfig(defaultOccBulkPricingConfig)],
})
export class BulkPricingOccModule {}
