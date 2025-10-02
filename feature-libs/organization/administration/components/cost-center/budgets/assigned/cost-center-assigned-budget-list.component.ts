/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { CostCenterAssignedBudgetListService } from './cost-center-assigned-budget-list.service';
import { SubListComponent } from '../../../shared/sub-list/sub-list.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-org-cost-center-assigned-budget-list',
  templateUrl: './cost-center-assigned-budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: CostCenterAssignedBudgetListService,
    },
  ],
  imports: [SubListComponent, RouterLink, TranslatePipe, MockTranslatePipe],
})
export class CostCenterAssignedBudgetListComponent {}
