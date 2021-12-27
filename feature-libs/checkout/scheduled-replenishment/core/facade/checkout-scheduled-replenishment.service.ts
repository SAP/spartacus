import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/main/core';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import {
  CheckoutScheduledReplenishmentFacade,
  ReplenishmentOrderScheduledEvent,
  ScheduleReplenishmentForm,
} from '@spartacus/checkout/scheduled-replenishment/root';
import {
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutReplenishmentOrderConnector } from '../connectors/checkout-replenishment-order/checkout-replenishment-order.connector';

@Injectable()
export class CheckoutScheduledReplenishmentService
  implements CheckoutScheduledReplenishmentFacade
{
  protected scheduleReplenishmentOrderCommand: Command<
    { termsChecked: boolean; form: ScheduleReplenishmentForm },
    ReplenishmentOrder
  > = this.commandService.create<
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
                this.checkoutFacade.setOrder(replenishmentOrder);
                /**
                 * TODO:#deprecation-checkout We have to keep this here, since the cart feature is still ngrx-based.
                 * Remove once it is switched from ngrx to c&q.
                 * We should dispatch an event, which will remove the cart
                 */
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
    // TODO:#deprecation-checkout remove once all the occurrences are replaced with events
    protected store: Store<unknown>,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected commandService: CommandService,
    protected checkoutReplenishmentOrderConnector: CheckoutReplenishmentOrderConnector,
    protected eventService: EventService,
    protected checkoutFacade: CheckoutFacade
  ) {}

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
}
