import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  EntitiesModel,
  ProcessSelectors,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../model/order-approval.model';
import { OrderApprovalActions } from '../store/actions/index';
import {
  OrderHistoryState,
  ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID,
} from '../store/order-approval-state';
import { OrderApprovalSelectors } from '../store/selectors';

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  RoutingService,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import {
  CancellationRequestEntryInputList,
  ConsignmentTracking,
  Order,
  OrderHistoryFacade,
  OrderHistoryList,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import { CANCEL_ORDER_PROCESS_ID, StateWithOrder } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';

@Injectable()
export class OrderHistoryService  {
  constructor(
    protected store: Store<OrderHistoryState | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  constructor(
    protected store: Store<StateWithOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected routingService: RoutingService
  ) {}

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
}

