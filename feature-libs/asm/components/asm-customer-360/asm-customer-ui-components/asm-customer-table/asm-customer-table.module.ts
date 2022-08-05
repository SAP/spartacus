import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StarRatingModule } from '@spartacus/storefront';
import { AsmCustomerTableComponent } from './asm-customer-table.component';

@NgModule({
  imports: [CommonModule, StarRatingModule],
  declarations: [AsmCustomerTableComponent],
  exports: [AsmCustomerTableComponent],
})
export class AsmCustomerTableModule {}
