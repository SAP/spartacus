/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';

export const USER_GROUP_NORMALIZER = new InjectionToken<
  Converter<any, UserGroup>
>('UserGroupNormalizer');

export const USER_GROUP_SERIALIZER = new InjectionToken<
  Converter<UserGroup, any>
>('UserGroupSerializer');

export const USER_GROUPS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<UserGroup>>
>('UserGroupListNormalizer');
