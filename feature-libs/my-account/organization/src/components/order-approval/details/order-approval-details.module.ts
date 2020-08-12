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
import { OrderApprovalDetailFormComponent } from './order-approval-detail-form/order-approval-detail-form.component';
import { OrderApprovalDetailService } from './order-approval-detail.service';
import {
  CmsPageGuard,
  PageLayoutComponent,
  FormErrorsModule,
  SpinnerModule,
  CartSharedModule,
  OrderDetailApprovalDetailsComponent,
  OrderDetailHeadlineComponent,
  OrderDetailItemsComponent,
  OrderDetailShippingComponent,
  OrderDetailsService,
  OrderDetailTotalsComponent,
} from '@spartacus/storefront';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CartSharedModule,
    CommonModule,
    I18nModule,
    UrlModule,
    FormErrorsModule,
    SpinnerModule,
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
        OrderApprovalDetailHeadlineComponent: {
          component: OrderDetailHeadlineComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard],
        },
        OrderApprovalDetailTotalsComponent: {
          component: OrderDetailTotalsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard],
        },
        OrderApprovalDetailApprovalDetailsComponent: {
          component: OrderDetailApprovalDetailsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard],
        },
        OrderApprovalDetailShippingComponent: {
          component: OrderDetailShippingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard],
        },
        OrderApprovalDetailItemsComponent: {
          component: OrderDetailItemsComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: OrderApprovalDetailService,
            },
          ],
          guards: [AuthGuard],
        },
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
export class OrderApprovalDetailsModule {}
