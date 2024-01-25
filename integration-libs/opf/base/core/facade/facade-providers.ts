/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OpfGlobalFunctionsFacade,
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentFacade,
} from '@spartacus/opf/base/root';

import { OpfPaymentApplePayService } from '../services/opf-payment-apple-pay.service';
import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';
import { OpfOrderService } from './opf-order.service';
import { OpfOtpService } from './opf-otp.service';
import { OpfPaymentService } from './opf-payment.service';

export const facadeProviders: Provider[] = [
  OpfPaymentService,
  OpfPaymentHostedFieldsService,
  OpfPaymentApplePayService,
  OpfOrderService,
  OpfOtpService,
  OpfGlobalFunctionsService,
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
  {
    provide: OpfGlobalFunctionsFacade,
    useExisting: OpfGlobalFunctionsService,
  },
];
