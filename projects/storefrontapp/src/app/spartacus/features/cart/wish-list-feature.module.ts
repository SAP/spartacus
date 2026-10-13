/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  wishListTranslationChunksConfig,
  wishListTranslationsEn,
  wishListTranslationsJa,
  wishListTranslationsDe,
  wishListTranslationsZh,
} from '@spartacus/cart/wish-list/assets';
import {
  ADD_TO_WISHLIST_FEATURE,
  CART_WISH_LIST_FEATURE,
  WishListRootModule,
} from '@spartacus/cart/wish-list/root';
import { I18nConfig, provideConfig } from '@spartacus/core';

/**
 * Wish List feature module using the legacy SavedCart-based API (V1).
 *
 * For new installations, use WishListV2FeatureModule instead, which uses the
 * dedicated Wishlist OCC API (/wishlists) available since SAP Commerce Cloud
 * 2211-jdk21.9. This module is retained for existing customers who have not
 * yet migrated.
 *
 * @see https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/f33ee8045a28487f87bddcef9b56557a.html
 */
@NgModule({
  imports: [WishListRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_WISH_LIST_FEATURE]: {
          module: () =>
            import('@spartacus/cart/wish-list').then((m) => m.WishListModule),
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
export class WishListFeatureModule {}
