import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  Occ,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  USE_CLIENT_TOKEN
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  ConsignmentTracking,
  CONSIGNMENT_TRACKING_NORMALIZER,
  Order,
  OrderHistoryList,
  ORDER_HISTORY_NORMALIZER,
  ORDER_NORMALIZER,
} from '@spartacus/order/root';
import { UnitOrderAdapter } from '../../core/connectors/unit-order.adapter';



@Injectable()
export class OccUnitOrderAdapter implements UnitOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public load(userId: string, orderCode: string): Observable<Order> {
    const url = this.occEndpoints.buildUrl('orderDetail', {
      urlParams: { userId, orderId: orderCode },
    });

    let headers = new HttpHeaders();
    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http
      .get<Occ.Order>(url, { headers })
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

    public loadUnitOrderHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    const params: { [key: string]: string } = {};
    if (pageSize) {
      params['pageSize'] = pageSize.toString();
    }
    if (currentPage) {
      params['currentPage'] = currentPage.toString();
    }
    if (sort) {
      params['sort'] = sort.toString();
    }

    const url = this.occEndpoints.buildUrl('unitLevelOrderHistory', {
      urlParams: { userId },
      queryParams: params,
    });

    return this.http
      .get<Occ.OrderHistoryList>(url)
      .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
  }

  public getConsignmentTracking(
    orderCode: string,
    consignmentCode: string,
    userId: string = OCC_USER_ID_CURRENT
  ): Observable<ConsignmentTracking> {
    const url = this.occEndpoints.buildUrl('consignmentTracking', {
      urlParams: { userId, orderCode, consignmentCode },
    });
    return this.http
      .get<ConsignmentTracking>(url)
      .pipe(this.converter.pipeable(CONSIGNMENT_TRACKING_NORMALIZER));
  }

}


