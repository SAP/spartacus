import { Injectable, OnDestroy } from '@angular/core';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutDeliveryFacade,
  ClearCheckoutFacade,
} from '@spartacus/checkout/root';
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
    protected clearCheckoutFacade: ClearCheckoutFacade,
    protected eventService: EventService
  ) {
    this.onUserAddressChange();
    this.onSaveCartSuccess();
    this.onRestoreSavedCartSuccess();
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

  protected onSaveCartSuccess() {
    this.subscription.add(
      this.eventService.get(SaveCartSuccessEvent).subscribe((_event) => {
        this.clearCheckoutFacade.resetCheckoutProcesses();
      })
    );
  }

  protected onRestoreSavedCartSuccess() {
    this.subscription.add(
      this.eventService
        .get(RestoreSavedCartSuccessEvent)
        .subscribe((_event) => {
          this.clearCheckoutFacade.resetCheckoutProcesses();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
