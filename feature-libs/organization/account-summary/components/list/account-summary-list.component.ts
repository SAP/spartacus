/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { UnitListComponent } from '@spartacus/organization/administration/components';
import { ListComponent } from '../../../administration/components/shared/list/list.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';
@Component({
  selector: 'cx-account-summary-list',
  templateUrl: './account-summary-list.component.html',
  imports: [ListComponent, TranslatePipe, MockTranslatePipe],
})
export class AccountSummaryListComponent extends UnitListComponent {}
