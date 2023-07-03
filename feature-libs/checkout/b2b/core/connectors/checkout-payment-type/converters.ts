/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { PaymentType } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';

export const CHECKOUT_PAYMENT_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, PaymentType>
>('CheckoutPaymentTypeNormalizer');
