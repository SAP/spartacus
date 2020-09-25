import { B2BUser, EntitiesModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { B2BSearchConfig } from '../../model/search-config';
import { UserGroup } from '../../model/user-group.model';

export abstract class UserGroupAdapter {
  /**
   * Abstract method used to load userGroupManagement's details data.
   * userGroup's data can be loaded from alternative sources, as long as the structure
   * converts to the `OrgUnitUserGroup`.
   *
   * @param userId The `userId` for given userGroupManagement
   * @param userGroupId The `userGroupId` for given userGroupManagement
   */
  abstract load(userId: string, userGroupId: string): Observable<UserGroup>;

  abstract loadList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<UserGroup>>;

  abstract loadAvailableOrderApprovalPermissions(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Permission>>;

  abstract loadAvailableOrgCustomers(
    userId: string,
    userGroupId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<B2BUser>>;

  abstract create(userId: string, userGroup: UserGroup): Observable<UserGroup>;

  abstract update(
    userId: string,
    userGroupId: string,
    userGroup: UserGroup
  ): Observable<UserGroup>;

  abstract delete(userId: string, userGroupId: string): Observable<UserGroup>;

  abstract assignMember(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): Observable<any>;

  abstract assignOrderApprovalPermission(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): Observable<any>;

  abstract unassignMember(
    userId: string,
    userGroupId: string,
    orgCustomerId: string
  ): Observable<any>;

  abstract unassignAllMembers(
    userId: string,
    userGroupId: string
  ): Observable<any>;

  abstract unassignOrderApprovalPermission(
    userId: string,
    userGroupId: string,
    orderApprovalPermissionCode: string
  ): Observable<any>;
}
