import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { accountSummaryHeaderCmsConfig } from './account-summary-header.config';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, I18nModule, UrlModule],
  providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)],
})
export class AccountSummaryHeaderModule { }
