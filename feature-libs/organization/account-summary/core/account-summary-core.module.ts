import { NgModule } from '@angular/core';
import { AccountSummaryConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    [AccountSummaryConnector, ...facadeProviders],
  ],
})
export class AccountSummaryCoreModule { }
