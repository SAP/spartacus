import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { AccountSummaryDocumentFilterComponent } from './account-summary-document-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountSummaryDocumentFilterComponent],
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    NgSelectModule,
    FormsModule,
  ],
  exports: [AccountSummaryDocumentFilterComponent]
})
export class AccountSummaryDocumentFilterModule {}
