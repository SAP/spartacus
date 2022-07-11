import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { AccoountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';
import { AccountSummaryStoreModule } from './store/account-summary-store.module';

@NgModule({
  imports: [AccountSummaryStoreModule],
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: AccoountSummaryPageMetaResolver,
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
