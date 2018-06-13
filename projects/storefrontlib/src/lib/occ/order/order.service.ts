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

  public getListOfOrders(userId: string): Observable<any> {
    const url = this.getOrderEndpoint(userId);

    return this.http
      .get(url, {})
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
