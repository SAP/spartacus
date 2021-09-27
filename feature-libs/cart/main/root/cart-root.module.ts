import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { CART_CORE_FEATURE, CART_FEATURE } from './feature-name';

export function defaultCartComponentsConfig() {
  const config = {
    featureModules: {
      [CART_FEATURE]: {
        cmsComponents: [
          'WishListComponent',
          'ProductAddToCartComponent',
          'AddToWishListComponent',
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
  providers: [provideDefaultConfigFactory(defaultCartComponentsConfig)],
})
export class CartRootModule {}
