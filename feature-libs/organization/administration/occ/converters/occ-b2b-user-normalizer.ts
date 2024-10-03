/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUser, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccB2BUserNormalizer implements Converter<Occ.B2BUser, B2BUser> {
  constructor() {
    // Intentional empty constructor
  }

  convert(source: Occ.B2BUser, target?: B2BUser): B2BUser {
    if (target === undefined) {
      target = { ...(source as any) } as B2BUser;
    }
    target.email = source?.uid;

    return target;
  }
}
