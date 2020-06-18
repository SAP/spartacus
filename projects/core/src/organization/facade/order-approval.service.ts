import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../../model/order-approval.model';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { B2BSearchConfig } from '../model/search-config';
import { OrderApprovalActions } from '../store/actions/index';
import { StateWithOrganization } from '../store/organization-state';

import {
  getOrderApprovalList,
  getOrderApproval,
} from '../store/selectors/order-approval.selector';

@Injectable()
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

  loadOrderApprovals(params?: B2BSearchConfig): void {
    this.withUserId((userId) =>
      this.store.dispatch(
        new OrderApprovalActions.LoadOrderApprovals({ userId, params })
      )
    );
  }

  private getOrderApproval(
    orderApprovalCode: string
  ): Observable<LoaderState<OrderApproval>> {
    return this.store.select(getOrderApproval(orderApprovalCode));
  }

  private getOrderApprovalList(
    params
  ): Observable<LoaderState<EntitiesModel<OrderApproval>>> {
    return this.store.select(getOrderApprovalList(params));
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

  getList(params: B2BSearchConfig): Observable<EntitiesModel<OrderApproval>> {
    return this.getOrderApprovalList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<OrderApproval>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrderApprovals(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<OrderApproval>>) =>
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

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe((userId) => callback(userId));
  }
}
