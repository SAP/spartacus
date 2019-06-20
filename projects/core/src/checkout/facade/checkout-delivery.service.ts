import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ANONYMOUS_USERID, CartDataService } from '../../cart/index';
import { Address, AddressValidation } from '../../model/address.model';
import { DeliveryMode } from '../../model/order.model';
import * as fromCheckoutActions from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected cartData: CartDataService
  ) {}

  /**
   * Get supported delivery modes
   */
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSupportedDeliveryModes)
    );
  }

  /**
   * Get selected delivery mode
   */
  getSelectedDeliveryMode(): Observable<DeliveryMode> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSelectedDeliveryMode)
    );
  }

  /**
   * Get selected delivery mode code
   */
  getSelectedDeliveryModeCode(): Observable<string> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSelectedDeliveryModeCode)
    );
  }

  /**
   * Get delivery address
   */
  getDeliveryAddress(): Observable<Address> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getDeliveryAddress)
    );
  }

  /**
   * Get address verification results
   */
  getAddressVerificationResults(): Observable<AddressValidation | string> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getAddressVerificationResults),
      filter(results => Object.keys(results).length !== 0)
    );
  }

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  createAndSetAddress(address: Address): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutActions.AddDeliveryAddress({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          address: address,
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
        new fromCheckoutActions.LoadSupportedDeliveryModes({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
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
        new fromCheckoutActions.SetDeliveryMode({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          selectedModeId: mode,
        })
      );
    }
  }

  /**
   * Verifies the address
   * @param address : the address to be verified
   */
  verifyAddress(address: Address): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutActions.VerifyAddress({
          userId: this.cartData.userId,
          address,
        })
      );
    }
  }

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  setDeliveryAddress(address: Address): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new fromCheckoutActions.SetDeliveryAddress({
          userId: this.cartData.userId,
          cartId: this.cartData.cart.code,
          address: address,
        })
      );
    }
  }

  /**
   * Clear address verification results
   */
  clearAddressVerificationResults(): void {
    this.checkoutStore.dispatch(
      new fromCheckoutActions.ClearAddressVerificationResults()
    );
  }

  protected actionAllowed(): boolean {
    return this.cartData.userId !== ANONYMOUS_USERID;
  }
}
