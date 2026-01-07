/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import { PopoverDirective } from '@spartacus/storefront';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-permission-details-cell',
  templateUrl: './permission-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIf, PopoverDirective, TranslatePipe, UrlPipe],
})
export class PermissionDetailsCellComponent extends CellComponent {}
