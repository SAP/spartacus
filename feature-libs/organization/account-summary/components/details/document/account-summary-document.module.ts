import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  PaginationModule,
  SortingModule,
} from '@spartacus/storefront';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { accountSummaryDocumentCmsConfig } from './account-summary-document.config';
import { AccountSummaryDocumentFilterModule } from './filter';

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    AccountSummaryDocumentFilterModule,
    CommonModule,
    I18nModule,
    SortingModule,
    PaginationModule,
    IconModule,
  ],
  providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
})
export class AccountSummaryDocumentModule {}
