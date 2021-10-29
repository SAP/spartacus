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
import {
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
} from './checkout.events';

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
    this.onDeliveryAddressChange();
    this.onDeliveryModeChange();
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
          // we want to LL the checkout feature (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
          this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode();

          this.eventService.dispatch({}, ResetDeliveryModesEvent);
        })
    );
  }

  protected onDeliveryAddressChange(): void {
    this.subscriptions.add(
      this.eventService.get(DeliveryAddressSetEvent).subscribe(() =>
        // we want to LL the checkout feature (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
        this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()
      )
    );
  }

  protected onDeliveryModeChange(): void {
    this.subscriptions.add(
      this.eventService
        .get(DeliveryModeSetEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, ResetCheckoutQueryEvent)
        )
    );
    this.subscriptions.add(
      this.eventService
        .get(DeliveryModeClearedEvent)
        .subscribe(() =>
          this.eventService.dispatch({}, ResetCheckoutQueryEvent)
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
