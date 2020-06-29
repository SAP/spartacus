import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import {
  OrderDetailApprovalDetailsComponent,
  OrderDetailHeadlineComponent,
  OrderDetailItemsComponent,
  OrderDetailShippingComponent,
  OrderDetailsService,
  OrderDetailTotalsComponent,
} from '../../../myaccount/order/order-details/index';
import { OrderApprovalDetailService } from './order-approval-detail.service';

const moduleComponents = [];

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    I18nModule,
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
        // OrderApprovalDetailFormComponent: {
        //   component: OrderApprovalDetailFormComponent,
        //   guards: [AuthGuard],
        // },
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
      },
    }),
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  entryComponents: [...moduleComponents],
})
export class OrderApprovalDetailsModule {}
