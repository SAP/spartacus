import { NgModule } from '@angular/core';
import {
  cartTranslationChunksConfig,
  cartTranslations,
} from '@spartacus/cart/main/assets';
import {
  ADD_TO_CART,
  CartRootModule,
  CART_FEATURE,
  MINI_CART,
} from '@spartacus/cart/main/root';
import { I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CartRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/main').then((m) => m.CartModule),
        },
        [MINI_CART]: {
          module: () =>
            import('@spartacus/cart/main/components/cart/mini-cart').then(
              (m) => m.MiniCartModule
            ),
        },
        [ADD_TO_CART]: {
          module: () =>
            import('@spartacus/cart/main/components/cart/add-to-cart').then(
              (m) => m.AddToCartModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: cartTranslations,
        chunks: cartTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartFeatureModule {}
