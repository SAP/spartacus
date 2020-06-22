import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { OrderApprovalDetailHeadlineComponent } from './order-approval-detail-headline.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalDetailHeadlineComponent: {
          component: OrderApprovalDetailHeadlineComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [OrderApprovalDetailHeadlineComponent],
  exports: [OrderApprovalDetailHeadlineComponent],
  entryComponents: [OrderApprovalDetailHeadlineComponent],
})
export class OrderApprovalDetailHeadlineModule {}
