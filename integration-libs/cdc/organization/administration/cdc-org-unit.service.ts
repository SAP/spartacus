/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
@Injectable({
  providedIn: 'root',
})
export class CdcOrgUnitService extends OrgUnitService {
  isUpdatingUnitAllowed(): boolean {
    return false;
  }
}
