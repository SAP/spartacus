import { Injectable } from '@angular/core';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationListService, OrganizationTableType } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class UnitCostCentersService extends OrganizationListService<
  CostCenter
> {
  protected tableType = OrganizationTableType.UNIT_COST_CENTERS;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(_, code: string): Observable<EntitiesModel<CostCenter>> {
    return this.orgUnitService.getCostCenters(code);
  }
}
