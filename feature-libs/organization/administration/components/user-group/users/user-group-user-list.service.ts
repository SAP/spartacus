/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupUserListService extends SubListService<B2BUser> {
  protected tableType = OrganizationTableType.USER_GROUP_USERS;
  protected _domainType = OrganizationTableType.USER;

  constructor(
    protected tableService: TableService,
    protected userGroupService: UserGroupService,
    protected userService: B2BUserService
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
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser> | undefined> {
    return this.userGroupService.getAvailableOrgCustomers(code, pagination);
  }

  /**
   * @override
   * Assign user to the user group.
   */
  assign(
    userGroupCode: string,
    customerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userGroupService.assignMember(userGroupCode, customerId);
    return this.userService.getLoadingStatus(customerId);
  }

  /**
   * @override
   * Unassigns the user from the user group.
   */
  unassign(
    userGroupCode: string,
    customerId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userGroupService.unassignMember(userGroupCode, customerId);
    return this.userService.getLoadingStatus(customerId);
  }

  unassignAllMembers(
    userGroupCode: string
  ): Observable<OrganizationItemStatus<UserGroup>> {
    this.userGroupService.unassignAllMembers(userGroupCode);
    return this.userGroupService.getLoadingStatus(userGroupCode);
  }
}
