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
    this.eventService.get(UserAddressChangeEvent).subscribe((_event) => {
      this.checkoutDeliveryFacade.clearCheckoutDeliveryDetails();
    });
  }
}
