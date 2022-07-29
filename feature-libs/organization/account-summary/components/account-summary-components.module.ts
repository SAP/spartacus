import { NgModule } from '@angular/core';
import { PageMetaResolver, provideDefaultConfig } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from '@spartacus/organization/account-summary/core';
import { accountSummaryCmsConfig } from './account-summary/account-summary.config';
import { AccountSummaryCellLinkModule } from './account-summary/cell-link/account-summary-cell-link.module';
import { AccountSummaryDocumentModule } from './account-summary/details/document/account-summary-document.module';
import { AccountSummaryHeaderModule } from './account-summary/details/header/account-summary-header.module';
import { AccountSummaryListModule } from './account-summary/list/account-summary-list.module';

@NgModule({
  imports: [
    AccountSummaryListModule,
    AccountSummaryHeaderModule,
    AccountSummaryDocumentModule,
    AccountSummaryCellLinkModule,
  ],
  declarations: [],
  providers: [provideDefaultConfig(accountSummaryCmsConfig),
  {
    provide: PageMetaResolver,
    useExisting: AccountSummaryPageMetaResolver,
    multi: true,
  },],
})
export class AccountSummaryComponentsModule { }
