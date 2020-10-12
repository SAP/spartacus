import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  filter,
  pluck,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { Address, AddressValidation } from '../../model/address.model';
import { DeliveryMode } from '../../model/order.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import { getProcessStateFactory } from '../../process/store/selectors/process-group.selectors';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { CheckoutActions } from '../store/actions/index';
import {
  SET_DELIVERY_ADDRESS_PROCESS_ID,
  SET_DELIVERY_MODE_PROCESS_ID,
  SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout | StateWithProcess<void>>,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Get supported delivery modes
   */
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSupportedDeliveryModes),
      withLatestFrom(
        this.checkoutStore.pipe(
          select(getProcessStateFactory(SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID))
        )
      ),
      tap(([, loadingState]) => {
        if (
          !(loadingState.loading || loadingState.success || loadingState.error)
        ) {
          this.loadSupportedDeliveryModes();
        }
      }),
      pluck(0),
      shareReplay({ bufferSize: 1, refCount: true })
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
   * Get status about successfully set Delivery Address
   */
  getSetDeliveryAddressProcess(): Observable<LoaderState<void>> {
    return this.checkoutStore.pipe(
      select(getProcessStateFactory(SET_DELIVERY_ADDRESS_PROCESS_ID))
    );
  }

  /**
   * Clear info about process of setting Delivery Address
   */
  resetSetDeliveryAddressProcess(): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ResetSetDeliveryAddressProcess()
    );
  }

  /**
   * Get status about of set Delivery Mode process
   */
  getSetDeliveryModeProcess(): Observable<LoaderState<void>> {
    return this.checkoutStore.pipe(
      select(getProcessStateFactory(SET_DELIVERY_MODE_PROCESS_ID))
    );
  }

  /**
   * Clear info about process of setting Delivery Mode
   */
  resetSetDeliveryModeProcess(): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ResetSetDeliveryModeProcess()
    );
  }

  /**
   * Clear info about process of setting Supported Delivery Modes
   */
  resetLoadSupportedDeliveryModesProcess(): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ResetLoadSupportedDeliveryModesProcess()
    );
  }

  /**
   * Get status about of set supported Delivery Modes process
   */
  getLoadSupportedDeliveryModeProcess(): Observable<LoaderState<void>> {
    return this.checkoutStore.pipe(
      select(getProcessStateFactory(SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID))
    );
  }

  /**
   * Clear supported delivery modes loaded in last checkout process
   */
  clearCheckoutDeliveryModes(): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ClearSupportedDeliveryModes()
    );
  }

  /**
   * Get address verification results
   */
  getAddressVerificationResults(): Observable<AddressValidation | string> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getAddressVerificationResults),
      filter((results) => Object.keys(results).length !== 0)
    );
  }

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  createAndSetAddress(address: Address): void {
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .subscribe((activeCartId) => (cartId = activeCartId))
        .unsubscribe();
      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.AddDeliveryAddress({
            userId,
            cartId,
            address: address,
          })
        );
      }
    }
  }

  /**
   * Load supported delivery modes
   */
  loadSupportedDeliveryModes(): void {
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .subscribe((activeCartId) => (cartId = activeCartId))
        .unsubscribe();
      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.LoadSupportedDeliveryModes({
            userId,
            cartId,
          })
        );
      }
    }
  }

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  setDeliveryMode(mode: string): void {
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .subscribe((activeCartId) => (cartId = activeCartId))
        .unsubscribe();
      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.SetDeliveryMode({
            userId,
            cartId,
            selectedModeId: mode,
          })
        );
      }
    }
  }

  /**
   * Verifies the address
   * @param address : the address to be verified
   */
  verifyAddress(address: Address): void {
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();
      if (userId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.VerifyAddress({
            userId,
            address,
          })
        );
      }
    }
  }

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  setDeliveryAddress(address: Address): void {
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .subscribe((activeCartId) => (cartId = activeCartId))
        .unsubscribe();
      if (cartId && userId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.SetDeliveryAddress({
            userId,
            cartId,
            address: address,
          })
        );
      }
    }
  }

  /**
   * Clear address verification results
   */
  clearAddressVerificationResults(): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ClearAddressVerificationResults()
    );
  }

  /**
   * Clear address already setup in last checkout process
   */
  clearCheckoutDeliveryAddress(): void {
    let userId;
    this.authService
      .getOccUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();

    let cartId;
    this.activeCartService
      .getActiveCartId()
      .subscribe((activeCartId) => (cartId = activeCartId))
      .unsubscribe();
    if (userId && cartId) {
      this.checkoutStore.dispatch(
        new CheckoutActions.ClearCheckoutDeliveryAddress({
          userId,
          cartId,
        })
      );
    }
  }

  /**
   * Clear selected delivery mode setup in last checkout process
   */
  clearCheckoutDeliveryMode(): void {
    let userId;
    this.authService
      .getOccUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();

    let cartId;
    this.activeCartService
      .getActiveCartId()
      .subscribe((activeCartId) => (cartId = activeCartId))
      .unsubscribe();
    if (userId && cartId) {
      this.checkoutStore.dispatch(
        new CheckoutActions.ClearCheckoutDeliveryMode({
          userId,
          cartId,
        })
      );
    }
  }

  /**
   * Clear address and delivery mode already setup in last checkout process
   */
  clearCheckoutDeliveryDetails(): void {
    this.clearCheckoutDeliveryAddress();
    this.clearCheckoutDeliveryMode();
    this.clearCheckoutDeliveryModes();
  }

  protected actionAllowed(): boolean {
    let userId;
    this.authService
      .getOccUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return (
      (userId && userId !== OCC_USER_ID_ANONYMOUS) ||
      this.activeCartService.isGuestCart()
    );
  }
}
