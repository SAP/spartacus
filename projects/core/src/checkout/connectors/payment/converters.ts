/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { PaymentDetails } from '../../../model/payment.model';
import { Converter } from '../../../util/converter.service';

export const PAYMENT_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, PaymentDetails>
>('PaymentDetailsNormalizer');
