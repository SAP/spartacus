import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import {
  DeleteUserAddressEvent,
  UpdateUserAddressEvent,
  UserAddressEvent,
} from '../../user/events/user.events';
import { CheckoutDeliveryService } from '../facade/checkout-delivery.service';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected checkoutDeliverySerrvice: CheckoutDeliveryService,
    protected eventService: EventService
  ) {
    this.onUserAddressChange();
  }

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
          this.checkoutDeliverySerrvice.clearCheckoutDeliveryDetails();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
