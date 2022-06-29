import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, provideDefaultConfigFactory, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ListModule } from 'feature-libs/organization/administration/components/shared/list/list.module';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { accountSummaryListCmsConfig, unitsTableConfigFactory } from './account-summary-list.config';

@NgModule({
  imports: [CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    ListModule,],
  providers: [
    provideDefaultConfig(accountSummaryListCmsConfig),
    provideDefaultConfigFactory(unitsTableConfigFactory)
  ],
  declarations: [AccountSummaryListComponent],
  exports: [AccountSummaryListComponent],


})
export class AccountSummaryListModule { }


