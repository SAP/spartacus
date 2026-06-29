/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthStorageService } from '@spartacus/core';
import { Observable, switchMap, take, map } from 'rxjs';
import { BFF_BASE_URL } from './bff-base-url.token';

/**
 * Generic HTTP client for the Vivaldi BFF.
 *
 * Knows only two things about the BFF:
 *  1. Where it lives — from `BFF_BASE_URL` (the `bff-base-url` meta tag).
 *  2. How to authenticate — the current user's Spartacus OCC Bearer token
 *     is forwarded as the `Authorization` header so BFF procedures that
 *     need it can pass it upstream to MCS / OCC.
 *
 * BFF traffic does not pass through Spartacus's OCC HttpInterceptor chain
 * because OCC interceptors are gated on the OCC base URL — they only fire
 * on requests whose URL contains `backend.occ.baseUrl`. BFF calls go to
 * `/bff/...` which does not match, so OCC auth headers, site-context params,
 * and error handlers do not fire on BFF traffic.
 *
 * Known limitation: automatic token renewal on 401 is not implemented.
 * The token is read once via `AuthStorageService` at call time. If the token
 * expires mid-session, BFF calls will receive a 401 with no automatic retry.
 * For production use, consider extending this service with a 401 catchError
 * that triggers token refresh and retries the request.
 */
@Injectable({ providedIn: 'root' })
export class BffHttpService {
  private readonly http = inject(HttpClient);
  private readonly bffBaseUrl = inject(BFF_BASE_URL);
  private readonly authStorage = inject(AuthStorageService);

  /**
   * Makes a GET request to a BFF tRPC query procedure.
   *
   * @param procedure Dot-separated procedure path, e.g.
   *   `'mcs.storefront.product.v1.products.searchProducts'`
   * @param input     Procedure input object. Serialized as
   *   `?input={"json":{...}}` per the superjson tRPC convention.
   *
   * @param extraHeaders
   * @example
   * bff.query('mcs.storefront.product.v1.products.searchProducts', {
   *   salesChannelId: 'electronics',
   *   query: 'camera',
   * }).subscribe(res => console.log(res));
   */
  query<T = unknown>(
    procedure: string,
    input?: Record<string, unknown>,
    extraHeaders?: Record<string, string>
  ): Observable<T> {
    return this.withAuthHeader((headers) => {
      const params = input
        ? new HttpParams().set('input', JSON.stringify({ json: input }))
        : undefined;

      return this.http
        .get<{
          result: { data: { json: T } };
        }>(`${this.bffBaseUrl}/${procedure}`, {
          headers: { ...headers, ...extraHeaders },
          params,
        })
        .pipe(map((res) => res.result.data.json));
    });
  }

  /**
   * Makes a POST request to a BFF tRPC mutation procedure.
   *
   * @param procedure Dot-separated procedure path, e.g.
   *   `'mcs.storefront.cart.v1.carts.createCart'`
   * @param input     Procedure input object, serialized as
   *   `{ "json": <input> }` in the request body.
   *
   * @example
   * bff.mutate('mcs.storefront.cart.v1.carts.createCart', {
   *   salesChannelId: 'electronics',
   * }).subscribe(cart => console.log(cart));
   */
  mutate<T = unknown>(
    procedure: string,
    input?: Record<string, unknown>
  ): Observable<T> {
    return this.withAuthHeader((headers) =>
      this.http
        .post<{
          result: { data: { json: T } };
        }>(
          `${this.bffBaseUrl}/${procedure}`,
          { json: input ?? {} },
          { headers }
        )
        .pipe(map((res) => res.result.data.json))
    );
  }

  private withAuthHeader<T>(
    fn: (headers: Record<string, string>) => Observable<T>
  ): Observable<T> {
    if (!this.bffBaseUrl) {
      throw new Error(
        'BFF_BASE_URL is not configured. ' +
          'Set the <meta name="bff-base-url"> tag or override BFF_BASE_URL in providers.'
      );
    }
    return this.authStorage.getToken().pipe(
      take(1),
      switchMap((token) => {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (token?.access_token) {
          headers['Authorization'] = `Bearer ${token.access_token}`;
        }
        return fn(headers);
      })
    );
  }
}
