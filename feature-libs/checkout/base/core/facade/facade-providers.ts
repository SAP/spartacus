/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
  CheckoutQueryFacade,
} from '@spartacus/checkout/base/root';
import { CheckoutDeliveryAddressService } from './checkout-delivery-address.service';
import { CheckoutDeliveryModesService } from './checkout-delivery-modes.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { CheckoutQueryService } from './checkout-query.service';

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
  CheckoutQueryService,
  {
    provide: CheckoutQueryFacade,
    useExisting: CheckoutQueryService,
  },
];
