import { Injectable } from '@angular/core';
import {
  B2BSearchConfig,
  Budget,
  CostCenterService,
  EntitiesModel,
} from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../../shared/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

/**
 * Service to populate Cost Center Budget data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER_BUDGETS`.
 */
@Injectable({
  providedIn: 'root',
})
export class CostCenterBudgetListService extends BaseOrganizationListService<
  Budget
> {
  protected tableType = OrganizationTableType.COST_CENTER_BUDGETS;

  constructor(
    protected tableService: TableService,
    protected costCenterService: CostCenterService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<Table<Budget>> {
    const config: B2BSearchConfig = structure.pagination;
    return this.costCenterService
      .getBudgets(code, config)
      .pipe(map((raw) => this.populateData(structure, raw)));
  }

  protected populateData(
    structure: TableStructure,
    data: EntitiesModel<any>
  ): Table<Budget> {
    const table = super.populateData(structure, data);
    table.data = table.data.filter((value) => value.selected);

    return table;
  }
}
