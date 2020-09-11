import { Injectable } from '@angular/core';
import { B2BUnitNode, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationListService, OrganizationTableType } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class UnitChildrenService extends OrganizationListService<B2BUnitNode> {
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
