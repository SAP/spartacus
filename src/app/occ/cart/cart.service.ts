import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const MORE_PARAMS =
  'fields=DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),' +
  'entries(totalPrice(formattedValue),product(images(FULL)))';

@Injectable()
export class OccCartService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {}

  protected getCartEndpoint(userId: string) {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return (
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite +
      '/' +
      cartEndpoint
    );
  }

  public loadAllCarts(userId: string): Observable<any> {
    const url = this.getCartEndpoint(userId);
    return this.http
      .get(url)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public loadCart(userId: string, cartId: string): Observable<any> {
    const url = this.getCartEndpoint(userId) + cartId;
    const params = new HttpParams({
      fromString: MORE_PARAMS
    });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public createCart(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<any> {
    const url = this.getCartEndpoint(userId);
    const toAdd = JSON.stringify({});
    let queryString = MORE_PARAMS;

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
      .post(url, toAdd, { params: params })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public addCartEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<any> {
    const toAdd = JSON.stringify({});

    const url = this.getCartEndpoint(userId) + cartId + '/entries';

    const params = new HttpParams({
      fromString: 'code=' + productCode + '&qty=' + quantity
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, toAdd, { headers: headers, params: params })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
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
      .delete(url, { headers: headers })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public createAddressOnCart(
    userId: string,
    cartId: string,
    address: any
  ): Observable<any> {
    return this.http
      .post(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public setDeliveryAddress(userId: string, cartId: string, addressId: string) {
    this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        {},
        {
          params: { addressId: addressId }
        }
      )
      .pipe(catchError((error: any) => Observable.throw(error.json())))
      .subscribe();
  }
}
