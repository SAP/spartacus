import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccAccountSummaryConfig } from './config/default-occ-account-summary-config';


@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccAccountSummaryConfig),
  ]
})
export class AccountSummaryOccModule { }
