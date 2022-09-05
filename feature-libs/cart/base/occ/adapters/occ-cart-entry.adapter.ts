/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartEntryAdapter } from '@spartacus/cart/base/core';
import {
  AddEntryOptions,
  BaseCartOptions,
  CartModification,
  CART_MODIFICATION_NORMALIZER,
  RemoveEntryOptions,
  UpdateEntryOptions,
} from '@spartacus/cart/base/root';
import {
  ConverterService,
  HttpOptions,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccCartEntryAdapter implements CartEntryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  /**
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `add(options: BaseCartOptions<AddEntryOptions>)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  // TODO:#object-extensibility-deprecation - remove
  public add(
    options: BaseCartOptions<AddEntryOptions>
  ): Observable<CartModification>;
  public add(
    // TODO:#object-extensibility-deprecation - rename to `options`
    optionsOrUserId:
      | BaseCartOptions<AddEntryOptions>
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and all params after it
      | string,
    cartId?: string,
    productCode?: string,
    quantity?: number
  ): Observable<CartModification> {
    // TODO:#object-extensibility-deprecation - remove the whole if-block
    if (typeof optionsOrUserId === 'string') {
      const url = this.occEndpointsService.buildUrl('addEntries', {
        urlParams: { userId: optionsOrUserId, cartId, quantity },
      });

      // Handle b2b case where the x-www-form-urlencoded is still used
      if (url.includes(`quantity=${quantity}`)) {
        const httpHeaders = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http
          .post<CartModification>(
            url,
            {},
            {
              headers: httpHeaders,
              params: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                code: productCode!,
              },
            }
          )
          .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
      }

      const toAdd = {
        quantity,
        product: { code: productCode },
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      return this.http
        .post<CartModification>(url, toAdd, { headers })
        .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }

    const {
      urlParams,
      body,
      params: queryParams,
    } = this.createAddOptions(optionsOrUserId);
    const url = this.occEndpointsService.buildUrl('addEntries', {
      urlParams,
      queryParams,
    });

    // Handle b2b case where the x-www-form-urlencoded is still used
    if (url.includes(`quantity=${quantity}`)) {
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      return this.http
        .post<CartModification>(
          url,
          {},
          {
            headers: httpHeaders,
            params: {
              code:
                // TODO:#object-extensibility-deprecation - should be able to remove  and the `productCode!` assertion and the `eslint-disable-next-line` rule below
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                productCode!,
            },
          }
        )
        .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<CartModification>(url, body, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  /**
   * Creates HTTP's request options for the `add` functionality
   */
  protected createAddOptions(
    options: BaseCartOptions<AddEntryOptions>
  ): HttpOptions {
    const {
      userId,
      cartId,
      productCode,
      quantity = 1,
      ...augmentedOptions
    } = options;

    return {
      urlParams: {
        userId,
        cartId,
        quantity,
      },
      body: {
        quantity,
        product: {
          code: productCode,
        },
        ...augmentedOptions,
      },
      params: {},
    };
  }

  /**
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `update(options: BaseCartOptions<UpdateEntryOptions>)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  public update(
    userId: string,
    cartId: string,
    entryNumber: string | number,
    quantity: number,
    pickupStore?: string
  ): Observable<CartModification>;
  // TODO:#object-extensibility-deprecation - remove
  public update(
    options: BaseCartOptions<UpdateEntryOptions>
  ): Observable<CartModification>;
  public update(
    // TODO:#object-extensibility-deprecation - rename to `options`
    optionsOrUserId:
      | BaseCartOptions<UpdateEntryOptions>
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and all params after it
      | string,
    cartId?: string,
    entryNumber?: string | number,
    quantity?: number,
    pickupStore?: string
  ): Observable<CartModification> {
    // TODO:#object-extensibility-deprecation - remove the whole if-block
    if (typeof optionsOrUserId === 'string') {
      let params = {};
      if (pickupStore) {
        params = {
          deliveryPointOfService: {
            name: pickupStore,
          },
        };
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const url = this.occEndpointsService.buildUrl('updateEntries', {
        urlParams: {
          userId: optionsOrUserId,
          cartId,
          entryNumber,
        },
      });

      return this.http
        .patch<CartModification>(url, { quantity, ...params }, { headers })
        .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }

    const {
      urlParams,
      body,
      params: queryParams,
    } = this.createUpdateOptions(optionsOrUserId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = this.occEndpointsService.buildUrl('updateEntries', {
      urlParams,
      queryParams,
    });

    return this.http
      .patch<CartModification>(url, body, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  /**
   * Creates HTTP's request options for the `update` functionality
   */
  protected createUpdateOptions(
    options: BaseCartOptions<UpdateEntryOptions>
  ): HttpOptions {
    const { userId, cartId, entryNumber, quantity, ...augmentedOptions } =
      options;

    return {
      urlParams: {
        userId,
        cartId,
        entryNumber,
      },
      body: {
        quantity,
        ...augmentedOptions,
      },
      params: {},
    };
  }

  /**
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `remove(options: BaseCartOptions<RemoveEntryOptions>)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  public remove(
    userId: string,
    cartId: string,
    entryNumber: string | number
  ): Observable<any>;
  // TODO:#object-extensibility-deprecation - remove
  public remove(options: BaseCartOptions<RemoveEntryOptions>): Observable<any>;
  public remove(
    // TODO:#object-extensibility-deprecation - rename to `options`
    optionsOrUserId:
      | BaseCartOptions<RemoveEntryOptions>
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and all params after it
      | string,
    cartId?: string,
    entryNumber?: string | number
  ): Observable<any> {
    // TODO:#object-extensibility-deprecation - remove the whole if-block
    if (typeof optionsOrUserId === 'string') {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      const url = this.occEndpointsService.buildUrl('removeEntries', {
        urlParams: {
          userId: optionsOrUserId,
          cartId,
          entryNumber,
        },
      });

      return this.http.delete(url, { headers });
    }

    const {
      urlParams,
      params: queryParams,
      body,
    } = this.createRemoveOptions(optionsOrUserId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.occEndpointsService.buildUrl('removeEntries', {
      urlParams,
      queryParams,
    });

    return this.http.delete(url, { headers, body });
  }

  /**
   * Creates HTTP's request options for the `remove` functionality
   */
  protected createRemoveOptions(
    options: BaseCartOptions<RemoveEntryOptions>
  ): HttpOptions {
    const { userId, cartId, entryNumber, ...augmentedOptions } = options;

    return {
      urlParams: {
        userId,
        cartId,
        entryNumber,
      },
      body: null,
      params: augmentedOptions,
    };
  }
}
