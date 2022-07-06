import { AuthGuard, CmsConfig } from "@spartacus/core";
import { OrganizationTableType } from "@spartacus/organization/administration/components";
import { ROUTE_PARAMS } from "@spartacus/organization/administration/root";
import { BREAKPOINT, TableConfig, TableLayout } from "@spartacus/storefront";
import { AdminGuard } from "@spartacus/organization/administration/core";
import { AccountSummaryCellLinkComponent } from "../cell-link/account-summary-cell-link.component";
import { AccountSummaryDocumentComponent } from "../details/account-summary-document/account-summary-document.component";
import { AccountSummaryListComponent } from "./account-summary-list.component";


export const accountSummaryListCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountSummaryListComponent: {
      component: AccountSummaryListComponent,
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgAccountSummary.breadcrumbs.list',
              // resolver: UnitRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: AccountSummaryDocumentComponent,
            data: {
              cxPageMeta: {
                breadcrumb: 'orgAccountSummary.breadcrumbs.details',
              },
            },
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function unitsTableConfigFactory(): TableConfig {
  return unitsTableConfig;
}

export const unitsTableConfig: TableConfig = {
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
