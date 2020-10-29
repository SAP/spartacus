import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { Order } from '../../model/order.model';
import {
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../model/replenishment-order.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process-group.selectors';
import { CheckoutActions } from '../store/actions/index';
import {
  PLACED_ORDER_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Places an order
   */
  placeOrder(termsChecked: boolean): void {
    if (this.actionAllowed()) {
      let userId;
      this.userIdService
        .getUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .subscribe((activeCartId) => (cartId = activeCartId))
        .unsubscribe();

      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.PlaceOrder({
            userId,
            cartId,
            termsChecked,
          })
        );
      }
    }
  }

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

    this.userIdService.invokeWithUserId((userId) => {
      if (
        Boolean(cartId) &&
        Boolean(userId) &&
        userId !== OCC_USER_ID_ANONYMOUS
      ) {
        this.checkoutStore.dispatch(
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
   * Returns the place or schedule replenishment order's loading flag
   */
  getPlaceOrderLoading(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(getProcessLoadingFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the place or schedule replenishment order's success flag
   */
  getPlaceOrderSuccess(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(getProcessSuccessFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the place or schedule replenishment order's error flag
   */
  getPlaceOrderError(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(getProcessErrorFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Resets the place or schedule replenishment order's processing state
   */
  clearPlaceOrderState(): void {
    this.checkoutStore.dispatch(new CheckoutActions.ClearPlaceOrder());
  }

  /**
   * Clear checkout data
   */
  clearCheckoutData(): void {
    this.checkoutStore.dispatch(new CheckoutActions.ClearCheckoutData());
  }

  /**
   * Clear checkout step
   * @param stepNumber : the step number to be cleared
   */
  clearCheckoutStep(stepNumber: number): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ClearCheckoutStep(stepNumber)
    );
  }

  /**
   * Load checkout details data
   * @param cartId : string Cart ID of loaded cart
   */
  loadCheckoutDetails(cartId: string) {
    let userId;
    this.userIdService
      .getUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    if (userId) {
      this.checkoutStore.dispatch(
        new CheckoutActions.LoadCheckoutDetails({
          userId,
          cartId,
        })
      );
    }
  }

  /**
   * Get status of checkout details loaded
   */
  getCheckoutDetailsLoaded(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCheckoutDetailsLoaded)
    );
  }

  /**
   * Check if checkout details are stable (no longer loading)
   */
  getCheckoutDetailsStable(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCheckoutDetailsStable)
    );
  }

  /**
   * Get order details
   */
  getOrderDetails(): Observable<Order | ReplenishmentOrder> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCheckoutOrderDetails)
    );
  }

  /**
   * Set checkout order type
   * @param orderType : an enum of types of order we are placing
   */
  setOrderType(orderType: ORDER_TYPE): void {
    this.checkoutStore.dispatch(new CheckoutActions.SetOrderType(orderType));
  }

  /**
   * Get current checkout order type
   */
  getCurrentOrderType(): Observable<ORDER_TYPE> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSelectedOrderType)
    );
  }

  protected actionAllowed(): boolean {
    let userId;
    this.userIdService
      .getUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return (
      (userId && userId !== OCC_USER_ID_ANONYMOUS) ||
      this.activeCartService.isGuestCart()
    );
  }
}
