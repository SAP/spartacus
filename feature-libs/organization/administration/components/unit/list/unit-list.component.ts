/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { UnitTreeService } from '../services/unit-tree.service';

@Component({
  selector: 'cx-org-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UnitListComponent {
  protected unitTreeService = inject(UnitTreeService);
  protected orgUnitService? = inject(OrgUnitService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  readonly isUpdatingUnitAllowed = this.orgUnitService
    ? this.orgUnitService.isUpdatingUnitAllowed()
    : true;

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }
}
