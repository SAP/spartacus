import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ANONYMOUS_USERID, CartDataService } from '../../cart/index';
import { CardType, PaymentDetails } from '../../model/cart.model';
import * as fromCheckoutStore from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentService {
  constructor(
    protected checkoutStore: Store<fromCheckoutStore.StateWithCheckout>,
    protected cartData: CartDataService
  ) {}

  /**
   * Get card types
   */
  getCardTypes(): Observable<CardType[]> {
    return this.checkoutStore.pipe(select(fromCheckoutStore.getAllCardTypes));
  }

  /**
   * Get payment details
   */
  getPaymentDetails(): Observable<PaymentDetails> {
    return this.checkoutStore.pipe(select(fromCheckoutStore.getPaymentDetails));
  }

  /**
   * Load the supported card types
   */
  loadSupportedCardTypes(): void {
    this.checkoutStore.dispatch(new fromCheckoutStore.LoadCardTypes());
  }

  /**
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  createPaymentDetails(paymentDetails: PaymentDetails): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.CreatePaymentDetails({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          paymentDetails,
        })
      );
    }
  }

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  setPaymentDetails(paymentDetails: PaymentDetails): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.SetPaymentDetails({
          userId: this.cartData.userId,
          cartId: this.cartData.cart.code,
          paymentDetails: paymentDetails,
        })
      );
    }
  }

  protected actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
