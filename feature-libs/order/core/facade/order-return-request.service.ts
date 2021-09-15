import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { OrderReturnRequestFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import { CANCEL_RETURN_PROCESS_ID, StateWithOrder } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';

@Injectable()
export class OrderReturnRequestService implements OrderReturnRequestFacade {
  constructor(
    protected store: Store<StateWithOrder>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Create order return request
   * @param orderCode an order code
   * @param returnRequestInput order return request entry input
   */
  createOrderReturnRequest(
    returnRequestInput: ReturnRequestEntryInputList
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.CreateOrderReturnRequest({
          userId,
          returnRequestInput,
        })
      );
    });
  }

  /**
   * Return an order return request
   */
  getOrderReturnRequest(): Observable<ReturnRequest> {
    return this.store.pipe(select(OrderSelectors.getOrderReturnRequest));
  }

  /**
   * Gets order return request list
   */
  getOrderReturnRequestList(
    pageSize: number
  ): Observable<ReturnRequestList | undefined> {
    return this.store.pipe(
      select(OrderSelectors.getOrderReturnRequestListState),
      tap((returnListState) => {
        const attemptedLoad =
          returnListState.loading ||
          returnListState.success ||
          returnListState.error;
        if (!attemptedLoad) {
          this.loadOrderReturnRequestList(pageSize);
        }
      }),
      map((returnListState) => returnListState.value)
    );
  }

  /**
   * Loads order return request detail
   * @param returnRequestCode
   */
  loadOrderReturnRequestDetail(returnRequestCode: string): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.LoadOrderReturnRequest({
          userId,
          returnRequestCode,
        })
      );
    });
  }

  /**
   * Loads order return request list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderReturnRequestList(
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        this.store.dispatch(
          new OrderActions.LoadOrderReturnRequestList({
            userId,
            pageSize,
            currentPage,
            sort,
          })
        );
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Cleaning order return request list
   */
  clearOrderReturnRequestList(): void {
    this.store.dispatch(new OrderActions.ClearOrderReturnRequestList());
  }

  /**
   * Get the order return request loading flag
   */
  getReturnRequestLoading(): Observable<boolean> {
    return this.store.pipe(select(OrderSelectors.getOrderReturnRequestLoading));
  }

  /**
   * Get the order return request success flag
   */
  getReturnRequestSuccess(): Observable<boolean> {
    return this.store.pipe(select(OrderSelectors.getOrderReturnRequestSuccess));
  }

  /**
   * Cleaning order return request details
   */
  clearOrderReturnRequestDetail(): void {
    this.store.dispatch(new OrderActions.ClearOrderReturnRequest());
  }

  /*
   * Cancel order return request
   */
  cancelOrderReturnRequest(
    returnRequestCode: string,
    returnRequestModification: ReturnRequestModification
  ): void {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.store.dispatch(
        new OrderActions.CancelOrderReturnRequest({
          userId,
          returnRequestCode,
          returnRequestModification,
        })
      );
    });
  }

  /**
   * Returns the cancel return request loading flag
   */
  getCancelReturnRequestLoading(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(CANCEL_RETURN_PROCESS_ID)
      )
    );
  }

  /**
   * Returns the cancel return request success flag
   */
  getCancelReturnRequestSuccess(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(CANCEL_RETURN_PROCESS_ID)
      )
    );
  }

  /**
   * Resets the cancel return request process flags
   */
  resetCancelReturnRequestProcessState(): void {
    return this.store.dispatch(new OrderActions.ResetCancelReturnProcess());
  }
}
