/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CartGuestUser } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';

export const CART_GUEST_USER_NORMALIZER = new InjectionToken<
  Converter<any, CartGuestUser>
>('CartGuestUserNormalizer');
