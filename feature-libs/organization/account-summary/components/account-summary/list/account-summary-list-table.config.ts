import { OrganizationTableType, ToggleLinkCellComponent } from '@spartacus/organization/administration/components';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';

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
            dataComponent: ToggleLinkCellComponent
          },
        },
      },
      [BREAKPOINT.lg]: {
        cells: ['name'],
      },
    },
  },
};
