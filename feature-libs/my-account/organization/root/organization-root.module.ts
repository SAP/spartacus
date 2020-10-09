import { NgModule } from '@angular/core';
import { AuthGuard, provideDefaultConfig } from '@spartacus/core';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
import { RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

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
        organization: {
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
  ],
})
export class OrganizationRootModule {}
