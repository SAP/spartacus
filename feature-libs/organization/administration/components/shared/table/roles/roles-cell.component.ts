/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-roles-cell',
  templateUrl: './roles-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet, UrlPipe, TranslatePipe],
})
export class RolesCellComponent extends CellComponent {}
