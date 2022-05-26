import { Injectable, OnDestroy } from '@angular/core';
import { LoadCartEvent } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import {
  CheckoutDeliveryModeClearedErrorEvent,
  CheckoutDeliveryModeClearedEvent,
  CheckoutDeliveryModeSetEvent,
  CheckoutResetDeliveryModesEvent,
  CheckoutResetQueryEvent,
} from './checkout.events';

/**
 * Checkout delivery mode event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryModeEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected eventService: EventService) {
    this.onDeliveryModeSet();
    this.onDeliveryModeCleared();
    this.onDeliveryModeClearedError();

    //TODO: Brian no query yet
    this.onDeliveryModeReset();
  }

  /**
   * Registers listeners for the delivery mode clear event.
   * This is needed for when `CheckoutResetDeliveryModesEvent` is dispatched
   * as we need to update the user's cart when the delivery mode is cleared from the backend checkout details.
   */
  protected onDeliveryModeReset(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutResetDeliveryModesEvent)
        .subscribe(({ userId, cartId }) =>
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
            LoadCartEvent
          )
        )
    );
  }

  protected onDeliveryModeSet() {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryModeSetEvent)
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
            LoadCartEvent
          );
        })
    );
  }

  protected onDeliveryModeCleared(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryModeClearedEvent)
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
            LoadCartEvent
          );
        })
    );
  }

  protected onDeliveryModeClearedError(): void {
    this.subscriptions.add(
      this.eventService
        .get(CheckoutDeliveryModeClearedErrorEvent)
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
            LoadCartEvent
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
