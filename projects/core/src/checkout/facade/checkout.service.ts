import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ANONYMOUS_USERID, CartDataService } from '../../cart/index';
import * as fromSelector from '../../checkout/store/selectors/index';
import { Order } from '../../model/order.model';
import * as fromCheckoutStore from '../store/index';

@Injectable()
export class CheckoutService {
  constructor(
    protected checkoutStore: Store<fromCheckoutStore.StateWithCheckout>,
    protected cartData: CartDataService
  ) {}

  /**
   * Places an order
   */
  placeOrder(): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.PlaceOrder({
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
    this.checkoutStore.dispatch(new fromCheckoutStore.ClearCheckoutData());
  }

  /**
   * Clear checkout step
   * @param stepNumber : the step number to be cleared
   */
  clearCheckoutStep(stepNumber: number): void {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.ClearCheckoutStep(stepNumber)
    );
  }

  loadCheckoutDetails(cartId: string) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.LoadCheckoutDetails({
        userId: this.cartData.userId,
        cartId,
      })
    );
  }

  getCheckoutDetailsLoaded(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(fromSelector.getCheckoutDetailsLoaded)
    );
  }

  /**
   * Get order details
   */
  getOrderDetails(): Observable<Order> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getCheckoutOrderDetails)
    );
  }

  protected actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
