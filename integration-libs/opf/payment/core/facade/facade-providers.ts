/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { OpfPaymentHostedFieldsService } from '../services/opf-payment-hosted-fields.service';
import { OpfPaymentService } from './opf-payment.service';

export const facadeProviders: Provider[] = [
  OpfPaymentService,
  OpfPaymentHostedFieldsService,
  {
    provide: OpfPaymentFacade,
    useExisting: OpfPaymentService,
  },
];
