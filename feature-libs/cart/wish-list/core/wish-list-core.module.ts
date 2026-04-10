/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  UserWishlistAdapter,
  UserWishlistConnector,
} from '@spartacus/user/wishlist/core';
import {
  OccUserWishlistAdapter,
  defaultOccUserWishlistConfig,
} from '@spartacus/user/wishlist/occ';
import { facadeProviders } from './facade/facade-providers';
import { WishListStoreModule } from './store/wish-list-store.module';

@NgModule({
  imports: [WishListStoreModule],
  providers: [
    ...facadeProviders,
    UserWishlistConnector,
    { provide: UserWishlistAdapter, useClass: OccUserWishlistAdapter },
    provideDefaultConfig(defaultOccUserWishlistConfig),
  ],
})
export class WishListCoreModule {}
