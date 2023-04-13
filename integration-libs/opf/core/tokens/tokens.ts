/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';

export const OPF_ACTIVE_CONFIGURATION_NORMALIZER = new InjectionToken<
  Converter<any, ActiveConfiguration[]>
>('OpfActiveConfigurationNormalizer');

export const OPF_VERIFY_PAYMENT_NORMALIZER = new InjectionToken<
  Converter<any, OpfVerifyPaymentResponse>
>('OpfVerifyPaymentNormalizer');
