import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CartSharedModule } from '../../../../cart/cart-shared/cart-shared.module';
import { OrderApprovalDetailTotalsComponent } from './order-approval-detail-totals.component';

@NgModule({
  imports: [
    CartSharedModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalDetailTotalsComponent: {
          component: OrderApprovalDetailTotalsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [OrderApprovalDetailTotalsComponent],
  exports: [OrderApprovalDetailTotalsComponent],
  entryComponents: [OrderApprovalDetailTotalsComponent],
})
export class OrderApprovalDetailTotalsModule {}
