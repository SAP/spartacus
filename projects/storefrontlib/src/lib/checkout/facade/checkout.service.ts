import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { filter } from 'rxjs/operators';

import * as fromCheckoutStore from '../store/';
import {
  CartDataService,
  ANONYMOUS_USERID
} from '../../cart/facade/cart-data.service';
import { Address } from '@spartacus/core';

@Injectable()
export class CheckoutService {
  readonly supportedDeliveryModes$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getSupportedDeliveryModes)
  );

  readonly selectedDeliveryMode$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getSelectedDeliveryMode)
  );

  readonly selectedDeliveryModeCode$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getSelectedCode)
  );

  readonly cardTypes$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getAllCardTypes)
  );

  readonly deliveryAddress$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getDeliveryAddress)
  );

  readonly addressVerificationResults$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getAddressVerificationResults),
    filter(results => Object.keys(results).length !== 0)
  );

  readonly paymentDetails$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getPaymentDetails)
  );

  readonly orderDetails$ = this.checkoutStore.pipe(
    select(fromCheckoutStore.getOrderDetails)
  );

  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private cartData: CartDataService
  ) {}

  createAndSetAddress(address) {
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

  loadSupportedDeliveryModes() {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.LoadSupportedDeliveryModes({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId
        })
      );
    }
  }

  setDeliveryMode(mode: any) {
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

  loadSupportedCardTypes() {
    this.checkoutStore.dispatch(new fromCheckoutStore.LoadCardTypes());
  }

  createPaymentDetails(paymentInfo) {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.CreatePaymentDetails({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          paymentDetails: paymentInfo
        })
      );
    }
  }

  placeOrder() {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.PlaceOrder({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId
        })
      );
    }
  }

  verifyAddress(address) {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.VerifyAddress({
          userId: this.cartData.userId,
          address
        })
      );
    }
  }

  setDeliveryAddress(address: Address) {
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

  setPaymentDetails(paymentDetails) {
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

  clearAddressVerificationResults() {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.ClearAddressVerificationResults()
    );
  }

  clearCheckoutData() {
    this.checkoutStore.dispatch(new fromCheckoutStore.ClearCheckoutData());
  }

  clearCheckoutStep(stepNumber: number) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.ClearCheckoutStep(stepNumber)
    );
  }

  private actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
