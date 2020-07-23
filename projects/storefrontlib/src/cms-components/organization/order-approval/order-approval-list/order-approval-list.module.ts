import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/index';
import { OrderApprovalListComponent } from './order-approval-list.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalListComponent: {
          component: OrderApprovalListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    RouterModule,
    ListNavigationModule,
    I18nModule,
  ],
  declarations: [OrderApprovalListComponent],
  exports: [OrderApprovalListComponent],
  providers: [CxDatePipe],
  entryComponents: [OrderApprovalListComponent],
})
export class OrderApprovalListModule {}
