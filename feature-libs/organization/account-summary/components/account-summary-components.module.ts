import { NgModule } from '@angular/core';
import { AccountSummaryCellLinkModule } from './account-summary/cell-link/account-summary-cell-link.module';
import { AccountSummaryDocumentModule } from './account-summary/details/account-summary-document/account-summary-document.module';
import { AccountSummaryHeaderModule } from './account-summary/details/header/account-summary-header.module';
import { AccountSummaryListModule } from './account-summary/list/account-summary-list.module';


@NgModule({
  imports: [
    AccountSummaryListModule, AccountSummaryHeaderModule, AccountSummaryDocumentModule, AccountSummaryCellLinkModule
  ],
  declarations: [
  ],
})
export class AccountSummaryComponentsModule { }
