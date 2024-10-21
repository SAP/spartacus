/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';

export const CART_ACCESS_CODE_NORMALIZER = new InjectionToken<
  Converter<any, string>
>('CartAccessCodeNormalizer');
