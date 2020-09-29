import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import {
  OrgUnitService,
  UserRole,
} from '@spartacus/my-account/organization/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UnitApproverListService extends OrganizationSubListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.UNIT_APPROVERS;
  protected domainType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected unitService: OrgUnitService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.unitService.getUsers(
      code,
      UserRole.APPROVER,
      structure.options?.pagination
    );
  }

  /**
   * @override
   * Assign budget to the cost center.
   */
  assign(unitId: string, customerId: string) {
    this.unitService.assignApprover(unitId, customerId, UserRole.APPROVER);
  }

  /**
   * @override
   * Unassign the budget from the cost center.
   */
  unassign(unitId: string, customerId: string) {
    this.unitService.unassignApprover(unitId, customerId, UserRole.APPROVER);
  }
}
