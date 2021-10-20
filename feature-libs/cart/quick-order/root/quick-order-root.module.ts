import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { defaultQuickOrderConfig } from './config/default-quick-order.config';
import {
  CART_QUICK_ORDER_CORE_FEATURE,
  CART_QUICK_ORDER_FEATURE,
} from './feature-name';

export function defaultQuickOrderComponentsConfig() {
  const config = {
    featureModules: {
      [CART_QUICK_ORDER_FEATURE]: {
        cmsComponents: ['QuickOrderComponent', 'CartQuickOrderFormComponent'],
      },
      // by default core is bundled together with components
      [CART_QUICK_ORDER_CORE_FEATURE]: CART_QUICK_ORDER_FEATURE,
    },
  };
  return config;
}

export const defaultQuickOrderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quickOrder: {
        paths: ['my-account/quick-order'],
      },
    },
  },
};

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
    provideDefaultConfig(defaultQuickOrderRoutingConfig),
    provideDefaultConfig(defaultQuickOrderConfig),
  ],
})
export class QuickOrderRootModule {}
