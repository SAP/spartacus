import { Injectable } from '@angular/core';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../shared';
import { EntitiesModel, CostCenter } from '@spartacus/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrgUnitService } from '../../../core/services/org-unit.service';

@Injectable({
  providedIn: 'root',
})
export class UnitCostCentersService extends BaseOrganizationListService<
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
