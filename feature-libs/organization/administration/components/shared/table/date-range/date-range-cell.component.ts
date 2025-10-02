/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '../../../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { CxDatePipe } from '../../../../../../../projects/core/src/i18n/date.pipe';
import { MockDatePipe } from '../../../../../../../projects/core/src/i18n/testing/mock-date.pipe';

@Component({
    selector: 'cx-org-date-range-cell',
    templateUrl: './date-range-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        RouterLink,
        NgTemplateOutlet,
        UrlPipe,
        CxDatePipe,
        MockDatePipe,
    ],
})
export class DateRangeCellComponent extends CellComponent {
  get linkable(): boolean {
    return this.hasRange && (this.cellOptions.linkable ?? false);
  }

  get hasRange(): boolean {
    return !!this.model.startDate && !!this.model.endDate;
  }
}
