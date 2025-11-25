/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { PopoverDirective } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { UrlPipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-unit-details-cell',
  templateUrl: './unit-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIf, PopoverDirective, TranslatePipe, UrlPipe],
})
export class UnitDetailsCellComponent extends CellComponent {}
