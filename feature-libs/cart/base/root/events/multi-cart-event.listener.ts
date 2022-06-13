import { Injectable, OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { MultiCartFacade } from '../facade/multi-cart.facade';
import { LoadCartEvent, RemoveCartEvent } from './cart.events';

@Injectable({
  providedIn: 'root',
})
export class MultiCartEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected multiCartFacade: MultiCartFacade
  ) {
    this.onCartBaseAction();
  }

  /**
   * Registers events for the cart base actions.
   */
  protected onCartBaseAction(): void {
    this.subscriptions.add(
      this.eventService.get(LoadCartEvent).subscribe(({ userId, cartId }) => {
        this.multiCartFacade.loadCart({ userId, cartId });
      })
    );

    this.subscriptions.add(
      this.eventService.get(RemoveCartEvent).subscribe(({ cartId }) => {
        this.multiCartFacade.removeCart(cartId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
