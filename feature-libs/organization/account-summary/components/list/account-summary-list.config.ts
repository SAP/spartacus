import { AuthGuard, CmsConfig } from '@spartacus/core';
import {
  ItemService,
  ListService,
  ToggleLinkCellComponent,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { AccountSummaryDocumentComponent } from '../details/document/account-summary-document.component';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { AccountSummaryItemService } from '../services/account-summary-item.service';
import { AccountSummaryUnitListService } from '../services/account-summary-unit-list.service';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';
import { OrganizationTableType } from '../services/organization.table.type';

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

export const accountSummaryListCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageAccountSummaryListComponent: {
      component: AccountSummaryListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: AccountSummaryUnitListService,
        },
        {
          provide: ItemService,
          useExisting: AccountSummaryItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgAccountSummaryList.breadcrumbs.list',
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: AccountSummaryDocumentComponent,
            data: {
              cxPageMeta: {
                breadcrumb: 'orgAccountSummaryList.breadcrumbs.details',
              },
            },
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};
