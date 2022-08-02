import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  Occ,
  OccEndpointsService
} from '@spartacus/core';
import { OrderHistoryAdapter } from '../../core/connectors/order-approval.adapter';
import {
  ORDER_HISTORY_NORMALIZER,
} from '../../core/connectors/converters';
import { Observable } from 'rxjs';
import {
  OrderHistoryList,
  ORDER_HISTORY_NORMALIZER,
} from '@spartacus/order/root';
@Injectable()
export class OccOrderHistoryAdapter implements OrderHistoryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public loadHistory(
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

    const url = this.occEndpoints.buildUrl('orderHistory', {
      urlParams: { userId },
      queryParams: params,
    });

    return this.http
      .get<Occ.OrderHistoryList>(url)
      .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
  }
}
