import { Injectable } from "@angular/core";
import { EntitiesModel, Permission } from "@spartacus/core";
import { TableService, TableStructure } from "@spartacus/storefront";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { B2BUserService } from "../../../../core/services/b2b-user.service";
import { BaseOrganizationListService } from "../../../shared/base-organization-list.service";
import { OrganizationTableType } from "../../../shared/organization.model";

/**
 * Service to populate Cost Center User data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.USER_USERS`.
 */
@Injectable({
  providedIn: "root",
})
export class UserPermissionListService extends BaseOrganizationListService<
  Permission
> {
  protected tableType = OrganizationTableType.USER_PERMISSIONS;

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
    const config = structure.options?.pagination;
    return this.userService
      .getPermissions(code, config)
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

  unassign(userCode: string, permission: Permission) {
    this.userService.unassignPermission(userCode, permission.code);
  }
}
