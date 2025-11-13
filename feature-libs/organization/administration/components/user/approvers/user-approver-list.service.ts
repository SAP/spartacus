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
} from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationTableType } from '../../shared/organization.model';
import { SubListService } from '../../shared/sub-list/sub-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserApproverListService extends SubListService<B2BUser> {
  protected tableService: TableService;
  protected userService = inject(B2BUserService);

  protected tableType = OrganizationTableType.USER_APPROVERS;
  protected _domainType = OrganizationTableType.USER_GROUP;

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
    return this.userService.getApprovers(code, pagination);
  }

  /**
   * @override
   * Assign approver to the user.
   */
  assign(
    userCode: string,
    approverId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userService.assignApprover(userCode, approverId);
    return this.userService.getLoadingStatus(approverId);
  }

  /**
   * @override
   * Unassign the approver from the user.
   */
  unassign(
    userCode: string,
    approverId: string
  ): Observable<OrganizationItemStatus<B2BUser>> {
    this.userService.unassignApprover(userCode, approverId);
    return this.userService.getLoadingStatus(approverId);
  }
}
