/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccUserGroupNormalizer
  implements Converter<Occ.OrgUnitUserGroup, UserGroup>
{
  constructor() {
    // Intentional empty constructor
  }

  convert(source: Occ.OrgUnitUserGroup, target?: UserGroup): UserGroup {
    if (target === undefined) {
      target = { ...(source as any) } as UserGroup;
    }
    return target;
  }
}
