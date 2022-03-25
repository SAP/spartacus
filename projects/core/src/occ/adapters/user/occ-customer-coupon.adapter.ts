import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CustomerCoupon2Customer,
  CustomerCouponNotification,
  CustomerCouponSearchResult,
} from '../../../model/customer-coupon.model';
import { CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER } from '../../../user/connectors/customer-coupon/converters';
import { CustomerCouponAdapter } from '../../../user/connectors/customer-coupon/customer-coupon.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OCC_USER_ID_ANONYMOUS } from '../../utils/occ-constants';

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
    // Currently OCC only supports calls for customer coupons in case of logged users
    if (userId === OCC_USER_ID_ANONYMOUS) {
      return of({});
    }

    const url = this.occEndpoints.buildUrl('customerCoupons', {
      urlParams: { userId },
    });

    let params = new HttpParams().set('sort', sort ? sort : 'startDate:asc');

    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }

    const headers = this.newHttpHeader();

    return this.http
      .get<Occ.CustomerCouponSearchResult>(url, { headers, params })
      .pipe(this.converter.pipeable(CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER));
  }

  turnOffNotification(userId: string, couponCode: string): Observable<{}> {
    const url = this.occEndpoints.buildUrl('couponNotification', {
      urlParams: { userId, couponCode },
    });
    const headers = this.newHttpHeader();

    return this.http.delete(url, { headers });
  }

  turnOnNotification(
    userId: string,
    couponCode: string
  ): Observable<CustomerCouponNotification> {
    const url = this.occEndpoints.buildUrl('couponNotification', {
      urlParams: { userId, couponCode },
    });
    const headers = this.newHttpHeader();

    return this.http.post(url, { headers });
  }

  claimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer> {
    const url = this.occEndpoints.buildUrl('claimCoupon', {
      urlParams: { userId, couponCode },
    });
    const headers = this.newHttpHeader();

    return this.http.post(url, { headers });
  }

  private newHttpHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
