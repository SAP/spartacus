import { Injectable, OnDestroy } from '@angular/core';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
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
    protected eventService: EventService
  ) {
    this.onUserAddressChange();
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
