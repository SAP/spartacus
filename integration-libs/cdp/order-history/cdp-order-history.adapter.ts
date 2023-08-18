/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { forkJoin, Observable } from 'rxjs';
import { OccOrderHistoryAdapter } from '@spartacus/order/occ';
import { OrderHistoryList, OrderHistory } from '@spartacus/order/root';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CdpOrderHistoryAdapter extends OccOrderHistoryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {
    super(http, occEndpoints, converter);
  }

  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return super.loadHistory(userId, pageSize, currentPage, sort).pipe(
      switchMap((orderList: OrderHistoryList) => {
        const requests = orderList.orders?.map((order: OrderHistory) => {
          return super.load(userId, order?.code ?? '').pipe(
            map((orderDetails) => {
              /** filling extra fields ---> */
              order.purchaseType = '???';
              order.totalItems = orderDetails.totalItems;
              order.images = [];
              if (orderDetails?.entries) {
                for (let item of orderDetails?.entries) {
                  if (item.product?.images) {
                    order.images.push(item.product?.images);
                  }
                }
              }
              /** filling extra fields <--- */
              return orderList;
            })
          );
        });
        return forkJoin(requests);
      }),
      map((requests: OrderHistoryList[] | undefined) => {
        if (requests !== undefined) {
          return requests[0];
        } else {
          return {};
        }
      })
    );
  }
}
