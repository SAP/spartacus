import { AuthGuard, CmsConfig } from '@spartacus/core';
import {
  ItemService,
  ListService,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { AccountSummaryDocumentComponent } from '../details/document/account-summary-document.component';
import { AccountSummaryListComponent } from './account-summary-list.component';
import { AccountSummaryItemService } from '../services/account-summary-item.service';
import { AccountSummaryUnitListService } from '../services/account-summary-unit-list.service';

export const accountSummaryCmsConfig: CmsConfig = {
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
