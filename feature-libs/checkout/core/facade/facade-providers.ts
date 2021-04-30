import { Provider } from '@angular/core';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import { CheckoutDeliveryService } from './checkout-delivery.service';

export const facadeProviders: Provider[] = [
  CheckoutDeliveryService,
  {
    provide: CheckoutDeliveryFacade,
    useExisting: CheckoutDeliveryService,
  },
];
