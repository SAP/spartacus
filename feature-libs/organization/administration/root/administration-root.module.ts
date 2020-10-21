import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  provideDefaultConfig,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderApprovalDetails' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(defaultOrganizationLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        organizationAdministration: {
          cmsComponents: [
            'ManageBudgetsListComponent',
            'ManageCostCentersListComponent',
            'ManagePermissionsListComponent',
            'ManageUnitsListComponent',
            'ManageUsersListComponent',
            'ManageUserGroupsListComponent',
            'OrderApprovalListComponent',
            'OrderApprovalDetailTotalsComponent',
            'OrderApprovalDetailApprovalDetailsComponent',
            'OrderApprovalDetailShippingComponent',
            'OrderApprovalDetailItemsComponent',
            'OrderApprovalDetailFormComponent',
          ],
        },
      },
    }),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          orderApprovalDetails: {
            paths: ['my-account/approval/:approvalCode'],
            paramsMapping: { approvalCode: 'approvalCode' },
          },
        },
      },
    }),
  ],
})
export class AdministrationRootModule {}
