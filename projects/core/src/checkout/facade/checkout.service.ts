import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { filter } from 'rxjs/operators';

import { Observable } from 'rxjs';

import * as fromCheckoutStore from '../store/';
import {
  PaymentDetails,
  CardType,
  Order,
  DeliveryMode,
  AddressValidation
} from '../../occ/occ-models';
import { CheckoutAddress } from '../';
import { CartDataService, ANONYMOUS_USERID } from '../../cart';

@Injectable()
export class CheckoutService {
  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private cartData: CartDataService
  ) {}

  /**
   * Get supported delivery modes
   */
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getSupportedDeliveryModes)
    );
  }

  /**
   * Get selected delivery mode
   */
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getSelectedDeliveryMode)
    );
  }

  /**
   * Get selected delivery mode code
   */
  getSelectedDeliveryModeCode(): Observable<any> {
    return this.checkoutStore.pipe(select(fromCheckoutStore.getSelectedCode));
  }

  /**
   * Get card types
   */
  getCardTypes(): Observable<CardType[]> {
    return this.checkoutStore.pipe(select(fromCheckoutStore.getAllCardTypes));
  }

  /**
   * Get delivery address
   */
  getDeliveryAddress(): Observable<CheckoutAddress> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getDeliveryAddress)
    );
  }

  /**
   * Get address verification results
   */
  getAddressVerificationResults(): Observable<AddressValidation> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getAddressVerificationResults),
      filter(results => Object.keys(results).length !== 0)
    );
  }

  /**
   * Get payment details
   */
  getPaymentDetails(): Observable<PaymentDetails> {
    return this.checkoutStore.pipe(select(fromCheckoutStore.getPaymentDetails));
  }

  /**
   * Get order details
   */
  getOrderDetails(): Observable<Order> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getCheckoutOrderDetails)
    );
  }

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  createAndSetAddress(address: CheckoutAddress): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.AddDeliveryAddress({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          address: address
        })
      );
    }
  }

  /**
   * Load supported delivery modes
   */
  loadSupportedDeliveryModes(): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.LoadSupportedDeliveryModes({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId
        })
      );
    }
  }

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  setDeliveryMode(mode: string): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.SetDeliveryMode({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          selectedModeId: mode
        })
      );
    }
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
          paymentDetails
        })
      );
    }
  }

  /**
   * Places an order
   */
  placeOrder(): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.PlaceOrder({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId
        })
      );
    }
  }

  /**
   * Verifies the address
   * @param address : the address to be verified
   */
  verifyAddress(address: CheckoutAddress): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.VerifyAddress({
          userId: this.cartData.userId,
          address
        })
      );
    }
  }

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  setDeliveryAddress(address: CheckoutAddress): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.SetDeliveryAddress({
          userId: this.cartData.userId,
          cartId: this.cartData.cart.code,
          address: address
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
          paymentDetails: paymentDetails
        })
      );
    }
  }

  /**
   * Clear address verification results
   */
  clearAddressVerificationResults(): void {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.ClearAddressVerificationResults()
    );
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

  private actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
