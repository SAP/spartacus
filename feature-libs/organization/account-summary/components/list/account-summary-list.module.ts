import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ListModule } from '@spartacus/organization/administration/components';
import { AccountSummaryListComponent } from './account-summary-list.component';
import {
  accountSummaryListCmsConfig,
  accountSummaryUnitsTableConfigFactory,
} from './account-summary-list.config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    ListModule,
  ],
  providers: [
    provideDefaultConfig(accountSummaryListCmsConfig),
    provideDefaultConfigFactory(accountSummaryUnitsTableConfigFactory),
  ],
  declarations: [AccountSummaryListComponent],
  exports: [AccountSummaryListComponent],
})
export class AccountSummaryListModule {}
