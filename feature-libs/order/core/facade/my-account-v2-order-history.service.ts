/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateUtils, UserIdService } from '@spartacus/core';
import {
  Consignment,
  ConsignmentTracking,
  ConsignmentView,
  Order,
  OrderHistory,
  OrderHistoryList,
  OrderHistoryListView,
  OrderHistoryView,
  OrderView,
  ReturnRequestList,
} from '@spartacus/order/root';
import { Observable, of, using, combineLatest } from 'rxjs';
import { auditTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { OrderActions } from '../store';
import {
  getOrderById,
  getOrderByIdEntity,
} from '../store/selectors/order-by-id.selector';
import {
  getConsignmentTrackingById,
  getConsignmentTrackingByIdEntity,
} from '../store/selectors/order-group.selectors';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';

@Injectable()
export class MyAccountV2OrderHistoryService {
  protected orderReturnRequestService = inject(OrderReturnRequestService);
  protected store = inject(Store);
  protected userIdService = inject(UserIdService);
  protected orderHistoryService = inject(OrderHistoryService);

  clearOrderList(): void {
    this.orderHistoryService.clearOrderList();
  }
  getOrderDetailsWithTracking(
    orderCode: string
  ): Observable<OrderView | undefined> {
    return this.getOrderDetails(orderCode).pipe(
      switchMap((order: Order) => {
        //-----------------> filling consignment tracking
        const orderView: OrderView = { ...order };
        orderView.consignments = [];
        const requests = (order.consignments ?? []).map(
          (consignment: Consignment) => {
            const consignmentView: ConsignmentView = { ...consignment };
            if (consignment.code && consignment.trackingID) {
              return this.getConsignmentTracking(
                order?.code ?? '',
                consignment.code
              ).pipe(
                map((trackingInfo: ConsignmentTracking) => {
                  consignmentView.consignmentTracking = trackingInfo;
                  orderView.consignments?.push(consignmentView);
                  return orderView;
                })
              );
            } else {
              orderView.consignments?.push(consignmentView);
              return of(orderView);
            }
          }
        );
        if (requests === undefined || requests.length < 1) {
          return of(orderView);
        }
        return combineLatest(requests).pipe(
          switchMap((orders: OrderView[] | undefined) => {
            if (orders !== undefined) {
              return of(orders[0]);
            } else {
              return of(order);
            }
          })
        );
        //<-----------------
      })
    );
  }

  getOrderHistoryListWithDetails(
    pageSize: number
  ): Observable<OrderHistoryListView | undefined> {
    const orderListView: OrderHistoryListView = {};
    return this.orderHistoryService.getOrderHistoryList(pageSize).pipe(
      switchMap((orderList: OrderHistoryList | undefined) => {
        orderListView.pagination = orderList?.pagination;
        orderListView.sorts = orderList?.sorts;
        orderListView.orders = [];
        const requests = (orderList?.orders ?? []).map(
          (order: OrderHistory) => {
            const orderView: OrderHistoryView = { ...order };
            return this.getOrderDetailsWithTracking(order?.code ?? '').pipe(
              map((orderDetail: OrderView | undefined) => {
                /** filling extra fields ---> */
                orderView.returnable = orderDetail?.returnable;
                orderView.totalItems = orderDetail?.totalItems;
                orderView.entries = orderDetail?.entries;
                orderView.consignments = orderDetail?.consignments;
                orderView.unconsignedEntries = orderDetail?.unconsignedEntries;
                orderView.returnRequests = [];
                /** filling extra fields <--- */
                orderListView.orders?.push(orderView);
                return orderListView;
              })
            );
          }
        );
        if (requests.length === 0) {
          // in case of no order
          requests.push(of(orderListView));
        }
        return combineLatest(requests);
      }),
      map((requests: OrderHistoryListView[] | undefined) => {
        if (requests !== undefined) {
          return requests[0];
        } else {
          return {};
        }
      })
    );
  }

  getOrderHistoryList(
    pageSize: number
  ): Observable<OrderHistoryListView | undefined> {
    const orderHistoryListRequest =
      this.getOrderHistoryListWithDetails(pageSize);
    const returnRequestListRequest =
      this.orderReturnRequestService.getOrderReturnRequestList();
    return combineLatest([
      orderHistoryListRequest,
      returnRequestListRequest,
    ]).pipe(
      switchMap(
        (
          responses: [
            OrderHistoryListView | undefined,
            ReturnRequestList | undefined
          ]
        ) => {
          const returnRequests = responses?.[1]?.returnRequests;
          const orderHistory = responses?.[0];
          if (returnRequests && orderHistory?.orders) {
            if (orderHistory.pagination?.totalResults === 0) {
              return of(orderHistory);
            }
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
        }
      )
    );
  }

  protected getOrderDetailsValue(code: string): Observable<Order> {
    return this.store
      .select(getOrderById(code))
      .pipe(filter((order) => Boolean(order)));
  }

  protected getOrderDetailsState(
    code: string
  ): Observable<StateUtils.LoaderState<Order>> {
    return this.store.select(getOrderByIdEntity(code));
  }

  protected loadOrderDetails(code: string) {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrderActions.LoadOrderById({
            userId,
            code,
          })
        ),
    });
  }

  getOrderDetails(code: string): Observable<Order> {
    const loading$ = this.getOrderDetailsState(code).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadOrderDetails(code);
        }
      })
    );
    return using(
      () => loading$.subscribe(),
      () => this.getOrderDetailsValue(code)
    );
  }

  protected getConsignmentTrackingValue(
    orderCode: string,
    consignmentCode: string
  ): Observable<ConsignmentTracking> {
    return this.store
      .select(getConsignmentTrackingById(orderCode, consignmentCode))
      .pipe(filter((tracking) => Boolean(tracking)));
  }

  protected getConsignmentTrackingState(
    orderCode: string,
    consignmentCode: string
  ): Observable<StateUtils.LoaderState<ConsignmentTracking>> {
    return this.store.select(
      getConsignmentTrackingByIdEntity(orderCode, consignmentCode)
    );
  }

  protected loadConsignmentTracking(
    orderCode: string,
    consignmentCode: string
  ) {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrderActions.LoadConsignmentTrackingById({
            orderCode,
            consignmentCode,
            userId,
          })
        ),
    });
  }

  getConsignmentTracking(
    orderCode: string,
    consignmentCode: string
  ): Observable<ConsignmentTracking> {
    const loading$ = this.getConsignmentTrackingState(
      orderCode,
      consignmentCode
    ).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadConsignmentTracking(orderCode, consignmentCode);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getConsignmentTrackingValue(orderCode, consignmentCode)
    );
  }
}
