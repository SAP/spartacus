/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { PaymentInitiationConfig } from '@spartacus/opf/payment/root';

export const OPF_PAYMENT_CONFIG_SERIALIZER = new InjectionToken<
  Converter<PaymentInitiationConfig, any>
>('OpfPaymentConfigSerializer');
