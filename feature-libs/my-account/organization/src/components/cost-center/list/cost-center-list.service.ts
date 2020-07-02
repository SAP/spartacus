import { Injectable } from '@angular/core';
import {
  B2BSearchConfig,
  CostCenter,
  CostCenterService,
  EntitiesModel,
} from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../shared/organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

/**
 * The UI model for the cost center, which is a slightly flattened version
 * of the core cost center model.
 */
export interface CostCenterModel {
  code?: string;
  name?: string;
  currency?: string;
  active?: boolean;
}

/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
@Injectable({
  providedIn: 'root',
})
export class CostCenterListService extends BaseOrganizationListService<
  CostCenterModel
> {
  protected tableType = OrganizationTableType.COST_CENTER;

  constructor(
    protected tableService: TableService,
    protected costCenterService: CostCenterService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    _params?
  ): Observable<Table<CostCenterModel>> {
    const config: B2BSearchConfig = structure.pagination;
    return this.costCenterService
      .getList(config)
      .pipe(map((raw) => this.populateData(structure, raw)));
  }

  /**
   * Populates the cost center data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected populateData(
    structure: TableStructure,
    costCenters: EntitiesModel<CostCenter>
  ): Table<CostCenterModel> {
    const data: CostCenterModel[] = Array.from(costCenters.values).map(
      (value: any) => ({
        ...value,
        currency: value.currency?.isocode,
        active: value.active,
      })
    );

    return {
      structure,
      data,
      pagination: costCenters.pagination,
    };
  }
}
