import { Injectable, OnDestroy } from '@angular/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutResetQueryEvent } from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { ReplenishmentOrderScheduledEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutScheduledReplenishmentEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onReplenishmentOrder();
  }

  protected onReplenishmentOrder() {
    this.subscriptions.add(
      this.eventService
        .get(ReplenishmentOrderScheduledEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch(
            {
              userId,
              cartId,
              /**
               * As we know the cart is not anonymous (precondition checked),
               * we can safely use the cartId, which is actually the cart.code.
               */
              cartCode,
            },
            RemoveCartEvent
          );

          this.eventService.dispatch({}, CheckoutResetQueryEvent);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
