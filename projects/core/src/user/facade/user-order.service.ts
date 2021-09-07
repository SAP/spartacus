import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';
import {
  CancellationRequestEntryInputList,
  Order,
  OrderHistoryList,
} from '../../model/order.model';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { RoutingService } from '../../routing/facade/routing.service';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { CANCEL_ORDER_PROCESS_ID, StateWithUser } from '../store/user-state';

/**
 * @deprecated since 4.2 - use OrderFacade in @spartacus/order/root instead
 * TODO: In order lib, processStateStore is added in OrderService's constructor,
 * need to update it in 5.0 migration doc.
 */
@Injectable({
  providedIn: 'root',
})
export class UserOrderService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(UsersSelectors.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param orderCode an order code
   */
  loadOrderDetails(orderCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.LoadOrderDetails({
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
    this.store.dispatch(new UserActions.ClearOrderDetails());
  }

  /**
   * Returns order history list
   */
  getOrderHistoryList(pageSize: number): Observable<OrderHistoryList> {
    return this.store.pipe(
      select(UsersSelectors.getOrdersState),
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
    return this.store.pipe(select(UsersSelectors.getOrdersLoaded));
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
        let replenishmentOrderCode: string;

        this.routingService
          .getRouterState()
          .pipe(take(1))
          .subscribe((data) => {
            replenishmentOrderCode =
              data?.state?.params?.replenishmentOrderCode;
          })
          .unsubscribe();

        this.store.dispatch(
          new UserActions.LoadUserOrders({
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
    this.store.dispatch(new UserActions.ClearUserOrders());
  }

  /**
   *  Returns a consignment tracking detail
   */
  getConsignmentTracking(): Observable<ConsignmentTracking> {
    return this.store.pipe(select(UsersSelectors.getConsignmentTracking));
  }

  /**
   * Retrieves consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  loadConsignmentTracking(orderCode: string, consignmentCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new UserActions.LoadConsignmentTracking({
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
    this.store.dispatch(new UserActions.ClearConsignmentTracking());
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
        new UserActions.CancelOrder({
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
    return this.store.pipe(
      select(getProcessLoadingFactory(CANCEL_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the cancel order success flag
   */
  getCancelOrderSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(CANCEL_ORDER_PROCESS_ID))
    );
  }

  /**
   * Resets the cancel order process flags
   */
  resetCancelOrderProcessState(): void {
    return this.store.dispatch(new UserActions.ResetCancelOrderProcess());
  }
}
