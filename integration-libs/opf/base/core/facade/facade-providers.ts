/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfOrderFacade, OpfPaymentFacade } from '@spartacus/opf/base/root';

import { OpfOrderService } from './opf-order.service';
import { OpfPaymentService } from './opf-payment.service';

export const facadeProviders: Provider[] = [
  OpfPaymentService,
  OpfOrderService,

  {
    provide: OpfPaymentFacade,
    useExisting: OpfPaymentService,
  },

  {
    provide: OpfOrderFacade,
    useExisting: OpfOrderService,
  },
];
