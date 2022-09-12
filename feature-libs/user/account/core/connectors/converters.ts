/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@commerce-storefront-toolset/core';
import { User } from '@commerce-storefront-toolset/user/account/root';

export const USER_ACCOUNT_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserAccountNormalizer'
);

export const USER_ACCOUNT_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserAccountSerializer'
);
