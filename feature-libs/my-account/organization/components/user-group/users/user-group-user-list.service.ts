import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { UserGroupService } from '@spartacus/my-account/organization/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationSubListService } from '../../shared';
import { OrganizationTableType } from '../../shared/organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserGroupUserListService extends OrganizationSubListService<
  B2BUser
> {
  protected tableType = OrganizationTableType.USER_GROUP_USERS;
  protected domainType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService
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
    structure: TableStructure,
    code: string
  ): Observable<EntitiesModel<B2BUser>> {
    const config = structure.options?.pagination;
    return this.userGroupService.getAvailableOrgCustomers(code, config);
  }

  /**
   * @override
   * Assign user to the user group.
   */
  assign(userGroupCode: string, customerId: string) {
    this.userGroupService.assignMember(userGroupCode, customerId);
  }

  /**
   * @override
   * Unassigns the user from the user group.
   */
  unassign(userGroupCode: string, customerId: string) {
    this.userGroupService.unassignMember(userGroupCode, customerId);
  }
}
