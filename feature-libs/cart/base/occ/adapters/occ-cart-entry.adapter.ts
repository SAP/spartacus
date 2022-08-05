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
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and everything that follows it.
      | string,
    cartId?: string,
    productCode?: string,
    quantity?: number
  ): Observable<CartModification> {
    let options: Omit<
      AddEntryOptions,
      'userId' | 'cartId' | 'productCode' | 'quantity'
    > = {};
    let userId: string;

    // TODO:#object-extensibility-deprecation - remove the `if` part
    if (typeof optionsOrUserId === 'string') {
      userId = optionsOrUserId;
    } else {
      ({ userId, cartId, productCode, quantity, ...options } = optionsOrUserId);
    }

    quantity = quantity || 1;

    // TODO:#object-extensibility-deprecation - should be able to remove `cartId!` assertion and the `eslint-disable-next-line` rule below
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const urlParams = { userId, cartId: cartId!, quantity };
    const url = this.occEndpointsService.buildUrl('addEntries', { urlParams });

    // TODO:#object-extensibility-deprecation - should be able to remove  and the `productCode!` assertion and the `eslint-disable-next-line` rule below
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const body: any = { ...options, product: { code: productCode! }, quantity };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Handle b2b case where the x-www-form-urlencoded is still used
    if (url.includes(`quantity=${quantity}`)) {
      headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      // we don't want to send the quantity twice
      delete body.quantity;
    }

    return this.http
      .post<CartModification>(url, body, { headers })
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
