/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
  CostCenterService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetListService extends SubListService<Budget> {
  protected tableService: TableService;
  protected costCenterService = inject(CostCenterService);
  protected budgetService = inject(BudgetService);

  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;
  protected _domainType = OrganizationTableType.BUDGET;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const tableService = inject(TableService);

    super(tableService);
  
    this.tableService = tableService;
  }

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<Budget> | undefined> {
    return this.costCenterService.getBudgets(code, pagination);
  }

  /**
   * @override
   * Assign budget to the cost center.
   */
  assign(
    costCenterCode: string,
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    this.costCenterService.assignBudget(costCenterCode, budgetCode);
    return this.budgetService.getLoadingStatus(budgetCode);
  }

  /**
   * @override
   * Unassign the budget from the cost center.
   */
  unassign(
    costCenterCode: string,
    budgetCode: string
  ): Observable<OrganizationItemStatus<Budget>> {
    this.costCenterService.unassignBudget(costCenterCode, budgetCode);
    return this.budgetService.getLoadingStatus(budgetCode);
  }
}
