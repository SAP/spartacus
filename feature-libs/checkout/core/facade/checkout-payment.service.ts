import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutPaymentFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CardType,
  Command,
  CommandService,
  CommandStrategy,
  CurrencySetEvent,
  LanguageSetEvent,
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
  Query,
  QueryService,
  StateWithProcess,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../connectors/payment/checkout-payment.connector';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutPaymentService implements CheckoutPaymentFacade {
  protected cardTypesQuery: Query<CardType[]> = this.query.create(
    () => this.checkoutPaymentConnector?.getCardTypes() ?? of([]),
    {
      reloadOn: [LanguageSetEvent, CurrencySetEvent],
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
                  this.checkoutStore.dispatch(
                    new CheckoutActions.CreatePaymentDetailsSuccess(response)
                  );
                  if (userId !== OCC_USER_ID_ANONYMOUS) {
                    this.checkoutStore.dispatch(
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
                  this.checkoutStore.dispatch(
                    new CheckoutActions.SetPaymentDetailsSuccess(payload)
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
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected command: CommandService,
    protected checkoutPaymentConnector: CheckoutPaymentConnector
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
  getPaymentDetails(): Observable<PaymentDetails> {
    return this.checkoutStore.pipe(select(CheckoutSelectors.getPaymentDetails));
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
