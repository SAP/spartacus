import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  UserGroup,
} from '@spartacus/my-account/organization/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserUserGroupListService extends OrganizationSubListService<
  UserGroup
> {
  protected tableType = OrganizationTableType.USER_USER_GROUPS;
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
  ): Observable<EntitiesModel<UserGroup>> {
    return this.userService.getUserGroups(code, structure.options?.pagination);
  }

  /**
   * @override
   * Assign user group to the user.
   */
  assign(userCode: string, userGroupCode: string) {
    this.userService.assignUserGroup(userCode, userGroupCode);
  }

  /**
   * @override
   * Unassign the user group from the user.
   */
  unassign(userCode: string, userGroupCode: string) {
    this.userService.unassignUserGroup(userCode, userGroupCode);
  }
}
