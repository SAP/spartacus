import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutDeliveryModesFacade,
  CheckoutQueryFacade,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  ReloadDeliveryModesEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  CurrencySetEvent,
  DeleteUserAddressEvent,
  DeliveryMode,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  StateWithMultiCart,
  UpdateUserAddressEvent,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutDeliveryConnector } from '../connectors/delivery/checkout-delivery.connector';

@Injectable()
export class CheckoutDeliveryModesService
  implements CheckoutDeliveryModesFacade
{
  protected retrySupportedDeliveryModes$: Subject<boolean> =
    new Subject<boolean>();

  protected getSupportedDeliveryModesReloadEvents(): QueryNotifier[] {
    return [
      ReloadDeliveryModesEvent,
      // TODO: Map these events to reload event
      LanguageSetEvent,
      CurrencySetEvent,
    ];
  }
  protected getSupportedDeliveryModesResetEvents(): QueryNotifier[] {
    return [
      ResetDeliveryModesEvent,
      // TODO: Map these events to reset event
      LogoutEvent,
      LoginEvent,
      DeliveryAddressSetEvent,
      UpdateUserAddressEvent,
      DeleteUserAddressEvent,
      this.retrySupportedDeliveryModes$.asObservable(),
    ];
  }

  protected supportedDeliveryModesQuery: Query<DeliveryMode[]> =
    this.query.create<DeliveryMode[]>(
      () => {
        return combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartService.takeActiveCartId(),
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
        reloadOn: this.getSupportedDeliveryModesReloadEvents(),
        resetOn: this.getSupportedDeliveryModesResetEvents(),
      }
    );

  protected setDeliveryModeCommand: Command<string, unknown> =
    this.command.create<string>(
      (deliveryModeCode) =>
        combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartService.takeActiveCartId(),
        ]).pipe(
          switchMap(([userId, cartId]) => {
            if (
              !userId ||
              !cartId ||
              !deliveryModeCode ||
              (userId === OCC_USER_ID_ANONYMOUS &&
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryConnector
              .setMode(userId, cartId, deliveryModeCode)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      deliveryModeCode,
                    },
                    DeliveryModeSetEvent
                  );
                  this.store.dispatch(
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
          this.activeCartService.takeActiveCartId(),
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
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                    },
                    DeliveryModeClearedEvent
                  );
                  this.store.dispatch(
                    new CartActions.LoadCart({
                      cartId,
                      userId,
                    })
                  );
                }),
                catchError((err) => {
                  // TODO: Why we do it?
                  this.store.dispatch(
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
    protected store: Store<StateWithMultiCart>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected query: QueryService,
    protected command: CommandService,
    protected checkoutDeliveryConnector: CheckoutDeliveryConnector,
    protected checkoutConnector: CheckoutConnector,
    protected checkoutQuery: CheckoutQueryFacade
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
  getSelectedDeliveryMode(): Observable<QueryState<DeliveryMode | undefined>> {
    return this.checkoutQuery
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.deliveryMode })));
  }

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  setDeliveryMode(mode: string): Observable<unknown> {
    return this.setDeliveryModeCommand.execute(mode);
  }

  /**
   * Clear selected delivery mode setup in last checkout process
   */
  clearCheckoutDeliveryMode(): Observable<unknown> {
    return this.clearDeliveryModeCommand.execute();
  }
}
