import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';

@NgModule({
  imports: [],
  providers: [
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
