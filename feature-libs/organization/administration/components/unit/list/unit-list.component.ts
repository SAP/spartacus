/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitTreeService } from '../services/unit-tree.service';

@Component({
  selector: 'cx-org-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  constructor(protected unitTreeService: UnitTreeService) {}

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }
}
