import { Injectable } from '@angular/core';
import { CostCenter, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetCostCenterListService extends SubListService<Budget> {
  protected tableType = OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS;
  protected _domainType = OrganizationTableType.COST_CENTER;

  constructor(
    protected tableService: TableService,
    protected budgetService: BudgetService
  ) {
    super(tableService);
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
