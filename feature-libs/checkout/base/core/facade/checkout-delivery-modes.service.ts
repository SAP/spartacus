import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutDeliveryModesFacade,
  CheckoutQueryFacade,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  ReloadDeliveryModesEvent,
  ResetDeliveryModesEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  CurrencySetEvent,
  DeliveryMode,
  EventService,
  isJaloError,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  StateWithMultiCart,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutDeliveryModesConnector } from '../connectors/delivery-modes/checkout-delivery-modes.connector';

@Injectable()
export class CheckoutDeliveryModesService
  implements CheckoutDeliveryModesFacade
{
  /**
   * Returns the reload triggers for the supportedDeliveryModes query
   */
  protected getSupportedDeliveryModesReloadTriggers(): QueryNotifier[] {
    return [
      ReloadDeliveryModesEvent,
      ...this.getSupportedDeliveryModesQueryReloadSiteContextTriggers(),
    ];
  }
  /**
   * Returns the site-context reload triggers for the supportedDeliveryModes query
   */
  protected getSupportedDeliveryModesQueryReloadSiteContextTriggers(): QueryNotifier[] {
    return [LanguageSetEvent, CurrencySetEvent];
  }
  /**
   * Return the reset triggers for the supportedDeliveryModes query
   */
  protected getSupportedDeliveryModesQueryResetTriggers(): QueryNotifier[] {
    return [
      ResetDeliveryModesEvent,
      ...this.getSupportedDeliveryModesQueryResetAuthTriggers(),
    ];
  }
  /**
   * Returns the auth reset triggers for the supportedDeliveryModes query
   */
  protected getSupportedDeliveryModesQueryResetAuthTriggers(): QueryNotifier[] {
    return [LogoutEvent, LoginEvent];
  }

  protected supportedDeliveryModesQuery: Query<DeliveryMode[]> =
    this.query.create<DeliveryMode[]>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryModesConnector.getSupportedModes(
              userId,
              cartId
            )
          )
        ),
      {
        reloadOn: this.getSupportedDeliveryModesReloadTriggers(),
        resetOn: this.getSupportedDeliveryModesQueryResetTriggers(),
        retryOn: { shouldRetry: isJaloError },
      }
    );

  protected setDeliveryModeCommand: Command<string, unknown> =
    this.command.create<string>(
      (deliveryModeCode) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            if (!deliveryModeCode) {
              throw new Error('Checkout conditions not met');
            }

            return this.checkoutDeliveryModesConnector
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
                  /**
                   * TODO: We have to keep this here, since the cart feature is still ngrx-based.
                   * Remove once it is switched from ngrx to c&q.
                   * We should dispatch an event, which will load the cart$ query.
                   */
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
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutDeliveryModesConnector
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
                  /**
                   * TODO: We have to keep this here, since the cart feature is still ngrx-based.
                   * Remove once it is switched from ngrx to c&q.
                   * We should dispatch an event, which will reload the cart$ query.
                   */
                  this.store.dispatch(
                    new CartActions.LoadCart({
                      cartId,
                      userId,
                    })
                  );
                }),
                catchError((error) => {
                  /**
                   * TODO: We have to keep this here, since the cart feature is still ngrx-based.
                   * Remove once it is switched from ngrx to c&q.
                   * We should dispatch an event, which will reload the cart$ query.
                   */
                  this.store.dispatch(
                    new CartActions.LoadCart({
                      cartId,
                      userId,
                    })
                  );
                  return throwError(error);
                })
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  constructor(
    // TODO: remove once all the occurrences are replaced with events
    protected store: Store<StateWithMultiCart>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected eventService: EventService,
    protected query: QueryService,
    protected command: CommandService,
    protected checkoutDeliveryModesConnector: CheckoutDeliveryModesConnector,
    protected checkoutQuery: CheckoutQueryFacade
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartService.takeActiveCartId(),
    ]).pipe(
      take(1),
      map(([userId, cartId]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS &&
            !this.activeCartService.isGuestCart())
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  getSupportedDeliveryModesState(): Observable<QueryState<DeliveryMode[]>> {
    return this.supportedDeliveryModesQuery.getState();
  }

  getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  > {
    return this.checkoutQuery
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.deliveryMode })));
  }

  setDeliveryMode(mode: string): Observable<unknown> {
    return this.setDeliveryModeCommand.execute(mode);
  }

  clearCheckoutDeliveryMode(): Observable<unknown> {
    return this.clearDeliveryModeCommand.execute();
  }
}
