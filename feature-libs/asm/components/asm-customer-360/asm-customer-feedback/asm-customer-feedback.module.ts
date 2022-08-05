import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmCustomerTableModule } from '../asm-customer-ui-components/asm-customer-table/asm-customer-table.module';
import { AsmCustomerFeedbackComponent } from './asm-customer-feedback.component';

@NgModule({
  imports: [CommonModule, AsmCustomerTableModule],
  declarations: [AsmCustomerFeedbackComponent],
  exports: [AsmCustomerFeedbackComponent],
})
export class AsmCustomerFeedbackModule {}
