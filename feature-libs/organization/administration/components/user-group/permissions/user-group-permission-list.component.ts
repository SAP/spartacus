/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { UserGroupPermissionListService } from './user-group-permission-list.service';
import { SubListComponent } from '../../shared/sub-list/sub-list.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-user-group-permission-list',
  templateUrl: './user-group-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserGroupPermissionListService,
    },
  ],
  imports: [SubListComponent, RouterLink, TranslatePipe],
})
export class UserGroupPermissionListComponent {}
