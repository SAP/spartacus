import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  CheckoutFacade,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  OrderPlacedEvent,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ReplenishmentOrderScheduledEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  Order,
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from 'feature-libs/cart/saved-cart/root';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutReplenishmentOrderConnector } from '../connectors/replenishment-order/checkout-replenishment-order.connector';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutService implements CheckoutFacade {
  protected order$ = new BehaviorSubject<
    Order | ReplenishmentOrder | undefined
  >(undefined);

  protected orderType$ = new BehaviorSubject<ORDER_TYPE>(
    ORDER_TYPE.PLACE_ORDER
  );

  protected placeOrderCommand: Command<boolean, Order> = this.command.create<
    boolean,
    Order
  >(
    (payload) => {
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
          return this.checkoutConnector
            .placeOrder(userId, cartId, payload)
            .pipe(
              tap((order) => {
                this.order$.next(order);
                this.checkoutStore.dispatch(
                  new CartActions.RemoveCart({ cartId })
                );
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    order,
                  },
                  OrderPlacedEvent
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

  protected scheduleReplenishmentOrderCommand: Command<
    { termsChecked: boolean; form: ScheduleReplenishmentForm },
    ReplenishmentOrder
  > = this.command.create<
    { termsChecked: boolean; form: ScheduleReplenishmentForm },
    ReplenishmentOrder
  >(
    ({ form, termsChecked }) => {
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
          return this.checkoutReplenishmentOrderConnector
            .scheduleReplenishmentOrder(cartId, form, termsChecked, userId)
            .pipe(
              tap((replenishmentOrder) => {
                this.order$.next(replenishmentOrder);
                this.checkoutStore.dispatch(
                  new CartActions.RemoveCart({ cartId })
                );
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    replenishmentOrder,
                  },
                  ReplenishmentOrderScheduledEvent
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
    protected command: CommandService,
    protected checkoutConnector: CheckoutConnector,
    protected checkoutReplenishmentOrderConnector: CheckoutReplenishmentOrderConnector,
    protected eventService: EventService,
    protected actions$: Actions
  ) {
    // TODO: Double check and move to some method
    merge([
      this.eventService.get(DeliveryAddressSetEvent),
      this.eventService.get(LogoutEvent),
      this.eventService.get(LoginEvent),
      this.eventService.get(DeliveryAddressClearedEvent),
      this.eventService.get(DeliveryModeSetEvent),
      this.eventService.get(DeliveryModeClearedEvent),
      this.eventService.get(SaveCartSuccessEvent),
      this.eventService.get(RestoreSavedCartSuccessEvent),
      this.eventService.get(PaymentDetailsCreatedEvent),
      this.eventService.get(PaymentDetailsSetEvent),
      this.eventService.get(OrderPlacedEvent),
      this.eventService.get(ReplenishmentOrderScheduledEvent),
      this.actions$.pipe(ofType(CartActions.MERGE_CART_SUCCESS)),
    ]).subscribe(() => {
      this.orderType$.next(ORDER_TYPE.PLACE_ORDER);
    });
  }

  getOrder(): Observable<Order | undefined> {
    return this.order$.asObservable();
  }

  clearOrder(): void {
    // TODO: Why?
    this.checkoutStore.dispatch(new CheckoutActions.ClearCheckoutData());

    this.order$.next(undefined);
  }

  /**
   * Places an order
   */
  placeOrder(termsChecked: boolean): Observable<Order> {
    return this.placeOrderCommand.execute(termsChecked);
  }

  /**
   * Schedule a replenishment order
   */
  scheduleReplenishmentOrder(
    scheduleReplenishmentForm: ScheduleReplenishmentForm,
    termsChecked: boolean
  ): Observable<ReplenishmentOrder> {
    return this.scheduleReplenishmentOrderCommand.execute({
      termsChecked,
      form: scheduleReplenishmentForm,
    });
  }

  /**
   * Check if checkout details are stable (no longer loading)
   */
  isLoading(): Observable<boolean> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCheckoutLoading)
    );
  }

  /**
   * Set checkout order type
   * @param orderType : an enum of types of order we are placing
   */
  setOrderType(orderType: ORDER_TYPE): void {
    this.orderType$.next(orderType);
  }

  /**
   * Get current checkout order type
   */
  getOrderType(): Observable<ORDER_TYPE> {
    return this.orderType$.asObservable();
  }
}
