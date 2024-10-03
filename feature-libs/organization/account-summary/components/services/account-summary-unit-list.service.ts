/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  OrganizationTableType,
  UnitListService,
} from '@spartacus/organization/administration/components';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryUnitListService extends UnitListService {
  protected tableType = OrganizationTableType.ACCOUNT_SUMMARY_UNIT as any;
}
