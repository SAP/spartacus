import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutFacade, OrderPlacedEvent } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  Order,
  ORDER_TYPE,
  ProcessSelectors,
  ScheduleReplenishmentForm,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutActions } from '../store/actions/index';
import {
  PLACED_ORDER_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutService implements CheckoutFacade {
  protected order$ = new BehaviorSubject<Order | undefined>(undefined);

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

  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected command: CommandService,
    protected checkoutConnector: CheckoutConnector,
    protected eventService: EventService
  ) {}

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
  ): void {
    let cartId: string;

    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => (cartId = activeCartId));

    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        if (Boolean(cartId) && Boolean(userId)) {
          this.checkoutStore.dispatch(
            new CheckoutActions.ScheduleReplenishmentOrder({
              cartId,
              scheduleReplenishmentForm,
              termsChecked,
              userId,
            })
          );
        }
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Returns the place or schedule replenishment order's loading flag
   */
  getPlaceOrderLoading(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessLoadingFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the place or schedule replenishment order's success flag
   */
  getPlaceOrderSuccess(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessSuccessFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Returns the place or schedule replenishment order's error flag
   */
  getPlaceOrderError(): Observable<boolean> {
    return this.processStateStore.pipe(
      select(ProcessSelectors.getProcessErrorFactory(PLACED_ORDER_PROCESS_ID))
    );
  }

  /**
   * Resets the place or schedule replenishment order's processing state
   */
  clearPlaceOrderState(): void {
    this.checkoutStore.dispatch(new CheckoutActions.ClearPlaceOrder());
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
    this.checkoutStore.dispatch(new CheckoutActions.SetOrderType(orderType));
  }

  /**
   * Get current checkout order type
   */
  getCurrentOrderType(): Observable<ORDER_TYPE> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSelectedOrderType)
    );
  }

  protected actionAllowed(): boolean {
    let userId;
    this.userIdService
      .getUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return (
      (userId && userId !== OCC_USER_ID_ANONYMOUS) ||
      this.activeCartService.isGuestCart()
    );
  }
}
