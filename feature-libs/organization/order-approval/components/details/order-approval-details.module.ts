import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { ApproverGuard } from '../../core/guards/approver.guard';
import { OrderApprovalDetailFormComponent } from './order-approval-detail-form/order-approval-detail-form.component';
import { OrderDetailPermissionResultsComponent } from './order-detail-permission-results/order-detail-permission-results.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    UrlModule,
    FormErrorsModule,
    SpinnerModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalDetailApprovalDetailsComponent: {
          component: OrderDetailPermissionResultsComponent,
          guards: [AuthGuard, ApproverGuard],
        },
        AccountOrderDetailsApprovalDetailsComponent: {
          component: OrderDetailPermissionResultsComponent,
        },
        OrderApprovalDetailFormComponent: {
          component: OrderApprovalDetailFormComponent,
          guards: [AuthGuard, ApproverGuard],
        },
      },
    }),
  ],
  declarations: [
    OrderApprovalDetailFormComponent,
    OrderDetailPermissionResultsComponent,
  ],
  exports: [
    OrderApprovalDetailFormComponent,
    OrderDetailPermissionResultsComponent,
  ],
})
export class OrderApprovalDetailsModule {}
