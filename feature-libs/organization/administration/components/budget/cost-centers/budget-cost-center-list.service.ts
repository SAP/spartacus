/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CostCenter, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetCostCenterListService extends SubListService<Budget> {
  protected tableService: TableService;
  protected budgetService = inject(BudgetService);

  protected tableType = OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS;
  protected _domainType = OrganizationTableType.COST_CENTER;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const tableService = inject(TableService);

    super(tableService);
  
    this.tableService = tableService;
  }

  protected load(
    _pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<CostCenter>> {
    return this.budgetService.getCostCenters(code).pipe(
      filter((list) => Boolean(list)),
      map((costCenter) => this.filterSelected(costCenter))
    );
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<CostCenter>): EntitiesModel<CostCenter> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.active),
    };
  }
}
