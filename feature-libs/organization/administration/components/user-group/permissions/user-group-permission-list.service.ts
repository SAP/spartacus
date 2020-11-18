import { Injectable } from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  Permission,
  PermissionService,
  UserGroup,
  UserGroupService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserGroupPermissionListService extends SubListService<Permission> {
  protected tableType = OrganizationTableType.USER_GROUP_PERMISSIONS;
  protected _domainType = OrganizationTableType.PERMISSION;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService,
    protected permissionService: PermissionService
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
  ): Observable<EntitiesModel<Permission>> {
    return this.userGroupService.getAvailableOrderApprovalPermissions(
      code,
      pagination
    );
  }

  /**
   * @override
   * Assign user to the user group.
   */
  assign(
    userGroupCode: string,
    permissionCode: string
  ): Observable<OrganizationItemStatus<UserGroup>> {
    this.userGroupService.assignPermission(userGroupCode, permissionCode);
    return this.permissionService.getLoadingStatus(permissionCode);
  }

  /**
   * @override
   * Unassigns the user from the user group.
   */
  unassign(
    userGroupCode: string,
    permissionCode: string
  ): Observable<OrganizationItemStatus<UserGroup>> {
    this.userGroupService.unassignPermission(userGroupCode, permissionCode);
    return this.permissionService.getLoadingStatus(permissionCode);
  }
}
