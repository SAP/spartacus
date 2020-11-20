import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel, B2BUser } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
  B2BUserService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserGroupUserListService extends SubListService<B2BUser> {
  protected tableType = OrganizationTableType.USER_GROUP_USERS;
  protected _domainType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  /**
   *
   * @override
   * Loads all b2b users.
   *
   * @param code The user group code.
   */
  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.userGroupService.getAvailableOrgCustomers(code, pagination);
  }

  /**
   * @override
   * Assign user to the user group.
   */
  assign(
    userGroupCode: string,
    customerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userGroupService.assignMember(userGroupCode, customerId);
    return this.userService.getLoadingStatus(customerId);
  }

  /**
   * @override
   * Unassigns the user from the user group.
   */
  unassign(
    userGroupCode: string,
    customerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userGroupService.unassignMember(userGroupCode, customerId);
    return this.userService.getLoadingStatus(customerId);
  }

  unassignAllMembers(
    userGroupCode: string
  ): Observable<OrganizationItemStatus<UserGroup>> {
    this.userGroupService.unassignAllMembers(userGroupCode);
    return this.userGroupService.getLoadingStatus(userGroupCode);
  }
}
