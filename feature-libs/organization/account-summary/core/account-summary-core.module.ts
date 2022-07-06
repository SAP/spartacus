import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccountSummaryStoreModule } from './store/account-summary-store.module';

@NgModule({
  imports: [AccountSummaryStoreModule],
})
export class AccountSummaryCoreModule {
  static forRoot(): ModuleWithProviders<AccountSummaryCoreModule> {
    return {
      ngModule: AccountSummaryCoreModule,
    };
  }
}
