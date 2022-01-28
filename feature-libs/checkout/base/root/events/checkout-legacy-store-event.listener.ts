import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import { LoadCartEvent, RemoveCartEvent } from '@spartacus/cart/base/root';
import {
  EventService,
  LoadUserAddressesEvent,
  LoadUserPaymentMethodsEvent,
  UserActions,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

/**
 * The event listener which dispatches legacy store actions.
 * It will be removed as soon as the legacy store is removed.
 */
// TODO:#deprecation-checkout remove once all the features using store are switched to c&q
@Injectable({
  providedIn: 'root',
})
export class CheckoutLegacyStoreEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected eventService: EventService,
    protected store: Store<unknown>
  ) {
    this.onUserAddressAction();
    this.onUserPaymentAction();
    this.onCartAction();
  }

  /**
   * Registers events for the user address actions.
   */
  protected onUserAddressAction(): void {
    this.subscriptions.add(
      this.eventService.get(LoadUserAddressesEvent).subscribe(({ userId }) => {
        /**
         * TODO:#deprecation-checkout We have to keep this here, since the user address feature is still ngrx-based.
         * Remove once it is switched from ngrx to c&q.
         * We should dispatch an event, which will reload the userAddress$ query.
         */
        this.store.dispatch(new UserActions.LoadUserAddresses(userId));
      })
    );
  }

  /**
   * Registers events for the user payment actions.
   */
  protected onUserPaymentAction(): void {
    this.subscriptions.add(
      this.eventService
        .get(LoadUserPaymentMethodsEvent)
        .subscribe(({ userId }) => {
          this.store.dispatch(
            /**
             * TODO:#deprecation-checkout We have to keep this here, since the user payment feature is still ngrx-based.
             * Remove once it is switched from ngrx to c&q.
             * We should dispatch an event, which will load the userPayment$ query.
             */
            new UserActions.LoadUserPaymentMethods(userId)
          );
        })
    );
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
         * TODO:#deprecation-checkout We have to keep this here, since the cart feature is still ngrx-based.
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
