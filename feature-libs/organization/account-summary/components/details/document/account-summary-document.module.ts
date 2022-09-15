import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  PaginationModule,
  SortingModule,
} from '@spartacus/storefront';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { AccountSummaryDocumentFilterModule } from './filter';

export const accountSummaryDocumentCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountSummaryDocumentComponent: {
      component: AccountSummaryDocumentComponent,
    },
  },
};


@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    AccountSummaryDocumentFilterModule,
    CommonModule,
    I18nModule,
    SortingModule,
    PaginationModule,
    IconModule,
  ],
  providers: [provideDefaultConfig(accountSummaryDocumentCmsConfig)],
})
export class AccountSummaryDocumentModule {}
