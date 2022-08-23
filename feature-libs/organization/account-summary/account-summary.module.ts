import { NgModule } from '@angular/core';
import { AccountSummaryCoreModule } from '@spartacus/organization/account-summary/core';
import { AccountSummaryOccModule } from '@spartacus/organization/account-summary/occ';
import { AccountSummaryComponentsModule } from '@spartacus/organization/account-summary/components';

@NgModule({
  imports: [
    AccountSummaryCoreModule,
    AccountSummaryOccModule,
    AccountSummaryComponentsModule,
  ],
  declarations: [],
})
export class AccountSummaryModule {}
