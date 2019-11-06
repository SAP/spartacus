import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { CustomerCouponAdapter } from '../../../user/connectors/customer-coupon/customer-coupon.adapter';
import {
  CustomerCouponSearchResult,
  CustomerCouponNotification,
  CustomerCoupon2Customer,
} from '../../../model/customer-coupon.model';
import { CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER } from '../../../user/connectors/customer-coupon/converters';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';

@Injectable()
export class OccCustomerCouponAdapter implements CustomerCouponAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getCustomerCoupons(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<CustomerCouponSearchResult> {
    const url = this.occEndpoints.getUrl('customerCoupons', { userId });

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
      .get<Occ.CustomerCouponSearchResult>(url, { headers, params })
      .pipe(
        catchError((error: any) => throwError(error)),
        this.converter.pipeable(CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER)
      );
  }

  turnOffNotification(userId: string, couponCode: string): Observable<{}> {
    const url = this.occEndpoints.getUrl('couponNotification', {
      userId,
      couponCode,
    });
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
  ): Observable<CustomerCouponNotification> {
    const url = this.occEndpoints.getUrl('couponNotification', {
      userId,
      couponCode,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });

    return this.http
      .post(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  claimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer> {
    const url = this.occEndpoints.getUrl('claimCoupon', {
      userId,
      couponCode,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });

    return this.http
      .post(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
