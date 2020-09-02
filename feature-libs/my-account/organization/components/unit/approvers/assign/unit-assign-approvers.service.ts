import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  BaseOrganizationListService,
  OrganizationTableType,
} from '../../../shared/index';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

@Injectable({
  providedIn: 'root',
})
export class UnitAssignApproversService extends BaseOrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.UNIT_ASSIGN_APPROVERS;

  constructor(
    protected tableService: TableService,
    protected orgUnitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string,
    roleId: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.orgUnitService.getUsers(code, roleId, structure.pagination);
  }

  toggleAssign(
    orgUnitId: string,
    orgCustomerId: string,
    roleId: string,
    assign = true
  ) {
    if (assign) {
      this.orgUnitService.assignApprover(orgUnitId, orgCustomerId, roleId);
    } else {
      this.orgUnitService.unassignApprover(orgUnitId, orgCustomerId, roleId);
    }
  }
}
