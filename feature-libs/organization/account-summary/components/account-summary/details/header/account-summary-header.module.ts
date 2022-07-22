import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { accountSummaryHeaderCmsConfig } from './account-summary-header.config';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)],
})
export class AccountSummaryHeaderModule {}
