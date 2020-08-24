import { Injectable } from "@angular/core";
import { EntitiesModel } from "@spartacus/core";
import { TableService, TableStructure } from "@spartacus/storefront";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserGroup } from "../../../../core/model/user-group.model";
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
export class UserUserGroupListService extends BaseOrganizationListService<
  UserGroup
> {
  protected tableType = OrganizationTableType.USER_USER_GROUPS;

  constructor(
    protected tableService: TableService,
    protected userService: B2BUserService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<UserGroup>> {
    const config = structure.options?.pagination;
    return this.userService
      .getUserGroups(code, config)
      .pipe(map((userGroups) => this.filterSelected(userGroups)));
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<UserGroup>): EntitiesModel<UserGroup> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.selected),
    };
  }

  unassign(userCode: string, userGroup: UserGroup) {
    this.userService.unassignUserGroup(userCode, userGroup.uid);
  }
}
