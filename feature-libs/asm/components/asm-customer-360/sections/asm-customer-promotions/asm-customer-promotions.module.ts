import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmCustomerListingModule } from '../../asm-customer-ui-components/asm-customer-listing/asm-customer-listing.module';
import { AsmCustomerPromotionsComponent } from './asm-customer-promotions.component';

@NgModule({
  imports: [CommonModule, AsmCustomerListingModule],
  declarations: [AsmCustomerPromotionsComponent],
  exports: [AsmCustomerPromotionsComponent],
})
export class AsmCustomerPromotionsModule {}
