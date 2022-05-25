import { Injectable, OnDestroy } from '@angular/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutResetQueryEvent } from '@spartacus/checkout/base/root';
import { EventService } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPlaceOrderEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onOrderPlaced();
  }

  protected onOrderPlaced(): void {
    this.subscriptions.add(
      this.eventService
        .get(OrderPlacedEvent)
        .subscribe(({ userId, cartId, cartCode }) => {
          this.eventService.dispatch({}, CheckoutResetQueryEvent);

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
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
