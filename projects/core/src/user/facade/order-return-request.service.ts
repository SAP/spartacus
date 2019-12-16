import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import {
  ReturnRequestList,
  ReturnRequestEntryInputList,
  ReturnRequest,
  ReturnRequestModification,
} from '../../model/order.model';
import {
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { StateWithProcess } from '../../process/store/process-state';
import { CANCEL_RETURN_PROCESS_ID } from '../store/user-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';
import { OCC_USER_ID_CURRENT } from '../../occ/index';

@Injectable({
  providedIn: 'root',
})
export class OrderReturnRequestService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  /**
   * Create order return request
   * @param orderCode an order code
   * @param returnRequestInput order return request entry input
   */
  createOrderReturnRequest(
    returnRequestInput: ReturnRequestEntryInputList
  ): void {
    this.withUserId(userId => {
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
      tap(returnListState => {
        const attemptedLoad =
          returnListState.loading ||
          returnListState.success ||
          returnListState.error;
        if (!attemptedLoad) {
          this.loadOrderReturnRequestList(pageSize);
        }
      }),
      map(returnListState => returnListState.value)
    );
  }

  /**
   * Loads order return request detail
   * @param returnRequestCode
   */
  loadOrderReturnRequestDetail(returnRequestCode: string): void {
    this.withUserId(userId => {
      this.store.dispatch(
        new UserActions.LoadOrderReturnRequest({
          userId: userId,
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
    this.withUserId(userId => {
      this.store.dispatch(
        new UserActions.LoadOrderReturnRequestList({
          userId: userId,
          pageSize: pageSize,
          currentPage: currentPage,
          sort: sort,
        })
      );
    });
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
    this.withUserId(userId => {
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

  /*
   * Utility method to distinquish pre / post 1.3.0 in a convenient way.
   *
   */
  private withUserId(callback: (userId: string) => void): void {
    if (this.authService) {
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(userId => callback(userId));
    } else {
      // TODO(issue:#5628) Deprecated since 1.3.0
      callback(OCC_USER_ID_CURRENT);
    }
  }
}
