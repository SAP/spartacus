import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { ReplenishmentOrderHistoryComponent } from './replenishment-order-history.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'replenishmentOrders' },
      },
    ]),
    RouterModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [ReplenishmentOrderHistoryComponent],
  exports: [ReplenishmentOrderHistoryComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountReplenishmentOrderHistoryComponent: {
          component: ReplenishmentOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  entryComponents: [ReplenishmentOrderHistoryComponent],
})
export class ReplenishmentOrderHistoryModule {}
