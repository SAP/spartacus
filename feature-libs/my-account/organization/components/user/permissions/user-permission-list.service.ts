import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  B2BUserService,
  Permission,
} from '@spartacus/my-account/organization/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared/organization-sub-list/organization-sub-list.service';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionListService extends OrganizationSubListService<
  Permission
> {
  protected tableType = OrganizationTableType.USER_PERMISSIONS;
  protected domainType = OrganizationTableType.PERMISSION;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
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
  assign(userCode: string, code: string) {
    this.userService.assignPermission(userCode, code);
  }

  /**
   * @override
   * Unassign the permission from the user.
   */
  unassign(userCode: string, code: string) {
    this.userService.unassignPermission(userCode, code);
  }
}
