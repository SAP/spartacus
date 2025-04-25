/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfCheckoutPaymentTypeService } from './opf-checkout-payment-type.service';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';

export const facadeProviders: Provider[] = [
  OpfCheckoutPaymentTypeService,
  {
    provide: CheckoutPaymentTypeFacade,
    useExisting: OpfCheckoutPaymentTypeService,
  },
];
