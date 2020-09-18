import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';

import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { ReplenishmentOrderHistoryComponent } from './replenishment-order-history.component';
import { defaultReplenishmentOrderCancellationLayoutConfig } from '../replenishment-order-details/default-replenishment-order-cancellation-layout.config';

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
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [ReplenishmentOrderHistoryComponent],
  exports: [ReplenishmentOrderHistoryComponent],
  providers: [
    provideConfig(defaultReplenishmentOrderCancellationLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountReplenishmentHistoryComponent: {
          component: ReplenishmentOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  entryComponents: [ReplenishmentOrderHistoryComponent],
})
export class ReplenishmentOrderHistoryModule {}
