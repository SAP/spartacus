/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';
import { ListService } from '../../../shared/list/list.service';
import { SubListComponent } from '../../../shared/sub-list/sub-list.component';
import { UserAssignedApproverListService } from './user-assigned-approver-list.service';

@Component({
  selector: 'cx-org-user-assigned-approver-list',
  templateUrl: './user-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserAssignedApproverListService,
    },
  ],
  imports: [SubListComponent, RouterLink, TranslatePipe],
})
export class UserAssignedApproverListComponent {}
