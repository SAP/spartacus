/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import {
  Permission,
  PERMISSION_NORMALIZER,
} from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccPermissionListNormalizer
  implements Converter<Occ.PermissionsList, EntitiesModel<Permission>>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.PermissionsList,
    target?: EntitiesModel<Permission>
  ): EntitiesModel<Permission> {
    if (target === undefined) {
      target = { ...(source as any) } as EntitiesModel<Permission>;
    }
    target.values =
      source.orderApprovalPermissions?.map((permission) => ({
        ...this.converter.convert(permission, PERMISSION_NORMALIZER),
      })) ?? [];
    return target;
  }
}
