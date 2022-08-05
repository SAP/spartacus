import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartEntryAdapter } from '@spartacus/cart/base/core';
import {
  AddEntryOptions,
  BaseCartOptions,
  CartModification,
  CART_MODIFICATION_NORMALIZER,
} from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccCartEntryAdapter implements CartEntryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

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
    options:
      | BaseCartOptions<AddEntryOptions>
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and everything that follows it.
      | string,
    cartId?: string,
    productCode?: string,
    quantity?: number
  ): Observable<CartModification> {
    let toAdd = {};

    let userId: string;
    // TODO:#object-extensibility-deprecation - remove the 'if' part
    if (typeof options === 'string') {
      userId = options;
      // temporary, to make TS happy
      productCode = productCode ?? '';
    } else {
      userId = options.userId;
      cartId = options.cartId;
      productCode = options.productCode;
      quantity = options.quantity;

      // pickup any augmented data
      for (const key in options) {
        if (
          key !== 'userId' &&
          key !== 'cartId' &&
          key !== 'productCode' &&
          key !== 'quantity'
        ) {
          // TODO:#object-extensibility-deprecation - improve
          (toAdd as any)[key] = (options as any)[key];
        }
      }
    }
    quantity = quantity || 1;

    const url = this.occEndpointsService.buildUrl('addEntries', {
      urlParams: { userId, cartId, quantity },
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
              code: productCode,
            },
          }
        )
        .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    toAdd = {
      ...toAdd,
      quantity,
      product: { code: productCode },
    };
    return this.http
      .post<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
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
        userId,
        cartId,
        entryNumber,
      },
    });

    return this.http
      .patch<CartModification>(url, { quantity: qty, ...params }, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.occEndpointsService.buildUrl('removeEntries', {
      urlParams: {
        userId,
        cartId,
        entryNumber,
      },
    });

    return this.http.delete(url, { headers });
  }
}
