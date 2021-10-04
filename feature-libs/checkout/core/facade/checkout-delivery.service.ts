import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  CheckoutDeliveryFacade,
  DeliveryAddressSetEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  CurrencySetEvent,
  DeleteUserAddressEvent,
  DeliveryMode,
  EventService,
  FeatureConfigService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryService,
  QueryState,
  StateWithProcess,
  UpdateUserAddressEvent,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutDeliveryConnector } from '../connectors/delivery/checkout-delivery.connector';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutDeliveryService implements CheckoutDeliveryFacade {
  protected retrySupportedDeliveryModes$: Subject<boolean> =
    new Subject<boolean>();

  protected createDeliveryAddressCommand: Command<Address, unknown> =
    this.command.create<Address>(
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
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
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

  protected setDeliveryAddressCommand: Command<Address, unknown> =
    this.command.create<Address>(
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
              (userId === OCC_USER_ID_ANONYMOUS &&
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryConnector
              .setAddress(userId, cartId, addressId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
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
                  this.clearCheckoutDeliveryMode();
                })
              );
          })
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected clearDeliveryAddressCommand: Command<void, unknown> =
    this.command.create<void>(
      () => {
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
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutConnector
              .clearCheckoutDeliveryAddress(userId, cartId)
              .pipe(
                tap(() => {
                  // TODO:#13888 Remove this one dispatch when we will have query for checkout addresses
                  this.checkoutStore.dispatch(
                    new CheckoutActions.ClearCheckoutDeliveryAddressSuccess()
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

  protected supportedDeliveryModesQuery: Query<DeliveryMode[]> =
    this.query.create<DeliveryMode[]>(
      () => {
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
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryConnector.getSupportedModes(
              userId,
              cartId
            );
          })
        );
      },
      {
        reloadOn: [LanguageSetEvent, CurrencySetEvent],
        resetOn: [
          LogoutEvent,
          LoginEvent,
          DeliveryAddressSetEvent,
          UpdateUserAddressEvent,
          DeleteUserAddressEvent,
          this.retrySupportedDeliveryModes$.asObservable(),
          // TODO:#13888 convert to an event
          // TODO:test: when starting the b2b checkout
          this.actions$?.pipe(
            ofType(CheckoutActions.SET_PAYMENT_TYPE_SUCCESS)
          ) ?? EMPTY,
          // TODO:#13888 remove when removing the action
          // TODO:test: finish checkout and leave the order confirmation page
          this.actions$?.pipe(ofType(CheckoutActions.CLEAR_CHECKOUT_DATA)) ??
            EMPTY,
          // TODO:#13888 remove when removing the action
          this.actions$?.pipe(
            ofType<CheckoutActions.ClearCheckoutStep>(
              CheckoutActions.CLEAR_CHECKOUT_STEP
            ),
            filter((action) => action.payload === 2)
          ) ?? EMPTY,
        ],
      }
    );

  protected setDeliveryModeCommand: Command<string, unknown> =
    this.command.create<string>(
      (deliveryModeId) =>
        combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartService.getActiveCartId(),
        ]).pipe(
          switchMap(([userId, cartId]) => {
            if (
              !userId ||
              !cartId ||
              !deliveryModeId ||
              (userId === OCC_USER_ID_ANONYMOUS &&
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryConnector
              .setMode(userId, cartId, deliveryModeId)
              .pipe(
                tap(() => {
                  // TODO:#13888 Remove this one dispatch when we will have query for checkout addresses
                  this.checkoutStore.dispatch(
                    new CheckoutActions.SetDeliveryModeSuccess(deliveryModeId)
                  );
                  this.checkoutStore.dispatch(
                    new CartActions.LoadCart({
                      userId,
                      cartId,
                    })
                  );
                })
              );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected clearDeliveryModeCommand: Command<void, unknown> =
    this.command.create<void>(
      () => {
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
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutConnector
              .clearCheckoutDeliveryMode(userId, cartId)
              .pipe(
                tap(() => {
                  // TODO:#13888 Remove this one dispatch when we will have query for checkout addresses
                  this.checkoutStore.dispatch(
                    new CheckoutActions.ClearCheckoutDeliveryModeSuccess({
                      cartId,
                      userId,
                    })
                  );
                  this.checkoutStore.dispatch(
                    new CartActions.LoadCart({
                      cartId,
                      userId,
                    })
                  );
                }),
                catchError((err) => {
                  // TODO: Why we do it?
                  this.checkoutStore.dispatch(
                    new CartActions.LoadCart({
                      cartId,
                      userId,
                    })
                  );
                  throw err;
                })
              );
          })
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected query: QueryService,
    protected command: CommandService,
    protected checkoutDeliveryConnector: CheckoutDeliveryConnector,
    protected checkoutConnector: CheckoutConnector,
    protected actions$: Actions,
    protected featureConfigService: FeatureConfigService
  ) {}

  /**
   * Get supported delivery modes
   */
  getSupportedDeliveryModes(): Observable<DeliveryMode[]> {
    return this.getSupportedDeliveryModesState().pipe(
      map((deliveryModesState) => deliveryModesState.data ?? [])
    );
  }

  getSupportedDeliveryModesState(): Observable<QueryState<DeliveryMode[]>> {
    return this.supportedDeliveryModesQuery.getState().pipe(
      // TODO: check if we need to do error handling here. This mimics the behaviour from delivery-mode.component.ts' ngOnInit().
      tap((deliveryModesState) => {
        if (deliveryModesState.error && !deliveryModesState.loading) {
          this.retrySupportedDeliveryModes$.next();
          // TODO: Add fancy exponential back-off retry query as example of how not to do infinite loop
        }
      })
    );
  }

  /**
   * Get selected delivery mode
   */
  getSelectedDeliveryMode(): Observable<DeliveryMode | undefined | null> {
    return this.getSupportedDeliveryModes().pipe(
      withLatestFrom(this.getSelectedDeliveryModeCode()),
      map(([deliveryModes, selected]) =>
        deliveryModes.find((deliveryMode) => deliveryMode.code === selected)
      )
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
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  createAndSetAddress(address: Address): Observable<unknown> {
    return this.createDeliveryAddressCommand.execute(address);
  }

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  setDeliveryMode(mode: string): Observable<unknown> {
    return this.setDeliveryModeCommand.execute(mode);
  }

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  setDeliveryAddress(address: Address): Observable<unknown> {
    return this.setDeliveryAddressCommand.execute(address);
  }

  /**
   * Clear address already setup in last checkout process
   */
  clearCheckoutDeliveryAddress(): Observable<unknown> {
    return this.clearDeliveryAddressCommand.execute();
  }

  /**
   * Clear selected delivery mode setup in last checkout process
   */
  clearCheckoutDeliveryMode(): Observable<unknown> {
    return this.clearDeliveryModeCommand.execute();
  }

  /**
   * Clear address and delivery mode already setup in last checkout process
   */
  clearCheckoutDeliveryDetails(): void {
    this.clearCheckoutDeliveryAddress();
    this.clearCheckoutDeliveryMode();
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
