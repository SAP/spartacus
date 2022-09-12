/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CardType, PaymentDetails } from '@commerce-storefront-toolset/cart/base/root';
import { Converter } from '@commerce-storefront-toolset/core';

export const PAYMENT_DETAILS_SERIALIZER = new InjectionToken<
  Converter<PaymentDetails, any>
>('PaymentDetailsSerializer');

export const PAYMENT_CARD_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, CardType>
>('PaymentCardTypeNormalizer');
