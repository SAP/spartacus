import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { MediaModule } from '../../../../shared/index';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { ReturnRequestService } from './return-request.service';
import { ReturnRequestOverviewComponent } from './return-request-overview/return-request-overview.component';
import { ReturnRequestItemsComponent } from './return-request-items/return-request-items.component';

const components = [
  ReturnRequestOverviewComponent,
  ReturnRequestItemsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'returnRequestDetails' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ReturnRequestOverviewComponent: {
          component: ReturnRequestOverviewComponent,
        },
        ReturnRequestItemsComponent: {
          component: ReturnRequestItemsComponent,
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    MediaModule,
  ],
  declarations: [...components],
  exports: [...components],
  entryComponents: [...components],
  providers: [ReturnRequestService],
})
export class OrderReturnRequestDetailModule {}
