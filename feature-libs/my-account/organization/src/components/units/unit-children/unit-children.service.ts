import { Injectable } from '@angular/core';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../shared';
import { EntitiesModel, OrgUnitService, B2BUnitNode } from '@spartacus/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitChildrenService extends BaseOrganizationListService<
  B2BUnitNode
> {
  protected tableType = OrganizationTableType.UNIT_CHILDREN;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  // method to be adjusted for proper children list when ready
  protected load(_, code: string): Observable<EntitiesModel<B2BUnitNode>> {
    return this.orgUnitService.getChildUnits(code);
  }
}
