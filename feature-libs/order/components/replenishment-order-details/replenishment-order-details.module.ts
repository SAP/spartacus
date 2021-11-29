import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  ListNavigationModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { ReplenishmentOrderCancellationDialogModule } from '../replenishment-order-cancellation-dialog/replenishment-order-cancellation-dialog.module';
import { defaultReplenishmentOrderCancellationLayoutConfig } from './default-replenishment-order-cancellation-layout.config';
import { ReplenishmentOrderCancellationComponent } from './replenishment-order-cancellation/replenishment-order-cancellation.component';

const moduleComponents = [ReplenishmentOrderCancellationComponent];

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    I18nModule,
    PromotionsModule,
    UrlModule,
    ReplenishmentOrderCancellationDialogModule,
    SpinnerModule,
    ListNavigationModule,
    RouterModule,
  ],
  providers: [
    provideConfig(defaultReplenishmentOrderCancellationLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReplenishmentDetailActionsComponent: {
          component: ReplenishmentOrderCancellationComponent,
        },
        ReplenishmentDetailOrderHistoryComponent: {
          component: OrderHistoryComponent,
        },
      },
    }),
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
})
export class ReplenishmentOrderDetailsModule {}
