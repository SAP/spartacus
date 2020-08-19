import { Injectable } from '@angular/core';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseOrganizationListService } from '../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { CostCenterService } from '../../../core/services/cost-center.service';

/**
 * The UI model for the cost center, which is a slightly flattened version
 * of the core cost center model.
 */
export interface CostCenterModel {
  code?: string;
  name?: string;
  unit?: any;
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
  ): Observable<EntitiesModel<CostCenterModel>> {
    const paginationConfig = structure.pagination;
    return this.costCenterService
      .getList(paginationConfig)
      .pipe(map((raw) => this.convertCostCenters(raw)));
  }

  /**
   * Populates the cost center data to a convenient table data model, so that we
   * can skip specific conversion in the view logic where possible.
   */
  protected convertCostCenters({
    pagination,
    sorts,
    values,
  }: EntitiesModel<CostCenter>): EntitiesModel<CostCenterModel> {
    const costCenterModels: EntitiesModel<CostCenterModel> = {
      pagination,
      sorts,
      values: values.map((value: any) => ({
        ...value,
        currency: value.currency?.isocode,
      })),
    };
    return costCenterModels;
  }
}
