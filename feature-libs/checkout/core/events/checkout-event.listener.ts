import { Injectable, OnDestroy } from '@angular/core';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
  SavedCartEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutDeliveryFacade,
  ClearCheckoutFacade,
} from '@spartacus/checkout/root';
import {
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
  UserAddressEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected checkoutDeliveryFacade: CheckoutDeliveryFacade,
    protected clearCheckoutFacade: ClearCheckoutFacade,
    protected eventService: EventService
  ) {
    this.onUserAddressChange();
    this.onSavedCartChange();
  }

  /**
   * Clears the checkout delivery info when an address in the address book is
   * changed ( updated, set as default or deleted )
   *
   * Listens for UpdateUserAddressEvent or DeleteUserAddressEvent
   */
  protected onUserAddressChange() {
    this.subscription.add(
      this.eventService
        .get(UserAddressEvent)
        .pipe(
          filter((event) => {
            return (
              event instanceof UpdateUserAddressEvent ||
              event instanceof DeleteUserAddressEvent
            );
          })
        )
        .subscribe((_event) => {
          this.checkoutDeliveryFacade.clearCheckoutDeliveryDetails();
        })
    );
  }

  /**
   * What te active cart is saved for later or when a saved card is restored,
   * the whole checkout state is reset.
   *
   * Listens for SaveCartSuccessEvent or RestoreSavedCartSuccessEvent
   */
  protected onSavedCartChange() {
    this.subscription.add(
      this.eventService
        .get(SavedCartEvent)
        .pipe(
          filter((event) => {
            return (
              event instanceof SaveCartSuccessEvent ||
              event instanceof RestoreSavedCartSuccessEvent
            );
          })
        )
        .subscribe((_event) => {
          this.clearCheckoutFacade.resetCheckoutProcesses();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
