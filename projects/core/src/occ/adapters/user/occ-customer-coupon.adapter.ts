import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    const headers = this.newHttpHeader();

    return this.http
      .get<Occ.CustomerCouponSearchResult>(url, { headers, params })
      .pipe(this.converter.pipeable(CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER));
  }

  turnOffNotification(userId: string, couponCode: string): Observable<{}> {
    const url = this.occEndpoints.getUrl('couponNotification', {
      userId,
      couponCode,
    });
    const headers = this.newHttpHeader();

    return this.http.delete(url, { headers });
  }

  turnOnNotification(
    userId: string,
    couponCode: string
  ): Observable<CustomerCouponNotification> {
    const url = this.occEndpoints.getUrl('couponNotification', {
      userId,
      couponCode,
    });
    const headers = this.newHttpHeader();

    return this.http.post(url, { headers });
  }

  claimCustomerCoupon(
    userId: string,
    couponCode: string
  ): Observable<CustomerCoupon2Customer> {
    const url = this.occEndpoints.getUrl('claimCoupon', {
      userId,
      couponCode,
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
