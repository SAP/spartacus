import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { MediaModule } from '../../../../shared/index';
import { ReturnRequestItemsComponent } from './return-request-items/return-request-items.component';
import { ReturnRequestOverviewComponent } from './return-request-overview/return-request-overview.component';
import { ReturnRequestTotalsComponent } from './return-request-totals/return-request-totals.component';

const components = [
  ReturnRequestOverviewComponent,
  ReturnRequestItemsComponent,
  ReturnRequestTotalsComponent,
];

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
    RouterModule,
    UrlModule,
    I18nModule,
    MediaModule,
    FeaturesConfigModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturnRequestOverviewComponent: {
          component: ReturnRequestOverviewComponent,
        },
        ReturnRequestItemsComponent: {
          component: ReturnRequestItemsComponent,
        },
        ReturnRequestTotalsComponent: {
          component: ReturnRequestTotalsComponent,
        },
      },
    }),
  ],
  declarations: [...components],
  exports: [...components],
})
export class ReturnRequestDetailModule {}
