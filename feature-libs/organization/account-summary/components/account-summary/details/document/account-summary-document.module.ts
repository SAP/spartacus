import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { IconModule, ListNavigationModule } from '@spartacus/storefront';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { accountSummaryDocumentCmsConfig } from './account-summary-document.config';
import { AccountSummaryDocumentFilterModule } from './filter';

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    AccountSummaryDocumentFilterModule,
    CommonModule,
    RouterModule,
    I18nModule,
    ListNavigationModule,
    UrlModule,
    IconModule,
  ],
  providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
})
export class AccountSummaryDocumentModule { }
