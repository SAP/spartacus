/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfB2bCheckoutPaymentTypeService } from './opf-b2b-checkout-payment-type.service';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';

export const facadeProviders: Provider[] = [
  OpfB2bCheckoutPaymentTypeService,
  {
    provide: CheckoutPaymentTypeFacade,
    useExisting: OpfB2bCheckoutPaymentTypeService,
  },
];
