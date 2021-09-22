import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CancellationRequestEntryInputList,
  Order,
  OrderHistoryList,
  ProcessSelectors,
  RoutingService,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { ConsignmentTracking, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import { CANCEL_ORDER_PROCESS_ID, StateWithOrder } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';

@Injectable()
export class OrderService implements OrderFacade {
  constructor(
    protected store: Store<StateWithOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(OrderSelectors.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param orderCode an order code
   */
  loadOrderDetails(orderCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.LoadOrderDetails({
          userId,
          orderCode,
        })
      );
    });
  }

  /**
   * Clears order's details
   */
  clearOrderDetails(): void {
    this.store.dispatch(new OrderActions.ClearOrderDetails());
  }

  /**
   * Returns order history list
   */
  getOrderHistoryList(
    pageSize: number
  ): Observable<OrderHistoryList | undefined> {
    return this.store.pipe(
      select(OrderSelectors.getOrdersState),
      tap((orderListState) => {
        const attemptedLoad =
          orderListState.loading ||
          orderListState.success ||
          orderListState.error;
        if (!attemptedLoad) {
          this.loadOrderList(pageSize);
        }
      }),
      map((orderListState) => orderListState.value)
    );
  }

  /**
   * Returns a loaded flag for order history list
   */
  getOrderHistoryListLoaded(): Observable<boolean> {
    return this.store.pipe(select(OrderSelectors.getOrdersLoaded));
  }

  /**
   * Retrieves an order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderList(pageSize: number, currentPage?: number, sort?: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        let replenishmentOrderCode: string | undefined;

        this.routingService
          .getRouterState()
          .pipe(take(1))
          .subscribe((data) => {
            replenishmentOrderCode =
              data?.state?.params?.replenishmentOrderCode;
          })
          .unsubscribe();

        this.store.dispatch(
          new OrderActions.LoadUserOrders({
            userId,
            pageSize,
            currentPage,
            sort,
            replenishmentOrderCode,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new OrderActions.ClearUserOrders());
  }

  /**
   *  Returns a consignment tracking detail
   */
  getConsignmentTracking(): Observable<ConsignmentTracking> {
    return this.store.pipe(select(OrderSelectors.getConsignmentTracking));
  }

  /**
   * Retrieves consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  loadConsignmentTracking(orderCode: string, consignmentCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.LoadConsignmentTracking({
          userId,
          orderCode,
          consignmentCode,
        })
      );
    });
  }

  /**
   * Cleaning consignment tracking
   */
  clearConsignmentTracking(): void {
    this.store.dispatch(new OrderActions.ClearConsignmentTracking());
  }

  /*
   * Cancel an order
   */
  cancelOrder(
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.CancelOrder({
          userId,
          orderCode,
          cancelRequestInput,
        })
      );
    });
  }

  /**
   * Returns the cancel order loading flag
   */
  getCancelOrderLoading(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessLoadingFactory(CANCEL_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the cancel order success flag
   */
  getCancelOrderSuccess(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessSuccessFactory(CANCEL_ORDER_PROCESS_ID))
    );
  }

  /**
   * Resets the cancel order process flags
   */
  resetCancelOrderProcessState(): void {
    return this.store.dispatch(new OrderActions.ResetCancelOrderProcess());
  }
}
