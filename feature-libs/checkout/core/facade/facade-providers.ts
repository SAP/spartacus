import { Provider } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
  PaymentTypeFacade,
} from '@spartacus/checkout/root';
import { CheckoutDeliveryService } from './checkout-delivery.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { CheckoutService } from './checkout.service';
import { PaymentTypeService } from './payment-type.service';

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
  PaymentTypeService,
  {
    provide: PaymentTypeFacade,
    useExisting: PaymentTypeService,
  },
];
