import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';
import { AccountSummaryConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [[
    ...facadeProviders,
    AccountSummaryConnector,
    {
      provide: PageMetaResolver,
      useExisting: AccountSummaryPageMetaResolver,
      multi: true,
    }
  ]],
})
export class AccountSummaryCoreModule {}
