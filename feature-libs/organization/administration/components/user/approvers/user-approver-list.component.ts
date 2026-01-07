/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';
import { ListService } from '../../shared/list/list.service';
import { SubListComponent } from '../../shared/sub-list/sub-list.component';
import { UserApproverListService } from './user-approver-list.service';

@Component({
  selector: 'cx-org-user-approver-list',
  templateUrl: './user-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserApproverListService,
    },
  ],
  imports: [SubListComponent, RouterLink, TranslatePipe],
})
export class UserApproverListComponent {}
