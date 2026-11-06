/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CxDatePipe, TranslatePipe, UrlPipe } from '@spartacus/core';
import { PopoverDirective } from '@spartacus/storefront';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-budget-details-cell',
  templateUrl: './budget-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PopoverDirective, TranslatePipe, CxDatePipe, UrlPipe],
})
export class BudgetDetailsCellComponent extends CellComponent {}
