import { NgModule } from '@angular/core';
import { CART_FEATURE } from '@spartacus/cart/main/root';
import { CART_SAVED_CART_FEATURE } from '@spartacus/cart/saved-cart/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import {
  CART_WISH_LIST_CORE_FEATURE,
  CART_WISH_LIST_FEATURE,
} from './feature-name';

export function defaultCartWishListComponentsConfig() {
  const config = {
    featureModules: {
      [CART_WISH_LIST_FEATURE]: {
        cmsComponents: ['WishListComponent', 'AddToWishListComponent'],
        dependencies: [CART_SAVED_CART_FEATURE, CART_FEATURE],
      },
      // by default core is bundled together with components
      [CART_WISH_LIST_CORE_FEATURE]: CART_WISH_LIST_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [provideDefaultConfigFactory(defaultCartWishListComponentsConfig)],
})
export class WishListRootModule {}
