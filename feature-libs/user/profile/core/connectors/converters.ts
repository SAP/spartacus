/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@commerce-storefront-toolset/core';
import { User } from '@commerce-storefront-toolset/user/account/root';
import { Title, UserSignUp } from '@commerce-storefront-toolset/user/profile/root';

export const USER_PROFILE_NORMALIZER = new InjectionToken<Converter<User, any>>(
  'UserProfileNormalizer'
);

export const USER_PROFILE_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserProfileSerializer'
);

export const USER_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserSerializer'
);

export const USER_SIGN_UP_SERIALIZER = new InjectionToken<
  Converter<UserSignUp, any>
>('UserSignUpSerializer');

export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);
