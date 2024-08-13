/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OpfCartFacade,
  OpfGlobalFunctionsFacade,
  OpfOrderFacade,
  OpfPaymentFacade,
} from '@spartacus/opf/base/root';

import { OpfPaymentApplePayService } from '../services/opf-payment-apple-pay.service';
import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';
import { OpfCartService } from './opf-cart.service';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';
import { OpfOrderService } from './opf-order.service';
import { OpfPaymentService } from './opf-payment.service';

export const facadeProviders: Provider[] = [
  OpfPaymentService,
  OpfPaymentHostedFieldsService,
  OpfPaymentApplePayService,
  OpfOrderService,
  OpfCartService,
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
    provide: OpfCartFacade,
    useExisting: OpfCartService,
  },
  {
    provide: OpfGlobalFunctionsFacade,
    useExisting: OpfGlobalFunctionsService,
  },
];
