/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  Order,
  Consignment,
  OrderHistoryList,
  ReturnRequestList,
  OrderHistory,
  ConsignmentTracking,
} from '@spartacus/order/root';
import { OccOrderHistoryAdapter } from './occ-order-history.adapter';

@Injectable()
export class OccOrderHistoryExtendedAdapter extends OccOrderHistoryAdapter {
  /**
   * fills the tracking information for each consignment in the input order details
   * @param userId user id
   * @param order order details with consignments
   * @returns order details along with tracking information for each of it's consignments
   */
  fillConsignmentTrackingDetails(
    userId: string,
    order: Order
  ): Observable<Order> {
    const requests = order.consignments?.map((consignment: Consignment) => {
      if (consignment.code && consignment.trackingID) {
        return this.getConsignmentTracking(
          order?.code ?? '',
          consignment.code,
          userId
        ).pipe(
          map((trackingInfo: ConsignmentTracking) => {
            consignment.consignmentTracking = trackingInfo;
            return order;
          })
        );
      } else {
        return of(order);
      }
    });
    if (requests === undefined || requests.length < 1) {
      return of(order);
    }
    return forkJoin(requests).pipe(
      switchMap((orders: Order[] | undefined) => {
        if (orders !== undefined) {
          return of(orders[0]);
        } else {
          return of(order);
        }
      })
    );
  }

  /**
   * This method overrides the load method from OccOrderHistoryAdapter.
   * Returns order details along with tracking information of each of it's consignments for an
   * order code.
   * @param userId user id
   * @param orderCode  order code
   * @returns order details
   */
  public load(userId: string, orderCode: string): Observable<Order> {
    return super.load(userId, orderCode).pipe(
      switchMap((order: Order) => {
        return this.fillConsignmentTrackingDetails(userId, order);
      })
    );
  }

  /**
   * This method overrides the loadHistory method from OccOrderHistoryAdapter.
   * Returns order history list with returns details filled in each order.
   * @param userId user id
   * @param pageSize no.of items in a page
   * @param currentPage current page number
   * @param sort sort order
   * @returns order history list
   */
  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    const orderHistoryListRequest = this.loadOrderHistoryWithDetails(
      userId,
      pageSize,
      currentPage,
      sort
    );
    const returnRequestListRequest = this.loadReturnRequestList(userId);
    return forkJoin([orderHistoryListRequest, returnRequestListRequest]).pipe(
      switchMap((responses: [OrderHistoryList, ReturnRequestList]) => {
        const returnRequests = responses[1].returnRequests;
        let orderHistory = responses[0];
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

  /**
   * Returns order history list with more order details filled in each order.
   * @param userId user id
   * @param pageSize no.of items in a page
   * @param currentPage current page number
   * @param sort sort order
   * @returns order history list
   */
  loadOrderHistoryWithDetails(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return super.loadHistory(userId, pageSize, currentPage, sort).pipe(
      switchMap((orderList: OrderHistoryList) => {
        const requests = orderList.orders?.map((order: OrderHistory) => {
          return this.load(userId, order?.code ?? '').pipe(
            map((orderDetail: Order) => {
              /** filling extra fields ---> */
              order.entries = orderDetail.entries;
              order.consignments = orderDetail.consignments;
              order.unconsignedEntries = orderDetail.unconsignedEntries;
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
