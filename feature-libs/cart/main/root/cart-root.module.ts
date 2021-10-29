import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultCartRoutingConfig } from './config/default-cart-routing-config';
import { CART_CORE_FEATURE, CART_FEATURE } from './feature-name';

export function defaultCartComponentsConfig() {
  const config = {
    featureModules: {
      [CART_FEATURE]: {
        cmsComponents: [
          'ProductAddToCartComponent',
          'CartApplyCouponComponent',
          'CartComponent',
          'CartTotalsComponent',
          'MiniCartComponent',
          'SaveForLaterComponent',
        ],
      },
      // by default core is bundled together with components
      [CART_CORE_FEATURE]: CART_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultCartComponentsConfig),
    provideDefaultConfig(defaultCartRoutingConfig),
  ],
})
export class CartRootModule {}
