import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import { LoadCartEvent, RemoveCartEvent } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { Subscription } from 'rxjs';

/**
 * Multi-cart event listener.
 */
@Injectable({
  providedIn: 'root',
})
export class MultiCartEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected store: Store<unknown>
  ) {
    this.onCartAction();
  }

  /**
   * Registers events for the cart actions.
   */
  protected onCartAction(): void {
    this.subscriptions.add(
      this.eventService.get(LoadCartEvent).subscribe(({ userId, cartId }) => {
        /**
         * TODO:#deprecation-checkout We have to keep this here, since the cart feature is still ngrx-based.
         * Remove once it is switched from ngrx to c&q.
         * We should dispatch an event, which will load the cart$ query.
         */
        this.store.dispatch(
          new CartActions.LoadCart({
            userId,
            cartId,
          })
        );
      })
    );

    this.subscriptions.add(
      this.eventService.get(RemoveCartEvent).subscribe(({ cartId }) => {
        /**
         * Remove once it is switched from ngrx to c&q.
         * We should dispatch an event, which will load the cart$ query.
         */
        this.store.dispatch(new CartActions.RemoveCart({ cartId }));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
