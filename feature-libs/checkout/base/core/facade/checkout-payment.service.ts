import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CardType,
  PaymentDetails,
} from '@spartacus/cart/base/root';
import {
  CheckoutPaymentDetailsCreatedEvent,
  CheckoutPaymentDetailsSetEvent,
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
  CheckoutReloadPaymentCardTypesEvent,
  CheckoutResetPaymentCardTypesEvent,
} from '@spartacus/checkout/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../connectors/checkout-payment/checkout-payment.connector';

@Injectable()
export class CheckoutPaymentService implements CheckoutPaymentFacade {
  /**
   * Returns the reload triggers for the cardTypes query
   */
  protected getCardTypesQueryReloadTriggers(): QueryNotifier[] {
    return [CheckoutReloadPaymentCardTypesEvent];
  }

  /**
   * Returns the reset triggers for the cardTypes query
   */
  protected getCardTypesQueryResetTriggers(): QueryNotifier[] {
    return [CheckoutResetPaymentCardTypesEvent];
  }

  protected cardTypesQuery: Query<CardType[]> = this.queryService.create<
    CardType[]
  >(() => this.checkoutPaymentConnector.getCardTypes(), {
    reloadOn: this.getCardTypesQueryReloadTriggers(),
    resetOn: this.getCardTypesQueryResetTriggers(),
  });

  protected createPaymentMethodCommand: Command<PaymentDetails, unknown> =
    this.commandService.create<PaymentDetails>(
      (paymentDetails) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutPaymentConnector
              .createPaymentDetails(userId, cartId, paymentDetails)
              .pipe(
                tap((response) =>
                  this.eventService.dispatch(
                    { userId, cartId, paymentDetails: response },
                    CheckoutPaymentDetailsCreatedEvent
                  )
                )
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
              .setPaymentDetails(userId, cartId, paymentDetailsId)
              .pipe(
                tap(() =>
                  this.eventService.dispatch(
                    {
                      userId,
                      cartId,
                      paymentDetailsId,
                    },
                    CheckoutPaymentDetailsSetEvent
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
    protected activeCartFacade: ActiveCartFacade,
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
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
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
