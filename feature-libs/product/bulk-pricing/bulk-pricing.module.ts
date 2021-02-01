import { NgModule } from '@angular/core';
import { BulkPricingTableModule } from './components/bulk-pricing-table/bulk-pricing-table.module';
import { BulkPricingOccModule } from './occ/bulk-pricing-occ.module';

@NgModule({
  imports: [BulkPricingOccModule, BulkPricingTableModule],
})
export class BulkPricingModule {}
