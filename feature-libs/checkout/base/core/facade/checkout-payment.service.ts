import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  CardType,
  Command,
  CommandService,
  CommandStrategy,
  CurrencySetEvent,
  EventService,
  isJaloError,
  LanguageSetEvent,
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  StateWithMultiCart,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../connectors/payment/checkout-payment.connector';

@Injectable()
export class CheckoutPaymentService implements CheckoutPaymentFacade {
  /**
   * Returns the reload triggers for the cardTypes query
   */
  protected getCardTypesReloadTriggers(): QueryNotifier[] {
    return [LanguageSetEvent, CurrencySetEvent];
  }

  protected cardTypesQuery: Query<CardType[]> = this.queryService.create(
    () => this.checkoutPaymentConnector.getCardTypes(),
    {
      reloadOn: this.getCardTypesReloadTriggers(),
      retryOn: { shouldRetry: isJaloError },
    }
  );

  protected createPaymentMethodCommand: Command<PaymentDetails, unknown> =
    this.commandService.create<PaymentDetails>(
      (paymentDetails) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutPaymentConnector
              .create(userId, cartId, paymentDetails)
              .pipe(
                tap((response) => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      paymentDetails: response,
                    },
                    PaymentDetailsCreatedEvent
                  );
                  if (userId !== OCC_USER_ID_ANONYMOUS) {
                    this.store.dispatch(
                      /**
                       * TODO: We have to keep this here, since the user payment feature is still ngrx-based.
                       * Remove once it is switched from ngrx to c&q.
                       * We should dispatch an event, which will load the userPayment$ query.
                       */
                      new UserActions.LoadUserPaymentMethods(userId)
                    );
                  }
                })
              )
          )
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected setPaymentMethodCommand: Command<PaymentDetails, unknown> =
    this.commandService.create<PaymentDetails>(
      (paymentDetails) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            const paymentDetailsId = paymentDetails?.id;
            if (!paymentDetailsId) {
              throw new Error('Checkout conditions not met');
            }

            return this.checkoutPaymentConnector
              .set(userId, cartId, paymentDetailsId)
              .pipe(
                tap(() =>
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      paymentDetailsId,
                    },
                    PaymentDetailsSetEvent
                  )
                )
              );
          })
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
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected eventService: EventService,
    protected checkoutPaymentConnector: CheckoutPaymentConnector,
    protected checkoutQueryFacade: CheckoutQueryFacade
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

  getCardTypesState(): Observable<QueryState<CardType[] | undefined>> {
    return this.cardTypesQuery.getState();
  }

  getCardTypes(): Observable<CardType[]> {
    return this.getCardTypesState().pipe(map((state) => state.data ?? []));
  }

  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return this.checkoutQueryFacade
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.paymentInfo })));
  }

  createPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown> {
    return this.createPaymentMethodCommand.execute(paymentDetails);
  }

  setPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown> {
    return this.setPaymentMethodCommand.execute(paymentDetails);
  }
}
