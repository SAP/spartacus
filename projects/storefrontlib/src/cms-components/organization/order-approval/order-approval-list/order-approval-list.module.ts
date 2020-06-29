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
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { OrderApprovalListComponent } from './order-approval-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderApprovals' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageOrderApprovalsComponent: {
          component: OrderApprovalListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [OrderApprovalListComponent],
  exports: [OrderApprovalListComponent],
  providers: [CxDatePipe],
  entryComponents: [OrderApprovalListComponent],
})
export class OrderApprovalListModule {}
