import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  PaymentTypeFacade,
  PaymentTypeSetEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  B2BPaymentTypeEnum,
  Command,
  CommandService,
  CommandStrategy,
  CurrencySetEvent,
  EventService,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  PaymentType,
  Query,
  QueryService,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { PaymentTypeConnector } from '..';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class PaymentTypeService implements PaymentTypeFacade {
  protected paymentTypesQuery: Query<PaymentType[]> = this.query.create(
    () => this.paymentTypeConnector.getPaymentTypes(),
    {
      reloadOn: [LanguageSetEvent, CurrencySetEvent],
      resetOn: [LogoutEvent, LoginEvent],
    }
  );

  protected setPaymentTypeCommand: Command<
    { paymentTypeCode: string; purchaseOrderNumber?: string },
    unknown
  > = this.command.create<{
    paymentTypeCode: string;
    purchaseOrderNumber?: string;
  }>(
    ({ paymentTypeCode, purchaseOrderNumber }) => {
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
          return this.paymentTypeConnector
            .setPaymentType(
              userId,
              cartId,
              paymentTypeCode,
              purchaseOrderNumber
            )
            .pipe(
              tap(() => {
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    paymentTypeCode,
                    purchaseOrderNumber,
                  },
                  PaymentTypeSetEvent
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
    protected paymentTypeConnector: PaymentTypeConnector,
    protected eventService: EventService
  ) {}

  /**
   * Get payment types
   */
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.paymentTypesQuery
      .get()
      .pipe(map((paymentTypes) => paymentTypes ?? []));
  }

  /**
   * Set payment type to cart
   * @param paymentTypeCode
   * @param purchaseOrderNumber
   */
  setPaymentType(
    paymentTypeCode: string,
    purchaseOrderNumber?: string
  ): Observable<unknown> {
    return this.setPaymentTypeCommand.execute({
      paymentTypeCode,
      purchaseOrderNumber,
    });
  }

  /**
   * Get the selected payment type
   */
  getSelectedPaymentType(): Observable<string | undefined> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.checkoutStore.pipe(select(CheckoutSelectors.getSelectedPaymentType)),
    ]).pipe(
      tap(([cart, selected]) => {
        if (selected === undefined) {
          // in b2b, cart always has paymentType (default value 'CARD')
          if (cart && cart.paymentType) {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetPaymentTypeSuccess(cart)
            );
          }
        }
      }),
      map(([, selected]) => selected)
    );
  }

  /**
   * Get whether the selected payment type is "ACCOUNT" payment
   */
  isAccountPayment(): Observable<boolean> {
    return this.getSelectedPaymentType().pipe(
      map((selected) => selected === B2BPaymentTypeEnum.ACCOUNT_PAYMENT)
    );
  }

  /**
   * Get PO Number
   */
  getPoNumber(): Observable<string | undefined> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.checkoutStore.pipe(select(CheckoutSelectors.getPoNumer)),
    ]).pipe(
      tap(([cart, po]) => {
        if (po === undefined && cart && cart.purchaseOrderNumber) {
          this.checkoutStore.dispatch(
            new CheckoutActions.SetPaymentTypeSuccess(cart)
          );
        }
      }),
      map(([_, po]) => po)
    );
  }
}
