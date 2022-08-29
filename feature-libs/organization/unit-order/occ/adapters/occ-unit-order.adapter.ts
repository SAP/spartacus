import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, Occ, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  OrderHistoryList,
  ORDER_HISTORY_NORMALIZER,
} from '@spartacus/order/root';
import { UnitOrderAdapter } from '../../core/connectors/unit-order.adapter';

@Injectable()
export class OccUnitOrderAdapter implements UnitOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

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
}
