/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../../shared/list/list.service';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';
import { SubListComponent } from '../../../../shared/sub-list/sub-list.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-unit-assigned-approver-list',
  templateUrl: './unit-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UnitAssignedApproverListService,
    },
  ],
  imports: [SubListComponent, RouterLink, TranslatePipe],
})
export class UnitAssignedApproverListComponent {}
