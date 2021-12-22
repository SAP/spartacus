import { Provider } from '@angular/core';
import {
  CheckoutAuthGuard,
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutFacade,
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
  CheckoutStepsSetGuard,
} from '@spartacus/checkout/base/root';
import { CheckoutBaseAuthGuard } from '../../components/guards/checkout-base-auth.guard';
import { CheckoutBaseStepsSetGuard } from '../../components/guards/checkout-base-steps-set.guard';
import { CheckoutDeliveryAddressService } from './checkout-delivery-address.service';
import { CheckoutDeliveryModesService } from './checkout-delivery-modes.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { CheckoutQueryService } from './checkout-query.service';
import { CheckoutService } from './checkout.service';

export const facadeProviders: Provider[] = [
  CheckoutDeliveryAddressService,
  {
    provide: CheckoutDeliveryAddressFacade,
    useExisting: CheckoutDeliveryAddressService,
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

  CheckoutBaseAuthGuard,
  {
    provide: CheckoutAuthGuard,
    useExisting: CheckoutBaseAuthGuard,
  },
  CheckoutBaseStepsSetGuard,
  {
    provide: CheckoutStepsSetGuard,
    useExisting: CheckoutBaseStepsSetGuard,
  },
];
