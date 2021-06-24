import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckFacade, CheckoutPaymentFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CardType,
  CommandService,
  LanguageSetEvent,
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
  Query,
  QueryService,
  QueryState,
  StateWithProcess,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../connectors/payment/checkout-payment.connector';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';

@Injectable()
export class CheckoutPaymentService implements CheckoutPaymentFacade {
  protected cardTypesQuery: Query<CardType[]> = this.query.create(
    () => this.checkoutPaymentConnector.getCardTypes(),
    {
      reloadOn: [LanguageSetEvent],
    }
  );

  protected createPaymentDetailsCommand = this.command.create(
    (payload: any) => {
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          if (
            !!cartId &&
            userId &&
            (userId !== OCC_USER_ID_ANONYMOUS ||
              this.activeCartService.isGuestCart())
          ) {
            return this.checkoutPaymentConnector
              .create(userId, cartId, payload)
              .pipe(
                tap(() => {
                  // TODO: Should we reload checkout data?
                  if (userId !== OCC_USER_ID_ANONYMOUS) {
                    this.checkoutStore.dispatch(
                      new UserActions.LoadUserPaymentMethods(userId)
                    );
                  } else {
                    // TODO: We do that to load payment methods for guest checkout (as we don't trigger set payment method)
                    this.checkoutStore.dispatch(
                      new CheckoutActions.ClearCheckoutData()
                    );
                  }
                })
              );
          } else {
            return throwError({ message: 'error message' });
          }
        })
      );
    }
  );

  protected setPaymentDetailsCommand = this.command.create((payload: any) => {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      take(1),
      switchMap(([userId, cartId]) => {
        if (
          !!cartId &&
          userId &&
          (userId !== OCC_USER_ID_ANONYMOUS ||
            this.activeCartService.isGuestCart())
        ) {
          // TODO: Should we reload checkout data after?
          return this.checkoutPaymentConnector
            .set(userId, cartId, payload.id)
            .pipe(
              tap(() => {
                console.log('setter finished, triggering load');
                this.checkoutStore.dispatch(
                  new CheckoutActions.ClearCheckoutData()
                );
              })
            );
        } else {
          return throwError({ message: 'error message' });
        }
      })
    );
  });

  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected command: CommandService,
    protected checkoutPaymentConnector: CheckoutPaymentConnector,
    protected checkService: CheckFacade
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
  getPaymentDetails(): Observable<PaymentDetails | undefined> {
    return this.checkService
      .getCheckoutDetails()
      .pipe(map((state) => state?.data?.paymentInfo));
  }

  /**
   * Get status about set Payment Details process
   */
  getSetPaymentDetailsResultProcess(): Observable<QueryState<PaymentDetails>> {
    return this.checkService.getCheckoutDetails().pipe(
      map((state) => {
        console.log(state);
        return { ...state, data: state?.data?.paymentInfo };
      })
    );
  }

  /**
   * Clear info about process of setting Payment Details
   */
  resetSetPaymentDetailsProcess(): void {
    // TODO: I guess we want to reload/reset data here
    this.checkoutStore.dispatch(new CheckoutActions.ClearCheckoutData());
  }

  /**
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  // TODO: Multilevel extendable interfaces
  createPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown> {
    return this.createPaymentDetailsCommand.execute(paymentDetails);
  }

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  // TODO: Multilevel extendable interfaces
  setPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown> {
    return this.setPaymentDetailsCommand.execute(paymentDetails);
  }
}
