/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, Occ, OrderApprovalPermissionType } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccPermissionTypeNormalizer
  implements
    Converter<Occ.OrderApprovalPermissionType, OrderApprovalPermissionType>
{
  constructor() {
    // Intentional empty constructor
  }

  convert(
    source: Occ.OrderApprovalPermissionType,
    target?: OrderApprovalPermissionType
  ): OrderApprovalPermissionType {
    if (target === undefined) {
      target = { ...(source as any) } as OrderApprovalPermissionType;
    }
    return target;
  }
}
