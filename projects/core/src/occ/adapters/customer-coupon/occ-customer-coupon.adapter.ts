import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { CustomerCouponAdapter } from '../../../user/connectors/customer-coupon/customer-coupon.adapter';
import {
  CustomerCoupon,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';

const USER_ENDPOINT = 'users/';
const CUSTOMER_COUPON_ENDPOINT = '/customercoupons';

@Injectable()
export class OccCustomerCouponAdapter implements CustomerCouponAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService
  ) {}

  private getUserEndpoint(userId: string): string {
    const endpoint = `${USER_ENDPOINT}${userId}`;
    return this.occEndpoints.getEndpoint(endpoint);
  }

  getMyCoupons(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<CustomerCouponSearchResult> {
    const url = this.getUserEndpoint(userId) + CUSTOMER_COUPON_ENDPOINT;

    let params = new HttpParams().set('sort', sort ? sort : 'startDate:asc');

    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get(url, { headers, params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  turnOffNotification(userId: string, couponCode: string): Observable<{}> {
    const url =
      this.getUserEndpoint(userId) +
      CUSTOMER_COUPON_ENDPOINT +
      '/' +
      couponCode +
      '/notification';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  turnOnNotification(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon> {
    const url =
      this.getUserEndpoint(userId) +
      CUSTOMER_COUPON_ENDPOINT +
      '/' +
      couponCode +
      '/notification';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<CustomerCoupon>(url, { headers }).pipe(
      map(
        (customerCouponNotification: CustomerCouponNotification) =>
          customerCouponNotification.coupon
      ),
      catchError((error: any) => throwError(error))
    );
  }
}
