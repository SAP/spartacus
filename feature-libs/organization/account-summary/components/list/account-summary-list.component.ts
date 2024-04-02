/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { UnitListComponent } from '@spartacus/organization/administration/components';
@Component({
  selector: 'cx-account-summary-list',
  templateUrl: './account-summary-list.component.html',
})
export class AccountSummaryListComponent extends UnitListComponent {}
