import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule } from 'projects/storefrontlib/src/shared/index';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { OrderApprovalListComponent } from './order-approval-list.component';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild([
    //   {
    //     path: null,
    //     canActivate: [CmsPageGuard],
    //     component: PageLayoutComponent,
    //     data: { cxRoute: 'orderApprovalList' },
    //   },
    // ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderApprovalListComponent: {
          component: OrderApprovalListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
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
