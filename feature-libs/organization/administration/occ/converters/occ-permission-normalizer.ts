/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccPermissionNormalizer
  implements Converter<Occ.Permission, Permission>
{
  convert(source: Occ.Permission, target?: Permission): Permission {
    if (target === undefined) {
      target = { ...(source as any) } as Permission;
    }
    return target;
  }
}
