import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ANONYMOUS_USERID, CartDataService } from '../../cart/index';
import { Order } from '../../model/order.model';
import * as fromCheckoutActions from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected cartData: CartDataService
  ) {}

  /**
   * Places an order
   */
  placeOrder(): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutActions.PlaceOrder({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
        })
      );
    }
  }

  /**
   * Clear checkout data
   */
  clearCheckoutData(): void {
    this.checkoutStore.dispatch(new fromCheckoutActions.ClearCheckoutData());
  }

  /**
   * Clear checkout step
   * @param stepNumber : the step number to be cleared
   */
  clearCheckoutStep(stepNumber: number): void {
    this.checkoutStore.dispatch(
      new fromCheckoutActions.ClearCheckoutStep(stepNumber)
    );
  }

  loadCheckoutDetails(cartId: string) {
    this.checkoutStore.dispatch(
      new fromCheckoutActions.LoadCheckoutDetails({
        userId: this.cartData.userId,
        cartId,
      })
    );
  }

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
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
