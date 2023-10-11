/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { Observable, of, using, combineLatest, BehaviorSubject } from 'rxjs';
import { auditTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { OrderHistoryConnector } from '../connectors';
import { OrderActions, OrderSelectors, StateWithOrder } from '../store';
import {
  getOrderById,
  getOrderByIdState,
} from '../store/selectors/order-by-id.selector';
import {
  getConsignmentTrackingById,
  getConsignmentTrackingByIdState,
} from '../store/selectors/order-group.selectors';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';

@Injectable()
export class OrderHistoryExtendedService
  {
  protected orderReturnRequestService = inject(OrderReturnRequestService);
  protected orderHistoryConnector = inject(OrderHistoryConnector);
  protected store = inject(Store<StateWithOrder>);
  protected userIdService = inject(UserIdService);
  protected orderHitsoryService = inject(OrderHistoryService);
  public loaded$ = new BehaviorSubject<boolean>(false);
constructor(){
  //this.loaded$.next(false);
}
// getLoading(): Observable<boolean> {
// return this.loaded$;
// }

loadOrderList(pageSize: number, currentPage?: number, sort?: string): void
{
  this.loaded$.next(false);
  this.orderHitsoryService.loadOrderList(pageSize,currentPage,sort);
}
  getOrderDetailsWithTracking(
    orderCode: string
  ): Observable<OrderView | undefined> {
    return this.getOrderDetails(orderCode).pipe(
      switchMap((order: Order) => {
        //-----------------> filling consignment tracking
        let orderView: OrderView = { ...order };
        orderView.consignments = [];
        const requests = (order.consignments ?? []).map(
          (consignment: Consignment) => {
            let consignmentView: ConsignmentView = { ...consignment };
            if (consignment.code && consignment.trackingID) {
              return this.getConsignmentTracking(order?.code ?? '',consignment.code)
                .pipe(
                  map((trackingInfo: ConsignmentTracking) => {
                    consignmentView.tracking = trackingInfo;
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

  getOrderListWithDetails(
    pageSize: number
  ): Observable<OrderHistoryListView | undefined> {
    let orderListView: OrderHistoryListView = {};
    return this.orderHitsoryService.getOrderHistoryList(pageSize).pipe(
      switchMap((orderList: OrderHistoryList | undefined) => {
        orderListView.pagination = orderList?.pagination;
        orderListView.sorts = orderList?.sorts;
        orderListView.orders = [];
        const requests = (orderList?.orders ?? []).map(
          (order: OrderHistory) => {
            let orderView: OrderHistoryView = { ...order };
            return this.getOrderDetailsWithTracking(order?.code ?? '').pipe(
              map((orderDetail: OrderView | undefined) => {
                /** filling extra fields ---> */
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
    const orderHistoryListRequest = this.getOrderListWithDetails(pageSize);
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
            console.log(returnRequests);
            return orderHistory.orders.map((order) => {
              const returnItems = returnRequests?.filter(
                (returnItem) => returnItem.order?.code === order.code
              );
              if (returnItems) {
                order.returnRequests = returnItems;
              }
              // this.loaded$.next(true);
              return orderHistory;
            });
          } else {
            // this.loaded$.next(true);
            return of(orderHistory);
          }
        }
      )
    );
  }


  // ORDER DETAILS
  private getOrderDetailsValue(code: string): Observable<Order> {
    return this.store
      .select(getOrderById(code))
      .pipe(filter((order) => Boolean(order)));
  }

  private getOrderDetailsState(
    code: string
  ): Observable<StateUtils.LoaderState<Order>> {
    return this.store.select(getOrderByIdState(code));
  }

  private loadOrderDetails(code: string) {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrderActions.LoadOrderByID({
            userId,
            code,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
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

  getOrderDetailsLoading(code: string): Observable<boolean>
  {
    return this.store.select(OrderSelectors.getOrderByIdLoading(code));
  }

  getOrderDetailsSuccess(code: string): Observable<boolean>
  {
    return this.store.select(OrderSelectors.getOrderByIdSuccess(code));
  }

  // CONSIGNMENT TRACKING
  private getConsignmentTrackingValue(
    orderCode: string,
    consignmentCode: string
  ): Observable<ConsignmentTracking> {
    return this.store
      .select(getConsignmentTrackingById(orderCode, consignmentCode))
      .pipe(filter((tracking) => Boolean(tracking)));
  }

  private getConsignmentTrackingState(
    orderCode: string,
    consignmentCode: string
  ): Observable<StateUtils.LoaderState<ConsignmentTracking>> {
    return this.store.select(
      getConsignmentTrackingByIdState(orderCode, consignmentCode)
    );
  }

  private loadConsignmentTracking(orderCode: string, consignmentCode: string) {
    this.userIdService.takeUserId(true).subscribe({
      next: (userId) =>
        this.store.dispatch(
          new OrderActions.LoadConsignmentTrackingByID({
            orderCode,
            consignmentCode,
            userId,
          })
        ),
      error: () => {
        // TODO: for future releases, refactor this part to thrown errors
      },
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
      () =>
        this.getConsignmentTrackingValue(orderCode, consignmentCode)
    );
  }
  getConsignmentTrackingLoading(orderCode: string,
    consignmentCode: string): Observable<boolean>
  {
    return this.store.select(OrderSelectors.getConsignmentTrackingByIdLoading( orderCode, consignmentCode));
  }

  getConsignmentTrackingSuccess(orderCode: string,
    consignmentCode: string): Observable<boolean>
  {
    return this.store.select(OrderSelectors.getConsignmentTrackingByIdSuccess(orderCode, consignmentCode));
  }
}
