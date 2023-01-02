/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUser, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccB2bUserSerializer implements Converter<B2BUser, Occ.B2BUser> {
  constructor() {
    // Intentional empty constructor
  }

  convert(source: B2BUser, target?: Occ.B2BUser): Occ.B2BUser {
    if (target === undefined) {
      target = { ...(source as any) } as Occ.B2BUser;
    }
    delete (target as B2BUser).isAssignedToApprovers;
    if (target.active === false) {
      target.roles = [];
    }
    return target;
  }
}
