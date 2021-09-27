import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CheckoutDeliveryFacade,
  COMMANDS_AND_QUERIES_BASED_CHECKOUT,
  DeliveryAddressSetEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  Command,
  CommandService,
  CommandStrategy,
  DeliveryMode,
  EventService,
  FeatureConfigService,
  OCC_USER_ID_ANONYMOUS,
  ProcessSelectors,
  PROCESS_FEATURE,
  QueryService,
  StateUtils,
  StateWithProcess,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  pluck,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutDeliveryConnector } from '../connectors/delivery/checkout-delivery.connector';
import { CheckoutActions } from '../store/actions/index';
import {
  SET_DELIVERY_ADDRESS_PROCESS_ID,
  SET_DELIVERY_MODE_PROCESS_ID,
  SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutDeliveryService implements CheckoutDeliveryFacade {
  // TODO:#13888 Remove optional chaining and update types in 5.0
  protected createDeliveryAddressCommand:
    | undefined
    | Command<Address, unknown> = this.command?.create<Address>(
    (payload) => {
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          if (
            !userId ||
            !cartId ||
            (userId === OCC_USER_ID_ANONYMOUS &&
              !this.activeCartService.isGuestCart()) ||
            !this.checkoutDeliveryConnector // TODO:#13888 Remove check in 5.0 when service will be required
          ) {
            return of(); // TODO:#13888 should we throw error here? useful dev info?
          }
          return this.checkoutDeliveryConnector
            .createAddress(userId, cartId, payload)
            .pipe(
              tap(() => {
                if (userId !== OCC_USER_ID_ANONYMOUS) {
                  this.checkoutStore.dispatch(
                    new UserActions.LoadUserAddresses(userId)
                  );
                }
              }),
              switchMap((address) => {
                address['titleCode'] = payload.titleCode;
                if (payload.region?.isocodeShort) {
                  Object.assign(address.region, {
                    isocodeShort: payload.region.isocodeShort,
                  });
                }
                return this.setDeliveryAddress(address);
              })
            );
        })
      );
    },
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  // TODO:#13888 Remove optional chaining and update types in 5.0
  protected setDeliveryAddressCommand:
    | undefined
    | Command<Address, unknown> = this.command?.create<Address>(
    (payload) => {
      const addressId = payload.id;
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          if (
            !userId ||
            !cartId ||
            !addressId ||
            !this.checkoutDeliveryConnector || // TODO:#13888 Remove check in 5.0 when service will be required
            (userId === OCC_USER_ID_ANONYMOUS &&
              !this.activeCartService.isGuestCart())
          ) {
            return of(); // TODO:#13888 should we throw error here? useful dev info?
          }
          // TODO:#13888 Remove this process setting during removal of process for set delivery address
          this.processStateStore.dispatch(
            new StateUtils.EntityLoadAction(
              PROCESS_FEATURE,
              SET_DELIVERY_ADDRESS_PROCESS_ID
            )
          );
          return this.checkoutDeliveryConnector
            .setAddress(userId, cartId, addressId)
            .pipe(
              // TODO:#13888 Remove this special error handling when there won't be process for set delivery address
              catchError((error) => {
                this.processStateStore.dispatch(
                  new StateUtils.EntityFailAction(
                    PROCESS_FEATURE,
                    SET_DELIVERY_ADDRESS_PROCESS_ID,
                    error
                  )
                );
                return throwError(error);
              }),
              tap(() => {
                // TODO:#13888 Remove check in 5.0 when eventService will be required
                this.eventService?.dispatch(
                  {
                    userId,
                    cartId,
                    address: payload,
                  },
                  DeliveryAddressSetEvent
                );
                // TODO:#13888 Remove this one dispatch when we will have query for checkout addresses
                this.checkoutStore.dispatch(
                  new CheckoutActions.SetDeliveryAddressSuccess(payload)
                );
                this.checkoutStore.dispatch(
                  new CheckoutActions.ClearCheckoutDeliveryMode({
                    userId,
                    cartId,
                  })
                );
                this.checkoutStore.dispatch(
                  new CheckoutActions.ClearSupportedDeliveryModes()
                );
                this.checkoutStore.dispatch(
                  new CheckoutActions.ResetLoadSupportedDeliveryModesProcess()
                );
                this.checkoutStore.dispatch(
                  new CheckoutActions.LoadSupportedDeliveryModes({
                    userId,
                    cartId,
                  })
                );
              })
            );
        })
      );
    },
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  /**
   * @deprecated since 4.3.0. Provide additionally EventService, QueryService, CommandService, CheckoutDeliveryConnector and FeatureConfigService.
   */
  constructor(
    checkoutStore: Store<StateWithCheckout>,
    processStateStore: Store<StateWithProcess<void>>,
    activeCartService: ActiveCartService,
    userIdService: UserIdService
  );

  constructor(
    checkoutStore: Store<StateWithCheckout>,
    processStateStore: Store<StateWithProcess<void>>,
    activeCartService: ActiveCartService,
    userIdService: UserIdService,
    eventService: EventService,
    query: QueryService,
    command: CommandService,
    checkoutDeliveryConnector: CheckoutDeliveryConnector,
    featureConfigService: FeatureConfigService
  );

  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected eventService?: EventService,
    protected query?: QueryService,
    protected command?: CommandService,
    protected checkoutDeliveryConnector?: CheckoutDeliveryConnector,
    protected featureConfigService?: FeatureConfigService
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

  // TODO:#13888 Remove during removal of process for set delivery address
  /**
   * Get status about successfully set Delivery Address
   *
   * @deprecated since 4.3.0. Use return value of setDeliveryAddress method to know if the action was successful or failed.
   */
  getSetDeliveryAddressProcess(): Observable<StateUtils.LoaderState<void>> {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(SET_DELIVERY_ADDRESS_PROCESS_ID)
      )
    );
  }

  // TODO:#13888 Remove during removal of process for set delivery address
  /**
   * Clear info about process of setting Delivery Address
   *
   * @deprecated since 4.3.0. Instead of the process use the return value of setDeliveryAddress method to observe it's status.
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
  createAndSetAddress(address: Address): Observable<unknown> {
    // TODO:#13888 Remove condition in 5.0 when fully switching to commands
    if (
      this.featureConfigService?.isEnabled(COMMANDS_AND_QUERIES_BASED_CHECKOUT)
    ) {
      if (this.createDeliveryAddressCommand) {
        // TODO:#13888 Remove check in 5.0 when all services will be provided
        return this.createDeliveryAddressCommand.execute(address);
      }
      throw new Error(
        'Missing constructor parameters in CheckoutDeliveryService'
      );
    }
    // TODO:#13888 Remove this code in 5.0 when all services for command will be required
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
    return of(undefined);
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
   * Set delivery address
   * @param address : The address to be set
   */
  setDeliveryAddress(address: Address): Observable<unknown> {
    // TODO:#13888 Remove condition in 5.0 when fully switching to commands
    if (
      this.featureConfigService?.isEnabled(COMMANDS_AND_QUERIES_BASED_CHECKOUT)
    ) {
      if (this.setDeliveryAddressCommand) {
        // TODO:#13888 Remove check in 5.0 when all services will be provided
        return this.setDeliveryAddressCommand.execute(address);
      }
      throw new Error(
        'Missing constructor parameters in CheckoutDeliveryService'
      );
    }
    // TODO:#13888 Remove this code in 5.0 when all services for command will be required
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
    return of(undefined);
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
