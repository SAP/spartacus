import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutFacade,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  OrderPlacedEvent,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
} from '@spartacus/checkout/base/root';
import {
  CheckoutScheduledReplenishmentFacade,
  ReplenishmentOrderScheduledEvent,
} from '@spartacus/checkout/scheduled-replenishment/root';
import {
  ActiveCartService,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  LoginEvent,
  LogoutEvent,
  MergeCartSuccessEvent,
  OCC_USER_ID_ANONYMOUS,
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
  StateWithMultiCart,
  UserIdService,
} from '@spartacus/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subscription,
} from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutReplenishmentOrderConnector } from '../connectors/replenishment-order/checkout-replenishment-order.connector';

@Injectable()
export class CheckoutScheduledReplenishmentService
  implements CheckoutScheduledReplenishmentFacade, OnDestroy
{
  protected subscriptions = new Subscription();

  // TODO: In order confirmation could be distinguished based on order detail object containing replenishmentOrderCode
  // TODO: Then it is only needed to communicate between 2 components on the same page (look recording)
  protected orderType$ = new BehaviorSubject<ORDER_TYPE>(
    ORDER_TYPE.PLACE_ORDER
  );

  protected scheduleReplenishmentOrderCommand: Command<
    { termsChecked: boolean; form: ScheduleReplenishmentForm },
    ReplenishmentOrder
  > = this.command.create<
    { termsChecked: boolean; form: ScheduleReplenishmentForm },
    ReplenishmentOrder
  >(
    ({ form, termsChecked }) =>
      this.checkoutPreconditions().pipe(
        switchMap(([userId, cartId]) =>
          this.checkoutReplenishmentOrderConnector
            .scheduleReplenishmentOrder(cartId, form, termsChecked, userId)
            .pipe(
              tap((replenishmentOrder) => {
                this.checkoutService.setOrder(replenishmentOrder);
                this.store.dispatch(new CartActions.RemoveCart({ cartId }));
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    replenishmentOrder,
                  },
                  ReplenishmentOrderScheduledEvent
                );
              })
            )
        )
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected store: Store<StateWithMultiCart>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected command: CommandService,
    protected checkoutReplenishmentOrderConnector: CheckoutReplenishmentOrderConnector,
    protected eventService: EventService,
    protected checkoutService: CheckoutFacade
  ) {
    this.registerOrderTypeEventListers();
  }

  protected registerOrderTypeEventListers(): void {
    this.subscriptions.add(
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
        this.eventService.get(MergeCartSuccessEvent),
      ]).subscribe(() => {
        this.orderType$.next(ORDER_TYPE.PLACE_ORDER);
      })
    );
  }

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
