import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  provideDefaultConfig,
  RoutingConfig,
} from '@spartacus/core';
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
    provideDefaultConfig({
      featureModules: {
        organizationOrderApproval: {
          cmsComponents: [
            'OrderApprovalListComponent',
            'OrderApprovalDetailTotalsComponent',
            'OrderApprovalDetailApprovalDetailsComponent',
            'OrderApprovalDetailShippingComponent',
            'OrderApprovalDetailItemsComponent',
            'OrderApprovalDetailFormComponent',
            'AccountOrderDetailsApprovalDetailsComponent',
          ],
        },
      },
    }),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          orderApprovals: {
            paths: ['my-account/approval-dashboard'],
          },
          orderApprovalDetails: {
            paths: ['my-account/approval/:approvalCode'],
            paramsMapping: { approvalCode: 'approvalCode' },
          },
        },
      },
    }),
  ],
})
export class OrderApprovalRootModule {}
