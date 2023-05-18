/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfCheckoutFacade, OpfOrderFacade } from '@spartacus/opf/payment/root';

import { OpfCheckoutService } from './opf-checkout.service';
import { OpfOrderService } from './opf-order.service';

export const facadeProviders: Provider[] = [
  OpfCheckoutService,
  OpfOrderService,

  {
    provide: OpfCheckoutFacade,
    useExisting: OpfCheckoutService,
  },

  {
    provide: OpfOrderFacade,
    useExisting: OpfOrderService,
  },
];
