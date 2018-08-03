import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../store/';
import * as fromUserStore from '../../user/store';

import { CartDataService } from '../../cart/services/cart-data.service';

@Injectable()
export class CheckoutService {
  orderDetails: any;

  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private userStore: Store<fromUserStore.UserState>,
    private cartData: CartDataService
  ) {}

  createAndSetAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.AddDeliveryAddress({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        address: address
      })
    );
  }

  loadSupportedDeliveryModes() {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.LoadSupportedDeliveryModes({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId
      })
    );
  }

  setDeliveryMode(mode: any) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetDeliveryMode({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        selectedModeId: mode
      })
    );
  }

  loadSupportedCardTypes() {
    this.checkoutStore.dispatch(new fromCheckoutStore.LoadCardTypes());
  }

  createPaymentDetails(paymentInfo) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.CreatePaymentDetails({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId,
        paymentDetails: paymentInfo
      })
    );
  }

  placeOrder() {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.PlaceOrder({
        userId: this.cartData.userId,
        cartId: this.cartData.cartId
      })
    );
  }

  verifyAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.VerifyAddress({
        userId: this.cartData.userId,
        address: address
      })
    );
  }

  loadUserAddresses() {
    this.userStore.dispatch(
      new fromUserStore.LoadUserAddresses(this.cartData.userId)
    );
  }

  setDeliveryAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetDeliveryAddress({
        userId: this.cartData.userId,
        cartId: this.cartData.cart.code,
        address: address
      })
    );
  }

  loadUserPaymentMethods() {
    this.userStore.dispatch(
      new fromUserStore.LoadUserPaymentMethods(this.cartData.userId)
    );
  }

  setPaymentDetails(paymentDetails) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetPaymentDetails({
        userId: this.cartData.userId,
        cartId: this.cartData.cart.code,
        paymentDetails: paymentDetails
      })
    );
  }
}
