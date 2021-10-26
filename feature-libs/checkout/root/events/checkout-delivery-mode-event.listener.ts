import { Injectable, OnDestroy } from '@angular/core';
import {
  DeleteUserAddressEvent,
  EventService,
  UpdateUserAddressEvent,
  UserAddressEvent,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CheckoutDeliveryModesFacade } from '../facade/checkout-delivery-modes.facade';
import { ResetDeliveryModesEvent } from './checkout.events';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDeliveryModeEventListener implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
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
  protected onUserAddressChange(): void {
    this.subscriptions.add(
      this.eventService
        .get(UserAddressEvent)
        .pipe(
          filter(
            (event) =>
              event instanceof UpdateUserAddressEvent ||
              event instanceof DeleteUserAddressEvent
          )
        )
        .subscribe(() => {
          // we want to LL the checkout (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
          this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode();

          this.eventService.dispatch({}, ResetDeliveryModesEvent);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
