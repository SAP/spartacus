import { NgModule } from '@angular/core';
import {
  cartTranslationChunksConfig,
  cartTranslations,
} from '@spartacus/cart/main/assets';
import { CartRootModule, CART_FEATURE } from '@spartacus/cart/main/root';
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
        /*[MINI_CART]: {
          module: () =>
            import('@spartacus/cart/main/components/cart/mini-cart').then(
              (m) => m.MiniCartModule
            ),
        },*/
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
