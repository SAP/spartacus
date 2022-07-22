import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';
import { AccountSummaryConnector } from './connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    [AccountSummaryConnector, ...facadeProviders],
    {
      provide: PageMetaResolver,
      useExisting: AccountSummaryPageMetaResolver,
      multi: true,
    },
  ],
})
export class AccountSummaryCoreModule {
  static forRoot(): ModuleWithProviders<AccountSummaryCoreModule> {
    return {
      ngModule: AccountSummaryCoreModule,
    };
  }
}
