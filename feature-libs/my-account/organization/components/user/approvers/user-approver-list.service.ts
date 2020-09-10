import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserApproverListService extends OrganizationSubListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_APPROVERS;
  protected domainType = OrganizationTableType.USER_GROUP;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.userService.getApprovers(code, structure.options?.pagination);
  }

  /**
   * @override
   * Assign approver to the user.
   */
  assign(userCode: string, unitId: string) {
    this.userService.assignApprover(userCode, unitId);
  }

  /**
   * @override
   * Unassign the approver from the user.
   */
  unassign(userCode: string, unitId: string) {
    this.userService.unassignApprover(userCode, unitId);
  }
}
