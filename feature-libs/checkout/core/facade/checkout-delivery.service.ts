import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  DeliveryMode,
  getLastValueSync,
  OCC_USER_ID_ANONYMOUS,
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  filter,
  pluck,
  shareReplay,
  take,
  tap,
  withLatestFrom,
  map,
} from 'rxjs/operators';
import { CheckoutActions } from '../store/actions/index';
import {
  SET_DELIVERY_ADDRESS_PROCESS_ID,
  SET_DELIVERY_MODE_PROCESS_ID,
  SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';
import { CheckoutService } from './checkout.service';

@Injectable()
export class CheckoutDeliveryService implements CheckoutDeliveryFacade {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected checkoutService: CheckoutService
  ) {}

  /**
   * Get supported delivery modes
   */
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSupportedDeliveryModes),
      withLatestFrom(
        this.processStateStore.pipe(
          select(
            ProcessSelectors.getProcessStateFactory(
              SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID
            )
          )
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
  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined | null> {
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
  getSetDeliveryAddressProcess(): Observable<StateUtils.LoaderState<void>> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(SET_DELIVERY_ADDRESS_PROCESS_ID)
      )
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
  getSetDeliveryModeProcess(): Observable<StateUtils.LoaderState<void>> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(SET_DELIVERY_MODE_PROCESS_ID)
      )
    );
  }

  /**
   * Get info about process of setting Delivery Mode, which is done by a HTTP PUT request followed by two HTTP GET request.
   * True means at least one quest is still in process, false means all three requests are done
   */
  getSetDeliveryModeInProcess(): Observable<boolean> {
    return combineLatest([
      this.activeCartService.isStable(),
      this.checkoutService.isLoading(),
      this.getSetDeliveryModeProcess(),
    ]).pipe(
      map(
        ([isStable, isLoading, setDeliveryProcess]) =>
          !isStable || isLoading || (setDeliveryProcess.loading ?? false)
      )
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
  getLoadSupportedDeliveryModeProcess(): Observable<
    StateUtils.LoaderState<void>
  > {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(
          SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID
        )
      )
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
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  createAndSetAddress(address: Address): void {
    if (this.actionAllowed()) {
      let userId;
      this.userIdService
        .getUserId()
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
      this.userIdService
        .getUserId()
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
      const userId = getLastValueSync(this.userIdService.getUserId());
      const cartId = getLastValueSync(this.activeCartService.getActiveCartId());

      if (userId && cartId) {
        combineLatest([
          this.activeCartService.isStable(),
          this.checkoutService.isLoading(),
        ])
          .pipe(
            filter(([isStable, isLoading]) => isStable && !isLoading),
            take(1)
          )
          .subscribe(() => {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetDeliveryMode({
                userId,
                cartId,
                selectedModeId: mode,
              })
            );
          });
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
      this.userIdService
        .getUserId()
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
   * Clear address already setup in last checkout process
   */
  clearCheckoutDeliveryAddress(): void {
    let userId;
    this.userIdService
      .getUserId()
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
    this.userIdService
      .getUserId()
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
    this.userIdService
      .getUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return (
      (userId && userId !== OCC_USER_ID_ANONYMOUS) ||
      this.activeCartService.isGuestCart()
    );
  }
}
