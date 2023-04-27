/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { ORDER_NORMALIZER } from 'integration-libs/cdp/error-connector/converter';
import { returnOrder } from 'integration-libs/cdp/root/model/returnDetail/returnOrder';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { finalOrder } from '../../root/model/order/finalOrder';
import { orders } from '../../root/model/order/orders';
import { order } from '../../root/model/orderDetail/order';

@Injectable({
  providedIn: 'root',
})
export class cdpOrderAdapter {
  orderValue: finalOrder;
  constructor(
    private httpClient: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getOrder(userId: string, page_size: number): Observable<finalOrder> {
    let URL = this.occEndpointsService.buildUrl(
      '/users/' + userId + '/orders?pageSize=' + page_size
    );
    return this.httpClient.get<finalOrder>(URL);
  }

  getOrderDetail(userId: string, ord: orders): Observable<order> {
    let URL = this.occEndpointsService.buildUrl(
      '/users/' + userId + '/orders/' + ord.code + '?fields=FULL'
    );
    return this.httpClient.get<order>(URL);
  }

  getOrderPerPage(
    userId: string,
    page_size: number,
    currentPage: number
  ): Observable<finalOrder> {
    let URL = this.occEndpointsService.buildUrl(
      '/users/' +
        userId +
        '/orders?currentPage=' +
        currentPage +
        '&pageSize=' +
        page_size
    );
    return this.httpClient.get<finalOrder>(URL).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      this.converterService.pipeable(ORDER_NORMALIZER)
    );
  }

  getRetunDetail(userId: string): Observable<returnOrder> {
    const URL = this.occEndpointsService.buildUrl(
      '/users/' + userId + '/orderReturns'
    );
    return this.httpClient.get<returnOrder>(URL);
  }
}
