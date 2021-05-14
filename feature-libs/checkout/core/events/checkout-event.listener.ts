import { Injectable, OnDestroy } from '@angular/core';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import { EventService, UserAddressChangeEvent } from '@spartacus/core';
import { Subscription } from 'rxjs';

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
      this.eventService.get(UserAddressChangeEvent).subscribe((_event) => {
        this.checkoutDeliveryFacade.clearCheckoutDeliveryDetails();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
