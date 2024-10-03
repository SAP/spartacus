/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
@Injectable({
  providedIn: 'root',
})
export class CdcB2BUserService extends B2BUserService {
  isUpdatingUserAllowed(): boolean {
    return false;
  }
}
