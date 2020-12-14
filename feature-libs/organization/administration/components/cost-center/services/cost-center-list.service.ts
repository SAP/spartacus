import { Injectable } from '@angular/core';
import { CostCenter, EntitiesModel, PaginationModel } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';

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
export class CostCenterListService extends ListService<CostCenterModel> {
  protected tableType = OrganizationTableType.COST_CENTER;

  constructor(
    protected tableService: TableService,
    protected costCenterService: CostCenterService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel
  ): Observable<EntitiesModel<CostCenterModel>> {
    return this.costCenterService.getList(pagination).pipe(
      filter((list) => Boolean(list)),
      map((raw) => this.convertCostCenters(raw))
    );
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
