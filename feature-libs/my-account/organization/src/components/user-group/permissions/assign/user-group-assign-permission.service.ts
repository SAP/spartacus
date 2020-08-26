import { Injectable } from '@angular/core';
import { EntitiesModel, Permission } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { UserGroupService } from '../../../../core/services/user-group.service';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserGroupAssignPermissionService extends OrganizationListService<
  Permission
> {
  protected tableType = OrganizationTableType.USER_GROUP_ASSIGN_PERMISSIONS;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<Permission>> {
    return this.userGroupService.getAvailableOrderApprovalPermissions(
      code,
      structure.options?.pagination
    );
  }

  toggleAssign(
    userGroupCode: string,
    orderApprovalPermissionCode: string,
    assign = true
  ) {
    if (assign) {
      this.userGroupService.assignPermission(
        userGroupCode,
        orderApprovalPermissionCode
      );
    } else {
      this.userGroupService.unassignPermission(
        userGroupCode,
        orderApprovalPermissionCode
      );
    }
  }
}
