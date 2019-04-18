import { Injectable } from '@angular/core';
import { CartAdapter } from '../connectors/cart/cart.adapter';
import { Observable, throwError } from 'rxjs';
import { Cart, CartList } from '../../occ/occ-models/occ.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';

// for mini cart
const BASIC_PARAMS =
  'DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),' +
  'entries(totalPrice(formattedValue),product(images(FULL)))';

// for cart details page
const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue)),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue),pickupItemsQuantity,net,' +
  'appliedVouchers,productDiscounts(formattedValue)';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public loadAllCarts(userId: string, details?: boolean): Observable<CartList> {
    const url = this.getCartEndpoint(userId);
    const params = details
      ? new HttpParams({
          fromString: 'fields=carts(' + DETAILS_PARAMS + ',saveTime)',
        })
      : new HttpParams({
          fromString: 'fields=carts(' + BASIC_PARAMS + ',saveTime)',
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
          fromString: 'fields=' + DETAILS_PARAMS,
        })
      : new HttpParams({
          fromString: 'fields=' + BASIC_PARAMS,
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
      fromString: queryString,
    });

    return this.http
      .post<Cart>(url, toAdd, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
