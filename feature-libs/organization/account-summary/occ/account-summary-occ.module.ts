import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { AccountSummaryAdapter } from '@spartacus/organization/account-summary/core';
import { OccAccountSummaryAdapter } from './adapters/occ-account-summary.adapter';
import { defaultOccAccountSummaryConfig } from './config/default-occ-account-summary-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccAccountSummaryConfig),
    { provide: AccountSummaryAdapter, useClass: OccAccountSummaryAdapter },
  ],
})
export class AccountSummaryOccModule {}
