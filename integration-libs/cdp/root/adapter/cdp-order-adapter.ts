/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { finalOrder } from '../model/order/finalOrder';
import { orders } from '../model/order/orders';
import { order } from '../model/orderDetail/order';

@Injectable({
  providedIn: 'root',
})
export class cdpOrderAdapter {
  constructor(
    private httpClient: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {}

  getOrder(userId: string): Observable<finalOrder> {
    let URL = this.occEndpointsService.buildUrl('/users/' + userId + '/orders');
    return this.httpClient.get<finalOrder>(URL);
  }

  getOrderDetail(userId: string, ord: orders): Observable<order> {
    let URL = this.occEndpointsService.buildUrl(
      '/users/' + userId + '/orders/' + ord.code + '?fields=FULL'
    );
    return this.httpClient.get<order>(URL);
  }
}
