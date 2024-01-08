/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartAdapter } from '@spartacus/cart/base/core';
import {
  CART_NORMALIZER,
  Cart,
  SaveCartResult,
} from '@spartacus/cart/base/root';
import {
  ConverterService,
  InterceptorUtil,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  Occ,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public loadAll(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(
        this.occEndpointsService.buildUrl('carts', { urlParams: { userId } })
      )
      .pipe(
        map((cartList) => cartList.carts ?? []),
        this.converterService.pipeableMany(CART_NORMALIZER)
      );
  }

  public load(userId: string, cartId: string): Observable<Cart | undefined> {
    if (cartId === OCC_CART_ID_CURRENT) {
      return this.loadAll(userId).pipe(
        map((carts) => carts.find((cart) => cart['saveTime'] === undefined))
      );
    } else {
      return this.http
        .get<Occ.Cart>(
          this.occEndpointsService.buildUrl('cart', {
            urlParams: { userId, cartId },
          })
        )
        .pipe(this.converterService.pipeable(CART_NORMALIZER));
    }
  }

  create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    const toAdd = JSON.stringify({});

    const params = <any>{};

    if (oldCartId) {
      params['oldCartId'] = oldCartId;
    }
    if (toMergeCartGuid) {
      params['toMergeCartGuid'] = toMergeCartGuid;
    }

    return this.http
      .post<Occ.Cart>(
        this.occEndpointsService.buildUrl('createCart', {
          urlParams: { userId },
          queryParams: params,
        }),
        toAdd
      )
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }

  delete(userId: string, cartId: string): Observable<{}> {
    let headers = new HttpHeaders();
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }
    return this.http.delete<{}>(
      this.occEndpointsService.buildUrl('deleteCart', {
        urlParams: { userId, cartId },
      }),
      { headers }
    );
  }

  save(
    userId: string,
    cartId: string,
    saveCartName: string,
    saveCartDescription: string
  ): Observable<Cart> {
    const endpoint = this.occEndpointsService.buildUrl('saveCart', {
      urlParams: {
        userId,
        cartId,
        saveCartName,
        saveCartDescription,
      },
    });
    return this.http.patch<Occ.Cart>(endpoint, cartId).pipe(
      map((cartResponse) => (cartResponse as SaveCartResult).savedCartData),
      this.converterService.pipeable(CART_NORMALIZER)
    );
  }

  addEmail(userId: string, cartId: string, email: string): Observable<{}> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    const httpParams: HttpParams = new HttpParams().set('email', email);

    const url = this.occEndpointsService.buildUrl('addEmail', {
      urlParams: {
        userId,
        cartId,
      },
    });

    return this.http.put(url, httpParams, { headers });
  }
}
