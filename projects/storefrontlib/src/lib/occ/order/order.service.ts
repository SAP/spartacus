import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOrderService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {}

  protected getOrderEndpoint(userId: string) {
    const orderEndpoint = '/users/' + userId + '/orders';
    return (
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite +
      orderEndpoint
    );
  }

  public placeOrder(userId: string, cartId: string): Observable<any> {
    const url = this.getOrderEndpoint(userId);
    const params = new HttpParams({
      fromString: 'cartId=' + cartId
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, {}, { headers: headers, params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getUserOrders(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<any> {
    const url = this.getOrderEndpoint(userId);
    let params = new HttpParams();
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }
    if (sort) {
      params = params.set('sort', sort);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .get(url, { headers: headers, params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getOrder(userId: string, orderCode: string) {
    const url = this.getOrderEndpoint(userId);

    const orderUrl = url + '/' + orderCode;

    return this.http
      .get(orderUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
