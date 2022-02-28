import { Injectable } from '@angular/core';
import { ActiveCartFacade, RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutOrderPlacedEvent } from '@spartacus/checkout/base/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { Order, UnnamedFacade } from '@spartacus/order/root';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UnnamedConnector } from '../connectors/unnamed.connector';

@Injectable()
export class UnnamedService implements UnnamedFacade {
  protected order$ = new BehaviorSubject<Order | undefined>(undefined);

  protected placeOrderCommand: Command<boolean, Order> =
    this.commandService.create<boolean, Order>(
      (payload) =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutConnector.placeOrder(userId, cartId, payload).pipe(
              tap((order) => {
                this.order$.next(order);
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    /**
                     * As we know the cart is not anonymous (precondition checked),
                     * we can safely use the cartId, which is actually the cart.code.
                     */
                    cartCode: cartId,
                  },
                  RemoveCartEvent
                );
                this.eventService.dispatch(
                  {
                    userId,
                    cartId,
                    order,
                  },
                  CheckoutOrderPlacedEvent
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
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected checkoutConnector: UnnamedConnector,
    protected eventService: EventService
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

  placeOrder(termsChecked: boolean): Observable<Order> {
    return this.placeOrderCommand.execute(termsChecked);
  }

  getOrderDetails(): Observable<Order | undefined> {
    return this.order$.asObservable();
  }

  clearPlacedOrder(): void {
    this.order$.next(undefined);
  }

  setPlacedOrder(order: Order): void {
    this.order$.next(order);
  }
}
