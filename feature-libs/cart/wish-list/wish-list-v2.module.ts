/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { provideDefaultConfig } from '@spartacus/core';
import {
  UserWishlistAdapter,
  UserWishlistConnector,
} from '@spartacus/user/wishlist/core';
import {
  OccUserWishlistAdapter,
  defaultOccUserWishlistConfig,
} from '@spartacus/user/wishlist/occ';
import { WishListV2Service } from './core/facade/wish-list-v2.service';

/**
 * Optional NgModule that switches the Wish List feature to use the new dedicated
 * Wishlist OCC API (`/wishlists`) instead of the SavedCart-based API.
 *
 * Import this module in your application when the `wishlistV2` API is available
 * on the backend. It overrides `WishListFacade` with `WishListV2Service` and
 * registers the required connector and OCC adapter.
 *
 * When this module is NOT imported, the standard V1 SavedCart-based Wish List
 * implementation remains active and no V2 code is bundled.
 *
 * @example
 * // app.module.ts
 * imports: [WishListModule, WishListV2Module]
 */
@NgModule({
  providers: [
    WishListV2Service,
    {
      provide: WishListFacade,
      useExisting: WishListV2Service,
    },
    UserWishlistConnector,
    {
      provide: UserWishlistAdapter,
      useClass: OccUserWishlistAdapter,
    },
    provideDefaultConfig(defaultOccUserWishlistConfig),
  ],
})
export class WishListV2Module {}
