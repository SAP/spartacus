/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../cell.component';
import { NgIf, NgTemplateOutlet, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-roles-cell',
  templateUrl: './roles-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    RouterLink,
    NgTemplateOutlet,
    NgFor,
    UrlPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class RolesCellComponent extends CellComponent {}
