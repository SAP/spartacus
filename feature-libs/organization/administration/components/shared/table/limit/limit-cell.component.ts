/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-limit-cell',
  templateUrl: './limit-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, NgTemplateOutlet, UrlPipe, TranslatePipe],
})
export class LimitCellComponent extends CellComponent {
  get isTimeSpanThreshold(): boolean {
    return (
      (this.model as Permission).orderApprovalPermissionType?.code ===
      'B2BOrderThresholdTimespanPermission'
    );
  }

  get isOrderThreshold(): boolean {
    return (
      (this.model as Permission).orderApprovalPermissionType?.code ===
      'B2BOrderThresholdPermission'
    );
  }

  get isExceedPermission(): boolean {
    return (
      (this.model as Permission).orderApprovalPermissionType?.code ===
      'B2BBudgetExceededPermission'
    );
  }
}
