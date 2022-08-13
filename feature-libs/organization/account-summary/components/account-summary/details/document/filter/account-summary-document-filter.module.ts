import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { AccountSummaryDocumentFilterComponent } from './account-summary-document-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule, FormErrorsModule } from '@spartacus/storefront';

@NgModule({
  declarations: [AccountSummaryDocumentFilterComponent],
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    NgSelectModule,
    ReactiveFormsModule,
    DatePickerModule,
    FormErrorsModule,
  ],
  exports: [AccountSummaryDocumentFilterComponent]
})
export class AccountSummaryDocumentFilterModule {}
