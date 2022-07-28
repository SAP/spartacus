import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { accountSummaryDocumentCmsConfig } from './account-summary-document.config';
import { ListNavigationModule } from '@spartacus/storefront';

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    ListNavigationModule,
    UrlModule
  ],
  providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
})
export class AccountSummaryDocumentModule {}
