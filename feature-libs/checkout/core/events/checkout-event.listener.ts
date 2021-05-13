import { Injectable } from '@angular/core';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import { EventService, UserAddressChangeEvent } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutEventListener {
  constructor(
    protected checkoutDeliveryFacade: CheckoutDeliveryFacade,
    protected eventService: EventService
  ) {
    this.onUserAddressChange();
  }

  onUserAddressChange() {
    this.eventService.get(UserAddressChangeEvent).subscribe((_event) => {
      console.log('CheckoutEventListener UserAddressChangeEvent recieved.');
      this.checkoutDeliveryFacade.clearCheckoutDeliveryDetails();
    });
  }
}
