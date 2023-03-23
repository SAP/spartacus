/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { UnitTreeService } from '../services/unit-tree.service';

@Component({
  selector: 'cx-org-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  constructor(
    protected unitTreeService: UnitTreeService,
    protected orgUnitService?: OrgUnitService
  ) {}

  isUpdatingUnitAllowed = this.orgUnitService?.isUpdatingUnitAllowed();

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }
}
