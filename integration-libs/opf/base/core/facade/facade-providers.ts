/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OpfConfigurationFacade,
  OpfGlobalFunctionsFacade,
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentFacade,
} from '@spartacus/opf/base/root';

import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';
import { OpfConfigurationService } from './opf-configuration.service';
import { OpfGlobalFunctionsService } from './opf-global-functions.service';
import { OpfOrderService } from './opf-order.service';
import { OpfOtpService } from './opf-otp.service';
import { OpfPaymentService } from './opf-payment.service';

export const facadeProviders: Provider[] = [
  OpfPaymentService,
  OpfPaymentHostedFieldsService,
  OpfOrderService,
  OpfOtpService,
  OpfGlobalFunctionsService,
  OpfConfigurationService,
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
  {
    provide: OpfConfigurationFacade,
    useExisting: OpfConfigurationService,
  },
];
