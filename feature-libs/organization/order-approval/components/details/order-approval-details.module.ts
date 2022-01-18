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
import {
  CartSharedModule,
  FormErrorsModule,
  OrderDetailItemsComponent,
  OrderDetailShippingComponent,
  OrderDetailsService,
  OrderDetailTotalsComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { ApproverGuard } from '../../core/guards/approver.guard';
import { OrderApprovalDetailFormComponent } from './order-approval-detail-form/order-approval-detail-form.component';
import { OrderApprovalDetailService } from './order-approval-detail.service';
import { OrderDetailPermissionResultsComponent } from './order-detail-permission-results/order-detail-permission-results.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CartSharedModule,
    CommonModule,
    I18nModule,
    UrlModule,
    FormErrorsModule,
    SpinnerModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalDetailTotalsComponent: {
          component: OrderDetailTotalsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard, ApproverGuard],
        },
        OrderApprovalDetailApprovalDetailsComponent: {
          component: OrderDetailPermissionResultsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard, ApproverGuard],
        },
        AccountOrderDetailsApprovalDetailsComponent: {
          component: OrderDetailPermissionResultsComponent,
        },

        OrderApprovalDetailShippingComponent: {
          component: OrderDetailShippingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard, ApproverGuard],
        },
        OrderApprovalDetailItemsComponent: {
          component: OrderDetailItemsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard, ApproverGuard],
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
