import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OccConfig } from '../../occ/';
import {
  CartList,
  Cart,
  CartModification,
  Address,
  DeliveryMode,
  PaymentDetails
} from '../../occ-models/occ.models';
import { CustomEncoder } from './custom.encoder';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

// for mini cart
const BASIC_PARAMS =
  'DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),' +
  'entries(totalPrice(formattedValue),product(images(FULL)))';

// for cart details page
const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue)),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,totalTax(formattedValue),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue)';

@Injectable()
export class OccCartService {
  constructor(protected http: HttpClient, protected config: OccConfig) {}

  protected getCartEndpoint(userId: string) {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      cartEndpoint
    );
  }

  public loadAllCarts(userId: string, details?: boolean): Observable<CartList> {
    const url = this.getCartEndpoint(userId);
    const params = details
      ? new HttpParams({
          fromString: 'fields=carts(' + DETAILS_PARAMS + ',saveTime)'
        })
      : new HttpParams({
          fromString: 'fields=carts(' + BASIC_PARAMS + ',saveTime)'
        });
    return this.http
      .get<CartList>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  public loadCart(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart> {
    const url = this.getCartEndpoint(userId) + cartId;
    const params = details
      ? new HttpParams({
          fromString: 'fields=' + DETAILS_PARAMS
        })
      : new HttpParams({
          fromString: 'fields=' + BASIC_PARAMS
        });

    if (cartId === 'current') {
      return this.loadAllCarts(userId, details).pipe(
        map(cartsData => {
          if (cartsData && cartsData.carts) {
            const activeCart = cartsData.carts.find(cart => {
              return cart['saveTime'] === undefined;
            });
            return activeCart;
          } else {
            return null;
          }
        })
      );
    } else {
      return this.http
        .get<Cart>(url, { params: params })
        .pipe(catchError((error: any) => throwError(error)));
    }
  }

  public createCart(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    const url = this.getCartEndpoint(userId);
    const toAdd = JSON.stringify({});
    let queryString = 'fields=' + BASIC_PARAMS;

    if (oldCartId) {
      queryString = queryString + '&oldCartId=' + oldCartId;
    }
    if (toMergeCartGuid) {
      queryString = queryString + '&toMergeCartGuid=' + toMergeCartGuid;
    }
    const params = new HttpParams({
      fromString: queryString
    });

    return this.http
      .post<Cart>(url, toAdd, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public addCartEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({});

    const url = this.getCartEndpoint(userId) + cartId + '/entries';

    const params = new HttpParams({
      fromString: 'code=' + productCode + '&qty=' + quantity
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public updateCartEntry(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    const url =
      this.getCartEndpoint(userId) + cartId + '/entries/' + entryNumber;

    let queryString = 'qty=' + qty;
    if (pickupStore) {
      queryString = queryString + '&pickupStore=' + pickupStore;
    }
    const params = new HttpParams({
      fromString: queryString
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .patch<CartModification>(url, {}, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public removeCartEntry(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const url =
      this.getCartEndpoint(userId) + cartId + '/entries/' + entryNumber;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createAddressOnCart(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address> {
    return this.http
      .post<Address>(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public setDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any> {
    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        {},
        {
          params: { addressId: addressId }
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public setDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any> {
    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/deliverymode',
        {},
        {
          params: { deliveryModeId: deliveryModeId }
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getDeliveryMode(userId: string, cartId: string): Observable<any> {
    return this.http
      .get(this.getCartEndpoint(userId) + cartId + '/deliverymode')
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getSupportedDeliveryModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode> {
    return this.http
      .get<DeliveryMode>(
        this.getCartEndpoint(userId) + cartId + '/deliverymodes'
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getPaymentProviderSubInfo(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.http
      .get(
        this.getCartEndpoint(userId) +
          cartId +
          '/payment/sop/request?responseUrl=sampleUrl'
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public createSubWithPaymentProvider(
    postUrl: string,
    parameters: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html'
    });
    let httpParams = new HttpParams({ encoder: new CustomEncoder() });
    Object.keys(parameters).forEach(key => {
      httpParams = httpParams.append(key, parameters[key]);
    });

    return this.http.post(postUrl, httpParams, {
      headers,
      responseType: 'text'
    });
  }

  public createPaymentDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails> {
    let httpParams = new HttpParams({ encoder: new CustomEncoder() });
    Object.keys(parameters).forEach(key => {
      httpParams = httpParams.append(key, parameters[key]);
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post<PaymentDetails>(
        this.getCartEndpoint(userId) + cartId + '/payment/sop/response',
        httpParams,
        { headers }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  public setPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  ): Observable<any> {
    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/paymentdetails',
        {},
        {
          params: { paymentDetailsId: paymentDetailsId }
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
