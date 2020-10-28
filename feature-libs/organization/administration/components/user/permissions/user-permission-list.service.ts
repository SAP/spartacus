import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  B2BUserService,
  PermissionService,
  Permission,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import { OrganizationItemStatus } from '../../../core/model/organization-item-status';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionListService extends OrganizationSubListService<
  Permission
> {
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
    return this.permissionService.getLoadingStatusSuccess(code);
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
    return this.permissionService.getLoadingStatusSuccess(code);
  }
}
