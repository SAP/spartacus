import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  B2BUserService,
  PermissionService,
  Permission,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SubListService } from '../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionListService extends SubListService<Permission> {
  protected tableType = OrganizationTableType.USER_PERMISSIONS;
  protected _domainType = OrganizationTableType.PERMISSION;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService,
    protected permissionService: PermissionService
  ) {
    super(tableService);
  }

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    return this.userService.getPermissions(code, pagination);
  }

  /**
   * @override
   * Assign permission to the user.
   */
  assign(
    userCode: string,
    code: string
  ): Observable<OrganizationItemStatus<Permission>> {
    this.userService.assignPermission(userCode, code);
    return this.permissionService.getLoadingStatus(code);
  }

  /**
   * @override
   * Unassign the permission from the user.
   */
  unassign(
    userCode: string,
    code: string
  ): Observable<OrganizationItemStatus<Permission>> {
    this.userService.unassignPermission(userCode, code);
    return this.permissionService.getLoadingStatus(code);
  }
}
