/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { forkJoin, Observable, of } from 'rxjs';
import { OccOrderHistoryAdapter } from '@spartacus/order/occ';
import {
  OrderHistoryList,
  OrderHistory,
  ReturnRequestList,
} from '@spartacus/order/root';
import { map, switchMap } from 'rxjs/operators';
import { OrderDetailsService } from '@spartacus/order/components';

@Injectable({ providedIn: 'root' })
export class OrderHistoryEnhancedUIAdapter extends OccOrderHistoryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected orderDetailsService: OrderDetailsService
  ) {
    super(http, occEndpoints, converter);
  }

  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.loadOrdersAndReturnsList(
      userId,
      pageSize,
      currentPage,
      sort
    ).pipe(
      switchMap((responses: [OrderHistoryList, ReturnRequestList]) => {
        var returnRequests = responses[1].returnRequests;
        var orderHistory = responses[0];
        if (returnRequests && orderHistory.orders) {
          return orderHistory.orders.map((order) => {
            const returnItems = returnRequests?.filter(
              (returnItem) => returnItem.order?.code === order.code
            );
            if (returnItems) {
              order.returnRequests = returnItems;
            }
            return orderHistory;
          });
        } else {
          return of(orderHistory);
        }
      })
    );
  }

  public loadOrdersAndReturnsList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<[OrderHistoryList, ReturnRequestList]> {
    const orderHistoryListRequest = this.loadEnhancedUIOrderHistory(
      userId,
      pageSize,
      currentPage,
      sort
    );
    const returnRequestListRequest = super.loadReturnRequestList(userId);
    return forkJoin([orderHistoryListRequest, returnRequestListRequest]);
  }

  public loadEnhancedUIOrderHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return super.loadHistory(userId, pageSize, currentPage, sort).pipe(
      switchMap((orderList: OrderHistoryList) => {
        const requests = orderList.orders?.map((order: OrderHistory) => {
          return super.load(userId, order?.code ?? '').pipe(
            map((orderDetail) => {
              /** filling extra fields ---> */

              // filling images
              order.thumbnail = [];
              if (orderDetail?.entries) {
                for (let item of orderDetail?.entries) {
                  if (item.product?.images) {
                    order.thumbnail.push(item.product?.images);
                  }
                }
              }

              //filling unconsignedEntries
              order.unconsignedEntries = [];
              if (orderDetail?.unconsignedEntries) {
                for (let entry of orderDetail?.unconsignedEntries) {
                  order.unconsignedEntries.push(entry);
                }
              }

              //filling deliveryConsignments
              order.deliveryConsignments =
                this.orderDetailsService.getGroupedConsignments(
                  orderDetail,
                  false
                );

              //filling pickupConsignments
              order.pickupConsignments =
                this.orderDetailsService.getGroupedConsignments(
                  orderDetail,
                  true
                );

              //filling pickupUnconsignedEntries
              order.pickupUnconsignedEntries =
                this.orderDetailsService.getUnconsignedEntries(order, true);

              //filling deliveryUnConsignedEntries
              order.deliveryUnconsignedEntries =
                this.orderDetailsService.getUnconsignedEntries(order, false);

              //filling an empty return request array
              order.returnRequests = [];

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
