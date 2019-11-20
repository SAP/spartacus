import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { ConsignmentTracking } from '../../model/consignment-tracking.model';
import {
  Order,
  OrderHistoryList,
  ReturnRequestEntryInputList,
  ReturnRequest,
} from '../../model/order.model';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class OrderReturnRequestService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService?: AuthService
  ) {}

  /**
   * Create order return request
   * @param orderCode an order code
   * @param returnRequestInput order return request entry input
   */
  createOrderReturnRequest(
    orderCode: string,
    returnRequestInput: ReturnRequestEntryInputList
  ): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId =>
        this.store.dispatch(
          new UserActions.CreateOrderReturnRequest({
            userId,
            orderCode,
            returnRequestInput,
          })
        )
      )
      .unsubscribe();
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
  getOrderReturnRequestList(pageSize: number): Observable<OrderHistoryList> {
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
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.LoadOrderReturnRequestList({
            userId: occUserId,
            pageSize: pageSize,
            currentPage: currentPage,
            sort: sort,
          })
        )
      )
      .unsubscribe();
  }
}
