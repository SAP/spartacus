import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { OrderApprovalListComponent } from './order-approval-list.component';
import { ListNavigationModule } from '@spartacus/storefront';

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
    ListNavigationModule,
    I18nModule,
  ],
  declarations: [OrderApprovalListComponent],
  exports: [OrderApprovalListComponent],
  entryComponents: [OrderApprovalListComponent],
})
export class OrderApprovalListModule {}
