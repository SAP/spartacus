import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../model/replenishment-order.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { CheckoutActions } from '../store/actions/index';
import {
  SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutReplenishmentOrderService {
  constructor(
    protected store: Store<StateWithCheckout | StateWithProcess<void>>,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Schedule a replenishment order
   */
  scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): void {
    let cartId;

    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => (cartId = activeCartId));

    this.authService.invokeWithUserId((userId) => {
      if (
        Boolean(cartId) &&
        Boolean(userId) &&
        userId !== OCC_USER_ID_ANONYMOUS
      ) {
        this.store.dispatch(
          new CheckoutActions.ScheduleReplenishmentOrder({
            cartId,
            scheduleReplenishmentForm,
            termsChecked,
            userId,
          })
        );
      }
    });
  }

  /**
   * Get replenishment order details
   */
  getReplenishmentOrderDetails(): Observable<ReplenishmentOrder> {
    return this.store.pipe(
      select(CheckoutSelectors.getCheckoutReplenishmentOrderDetails)
    );
  }

  /**
   * Returns the schedule replenishment order's loading flag
   */
  getScheduleReplenishmentOrderLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the schedule replenishment order's success flag
   */
  getScheduleReplenishmentOrderSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the schedule replenishment order's error flag
   */
  getScheduleReplenishmentOrderError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(SCHEDULE_REPLENISHMENT_ORDER_PROCESS_ID))
    );
  }

  /**
   * Resets the schedule replenishment order's processing state
   */
  clearScheduleReplenishmentOrderState(): void {
    this.store.dispatch(
      new CheckoutActions.ClearScheduleReplenishmentOrderAction()
    );
  }
}
