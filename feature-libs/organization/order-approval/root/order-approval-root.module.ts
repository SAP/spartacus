import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ORGANIZATION_ORDER_APPROVAL_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationOrderApprovalComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_ORDER_APPROVAL_FEATURE]: {
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
  };

  return config;
}

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
    provideDefaultConfigFactory(
      defaultOrganizationOrderApprovalComponentsConfig
    ),
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
