/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import {
  ADD_TO_WISHLIST_FEATURE,
  CART_WISH_LIST_CORE_FEATURE,
  CART_WISH_LIST_FEATURE,
} from './feature-name';

export function defaultCartWishListComponentsConfig() {
  const config = {
    featureModules: {
      [CART_WISH_LIST_FEATURE]: {
        cmsComponents: ['WishListComponent'],
        dependencies: [CART_BASE_FEATURE],
      },
      [ADD_TO_WISHLIST_FEATURE]: {
        cmsComponents: ['AddToWishListComponent'],
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
