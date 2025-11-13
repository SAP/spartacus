/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUser, EntitiesModel, PaginationModel } from '@spartacus/core';
import {
  B2BUserService,
  OrganizationItemStatus,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionListService extends SubListService<Permission> {
  protected tableService: TableService;
  protected userService = inject(B2BUserService);
  protected permissionService = inject(PermissionService);

  protected tableType = OrganizationTableType.USER_PERMISSIONS;
  protected _domainType = OrganizationTableType.PERMISSION;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const tableService = inject(TableService);

    super(tableService);
  
    this.tableService = tableService;
  }

  protected load(
    pagination: PaginationModel,
    code: string
  ): Observable<EntitiesModel<B2BUser> | undefined> {
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
    return this.permissionService.getLoadingStatus(code);
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
    return this.permissionService.getLoadingStatus(code);
  }
}
