/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { WishListModule } from './wish-list.module';
import { WishListV2Module } from './wish-list-v2.module';

/**
 * Convenience NgModule that combines WishListModule (components + V1 core)
 * with WishListV2Module (new /wishlists API override).
 *
 * Use this as the single lazy-loaded entry point when the backend supports
 * the dedicated Wishlist OCC API. WishListV2Module is imported after
 * WishListModule so its WishListFacade provider correctly overrides the V1
 * provider registered in WishListCoreModule.
 *
 * @example
 * // wish-list-feature.module.ts
 * featureModules: {
 *   [CART_WISH_LIST_FEATURE]: {
 *     module: () =>
 *       import('@spartacus/cart/wish-list').then((m) => m.WishListWithV2Module),
 *   },
 * }
 */
@NgModule({
  imports: [WishListModule, WishListV2Module],
})
export class WishListWithV2Module {}
