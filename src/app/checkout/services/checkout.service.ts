import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../store/';
import * as fromCartStore from '../../cart/store';
import * as fromUserStore from '../../user/store';

import { ANOYMOUS_USERID, CartService } from '../../cart/services/cart.service';

@Injectable()
export class CheckoutService {
  orderDetails: any;

  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private userStore: Store<fromUserStore.UserState>,
    private cartStore: Store<fromCartStore.CartState>,
    private cartService: CartService
  ) {}

  createAndSetAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.AddDeliveryAddress({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        address: address
      })
    );
  }

  loadCartDetails() {
    this.cartService.getDetails = true;

    this.cartStore.dispatch(
      new fromCartStore.LoadCart({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        details: true
      })
    );
  }

  loadSupportedDeliveryModes() {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.LoadSupportedDeliveryModes({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code
      })
    );
  }

  setDeliveryMode(mode: any) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetDeliveryMode({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        selectedModeId: mode
      })
    );
  }

  loadSupportedCardTypes() {
    this.checkoutStore.dispatch(new fromCheckoutStore.LoadCardTypes());
  }

  getPaymentDetails(paymentInfo) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.CreatePaymentDetails({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code,
        paymentDetails: paymentInfo
      })
    );
  }

  placeOrder() {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.PlaceOrder({
        userId: this.cartService.userId,
        cartId:
          this.cartService.userId === ANOYMOUS_USERID
            ? this.cartService.cart.guid
            : this.cartService.cart.code
      })
    );
  }

  verifyAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.VerifyAddress({
        userId: this.cartService.userId,
        address: address
      })
    );
  }

  loadUserAddresses() {
    this.userStore.dispatch(
      new fromUserStore.LoadUserAddresses(this.cartService.userId)
    );
  }

  setDeliveryAddress(address) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetDeliveryAddress({
        userId: this.cartService.userId,
        cartId: this.cartService.cart.code,
        address: address
      })
    );
  }

  loadUserPaymentMethods() {
    this.userStore.dispatch(
      new fromUserStore.LoadUserPaymentMethods(this.cartService.userId)
    );
  }

  setPaymentDetails(paymentDetails) {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.SetPaymentDetails({
        userId: this.cartService.userId,
        cartId: this.cartService.cart.code,
        paymentDetails: paymentDetails
      })
    );
  }
}
