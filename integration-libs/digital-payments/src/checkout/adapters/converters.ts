/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
import { DpPaymentRequest } from '../models';

export const DP_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, PaymentDetails>
>('DpDetailsNormalizer');

export const DP_REQUEST_NORMALIZER = new InjectionToken<
  Converter<any, DpPaymentRequest>
>('DpRequestNormalizer');
