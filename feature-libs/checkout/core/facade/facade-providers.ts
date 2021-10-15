import { Provider } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
} from '@spartacus/checkout/root';
import { CheckoutDeliveryService } from './checkout-delivery.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { CheckoutQueryService } from './checkout-query.service';
import { CheckoutService } from './checkout.service';

export const facadeProviders: Provider[] = [
  CheckoutDeliveryService,
  {
    provide: CheckoutDeliveryFacade,
    useExisting: CheckoutDeliveryService,
  },
  CheckoutPaymentService,
  {
    provide: CheckoutPaymentFacade,
    useExisting: CheckoutPaymentService,
  },
  CheckoutService,
  {
    provide: CheckoutFacade,
    useExisting: CheckoutService,
  },
  CheckoutQueryService,
  {
    provide: CheckoutQueryFacade,
    useExisting: CheckoutQueryService,
  },
];
