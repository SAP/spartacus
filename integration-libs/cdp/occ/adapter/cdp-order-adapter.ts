/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { returnOrder } from 'integration-libs/cdp/root/model/returnDetail/returnOrder';
//import { returnRequests } from 'integration-libs/cdp/root/model/returnDetail/returnRequests';
import { Observable, of } from 'rxjs';
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
    protected occEndpointsService: OccEndpointsService
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
    return this.httpClient.get<finalOrder>(URL);
  }

  getRetunDetail( userId: string): Observable<returnOrder> {
    this.occEndpointsService.buildUrl(
      '/users/' + userId + '/orderReturns'
    );
    //return this.httpClient.get<returnOrder>(URL);
    const myReturns: returnOrder = {
      returnRequest: [
        { creationTime: "2022-01-01T00:00:00.000Z",ReefernceSDDocumentID:"1263"},
      ]
    };
     return of(myReturns);

  }
}
