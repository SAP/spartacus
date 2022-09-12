/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  wishListTranslationChunksConfig,
  wishListTranslations,
} from '@commerce-storefront-toolset/cart/wish-list/assets';
import {
  ADD_TO_WISHLIST_FEATURE,
  CART_WISH_LIST_FEATURE,
  WishListRootModule,
} from '@commerce-storefront-toolset/cart/wish-list/root';
import { I18nConfig, provideConfig } from '@commerce-storefront-toolset/core';

@NgModule({
  imports: [WishListRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_WISH_LIST_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/cart/wish-list').then((m) => m.WishListModule),
        },
        [ADD_TO_WISHLIST_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/cart/wish-list/components/add-to-wishlist').then(
              (m) => m.AddToWishListModule
            ),
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
export class WishListFeatureModule {}
