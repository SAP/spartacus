import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, CmsConfig, ConfigModule } from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
} from 'projects/storefrontlib/src/cms-structure';
import { OrderApprovalDetailFormComponent } from './order-approval-detail-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderApprovalDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalDetailFormComponent: {
          component: OrderApprovalDetailFormComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [OrderApprovalDetailFormComponent],
  exports: [OrderApprovalDetailFormComponent],
  entryComponents: [OrderApprovalDetailFormComponent],
})
export class OrderApprovalDetailFormModule {}
