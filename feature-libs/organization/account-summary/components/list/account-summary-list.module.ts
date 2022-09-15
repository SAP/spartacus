import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import {
  BREAKPOINT,
  IconModule,
  TableConfig,
  TableLayout,
} from '@spartacus/storefront';
import {
  ListModule,
  ToggleLinkCellComponent,
} from '@spartacus/organization/administration/components';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { OrganizationTableType } from '../services/organization.table.type';
import { accountSummaryCmsConfig } from './account-summary.config';

export function accountSummaryUnitsTableConfigFactory(): TableConfig {
  return accountSummaryUnitsTableConfig;
}

export const accountSummaryUnitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.ACCOUNT_SUMMARY_UNIT]: {
      cells: ['name'],
      options: {
        layout: TableLayout.VERTICAL,
        cells: {
          name: {
            dataComponent: ToggleLinkCellComponent,
          },
        },
      },
      [BREAKPOINT.lg]: {
        cells: ['name'],
      },
    },
  },
};

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
    provideDefaultConfig(accountSummaryCmsConfig),
    provideDefaultConfigFactory(accountSummaryUnitsTableConfigFactory),
  ],
  declarations: [AccountSummaryListComponent],
  exports: [AccountSummaryListComponent],
})
export class AccountSummaryListModule {}
