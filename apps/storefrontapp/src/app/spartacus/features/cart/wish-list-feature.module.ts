import { NgModule } from '@angular/core';
import {
  wishListTranslationChunksConfig,
  wishListTranslationsEn,
} from '@spartacus/cart/wish-list/assets';
import {
  ADD_TO_WISHLIST_FEATURE,
  CART_WISH_LIST_FEATURE,
  WishListRootModule,
} from '@spartacus/cart/wish-list/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [WishListRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CART_WISH_LIST_FEATURE]: {
          module: () => import('@spartacus/cart/wish-list').then((m) => m.WishListModule),
        },
      },
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [ADD_TO_WISHLIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list/components/add-to-wishlist').then(
              (m) => m.AddToWishListModule,
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: wishListTranslationsEn },
        chunks: wishListTranslationChunksConfig,
      },
    }),
  ],
})
export class WishListFeatureModule {}
