import { OrganizationTableType } from "@spartacus/organization/administration/components";
import { BREAKPOINT, TableConfig, TableLayout } from "@spartacus/storefront";
import { AccountSummaryCellLinkComponent } from "../cell-link";

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
            dataComponent: AccountSummaryCellLinkComponent,
          }
        },
      },
      [BREAKPOINT.lg]: {
        cells: ['name'],
      },
    },
  },
};
