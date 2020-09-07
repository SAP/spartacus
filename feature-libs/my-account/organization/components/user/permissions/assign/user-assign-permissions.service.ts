import { Injectable } from '@angular/core';
import { Permission, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { BaseOrganizationListService } from '../../../shared/base-organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import { B2BUserService } from '@spartacus/my-account/organization/core';

@Injectable({
  providedIn: 'root',
})
export class UserAssignPermissionsListService extends BaseOrganizationListService<
  Permission
> {
  protected tableType = OrganizationTableType.USER_ASSIGN_PERMISSIONS;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<Permission>> {
    return this.userService.getPermissions(code, structure.pagination);
  }

  toggleAssign(
    userCode: string,
    orderApprovalPermissionCode: string,
    assign = true
  ) {
    if (assign) {
      this.userService.assignPermission(userCode, orderApprovalPermissionCode);
    } else {
      this.userService.unassignPermission(
        userCode,
        orderApprovalPermissionCode
      );
    }
  }
}
