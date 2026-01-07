/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import {
  ListComponent,
  UnitListComponent,
} from '@spartacus/organization/administration/components';
@Component({
  selector: 'cx-account-summary-list',
  templateUrl: './account-summary-list.component.html',
  imports: [ListComponent, TranslatePipe],
})
export class AccountSummaryListComponent extends UnitListComponent {}
