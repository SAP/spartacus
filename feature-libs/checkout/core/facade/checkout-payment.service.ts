import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
} from '@spartacus/checkout/root';
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
      (payload) => {
        return combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartService.takeActiveCartId(),
        ]).pipe(
          take(1),
          switchMap(([userId, cartId]) => {
            if (
              !userId ||
              !cartId ||
              !payload ||
              (userId === OCC_USER_ID_ANONYMOUS &&
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutPaymentConnector
              .create(userId, cartId, payload)
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
        );
      },
      {
        strategy: CommandStrategy.CancelPrevious,
      }
    );

  protected setPaymentMethodCommand: Command<PaymentDetails, unknown> =
    this.command.create<PaymentDetails>(
      (payload) => {
        const paymentDetailsId = payload?.id;
        return combineLatest([
          this.userIdService.takeUserId(),
          this.activeCartService.takeActiveCartId(),
        ]).pipe(
          take(1),
          switchMap(([userId, cartId]) => {
            if (
              !userId ||
              !cartId ||
              !paymentDetailsId ||
              (userId === OCC_USER_ID_ANONYMOUS &&
                !this.activeCartService.isGuestCart())
            ) {
              throw new Error('Checkout conditions not met');
            }
            return this.checkoutPaymentConnector
              .set(userId, cartId, paymentDetailsId)
              .pipe(
                tap(() => {
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      paymentDetailsId,
                    },
                    PaymentDetailsSetEvent
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

  /**
   * Get card types
   */
  getCardTypes(): Observable<CardType[]> {
    return this.cardTypesQuery.get().pipe(map((cardTypes) => cardTypes ?? []));
  }

  /**
   * Get payment details
   */
  getPaymentDetails(): Observable<QueryState<PaymentDetails | undefined>> {
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
