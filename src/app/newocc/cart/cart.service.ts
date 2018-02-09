import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductImageConverterService } from '../../product/converters';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCartService {
  // Extending from baseservice is not working here for some reasons
  // we got errors when we didn't construct the configService.
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    protected productImageConverter: ProductImageConverterService
  ) { }

  public loadLatestCart(userId: string): Observable<any> {
    const url = this.getCartEndpoint(userId) + 'current';
    return this.http
      .get(url)
      .map(response => {
        const latestCart = response;
        return latestCart;
      });
  };

  public mergeCartWithLatestCart(
    userId: string,
    oldCartToken: string,
    toMergeCart: any
  ): Observable<any> {
    const toAdd = JSON.stringify({});
    let url = this.getCartEndpoint(userId);
    url += '?oldCartId=' + oldCartToken;
    if (toMergeCart) {
      url += '&toMergeCartGuid=' + toMergeCart.guid;
    }
    url +=
      '&fields=DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),entries(totalPrice(formattedValue),product(images(FULL)))';

    return this.http
      .post(url, toAdd)
      .map(response => {
        const cartData = response as any;
        if (cartData.carts) {
          for (const entry of cartData.carts) {
            this.productImageConverter.convertProduct(entry.product);
          }
        }
        return cartData;
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public loadCart(userId: string, cartId: string): Observable<any> {
    let url = this.getCartEndpoint(userId);
    url += cartId;
    url +=
      '?fields=DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),entries(totalPrice(formattedValue),product(images(FULL)))';

    return this.http
      .get(url)
      .map((response: any) => {
        const cartData = response;
        if (cartData.carts) {
          for (const entry of cartData.carts) {
            this.productImageConverter.convertProduct(entry.product);
          }
        }
        return cartData;
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  };

  public createCart(userId: string): Observable<any> {
    const url = this.getCartEndpoint(userId);
    const toAdd = JSON.stringify({});
    return this.http
      .post(url, toAdd)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  };

  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number
  ): Observable<any> {
    const toAdd = JSON.stringify({});

    let url = this.getCartEndpoint(userId);
    url += cartId;
    url += '/entries?code=' + productCode + '&qty=' + quantity;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, toAdd, { headers: headers })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  };

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    let url = this.getCartEndpoint(userId);
    url += cartId;
    url += '/entries/';
    url += entryNumber;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .delete(url, { headers: headers })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  };

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
}
