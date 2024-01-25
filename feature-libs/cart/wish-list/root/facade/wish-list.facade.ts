/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CART_WISH_LIST_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: WishListFacade,
      feature: CART_WISH_LIST_CORE_FEATURE,
      methods: [
        'createWishList',
        'getWishList',
        'loadWishList',
        'addEntry',
        'removeEntry',
        'getWishListLoading',
      ],
      async: true,
    }),
})
export abstract class WishListFacade {
  abstract createWishList(
    userId: string,
    name?: string,
    description?: string
  ): void;

  abstract getWishList(): Observable<Cart>;

  abstract loadWishList(userId: string, customerId: string): void;

  abstract addEntry(productCode: string): void;

  abstract removeEntry(entry: OrderEntry): void;

  abstract getWishListLoading(): Observable<boolean>;
}
