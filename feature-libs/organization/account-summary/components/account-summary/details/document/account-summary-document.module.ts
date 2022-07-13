import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { accountSummaryDocumentCmsConfig } from './account-summary-document.config';

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
  ],
  providers: [
    provideDefaultConfig(accountSummaryDocumentCmsConfig)
  ]
})
export class AccountSummaryDocumentModule { }
