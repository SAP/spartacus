import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { AsmCustomerProductListingComponent } from './asm-customer-product-listing.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [AsmCustomerProductListingComponent],
  exports: [AsmCustomerProductListingComponent],
})
export class AsmCustomerProductListingModule {}
