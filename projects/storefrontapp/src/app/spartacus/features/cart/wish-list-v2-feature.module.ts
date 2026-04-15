/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  wishListTranslationChunksConfig,
  wishListTranslationsDe,
  wishListTranslationsEn,
  wishListTranslationsJa,
  wishListTranslationsZh,
} from '@spartacus/cart/wish-list/assets';
import {
  ADD_TO_WISHLIST_FEATURE,
  CART_WISH_LIST_FEATURE,
  WishListRootModule,
} from '@spartacus/cart/wish-list/root';
import { I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  imports: [WishListRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_WISH_LIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list').then(
              (m) => m.WishListWithV2Module
            ),
        },
        [ADD_TO_WISHLIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list/components/add-to-wishlist').then(
              (m) => m.AddToWishListModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: wishListTranslationsEn,
          ja: wishListTranslationsJa,
          de: wishListTranslationsDe,
          zh: wishListTranslationsZh,
        },
        chunks: wishListTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class WishListV2FeatureModule {}
