import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { AccountSummaryHeaderComponent } from './account-summary-header.component';

export const accountSummaryHeaderCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountSummaryHeaderComponent: {
      component: AccountSummaryHeaderComponent,
    },
  },
};

@NgModule({
  declarations: [AccountSummaryHeaderComponent],
  imports: [CardModule, CommonModule, I18nModule],
  providers: [provideDefaultConfig(accountSummaryHeaderCmsConfig)],
})
export class AccountSummaryHeaderModule {}
