/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { PaymentInitiationConfig } from '@spartacus/opf/checkout/root';

export const OPF_PAYMENT_CONFIG_SERIALIZER = new InjectionToken<
  Converter<PaymentInitiationConfig, any>
>('OpfPaymentConfigSerializer');

export const OTP_NORMALIZER = new InjectionToken<
  Converter<any, string | undefined>
>('OtpNormalizer');
