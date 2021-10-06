import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import {
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '../../model/order.model';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { CANCEL_RETURN_PROCESS_ID, StateWithUser } from '../store/user-state';

/**
 * @deprecated since 4.2 - use OrderReturnRequestFacade in @spartacus/order/root instead
 * TODO: In order lib, processStateStore is added in OrderReturnService's constructor,
 * need to update it in 5.0 migration doc.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderReturnRequestService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
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
        new UserActions.CreateOrderReturnRequest({
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
    return this.store.pipe(select(UsersSelectors.getOrderReturnRequest));
  }

  /**
   * Gets order return request list
   */
  getOrderReturnRequestList(pageSize: number): Observable<ReturnRequestList> {
    return this.store.pipe(
      select(UsersSelectors.getOrderReturnRequestListState),
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
        new UserActions.LoadOrderReturnRequest({
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
          new UserActions.LoadOrderReturnRequestList({
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
    this.store.dispatch(new UserActions.ClearOrderReturnRequestList());
  }

  /**
   * Get the order return request loading flag
   */
  getReturnRequestLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getOrderReturnRequestLoading));
  }

  /**
   * Get the order return request success flag
   */
  getReturnRequestSuccess(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getOrderReturnRequestSuccess));
  }

  /**
   * Cleaning order return request details
   */
  clearOrderReturnRequestDetail(): void {
    this.store.dispatch(new UserActions.ClearOrderReturnRequest());
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
        new UserActions.CancelOrderReturnRequest({
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
    return this.store.pipe(
      select(getProcessLoadingFactory(CANCEL_RETURN_PROCESS_ID))
    );
  }

  /**
   * Returns the cancel return request success flag
   */
  getCancelReturnRequestSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(CANCEL_RETURN_PROCESS_ID))
    );
  }

  /**
   * Resets the cancel return request process flags
   */
  resetCancelReturnRequestProcessState(): void {
    return this.store.dispatch(new UserActions.ResetCancelReturnProcess());
  }
}
