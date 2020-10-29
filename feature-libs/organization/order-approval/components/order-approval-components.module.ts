import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  provideDefaultConfig,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { OrderApprovalListModule } from './list/order-approval-list.module';
import { OrderApprovalDetailsModule } from './details/order-approval-details.module';

@NgModule({
  imports: [
    RouterModule,
    OrderApprovalListModule,
    OrderApprovalDetailsModule,
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
export class OrderApprovalComponentsModule {}
