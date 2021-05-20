import { Injectable, OnDestroy } from '@angular/core';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import {
  EventService,
  UserAddressDeleteEvent,
  UserAddressEvent,
  UserAddressSetAsDefaultEvent,
  UserAddressUpdateEvent,
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

  protected onUserAddressChange() {
    this.subscription.add(
      this.eventService
        .get(UserAddressEvent)
        .pipe(
          filter((event) => {
            return (
              event instanceof UserAddressUpdateEvent ||
              event instanceof UserAddressDeleteEvent ||
              event instanceof UserAddressSetAsDefaultEvent
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
