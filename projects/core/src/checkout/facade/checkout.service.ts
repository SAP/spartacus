import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { Order } from '../../model/order.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Places an order
   */
  placeOrder(): void {
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
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
          })
        );
      }
    }
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
    this.authService
      .getOccUserId()
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
   * Get order details
   */
  getOrderDetails(): Observable<Order> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCheckoutOrderDetails)
    );
  }

  protected actionAllowed(): boolean {
    let userId;
    this.authService
      .getOccUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return (
      (userId && userId !== OCC_USER_ID_ANONYMOUS) ||
      this.activeCartService.isGuestCart()
    );
  }
}
