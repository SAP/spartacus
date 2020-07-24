import { Injectable } from '@angular/core';
import { B2BUser, UserGroupService, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { BaseOrganizationListService } from '../../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserGroupAssignUserListService extends BaseOrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_GROUP_ASSIGN_USER;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.userGroupService.getAvailableOrgCustomers(
      code,
      structure.pagination
    );
  }

  toggleAssign(userGroupCode: string, userCode: string, assign = true) {
    if (assign) {
      this.userGroupService.assignMember(userGroupCode, userCode);
    } else {
      this.userGroupService.unassignMember(userGroupCode, userCode);
    }
  }
}
