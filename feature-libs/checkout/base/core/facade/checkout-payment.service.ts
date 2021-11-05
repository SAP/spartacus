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
  protected getCardTypesReloadTriggers(): QueryNotifier[] {
    return [LanguageSetEvent, CurrencySetEvent];
  }

  protected cardTypesQuery: Query<CardType[]> = this.query.create(
    () => this.checkoutPaymentConnector.getCardTypes(),
    {
      reloadOn: this.getCardTypesReloadTriggers(),
    }
  );

  protected createPaymentMethodCommand: Command<PaymentDetails, unknown> =
    this.command.create<PaymentDetails>(
      (paymentDetails) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) => {
            if (!paymentDetails) {
              throw new Error('Checkout conditions not met');
            }

            return this.checkoutPaymentConnector
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
                      new UserActions.LoadUserPaymentMethods(userId)
                    );
                  }
                })
              );
          })
        ),
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected setPaymentMethodCommand: Command<PaymentDetails, unknown> =
    this.command.create<PaymentDetails>(
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
    protected store: Store<StateWithMultiCart>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected command: CommandService,
    protected eventService: EventService,
    protected checkoutPaymentConnector: CheckoutPaymentConnector,
    protected checkoutQuery: CheckoutQueryFacade
  ) {}

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

  /**
   * Get card types
   */
  getCardTypes(): Observable<CardType[]> {
    return this.cardTypesQuery.get().pipe(map((cardTypes) => cardTypes ?? []));
  }

  /**
   * Get payment details
   */
  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return this.checkoutQuery
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.paymentInfo })));
  }

  /**
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  createPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown> {
    return this.createPaymentMethodCommand.execute(paymentDetails);
  }

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  setPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown> {
    return this.setPaymentMethodCommand.execute(paymentDetails);
  }
}
