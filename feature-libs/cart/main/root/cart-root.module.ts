import { NgModule } from '@angular/core';
import { HttpErrorHandler, provideDefaultConfigFactory } from '@spartacus/core';
import { CART_CORE_FEATURE, CART_FEATURE } from './feature-name';
import { BadCartRequestHandler } from './http-interceptors/handlers/bad-cart-request.handler';

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
  providers: [
    provideDefaultConfigFactory(defaultCartComponentsConfig),
    {
      provide: HttpErrorHandler,
      useExisting: BadCartRequestHandler,
      multi: true,
    },
  ],
})
export class CartRootModule {}
