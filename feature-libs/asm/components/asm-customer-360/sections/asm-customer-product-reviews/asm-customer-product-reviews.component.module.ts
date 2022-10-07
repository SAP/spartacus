import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsmCustomerTableModule } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.module';
import { AsmCustomerProductReviewsComponent } from './asm-customer-product-reviews.component';

@NgModule({
  imports: [CommonModule, AsmCustomerTableModule],
  declarations: [AsmCustomerProductReviewsComponent],
  exports: [AsmCustomerProductReviewsComponent],
})
export class AsmCustomerProductReviewsComponentModule {}
