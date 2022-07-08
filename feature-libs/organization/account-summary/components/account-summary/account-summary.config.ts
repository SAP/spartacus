import { AuthGuard, CmsConfig } from "@spartacus/core";
import { ROUTE_PARAMS } from "@spartacus/organization/administration/root";
import { AdminGuard } from "@spartacus/organization/administration/core";
import { AccountSummaryDocumentComponent } from "./details/account-summary-document/account-summary-document.component";
import { AccountSummaryListComponent } from "./list/account-summary-list.component";
import { AccountSummaryRoutePageMetaResolver } from "../services/account-summary-route-page-meta.resolver";


export const accountSummaryCmsConfig: CmsConfig = {
  cmsComponents: {
    AccountSummaryListComponent: {
      component: AccountSummaryListComponent,
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'accountSummary.breadcrumbs.list',
              resolver: AccountSummaryRoutePageMetaResolver, //TODO broken
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: AccountSummaryDocumentComponent,
            data: {
              cxPageMeta: {
                breadcrumb: 'accountSummary.breadcrumbs.details'
              },
            },
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};
