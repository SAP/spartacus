/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { CartUserEmailResponse } from '../model';

export const OPF_GET_CART_USER_EMAIL_NORMALIZER = new InjectionToken<
  Converter<any, CartUserEmailResponse>
>('OpfGetCartUserEmailNormalizer');
