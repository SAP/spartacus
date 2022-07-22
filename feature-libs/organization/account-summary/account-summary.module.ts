import { NgModule } from '@angular/core';
import { AccountSummaryOccModule } from './occ/account-summary-occ.module';
import { AccountSummaryCoreModule } from './core/account-summary-core.module';
import { AccountSummaryComponentsModule } from './components/account-summary-components.module';

@NgModule({
  imports: [
    AccountSummaryCoreModule.forRoot(),
    AccountSummaryOccModule,
    AccountSummaryComponentsModule,
  ],
  declarations: [],
})
export class AccountSummaryModule {}
