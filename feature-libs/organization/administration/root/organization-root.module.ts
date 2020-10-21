import { NgModule } from '@angular/core';
import {
  //AuthGuard,
  provideDefaultConfig,
  //RoutingConfig,
} from '@spartacus/core';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
//import { RouterModule } from '@angular/router';
//import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';


// #9423
@NgModule({
  imports: [
    /*RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderApprovalDetails' },
      },
    ]),*/
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
          ],
        },
      },
    }),
    /*provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          orderApprovalDetails: {
            paths: ['my-account/approval/:approvalCode'],
            paramsMapping: { approvalCode: 'approvalCode' },
          },
        },
      },
    }),*/
  ],
})
export class OrganizationRootModule {}
