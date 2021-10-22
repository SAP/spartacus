import { Provider } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutDeliveryModesFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
} from '@spartacus/checkout/root';
import { CheckoutDeliveryModesService } from './checkout-delivery-modes.service';
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
  CheckoutDeliveryModesService,
  {
    provide: CheckoutDeliveryModesFacade,
    useExisting: CheckoutDeliveryModesService,
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
