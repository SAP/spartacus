/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CxDatePipe, UrlPipe } from '@spartacus/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-date-range-cell',
  templateUrl: './date-range-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, NgTemplateOutlet, UrlPipe, CxDatePipe],
})
export class DateRangeCellComponent extends CellComponent {
  get linkable(): boolean {
    return this.hasRange && (this.cellOptions.linkable ?? false);
  }

  get hasRange(): boolean {
    return !!this.model.startDate && !!this.model.endDate;
  }
}
