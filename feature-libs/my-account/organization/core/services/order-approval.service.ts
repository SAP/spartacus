import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AuthService,
  EntitiesModel,
  ProcessSelectors,
  SearchConfig,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, pluck, take, tap } from 'rxjs/operators';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../model/order-approval.model';
import { OrderApprovalActions } from '../store/actions/index';
import {
  ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID,
  StateWithOrganization,
} from '../store/organization-state';
import { OrderApprovalSelectors } from '../store/selectors';

@Injectable({ providedIn: 'root' })
export class OrderApprovalService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadOrderApproval(orderApprovalCode: string): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrderApprovalActions.LoadOrderApproval({
          userId,
          orderApprovalCode,
        })
      )
    );
  }

  loadOrderApprovals(params?: SearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrderApprovalActions.LoadOrderApprovals({ userId, params })
      )
    );
  }

  private getOrderApproval(
    orderApprovalCode: string
  ): Observable<StateUtils.LoaderState<OrderApproval>> {
    return this.store.select(
      OrderApprovalSelectors.getOrderApproval(orderApprovalCode)
    );
  }

  private getOrderApprovalList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<OrderApproval>>> {
    return this.store.select(
      OrderApprovalSelectors.getOrderApprovalList(params)
    );
  }

  get(orderApprovalCode: string): Observable<OrderApproval> {
    return this.getOrderApproval(orderApprovalCode).pipe(
      observeOn(queueScheduler),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.loadOrderApproval(orderApprovalCode);
        }
      }),
      filter((state) => state.success || state.error),
      map((state) => state.value)
    );
  }

  /**
   * Emits true if a request is currently fetching order approval data from
   * the server.
   *
   * @param orderApprovalCode The approval code for which we want the loading status.
   */
  getOrderApprovalLoading(orderApprovalCode: string): Observable<boolean> {
    return this.getOrderApproval(orderApprovalCode).pipe(pluck('loading'));
  }

  getList(params: SearchConfig): Observable<EntitiesModel<OrderApproval>> {
    return this.getOrderApprovalList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<OrderApproval>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrderApprovals(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<OrderApproval>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  makeDecision(
    orderApprovalCode: string,
    orderApprovalDecision: OrderApprovalDecision
  ): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrderApprovalActions.MakeDecision({
          userId,
          orderApprovalCode,
          orderApprovalDecision,
        })
      )
    );
  }

  /**
   * Returns the makeDecision loading flag.  Returns true when the process triggered
   * by makeDecision() is currently running.
   */
  getMakeDecisionResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(
          ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID
        )
      )
    );
  }

  /**
   * Returns the makeDecision failure outcome.  Returns true when the outcome
   * of makeDecision() was an error.
   */
  getMakeDecisionResultError(): Observable<boolean> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessErrorFactory(
          ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID
        )
      )
    );
  }

  /**
   * Returns the makeDecision process success outcome.  Returns true when the outcome
   * of makeDecision() was a success.
   */
  getMakeDecisionResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessSuccessFactory(
          ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID
        )
      )
    );
  }

  /**
   * Resets the makeDecision process state. It is usually preferable to reset the
   * process state before making a call to makeDecision() for which we then want
   * to monitor the loading state or the outcome.
   */
  resetMakeDecisionProcessState(): void {
    this.store.dispatch(new OrderApprovalActions.MakeDecisionReset());
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
