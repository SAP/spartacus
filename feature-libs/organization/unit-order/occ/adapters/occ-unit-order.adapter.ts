/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, Occ, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  Order,
  OrderHistoryList,
  ORDER_HISTORY_NORMALIZER,
  ORDER_NORMALIZER,
} from '@spartacus/order/root';
import { UnitOrderAdapter } from '@spartacus/organization/unit-order/core';

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
    filters?: string,
    sort?: string
  ): Observable<OrderHistoryList> {
    const params: { [key: string]: string } = {};
    if (pageSize) {
      params['pageSize'] = pageSize.toString();
    }
    if (currentPage) {
      params['currentPage'] = currentPage.toString();
    }
    if (filters) {
      params['filters'] = filters.toString();
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

  public loadUnitOrderDetail(
    userId: string,
    orderCode: string
  ): Observable<Order> {
    const url = this.occEndpoints.buildUrl('unitLevelOrderDetail', {
      urlParams: { userId, orderId: orderCode },
    });

    return this.http
      .get<Occ.Order>(url)
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }
}
