/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CheckoutState } from '@commerce-storefront-toolset/checkout/base/root';
import { Converter } from '@commerce-storefront-toolset/core';

export const CHECKOUT_NORMALIZER = new InjectionToken<
  Converter<any, CheckoutState>
>('CheckoutNormalizer');
