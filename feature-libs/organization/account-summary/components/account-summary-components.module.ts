import { NgModule } from '@angular/core';
import { PageMetaResolver, provideDefaultConfig } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from '@spartacus/organization/account-summary/core';
import { accountSummaryCmsConfig } from './list/account-summary.config';
import { AccountSummaryDocumentModule } from './details/document/account-summary-document.module';
import { AccountSummaryHeaderModule } from './details/header/account-summary-header.module';
import { AccountSummaryListModule } from './list/account-summary-list.module';

@NgModule({
  imports: [
    AccountSummaryListModule,
    AccountSummaryHeaderModule,
    AccountSummaryDocumentModule,
  ],
  providers: [
    provideDefaultConfig(accountSummaryCmsConfig),
    {
      provide: PageMetaResolver,
      useExisting: AccountSummaryPageMetaResolver,
      multi: true,
    },
  ],
})
export class AccountSummaryComponentsModule {}
