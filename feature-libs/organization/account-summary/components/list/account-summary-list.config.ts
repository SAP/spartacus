/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthGuard, CmsConfig } from '@spartacus/core';
import { ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY } from '@spartacus/organization/account-summary/core';
import {
  ItemService,
  ListService,
  OrganizationTableType,
  ToggleLinkCellComponent,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { AccountSummaryDocumentComponent } from '../details/document/account-summary-document.component';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { AccountSummaryItemService } from '../services/account-summary-item.service';
import { AccountSummaryUnitListService } from '../services/account-summary-unit-list.service';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';

export const ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY =
  'orgAccountSummaryList.breadcrumbs.details';

export function accountSummaryUnitsTableConfigFactory(): TableConfig {
  return {
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
}

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
              breadcrumb: ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY,
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: AccountSummaryDocumentComponent,
            data: {
              cxPageMeta: {
                breadcrumb: ACCOUNT_SUMMARY_DETAILS_TRANSLATION_KEY,
              },
            },
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};
