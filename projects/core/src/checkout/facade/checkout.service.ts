import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ANONYMOUS_USERID,
  CartDataService,
} from '../../cart/facade/cart-data.service';
import { Order } from '../../model/order.model';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout, SET_DELIVERY_ADDRESS_PROCESS_ID, SET_DELIVERY_MODE_PROCESS_ID, SET_PAYMENT_DETAILS_PROCESS_ID } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';
import { getProcessSuccessFactory, getProcessErrorFactory, getProcessLoadingFactory } from '../../process/store/selectors/process.selectors';
import { StateWithProcess } from '../../process/store/process-state';

@Injectable()
export class CheckoutService {
  constructor(
    protected store: Store<StateWithCheckout | StateWithProcess<void>>,
    protected cartData: CartDataService
  ) {}

  /**
   * Places an order
   */
  placeOrder(): void {
    if (this.actionAllowed()) {
      this.store.dispatch(
        new CheckoutActions.PlaceOrder({
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
    this.store.dispatch(new CheckoutActions.ClearCheckoutData());
  }

  /**
   * Clear checkout step
   * @param stepNumber : the step number to be cleared
   */
  clearCheckoutStep(stepNumber: number): void {
    this.store.dispatch(
      new CheckoutActions.ClearCheckoutStep(stepNumber)
    );
  }

  loadCheckoutDetails(cartId: string) {
    this.store.dispatch(
      new CheckoutActions.LoadCheckoutDetails({
        userId: this.cartData.userId,
        cartId,
      })
    );
  }

  getCheckoutDetailsLoaded(): Observable<boolean> {
    return this.store.pipe(
      select(CheckoutSelectors.getCheckoutDetailsLoaded)
    );
  }

  getSetDeliveryAddressResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(SET_DELIVERY_ADDRESS_PROCESS_ID))
    );
  }

  getSetDeliveryAddressResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(SET_DELIVERY_ADDRESS_PROCESS_ID))
    );
  }

  getSetDeliveryAddressResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(SET_DELIVERY_ADDRESS_PROCESS_ID))
    );
  }

  resetSetDeliveryAddressProcess(): void {
    this.store.dispatch(new CheckoutActions.ResetSetDeliveryAddressProcess());
  }

  getSetDeliveryModeResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(SET_DELIVERY_MODE_PROCESS_ID))
    );
  }

  getSetDeliveryModeResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(SET_DELIVERY_MODE_PROCESS_ID))
    );
  }

  getSetDeliveryModeResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(SET_DELIVERY_MODE_PROCESS_ID))
    );
  }

  resetSetDeliveryModeProcess(): void {
    this.store.dispatch(new CheckoutActions.ResetSetDeliveryModeProcess());
  }

  getSetPaymentDetailsResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(SET_PAYMENT_DETAILS_PROCESS_ID))
    );
  }

  getSetPaymentDetailsResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(SET_PAYMENT_DETAILS_PROCESS_ID))
    );
  }

  getSetPaymentDetailsResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(SET_PAYMENT_DETAILS_PROCESS_ID))
    );
  }

  resetSetPaymentDetailsProcess(): void {
    this.store.dispatch(new CheckoutActions.ResetSetPaymentDetailsProcess());
  }

  /**
   * Get order details
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(
      select(CheckoutSelectors.getCheckoutOrderDetails)
    );
  }

  protected actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
