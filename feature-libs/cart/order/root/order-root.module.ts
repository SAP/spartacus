import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultOrderRoutingConfig } from './config/default-order-routing-config';
import { CART_ORDER_CORE_FEATURE, CART_ORDER_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultCartOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CART_ORDER_FEATURE]: {
        cmsComponents: [
          'CancelOrderComponent',
          'CancelOrderConfirmationComponent',
          'ReturnOrderComponent',
          'ReturnOrderConfirmationComponent',
          'AccountOrderDetailsActionsComponent',
          'AccountOrderDetailsItemsComponent',
          'AccountOrderDetailsTotalsComponent',
          'AccountOrderDetailsShippingComponent',
          'AccountOrderHistoryComponent',
          'ReplenishmentDetailItemsComponent',
          'ReplenishmentDetailTotalsComponent',
          'ReplenishmentDetailShippingComponent',
          'ReplenishmentDetailActionsComponent',
          'ReplenishmentDetailOrderHistoryComponent',
          'AccountReplenishmentHistoryComponent',
          'ReturnRequestOverviewComponent',
          'ReturnRequestItemsComponent',
          'ReturnRequestTotalsComponent',
          'OrderReturnRequestListComponent',
        ],
      },
      // by default core is bundled together with components
      [CART_ORDER_CORE_FEATURE]: CART_ORDER_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultCartOrderComponentsConfig),
    provideDefaultConfig(defaultOrderRoutingConfig),
  ],
})
export class OrderRootModule {}
