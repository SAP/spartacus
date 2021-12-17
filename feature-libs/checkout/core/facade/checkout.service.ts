import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  OCC_USER_ID_ANONYMOUS,
  Order,
  ORDER_TYPE,
  ProcessSelectors,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutActions } from '../store/actions/index';
import {
  PLACED_ORDER_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutService implements CheckoutFacade {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService
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
    let cartId: string;

    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => (cartId = activeCartId));

    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        if (Boolean(cartId) && Boolean(userId)) {
          this.checkoutStore.dispatch(
            new CheckoutActions.ScheduleReplenishmentOrder({
              cartId,
              scheduleReplenishmentForm,
              termsChecked,
              userId,
            })
          );
        }
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Returns the place or schedule replenishment order's loading flag
   */
  getPlaceOrderLoading(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessLoadingFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the place or schedule replenishment order's success flag
   */
  getPlaceOrderSuccess(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessSuccessFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the place or schedule replenishment order's error flag
   */
  getPlaceOrderError(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessErrorFactory(PLACED_ORDER_PROCESS_ID))
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
  isLoading(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCheckoutLoading)
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
