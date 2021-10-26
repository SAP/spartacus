import { Injectable } from '@angular/core';
import {
  CheckoutPaymentTypeFacade,
  PaymentTypeSetEvent,
} from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/root';
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
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutPaymentTypeConnector } from '../connectors/payment-type/checkout-payment-type.connector';

@Injectable()
export class CheckoutPaymentTypeService implements CheckoutPaymentTypeFacade {
  protected getPaymentTypesQueryReloadEvents(): QueryNotifier[] {
    return [LanguageSetEvent, CurrencySetEvent];
  }
  protected getPaymentTypesQueryResetEvents(): QueryNotifier[] {
    return [LogoutEvent, LoginEvent];
  }

  protected paymentTypesQuery: Query<PaymentType[]> = this.query.create(
    () => this.paymentTypeConnector.getPaymentTypes(),
    {
      reloadOn: this.getPaymentTypesQueryReloadEvents(),
      resetOn: this.getPaymentTypesQueryResetEvents(),
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
          return this.paymentTypeConnector
            .setPaymentType(
              userId,
              cartId,
              paymentTypeCode,
              purchaseOrderNumber
            )
            .pipe(
              tap(() =>
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    paymentTypeCode,
                    purchaseOrderNumber,
                  },
                  PaymentTypeSetEvent
                )
              )
            );
        })
      );
    },
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected command: CommandService,
    protected paymentTypeConnector: CheckoutPaymentTypeConnector,
    protected eventService: EventService,
    protected checkoutQuery: CheckoutQueryFacade
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
  getSelectedPaymentType(): Observable<QueryState<PaymentType | undefined>> {
    return this.checkoutQuery
      .getCheckoutDetailsState()
      .pipe(map((state) => ({ ...state, data: state.data?.paymentType })));
  }

  /**
   * Get whether the selected payment type is "ACCOUNT" payment
   */
  isAccountPayment(): Observable<boolean> {
    return this.getSelectedPaymentType().pipe(
      filter((state) => !state.loading),
      map((state) => state.data?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT)
    );
  }

  /**
   * Get purchase order number
   */
  getPurchaseOrderNumber(): Observable<QueryState<string | undefined>> {
    return this.checkoutQuery
      .getCheckoutDetailsState()
      .pipe(
        map((state) => ({ ...state, data: state.data?.purchaseOrderNumber }))
      );
  }
}
