/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { CartModificationList } from '@commerce-storefront-toolset/cart/base/root';
import { Converter } from '@commerce-storefront-toolset/core';

export const CART_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModificationList>
>('CartValidationNormalizer');
