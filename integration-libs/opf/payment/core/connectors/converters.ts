/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OpfPaymentInitiationConfig } from '@spartacus/opf/payment/root';

export const OPF_PAYMENT_CONFIG_SERIALIZER = new InjectionToken<
  Converter<OpfPaymentInitiationConfig, any>
>('OpfPaymentConfigSerializer');
