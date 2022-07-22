import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccountSummaryConnector } from './connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    [AccountSummaryConnector, ...facadeProviders],
  ],
})
export class AccountSummaryCoreModule {
  static forRoot(): ModuleWithProviders<AccountSummaryCoreModule> {
    return {
      ngModule: AccountSummaryCoreModule,
    };
  }
}
