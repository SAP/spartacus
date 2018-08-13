import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../store/';
import * as fromUserStore from '../../user/store';

import {
  CartDataService,
  ANONYMOUS_USERID
} from '../../cart/services/cart-data.service';

@Injectable()
export class CheckoutService {
  orderDetails: any;

  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private userStore: Store<fromUserStore.UserState>,
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
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(new fromCheckoutStore.LoadCardTypes());
    }
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
          address: address
        })
      );
    }
  }

  loadUserAddresses() {
    if (this.actionAllowed()) {
      this.userStore.dispatch(
        new fromUserStore.LoadUserAddresses(this.cartData.userId)
      );
    }
  }

  setDeliveryAddress(address) {
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

  loadUserPaymentMethods() {
    if (this.actionAllowed()) {
      this.userStore.dispatch(
        new fromUserStore.LoadUserPaymentMethods(this.cartData.userId)
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

  private actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
