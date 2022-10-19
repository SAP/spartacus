/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, CART_NORMALIZER } from '@spartacus/cart/base/root';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';
import { ConverterService, Occ, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable()
export class OccSavedCartAdapter implements SavedCartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .get<Occ.Cart>(this.getSavedCartEndpoint(userId, cartId))
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

  loadList(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(this.getSavedCartListEndpoint(userId))
      .pipe(
        pluck('carts'),
        map((carts) => carts ?? []),
        this.converter.pipeableMany(CART_NORMALIZER)
      );
  }

  restoreSavedCart(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .patch<Occ.Cart>(this.getRestoreSavedCartEndpoint(userId, cartId), cartId)
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

  cloneSavedCart(
    userId: string,
    cartId: string,
    saveCartName: string
  ): Observable<Cart> {
    return this.http
      .post<Occ.Cart>(
        this.getCloneSavedCartEndpoint(userId, cartId, saveCartName),
        cartId
      )
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

  protected getSavedCartEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('savedCart', {
      urlParams: { userId, cartId },
    });
  }

  protected getSavedCartListEndpoint(userId: string): string {
    return this.occEndpoints.buildUrl('savedCarts', { urlParams: { userId } });
  }

  protected getRestoreSavedCartEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('restoreSavedCart', {
      urlParams: { userId, cartId },
    });
  }

  protected getCloneSavedCartEndpoint(
    userId: string,
    cartId: string,
    saveCartName: string
  ): string {
    return this.occEndpoints.buildUrl('cloneSavedCart', {
      urlParams: { userId, cartId, saveCartName },
    });
  }
}
