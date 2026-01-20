/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { PopoverDirective } from '@spartacus/storefront';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-user-group-details-cell',
  templateUrl: './user-group-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PopoverDirective, TranslatePipe, UrlPipe],
})
export class UserGroupDetailsCellComponent extends CellComponent {}
