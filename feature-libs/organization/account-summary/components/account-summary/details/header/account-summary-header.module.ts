import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { accountSummaryHeaderCmsConfig } from './account-summary-header.config';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(accountSummaryHeaderCmsConfig)
  ],
})
export class AccountSummaryHeaderModule { }
