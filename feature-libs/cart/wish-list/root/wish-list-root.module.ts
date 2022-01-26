import { NgModule } from '@angular/core';
import { CART_FEATURE } from '@spartacus/cart/main/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import {
  ADD_TO_WISHLIST,
  CART_WISH_LIST_CORE_FEATURE,
  CART_WISH_LIST_FEATURE,
} from './feature-name';

export function defaultCartWishListComponentsConfig() {
  const config = {
    featureModules: {
      [CART_WISH_LIST_FEATURE]: {
        cmsComponents: ['WishListComponent'],
        dependencies: [CART_FEATURE],
      },
      [ADD_TO_WISHLIST]: {
        cmsComponents: ['AddToWishListComponent'],
        module: () =>
          import('@spartacus/cart/wish-list/components/add-to-wishlist').then(
            (m) => m.AddToWishListModule
          ),
      },
      // by default core is bundled together with components
      [CART_WISH_LIST_CORE_FEATURE]: CART_WISH_LIST_FEATURE,
    },
  };
  return config;
}

@NgModule({
  providers: [provideDefaultConfigFactory(defaultCartWishListComponentsConfig)],
})
export class WishListRootModule {}
