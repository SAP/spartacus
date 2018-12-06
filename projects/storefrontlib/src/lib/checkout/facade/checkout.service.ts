import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { filter } from 'rxjs/operators';

import { Observable } from 'rxjs';

import * as fromCheckoutStore from '../store/';
import {
  CartDataService,
  ANONYMOUS_USERID
} from '../../cart/facade/cart-data.service';
import { Address, PaymentDetails, DeliveryMode } from '@spartacus/core';

@Injectable()
export class CheckoutService {
  readonly selectedDeliveryMode$: Observable<any> = this.checkoutStore.pipe(
    select(fromCheckoutStore.getSelectedDeliveryMode)
  );

  readonly selectedDeliveryModeCode$: Observable<any> = this.checkoutStore.pipe(
    select(fromCheckoutStore.getSelectedCode)
  );

  readonly cardTypes$: Observable<any> = this.checkoutStore.pipe(
    select(fromCheckoutStore.getAllCardTypes)
  );

  readonly deliveryAddress$: Observable<any> = this.checkoutStore.pipe(
    select(fromCheckoutStore.getDeliveryAddress)
  );

  readonly addressVerificationResults$: Observable<
    any
  > = this.checkoutStore.pipe(
    select(fromCheckoutStore.getAddressVerificationResults),
    filter(results => Object.keys(results).length !== 0)
  );

  readonly paymentDetails$: Observable<any> = this.checkoutStore.pipe(
    select(fromCheckoutStore.getPaymentDetails)
  );

  readonly orderDetails$: Observable<any> = this.checkoutStore.pipe(
    select(fromCheckoutStore.getOrderDetails)
  );

  constructor(
    private checkoutStore: Store<fromCheckoutStore.CheckoutState>,
    private cartData: CartDataService
  ) {}

  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutStore.pipe(
      select(fromCheckoutStore.getSupportedDeliveryModes)
    );
  }

  createAndSetAddress(address: Address): void {
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

  loadSupportedCardTypes(): void {
    this.checkoutStore.dispatch(new fromCheckoutStore.LoadCardTypes());
  }

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

  verifyAddress(address: Address): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutStore.VerifyAddress({
          userId: this.cartData.userId,
          address
        })
      );
    }
  }

  setDeliveryAddress(address: Address): void {
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

  clearAddressVerificationResults(): void {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.ClearAddressVerificationResults()
    );
  }

  clearCheckoutData(): void {
    this.checkoutStore.dispatch(new fromCheckoutStore.ClearCheckoutData());
  }

  clearCheckoutStep(stepNumber: number): void {
    this.checkoutStore.dispatch(
      new fromCheckoutStore.ClearCheckoutStep(stepNumber)
    );
  }

  private actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
