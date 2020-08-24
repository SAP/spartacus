import { Injectable } from "@angular/core";
import { B2BUser, EntitiesModel } from "@spartacus/core";
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
export class UserGroupUserListService extends BaseOrganizationListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_GROUP_USERS;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService
  ) {
    super(tableService);
  }

  protected load(
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    const config = structure.options?.pagination;
    return this.userGroupService
      .getAvailableOrgCustomers(code, config)
      .pipe(map((users) => this.filterSelected(users)));
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected({
    pagination,
    sorts,
    values,
  }: EntitiesModel<B2BUser>): EntitiesModel<B2BUser> {
    return {
      pagination,
      sorts,
      values: values.filter((value) => value.selected),
    };
  }

  unassign(userGroupCode: string, user: B2BUser) {
    this.userGroupService.unassignMember(userGroupCode, user.customerId);
  }
}
