/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-date-range-cell',
  templateUrl: './date-range-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DateRangeCellComponent extends CellComponent {
  get linkable(): boolean {
    return this.hasRange && (this.cellOptions.linkable ?? false);
  }

  get hasRange(): boolean {
    return !!this.model.startDate && !!this.model.endDate;
  }
}
