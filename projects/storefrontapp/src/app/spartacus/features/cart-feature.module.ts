import { NgModule } from '@angular/core';
import {
  cartTranslationChunksConfig,
  cartTranslations,
} from '@spartacus/cart/main/assets';
import { CartRootModule, CART_FEATURE } from '@spartacus/cart/main/root';
import {
  wishListTranslationChunksConfig,
  wishListTranslations,
} from '@spartacus/cart/wish-list/assets';
import {
  CART_WISH_LIST_FEATURE,
  WishListRootModule,
} from '@spartacus/cart/wish-list/root';
import { I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CartRootModule, WishListRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/main').then((m) => m.CartModule),
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
    provideConfig({
      featureModules: {
        [CART_WISH_LIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list').then((m) => m.WishListModule),
          dependencies: [CART_FEATURE],
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: wishListTranslations,
        chunks: wishListTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class CartFeatureModule {}
