import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommerceQuotesTableComponent } from './commerce-quotes-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CommerceQuotesTableComponent],
  exports: [CommerceQuotesTableComponent],
})
export class CommerceQuotesTableComponentModule {}
