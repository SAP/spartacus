import { Injectable } from "@angular/core";
import { EntitiesModel, Permission } from "@spartacus/core";
import { TableService, TableStructure } from "@spartacus/storefront";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserGroupService } from "../../../../core/services/user-group.service";
import { BaseOrganizationListService } from "../../../shared/base-organization-list.service";
import { OrganizationTableType } from "../../../shared/organization.model";

/**
 * Service to populate Cost Center User data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.USER_GROUP_USERS`.
 */
@Injectable({
  providedIn: "root",
})
export class UserGroupPermissionListService extends BaseOrganizationListService<
  Permission
> {
  protected tableType = OrganizationTableType.USER_GROUP_PERMISSIONS;

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
    const config = structure.options?.pagination;
    return this.userGroupService
      .getAvailableOrderApprovalPermissions(code, config)
      .pipe(map((permissions) => this.filterSelected(permissions)));
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<Permission>): EntitiesModel<Permission> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.selected),
    };
  }

  unassign(userGroupCode: string, permission: Permission) {
    this.userGroupService.unassignPermission(userGroupCode, permission.code);
  }
}
