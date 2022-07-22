import { AuthGuard, CmsConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { AccountSummaryListComponent } from './list/account-summary-list.component';
import { AccountSummaryDocumentComponent } from './details/document';

export const accountSummaryCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageAccountSummaryListComponent: {
      component: AccountSummaryListComponent,
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'accountSummary.breadcrumbs.list',
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: AccountSummaryDocumentComponent,
            data: {
              cxPageMeta: {
                breadcrumb: 'accountSummary.breadcrumbs.details',
              },
            },
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};
