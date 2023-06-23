/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentFacade,
} from '@spartacus/opf/base/root';

import { OpfOrderService } from './opf-order.service';
import { OpfOtpService } from './opf-otp.service';
import { OpfPaymentService } from './opf-payment.service';

export const facadeProviders: Provider[] = [
  OpfPaymentService,
  OpfOrderService,
  OpfOtpService,
  {
    provide: OpfPaymentFacade,
    useExisting: OpfPaymentService,
  },

  {
    provide: OpfOrderFacade,
    useExisting: OpfOrderService,
  },
  {
    provide: OpfOtpFacade,
    useExisting: OpfOtpService,
  },
];
