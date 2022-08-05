import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { AsmCustomerListingComponent } from './asm-customer-listing.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [AsmCustomerListingComponent],
  exports: [AsmCustomerListingComponent],
})
export class AsmCustomerListingModule {}
